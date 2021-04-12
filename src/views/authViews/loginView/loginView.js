import {actions} from 'actions/actions';
import {appRouter} from 'appManagers/router';
import {usernameRegexp, passwordRegexp} from 'consts/regexp';
import {validateInput} from 'utils/utils';
import {AuthView} from '../authView';

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
    return this.tmpl({...this.props});
  }

  /**
     * Submit callback
     * @param {Event} event
     */
  submit(event) {
    event.preventDefault();

    const userName = document.querySelector('[name="username"]').value.trim();
    const userPassword = document.querySelector('[name="password"]').value.trim();

    AuthView.clearInputs('.errors');

    const errors = [];
    errors.push(validateInput(userName, usernameRegexp));
    document.querySelector('.name-errors').innerHTML = errors[0];
    errors.push(validateInput(userPassword, passwordRegexp));
    document.querySelector('.password-errors').innerHTML = errors[1];

    if ([...errors].find((el) => el !== '')) {
      return;
    }

    const payload = {
      name: userName,
      password: userPassword,
    };

    this.setState(payload);
    actions.user.login(userName, userPassword);
    appRouter.go('/profile');
  }
}
