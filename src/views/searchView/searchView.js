import { View } from '../view';
import { Page } from '../../components/page/page';
import { ProfilesFeed } from '../../components/profilesFeed/profilesFeed';
import { PinsFeed } from '../../components/pinsFeed/pinsFeed';
import { profilesStore } from '../../stores/profilesStore';
import { pinsStore } from '../../stores/pinsStore';
import { actions } from '../../actions/actions';

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
    const val = window
      .location
      .pathname
      .replace('/search/', '');
    const date = window.location.search.replace('?', '');
    const query = {
      key: val,
      date,
    };
    const searchingProfiles = query.key.startsWith('@');
    const foundItems = searchingProfiles ? profilesStore.getFoundProfiles(query.key) : pinsStore.getFoundPins(query.key);

    if (!foundItems) {
      actions.common.search(searchingProfiles ? query.key : query, searchingProfiles ? 'profiles' : 'pins');
    }

    let foundItemsFeed = {};
    if (searchingProfiles) {
      foundItemsFeed = new ProfilesFeed({ ...this.props, profiles: foundItems });
    } else {
      foundItemsFeed = new PinsFeed({ ...this.props, pins: foundItems });
    }
    this._nestedComponents.set('_foundItems', foundItemsFeed);

    const html = this.tmpl({
      ...this.props,
      searchType: searchingProfiles ? 'Profiles' : 'Pins',
      searchingProfiles,
      query: query.key.replaceAll('+', ' ').replace('@', ''),
      foundItems: this._nestedComponents.get('_foundItems').render(),
    });

    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: html,
    }));

    return this._nestedComponents.get('page').render();
  }

  didMount() {
    const val = window
      .location
      .pathname
      .replace('/search/', '');
    let date = window.location.pathname.replace('/search/', '');
    // date = date.substr('^&date=');
    date = date.search('&date=') !== -1 ? date.substr(date.search('&date=') + 6) : 'allTime';

    if (!['hour', 'day', 'week', 'allTime'].includes(date)) {
      date = 'allTime';
    }

    const dateElement = document.querySelector(`[data-date=${date}]`);
    const datePicker = document.querySelector('.navbar__date-picker');
    if (dateElement && datePicker) {
      datePicker.style.width = 'auto';
      dateElement.dataset.selected = 'true';
      dateElement.style.backgroundColor = 'var(--red)';
    }

    const navbarInput = document.querySelector('.navbar__search-input');
    const queryString = document.querySelector('.search-page__search-description');

    if (navbarInput && queryString) {
      const subStr = val.search('&date') !== -1 ? val.substr(0, val.search('&date')) : val;
      queryString.innerHTML = `found by query ${subStr}`;
      navbarInput.value = subStr;
      navbarInput.focus();
    }

    super.didMount();
  }
}
