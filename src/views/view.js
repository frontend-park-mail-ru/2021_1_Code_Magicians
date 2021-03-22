import {Component} from '../components/component.js';

/**
 * Base view class (abstract)
 */
export class View extends Component {
  /**
   * Constructs new view
   * @param {Object} props Properties, for utility usage and for inner components' templates
   * @param {HTMLElement} parent Parent HTMLElement, in which view's html will insert
   */
  constructor(props, parent) {
    super(props);
    this.parent = parent;
    this.active = false;
  }

  /**
   * Shows view on the screen
   */
  show() {
    this.active = true;
    this.parent.insertAdjacentHTML('afterbegin', this.render());
    this.didMount();
  }

  /**
   * Refreshes view
   */
  refresh() {
    if (this.active) {
      this.remove();
      this.show();
    }
  }

  /**
   * Removes view from the screen
   */
  remove() {
    this.active = false;
    this.willUnmount();
    this.parent.innerHTML = '';
  }

  /**
   * Called right after showing the view
   */
  didMount() {
  }

  /**
   * Called before removing the view
   */
  willUnmount() {
  }
}
