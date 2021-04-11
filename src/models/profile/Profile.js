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
    const avatarPath = props.avatarLink || '';
    const avatarLink = avatarPath.endsWith(constants.network.defaultAvatarLink) ? // Misha, I love you <3
      constants.network.defaultAvatarLink :
      `${constants.network.bucketURL}${props.avatarLink}`;

    super({
      ...props,
      avatarLink: avatarLink,
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
