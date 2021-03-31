import {Component} from '../component.js';
import {userStore} from '../../stores/userStore/UserStore.js';
import {actions} from '../../actions/actions.js';
import {firstNameRegexp, usernameRegexp} from '../../consts/regexp.js';
import {constants} from '../../consts/consts.js';

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
    document.querySelector('.profile-changes').addEventListener('submit', this.submit);

    if (userStore.getStatus() === constants.store.statuses.userStore.profileEdited) {
      alert('profile edited successfully');
      actions.user.statusProcessed();
    }
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.profile-changes').removeEventListener('submit', this.submit);
  }

  /**
   * Submit callback
   * @param {Event} ev
   */
  submit(ev) {
    ev.preventDefault();
    const target = ev.target;

    const changes = {};

    const firstName = target.querySelector('[name="firstName"]').value.trim();
    const username = target.querySelector('[name="username"]').value.trim();
    const email = target.querySelector('[name="email"]').value.trim();

    const usernameIsValid = username.match(usernameRegexp);
    if (!usernameIsValid) {
      alert('username invalid');
      return;
    }

    if (firstName) {
      const firstNameIsValid = firstName.match(firstNameRegexp);
      if (!firstNameIsValid) {
        alert('name invalid');
        return;
      }
    }

    changes['firstName'] = firstName;
    changes['username'] = username;
    changes['email'] = email;

    actions.user.editProfile(changes);
  }
}
