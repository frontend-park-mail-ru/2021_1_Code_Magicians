import {ProfileView} from '../profileView/profileView.js';
import {PinsFeed} from '../../../components/pinsFeed/pinsFeed.js';
import {Pin} from '../../../models/pin/Pin.js';

const pins = Array(50).fill(0).map((pin, i) => new Pin({
  ID: i,
  boardID: 100 + i % 3,
  title: `title${i}`,
  description: 'blah blah blah',
  tags: [],
  imageLink: '/assets/img/default-avatar.jpg',
}));

/**
 * Profile pins view
 */
export class ProfilePinsView extends ProfileView {
  /**
   * Makes profile pins view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props);
  }

  /**
   * Rendering profile pins html
   * @return {String}
   */
  render() {
    this._nestedComponents.set('_pinsFeed', new PinsFeed({...this.props, pins: pins}));
    this._profileMainContent = this._nestedComponents.get('_pinsFeed').render();

    return super.render();
  }
}
