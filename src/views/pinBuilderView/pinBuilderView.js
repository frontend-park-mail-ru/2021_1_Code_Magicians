import {View} from '../view.js';
import {actions} from 'actions/actions';
import {toastBox} from 'components/toast/toast';
import {pinsStore} from 'stores/pinsStore/pinsStore';
import {userStore} from 'stores/userStore/UserStore';
import {constants} from 'consts/consts';
import {appRouter} from 'appManagers/router';
import {descriptionRegexp} from 'consts/regexp';
import {Page} from 'components/page/page';
import {BoardControl} from 'components/boardControl/boardControl';

import PinBuilderViewTemplate from './pinBuilderView.hbs';
import './pinBuilderView.scss';


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

    pinsStore.bind('change', this.refresh);
  }

  /**
   * Did
   */
  didMount() {
    if (!userStore.getUser() || !userStore.getUser().authorized()) {
      appRouter.back();
      return;
    }

    if (pinsStore.getStatus() === constants.store.statuses.pinsStore.pinCreated) {
      appRouter.go(`/pin/${pinsStore.getNewPinID()}`);
      actions.pins.statusProcessed();
      return;
    }

    document.querySelector('.pin-builder-form').addEventListener('submit', this.submit);
    document.getElementById('file-input').addEventListener('change', this.previewImage);

    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.pin-builder-form').removeEventListener('submit', this.submit);
    document.getElementById('file-input').removeEventListener('change', this.previewImage);

    super.willUnmount();
  }

  /**
   * Returns pinBuilder view html
   * @return {String}
   */
  render() {
    const profile = userStore.getUser() && userStore.getUser().profile;
    const boardControl = new BoardControl(this.props);
    this._nestedComponents.set('_boardControl', boardControl);
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        ...this.props,
        boardControl: this._nestedComponents.get('_boardControl').render(),
        profile: profile,
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
    };

    const formData = new FormData();

    formData.append('pinInfo', JSON.stringify(payload));
    formData.append('pinImage', image.files[0]);
    actions.pins.createPin(formData);

    this.setState(payload);
  }

  /**
   * previewImage callback
   * @param {Event} event
   */
  previewImage(event) {
    event.preventDefault();

    const file = document.getElementById('file-input').files;
    if (file.length > 0) {
      const fileReader = new FileReader();

      fileReader.onload = function(event) {
        document.getElementById('preview-label').style.backgroundImage = `url('${event.target.result}'`;
      };

      fileReader.readAsDataURL(file[0]);
    }
  }
}
