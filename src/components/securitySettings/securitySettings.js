import { actions } from 'actions/actions';
import { userStore } from 'stores/userStore';
import { constants } from 'consts/consts';
import { passwordRegexp } from 'consts/regexp';
import { toastBox } from 'components/toast/toast';
import { validateInput } from 'utils/validateUtils';
import { Component } from '../component';

import SecuritySettingsTemplate from './securitySettings.hbs';
import './securitySettings.scss';

/**
 * Security settings form
 */
export class SecuritySettings extends Component {
  /**
   * Makes new form
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = SecuritySettingsTemplate;
  }

  /**
   * Returns html code
   * @return {String}
   */
  render() {
    return this.tmpl({ ...this.props });
  }

  /**
   * Did
   */
  didMount() {
    document.querySelector('.security-settings').addEventListener('submit', this.submit);

    if (userStore.getStatus() === constants.store.statuses.userStore.passwordChanged) {
      toastBox.addToast('Password changed successfully');
      actions.user.statusProcessed();
    }
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.security-settings').removeEventListener('submit', this.submit);
  }

  /**
   * Submit
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();

    document.querySelectorAll('.errors').forEach((errorField) => errorField.innerHTML = '');

    const newPassword = document.querySelector('[name="new-password"]');
    const confirmPassword = document.querySelector('[name="confirm-password"]');

    const errors = [];
    errors.push(validateInput(newPassword.value, passwordRegexp));
    errors.push(newPassword.value === confirmPassword.value ? '' : 'Passwords do not match');
    [
      document.querySelector('.password-errors').innerHTML,
      document.querySelector('.password-confirm-errors').innerHTML,
    ] = errors;

    if ([...errors].some((error) => error)) {
      return;
    }

    actions.user.changePassword(newPassword.value);
  }
}
