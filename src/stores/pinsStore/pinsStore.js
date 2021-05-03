import Store from '../Store';
import {constants} from 'consts/consts';
import {actionTypes} from 'actions/actions';
import {userStore} from '../userStore/UserStore';
import {API} from 'modules/api';
import {Pin} from 'models/Pin';
import {CommentModel} from 'models/CommentModel';

const storeStatuses = constants.store.statuses.pinsStore;

/**
 * PinsStore
 */
class PinsStore extends Store {
  /**
   * Makes new pins store
   */
  constructor() {
    super();

    this._pinsSource = {
      sourceType: null,
      sourceID: null,
    };
    this._commentsSource = {
      sourceID: null,
    };

    this._pins = []; // []Pin
    this._pin = new Pin();
    this._comments = null; // []Comment

    this._status = storeStatuses.ok;

    this._lastAction = {
      actionType: null,
      data: {},
    };

    this._processFetchedPins = this._processFetchedPins.bind(this);
  }

  /**
   * Process it
   * @param {Object} action
   */
  processEvent(action) {
    this._status = storeStatuses.ok;
    if (this._lastAction === action &&
      action.actionType !== actionTypes.pins.createPin) {
      return;
    }

    switch (action.actionType) {
      case actionTypes.pins.createPin:
        this._createPin(action.data);
        break;
      case actionTypes.pins.deletePin:
        this._deletePin(action.data);
        break;
      case actionTypes.comments.postComment:
        this._postComment(action.data);
        break;
      case actionTypes.pins.statusProcessed:
        this._status = storeStatuses.ok;
        break;
      default:
        return;
    }

    this._lastAction = action;
  }

