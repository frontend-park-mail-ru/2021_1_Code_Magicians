import {actions} from '../../../actions/actions.js';
import {appRouter} from '../../../appManagers/router.js';
import {usernameRegexp, passwordRegexp} from '../../../consts/regexp.js';
import {validateInput} from '../../../utils/utils.js';
import {AuthView} from '../authView.js';

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

    this.setState(payload);
  }

  /**
     * Rendering login view
     * @return {string}
     */
  render() {
    const tmpl = Handlebars.templates['loginView.hbs'];
    return tmpl({});
  }

  /**
     * Submit callback
     * @param {Event} event
     */
  submit(event) {
    event.preventDefault();

    const userName = document.querySelector('[name="login-username"]').value.trim();
    const userPassword = document.querySelector('[name="login-pass"]').value.trim();

    AuthView.clearInputs('.errors');

    const errors = [];
    errors.push(validateInput(userName, usernameRegexp));
    document.querySelector('.name-errors').innerHTML = errors[0];
    errors.push(validateInput(userPassword, passwordRegexp));
    document.querySelector('.password-errors').innerHTML = errors[1];

    if ([...errors].find((el) => el !== '')) return;

    const payload = {
      name: userName,
      password: userPassword,
    };

    this.setState(payload);
    actions.user.login(userName, userPassword);
    appRouter.go('/profile');
  }
}
