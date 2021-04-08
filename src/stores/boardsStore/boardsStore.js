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
        this._fetchProfileBoards({authorID: 'profilesStore.getProfile().ID'});
        break;
      case actionTypes.boards.statusProcessed:
        this._status = storeStatuses.ok;
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
          this._status = storeStatuses.clientSidedError;
          break;
        default:
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
          this._status = storeStatuses.clientSidedError;
          break;
        default:
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
    API.getBoardByID(data.boardID).then((response) => {
      switch (response.status) {
        case 200:
          this._board = new Board(response.responseBody);
          this._trigger('change');
          break;
        case 400:
        case 404:
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          this._status = storeStatuses.internalError;
          break;
      }
    });
  }

  /**
   * Fetch profile boards
   * @param {Object} data
   * @private
   */
  _fetchProfileBoards(data) {
    API.getProfileBoards(data.authorID).then((response) => {
      switch (response.status) {
        case 200:
          this._boards = response.responseBody.boards;
          this._trigger('change');
          break;
        case 400:
        case 404:
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          this._status = storeStatuses.internalError;
          break;
      }
    });
  }

  /**
   * Fetch it
   * @param {Object} data
   * @private
   */
  _fetchBoardsFeed(data) {
    this._boards = constants.mock.boards; // later will go to the server for data
    this._trigger('change');
  }

  /**
   * Returns boards
   * @return {[]}
   */
  getBoards() {
    return this._boards;
  }

  /**
   * Returns board
   * @return {Board}
   */
  getBoard() {
    return this._board;
  }
}

export const boardsStore = new BoardsStore();
