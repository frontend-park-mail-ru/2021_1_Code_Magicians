import { appRouter } from 'appManagers/router';
import { View } from '../view';

import NotFoundViewTemplate from './notFoundView.hbs';
import './notFoundView.scss';

/**
 * Page not found view
 */
export class NotFoundView extends View {
  /**
     * Makes new NotFoundView
     * @param {Object} props
     */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.tmpl = NotFoundViewTemplate;
    this.back = (event) => {
      event.preventDefault();
      appRouter.back();
    };
  }

  /**
     * Rendering 404 page
     * @return {string}
     */
  render() {
    return this.tmpl({ ...this.props });
  }

  /**
   * Did
   */
  didMount() {
    document.querySelector('.page-error__back-button').addEventListener('click', this.back);
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.page-error__back-button').removeEventListener('click', this.back);
  }
}
