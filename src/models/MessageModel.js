import { Model } from './Model';

/**
 * Message model
 */
export class MessageModel extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   chatID,
   *   authorID,
   *   text,
   *   addingTime,
   * }
   */
  constructor(props = {}) {
    super(props);
  }
}
