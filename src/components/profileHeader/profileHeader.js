import { userStore } from 'stores/userStore';
import { profilesStore } from 'stores/profilesStore';
import { constants } from 'consts/consts';
import { actions } from 'actions/actions';
import { toastBox } from 'components/toast/toast';
import { Component } from '../component';

import ProfileHeaderTemplate from './profileHeader.hbs';
import './profileHeader.scss';

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
    const user = userStore.getUser();

    const profile = selfProfile ? user && user.profile : profilesStore.getProfileByID(this.props.pathArgs.profileID);

    return this.tmpl({
      ...this.props,
      selfProfile,
      profile,
      userIsAuthorized: user && user.authorized(),
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
        `${profilesStore.getProfileByID(this.props.pathArgs.profileID).username} is now followed!`,
      );

      actions.profiles.statusProcessed();
      break;
    case constants.store.statuses.profilesStore.unfollowed:
      toastBox.addToast(
        `${profilesStore.getProfileByID(this.props.pathArgs.profileID).username} isn't followed anymore`,
      );

      actions.profiles.statusProcessed();
      break;
    default:
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
      actions.profiles.follow(profile.ID);
    } else {
      actions.profiles.unfollow(profile.ID);
    }
  }
}
