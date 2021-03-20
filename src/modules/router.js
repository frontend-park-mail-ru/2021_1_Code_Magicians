import {NotFoundView} from '../views/notFoundView.js';

import {pathParamRegExp, regSubstr} from '../consts/regexp.js';
import {pathTemplates} from '../consts/pathTemplates.js';

/**
 * Extracts keys from the path, using the template
 * @param {String} path
 * @param {String} template
 * @return {Object}
 */
function getPathArgs(path, template) {
  const splitPath = path.split('/');

  return template
      .split('/')
      .reduce((args, propName, index) => {
        if (propName.startsWith(':')) {
          args[propName.slice(1)] = splitPath[index];
        }

        return args;
      }, {});
}

/**
 * Router
 */
class Router {
  /**
   * Makes new router
   */
  constructor() {
    this.routes = new Map();
    this.routes.set('/404', new NotFoundView());
  }

  /**
   * Register new view, associated with specific path
   * @param {String} path in string templates format
   * @param {View} view
   * @return {Router}
   */
  register(path, view) {
    this.routes.set(path, view);
    return this;
  }

  /**
   * Goes to specified path
   * @param {String} path
   */
  go(path) {
    const prevView = this.currentView;
    if (prevView) {
      prevView.remove();
    }

    const key = [...this.routes.keys()].find(key => {
      return RegExp(
          `^${
            key.replaceAll(
                pathParamRegExp,
                substring => substring.endsWith('/') ? `${regSubstr}/` : regSubstr,
            )
          }$`,
      ).test(path);
    });

    this.currentView = key ? this.routes.get(key) : this.routes.get(pathTemplates.notFound);

    window.history.pushState(null, null, path);

    this.currentView.show(getPathArgs(path, key));
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
    window.addEventListener('popstate', () => this.go(window.location.pathname));
    window.addEventListener('click', ev => {
      if (ev.target instanceof HTMLAnchorElement) {
        ev.preventDefault();
        this.go(ev.target.href);
      }
    });

    this.go(window.location.pathname);
  }
}

export default new Router();
