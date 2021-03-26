import {Model} from '../Model.js';
import {Pin} from '../pin/Pin.js';

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
   * @param {Array} pins
   */
  constructor(props, pins = []) {
    super(props);

    this.pins = pins || [new Pin()];
  }

  /**
   * Add some pins to the board
   * @param {Array} pins - array of Pins
   */
  addPins(pins) {
    this.pins = [...this.pins, pins];
  }
}
