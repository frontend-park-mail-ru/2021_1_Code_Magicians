import {Component} from '../component.js';
import {userStore} from '../../stores/userStore/UserStore.js';
import {Profile} from '../../models/profile/Profile.js';

/**
 * Profile header
 */
export class ProfileHeader extends Component {
  /**
   * Constructs new profileViews header component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns the html code for the profileViews header
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['profileHeader.hbs'];
    const selfProfile = Object.keys(this.props.pathArgs).length === 0;
    const profile = selfProfile ? userStore.getUser().profile : new Profile(); // will find real foreign profile
    return tmpl({
      ...this.props,
      selfProfile: Object.keys(this.props.pathArgs).length === 0,
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
