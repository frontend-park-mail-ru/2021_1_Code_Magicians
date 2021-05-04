import {View} from '../view';

import SearchViewTemplate from 'searchView.hbs';
import {Page} from '../../components/page/page';

/**
 * Search view
 */
export class SearchView extends View {
  /**
   * Makes new settings view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.tmpl = SearchViewTemplate;
  }

  /**
   * Returns settings view html
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
   * Did
   */
  didMount() {
  }

  /**
   * Will
   */
  willUnmount() {
  }
}
