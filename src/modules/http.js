import {constants} from '../consts/consts';

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
    return constants.network.backendURL + path;
  }

  /**
   * Request backend
   * @param {String} path
   * @param {Object} options
   * @param {Object} body
   * @param {Boolean} serialize
   * @return {Object}
   * @private
   */
  static async _requestBackend(path, options = {}, body = null, serialize = true) {
    if (['POST', 'PUT', 'DELETE'].includes(options.method)) {
      if (this._getCSRFToken()) {
        options.headers = options.headers || new Headers();
        options.headers = {
          ...options.headers,
          'X-CSRF-Token': this._getCSRFToken(),
        };
      }
    }

    let status = 228;
    let headers = new Headers();
    let responseBody = {};

    if (body) {
      options.body = serialize ? JSON.stringify(body) : body;
      if (serialize) {
        options.headers = options.headers || new Headers();
        options.headers = {...options.headers, 'Content-Type': 'application/json;charset=utf-8'};
      }
    }

    try {
      const response = await fetch(
          this.makeURL(path),
          {
            credentials: 'include',
            mode: 'cors',
            ...options,
          },
      );

      if (response.headers.has('X-CSRF-Token')) {
        this._setCSRFToken(response.headers.get('X-CSRF-Token'));
      }

      if (response.headers.has('Content-Length') && response.headers.get('Content-Length') !== '0') {
        responseBody = await response.json();
      }

      headers = response.headers;
      status = response.status;
    } catch (e) {}

    if (!DEBUG) {
      console.clear();
    }

    return {
      status: status,
      headers: headers,
      responseBody: responseBody,
    };
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
   * @param {Boolean} serialize
   * @return {Object}
   */
  static post(path, body = null, serialize = true) {
    return this._requestBackend(path, {method: 'POST'}, body, serialize);
  }

  /**
   * PUT
   * @param {String} path
   * @param {Object} body
   * @param {Boolean} serialize
   * @return {Object}
   */
  static put(path, body, serialize = true) {
    return this._requestBackend(path, {method: 'PUT'}, body, serialize);
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
