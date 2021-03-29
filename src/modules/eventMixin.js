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
    if (!(event in this._listeners)) return;
    this._listeners[event].splice(this._listeners[event].indexOf(callback), 1);
  },

  /**
   * Trigger event with some data
   * @param {String} event
   * @param {args} args
   * @private
   */
  _trigger(event, ...args) {
    this._listeners = this._listeners || {};
    if (! (event in this._listeners)) return;
    this
        ._listeners[event]
        .forEach((listener) => listener.apply(this, args));
  },
};
