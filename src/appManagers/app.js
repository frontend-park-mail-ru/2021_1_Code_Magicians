import {constants} from 'consts/consts';
import {appRouter} from 'appManagers/router';
import {FeedView} from 'views/feedView/feedView';
import {ProfileView} from 'views/profileViews/profileView/profileView';
import {ProfileBoardsView} from 'views/profileViews/profileBoardsView/profileBoardsView';
import {ProfilePinsView} from 'views/profileViews/profilePinsView/profilePinsView';
import {SettingsView} from 'views/settingsView/settingsView';
import {SignupView} from 'views/authViews/signupView/signupView';
import {LoginView} from 'views/authViews/loginView/loginView';
import {PinBuilderView} from 'views/pinBuilderView/pinBuilderView';
import {PinView} from 'views/pinView/pinView';
import {BoardView} from 'views/boardView/boardView';

import 'assets/css/base.scss';
import 'assets/img/Logo.png';

/**
 * Main app class
 */
class App {
  /**
   * Starts app
   */
  run() {
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
        .register(paths.login, new LoginView({}))
        .register(paths.createPin, new PinBuilderView({}))
        .register(paths.pin, new PinView({}))
        .register(paths.board, new BoardView({}))
        .start();

    if (DEBUG) { // before https
      this._startSW();
    }
  }

  /**
   * Starts Service worker
   * @private
   */
  _startSW() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator
            .serviceWorker
            .register('/sw.js', {scope: '/'})
            .then((registration) => {})
            .catch((err) => {});
      });
    }
  }
}

export const app = new App();
