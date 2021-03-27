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

    this._active = false;
    this._parent = parent;
    this._page = null;
  }

  /**
   * Shows view on the screen
   * @param {Object} pathArgs from path
   */
  show(pathArgs) {
    this.props.pathArgs = pathArgs;
    this.active = true;

    if (this._page) { // then we show it first
      this._page.show(pathArgs);
      this
          ._parent
          .getElementsByClassName('page__content')[0]
          .insertAdjacentHTML('afterbegin', this.render());
    } else {
      this._parent.insertAdjacentHTML('afterbegin', this.render());
    }

    this.didMount();
  }

  /**
   * Refreshes view
   */
  refresh() {
    if (this.active) {
      this.remove();
      this.show(this.props.pathArgs);
    }
  }

  /**
   * Removes view from the screen
   */
  remove() {
    this._active = false;

    if (this._page) this._page.willUnmount();
    this.willUnmount();
    this._parent.innerHTML = '';
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
