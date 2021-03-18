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
    this._parent = parent;
  }

  /**
   * Shows view on the screen
   */
  show() {
    this._parent.insertAdjacentHTML('afterbegin', this.render());
    this._didMount();
  }

  /**
   * Removes view from the screen
   */
  remove() {
    this._willUnmount();
    this._parent.innerHTML = '';
  }

  /**
   * Called right after showing view
   */
  _didMount() {
  }

  /**
   * Called before removing view
   */
  _willUnmount() {
  }
}
