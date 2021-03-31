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
    return tmpl(this.props);
  }

  /**
   * On wiper
   * @param {Event} ev
   */
  wipeSearchField(ev) {
    document.querySelector('.navbar__search-input').value = '';
  }

  /**
   * Did
   */
  didMount() {
    document
        .querySelector('.navbar__search-wiper')
        .addEventListener('click', this.wipeSearchField);
  }

  /**
   * Will
   */
  willUnmount() {
    document
        .querySelector('.navbar__search-wiper')
        .removeEventListener('click', this.wipeSearchField);
  }
}
