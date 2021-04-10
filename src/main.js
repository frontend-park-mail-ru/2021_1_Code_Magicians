import {appRouter} from './appManagers/router.js';
import {ProfileView} from './views/profileViews/profileView/profileView.js';
import {SettingsView} from './views/settingsView/settingsView.js';
import {ProfileBoardsView} from './views/profileViews/profileBoardsView/profileBoardsView.js';
import {SignupView} from './views/authViews/signupView/signupView.js';
import {LoginView} from './views/authViews/loginView/loginView.js';
import {FeedView} from './views/feedView/feedView.js';

appRouter
    .register('/', new FeedView({}))
    .register('/profile', new ProfileView({}))
    .register('/profile/boards', new ProfileBoardsView({}))
    .register('/profile/pins', new ProfileBoardsView({}))
    .register('/settings', new SettingsView({}))
    .register('/settings/:section', new SettingsView({}))
    .register('/signup', new SignupView({}))
    .register('/login', new LoginView({}));

appRouter.start();
