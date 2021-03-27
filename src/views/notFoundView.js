import {View} from './view.js';

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
  }

  /**
   * Rendering 404 page
   * @return {string}
   */
  render() {
    return '<h1>404 NOT FOUND</h1>';
  }
}
