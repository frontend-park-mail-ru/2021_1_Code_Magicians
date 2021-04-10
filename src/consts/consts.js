import {Board} from '../models/board/Board.js';
import {Pin} from '../models/pin/Pin.js';

export const constants = {
  network: {
    backendURL: 'http://52.59.228.167:8080',
    // backendURL: 'http://127.0.0.1:8080',
    defaultAvatarLink: '/assets/img/default-avatar.jpg',

    paths: {
      signup: '/auth/signup',
      login: '/auth/login',
      logout: '/auth/logout',
      authCheck: '/auth/check',

      profile: 'profile',
      selfProfile: '/profile',
      editProfile: '/profile/edit',
      changePassword: '/profile/password',
      deleteProfile: 'profile/delete',

      board: '/board',
      boards: '/boards',
      comment: '/comment',
      comments: '/comments',

      pin: '/pin',
      pins: '/pins',

      follow: '/follow',
    },
  },
  store: {
    statuses: {
      userStore: {
        ok: 'ok',

        alreadyAuthorized: 'already authorized',
        invalidCreds: 'invalid credentials',
        userNotFound: 'user not found',
        userAlreadyExists: 'user already exists',
        unauthorized: 'unauthorized',
        editConflict: 'edit conflict',

        passwordChanged: 'password changed',
        profileEdited: 'profile edited',

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
      imageLink: 'assets/img/default-avatar.jpg',
    })),
    boards: Array(10).fill(0).map((board, i) => new Board({
      ID: i,
      authorID: 100 + i % 3,
      title: `title${i}`,
      description: 'blah blah blah',
      avatarLink: 'assets/img/default-avatar.jpg',
    })),
  },
};
