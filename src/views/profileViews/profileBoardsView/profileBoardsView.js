import {ProfileView} from '../profileView/profileView.js';
import {boardsStore} from '../../../stores/boardsStore/boardsStore.js';


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
  }

  /**
   * Rendering profile boards html
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['profileBoardsView.hbs'];
    this._profileMainContent = tmpl({
      ...this.props,
      boards: boardsStore.getBoardsByProfileID(this.props.pathArgs.profileID),
    });

    return super.render();
  }
}
