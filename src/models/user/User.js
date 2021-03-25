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
    super({isAuthorized: authorized});
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
    this.isAuthorized = false;
  }

  /**
   * checker
   * @return {boolean}
   */
  authorized() {
    return this._isAuthorized;
  }
}
