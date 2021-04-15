import {Model} from './Model';

/**
 * Pin model
 */
export class Pin extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   boardID,
   *   title,
   *   description,
   *   tags,
   *   imageLink,
   * }
   */
  constructor(props = {}) {
    super(props);
  }
}
