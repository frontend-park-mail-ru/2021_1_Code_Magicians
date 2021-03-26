import Store from '../Store.js';
import {Board} from '../../models/board/Board.js';
import {actionTypes} from '../../actions/actions.js';
import {API} from '../../modules/api.js';
import {userStore} from '../userStore/UserStore.js';
import {constants} from '../../consts/consts.js';
import {appDispatcher} from '../../appManagers/dispatcher.js';

const storeStatuses = constants.store.statuses.pinStore;

/**
 * Stores pins, aggregated in boards
 */
class PinStore extends Store {
  /**
   * Inits PinStore
   */
  constructor() {
    super();

    this._pinActionStatus = storeStatuses.ok;
    this._boardActionStatus = storeStatuses.ok;
  }

  /**
   * Process event
   * @param {Object} action
   */
  processEvent(action) {
    appDispatcher.waitFor([userStore.getDispatcherToken()]);

    let changed = true;
    this._status = 'ok';

    switch (action.actionType) {
      case actionTypes.pin.create:
        this._createPin(action.data);
        break;
      case actionTypes.pin.delete:
        this._deletePin(action.data);
        break;

      case actionTypes.board.create:
        this._createBoard(action.data);
        break;
      case actionTypes.board.delete:
        this._deleteBoard(action.data);
        break;
      default:
        changed = false;
        break;
    }

    if (changed) this._trigger('change');
  }

  /**
   * Creates new pin
   * @param {Object} pinData
   * @private
   */
  _createPin(pinData) {
    if (!userStore.getUser().authorized()) {
      this._status = storeStatuses.userUnauthorized;
      return;
    }

    const response = API.createPin(pinData);
    switch (response.status) {
      case 201:
        this._pinActionStatus = storeStatuses.ok;
        break;
      case 400:
        this._pinActionStatus = storeStatuses.invalidData;
        break;
      case 403:
        this._pinActionStatus = storeStatuses.userUnauthorized;
        break;
      case 404:
        this._pinActionStatus = storeStatuses.boardNotFound;
        break;
      default:
        this._status = storeStatuses.internalError;
        break;
    }
  }

  _deletePin(pinData) {
  }


  _createBoard(boardData) {
  }

  _deleteBoard(pinData) {
  }
}

export const boardStore = new PinStore();
