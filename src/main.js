import {appRouter} from './appManagers/router.js';
import {ProfileView} from './views/profile/profileView.js';
import {SettingsView} from './views/settingsView/settingsView.js';

appRouter
    .register('/profile', new ProfileView({}))
    .register('/settings', new SettingsView({}));

appRouter.start();
