import { appDispatcher } from 'appManagers/dispatcher';

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

    sliderToggled: 'slider-toggled',
  },
  pins: {
    createPin: 'create-pin',
    deletePin: 'delete-pin',
    reportPin: 'report-pin',

    statusProcessed: 'pins-status-processed',
  },
  boards: {
    createBoard: 'create-board',
    deleteBoard: 'delete-board',
  },
  profiles: {
    follow: 'follow-profile',
    unfollow: 'unfollow-profile',
    statusProcessed: 'profile-status-processed',
  },
  comments: {
    postComment: 'post-comment',
  },
  notifications: {
    readNotification: 'read-notification',
  },
  messages: {
    sendMessage: 'send-message',
  },
  chats: {
    setActiveChat: 'set-active-chat',
  },
  common: {
    search: 'search',
  },
};

export const actions = {
  user: {
    signup: (username, email, password) => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.signup,
        data: {
          username,
          email,
          password,
        },
      });
    },
    login: (username, password) => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.login,
        data: {
          username,
          password,
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
          password,
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

    sliderToggled: (sliderName, on = true) => {
      appDispatcher.dispatch({
        actionType: actionTypes.user.sliderToggled,
        data: { sliderName, on },
      });
    },
  },
  pins: {
    createPin: (formData) => {
      appDispatcher.dispatch({
        actionType: actionTypes.pins.createPin,
        data: {
          formData,
        },
      });
    },
    deletePin: (pinID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.pins.deletePin,
        data: {
          pinID,
        },
      });
    },
    reportPin: (reportData) => {
      appDispatcher.dispatch({
        actionType: actionTypes.pins.reportPin,
        data: {
          reportData,
        },
      });
    },
    statusProcessed: () => {
      appDispatcher.dispatch({
        actionType: actionTypes.pins.statusProcessed,
        data: {},
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
          boardID,
        },
      });
    },
  },
  comments: {
    postComment: (commentText, pinID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.comments.postComment,
        data: {
          commentText,
          pinID,
        },
      });
    },
  },
  profiles: {
    follow: (profileID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.profiles.follow,
        data: {
          profileID,
        },
      });
    },
    unfollow: (profileID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.profiles.unfollow,
        data: {
          profileID,
        },
      });
    },
    statusProcessed: () => {
      appDispatcher.dispatch({
        actionType: actionTypes.profiles.statusProcessed,
        data: {},
      });
    },
  },
  notifications: {
    readNotification: (notificationID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.notifications.readNotification,
        data: { notificationID },
      });
    },
  },
  messages: {
    sendMessage: (messageText, targetUsername) => {
      appDispatcher.dispatch({
        actionType: actionTypes.messages.sendMessage,
        data: {
          messageText,
          targetUsername,
        },
      });
    },
  },
  common: {
    search: (query, searchingItems) => {
      appDispatcher.dispatch({
        actionType: actionTypes.common.search,
        data: {
          query,
          searchingItems,
        },
      });
    },
  },
  chats: {
    setActiveChat: (chatID) => {
      appDispatcher.dispatch({
        actionType: actionTypes.chats.setActiveChat,
        data: { chatID },
      });
    },
  },
};
