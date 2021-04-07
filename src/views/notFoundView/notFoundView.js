import {View} from '../view.js';
import {appRouter} from '../../appManagers/router.js';

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

    this.back = (ev) => appRouter.back();
  }

  /**
   * Rendering 404 page
   * @return {string}
   */
  render() {
    const tmpl = Handlebars.templates['notFoundView.hbs'];

    return tmpl({});
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
