import {Component} from '../component';
import {userStore} from 'stores/userStore/UserStore';
import {profilesStore} from 'stores/profilesStore/profilesStore';
import {constants} from 'consts/consts';

import ProfileHeaderTemplate from './profileHeader.hbs';
import './profileHeader.scss';
import {User} from 'models/User';
import {Profile} from 'models/Profile';
import {actions} from 'actions/actions';
import {toastBox} from 'components/toast/toast';

/**
 * Profile header
 */
export class ProfileHeader extends Component {
  /**
   * Constructs new profile header component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = ProfileHeaderTemplate;

    this.follow = this.follow.bind(this);
  }

  /**
   * Returns the html code for the profile header
   * @return {string} final html
   */
  render() {
    const selfProfile = Object.keys(this.props.pathArgs).length === 0;
    const user = userStore.getUser() || new User(new Profile(constants.mocks.defaultProfile));

    let profile = selfProfile ? user.profile : null;
    profile = profile ||
      profilesStore.getProfileByID(this.props.pathArgs.profileID) ||
      constants.mocks.defaultProfile;

    return this.tmpl({
      ...this.props,
      selfProfile: selfProfile,
      profile: profile,
      userIsAuthorized: user.authorized(),
    });
  }

  /**
   * Did
   */
  didMount() {
    document
        .querySelectorAll('.profile-links__link')
        .forEach((link) => {
          if (link.href.endsWith(window.location.pathname)) {
            link.classList.add('profile-links__link_active');
          }
        });

    const followToggle = document.querySelector('.profile-info__follow-toggle');
    if (followToggle) {
      followToggle.addEventListener('click', this.follow);
    }

    switch (profilesStore.getStatus()) {
      case constants.store.statuses.profilesStore.followed:
        toastBox.addToast(
            `${profilesStore.getProfileByID(this.props.pathArgs.profileID)['username']} is now followed!`,
        );

        actions.profiles.statusProcessed();
        break;
      case constants.store.statuses.profilesStore.unfollowed:
        toastBox.addToast(
            `${profilesStore.getProfileByID(this.props.pathArgs.profileID)['username']} isn't followed anymore`,
        );

        actions.profiles.statusProcessed();
        break;
    }
  }

  /**
   * Will
   */
  willUnmount() {
    const followToggle = document.querySelector('.profile-info__follow-toggle');
    if (followToggle) {
      followToggle.removeEventListener('click', this.follow);
    }
  }

  /**
   * Follow listener
   * @param {Event} event
   */
  follow(event) {
    event.preventDefault();

    const profile = profilesStore.getProfileByID(this.props.pathArgs.profileID);
    if (!profile.followed) {
      actions.profiles.follow(profile['ID']);
    } else {
      actions.profiles.unfollow(profile['ID']);
    }
  }
}
