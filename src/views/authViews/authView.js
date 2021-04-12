import {View} from '../view';
import {actions} from 'actions/actions';
import {appRouter} from 'appManagers/router';
import {userStore} from 'stores/userStore/UserStore';
import {constants} from 'consts/consts';

import './authView.scss';

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
    if (userStore.getStatus() === constants.store.statuses.userStore.alreadyAuthorized) {
      this.clearState();
      actions.user.statusProcessed();
      appRouter.go('/');
      return;
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
    document.querySelectorAll(name).forEach((input) => input.value = '');
  }
}