  /**
   * Adds new pin to your profile (one of your boards or default one)
   * @param {Object} pinData
   * @private
   */
  _createPin(pinData) {
    if (!userStore.getUser().authorized()) {
      this._status = storeStatuses.userUnauthorized;
      return;
    }

    API.createPin(pinData.formData).then((response) => {
      switch (response.status) {
        case 201:
          this._status = storeStatuses.pinCreated;
          this._newPinID = response.responseBody.ID;
          break;
        case 403:
        case 400:
        case 404:
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
   * Deletes pin from your profile
   * @param {Object} pinData
   * @private
   */
  _deletePin(pinData) {
    if (!userStore.getUser().authorized()) {
      this._status = storeStatuses.userUnauthorized;
      return;
    }

    const pinID = pinData.pinID;
    API.deletePinByID(pinID).then((response) => {
      switch (response.status) {
        case 204:
        case 200:
          this._pin = this._pin.ID === pinID ? null : this._pin;
          this._pins = this._pins.filter((pin) => pin.ID !== pinID);
          this._status = storeStatuses.pinDeleted;
          this._trigger('change');
          break;
        case 401:
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
   * Post new comment
   * @param {Object} data
   * @private
   */
  _postComment(data) {
    API.postComment(data.commentText, data.pinID).then((response) => {
      switch (response.status) {
        case 201:
          this._fetchComments({pinID: data.pinID});
          break;
        case 401:
          this._status = storeStatuses.userUnauthorized;
          break;
        case 400:
        case 404:
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
   * Fetch exact pin
   * @param {Object} data
   * @private
   */
  _fetchPin(data) {
    this._fetchingPin = true;
    const pinID = data.pinID;
    API.getPinByID(pinID).then((response) => {
      switch (response.status) {
        case 200:
          this._pin = new Pin(response.responseBody);
          // this._fetchComments({pinID: this._pin.ID});
          break;
        case 404:
          this._status = storeStatuses.pinNotFound;
          this._pin = null;
          break;
        case 400:
          this._status = storeStatuses.clientSidedError;
          break;
        default:
          this._status = storeStatuses.internalError;
          break;
      }

      this._fetchingPin = false;
      this._trigger('change');
    });
  }

  /**
   * Fetch pins by profile
   * @param {Object} data consists of profile ID or username and options like fetching number
   * @private
   */
  _fetchProfilePins(data) {
    this._fetchingPins = true;

    this._pinsSource.sourceType = 'profile';
    this._pinsSource.sourceID = data.profileID;

    API.getPinsByProfileID(data.profileID).then(this._processFetchedPins);
  }

  /**
   * Fetch pins by board
   * @param {Object} data consists of board ID and options like fetching number
   * @private
   */
  _fetchBoardPins(data) {
    this._fetchingPins = true;

    this._pinsSource.sourceType = 'board';
    this._pinsSource.sourceID = data.boardID;

    API.getPinsByBoardID(data.boardID).then(this._processFetchedPins);
  }

  /**
   * Fetch pins feed or do nothing if it's ready
   * @param {Number} number
   * @private
   */
  _fetchFeed(number = 50) {
    this._pinsSource.sourceType = 'feed';
    this._fetchingPins = true;

    API.getPinsFeed(number).then((response) => {
      switch (response.status) {
        case 200:
          this._pins = response.responseBody && response.responseBody.pins.map((pinData) => new Pin(pinData));
          break;
        default:
          this._status = storeStatuses.internalError;
      }

      this._fetchingPins = false;
      this._trigger('change');
    });
  }

  /**
   * Fetch pin's comments
   * @param {Object} data
   * @private
   */
  _fetchComments(data) {
    this._fetchingComments = true;
    this._commentsSource.sourceID = data.pinID;
    API.getComments(data.pinID).then((response) => {
      switch (response.status) {
        case 200:
          this._comments = response.responseBody.comments.map((commentData) => new CommentModel(commentData)) || [];
          break;
        case 400:
        case 404:
          this._status = storeStatuses.clientSidedError;
          this._comments = null;
          break;
        default:
          this._status = storeStatuses.internalError;
          break;
      }

      this._fetchingComments = false;
      this._trigger('change');
    });
  }

  /**
   * Process
   * @param {Object} response
   * @private
   */
  _processFetchedPins(response) {
    switch (response.status) {
      case 200:
        this._pins = response.responseBody.pins.map((pinData) => new Pin(pinData));
        break;
      case 400:
      case 404:
        this._status = storeStatuses.clientSidedError;
        this._pins = [];
        break;
      default:
        this._status = storeStatuses.internalError;
        break;
    }

    this._fetchingPins = false;
    this._trigger('change');
  }

  /**
   * Get pin
   * @param {String} ID
   * @return {Pin}
   */
  getPinByID(ID) {
    if (!ID) {
      return null;
    }

    if ((this._pin && `${this._pin.ID}` === ID) || this._status === storeStatuses.pinNotFound) {
      return this._pin;
    }

    if (!this._fetchingPin) {
      this._fetchPin({pinID: ID});
    }

    return null;
  }

  /**
   * Get Pins by profile
   * @param {String} profileID
   * @return {[]}
   */
  getPinsByProfileID(profileID) {
    if (!profileID) {
      return null;
    }

    if (this._pinsSource.sourceType === 'profile' &&
      this._pinsSource.sourceID === profileID) {
      return this._pins;
    }

    if (!this._fetchingPins) {
      this._fetchProfilePins({profileID: profileID});
    }

    return this._fetchingPins ? null : this._pins;
  }

  /**
   * Get Pins by profile
   * @param {String} boardID
   * @return {[]}
   */
  getPinsByBoardID(boardID) {
    if (!boardID) {
      return null;
    }

    if (this._pinsSource.sourceType === 'board' &&
      this._pinsSource.sourceID === boardID) {
      return this._pins;
    }

    if (!this._fetchingPins) {
      this._fetchBoardPins({boardID: boardID});
    }

    return null;
  }

  /**
   * Get feed
   * @param {Number} number
   * @return {null|[]}
   */
  getPinsFeed(number = 50) {
    if (this._pinsSource.sourceType === 'feed') {
      return this._pins;
    }

    if (!this._fetchingPins) {
      this._fetchFeed(number);
    }

    return null;
  }

  /**
   * Get pin's comments
   * @param {String} pinID
   * @return {[]}
   */
  getComments(pinID) {
    if (!pinID) {
      return null;
    }

    if (this._commentsSource.sourceID === pinID) {
      return this._comments;
    }

    if (!this._fetchingComments) {
      this._fetchComments({pinID: pinID});
    }

    return null;
  }

  /**
   * Should be called only after status check
   * @return {*|null}
   */
  getNewPinID() {
    const pinID = this._newPinID;
    this._newPinID = null;
    return pinID;
  }
}

export const pinsStore = new PinsStore();
