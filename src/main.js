import {appRouter} from './appManagers/router.js';
import {ProfileView} from './views/profileViews/profileView/profileView.js';
import {SettingsView} from './views/settingsView/settingsView.js';
import {ProfileBoardsView} from './views/profileViews/profileBoardsView/profileBoardsView.js';
import {SignupView} from './views/authViews/signupView/signupView.js';
import {LoginView} from './views/authViews/loginView/loginView.js';
import {FeedView} from './views/feedView/feedView.js';
import {ProfilePinsView} from './views/profileViews/profilePinsView/profilePinsView.js';
import {constants} from './consts/consts.js';

const paths = constants.network.routerPaths;

appRouter
    .register(paths.index, new FeedView({}))
    .register(paths.profile, new ProfileView({}))
    .register(paths.profileBoards, new ProfileBoardsView({}))
    .register(paths.profilePins, new ProfilePinsView({}))
    .register(paths.otherProfile, new ProfileView({}))
    .register(paths.otherProfileBoards, new ProfileBoardsView({}))
    .register(paths.otherProfilePins, new ProfilePinsView({}))
    .register(paths.settings, new SettingsView({}))
    .register(paths.settingsSection, new SettingsView({}))
    .register(paths.signup, new SignupView({}))
    .register(paths.login, new LoginView({}));

appRouter.start();
