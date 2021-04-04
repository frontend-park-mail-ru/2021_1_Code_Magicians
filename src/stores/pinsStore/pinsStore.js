import Store from '../Store.js';
import {constants} from '../../consts/consts.js';
import {actionTypes} from '../../actions/actions.js';
import {appDispatcher} from '../../appManagers/dispatcher.js';
import {userStore} from '../userStore/UserStore.js';
import {API} from '../../modules/api.js';
import {Pin} from '../../models/pin/Pin.js';

const storeStatuses = constants.store.statuses.pinsStore;

// temporary mock instead of backend call
const pinsGenerator = function* () {
  for (let i = 1; i <= 10; i++) {
    yield new Pin({
      ID: i,
      boardID: 100 + i % 3,
      title: `title${i}`,
      description: 'blah blah blah',
      tags: [],
      imageLink: 'assets/img/default-avatar.jpg',
    });
  }
};
const pinsFeed = [...pinsGenerator()];

/**
 * PinsStore
 */
class PinsStore extends Store {
  /**
   * Makes new pins store
   */
  constructor() {
    super();

    this._pins = []; // []Pins
    this._pin = new Pin();

    this._status = storeStatuses.ok;
  }

  /**
   * Process it
   * @param {Object} action
   */
  processEvent(action) {
    this._status = storeStatuses.ok;

    switch (action.actionType) {
      case actionTypes.pins.createPin:
        appDispatcher.waitFor([userStore.dispatcherToken]);
        this._createPin(action.data);
        break;
      case actionTypes.pins.deletePin:
        appDispatcher.waitFor([userStore.dispatcherToken]);
        this._deletePin(action.data);
        break;
      case actionTypes.pins.loadPinsFeed:
        this._fetchFeed(action.data);
        break;
      case actionTypes.common.loadForeignProfile:
        appDispatcher.waitFor(['profilesStore.dispatcherToken']);
        this._fetchProfilePins(action.data);
        break;
      case actionTypes.common.loadPin:
        this._fetchPin(action.data);
        break;
      case actionTypes.common.loadBoard:
        appDispatcher.waitFor(['boardsStore.dispatcherToken']);
        this._fetchBoardPins(action.data);
        break;
    }
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
          break;
        case 403:
          this._status = storeStatuses.userUnauthorized;
          break;
        case 400:
        case 404:
          console.log('Pin creating error. Status: ', response.status);
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
   * Deletes pin from your profile
   * @param {Object} pinData
   * @private
   */
  _deletePin(pinData) {
    if (!userStore.getUser().authorized()) {
      this._status = storeStatuses.userUnauthorized;
      return;
    }

    const pinID = pinData['pinID'];
    API.deletePinByID(pinID).then((response) => {
      switch (response.status) {
        case 204:
        case 200:
          this._pin = this._pin ? this._pin.ID === pinID ? null : this._pin : null;
          this._pins = this._pins.filter((pin) => pin.ID !== pinID);
          this._status = storeStatuses.pinDeleted;
          this._trigger('change');
          break;
        case 401:
        case 400:
        case 403:
        case 404:
        case 409:
          console.log('Pin deleting error. Status: ', response.status);
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
   * Fetch exact pin
   * @param {Object} data
   * @private
   */
  _fetchPin(data) {
    const pinID = data['pinID'];
    API.getPinByID(pinID).then((response) => {
      switch (response.status) {
        case 200:
          this._pin = new Pin(response.responseBody);
          break;
        case 400:
        case 404:
          console.log('Pin fetching error. Status: ', response.status);
          this._status = storeStatuses.clientSidedError;
          this._pin = null;
          break;
        default:
          console.log('Internal error');
          this._status = storeStatuses.internalError;
          break;
      }

      this._trigger('change');
    });
  }

  /**
   * Fetch pins feed or do nothing if it's ready
   * @param {Object} data
   * @private
   */
  _fetchFeed(data) {
    // later will be API function for this. Now only that mock
    this._pins = pinsFeed;
    this._trigger('change');
  }

  /**
   * Fetch pins by profile
   * @param {Object} data consists of profile ID or username and options like fetching number
   * @private
   */
  _fetchProfilePins(data) {
    API.getPinsByProfileID(data['profileID'], data['pinsNumber'] || 0).then((response) => {
      switch (response.status) {
        case 200:
          this._pins = response.responseBody.pins;
          break;
        case 400:
        case 404:
          console.log('Pins by profile fetching error. Status: ', response.status);
          this._status = storeStatuses.clientSidedError;
          this._pins = [];
          break;
        default:
          console.log('Internal error');
          this._status = storeStatuses.internalError;
          break;
      }

      this._trigger('change');
    });
  }

  /**
   * Fetch pins by board
   * @param {Object} data consists of board ID and options like fetching number
   * @private
   */
  _fetchBoardPins(data) {
    API.getPinsByBoardID(data.boardID).then((response) => {
      switch (response.status) {
        case 200:
          this._pins = response.responseBody.pins;
          break;
        case 400:
        case 404:
          console.log('Pins by board fetching error. Status: ', response.status);
          this._status = storeStatuses.clientSidedError;
          this._pins = [];
          break;
        default:
          console.log('Internal error');
          this._status = storeStatuses.internalError;
          break;
      }

      this._trigger('change');
    });
  }

  /**
   * Get Pins
   * @return {[]}
   */
  getPins() {
    return this._pins;
  }

  /**
   * Get pin
   * @return {Pin}
   */
  getPin() {
    return this._pin;
  }

  /**
   * Get status
   * @return {String}
   */
  getStatus() {
    return this._status;
  }
}

export const pinsStore = new PinsStore();
