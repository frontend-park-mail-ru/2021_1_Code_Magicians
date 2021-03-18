/**
 * Event bus
 */
class EventBus {
  /**
   * Makes new event bus
   */
  constructor() {
    this.listeners = {};
  }

  /**
   * Add new subscriber
   * @param {String} event
   * @param {Function} callback
   */
  addEventListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  /**
   * Remove subscriber
   * @param {String} event
   * @param {Function} callback
   */
  removeEventListener(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] =
          this.listeners[event]
              .filter(
                  (listener) => listener !== callback)
      ;
    }
  }

  /**
   * Publish event with some data
   * @param {String} event
   * @param {Object} data
   */
  emitEvent(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(data));
    }
  }
}

export default new EventBus();
