import {Navbar} from '../../components/navbar/navbar.js';
import {Sidebar} from '../../components/sidebar/sidebar.js';
import {View} from '../view.js';

/**
 * Base page component
 */
export class Page extends View {
  /**
   * Constructs new page
   * @param {Object} props
   */
  constructor(props) {
    super(props, document.getElementById('app'));

    this._pageNavbar = new Navbar(props);
    this._pageSidebar = new Sidebar(props);
  }

  /**
   * Returns the html code for page__sidebar
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['page.hbs'];
    return tmpl({
      page__navbar: this._pageNavbar.render(),
      page__sidebar: this._pageSidebar.render(),
      ...this.props,
    });
  }
}
