import { boardsStore } from 'stores/boardsStore';
import { userStore } from 'stores/userStore';
import { ProfileView } from '../profileView/profileView';

import ProfileBoardsViewTemplate from './profileBoardsView.hbs';
import './profileBoardsView.scss';
import { pinsStore } from '../../../stores/pinsStore';

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
    const boardsList = boardsStore.getBoardsByProfileID(
      this.props.pathArgs.profileID || (userStore.getUser() && userStore.getUser().profile.ID),
    );

    this._profileMainContent = this.tmpl({
      ...this.props,
      boards: boardsList,
    });

    return super.render();
  }
}
