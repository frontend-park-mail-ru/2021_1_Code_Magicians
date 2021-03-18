/**
 * State Manager
 */
class StateManager {
  /**
   * Makes new state manager
   */
  constructor() {
    this.listeners = {};
    this._storage = {};
  }

  /**
   * Add new state change listener
   * @param {String} stateName
   * @param {Function} callback
   */
  addStateListener(stateName, callback) {
    if (!this.listeners[stateName]) {
      this.listeners[stateName] = [];
    }

    this.listeners[stateName].push(callback);
  }

  /**
   * Remove state change listener
   * @param {String} stateName
   * @param {Function} callback
   */
  removeStateListener(stateName, callback) {
    if (this.listeners[stateName]) {
      this.listeners[stateName] =
          this.listeners[stateName]
              .filter(
                  (listener) => listener !== callback)
      ;
    }
  }

  /**
   * Publish state change
   * @param {String} stateName
   */
  _publishStateChange(stateName) {
    if (this.listeners[stateName]) {
      this.listeners[stateName].forEach((listener) => listener());
    }
  }

  /**
   * Update some state in storage and publish that change to listeners
   * @param {String} stateName
   *@param {Object} state
   */
  setState(stateName, state) {
    this._storage[stateName] = {...this._storage[stateName], ...state};
    this._publishStateChange(stateName);
  }

  /**
   * Returns asked state
   * @param {String} stateName
   * @return {Object}
   */
  getState(stateName) {
    return this._storage[stateName];
  }
}

export default new StateManager();
