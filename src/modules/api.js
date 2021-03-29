import {HTTPModule} from './http.js';
import {constants} from '../consts/consts.js';

const paths = constants.network.paths;

/**
 * Module that provides abstraction to communicate with server via standard API
 */
export class API {
  /**
   * Create user profileViews
   * @param {String} username
   * @param {String} email
   * @param {String} password
   * @return {Object}
   */
  static signupUser({username, email, password}) {
    return HTTPModule.post(
        paths.signup,
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
        paths.login,
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
    return HTTPModule.post(paths.logout);
  }

  /**
   * Check if user is authenticated
   * @return {Object}
   */
  static checkUserAuth() {
    return HTTPModule.get(paths.authCheck);
  }

  /**
   * Get profileViews of the current user
   * @return {Object}
   */
  static getSelfProfile() {
    let result;
    HTTPModule.get(paths.selfProfile).then((response) => result = response);
    return result;
  }

  /**
   * Get profileViews by username OR ID
   * @param {String} usernameOrID
   * @return {Object}
   */
  static getProfileByUsernameOrID(usernameOrID) {
    return HTTPModule.get(`${paths.profile}/${usernameOrID}`);
  }

  /**
   * Update profileViews
   * @param {Object} changes
   * @return {Object}
   */
  static editProfile(changes) {
    return HTTPModule.put(paths.editProfile, changes);
  }

  /**
   * Update user password
   * @param {String} newPassword
   * @return {Object}
   */
  static changeUserPassword(newPassword) {
    return HTTPModule.put(paths.changePassword, {password: newPassword});
  }

  /**
   * Delete profileViews
   * @return {Object}
   */
  static deleteSelfProfile() {
    return HTTPModule.delete(paths.deleteProfile);
  }

  /**
   * Create new board
   * @param {String} title
   * @param {String} description
   * @return {Object}
   */
  static createBoard({title, description}) {
    return HTTPModule.post(paths.board, {title: title, description: description});
  }

  /**
   * Get board by ID
   * @param {String} boardID
   * @return {Object}
   */
  static getBoardByID(boardID) {
    return HTTPModule.get(`${paths.board}/${boardID}`);
  }

  /**
   * Get boards by author ID
   * @param {String} authorID
   * @return {Object}
   */
  static getProfileBoards(authorID) {
    return HTTPModule.get(`${paths.boards}/${authorID}`);
  }

  /**
   * Create new pin
   * @param {Object} pinInfo
   * @return {Object}
   */
  static createPin(pinInfo) {
    return HTTPModule.post(paths.pin, pinInfo);
  }

  /**
   * Get pin by ID
   * @param {String} pinID
   * @return {Object}
   */
  static getPinByID(pinID) {
    return HTTPModule.get(`${paths.pin}/${pinID}`);
  }

  /**
   * Delete pin by ID
   * @param {String} pinID
   * @return {Object}
   */
  static deletePinByID(pinID) {
    return HTTPModule.delete(`${paths.pin}/${pinID}`);
  }

  /**
   * Get pins by board id of their board
   * @param {String} boardID
   * @return {Object}
   */
  static getPinsByBoardID(boardID) {
    return HTTPModule.get(`${paths.pins}${boardID}`);
  }
}
