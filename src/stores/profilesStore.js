import { Profile } from 'models/Profile';
import { constants } from 'consts/consts';
import { actionTypes } from 'actions/actions';
import { API } from 'modules/api';
import Store from './Store';
import { userStore } from './userStore';

const storeStatuses = constants.store.statuses.profilesStore;

/**
 * ProfilesStore
 */
class ProfilesStore extends Store {
  lastSearchQuery = '';

  /**
   * Makes new profiles store
   */
  constructor() {
    super();

    this._profiles = [];
    this._profile = new Profile({ ID: 0 });
    this._followers = [];
    this._followersProfileID = null;
    this._following = [];
    this._followingProfileID = null;

    this._lastAction = {
      actionType: null,
      data: {},
    };
  }

  /**
   * Process it
   * @param {Object} action
   */
  processEvent(action) {
    if (this._lastAction === action) {
      return;
    }

    switch (action.actionType) {
    case actionTypes.profiles.follow:
      this._follow(action.data, true);
      break;
    case actionTypes.profiles.unfollow:
      this._follow(action.data, false);
      break;
    case actionTypes.profiles.statusProcessed:
      this._status = storeStatuses.ok;
      break;
    case actionTypes.common.search:
      if (action.data.searchingItems === 'profiles') {
        this._searchProfiles(action.data);
      }
      break;
    default:
      return;
    }

    this._lastAction = action;
  }

  /**
   * Follow profile
   * @param {Object} data
   * @param {Boolean} follow
   * @private
   */
  _follow(data, follow = true) {
    if (!userStore.getUser().authorized()) {
      this._status = storeStatuses.userUnauthorized;
      return;
    }

    API.followProfile(data.profileID, follow).then((response) => {
      switch (response.status) {
      case 200:
      case 204:
        if (this._profile.ID === data.profileID) {
          if (follow) {
            this._profile.follow();
          } else {
            this._profile.unfollow();
          }
        }

        this._status = follow ? storeStatuses.followed : storeStatuses.unfollowed;
        break;
      case 401:
        this._status = storeStatuses.userUnauthorized;
        break;
      case 400:
      case 404:
      case 409:
      default:
        this._status = storeStatuses.internalError;
        break;
      }

      this._trigger('change');
    });
  }

  /**
   * Fetch profile
   * @param {Object} data
   * @private
   */
  _fetchProfile(data) {
    if (this._profile.ID === Number(data.profileID)) {
      return;
    }
    this._fetchingProfile = true;

    API.getProfileByUsernameOrID(data.profileID).then((response) => {
      switch (response.status) {
      case 200:
        this._profile = new Profile(response.responseBody);
        break;
      case 404:
        this._status = storeStatuses.profileNotFound;
        break;
      case 400:
      default:
        this._status = storeStatuses.internalError;
        break;
      }

      this._fetchingProfile = false;
      this._trigger('change');
    });
  }

  /**
   * Fetch profiles
   * @param {Object} data
   * @private
   */
  _fetchProfiles(data) {
    this._fetchingProfiles = true;
    Promise
      .all(data.profileIDs.map((profileID) => API.getProfileByUsernameOrID(profileID)))
      .then((responses) => {
        responses.forEach((response) => {
          switch (response.status) {
          case 200:
            this._profiles.push(new Profile(response.responseBody));
            break;
          case 400:
          case 404:
          default:
            this._status = storeStatuses.internalError;
            break;
          }
        });

        this._fetchingProfiles = false;
        this._trigger('change');
      });
  }

  /**
   * Search profiles
   * @param {Object} data
   * @private
   */
  _searchProfiles(data) {
    if (this._fetchingProfiles) {
      return;
    }
    let key;
    if (data.searchingItems === 'profiles') {
      key = data.query;
      if (key.key) {
        key = key.key;
      }
    } else {
      key = data.query.key;
    }

    this.lastSearchQuery = data.query;
    this._fetchingProfiles = true;

    API.searchProfiles(key.replace('@', '')).then((response) => {
      switch (response.status) {
      case 200:
        this._profiles = response.responseBody.profiles.map((profileData) => new Profile(profileData));
        break;
      case 404:
        this._profiles = [];
        break;
      default:
        this._status = storeStatuses.internalError;
      }

      this._fetchingProfiles = false;
      this._trigger('change');
    });
  }

