import {View} from '../../view.js';
import {Page} from '../../../components/page/page.js';
import {ProfileHeader} from '../../../components/profileHeader/profileHeader.js';

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

    this._profileMainContent = ''; // different in different views
  }

  /**
   * Rendering profile html
   * @return {String}
   */
  render() {
    this._nestedComponents.set('profileHeader', new ProfileHeader({...this.props}));
    this._nestedComponents.get('profileHeader').setState({section: 'profile'});

    const tmpl = Handlebars.templates['profileView.hbs'];

    this._page = new Page({
      ...this.props,
      page__content: tmpl({
        profileHeader: this._nestedComponents.get('profileHeader').render(),
        profileContent: this._profileMainContent,
      }),
    });

    return this._page.render();
  }
}
