import {backendURL} from '../consts/consts.js';

/**
 * Basic HTTP-module to communicate with the great server itself
 */
export class HTTPModule {
  /**
   * Makes full URL out of path
   * @param {String} path
   * @return {String}
   */
  static makeURL(path) {
    return backendURL + path;
  }

  /**
   * Request backend
   * @param {String} path
   * @param {Object} options
   * @param {Object} body
   * @return {Object}
   * @private
   */
  static async _requestBackend(path, options = {}, body = null) {
    if (['POST', 'PUT', 'DELETE'].includes(options.method)) {
      options.headers = options.headers || {};
      options.headers = {
        ...options.headers,
        'X-CSRF-Token': this._getCSRFToken(),
      };
    }

    try {
      const response = await fetch(
          this.makeURL(path),
          {
            credentials: 'include',
            mode: 'cors',
            body: body,
            ...options,
          },
      );

      if (response.headers.has('X-CSRF-Token')) {
        this._setCSRFToken(response.headers.get('X-CSRF-Token'));
      }

      const parsedJson = await response.json();

      return {
        status: response.status,
        headers: response.headers,
        responseBody: parsedJson,
      };
    } catch (e) {
      return {
        status: 500,
        headers: new Map(),
        responseBody: {},
      };
    }
  }

  /**
   * GET
   * @param {String} path
   * @return {Object}
   */
  static get(path) {
    return this._requestBackend(path, {method: 'GET'});
  }

  /**
   * POST
   * @param {String} path
   * @param {Object} body
   * @return {Object}
   */
  static post(path, body = null) {
    return this._requestBackend(path, {method: 'POST'}, body);
  }

  /**
   * PUT
   * @param {String} path
   * @param {Object} body
   * @return {Object}
   */
  static put(path, body) {
    return this._requestBackend(path, {method: 'PUT'}, body);
  }

  /**
   * DELETE
   * @param {String} path
   * @return {Object}
   */
  static delete(path) {
    return this._requestBackend(path, {method: 'DELETE'});
  }

  /**
   * Get existing CSRF token
   * @return {String}
   * @private
   */
  static _getCSRFToken() {
    return window.localStorage.getItem('CSRF-Token');
  }

  /**
   * Set new CSRF token, provided by server
   * @param {String} token
   * @private
   */
  static _setCSRFToken(token) {
    window.localStorage.setItem('CSRF-token', token);
  }
}
