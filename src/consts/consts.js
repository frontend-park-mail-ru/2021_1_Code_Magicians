import {appDispatcher} from '../appManagers/dispatcher.js';

export const backendURL = 'localhost:3000';

export const actionTypes = {
  user: {
    signup: 'signup',
    login: 'login',
    checkAuth: 'check-auth',
    logout: 'logout',

    editProfile: 'edit-profile',
    deleteProfile: 'delete-profile',
    changePassword: 'change-password',
  },
};

export const defaultAvatarLink = 'assets/img/default-avatar.jpg';

export const actionsList = {
  /**
   * Logs in user
   * @param {String} username
   * @param {String} password
   */
  loginUser(username, password) {
    appDispatcher.dispatch({
      action: actionTypes.user.login,
      data: {
        username: username,
        password: password,
      },
    });
  },
};
