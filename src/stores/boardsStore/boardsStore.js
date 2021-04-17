import {constants} from 'consts/consts';
import Store from '../Store';
import {Board} from 'models/Board';
import {actionTypes} from 'actions/actions';
import {userStore} from '../userStore/UserStore';
import {API} from 'modules/api';

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

    this._boardsSource = {
      sourceType: null,
      sourceID: null,
    };
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
        this._createBoard(action.data);
        break;
      case actionTypes.boards.deleteBoard:
        this._deleteBoard(action.data);
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

      this._trigger('change');
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
          this._board = this._board.ID !== data.boardID ? this._board : new Board({});
          this._boards = this._boards.filter((board) => board.ID !== data.boardID);
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
    this._fetchingBoard = true;
    API.getBoardByID(data.boardID).then((response) => {
      switch (response.status) {
        case 200:
          this._board = new Board(response.responseBody);
          break;
        case 400:
        case 404:
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          this._status = storeStatuses.internalError;
          break;
      }

      this._fetchingBoard = false;
      this._trigger('change');
    });
  }

  /**
   * Fetch profile boards
   * @param {Object} data
   * @private
   */
  _fetchProfileBoards(data) {
    this._fetchingBoards = true;

    this._boardsSource.sourceType = 'profile';
    this._boardsSource.sourceID = data.authorID;

    API.getProfileBoards(data.authorID).then((response) => {
      switch (response.status) {
        case 200:
          this._boards = response.responseBody.boards.map((boardData) => new Board(boardData));
          break;
        case 400:
        case 404:
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          this._status = storeStatuses.internalError;
          break;
      }

      this._fetchingBoards = false;
      this._trigger('change');
    });
  }

  /**
   * Fetch it
   * @param {Object} data
   * @private
   */
  _fetchBoardsFeed(data) {
    this._fetchingBoards = true;

    this._boardsSource.sourceType = 'feed';
    this._boardsSource.sourceID = null;

    this._boards = constants.mocks.boards; // later will go to the server for data
    this._fetchingBoards = true;
    this._trigger('change');
  }

  /**
   * Get them
   * @param {String} profileID
   * @return {[]}
   */
  getBoardsByProfileID(profileID) {
    if (!profileID) {
      return null;
    }

    if (this._boardsSource.sourceType === 'profile' &&
      this._boardsSource.sourceID === profileID) {
      return this._boards;
    }

    if (!this._fetchingBoards) {
      this._fetchProfileBoards({authorID: profileID});
    }

    return this._fetchingBoards ? null : this._boards;
  }

  /**
   * Returns board
   * @param {String} ID
   * @return {Board}
   */
  getBoardByID(ID) {
    if (!ID) {
      return null;
    }

    if (this._board.ID === Number(ID)) {
      return this._board;
    }

    if (!this._fetchingBoard) {
      this._fetchBoard({boardID: ID});
    }

    return null;
  }

  /**
   * Get them
   * @return {null|[]}
   */
  getBoardsFeed() {
    if (this._boardsSource.sourceType === 'feed') {
      return this._boards;
    }

    if (!this._fetchingBoards) {
      this._fetchBoardsFeed({});
    }

    return null;
  }
}

export const boardsStore = new BoardsStore();
