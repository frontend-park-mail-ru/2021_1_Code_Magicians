/**
 * Dispatcher
 */
class Dispatcher {
  /**
   * Constructs new dispatcher
   */
  constructor() {
    this._callbacks = new Map();
    this._isPending = new Map();
    this._nextID = 0;
  }

  /**
   * register new callback
   * @param {Function} callback
   * @return {String} dispatch token for waitFor
   */
  register(callback) {
    const ID = `ID_${this._nextID++}`;
    this._callbacks.set(ID, callback);

    return ID;
  }

  /**
   * Removes a callback based on its token.
   * @param {String} ID
   */
  unregister(ID) {
    this._callbacks.delete(ID);
  }

  /**
   * Call the callback stored with the given id.
   * @param {String} id
   * @param {Object} payload
   * @private
   */
  _invokeCallback(id, payload) {
    this._isPending.set(id, true);
    const callback = this._callbacks.get(id);
    callback(payload);
  }

  /**
   * Dispatches a payload to all registered callbacks.
   * @param {Object} payload
   */
  dispatch(payload) {
    this._startDispatching(payload);
    [...this._callbacks.keys()].forEach((ID) => this._invokeCallback(ID, payload));
    this._stopDispatching();
  }

  /**
   * Called on start of dispatching callback
   * @param {Object} payload
   * @private
   */
  _startDispatching(payload) {
    [...this._callbacks.keys()].forEach((ID) => this._isPending.set(ID, false));
    this._pendingPayload = payload;
  }

  /**
   * Called on stop of dispatching callback
   * @private
   */
  _stopDispatching() {
    delete this._pendingPayload;
  }
}

export const appDispatcher = new Dispatcher();
