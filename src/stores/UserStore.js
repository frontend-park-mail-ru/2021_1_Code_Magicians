import {actionTypes} from '../consts/consts.js';
import {API} from '../modules/api.js';
import {eventMixin} from '../modules/eventMixin.js';
import {Store} from './Store.js';
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
    if (this._errorMessage) this.trigger('change');
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
        this._errorMessage = 'internal error';
    }

    this._user = new User(profile, authorized);
  }

  /**
   * Process event
   * @param {Object} action
   */
  processEvent(action) {
    let changed = true;
    this._errorMessage = '';

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
      this._errorMessage = 'already authorized';
      return;
    }

    const response = API.loginUser(credentials);
    switch (response.status) {
      case 403:
        this._errorMessage = 'already authorized';
        break;
      case 200:
        this._fetchUserData();
        break;
      case 400:
        this._errorMessage = 'invalid credentials';
        break;
      case 404:
        this._errorMessage = 'user not found';
        break;
      default:
        this._errorMessage = 'internal error';
    }
  }

  /**
   * signup
   * @param {Object} credentials
   * @private
   */
  _signup(credentials) {
    // TODO:
  }

  /**
   * logout
   * @private
   */
  _logout() {
    // TODO:
  }

  /**
   * delete profile
   * @private
   */
  _deleteProfile() {
    // TODO:
  }

  /**
   * Add changes to user profile
   * @param {Object} changes
   * @private
   */
  _editProfile(changes) {
    // TODO:
  }

  /**
   * Change password
   * @param {String} newPassword
   * @private
   */
  _changePassword(newPassword) {
    // TODO:
  }

  /**
   * Returns user data
   * @return {User}
   */
  getUser() {
    return this._user;
  }
}

Object.assign(UserStore.prototype, eventMixin);
export const userStore = new UserStore();
