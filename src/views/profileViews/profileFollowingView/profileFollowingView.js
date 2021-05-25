import { userStore } from 'stores/userStore';
import { ProfileView } from '../profileView/profileView';
import ProfileFollowingViewTemplate from './profileFollowingView.hbs';
import './profileFollowingView.scss';
import { profilesStore } from '../../../stores/profilesStore';

/**
 * Profile boards view
 */
export class ProfileFollowingView extends ProfileView {
  /**
   * Makes profile boards view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props);

    this.tmpl = ProfileFollowingViewTemplate;
  }

  /**
   * Rendering profile boards html
   * @return {String}
   */
  render() {
    const userID = this.props.pathArgs.profileID || (userStore.getUser() && userStore.getUser().profile.ID);
    const followers = profilesStore.getProfileFollowingByID(
      userID,
    );
    this._profileMainContent = this.tmpl({
      ...this.props,
      profiles: followers,
    });

    return super.render();
  }
}
