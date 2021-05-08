import { actions } from 'actions/actions';
import { appRouter } from 'appManagers/router';
import { userStore } from 'stores/userStore';
import { constants } from 'consts/consts';
import { toastBox } from 'components/toast/toast';
import { View } from '../view';

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
    document.querySelector('.auth-form').addEventListener('submit', this.submit);

    if (userStore.getStatus() === constants.store.statuses.userStore.internalError) {
      toastBox.addToast(constants.toastMessages.unknownError, true);
      actions.user.statusProcessed();
    }

    if (userStore.getUser() && userStore.getUser().authorized()) {
      this.clearState();
      appRouter.go(this.props.paths.profile);
    }
  }

  /**
   * Will
   */
  willUnmount() {
    const form = document.querySelector('.auth-form');
    if (form) {
      form.removeEventListener('submit', this.submit);
    }
  }
}
