import {Component} from '../component.js';

/**
 * Navigation bar (page__navbar)
 */
export class Navbar extends Component {
  /**
   * Constructs new navbar component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns the html code for page__navbar
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['navbar.hbs'];
    return tmpl({
      user: this.props.user,
    });
  }
}
