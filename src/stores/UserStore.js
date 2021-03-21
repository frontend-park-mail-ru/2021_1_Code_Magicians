import {actionTypes, defaultAvatarLink} from '../consts/consts.js';
import {API} from '../modules/api.js';
import {eventMixin} from '../modules/eventMixin.js';
import {Store} from './Store.js';

/**
 * UserStore
 */
class UserStore extends Store {
  /**
   * Constructs new storage for current user
   */
  constructor() {
    super();

    this._username = '';
    this._email = '';

    this._firstName = '';
    this._lastName = '';
    this._avatarLink = 'assets/img/default-avatar.jpg';
    this._id = 0;

    this._status = 'unauthorized';
    this._errorMessage = '';
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
        this._signup();
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
    const response = API.loginUser(credentials);
    switch (response.status) {
      case 403:
        this._status = 'authorized';
        this._errorMessage = 'already authorized';

        break;
      case 200:
        this._status = 'authorized';
        this._fetchUserData();

        break;
      case 400:
        this._status = 'unauthorized';
        this._errorMessage = 'invalid data';

        break;
      default:
        this._errorMessage = 'internal error';
    }
  }

  /**
   * signup
   * @private
   */
  _signup() {

  }

  /**
   * logout
   * @private
   */
  _logout() {

  }

  /**
   * fetch
   * @private
   */
  _fetchUserData() {
    const response = API.getSelfProfile();
    switch (response.status) {
      case 401:
        this._status = 'unauthorized';
        break;
      case 200:
        const profile = response.responseBody;

        this._username = profile.username;
        this._id = profile.id;
        this._firstName = profile.firstName;
        this._lastName = profile.lastName;
        this._avatarLink = profile.avatarLink || defaultAvatarLink;

        break;
      default:
        this._errorMessage = 'internal error';
    }
  }

  /**
   * Returns user data
   * @return {{firstName: string, lastName: string, avatarLink: string, email: string, username: string}}
   */
  getUserData() {
    return this._status === 'authorized' ? {
      username: this._username,
      email: this._email,

      firstName: this._firstName,
      lastName: this._lastName,
      avatarLink: this._avatarLink,

      id: this._id,

      errorMessage: this._errorMessage,
    } : {errorMessage: this._errorMessage};
  }
}

Object.assign(UserStore.prototype, eventMixin);
export const userStore = new UserStore();
