import {ProfileView} from '../profileView/profileView';
import {boardsStore} from 'stores/boardsStore/boardsStore';
import {userStore} from 'stores/userStore/UserStore';

import ProfileBoardsViewTemplate from './profileBoardsView.hbs';
import './profileBoardsView.scss';

/**
 * Profile boards view
 */
export class ProfileBoardsView extends ProfileView {
  /**
   * Makes profile boards view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props);

    this.tmpl = ProfileBoardsViewTemplate;
  }

  /**
   * Rendering profile boards html
   * @return {String}
   */
  render() {
    this._profileMainContent = this.tmpl({
      ...this.props,
      boards: boardsStore.getBoardsByProfileID(
          this.props.pathArgs.profileID || (userStore.getUser() && userStore.getUser().profile.ID),
      ),
    });

    return super.render();
  }
}
