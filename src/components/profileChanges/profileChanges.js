import {Component} from '../component.js';
import {userStore} from '../../stores/userStore/UserStore.js';

/**
 * Profile changes form
 */
export class ProfileChanges extends Component {
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
    const tmpl = Handlebars.templates['profileChanges.hbs'];

    return tmpl({...this.props, user: userStore.getUser().profile});
  }

  /**
   * Did
   */
  didMount() {
    // const form = document.querySelector('.profile-changes');
    // form.que
    super.didMount();
  }

  /**
   * Submit callback
   * @param {Event} ev
   */
  submit(ev) {

  }
}
