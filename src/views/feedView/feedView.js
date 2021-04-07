import {View} from '../view.js';
import {userStore} from '../../stores/userStore/UserStore.js';
import {PinsFeed} from '../../components/pinsFeed/pinsFeed.js';
import {Page} from '../../components/page/page.js';
import {Pin} from '../../models/pin/Pin.js';

const pins = Array(50).fill(0).map((pin, i) => new Pin({
  ID: i,
  boardID: 100 + i % 3,
  title: `title${i}`,
  description: 'blah blah blah',
  tags: [],
  imageLink: '/assets/img/default-avatar.jpg',
}));

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

    userStore.bind('change', this.refresh);
  }

  /**
   * Returns html
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['feedView.hbs'];

    this._nestedComponents.set('_pinsFeed', new PinsFeed({...this.props, pins: pins}));
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: tmpl({
        pinsFeed: this._nestedComponents.get('_pinsFeed').render(),
      }),
    },
    ));

    return this._nestedComponents.get('page').render();
  }
}
