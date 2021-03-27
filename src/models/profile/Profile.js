import {Model} from '../Model.js';

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
   * }
   */
  constructor(props) {
    super(props);
  }
}
