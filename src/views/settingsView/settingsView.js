import {View} from '../view.js';
import {Page} from '../page/page.js';

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

    this._page = new Page(props);
  }

  /**
   * Returns settings view html
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['settingsView.hbs'];
    return tmpl(this.props);
  }
}
