import {View} from '../view';
import {PinsFeed} from 'components/pinsFeed/pinsFeed';
import {Page} from 'components/page/page';
import {constants} from 'consts/consts';

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
  }

  /**
   * Returns html
   * @return {String}
   */
  render() {
    this._nestedComponents.set('_pinsFeed', new PinsFeed({...this.props, pins: constants.mocks.pins}));
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        pinsFeed: this._nestedComponents.get('_pinsFeed').render(),
      }),
    },
    ));

    return this._nestedComponents.get('page').render();
  }
}
