import { constants } from 'consts/consts';

import logoImage from '../assets/img/Logo.png';

/**
 * Base Component class (abstract)
 */
export class Component {
  /**
   * Constructs new component
   * @param {Object} props Properties, for utility usage and for inner templates rendering
   */
  constructor(props = {}) {
    this.props = {
      ...props,
      paths: constants.network.routerPaths,
      logoImage,
    };

    this._nestedComponents = new Map();
    this._state = {};
    this._mounted = false;
  }

  /**
   * Add new state to a component or update existing ones
   * @param {Object} state
   */
  setState(state) {
    this._state = { ...this._state, ...state };
  }

  /**
   * Clear previously saved state
   */
  clearState() {
    this._state = {};
  }

  /**
   * Returns raw html code, ready to insert somewhere on page
   */
  render() {
  }

  /**
   * Called right after showing the view
   */
  didMount() {
    this._mounted = true;
    if (this._nestedComponents.size) {
      this._nestedComponents.forEach((component) => component.didMount());
    }
  }

  /**
   * Called before removing the view
   */
  willUnmount() {
    if (!this._mounted) {
      return;
    }

    if (this._nestedComponents.size) {
      this._nestedComponents.forEach((component) => component.willUnmount());
    }

    this._mounted = false;
  }
}
