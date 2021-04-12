import {actions} from 'actions/actions';
import {appRouter} from 'appManagers/router';
import {emailRegexp, usernameRegexp, passwordRegexp} from 'consts/regexp';
import {validateInput} from 'utils/utils';
import {AuthView} from '../authView';

import SignupViewTemplate from './signupView.hbs';
import './signupView.scss';

/**
 * Signup page view
 */
export class SignupView extends AuthView {
  /**
     * Makes new signupView
     * @param {Object} props
     */
  constructor(props = {}) {
    super(props);
    const payload = {
      name: '',
      email: '',
      password: '',
    };

    this.tmpl = SignupViewTemplate;
    this.setState(payload);
  }

  /**
     * Rendering signup view
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
    const userEmail = document.querySelector('[name="email"]').value.trim();

    AuthView.clearInputs('.errors');

    const errors = [];
    errors.push(validateInput(userName, usernameRegexp));
    document.querySelector('.name-errors').innerHTML = errors[0];
    errors.push(validateInput(userEmail, emailRegexp));
    document.querySelector('.email-errors').innerHTML = errors[1];
    errors.push(validateInput(userPassword, passwordRegexp));
    document.querySelector('.password-errors').innerHTML = errors[2];

    if ([...errors].find((el) => el !== '')) {
      return;
    }

    const payload = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    this.setState(payload);
    actions.user.signup(userName, userEmail, userPassword);
    appRouter.go(this.props.paths.profile);
  }
}
