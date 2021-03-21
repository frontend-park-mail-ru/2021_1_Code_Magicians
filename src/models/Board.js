import {Model} from './Model.js';

/**
 * Board model
 */
export class Board extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   authorID,
   *   title,
   *   description,
   *   avatarIndex,
   * }
   */
  constructor(props) {
    super(props);

    this.pins = [];
  }

  /**
   * Add some pins
   * @param {Array} pins - array of Pins
   */
  addPins(pins) {
    this.pins = [...this.pins, pins];
  }
}
