import {Model} from '../Model';

/**
 * Message model
 */
export class Comment extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   userID,
   *   pinID,
   *   addingTime,
   *   text,
   * }
   */
  constructor(props = {}) {
    super(props);
  }
}
