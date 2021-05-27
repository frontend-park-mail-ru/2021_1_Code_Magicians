import { Component } from 'components/component';
import { userStore } from 'stores/userStore';
import { Sidebar } from 'components/sidebar/sidebar';
import { actions } from 'actions/actions';

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

    this._sliderShown = '';

    this.refresh = this.refresh.bind(this);
    userStore.bind('change', this.refresh);
  }

  /**
   * Shows view on the screen
   * @param {Object} pathArgs from path
   */
  show(pathArgs) {
    this._active = true;
    this.props.pathArgs = pathArgs;

    this._parent.insertAdjacentHTML('afterbegin', this.render());

    this.didMount();
  }

  /**
   * Refreshes view
   */
  refresh() {
    if (this._active) {
      this._refreshing = true;
      this.remove();
      this.show(this.props.pathArgs);
    }
  }

  /**
   * Removes view from the screen
   */
  remove() {
    this._active = false;

    this.willUnmount();
    this._parent.innerHTML = '';
  }

  /**
   * Did
   */
  didMount() {
    document.documentElement.setAttribute('theme', window.localStorage.getItem('theme'));

    this._sliderShown = userStore.sliderShown();

    if (this._sliderShown) {
      Sidebar.toggleSlider(this._sliderShown, true)(new Event('click'));
    }

    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    if (!this._refreshing) {
      actions.user.viewClosed();
    }
    this._refreshing = false;

    super.willUnmount();
  }
}