  /**
   * Fetch profile followers
   * @param {Object} data
   * @private
   */
  _fetchProfileFollowers(data) {
    if (this._followersProfileID === Number(data.profileID)) {
      return;
    }

    this._fetchingProfileFollowers = true;

    API.getProfileFollowersByID(data.profileID).then((response) => {
      switch (response.status) {
      case 200:
        this._followers = response.responseBody.profiles.map((profileData) => new Profile(profileData));
        this._followersProfileID = data.profileID;
        break;
      case 404:
        this._status = storeStatuses.followersNotFound;
        break;
      case 400:
      default:
        this._status = storeStatuses.internalError;
        break;
      }

      this._fetchingProfileFollowers = false;
      this._trigger('change');
    });
  }

  /**
   * Fetch profile following
   * @param {Object} data
   * @private
   */
  _fetchProfileFollowing(data) {
    if (this._followingProfileID === Number(data.profileID)) {
      return;
    }

    this._fetchingProfileFollowing = true;

    API.getProfileFollowingByID(data.profileID).then((response) => {
      switch (response.status) {
      case 200:
        this._following = response.responseBody.profiles.map((profileData) => new Profile(profileData));
        this._followingProfileID = data.profileID;
        break;
      case 404:
        this._status = storeStatuses.followersNotFound;
        break;
      case 400:
      default:
        this._status = storeStatuses.internalError;
        break;
      }

      this._fetchingProfileFollowing = false;
      this._trigger('change');
    });
  }

  /**
   * Get profile
   * @param {String} ID
   * @return {Profile}
   */
  getProfileByID(ID) {
    if (!ID) {
      return null;
    }

    if (this._profile.ID === Number(ID) || this._status === storeStatuses.profileNotFound) {
      return this._profile;
    }

    if (!this._fetchingProfile) {
      this._fetchProfile({ profileID: ID });
    }

    return null;
  }

  /**
   * Get profiles
   * @param {Array} profileIDs
   * @return {[]}
   */
  getProfiles(profileIDs) {
    if (profileIDs.every((profileID) => this._profiles.some((profile) => profile.ID === profileID))) {
      return profileIDs.reduce((profiles, profileID) => {
        profiles.push(this._profiles.find((profile) => profile.ID === profileID));
        return profiles;
      }, []);
    }

    if (!this._fetchingProfiles) {
      this._fetchProfiles({ profileIDs });
    }

    return null;
  }

  /**
   * Get found profile
   * @param {String} query
   * @return {{avatarLink: string, ID: null, username: string}[]}
   */
  getFoundProfiles(query) {
    if (this._fetchingProfiles) {
      return null;
    }

    return query === this.lastSearchQuery ? this._profiles : null;
  }

  /**
   * Get get Profile Followers By ID
   * @param {String} ID
   * @return {Profile}
   */
  getProfileFollowersByID(ID) {
    if (!ID) {
      return null;
    }

    if (this._followersProfileID === ID || this._status === storeStatuses.followersNotFound) {
      this._followersProfileID = null;
      return this._followers;
    }
    if (!this._fetchingProfileFollowers) {
      this._fetchProfileFollowers({ profileID: ID });
    }

    return null;
  }

  /**
   * Get get Profile Following By ID
   * @param {String} ID
   * @return {Profile}
   */
  getProfileFollowingByID(ID) {
    if (!ID) {
      return null;
    }

    if (this._followingProfileID === ID || this._status === storeStatuses.followersNotFound) {
      this._followingProfileID = null;
      return this._following;
    }
    if (!this._fetchingProfileFollowing) {
      this._fetchProfileFollowing({ profileID: ID });
    }

    return null;
  }
}

export const profilesStore = new ProfilesStore();
