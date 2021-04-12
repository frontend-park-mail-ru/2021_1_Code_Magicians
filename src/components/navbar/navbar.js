import {Component} from '../component.js';
import {userStore} from 'stores/userStore/UserStore.js';
import NavbarTemplate from './navbar.hbs';
import './navbar.scss';

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

    this.tmpl = NavbarTemplate;
  }

  /**
   * Returns the html code for page__navbar
   * @return {string} final html
   */
  render() {
    return this.tmpl({
      ...this.props,
      userIsAuthorised: userStore.getUser().authorized(),
      user: userStore.getUser().profile,
    });
  }

  /**
   * On wiper
   * @param {Event} event
   */
  wipeSearchField(event) {
    event.preventDefault();
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
