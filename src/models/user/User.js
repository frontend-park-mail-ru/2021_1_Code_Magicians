import {Model} from '../Model';
// eslint-disable-next-line no-unused-vars
import {Profile} from '../profile/Profile';

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
    this.profile = new Profile();
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
