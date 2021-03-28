import {View} from '../view.js';
import {Page} from '../../components/page/page.js';

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
    this._page = new Page({
      ...this.props,
      page__content: tmpl({...this.props}),
    });

    return this._page.render();
  }
}
