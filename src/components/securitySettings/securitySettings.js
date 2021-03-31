import {Component} from '../component.js';
import {actions} from '../../actions/actions.js';
import {userStore} from '../../stores/userStore/UserStore.js';
import {constants} from '../../consts/consts.js';
import {passwordRegexp} from '../../consts/regexp.js';

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
  }

  /**
   * Returns html code
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['securitySettings.hbs'];

    return tmpl({...this.props});
  }

  /**
   * Did
   */
  didMount() {
    document.querySelector('.security-settings').addEventListener('submit', this.submit);

    if (userStore.getStatus() === constants.store.statuses.userStore.passwordChanged) {
      alert('password changed successfully');
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
   * @param {Event} ev
   */
  submit(ev) {
    ev.preventDefault();

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
