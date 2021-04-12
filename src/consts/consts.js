import {Pin} from 'models/pin/Pin';

// noinspection JSUnresolvedVariable
export const constants = {
  network: {
    backendURL: DEBUG ? 'http://127.0.0.1:8080' : 'http://www.pinter-best.com:8080',
    defaultAvatarLink: '/assets/img/default-avatar.jpg',
    bucketURL: 'https://pinterbestbucket.s3.eu-central-1.amazonaws.com/',

    pathsAPI: {
      signup: '/auth/signup',
      login: '/auth/login',
      logout: '/auth/logout',
      authCheck: '/auth/check',

      profile: '/profile',
      selfProfile: '/profile',
      editProfile: '/profile/edit',
      changePassword: '/profile/password',
      deleteProfile: '/profile/delete',
      changeAvatar: '/profile/avatar',

      board: '/board',
      boards: '/boards',
      comment: '/comment',
      comments: '/comments',

      pin: '/pin',
      pins: '/pins',

      follow: '/follow',
    },

    routerPaths: {
      notFound: '/404',
      index: '/',
      home: '/home',
      profile: '/profile',
      profileBoards: '/profile/boards',
      profilePins: '/profile/pins',
      otherProfile: '/profile/:profileID{Number}',
      otherProfileBoards: '/profile/:profileID{Number}/boards',
      otherProfilePins: '/profile/:profileID{Number}/pins',
      settings: '/settings',
      settingsSection: '/settings/:section{String}',
      signup: '/signup',
      login: '/login',
      createPin: '/create-pin',
      pin: '/pin/:id{Number}',
    },
  },
  store: {
    statuses: {
      userStore: {
        ok: 'ok',

        alreadyAuthorized: 'already authorized',
        unauthorized: 'unauthorized',

        passwordChanged: 'password changed',
        profileEdited: 'profile edited',
        editConflict: 'edit conflict',
        badAvatarImage: 'bad avatar',

        clientError: 'client error',
        internalError: 'internal error',
      },
      pinsStore: {
        ok: 'ok',
        pinCreated: 'pin-created',
        pinDeleted: 'pin-deleted',

        triedToDeleteForeignPin: 'foreign-pin-delete',
        userUnauthorized: 'unauthorized',

        clientSidedError: 'client-error',

        internalError: 'internal-error',
      },
      boardsStore: {
        ok: 'ok',

        boardCreated: 'board-created',
        boardDeleted: 'board-deleted',
        userUnauthorized: 'unauthorized',

        clientSidedError: 'client-error',

        internalError: 'internal-error',
      },
      profilesStore: {
        ok: 'profiles-ok',
        followed: 'followed',
        unfollowed: 'unfollowed',

        userUnauthorized: 'unauthorized',

        clientSidedError: 'client-error',

        internalError: 'internal-error',
      },
    },
  },
  mocks: {
    defaultProfile: {
      ID: 1,
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
    pins: Array(50).fill(0).map((pin, i) => new Pin({
      ID: i,
      boardID: 100 + i % 3,
      title: `title${i}`,
      description: 'blah blah blah',
      tags: [],
      imageLink: '/assets/img/default-avatar.jpg',
    })),
    boards: [
      {
        ID: 1,
        avatarLink: '/assets/img/boards/1.jpg',
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
