import { PinsFeed } from 'components/pinsFeed/pinsFeed';
import { pinsStore } from 'stores/pinsStore';
import { ProfileView } from '../profileView/profileView';

/**
 * Profile pins view
 */
export class ProfileFeedView extends ProfileView {
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
    const pins = pinsStore.getSubscriptionPinsFeed();

    this._nestedComponents.set('_pinsFeed', new PinsFeed({
      ...this.props,
      pins,
    }));

    this._profileMainContent = this._nestedComponents.get('_pinsFeed').render();

    return super.render();
  }
}
