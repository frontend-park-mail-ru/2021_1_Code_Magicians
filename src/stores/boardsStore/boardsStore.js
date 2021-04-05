import {constants} from '../../consts/consts.js';
import Store from '../Store.js';
import {Board} from '../../models/board/Board.js';
import {actionTypes} from '../../actions/actions.js';
import {appDispatcher} from '../../appManagers/dispatcher.js';
import {userStore} from '../userStore/UserStore.js';
import {API} from '../../modules/api.js';

const storeStatuses = constants.store.statuses.boardsStore;

/**
 * BoardsStore
 */
class BoardsStore extends Store {
  /**
   * Constructs new Boards store
   */
  constructor() {
    super();

    this._boards = [];
    this._board = new Board();

    this._lastAction = {actionType: null, data: {}};
  }

  /**
   * Process event
   * @param {Object} action
   */
  processEvent(action) {
    if (this._lastAction === action) {
      return;
    }

    this._status = storeStatuses.ok;

    switch (action.actionType) {
      case actionTypes.boards.createBoard:
        appDispatcher.waitFor([userStore.dispatcherToken]);
        this._createBoard(action.data);
        break;
      case actionTypes.boards.deleteBoard:
        appDispatcher.waitFor([userStore.dispatcherToken]);
        this._deleteBoard(action.data);
        break;
      case actionTypes.boards.loadBoardsFeed:
        this._fetchBoardsFeed(action.data);
        break;
      case actionTypes.common.loadBoard:
        this._fetchBoard(action.data);
        break;
      case actionTypes.common.loadForeignProfile:
        appDispatcher.waitFor(['profilesStore.dispatcherToken']);
        this._fetchProfileBoards({profileID: 'profilesStore.getProfile().ID'});
        break;
      default:
        return;
    }

    this._lastAction = action;
  }

  /**
   * Creates new board
   * @param {Object} boardData
   * @private
   */
  _createBoard(boardData) {
    if (!userStore.getUser().authorized()) {
      this._status = storeStatuses.userUnauthorized;
      return;
    }

    API.createBoard(boardData).then((response) => {
      switch (response.status) {
        case 201:
          this._status = storeStatuses.boardCreated;
          this._trigger('change');
          break;
        case 401:
          this._status = storeStatuses.userUnauthorized;
          break;
        case 400:
          console.log('Board creating error. Status: ', response.status);
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          console.log('Internal error');
          this._status = storeStatuses.internalError;
          break;
      }
    });
  }

  /**
   * Deletes new board
   * @param {Object} data
   * @private
   */
  _deleteBoard(data) {
    if (!userStore.getUser().authorized()) {
      this._status = storeStatuses.userUnauthorized;
      return;
    }

    API.deleteBoardByID(data.boardID).then((response) => {
      switch (response.status) {
        case 200:
        case 204:
          this._status = storeStatuses.boardDeleted;
          this._trigger('change');
          break;
        case 401:
          this._status = storeStatuses.userUnauthorized;
          break;
        case 400:
        case 403:
        case 404:
        case 409:
          console.log('Board deleting error. Status: ', response.status);
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          console.log('Internal error');
          this._status = storeStatuses.internalError;
          break;
      }
    });
  }

  /**
   * Fetch board
   * @param {Object} data
   * @private
   */
  _fetchBoard(data) {
  }

  /**
   * Fetch profile boards
   * @param {Object} data
   * @private
   */
  _fetchProfileBoards(data) {
  }

  /**
   * Fetch it
   * @param {Object} data
   * @private
   */
  _fetchBoardsFeed(data) {
  }
}

export const boardsStore = new BoardsStore();
