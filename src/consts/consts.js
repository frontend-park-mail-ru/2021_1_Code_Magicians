export const constants = {
  network: {
    backendURL: 'http://localhost:3000',
    defaultAvatarLink: 'assets/img/default-avatar.jpg',
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
