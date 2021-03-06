import { PinsFeed } from 'components/pinsFeed/pinsFeed';
import { Page } from 'components/page/page';
import { pinsStore } from 'stores/pinsStore';
import { View } from '../view';

import FeedViewTemplate from './feedView.hbs';
import './feedView.scss';

/**
 * Main pins feed view
 */
export class FeedView extends View {
  /**
   * Makes new feed view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.tmpl = FeedViewTemplate;

    pinsStore.bind('change', this.refresh);
  }

  /**
   * Returns html
   * @return {String}
   */
  render() {
    this._nestedComponents.set('_pinsFeed', new PinsFeed({
      ...this.props,
      pins: pinsStore.getPinsFeed(),
    }));

    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        pinsFeed: this._nestedComponents.get('_pinsFeed').render(),
      }),
    }));

    return this._nestedComponents.get('page').render();
  }
}
