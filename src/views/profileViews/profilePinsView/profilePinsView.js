import {ProfileView} from '../profileView/profileView';
import {PinsFeed} from 'components/pinsFeed/pinsFeed';
import {pinsStore} from 'stores/pinsStore/pinsStore';


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
    this._nestedComponents.set('_pinsFeed', new PinsFeed({
      ...this.props,
      pins: pinsStore.getPinsByProfileID(this.props.pathArgs.profileID),
    }));
    this._profileMainContent = this._nestedComponents.get('_pinsFeed').render();

    return super.render();
  }
}
