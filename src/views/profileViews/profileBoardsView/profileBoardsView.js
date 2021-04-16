import {ProfileView} from '../profileView/profileView';
import {boardsStore} from 'stores/boardsStore/boardsStore';
import {userStore} from 'stores/userStore/UserStore';
import {constants} from 'consts/consts';
import {Profile} from 'models/profile/Profile';
import {User} from 'models/user/User';
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
    const user = userStore.getUser() || new User(new Profile(constants.mocks.defaultProfile));
    const boards = boardsStore.getBoardsByProfileID(this.props.pathArgs.profileID || user.profile.ID);
    console.log(boards);
    this._profileMainContent = this.tmpl({
      ...this.props,
      boards: boards,
    });

    return super.render();
  }
}
