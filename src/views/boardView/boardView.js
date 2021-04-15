import {View} from 'views/view';
import {boardsStore} from 'stores/boardsStore/boardsStore';
import {pinsStore} from 'stores/pinsStore/pinsStore';
import {userStore} from 'stores/userStore/UserStore';
import {Page} from 'components/page/page';
import {constants} from 'consts/consts';
import {Profile} from 'models/Profile';
import {Board} from 'models/Board';
import {PinsFeed} from 'components/pinsFeed/pinsFeed';

import BoardViewTemplate from './boardView.hbs';
import './boardView.scss';

/**
 * Board view
 */
export class BoardView extends View {
  /**
   * Makes new view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.tmpl = BoardViewTemplate;

    boardsStore.bind('change', this.refresh);
    pinsStore.bind('change', this.refresh);
    userStore.bind('change', this.refresh);
  }

  /**
   * Rendering view
   * @return {String}
   */
  render() {
    // const boardID = this.props.pathArgs.boardID;
    // const board = boardsStore.getBoardByID(boardID);
    this._nestedComponents.set('_pinsFeed', new PinsFeed({
      ...this.props,
      pins: constants.mocks.pins,
    }));

    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        ...this.props,
        board: new Board(constants.mocks.boards[1]),
        boardPins: this._nestedComponents.get('_pinsFeed').render(), // pinsStore.getPinsByBoardID(boardID),
        author: new Profile(constants.mocks.defaultProfile), // profilesStore.getProfileByID(board['authorID']),
      }),
    }));

    return this._nestedComponents.get('page').render();
  }
}
