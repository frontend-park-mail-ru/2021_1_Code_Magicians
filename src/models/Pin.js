import {Model} from './Model';
import {constants} from 'consts/consts';

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
