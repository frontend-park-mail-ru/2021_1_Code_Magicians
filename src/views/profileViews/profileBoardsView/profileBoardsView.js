import { boardsStore } from 'stores/boardsStore';
import { userStore } from 'stores/userStore';
import { toastBox } from 'components/toast/toast';
import { actions } from 'actions/actions';
import { ProfileView } from '../profileView/profileView';

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
    const user = userStore.getUser();
    this._userIsAuthorized = user && user.authorized();
    const boardsList = boardsStore.getBoardsByProfileID(
      this.props.pathArgs.profileID || (userStore.getUser() && userStore.getUser().profile.ID),
    );

    this._profileMainContent = this.tmpl({
      ...this.props,
      boards: boardsList,
      userIsAuthorized: this._userIsAuthorized,
      selfProfile: !this.props.pathArgs.profileID,
    });

    return super.render();
  }

  /**
   * Did
   */
  didMount() {
    super.didMount();
    if (this.props.pathArgs.profileID) {
      return;
    }

    document
      .getElementById('create-board')
      .addEventListener('click', this.showBoardForm);
    document
      .querySelector('.board-create-form')
      .addEventListener('click', this.hideBoardForm);
    document
      .querySelector('.board-create-form__button')
      .addEventListener('click', this.createBoardSubmit);
  }

  /**
   * Will
   */
  willUnmount() {
    super.willUnmount();
    if (this.props.pathArgs.profileID) {
      return;
    }

    document
      .getElementById('create-board')
      .removeEventListener('click', this.showBoardForm);
    document
      .querySelector('.board-create-form')
      .removeEventListener('click', this.hideBoardForm);
    document
      .querySelector('.board-create-form__button')
      .removeEventListener('click', this.createBoardSubmit);
  }

  /**
   * hideBoard callback
   * @param {Event} event
   */
  hideBoardForm(event) {
    event.preventDefault();
    if (event.target.id === 'board-form' || event.target.id === 'board-close') {
      document.querySelector('.board-create-form').style.visibility = 'hidden';
    } else {
      document.querySelector('.board-create-form').style.visibility = 'visible';
    }
  }

  /**
   * createBoard callback
   * @param {Event} event
   */
  showBoardForm(event) {
    event.preventDefault();

    document.querySelector('.board-create-form').style.visibility = 'visible';
  }

  /**
   * Sending data from the form
   * @param {Event} event
   */
  createBoardSubmit(event) {
    event.preventDefault();

    if (event.target.className !== 'board-create-form__button') {
      return;
    }

    const boardTitle = document.querySelector('.board-create-form__text').value.trim();

    if (!boardTitle) {
      toastBox.addToast('Don\'t forget your board name!', true);
      return;
    }

    const boardData = {
      title: boardTitle,
      description: '',
    };

    actions.boards.createBoard(boardData);
  }
}
