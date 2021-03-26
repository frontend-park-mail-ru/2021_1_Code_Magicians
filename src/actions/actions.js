import {appDispatcher} from '../appManagers/dispatcher.js';

export const actionTypes = {
  user: {
    signup: 'signup',
    login: 'login',
    logout: 'logout',
    checkAuth: 'check-auth',

    editProfile: 'edit-profile',
    deleteProfile: 'delete-profile',
    changePassword: 'change-password',
  },
};

export const actions = {
  user: {
    signup: (username, email, password) => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.signup,
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
    },
    login: (username, password) => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.login,
        data: {
          username: username,
          password: password,
        },
      });
    },
    logout: () => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.logout,
        data: {},
      });
    },
    checkAuth: () => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.checkAuth,
        data: {},
      });
    },
    editProfile: (changes) => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.editProfile,
        data: changes,
      });
    },
    deleteProfile: () => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.deleteProfile,
        data: {},
      });
    },
    changePassword: (password) => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.changePassword,
        data: {
          password: password,
        },
      });
    },
  },
};
