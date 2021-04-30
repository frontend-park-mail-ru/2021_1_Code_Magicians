import {View} from 'views/view';
import {boardsStore} from 'stores/boardsStore/boardsStore';
import {pinsStore} from 'stores/pinsStore/pinsStore';
import {Page} from 'components/page/page';
import {PinsFeed} from 'components/pinsFeed/pinsFeed';
import {constants} from 'consts/consts';
import {actions} from 'actions/actions';
import {appRouter} from 'appManagers/router';
import {toastBox} from 'components/toast/toast';

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

  /**
   * Did
   */
  didMount() {
    super.didMount();

    switch (boardsStore.getStatus()) {
      case constants.store.statuses.profilesStore.boardNotFound:
        actions.profiles.statusProcessed();
        appRouter.back();
        break;
      case constants.store.statuses.profilesStore.clientError:
      case constants.store.statuses.profilesStore.internalError:
        toastBox.addToast('Something went wrong. Please, try again or refresh the page');
        actions.profiles.statusProcessed();
        break;
    }
  }
}
