import {Component} from '../component';
import {actions} from 'actions/actions';
import {userStore} from 'stores/userStore/UserStore';
import {constants} from 'consts/consts';
import {passwordRegexp} from 'consts/regexp';

import SecuritySettingsTemplate from './securitySettings.hbs';
import './securitySettings.scss';
import {toastBox} from 'components/toast/toast';

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
    return this.tmpl({...this.props});
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

    const newPassword = document.querySelector('[name="new-password"]');
    const confirmPassword = document.querySelector('[name="confirm-password"]');

    if (!newPassword.value.match(passwordRegexp)) {
      alert('Password must be 8 chars length at least');
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      alert('Password must be same');
      return;
    }

    actions.user.changePassword(newPassword.value);
  }
}
