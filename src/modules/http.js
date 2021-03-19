const backendURL = 'localhost:3000';

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
   * @return {Promise<{parsedJson: any, status: number}>}
   * @private
   */
  static async _requestBackend(path, options = {}, body = null) {
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
  }

  // HOW TO KNOW IS THERE ANY BODY IN RESPONSE FETCH API

  /**
   * GET
   * @param {String} path
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static get(path) {
    return this._requestBackend(path, {method: 'GET'});
  }

  /**
   * POST
   * @param {String} path
   * @param {Object} body
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static post(path, body = null) {
    return this._requestBackend(path, {method: 'POST'}, body);
  }

  /**
   * PUT
   * @param {String} path
   * @param {Object} body
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static put(path, body) {
    return this._requestBackend(path, {method: 'PUT', body});
  }

  /**
   * DELETE
   * @param {String} path
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static delete(path) {
    return this._requestBackend(path, {method: 'DELETE'});
  }
}
