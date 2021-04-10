import {View} from '../view.js';
import {Page} from '../../components/page/page.js';
// eslint-disable-next-line no-unused-vars
import {ProfileChanges} from '../../components/profileChanges/profileChanges.js';
import {SecuritySettings} from '../../components/securitySettings/securitySettings.js';
import {NotificationSettings} from '../../components/notificationSettings/notificationSettings.js';
import {userStore} from '../../stores/userStore/UserStore.js';
import {urlRegexp} from '../../consts/regexp.js';
import {actions} from '../../actions/actions.js';
import {appRouter} from '../../appManagers/router.js';

/**
 * Profile settings view
 */
export class SettingsView extends View {
  /**
   * Makes new settings view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    userStore.bind('change', this.refresh);
  }

  /**
   * Returns settings view html
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['settingsView.hbs'];

    let settingsForm = null;
    switch (this.props.pathArgs['section']) {
      case 'profile':
        settingsForm = new ProfileChanges(this.props);
        break;
      case 'notifications':
        settingsForm = new NotificationSettings(this.props);
        break;
      case 'security':
        settingsForm = new SecuritySettings(this.props);
        break;
      default:
        settingsForm = new ProfileChanges(this.props);
    }

    this._nestedComponents.set('_settingsForm', settingsForm);
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: tmpl({
        ...this.props,
        settingsForm: this._nestedComponents.get('_settingsForm').render(),
      }),
    }));

    this._nestedComponents.get('page').setState({view: 'settings'});
    return this._nestedComponents.get('page').render();
  }

  /**
   * Process section settings links
   */
  processSections() {
    this
        ._parent
        .querySelectorAll('.settings__section-link')
        .forEach((link) => {
          if (window.location.pathname === '/settings') {
            if (link.href.replace(urlRegexp, '') === '/settings/profile') {
              link.classList.add('settings__section-link_active');
            }
          } else if (link.href.replace(urlRegexp, '').startsWith(window.location.pathname)) {
            link.classList.add('settings__section-link_active');
          }
        });
  }

  /**
   * On logout button
   */
  logout() {
    actions.user.logout();
    appRouter.go('/');
  }

  /**
   * Did
   */
  didMount() {
    this.processSections();

    document.querySelector('.settings__logout-button').addEventListener('click', this.logout);

    super.didMount();
    if (!userStore.getUser().authorized()) {
      appRouter.go('/');
    }
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.settings__logout-button').removeEventListener('click', this.logout);

    super.willUnmount();
  }
}
