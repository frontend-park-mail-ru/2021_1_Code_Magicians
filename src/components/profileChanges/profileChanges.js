import {Component} from '../component';
import {userStore} from 'stores/userStore/UserStore';
import {actions} from 'actions/actions';
import {firstNameRegexp, usernameRegexp} from 'consts/regexp';
import {constants} from 'consts/consts';

import ProfileChangesTemplate from './profileChanges.hbs';
import './profileChanges.scss';
import {User} from 'models/user/User';
import {Profile} from 'models/profile/Profile';

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

    this.tmpl = ProfileChangesTemplate;
  }

  /**
   * Returns html code
   * @return {String}
   */
  render() {
    const user = userStore.getUser() || new User(new Profile(constants.mocks.defaultProfile));
    return this.tmpl({...this.props, user: user.profile});
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
