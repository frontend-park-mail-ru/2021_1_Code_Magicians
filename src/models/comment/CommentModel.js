import {Model} from '../Model';

/**
 * Message model
 */
export class CommentModel extends Model {
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
