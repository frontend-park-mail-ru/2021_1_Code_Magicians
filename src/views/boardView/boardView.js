import {View} from 'views/view';
import {boardsStore} from 'stores/boardsStore/boardsStore';
import {pinsStore} from 'stores/pinsStore/pinsStore';
import {Page} from 'components/page/page';
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
  }

  /**
   * Rendering view
   * @return {String}
   */
  render() {
    const boardID = this.props.pathArgs.boardID;
    const board = boardsStore.getBoardByID(boardID);
    const pins = pinsStore.getPinsByBoardID(board ? board.ID : null);

    this._nestedComponents.set('_pinsFeed', new PinsFeed({
      ...this.props,
      pins: pins,
    }));

    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        ...this.props,
        board: board,
        boardPins: this._nestedComponents.get('_pinsFeed').render(),
      }),
    }));

    return this._nestedComponents.get('page').render();
  }
}
