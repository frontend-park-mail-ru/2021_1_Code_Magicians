import {View} from '../view.js';
import {Page} from 'components/page/page';

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
  }

  /**
   * Did
   */
  didMount() {
    document.querySelector('.pin-builder-form').addEventListener('submit', this.submit);

    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.pin-builder-form').removeEventListener('submit', this.submit);

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

    const name = document.querySelector('[name="name"]').value.trim();
    const description = document.querySelector('[name="description"]').value.trim();
    const pinImage = document.querySelector('[name="pin-image"]').value.trim();
    const link = document.querySelector('[name="link"]').value.trim();


    // add validation

    const payload = {
      name: name,
      description: description,
      image: pinImage,
      link: link,
    };

    this.setState(payload);
  }
}
