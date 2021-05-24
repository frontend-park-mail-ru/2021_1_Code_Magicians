import { userStore } from 'stores/userStore';
import { ProfileView } from '../profileView/profileView';
import ProfileFollowersViewTemplate from './profileFollowersView.hbs';
import './profileFollowersView.scss';
import { profilesStore } from '../../../stores/profilesStore';

/**
 * Profile boards view
 */
export class ProfileFollowersView extends ProfileView {
  /**
   * Makes profile boards view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props);

    this.tmpl = ProfileFollowersViewTemplate;
  }

  /**
   * Rendering profile boards html
   * @return {String}
   */
  render() {
    const followers = profilesStore.getProfileFollowersByID(
      this.props.pathArgs.profileID || (userStore.getUser() && userStore.getUser().profile.ID),
    );
    this._profileMainContent = this.tmpl({
      ...this.props,
      profiles: followers,
    });

    return super.render();
  }
}
