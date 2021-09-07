// noinspection JSUnresolvedVariable

export const constants = {
  network: {
    backendURL: DEBUG ? 'http://127.0.0.1:8080' : 'https://pinter-best.com',
    defaultAvatarLink: '/assets/img/default-avatar.jpg',
    bucketURL: 'https://pinterbest-bucket.s3.eu-central-1.amazonaws.com/',
    wsURL: DEBUG ? 'ws://127.0.0.1:8080/socket' : 'wss://pinter-best.com:8080/socket',

    pathsAPI: {
      signup: '/api/auth/signup',
      vksignup: '/api/vk_token/signup',
      login: '/api/auth/login',
      vklogin: '/api/vk_token/login',
      logout: '/api/auth/logout',
      authCheck: '/api/auth/check',

      profile: '/api/profile',
      selfProfile: '/api/profile',
      editProfile: '/api/profile/edit',
      changePassword: '/api/profile/password',
      deleteProfile: '/api/profile/delete',
      changeAvatar: '/api/profile/avatar',

      getFollowers: '/api/followers',
      getFollowing: '/api/following',

      board: '/api/board',
      boards: '/api/boards',
      comment: '/api/comment',
      comments: '/api/comments',

      pin: '/api/pin',
      pins: '/api/pins',
      pinsFeed: '/api/pins/feed',
      pinsSubscriptionFeed: '/api/pins/followed',
      reportPin: '/api/pin/report',

      follow: '/api/follow',

      notificationRead: '/api/notifications/read',

      postMessage: '/api/message',
      chatRead: '/api/chats/read',

      searchProfiles: '/api/profiles/search',
      searchPins: '/api/pins/search',
    },

    routerPaths: {
      notFound: '/404',
      index: '/',
      home: '/home',
      profile: '/profile',
      profileBoards: '/profile/boards',
      profilePins: '/profile/pins',
      profileFollowers: '/profile/followers',
      profileFollowing: '/profile/following',
      otherProfile: '/profile/:profileID{Number}',
      otherProfileBoards: '/profile/:profileID{Number}/boards',
      otherProfilePins: '/profile/:profileID{Number}/pins',
      otherProfileFollowers: '/profile/:profileID{Number}/followers',
      otherProfileFollowing: '/profile/:profileID{Number}/following',
      settings: '/settings',
      settingsSection: '/settings/:section{String}',
      signup: '/signup',
      vksignup: '/signup/callback',
      login: '/login',
      vklogin: '/login/callback',
      createPin: '/create-pin',
      pin: '/pin/:pinID{Number}',
      board: '/board/:boardID{Number}',
      search: '/search/:query{String}',
    },
  },
  store: {
    statuses: {
      userStore: {
        ok: 'ok',
        unauthorized: 'unauthorized',
        invalidCredentials: 'invalid credentials',

        passwordChanged: 'password changed',
        profileEdited: 'profile edited',
        avatarUploaded: 'avatar uploaded',
        messageSent: 'message sent',
        editConflict: 'edit conflict',
        badAvatarImage: 'bad avatar',
        signupConflict: 'signup conflict',
        userNotFound: 'user not found',
        vkprocessing: 'processing vk data',

        clientError: 'client error',
        internalError: 'internal error',
      },
      pinsStore: {
        ok: 'ok',

        pinCreated: 'pin-created',
        pinDeleted: 'pin-deleted',
        pinReported: 'pin-reported',

        triedToDeleteForeignPin: 'foreign-pin-delete',
        userUnauthorized: 'unauthorized',
        pinNotFound: 'pin-not-found',

        clientSidedError: 'client-error',

        internalError: 'internal-error',
      },
      boardsStore: {
        ok: 'ok',

        boardCreated: 'board-created',
        boardDeleted: 'board-deleted',
        userUnauthorized: 'unauthorized',
        boardNotFound: 'board-not-found',

        clientSidedError: 'client-error',

        internalError: 'internal-error',
      },
      profilesStore: {
        ok: 'profiles-ok',
        followed: 'followed',
        unfollowed: 'unfollowed',
        profileNotFound: 'profile-not-found',

        followersNotFound: 'followers-not-found',

        userUnauthorized: 'unauthorized',

        clientError: 'client-error',

        internalError: 'internal-error',
      },
      notificationsStore: {
        ok: 'notifications-ok',
        internalError: 'internal-error',
      },
    },
  },
  toastMessages: {
    unknownError: 'Something went wrong. Please, try to refresh the page or come back later.',
  },
  mocks: {
    defaultProfile: {
      ID: null,
      username: 'username',
      avatarLink: '/assets/img/default-avatar.jpg',
    },
    messages: Array(10).fill(0).map((item, i) => ({
      imageLink: '/assets/img/Logo.png',
      header: 'Pinterbest',
      text: 'Welcome to Pinterbest! Welcome to Pinterbest Welcome to Pinterbest Welcome to Pinterbest',
      isNew: i % 2 === 0,
    })),
    notifications: Array(5).fill(0).map((item, i) => ({
      imageLink: '/assets/img/Logo.png',
      header: 'Pinterbest',
      text: 'Welcome to Pinterbest! Welcome to Pinterbest Welcome to Pinterbest Welcome to Pinterbest',
      isNew: i % 2 !== 0,
    })),
    pins: Array(50).fill(0).map((pin, i) => ({
      ID: i,
      boardID: 100 + i % 3,
      title: `title${i}`,
      description: 'blah blah blah',
      tags: [],
      imageLink: '/assets/img/default-avatar.jpg',
    })),
    comments: Array(10).fill(0).map((comment, i) => ({
      ID: i,
      userID: 100 + i % 3,
      pinID: `title${i}`,
      addingTime: 'blah blah blah',
      text: 'Nothing beats being paid for doing nothing',
    })),
    boards: [
      {
        ID: 1,
        avatarLink: '/assets/img/boards/1.jpg',
        pins: [],
        title: 'title1',
      },
      {
        ID: 2,
        avatarLink: '/assets/img/boards/2.jpg',
        title: 'title2',
      },
      {
        ID: 3,
        avatarLink: '/assets/img/boards/3.jpg',
        title: 'title3',
      },
      {
        ID: 4,
        avatarLink: '/assets/img/boards/4.jpg',
        title: 'title4',
      },
      {
        ID: 5,
        avatarLink: '/assets/img/boards/5.jpg',
        title: 'title5',
      },
      {
        ID: 6,
        avatarLink: '/assets/img/boards/6.jpg',
        title: 'title6',
      },
    ],
  },
};
