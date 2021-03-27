import {appRouter} from './appManagers/router.js';
import {ProfileView} from './views/profile/profileView.js';

appRouter.start();

appRouter.register('/profile', new ProfileView({}));
appRouter.go('/profile');
