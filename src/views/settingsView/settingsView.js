import {View} from '../view';
import {Page} from 'components/page/page';
import {ProfileChanges} from 'components/profileChanges/profileChanges';
import {SecuritySettings} from 'components/securitySettings/securitySettings';
import {NotificationSettings} from 'components/notificationSettings/notificationSettings';
import {userStore} from 'stores/userStore/UserStore';
import {urlRegexp} from 'consts/regexp';
import {actions} from 'actions/actions';
import {appRouter} from 'appManagers/router';
import {constants} from 'consts/consts';
import {toastBox} from 'components/toast/toast';

import SettingsViewTemplate from './settingsView.hbs';
import './settingsView.scss';


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

    this.tmpl = SettingsViewTemplate;

    this.logout = this.logout.bind(this);
  }

  /**
   * Returns settings view html
   * @return {String}
   */
  render() {
    let settingsForm;
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
      page__content: this.tmpl({
        ...this.props,
        settingsForm: this._nestedComponents.get('_settingsForm').render(),
      }),
    }));

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
   * @param {Event} ev
   */
  logout(ev) {
    ev.preventDefault();

    actions.user.logout();
    appRouter.go(this.props.paths.home);
  }

  /**
   * Did
   */
  didMount() {
    this.processSections();

    document.querySelector('.settings__logout-button').addEventListener('click', this.logout);

    super.didMount();

    const user = userStore.getUser();
    if ((!user || !user.authorized()) &&
      userStore.getStatus() === constants.store.statuses.userStore.unauthorized) {
      this._active = false;
      appRouter.go(this.props.paths.home);
      return;
    }

    switch (userStore.getStatus()) {
      case constants.store.statuses.userStore.clientError:
      case constants.store.statuses.userStore.internalError:
        toastBox.addToast('Something went wrong. Please, try to refresh the page or come back later.', true);
        actions.user.statusProcessed();
        break;
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
