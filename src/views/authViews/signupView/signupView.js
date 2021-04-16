import {actions} from 'actions/actions';
import {myEmailRegexp, usernameRegexp, passwordRegexp} from 'consts/regexp';
import {validateInputs} from 'utils/validateUtils';
import {AuthView} from '../authView';
import {userStore} from 'stores/userStore/UserStore';
import {constants} from 'consts/consts';
import {toastBox} from 'components/toast/toast';

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
    this.setState({payload: payload});
  }

  /**
     * Rendering signup view
     * @return {string}
     */
  render() {
    return this.tmpl({...this.props, payload: this._state.payload});
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

    const inputsValid = validateInputs(
        [userName, userEmail, userPassword],
        ['.name-errors', '.email-errors', '.password-errors'],
        [usernameRegexp, myEmailRegexp, passwordRegexp],
    );

    if (!inputsValid) {
      return;
    }

    const payload = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    this.setState({payload: payload});
    actions.user.signup(userName, userEmail, userPassword);
  }

  /**
   * Did
   */
  didMount() {
    super.didMount();

    switch (userStore.getStatus()) {
      case constants.store.statuses.userStore.signupConflict:
        toastBox.addToast('This username or email already taken. Please, choose another one', true);
        actions.user.statusProcessed();
        break;
    }
  }
}
