export const constants = {
  network: {
    backendURL: 'http://52.59.228.167:8080',
    // backendURL: 'http://localhost:8080',
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

        clientSidedError: 'client-sided-error',
        internalError: 'internal-error',
      },
    },
  },
};
