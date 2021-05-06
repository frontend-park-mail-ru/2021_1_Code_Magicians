import { NotFoundView } from 'views/notFoundView/notFoundView';
import {
  pathParamRegExp,
  pathPropTypeRegexp,
  regSubstr,
  urlRegexp,
} from 'consts/regexp';
import { constants } from 'consts/consts';

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
    if (path.endsWith('/') && path !== '/') {
      path = path.slice(0, -1);
    }

    if (path === '/home') {
      path = '/';
    }

    const prevView = this._currentView;
    if (prevView) {
      prevView.remove();
    }

    let key = [...this._routes.keys()].find((key) => key === path);
    if (!key) {
      key = [...this._routes.keys()].find((key) => RegExp(
        `^${
          key.replaceAll(
            pathParamRegExp,
            (substring) => (substring.endsWith('/') ? `${regSubstr}/` : regSubstr),
          )
        }$`,
      ).test(path));
    }

    this._currentView = key ? this._routes.get(key) : this._routes.get(constants.network.routerPaths.notFound);

    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }

    const { argsValid, pathArgs } = this._getPathArgs(path, key);
    if (!argsValid) {
      this._currentView = this._routes.get(constants.network.routerPaths.notFound);
    }

    this._currentView.show(pathArgs);
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

  /**
   * Extracts keys from the path, using the template
   * @param {String} path
   * @param {String} template
   * @return {Object}
   */
  _getPathArgs(path, template) {
    if (!template) {
      return {};
    }

    let argsValid = true;
    const splitPath = path.split('/');

    const pathArgs = template
      .split('/')
      .reduce((args, prop, index) => {
        const propName = prop.replace(pathPropTypeRegexp, '');

        if (propName.startsWith(':')) {
          const propValue = splitPath[index];
          const propType = prop.match(pathPropTypeRegexp)[2];
          switch (propType) {
          case 'Number':
            argsValid = argsValid && !Number.isNaN(Number(propValue));
            break;
          default:
            argsValid = true;
            break;
          }
          args[propName.slice(1)] = propValue;
        }

        return args;
      }, {});

    return { argsValid, pathArgs };
  }
}

export const appRouter = new Router();
