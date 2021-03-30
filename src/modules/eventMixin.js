/**
 * Event mixin
 */
export const eventMixin = {
  /**
   * Add new subscriber
   * @param {String} event
   * @param {Function} callback
   */
  bind(event, callback) {
    this._listeners = this._listeners || {};
    this._listeners[event] = this._listeners[event] || [];
    this._listeners[event].push(callback);
  },

  /**
   * Remove subscriber
   * @param {String} event
   * @param {Function} callback
   */
  unbind(event, callback) {
    this._listeners = this._listeners || {};
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  },

  /**
   * Trigger event with some data
   * @param {String} event
   * @private
   */
  _trigger(event) {
    this._listeners = this._listeners || {};
    if (!this._listeners[event]) return;
    this._listeners[event].forEach((listener) => listener());
  },
};
