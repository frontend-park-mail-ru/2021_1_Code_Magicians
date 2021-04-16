import {Model} from '../Model';
import {constants} from 'consts/consts';

/**
 * Board model
 */
export class Board extends Model {
  /**
   * Constructor
   * @param {Object} props : {
   *   ID,
   *   userID,
   *   title,
   *   description,
   *   avatarLink,
   * }
   */
  constructor(props = {}) {
    props.avatarLink = props.avatarLink ?
      `${constants.network.bucketURL}/${props.avatarLink}` :
      '/assets/img/default-board.jpg';

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
