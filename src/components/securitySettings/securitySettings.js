import {Component} from '../component.js';
import {actions} from '../../actions/actions.js';

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

    if (newPassword.value !== confirmPassword.value) {
      alert('Password must be same');
      return;
    }

    actions.user.changePassword(newPassword.value);
  }
}
