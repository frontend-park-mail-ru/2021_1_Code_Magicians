import {View} from '../view.js';
import {Page} from 'components/page/page';

import PinViewTemplate from './pinView.hbs';
import './pinView.scss';

/**
 * Build pin view
 */
export class PinView extends View {
  /**
   * Makes new pin view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    // const payload = {
    //   name: '',
    //   description: '',
    //   image: '',
    //   link: '',
    // };
    //
    // this.setState(payload);

    this.tmpl = PinViewTemplate;
    this.submit = this.submit.bind(this);
  }

  /**
   * Did
   */
  didMount() {
    // if (userStore.getStatus() === constants.store.statuses.userStore.alreadyAuthorized) {
    //   appRouter.go('/');
    //   return '';
    // }

    document.querySelector('.comment-form').addEventListener('submit', this.submit);

    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.comment-form').removeEventListener('submit', this.submit);

    super.willUnmount();
  }

  /**
   * Returns pinBuilder view html
   * @return {String}
   */
  render() {
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        ...this.props,
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

    // const userName = document.querySelector('[name="login-username"]').value.trim();
    // const userPassword = document.querySelector('[name="login-pass"]').value.trim();
    // const name = document.querySelector('[name="name"]').value.trim();
    // const description = document.querySelector('[name="description"]').value.trim();
    // const pinImage = document.querySelector('[name="pin-image"]').value.trim();
    // const link = document.querySelector('[name="link"]').value.trim();


    // add validation

    // const payload = {
    //   name: name,
    //   description: description,
    //   image: pinImage,
    //   link: link,
    // };
    //
    // this.setState(payload);
    // actions.user.login(userName, userPassword);
    // appRouter.go('/profile');
  }
}
