import {View} from '../view.js';
import {Page} from '../page/page.js';
import {ProfileHeader} from '../../components/profileHeader/profileHeader.js';

/**
 * Base profile view
 */
export class ProfileView extends View {
  /**
   * Makes base profile view's layout
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this._page = new Page(props);
    this._profileHeader = new ProfileHeader({});
  }

  /**
   * Rendering profile html
   * @return {String}
   */
  render() {
    return this._profileHeader.render();
  }
}
