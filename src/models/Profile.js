import { constants } from 'consts/consts';
import { Model } from './Model';

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
    let avatar = '';
    if (props.avatarLink) {
      avatar = props.avatarLink.startsWith('/') ? props.avatarLink.slice(1) : props.avatarLink;
    }

    super({
      ...props,
      avatarLink: `${constants.network.bucketURL}${avatar || constants.network.defaultAvatarLink.slice(1)}`,
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
