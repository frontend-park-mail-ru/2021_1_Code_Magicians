import {Component} from '../component';
import {userStore} from 'stores/userStore/UserStore';
import {profilesStore} from 'stores/profilesStore/profilesStore';
import {constants} from 'consts/consts';

import ProfileHeaderTemplate from './profileHeader.hbs';
import './profileHeader.scss';
import {User} from 'models/user/User';
import {Profile} from 'models/profile/Profile';

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
  }
}
