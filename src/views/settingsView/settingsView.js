import {View} from '../view.js';
import {Page} from '../../components/page/page.js';
// eslint-disable-next-line no-unused-vars
import {ProfileChanges} from '../../components/profileChanges/profileChanges.js';
import {SecuritySettings} from '../../components/securitySettings/securitySettings.js';
import {NotificationSettings} from '../../components/notificationSettings/notificationSettings.js';

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
  }

  /**
   * Returns settings view html
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['settingsView.hbs'];

    this._settingsForm = null;

    switch (this.props.pathArgs['section']) {
      case 'profile':
        this._settingsForm = new ProfileChanges(this.props);
        break;
      case 'notifications':
        this._settingsForm = new NotificationSettings(this.props);
        break;
      case 'security':
        this._settingsForm = new SecuritySettings(this.props);
        break;
      default:
        this._settingsForm = new ProfileChanges(this.props);
    }

    this._page = new Page({
      ...this.props,
      page__content: tmpl({
        ...this.props,
        settingsForm: this._settingsForm.render(),
      }),
    });

    return this._page.render();
  }

  /**
   * Did
   */
  didMount() {
    const sectionName = this.props.pathArgs['section'] || 'profile';

    this
        ._parent
        .querySelectorAll('.settings__section-link')
        .forEach(link => {
          link.classList.remove('settings__section-link_active');
          if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('settings__section-link_active');
          }
        });

    this._parent.querySelectorAll('.view-selector__item').forEach(item => {
      if (item.getAttribute('data-view') === 'settings') {
        item.classList.add('view-selector__item_selected');
      }
    });
  }

  /**
   * Will
   */
  willUnmount() {
    this
        ._parent
        .querySelectorAll('.settings__section-link')
        .forEach(link => {
          link.classList.remove('settings__section-link_active');
        });

    this._parent.querySelectorAll('.view-selector__item').forEach(item => {
      if (item.getAttribute('data-view') === 'settings') {
        item.classList.remove('view-selector__item_selected');
      }
    });
  }
}
