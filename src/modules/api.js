import {HTTPModule} from './http.js';

// There will be models of client-sided instances. And they will be used in functions like createX or updateX
/**
 * Module that provides abstraction to communicate with server via standard API
 */
export class API {
  /**
   * Create user profile
   * @param {String} username
   * @param {String} email
   * @param {String} password
   * @return {Object}
   */
  static signupUser({username, email, password}) {
    return HTTPModule.post(
        '/auth/signup',
        {
          username: username,
          email: email,
          password: password,
        },
    );
  }

  /**
   * Log in user into the app
   * @param {String} username
   * @param {String} password
   * @return {Object}
   */
  static loginUser({username, password}) {
    return HTTPModule.post(
        '/auth/login',
        {
          username: username,
          password: password,
        },
    );
  }

  /**
   * Log out from current session
   * @return {Object}
   */
  static logoutUser() {
    return HTTPModule.post('/auth/logout');
  }

  /**
   * Check if user is authenticated
   * @return {Object}
   */
  static checkUserAuth() {
    return HTTPModule.get('/auth/check');
  }

  /**
   * Get profile of the current user
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static getSelfProfile() {
    return HTTPModule.get('/profile');
  }

  /**
   * Get profile by username OR ID
   * @param {String} usernameOrID
   * @return {Object}
   */
  static getProfileByUsernameOrID(usernameOrID) {
    return HTTPModule.get('/profile/' + usernameOrID);
  }

  /**
   * Update profile
   * @param {Object} changes
   * @return {Object}
   */
  static editProfile(changes) {
    return HTTPModule.put('/profile/edit', changes);
  }

  /**
   * Update user password
   * @param {String} newPassword
   * @return {Object}
   */
  static changeUserPassword(newPassword) {
    return HTTPModule.put('/profile/password', {password: newPassword});
  }

  /**
   * Delete profile
   * @return {Object}
   */
  static deleteSelfProfile() {
    return HTTPModule.delete('/profile/delete');
  }

  /**
   * Create new board
   * @param {String} title
   * @param {String} description
   * @return {Object}
   */
  static createBoard({title, description}) {
    return HTTPModule.post('/board', {title: title, description: description});
  }

  /**
   * Get board by ID
   * @param {String} boardID
   * @return {Object}
   */
  static getBoardByID(boardID) {
    return HTTPModule.get('/board/' + boardID);
  }

  /**
   * Create new pin
   * @param {Object} pinInfo
   * @return {Object}
   */
  static createPin(pinInfo) {
    return HTTPModule.post('/pin', pinInfo);
  }

  /**
   * Get pin by ID
   * @param {String} pinID
   * @return {Object}
   */
  static getPinByID(pinID) {
    return HTTPModule.get('/pin/' + pinID);
  }

  /**
   * Delete pin by ID
   * @param {String} pinID
   * @return {Object}
   */
  static deletePinByID(pinID) {
    return HTTPModule.delete('/pin/' + pinID);
  }

  /**
   * Get pins by board id of their board
   * @param {String} boardID
   * @return {Object}
   */
  static getPinsByBoardID(boardID) {
    return HTTPModule.get('/pins/' + boardID);
  }
}
