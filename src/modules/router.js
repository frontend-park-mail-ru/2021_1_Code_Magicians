import {NotFoundView} from '../views/notFoundView.js';
import stateManager from './stateManager.js';

/**
 * Router
 */
class Router {
  /**
   * Makes new router
   */
  constructor() {
    this.routes = new Map();
    this.routes.set('/404', new NotFoundView({}));
  }

  /**
   * Register new view, associated with specific pathRegExp
   * @param {RegExp} pathRegExp
   * @param {View} view
   */
  register(pathRegExp, view) {
    this.routes.set(pathRegExp, view);
  }

  /**
   * Goes to specified path
   * @param {string} path
   */
  go(path) {
    this.prevView = this.currentView;
    if (this.prevView) {
      this.prevView.remove();
    }

    const key = [...this.routes.keys()].find((key) => key.test(path));
    this.currentView = key ? this.routes.get(key) : this.routes.get('/404');

    window.history.pushState(null, null, path);
    this.currentView.show(path);
  }

  /**
   * Goes to the previous path
   */
  back() {
    window.history.back();
  }

  /**
   * Goes to the next path
   */
  forward() {
    window.history.forward();
  }

  /**
   * Starts routing
   */
  start() {
    const currentURL = window.location.pathname;

    stateManager.setState(
        'currentURL',
        {url: currentURL},
    );

    stateManager.addStateListener(
        'currentURL',
        () => this.go(stateManager.getState('currentURL').url),
    );

    window.addEventListener('popstate', () => this.go(window.location.pathname));
    window.addEventListener('click', (ev) => {
      if (ev.target instanceof HTMLAnchorElement) {
        ev.preventDefault();
        this.go(ev.target.href);
      }
    });

    this.go(currentURL);
  }
}

export default new Router();
