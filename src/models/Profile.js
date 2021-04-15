import {Model} from './Model';
import {constants} from 'consts/consts';

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
    if (props.avatarLink === constants.network.defaultAvatarLink) {
      props.avatarLink = props.avatarLink.slice(1);
    }

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
