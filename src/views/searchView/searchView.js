import {View} from '../view';
import {Page} from '../../components/page/page';
import {ProfilesFeed} from '../../components/profilesFeed/profilesFeed';

import SearchViewTemplate from './searchView.hbs';

/**
 * Search view
 */
export class SearchView extends View {
  /**
   * Makes new SearchView
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.tmpl = SearchViewTemplate;
  }

  /**
   * Returns SearchView html
   * @return {String}
   */
  render() {
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        ...this.props,
        profilesFeed: new ProfilesFeed({}).render(),
      }),
    }));

    return this._nestedComponents.get('page').render();
  }

  // /**
  //  * Did
  //  */
  // didMount() {
  // }
  //
  // /**
  //  * Will
  //  */
  // willUnmount() {
  // }
}
