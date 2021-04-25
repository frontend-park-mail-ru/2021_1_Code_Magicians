import {Component} from '../component';
import {userStore} from 'stores/userStore/UserStore';
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
    const user = userStore.getUser();

    return this.tmpl({
      ...this.props,
      userIsAuthorised: user && user.authorized(),
      user: user && user.profile,
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
    const searchWiper = document.querySelector('.navbar__search-wiper');
    if (searchWiper) {
      searchWiper.removeEventListener('click', this.wipeSearchField);
    }
  }
}
