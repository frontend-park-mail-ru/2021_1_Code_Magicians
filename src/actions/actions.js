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

    statusProcessed: 'error-processed',
  },
  profiles: {
    follow: 'follow-profile',
    unfollow: 'unfollow-profile',
  },
  common: {
    loadForeignProfile: 'load-profile',
    loadPin: 'load-pin', // load pin for pin's page. It contains messages, author's profile and so on
    loadBoard: 'load-board',
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

    statusProcessed: () => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.statusProcessed,
        data: {},
      });
    },
  },
  common: {
    loadForeignProfile: (profileID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.common.loadForeignProfile,
        data: {
          profileID: profileID,
        },
      });
    },
    loadPin: (pinID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.common.loadPin,
        data: {
          pinID: pinID,
        },
      });
    },
    loadBoard: (boardID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.common.loadBoard,
        data: {
          boardID: boardID,
        },
      });
    },
  },
};
