import {API} from '../../modules/api.js';
import Store from '../Store.js';
import {Profile} from '../../models/profile/Profile.js';
import {User} from '../../models/user/User.js';
import {actionTypes} from '../../actions/actions.js';
import {constants} from '../../consts/consts.js';

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
    this._fetchUserData();
  }

  /**
   * Process event
   * @param {Object} action
   */
  processEvent(action) {
    let changed = true;
    this._status = 'ok';

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
      default:
        changed = false;
        break;
    }

    if (changed) this._trigger('change');
  }

  /**
   * login
   * @param {Object} credentials
   * @private
   */
  _login(credentials) {
    if (this._user.authorized()) {
      this._status = storeStatuses.alreadyAuthorized;
      return;
    }

    const response = API.loginUser(credentials);
    switch (response.status) {
      case 403:
        this._user.onLogin();
        this._status = storeStatuses.alreadyAuthorized;
        break;
      case 200:
        this._fetchUserData();
        break;
      case 400:
        this._status = storeStatuses.invalidCreds;
        break;
      case 404:
        this._status = 'user not found';
        break;
      default:
        this._status = storeStatuses.internalError;
    }
  }

  /**
   * signup
   * @param {Object} credentials
   * @private
   */
  _signup(credentials) {
    if (this._user.authorized()) {
      this._status = storeStatuses.alreadyAuthorized;
      return;
    }

    const response = API.signupUser(credentials);
    switch (response.status) {
      case 201:
        this._fetchUserData();
        break;
      case 403:
        this._user.onLogin();
        this._status = storeStatuses.alreadyAuthorized;
        break;
      case 400:
        this._status = storeStatuses.invalidCreds;
        break;
      case 409:
        this._status = storeStatuses.userAlreadyExists;
        break;
      default:
        this._status = storeStatuses.internalError;
    }
  }

  /**
   * logout
   * @private
   */
  _logout() {
    if (!this._user.authorized()) {
      this._status = storeStatuses.unauthorized;
      return;
    }

    const response = API.logoutUser();
    switch (response.status) {
      case 200:
        this._user.onLogout();
        break;
      case 401:
        this._status = storeStatuses.unauthorized;
        break;
      default:
        this._status = storeStatuses.internalError;
    }
  }

  /**
   * delete profileViews
   * @private
   */
  _deleteProfile() {
    if (!this._user.authorized()) {
      this._status = storeStatuses.unauthorized;
      return;
    }

    const response = API.deleteSelfProfile();
    switch (response.status) {
      case 200:
        this._user.onLogout();
        break;
      case 401:
        this._status = storeStatuses.unauthorized;
        break;
      default:
        this._status = storeStatuses.internalError;
    }
  }

  /**
   * Add changes to user profileViews
   * @param {Object} changes
   * @private
   */
  _editProfile(changes) {
    if (!this._user.authorized()) {
      this._status = storeStatuses.unauthorized;
      return;
    }

    const response = API.editProfile(changes);
    switch (response.status) {
      case 200:
        this._fetchUserData();
        break;
      case 401:
        this._status = storeStatuses.unauthorized;
        break;
      case 409:
        this._status = storeStatuses.editConflict;
        break;
      default:
        this._status = storeStatuses.internalError;
    }
  }

  /**
   * Change password
   * @param {Object} data - payload data with password
   * @private
   */
  _changePassword(data) {
    if (!this._user.authorized()) {
      this._status = storeStatuses.unauthorized;
      return;
    }

    const response = API.changeUserPassword(data.password);
    switch (response.status) {
      case 200:
        break;
      case 401:
        this._status = storeStatuses.unauthorized;
        break;
      default:
        this._status = storeStatuses.internalError;
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
        this._status = storeStatuses.internalError;
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
