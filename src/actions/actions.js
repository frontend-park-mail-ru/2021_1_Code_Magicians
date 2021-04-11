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
    changeAvatar: 'change-avatar',

    statusProcessed: 'error-processed',
  },
  pins: {
    createPin: 'create-pin',
    deletePin: 'delete-pin',
    loadPinsFeed: 'load-pins-feed',

    statusProcessed: 'pins-status-processed',
  },
  boards: {
    createBoard: 'create-board',
    deleteBoard: 'delete-board',
    loadBoardsFeed: 'load-boards-feed',
  },
  profiles: {
    follow: 'follow-profile',
    unfollow: 'unfollow-profile',
  },
  comments: {
    postComment: 'post-comment',
  },
  common: {
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
    changeAvatar: (avatarFormData) => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.changeAvatar,
        data: avatarFormData,
      });
    },

    statusProcessed: () => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.statusProcessed,
        data: {},
      });
    },
  },
  pins: {
    createPin: (formData) => {
      appDispatcher.dispatch({
        actionType: actionTypes.pins.createPin,
        data: {
          formData: formData,
        },
      });
    },
    deletePin: (pinID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.pins.deletePin,
        data: {
          pinID: pinID,
        },
      });
    },
    loadPinsFeed: (pinsNumber) => {
      appDispatcher.dispatch({
        actionType: actionTypes.pins.loadPinsFeed,
        data: {
          pinsNumber: pinsNumber,
        },
      });
    },
  },
  boards: {
    createBoard: (boardData) => {
      appDispatcher.dispatch({
        actionType: actionTypes.boards.createBoard,
        data: boardData,
      });
    },
    deleteBoard: (boardID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.boards.deleteBoard,
        data: {
          boardID: boardID,
        },
      });
    },
    loadBoardsFeed: (boardsNum) => {
      appDispatcher.dispatch({
        actionType: actionTypes.boards.loadBoardsFeed,
        data: {
          boardsNum: boardsNum,
        },
      });
    },
  },
  comments: {
    postComment: (commentText, pinID) => {
      appDispatcher.dispatch({
        data: {
          commentText: commentText,
          pinID: pinID,
        },
      });
    },
  },
  profiles: {
    follow: (profileID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.profiles.follow,
        data: {
          profileID: profileID,
        },
      });
    },
    unfollow: (profileID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.profiles.unfollow,
        data: {
          profileID: profileID,
        },
      });
    },
  },
  common: {
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
