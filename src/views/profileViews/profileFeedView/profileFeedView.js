import { pinsStore } from 'stores/pinsStore';
import { Vlist } from 'components/vlist/vlist';
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
    const pinArray = pinsStore.getSubscriptionPinsFeed();

    const vlist = new Vlist({
      ...this.props,
      pins: pinArray,
      width: this._parent.clientWidth,
      height: this._parent.clientHeight,
    });
    this._nestedComponents.set('_vlist', vlist);

    this._profileMainContent = this._nestedComponents.get('_vlist').render();

    return super.render();
  }
}
