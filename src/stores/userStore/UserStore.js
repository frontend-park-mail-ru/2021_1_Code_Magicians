import {API} from 'modules/api';
import Store from '../Store';
import {Profile} from 'models/profile/Profile';
import {User} from 'models/user/User';
import {actionTypes} from 'actions/actions';
import {constants} from 'consts/consts';

const storeStatuses = constants.store.statuses.userStore;

/**
 * UserStore
 */
class UserStore extends Store {
  /**
   * Constructs new storage for current user
   */
  constructor() {
    super();

    this._user = new User(new Profile());
    this._userLoaded = false;
  }

  /**
   * Process event
   * @param {Object} action
   */
  processEvent(action) {
    this._status = storeStatuses.ok;

    switch (action.actionType) {
      case actionTypes.user.login:
        this._login(action.data);
        break;
      case actionTypes.user.logout:
        this._logout();
        break;
      case actionTypes.user.signup:
        this._signup(action.data);
        break;
      case actionTypes.user.deleteProfile:
        this._deleteProfile();
        break;
      case actionTypes.user.editProfile:
        this._editProfile(action.data);
        break;
      case actionTypes.user.changePassword:
        this._changePassword(action.data);
        break;
      case actionTypes.user.changeAvatar:
        this._changeAvatar(action.data);
        break;
      case actionTypes.user.statusProcessed:
        this._status = storeStatuses.ok;
        break;
    }
  }

  /**
   * login
   * @param {Object} credentials
   * @private
   */
  _login(credentials) {
    if (this._user.authorized()) {
      return;
    }

    API.loginUser(credentials).then((response) => {
      switch (response.status) {
        case 204:
          this._fetchUserData();
          break;
        case 403:
          this._status = storeStatuses.clientError;
          break;
        case 404:
        case 401:
          this._status = storeStatuses.invalidCredentials;
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      if (response.status !== 204) {
        this._trigger('change');
      }
    });
  }

  /**
   * signup
   * @param {Object} credentials
   * @private
   */
  _signup(credentials) {
    if (this._user.authorized()) {
      this._status = storeStatuses.clientError;
      return;
    }

    API.signupUser(credentials).then((response) => {
      switch (response.status) {
        case 201:
          this._fetchUserData();
          break;
        case 403:
        case 400:
          this._status = storeStatuses.clientError;
          break;
        case 409:
          this._status = storeStatuses.signupConflict;
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      if (response.status !== 201) {
        this._trigger('change');
      }
    });
  }

  /**
   * logout
   * @private
   */
  _logout() {
    if (!this._user.authorized()) {
      this._status = storeStatuses.clientError;
      return;
    }

    API.logoutUser().then((response) => {
      switch (response.status) {
        case 204:
          this._user.onLogout();
          this._status = storeStatuses.unauthorized;
          break;
        case 401:
          this._status = storeStatuses.clientError;
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      this._userLoaded = false;
      this._trigger('change');
    });
  }

  /**
   * Delete profile
   * @private
   */
  _deleteProfile() {
    if (!this._user.authorized()) {
      this._status = storeStatuses.clientError;
      return;
    }

    API.deleteSelfProfile().then((response) => {
      switch (response.status) {
        case 204:
          this._user.onLogout();
          this._status = storeStatuses.unauthorized;
          break;
        case 401:
          this._status = storeStatuses.clientError;
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      this._userLoaded = false;
      this._trigger('change');
    });
  }

  /**
   * Add changes to user profile
   * @param {Object} changes
   * @private
   */
  _editProfile(changes) {
    if (!this._user.authorized()) {
      this._status = storeStatuses.clientError;
      return;
    }

    const profile = this._user.profile;
    changes = Object.fromEntries(
        Object
            .entries(changes)
            .filter((change) => change[1] !== profile[change[0]]),
    );

    if (Object.keys(changes).length === 0) {
      return;
    }

    API.editProfile(changes).then((response) => {
      switch (response.status) {
        case 204:
          this._fetchUserData();
          this._status = storeStatuses.profileEdited;
          break;
        case 409:
          this._status = storeStatuses.editConflict;
          break;
        case 401:
          this._status = storeStatuses.clientError;
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      if (response.status !== 204) {
        this._trigger('change');
      }
    });
  }

  /**
   * Change password
   * @param {Object} data - payload data with password
   * @private
   */
  _changePassword(data) {
    if (!this._user.authorized()) {
      this._status = storeStatuses.clientError;
      return;
    }

    API.changeUserPassword(data.password).then((response) => {
      switch (response.status) {
        case 204:
          this._status = storeStatuses.passwordChanged;
          break;
        case 401:
          this._status = storeStatuses.clientError;
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      this._trigger('change');
    });
  }

  /**
   * Change it
   * @param {FormData} avatarFormData
   * @private
   */
  _changeAvatar(avatarFormData) {
    if (!this._user.authorized()) {
      this._status = storeStatuses.unauthorized;
      return;
    }

    API.changeAvatar(avatarFormData).then((response) => {
      switch (response.status) {
        case 204:
          this._fetchUserData();
          this._status = storeStatuses.avatarUploaded;
          break;
        case 400:
          this._status = storeStatuses.badAvatarImage;
          break;
        case 401:
          this._status = storeStatuses.clientError;
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      if (response.status !== 204) {
        this._trigger('change');
      }
    });
  }

  /**
   * Fetch it
   * @private
   */
  _fetchUserData() {
    this._fetchingUser = true;
    let authorized = false;
    let profile = new Profile();

    API.getSelfProfile().then((response) => {
      switch (response.status) {
        case 200:
          authorized = true;
          profile = new Profile(response.responseBody);
          break;
        case 401:
          this._user.onLogout();
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      this._user = new User(profile, authorized);
      this._fetchingUser = false;
      this._userLoaded = true;

      this._trigger('change');
    });
  }


  /**
   * Returns user data
   * @return {User}
   */
  getUser() {
    if (!this._fetchingUser) {
      if (this._userLoaded) {
        return this._user;
      }

      this._fetchUserData();
    }

    return null;
  }
}

export const userStore = new UserStore();
