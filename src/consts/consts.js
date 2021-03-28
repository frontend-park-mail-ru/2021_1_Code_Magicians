export const constants = {
  network: {
    backendURL: 'http://localhost:3000',
    frontendURL: `http://${window.location.hostname}:3000`,
    defaultAvatarLink: '/assets/img/default-avatar.jpg',

    paths: {
      signup: '/auth/signup',
      login: '/auth/login',
      logout: '/auth/logout',
      authCheck: '/auth/check',

      profile: 'profile',
      selfProfile: '/profileViews',
      editProfile: '/profileViews/edit',
      changePassword: '/profileViews/password',
      deleteProfile: 'profileViews/delete',

      board: '/board',
      boards: '/boards',

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

        internalError: 'internal error',
      },
    },
  },
};
