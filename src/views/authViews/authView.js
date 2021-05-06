import {View} from '../view';
import {actions} from 'actions/actions';
import {appRouter} from 'appManagers/router';
import {userStore} from 'stores/userStore';
import {constants} from 'consts/consts';

import './authView.scss';
import {toastBox} from 'components/toast/toast';

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

    switch (userStore.getStatus()) {
      case constants.store.statuses.userStore.clientError:
      case constants.store.statuses.userStore.internalError:
        toastBox.addToast(constants.toastMessages.unknownError);
        actions.user.statusProcessed();
        break;
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
