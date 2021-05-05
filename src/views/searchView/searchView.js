import {View} from '../view';
import {Page} from '../../components/page/page';
import {ProfilesFeed} from '../../components/profilesFeed/profilesFeed';
import {PinsFeed} from '../../components/pinsFeed/pinsFeed';
import {profilesStore} from '../../stores/profilesStore/profilesStore';
import {pinsStore} from '../../stores/pinsStore/pinsStore';
import {actions} from '../../actions/actions';

import SearchViewTemplate from './searchView.hbs';
import './searchView.scss';


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

    profilesStore.bind('change', this.refresh);
    pinsStore.bind('change', this.refresh);
  }

  /**
   * Returns SearchView html
   * @return {String}
   */
  render() {
    const query = window
        .location
        .pathname
        .replace('/search/', '');
    const searchingProfiles = query.startsWith('@');

    const foundItems = searchingProfiles ? profilesStore.getFoundProfiles(query) : pinsStore.getFoundPins(query);
    if (!foundItems) {
      actions.common.search(query, searchingProfiles ? 'profiles' : 'pins');
    }

    let foundItemsFeed = {};
    if (searchingProfiles) {
      foundItemsFeed = new ProfilesFeed({...this.props, profiles: foundItems});
    } else {
      foundItemsFeed = new PinsFeed({...this.props, pins: foundItems});
    }

    const html = this.tmpl({
      ...this.props,
      searchType: searchingProfiles ? 'Profiles' : 'Pins',
      searchingProfiles: searchingProfiles,
      query: query.replaceAll('+', ' ').replace('@', ''),
      foundItems: this._nestedComponents.get('_foundItems').render(),
    });

    this._nestedComponents.set('_foundItems', foundItemsFeed);
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: html,
    }));

    return this._nestedComponents.get('page').render();
  }
}
