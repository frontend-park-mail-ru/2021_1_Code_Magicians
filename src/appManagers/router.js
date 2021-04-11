import {NotFoundView} from '../views/notFoundView/notFoundView.js';

import {pathParamRegExp, regSubstr, urlRegexp} from '../consts/regexp.js';
import {constants} from '../consts/consts.js';

/**
 * Extracts keys from the path, using the template
 * @param {String} path
 * @param {String} template
 * @return {Object}
 */
function getPathArgs(path, template) {
  if (!template) return {};
  const splitPath = path.split('/');

  // noinspection UnnecessaryLocalVariableJS
  const pathArgs = template
      .split('/')
      .reduce((args, propName, index) => {
        if (propName.startsWith(':')) {
          args[propName.slice(1)] = splitPath[index];
        }

        return args;
      }, {});

  return pathArgs;
}

/**
 * Router
 */
class Router {
  /**
   * Makes new router
   */
  constructor() {
    this._routes = new Map();
    this.register('/404', new NotFoundView());
  }

  /**
   * Register new view, associated with specific path
   * @param {String} path in string templates format
   * @param {View} view
   * @return {Router}
   */
  register(path, view) {
    this._routes.set(path, view);
    return this;
  }

  /**
   * Goes to specified path
   * @param {String} path
   */
  go(path) {
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    if (path === '/home') {
      path = '/';
    }

    const prevView = this._currentView;
    if (prevView) {
      prevView.remove();
    }

    const key = [...this._routes.keys()].find((key) => {
      return RegExp(
          `^${
            key.replaceAll(
                pathParamRegExp,
                (substring) => substring.endsWith('/') ? `${regSubstr}/` : regSubstr,
            )
          }$`,
      ).test(path);
    });

    this._currentView = key ? this._routes.get(key) : this._routes.get(constants.network.routerPaths.notFound);

    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }

    this._currentView.show(getPathArgs(path, key));
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
    window.addEventListener('click', (event) => {
      let targetURL = '';
      if (event.target instanceof HTMLAnchorElement) {
        targetURL = event.target.href;
      } else {
        const parentAnchor = event.target.closest('a');
        if (parentAnchor) {
          targetURL = parentAnchor.href;
        }
      }

      if (targetURL.startsWith(window.location.origin)) {
        event.preventDefault();
        this.go(targetURL.replace(urlRegexp, ''));
      }
    });

    this.go(window.location.pathname);
  }
}

export const appRouter = new Router();
