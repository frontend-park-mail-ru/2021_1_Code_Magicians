import {appDispatcher} from '../appManagers/dispatcher.js';

export const actionTypes = {
  user: {
    signup: 'signup',
    login: 'login',
    logout: 'logout',
    checkAuth: 'check-auth',

    editProfile: 'profile-edit',
    deleteProfile: 'profile-delete',
    changePassword: 'change-password',
  },
  pin: {
    create: 'pin-create',
    delete: 'pin-delete',
  },
  board: {
    create: 'board-create',
    delete: 'board-delete',
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
  pin: {
    create: () => {},
    delete: (pinID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.pin.delete,
        data: {
          pinID: pinID,
        },
      });
    },
  },
  board: {
    create: (title, description) => {
      appDispatcher.dispatch({
        actionType: actionTypes.board.create,
        data: {
          title: title,
          description: description,
        },
      });
    },
    delete: (boardID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.board.delete,
        data: {
          boardID: boardID,
        },
      });
    },
  },
};
