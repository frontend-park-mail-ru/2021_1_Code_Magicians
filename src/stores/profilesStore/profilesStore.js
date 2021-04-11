import Store from '../Store.js';
import {Profile} from '../../models/profile/Profile.js';
import {constants} from '../../consts/consts.js';
import {actionTypes} from '../../actions/actions.js';
import {API} from '../../modules/api.js';
import {userStore} from '../userStore/UserStore.js';

const storeStatuses = constants.store.statuses.profilesStore;

/**
 * ProfilesStore
 */
class ProfilesStore extends Store {
  /**
   * Makes new profiles store
   */
  constructor() {
    super();

    this._profiles = [];
    this._profile = new Profile({ID: 0});

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
          this._trigger('change');
          break;
        case 401:
          this._status = storeStatuses.userUnauthorized;
          break;
        case 400:
        case 404:
        case 409:
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          this._status = storeStatuses.internalError;
          break;
      }
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
          this._fetchingProfile = false;
          this._trigger('change');
          break;
        case 400:
        case 404:
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          this._status = storeStatuses.internalError;
          break;
      }
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
                this._status = storeStatuses.clientSidedError;
                break;
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
   * Get profile
   * @param {String} ID
   * @return {Profile}
   */
  getProfileByID(ID) {
    if (this._profile.ID === Number(ID)) {
      return this._profile;
    }

    if (!this._fetchingProfile) {
      this._fetchProfile({profileID: ID});
    }

    return null;
  }

  /**
   * Get profiles
   * @param {Array} profileIDs
   * @return {[]}
   */
  getProfiles(profileIDs) {
    if (profileIDs === this._profiles.map((profile) => profile.ID)) {
      return this._profiles;
    }

    if (!this._fetchingProfiles) {
      this._fetchProfiles({profileIDs: profileIDs});
    }

    return null;
  }
}

export const profilesStore = new ProfilesStore();
