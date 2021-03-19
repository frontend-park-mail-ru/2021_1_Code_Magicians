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
   * @return {Promise<{parsedJson: Object, status: number}>}
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
   * @return {Promise<{parsedJson: Object, status: number}>}
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
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static logoutUser() {
    return HTTPModule.post('/auth/logout');
  }

  /**
   * Check if user is authenticated
   * @return {Promise<{parsedJson: Object, status: number}>}
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
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static getProfileByUsernameOrID(usernameOrID) {
    return HTTPModule.get('/profile/' + usernameOrID);
  }

  /**
   * Update profile
   * @param {Object} changes
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static editProfile(changes) {
    return HTTPModule.put('/profile/edit', changes);
  }

  /**
   * Update user password
   * @param {String} newPassword
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static changeUserPassword(newPassword) {
    return HTTPModule.put('/profile/password', {password: newPassword});
  }

  /**
   * Delete profile
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static deleteSelfProfile() {
    return HTTPModule.delete('/profile/delete');
  }

  /**
   * Create new board
   * @param {String} title
   * @param {String} description
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static createBoard({title, description}) {
    return HTTPModule.post('/board', {title: title, description: description});
  }

  /**
   * Get board by ID
   * @param {String} boardID
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static getBoardByID(boardID) {
    return HTTPModule.get('/board/' + boardID);
  }

  /**
   * Create new pin
   * @param {Object} pinInfo
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static createPin(pinInfo) {
    return HTTPModule.post('/pin', pinInfo);
  }

  /**
   * Get pin by ID
   * @param {String} pinID
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static getPinByID(pinID) {
    return HTTPModule.get('/pin/' + pinID);
  }

  /**
   * Delete pin by ID
   * @param {String} pinID
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static deletePinByID(pinID) {
    return HTTPModule.delete('/pin/' + pinID);
  }

  /**
   * Get pins by board id of their board
   * @param {String} boardID
   * @return {Promise<{parsedJson: Object, status: number}>}
   */
  static getPinsByBoardID(boardID) {
    return HTTPModule.get('/pins/' + boardID);
  }
}
