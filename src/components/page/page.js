import {Component} from '../component.js';
import {Navbar} from '../navbar/navbar.js';
import {Sidebar} from '../sidebar/sidebar.js';

/**
 * Main page component
 */
export class Page extends Component {
  /**
   * Constructs new page
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.pageNavbar = new Navbar(props);
    this.pageSidebar = new Sidebar(props);
  }

  /**
   * Returns the html code for page__sidebar
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['page.hbs'];
    return tmpl({
      page__navbar: this.pageNavbar.render(),
      page__sidebar: this.pageSidebar.render(),
      ...this.props,
    });
  }
}
