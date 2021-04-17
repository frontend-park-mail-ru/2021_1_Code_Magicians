/* eslint-disable valid-jsdoc */
import {HTTPModule} from './http';
import {constants} from 'consts/consts';

const paths = constants.network.pathsAPI;

/**
 * Module that provides abstraction to communicate with server via standard API
 */
export class API {
  /**
   * Create user profile
   * @param {String} username
   * @param {String} email
   * @param {String} password
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
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
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
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
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static logoutUser() {
    return HTTPModule.post(paths.logout);
  }

  /**
   * Check if user is authenticated
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static checkUserAuth() {
    return HTTPModule.get(paths.authCheck);
  }

  /**
   * Get profile of the current user
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static getSelfProfile() {
    return HTTPModule.get(paths.selfProfile);
  }

  /**
   * Get profile by username OR ID
   * @param {String} usernameOrID
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static getProfileByUsernameOrID(usernameOrID) {
    return HTTPModule.get(`${paths.profile}/${usernameOrID}`);
  }

  /**
   * Update profile
   * @param {Object} changes
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static editProfile(changes) {
    return HTTPModule.put(paths.editProfile, changes);
  }

  /**
   * Update user password
   * @param {String} newPassword
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static changeUserPassword(newPassword) {
    return HTTPModule.put(paths.changePassword, {password: newPassword});
  }

  /**
   * Delete profile
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static deleteSelfProfile() {
    return HTTPModule.delete(paths.deleteProfile);
  }

  /**
   * Create new board
   * @param {String} title
   * @param {String} description
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static createBoard({title, description}) {
    return HTTPModule.post(paths.board, {title: title, description: description});
  }

  /**
   * Get board by ID
   * @param {String} boardID
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static getBoardByID(boardID) {
    return HTTPModule.get(`${paths.board}/${boardID}`);
  }

  /**
   * Delete it
   * @param {String} boardID
   * @return {Promise<{headers: Headers, responseBody: {}, status: number}>}
   */
  static deleteBoardByID(boardID) {
    return HTTPModule.delete(`${paths.board}/${boardID}`);
  }

  /**
   * Get boards by author ID
   * @param {String} authorID
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static getProfileBoards(authorID) {
    return HTTPModule.get(`${paths.boards}/${authorID}`);
  }

  /**
   * Create new pin
   * @param {Object} pinInfo
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static createPin(pinInfo) {
    return HTTPModule.post(paths.pin, pinInfo, false);
  }

  /**
   * Get pin by it's ID
   * @param {String} pinID
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static getPinByID(pinID) {
    return HTTPModule.get(`${paths.pin}/${pinID}`);
  }

  /**
   * Delete pin by ID
   * @param {String} pinID
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static deletePinByID(pinID) {
    return HTTPModule.delete(`${paths.pin}/${pinID}`);
  }

  /**
   * Get pins by board id of their board
   * @param {String} boardID
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static getPinsByBoardID(boardID) {
    return HTTPModule.get(`${paths.pins}/${boardID}`);
  }

  /**
   * Get pins by profile id
   * @param {Number} profileID
   * @param {Number} pinsNumber
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static getPinsByProfileID(profileID, pinsNumber = 0) {
    const queries = pinsNumber ? `?pinsNumber=${pinsNumber}` : '';
    return HTTPModule.get(`${paths.pins}/${profileID}${queries}`);
  }

  /**
   * Get feed
   * @param {Number} pinsNumber
   * @return {Promise<{headers: Headers, responseBody: {}, status: number}>}
   */
  static getPinsFeed(pinsNumber = 50) {
    return HTTPModule.get(`${paths.pinsFeed}/${pinsNumber}`);
  }

  /**
   * Get Comments gy pin id
   * @param {Number} pinID
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static getComments(pinID) {
    return HTTPModule.get(`${paths.comments}/${pinID}`);
  }

  /**
   * Post new comment
   * @param {String} commentText
   * @param {Number} pinID
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static postComment(commentText, pinID) {
    return HTTPModule.post(`${paths.comment}/${pinID}`, {text: commentText});
  }

  /**
   * Follow profile
   * @param {String} profileID
   * @param {Boolean} follow
   * @return {Promise<{headers: Headers | Headers, responseBody: {}, status: number}>}
   */
  static followProfile(profileID, follow = true) {
    return follow ? HTTPModule.post(`${paths.follow}/${profileID}`) :
      HTTPModule.delete(`${paths.follow}/${profileID}`);
  }

  /**
   * Change avatar
   * @param {FormData} avatarFormData
   * @return {Promise<{headers: Headers, responseBody: {}, status: number}>}
   */
  static changeAvatar(avatarFormData) {
    return HTTPModule.put(paths.changeAvatar, avatarFormData, false);
  }

  /**
   * Mark notification as read
   * @param notificationID
   * @return {Promise<{headers: Headers, responseBody: {}, status: number}>}
   */
  static markNotificationRead(notificationID) {
    return HTTPModule.put(`${paths.notificationRead}/${notificationID}`);
  }
}
