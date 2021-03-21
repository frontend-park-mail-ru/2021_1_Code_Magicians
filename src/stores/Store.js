import {appDispatcher} from '../appManagers/dispatcher.js';

/**
 * Basic Store class
 */
export class Store {
  /**
   * Makes new Store
   */
  constructor() {
    this.processEvent = this.processEvent.bind(this);
    this.dispatcherToken = appDispatcher.register(this.processEvent);
  }

  /**
   * This function is registered in Dispatcher as a callback. It processes event,
   * given by the dispatcher and do some necessary work, if needed
   * @param {Object} action -- action, presented by Dispatcher.
   * It contains action type (String) and action data (Object) for Store to work with it.
   */
  processEvent(action) {
  }
}
