import {Model} from '../Model.js';
// eslint-disable-next-line no-unused-vars
import {Profile} from '../profile/Profile.js';

/**
 * User model
 */
export class User extends Model {
  /**
   * Constructor
   * @param {Profile} profile
   * @param {boolean} authorized
   */
  constructor(profile, authorized = false) {
    super({_isAuthorized: authorized});
    this.profile = profile;
  }

  /**
   * authorize
   */
  onLogin() {
    this._isAuthorized = true;
  }

  /**
   * unauthorize
   */
  onLogout() {
    this._isAuthorized = false;
  }

  /**
   * checker
   * @return {boolean}
   */
  authorized() {
    return this._isAuthorized;
  }
}
