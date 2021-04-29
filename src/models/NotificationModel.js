import {Model} from './Model';
import {constants} from 'consts/consts';

import LogoImage from '../assets/img/Logo.png';

/**
 * Notification model.
 */
export class NotificationModel extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   title,
   *   category,
   *   text,
   // *   logoLink,
   *   isRead,
   * }
   */
  constructor(props = {}) {
    props.logoLink = props.logoLink ? `${constants.network.bucketURL}${props.logoLink}` : LogoImage;

    super(props);
  }

  /**
   * Mark
   */
  markAsRead() {
    this.isRead = true;
  }
}
