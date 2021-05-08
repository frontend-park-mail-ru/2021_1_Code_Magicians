import { Model } from './Model';

/**
 * Chat model
 */
export class Chat extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   targetProfile,
   *   messages,
   *   isRead,
   * }
   */
  constructor(props = {}) {
    super(props);
  }

  /**
   * Mark it
   */
  markAsRead() {
    this.isRead = true;
  }
}
