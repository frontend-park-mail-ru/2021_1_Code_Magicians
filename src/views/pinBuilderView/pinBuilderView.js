import {View} from '../view.js';
import {Page} from 'components/page/page';
import {userStore} from 'stores/userStore/UserStore';
import PinBuilderViewTemplate from './pinBuilderView.hbs';
import './pinBuilderView.scss';
import {actions} from 'actions/actions';
import {descriptionRegexp} from 'consts/regexp';
import {constants} from 'consts/consts';
import {appRouter} from 'appManagers/router';
import {toastBox} from 'components/toast/toast';
import {pinsStore} from 'stores/pinsStore/pinsStore';
import {boardsStore} from 'stores/boardsStore/boardsStore';

/**
 * Build pin view
 */
export class PinBuilderView extends View {
  /**
   * Makes new pin building view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    const payload = {
      name: '',
      description: '',
      image: '',
      link: '',
    };

    this.tmpl = PinBuilderViewTemplate;
    this.setState(payload);
    this.submit = this.submit.bind(this);
    this.createBoard = this.createBoard.bind(this);
    userStore.bind('change', this.refresh);
    pinsStore.bind('change', this.refresh);
    boardsStore.bind('change', this.refresh);
  }

  /**
   * Did
   */
  didMount() {
    const user = userStore.getUser();
    if (!user.authorized() && userStore.getStatus() === constants.store.statuses.userStore.unauthorized) {
      appRouter.back();
      return;
    }

    if (pinsStore.getStatus() === constants.store.statuses.pinsStore.pinCreated) {
      appRouter.go(`/pin/${pinsStore.getNewPinID()}`);
      actions.pins.statusProcessed();
      return;
    }

    document.querySelector('.pin-builder-form').addEventListener('submit', this.submit);
    document.getElementById('create-board').addEventListener('click', this.createBoard);
    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.pin-builder-form').removeEventListener('submit', this.submit);
    document.getElementById('create-board').removeEventListener('click', this.createBoard);


    super.willUnmount();
  }

  /**
   * Returns pinBuilder view html
   * @return {String}
   */
  render() {
    if (!userStore.getUser()) {
      appRouter.back();
      return;
    }

    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        ...this.props,
        user: userStore.getUser().profile,
      }),
    }));

    return this._nestedComponents.get('page').render();
  }

  /**
   * Submit callback
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();

    const name = document.querySelector('[name="name"]').value.trim();
    const description = document.querySelector('[name="description"]').value.trim();
    const image = document.getElementById('file-input');

    const nameError = name.match(descriptionRegexp);
    if (!nameError || nameError[0] !== name) {
      toastBox.addToast('Add name to the pin', true);
      return;
    }

    const descriptionError = description.match(descriptionRegexp);
    if (!descriptionError || descriptionError[0] !== description) {
      toastBox.addToast('Add your awesome pin description', true);
      return;
    }

    if (!image.files[0]) {
      toastBox.addToast('Don\'t forget your pin image!', true);
      return;
    }

    const payload = {
      title: name,
      description: description,
      // tags: [],
      // boardID: 0,
    };
    const formData = new FormData();

    formData.append('pinInfo', JSON.stringify(payload));
    formData.append('pinImage', image.files[0]);
    actions.pins.createPin(formData);
    this.setState(payload);
  }

  /**
   * Submit callback
   * @param {Event} event
   */
  createBoard(event) {
    event.preventDefault();

    const boardTitle = document.getElementById('board-name').value;
    const boardData = {
      title: boardTitle,
      description: 'Amazingestest-board',
    };
    actions.boards.createBoard(boardData);
  }
}
