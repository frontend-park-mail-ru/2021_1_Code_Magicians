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
    document
        .querySelector('.profile-changes__fields')
        .addEventListener('submit', this.submit);

    document
        .querySelector('.profile-changes__avatar-form')
        .addEventListener('change', this.changeAvatar);

    document
        .querySelector('.profile-changes__avatar-change-button')
        .addEventListener('click', this.selectAvatar);

    document
        .querySelector('.profile-changes__avatar-preview')
        .addEventListener('click', this.selectAvatar);

    if (userStore.getStatus() === constants.store.statuses.userStore.profileEdited) {
      alert('profile edited successfully');
      actions.user.statusProcessed();
    }
  }

  /**
   * Will
   */
  willUnmount() {
    document
        .querySelector('.profile-changes__fields')
        .removeEventListener('submit', this.submit);

    document
        .querySelector('.profile-changes__avatar-form')
        .removeEventListener('change', this.changeAvatar);

    document
        .querySelector('.profile-changes__avatar-change-button')
        .removeEventListener('click', this.selectAvatar);

    document
        .querySelector('.profile-changes__avatar-preview')
        .removeEventListener('click', this.selectAvatar);
  }

  /**
   * Submit callback
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();
    const target = event.target;

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

  /**
   * Change it
   * @param {Event} event
   */
  changeAvatar(event) {
    event.preventDefault();
    console.log('changeAvatar');
    console.log(event.target);

    const payload = new FormData();
    payload.append('avatarImage', event.target.files[0]);

    actions.user.changeAvatar(payload);
  }

  /**
   * Activate file window
   * @param {Event} event
   */
  selectAvatar(event) {
    event.preventDefault();

    document.querySelector('[name="avatar_upload"]').click();
  }
}
