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

      const parsedJson = await response.json();

      return {
        status: response.status,
        responseBody: parsedJson,
      };
    } catch (e) {
      return {
        status: 500,
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
    return this._requestBackend(path, {method: 'PUT', body});
  }

  /**
   * DELETE
   * @param {String} path
   * @return {Object}
   */
  static delete(path) {
    return this._requestBackend(path, {method: 'DELETE'});
  }
}
