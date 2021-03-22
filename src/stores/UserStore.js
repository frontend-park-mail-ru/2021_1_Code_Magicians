import {actionTypes, storeStatuses} from '../consts/consts.js';
import {API} from '../modules/api.js';
import Store from './Store.js';
import {Profile} from '../models/Profile.js';
import {User} from '../models/User.js';

/**
 * UserStore
 */
class UserStore extends Store {
  /**
   * Constructs new storage for current user
   */
  constructor() {
    super();

    this._fetchUserData();
  }

  /**
   * Process event
   * @param {Object} action
   */
  processEvent(action) {
    let changed = true;
    this._status = 'ok';

    switch (action) {
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
        this._changePassword(action.data.password);
        break;
      default:
        changed = false;
        break;
    }

    if (changed) this.trigger('change');
  }

  /**
   * login
   * @param {Object} credentials
   * @private
   */
  _login(credentials) {
    if (this._user.authorized()) {
      this._status = storeStatuses.userStore.alreadyAuthorized;
      return;
    }

    const response = API.loginUser(credentials);
    switch (response.status) {
      case 403:
        this._user.onLogin();
        this._status = storeStatuses.userStore.alreadyAuthorized;
        break;
      case 200:
        this._fetchUserData();
        break;
      case 400:
        this._status = storeStatuses.userStore.invalidCreds;
        break;
      case 404:
        this._status = 'user not found';
        break;
      default:
        this._status = storeStatuses.userStore.internalError;
    }
  }

  /**
   * signup
   * @param {Object} credentials
   * @private
   */
  _signup(credentials) {
    if (this._user.authorized()) {
      this._status = storeStatuses.userStore.alreadyAuthorized;
      return;
    }

    const response = API.signupUser(credentials);
    switch (response.status) {
      case 201:
        this._fetchUserData();
        break;
      case 403:
        this._user.onLogin();
        this._status = storeStatuses.userStore.alreadyAuthorized;
        break;
      case 400:
        this._status = storeStatuses.userStore.invalidCreds;
        break;
      case 409:
        this._status = storeStatuses.userStore.userAlreadyExists;
        break;
      default:
        this._status = storeStatuses.userStore.internalError;
    }
  }

  /**
   * logout
   * @private
   */
  _logout() {
    if (!this._user.authorized()) {
      this._status = storeStatuses.userStore.unauthorized;
      return;
    }

    const response = API.logoutUser();
    switch (response.status) {
      case 200:
        this._user.onLogout();
        break;
      case 401:
        this._status = storeStatuses.userStore.unauthorized;
        break;
      default:
        this._status = storeStatuses.userStore.internalError;
    }
  }

  /**
   * delete profile
   * @private
   */
  _deleteProfile() {
    if (!this._user.authorized()) {
      this._status = storeStatuses.userStore.unauthorized;
      return;
    }

    const response = API.deleteSelfProfile();
    switch (response.status) {
      case 200:
        this._user.onLogout();
        break;
      case 401:
        this._status = storeStatuses.userStore.unauthorized;
        break;
      default:
        this._status = storeStatuses.userStore.internalError;
    }
  }

  /**
   * Add changes to user profile
   * @param {Object} changes
   * @private
   */
  _editProfile(changes) {
    if (!this._user.authorized()) {
      this._status = storeStatuses.userStore.unauthorized;
      return;
    }

    const response = API.editProfile(changes);
    switch (response.status) {
      case 200:
        this._fetchUserData();
        break;
      case 401:
        this._status = storeStatuses.userStore.unauthorized;
        break;
      case 409:
        this._status = storeStatuses.userStore.editConflict;
        break;
      default:
        this._status = storeStatuses.userStore.internalError;
    }
  }

  /**
   * Change password
   * @param {String} newPassword
   * @private
   */
  _changePassword(newPassword) {
    if (!this._user.authorized()) {
      this._status = storeStatuses.userStore.unauthorized;
      return;
    }

    const response = API.changeUserPassword(newPassword);
    switch (response.status) {
      case 200:
        break;
      case 401:
        this._status = storeStatuses.userStore.unauthorized;
        break;
      default:
        this._status = storeStatuses.userStore.internalError;
    }
  }


  /**
   * Fetch it
   * @private
   */
  _fetchUserData() {
    let authorized = false;
    let profile = new Profile();

    const response = API.getSelfProfile();
    switch (response.status) {
      case 401:
        break;
      case 200:
        authorized = true;
        profile = new Profile(response.responseBody);
        break;
      default:
        this._status = storeStatuses.userStore.internalError;
    }

    this._user = new User(profile, authorized);
  }


  /**
   * Returns user data
   * @return {User}
   */
  getUser() {
    return this._user;
  }

  /**
   * Get current store status
   * @return {String} status
   */
  getStatus() {
    return this._status;
  }
}

export const userStore = new UserStore();
