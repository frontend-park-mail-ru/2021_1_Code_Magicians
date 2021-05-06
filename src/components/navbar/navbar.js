import { userStore } from 'stores/userStore';
import { Component } from '../component';
import { actions } from '../../actions/actions';
import { appRouter } from '../../appManagers/router';

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

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  /**
   * Returns the html code for page__navbar
   * @return {string} final html
   */
  render() {
    const user = userStore.getUser();
    this._userIsAuthorized = user && user.authorized();

    return this.tmpl({
      ...this.props,
      userIsAuthorized: this._userIsAuthorized,
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

    if (this._userIsAuthorized) {
      document
        .querySelector('[name="dropdown-toggle"]')
        .addEventListener('click', this.toggleDropdown);
      document
        .querySelector('[name="logout"]')
        .addEventListener('click', this.logout);

      document.addEventListener('click', this.closeDropdown);
    }

    document
      .querySelector('.navbar__search-form')
      .addEventListener('submit', this.activateSearch);
  }

  /**
   * Will
   */
  willUnmount() {
    const searchWiper = document.querySelector('.navbar__search-wiper');
    searchWiper.removeEventListener('click', this.wipeSearchField);

    if (this._userIsAuthorized) {
      document
        .querySelector('[name="dropdown-toggle"]')
        .removeEventListener('click', this.toggleDropdown);
      document
        .querySelector('[name="logout"]')
        .removeEventListener('click', this.logout);

      document.removeEventListener('click', this.closeDropdown);
    }
  }

  /**
   * Toggle it
   * @param {Event} event
   */
  toggleDropdown(event) {
    event.preventDefault();

    const dropdown = document.querySelector('.navbar__dropdown-actions');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
  }

  /**
   * Close it
   * @param {Event} event
   */
  closeDropdown(event) {
    const toggleButton = document.querySelector('[name="dropdown-toggle"]');
    const dropdown = document.querySelector('.navbar__dropdown-actions');

    if (toggleButton.contains(event.target) || dropdown.contains(event.target)) {
      return;
    }

    document
      .querySelector('.navbar__search-wiper')
      .removeEventListener('click', this.wipeSearchField);
    document
      .querySelector('.navbar__search-form')
      .removeEventListener('submit', this.activateSearch);
  }

  /**
   * Search form submit callback
   * @param {Event} event
   */
  activateSearch(event) {
    event.preventDefault();

    const query = document
      .querySelector('.navbar__search-input')
      .value
      .trim()
      .replaceAll(/(\s+)/g, '+');

    if (query && query.replace('@', '')) {
      actions.common.search(query, query.startsWith('@') ? 'profiles' : 'pins');
      appRouter.go(`/search/${query}`);
    }

    document.querySelector('.navbar__dropdown-actions').style.display = 'none';
  }

  /**
   * Logout
   * @param {Event} event
   */
  logout(event) {
    event.preventDefault();

    actions.user.logout();
  }
}
