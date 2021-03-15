import {Component} from '../components/component.js';

/**
 * Base view class
 */
export class View extends Component {
  /**
   * Constructs new view
   * @param {Object} props
   * @param {HTMLElement} parent
   */
  constructor(props, parent) {
    super(props);
    this.parent = parent;
  }

  /**
   * Shows view on the screen
   */
  show() {
    this.parent.insertAdjacentHTML('afterbegin', this.render());
    this.didMount();
  }

  /**
   * Removes view from the screen
   */
  remove() {
    this.willUnmount();
    this.parent.innerHTML = '';
  }

  /**
   * Called right after showing view
   */
  didMount() {
  }

  /**
   * Called before removing view
   */
  willUnmount() {
  }
}
