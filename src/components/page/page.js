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

    this._nestedComponents.set('pageNavbar', new Navbar(props));
    this._nestedComponents.set('pageSidebar', new Sidebar(props));
  }

  /**
   * Returns base page layout html
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['page.hbs'];
    return tmpl({
      page__navbar: this._nestedComponents.get('pageNavbar').render(),
      page__sidebar: this._nestedComponents.get('pageSidebar').render(),
      ...this.props,
    });
  }
}
