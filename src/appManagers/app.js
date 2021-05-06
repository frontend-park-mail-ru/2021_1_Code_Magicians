import { constants } from 'consts/consts';
import { appRouter } from 'appManagers/router';
import { VirtualizedList } from 'views/virtualizedList/virtualizedList';
import { ProfileView } from 'views/profileViews/profileView/profileView';
import { ProfileBoardsView } from 'views/profileViews/profileBoardsView/profileBoardsView';
import { ProfilePinsView } from 'views/profileViews/profilePinsView/profilePinsView';
import { SettingsView } from 'views/settingsView/settingsView';
import { SignupView } from 'views/authViews/signupView/signupView';
import { LoginView } from 'views/authViews/loginView/loginView';
import { PinBuilderView } from 'views/pinBuilderView/pinBuilderView';
import { PinView } from 'views/pinView/pinView';
import { BoardView } from 'views/boardView/boardView';
import { SearchView } from '../views/searchView/searchView';

import 'assets/styles/base.scss';

/**
 * Main app class
 */
class App {
  /**
   * Starts app
   */
  run() {
    const paths = constants.network.routerPaths;

    this._setTheme();

    appRouter
      .register(paths.index, new VirtualizedList({}))
      .register(paths.profile, new ProfileView({}))
      .register(paths.profileBoards, new ProfileBoardsView({}))
      .register(paths.profilePins, new ProfilePinsView({}))
      .register(paths.profileFollowers, new ProfileView({}))
      .register(paths.profileFollowing, new ProfileView({}))
      .register(paths.otherProfile, new ProfileView({}))
      .register(paths.otherProfileBoards, new ProfileBoardsView({}))
      .register(paths.otherProfilePins, new ProfilePinsView({}))
      .register(paths.otherProfileFollowers, new ProfileView({}))
      .register(paths.otherProfileFollowing, new ProfileView({}))
      .register(paths.settings, new SettingsView({}))
      .register(paths.settingsSection, new SettingsView({}))
      .register(paths.signup, new SignupView({}))
      .register(paths.login, new LoginView({}))
      .register(paths.createPin, new PinBuilderView({}))
      .register(paths.pin, new PinView({}))
      .register(paths.board, new BoardView({}))
      .register(paths.search, new SearchView({}))
      .start();

    // eslint-disable-next-line no-undef
    if (!DEBUG) {
      this._startSW();
    }
  }

  /**
   * Set theme from local storage or set default (light)
   */
  _setTheme() {
    document.documentElement.setAttribute('theme', window.localStorage.getItem('theme'));
  }

  /**
   * Starts Service worker
   * @private
   */
  _startSW() {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    window.addEventListener('load', () => {
      navigator
        .serviceWorker
        .register('/sw.js', { scope: '/' }).then(() => {});
    });
  }
}

export const app = new App();
