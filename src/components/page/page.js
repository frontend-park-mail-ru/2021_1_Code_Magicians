import {Navbar} from '../navbar/navbar.js';
import {Sidebar} from '../sidebar/sidebar.js';
import {Component} from '../component.js';

/**
 * Base page component
 */
export class Page extends Component {
  /**
   * Constructs new page
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this._pageNavbar = new Navbar(props);
    this._pageSidebar = new Sidebar(props);
  }

  /**
   * Returns base page layout html
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
