import {appDispatcher} from '../appManagers/dispatcher.js';

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
