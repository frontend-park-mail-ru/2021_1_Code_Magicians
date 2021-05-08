import { userStore } from 'stores/userStore';
import { boardsStore } from 'stores/boardsStore';
import { toastBox } from 'components/toast/toast';
import { actions } from 'actions/actions';
import { Component } from '../component.js';

import BoardControlTemplate from './boardControl.hbs';
import './boardControl.scss';

/**
 * Vlist
 */
export class BoardControl extends Component {
  /**
   * Constructs new board control component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = BoardControlTemplate;
  }

  /**
   * Returns the html code for comment
   * @return {string} final html
   */
  render() {
    const user = userStore.getUser();
    const profile = user && user.profile;
    const userBoards = profile && boardsStore.getBoardsByProfileID(profile.ID);
    this._userIsAuthorized = user && user.authorized();

    return this.tmpl({
      ...this.props,
      profileBoards: userBoards,
      userIsAuthorized: this._userIsAuthorized,
    });
  }

  /**
   * Did
   */
  didMount() {
    if (!this._userIsAuthorized) {
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
    if (!this._userIsAuthorized) {
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
    // event.preventDefault();
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
