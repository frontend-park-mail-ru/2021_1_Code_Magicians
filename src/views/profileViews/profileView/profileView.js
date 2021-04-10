import {View} from '../../view.js';
import {Page} from '../../../components/page/page.js';
import {ProfileHeader} from '../../../components/profileHeader/profileHeader.js';
import {userStore} from '../../../stores/userStore/UserStore.js';
import {appRouter} from '../../../appManagers/router.js';

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
    userStore.bind('change', this.refresh);
  }

  /**
   * Rendering profile html
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['profileView.hbs'];

    this._nestedComponents.set('profileHeader', new ProfileHeader({...this.props}));
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: tmpl({
        profileHeader: this._nestedComponents.get('profileHeader').render(),
        profileContent: this._profileMainContent,
      }),
    }));

    return this._nestedComponents.get('page').render();
  }

  /**
   * Did.
   */
  didMount() {
    console.log('profile did mount');
    if (!userStore.getUser().authorized() && Object.keys(this.props.pathArgs).length === 0) {
      appRouter.go('/');
    }

    super.didMount();
  }
}
