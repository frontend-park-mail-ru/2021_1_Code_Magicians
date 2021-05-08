import { constants } from 'consts/consts';
import { Model } from './Model';

/**
 * Pin model
 */
export class Pin extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   boardID,
   *   userID,
   *   title,
   *   description,
   *   tags,
   *   imageLink,
   * }
   */
  constructor(props = {}) {
    if (props.imageLink) {
      props.imageLink = `${constants.network.bucketURL}${props.imageLink}`;
    }

    super(props);
  }
}
