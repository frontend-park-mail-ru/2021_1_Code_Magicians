import {Model} from '../Model.js';
import {constants} from '../../consts/consts.js';

/**
 * Profile model
 */
export class Profile extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   username,
   *   firstName,
   *   lastName,
   *   email,
   *   avatarLink,
   *   followed,
   * }
   */
  constructor(props = {}) {
    super({
      ...props,
      avatarLink: `${constants.network.bucketURL}${props.avatarLink || constants.network.defaultAvatarLink.slice(1)}`,
    });
  }

  /**
   * On follow
   */
  follow() {
    this.followed = true;
  }

  /**
   * On unfollow
   */
  unfollow() {
    this.followed = false;
  }
}
