import { actions } from 'actions/actions';
import { usernameRegexp, passwordRegexp } from 'consts/regexp';
import { validateInputs } from 'utils/validateUtils';
import { userStore } from 'stores/userStore';
import { constants } from 'consts/consts';
import { toastBox } from 'components/toast/toast';
import { AuthView } from '../authView';

import LoginViewTemplate from './loginView.hbs';
import './loginView.scss';

/**
 * Login page view
 */
export class LoginView extends AuthView {
  /**
     * Makes new loginView
     * @param {Object} props
     */
  constructor(props = {}) {
    super(props);
    const payload = {
      name: '',
      password: '',
    };

    this.tmpl = LoginViewTemplate;
    this.setState(payload);
  }

  /**
     * Rendering login view
     * @return {string}
     */
  render() {
    return this.tmpl({ ...this.props, payload: this._state.payload });
  }

  /**
     * Submit callback
     * @param {Event} event
     */
  submit(event) {
    event.preventDefault();

    const userName = document.querySelector('[name="username"]').value.trim();
    const userPassword = document.querySelector('[name="password"]').value.trim();

    const inputsValid = validateInputs(
      [userName, userPassword],
      ['.name-errors', '.password-errors'],
      [usernameRegexp, passwordRegexp],
    );

    if (!inputsValid) {
      return;
    }

    const payload = {
      name: userName,
      password: userPassword,
    };

    this.setState({ payload });
    actions.user.login(userName, userPassword);
  }

  /**
   * Did
   */
  didMount() {
    if (userStore.getStatus() === constants.store.statuses.userStore.invalidCredentials) {
      toastBox.addToast('This user doesn\'t exist or password is incorrect', true);
      actions.user.statusProcessed();
    }

    if (userStore.getStatus() !== constants.store.statuses.userStore.ok) {
      if (document.location.search) {
        const code = document.location.search.slice(6);
        actions.user.vklogin(code);
      }
    }

    super.didMount();
  }
}
