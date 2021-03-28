import {actions} from '../../../actions/actions.js';
import {appRouter} from '../../../appManagers/router.js';
import {emailRegexp, usernameRegexp, passwordRegexp} from '../../../consts/regexp.js';
import {validateInput} from '../../../utils/utils.js';
import {AuthView} from '../authView.js';

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

    this.setState(payload);
  }

  /**
     * Rendering signup view
     * @return {string}
     */
  render() {
    const tmpl = Handlebars.templates['signupView.hbs'];
    return tmpl({});
  }

  /**
   * Submit callback
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();

    const userName = document.querySelector('[name="signup-username"]').value.trim();
    const userPassword = document.querySelector('[name="signup-pass"]').value.trim();
    const userEmail = document.querySelector('[name="signup-email"]').value.trim();

    AuthView.clearInputs('.errors');

    const errors = [];
    errors.push(validateInput(userName, usernameRegexp));
    document.querySelector('.name-errors').innerHTML = errors[0];
    errors.push(validateInput(userEmail, emailRegexp));
    document.querySelector('.email-errors').innerHTML = errors[1];
    errors.push(validateInput(userPassword, passwordRegexp));
    document.querySelector('.password-errors').innerHTML = errors[2];

    if ([...errors].find((el) => el !== '')) return;

    const payload = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    this.setState(payload);
    actions.user.signup(userName, userEmail, userPassword);
    appRouter.go('/profile');
  }
}
