import {View} from '../view';
import {actions} from 'actions/actions';
import {appRouter} from 'appManagers/router';
import {userStore} from 'stores/userStore/UserStore';
import {constants} from 'consts/consts';

import './authView.scss';
import {User} from 'models/user/User';
import {Profile} from 'models/profile/Profile';

/**
 * Parent Authentication view
 */
export class AuthView extends View {
  /**
   * Makes new authView
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.submit = this.submit.bind(this);
  }

  /**
   * Did
   */
  didMount() {
    const user = userStore.getUser() || new User(new Profile(constants.mocks.defaultProfile));
    if (user.authorized()) {
      this.clearState();
      appRouter.go(this.props.paths.profile);
      return;
    }

    switch (userStore.getStatus()) {
      case constants.store.statuses.userStore.clientError:
      case constants.store.statuses.userStore.internalError:
        alert('Something went wrong. Please, try to refresh the page or come back later.');
        actions.user.statusProcessed();
        break;
    }

    document.querySelector('.auth-form').addEventListener('submit', this.submit);
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.auth-form').removeEventListener('submit', this.submit);
  }

  /**
   * Clears innerHTML for certain class
   * @param {string} name - payload data
   */
  static clearInputs(name) {
    document
        .querySelectorAll(name)
        .forEach((input) => input.value = '');
  }
}
