import { pinsStore } from 'stores/pinsStore';
import { userStore } from 'stores/userStore';
import { boardsStore } from 'stores/boardsStore';
import { Vlist } from 'components/vlist/vlist';
import { ProfileView } from '../profileView/profileView';

/**
 * Profile pins view
 */
export class ProfilePinsView extends ProfileView {
  /**
   * Makes profile pins view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props);
  }

  /**
   * Rendering profile pins html
   * @return {String}
   */
  render() {
    const profileBoards = boardsStore
      .getBoardsByProfileID(this.props.pathArgs.profileID
            || (userStore.getUser() && userStore.getUser().profile.ID));

    const mainBoard = profileBoards && profileBoards.find((board) => board.title === 'Saved pins');
    const pinArray = pinsStore.getPinsByBoardID(mainBoard && mainBoard.ID);

    const vlist = new Vlist({
      ...this.props,
      pins: pinArray,
      width: this._parent.clientWidth,
      height: this._parent.clientHeight,
    });
    this._nestedComponents.set('_vlist', vlist);

    // this._nestedComponents.set('page', new Page({
    //   ...this.props,
    //   page__content: this.tmpl({
    //     vlist: this._nestedComponents.get('_vlist').render(),
    //   }),
    // }));

    // this._nestedComponents.set('_pinsFeed', new PinsFeed({
    //   ...this.props,
    //   pins: ,
    // }));

    this._profileMainContent = this._nestedComponents.get('_vlist').render();

    return super.render();
  }
}
