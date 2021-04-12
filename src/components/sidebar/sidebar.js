import {Component} from '../component';
import {urlRegexp} from 'consts/regexp';
import {userStore} from 'stores/userStore/UserStore';

import SidebarTemplate from './sidebar.hbs';
import './sidebar.scss';
import {User} from 'models/user/User';
import {Profile} from 'models/profile/Profile';
import {constants} from 'consts/consts';

/**
 * Side bar (page__sidebar)
 */
export class Sidebar extends Component {
  /**
   * Constructs new sidebar component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = SidebarTemplate;
    this.hideSliders = this.hideSliders.bind(this);
  }

  /**
   * Returns the html code for page__sidebar
   * @return {string} final html
   */
  render() {
    const user = userStore.getUser() || new User(new Profile(constants.mocks.defaultProfile));
    this._userIsAuthorized = user.authorized();

    return this.tmpl({
      ...this.props,
      userIsAuthorized: this._userIsAuthorized,
    });
  }

  /**
   * Toggles theme
   * @param {Event} event
   */
  toggleTheme(event) {
    const htmlTag = document.documentElement;
    const newTheme = htmlTag.getAttribute('theme') === 'dark' ? 'light' : 'dark';

    window.localStorage.setItem('theme', newTheme);
    htmlTag.setAttribute('theme', newTheme);

    const icon = document.querySelector('.theme-toggle-icon');

    const newFaClass = icon.classList.contains('far') ? 'fas' : 'far';
    const oldFaClass = newFaClass === 'fas' ? 'far' : 'fas';

    icon.classList.replace(oldFaClass, newFaClass);
  }

  /**
   * Returns event listener
   * @param {String} sliderName
   * @return {(function(*=): void)|*}
   */
  toggleSlider(sliderName) {
    return (event) => {
      event.preventDefault();

      const display = document.querySelector(`[name="${sliderName}Slider"]`).style.display || 'none';

      this.hideSliders(event);

      document
          .querySelector(`[name="${sliderName}Slider"]`)
          .style
          .display = display === 'none' ? 'block' : 'none';

      if (display === 'none') {
        document
            .querySelector(`[name="${sliderName.toLowerCase()}-toggle"]`)
            .classList
            .add('sidebar__toggle_active');
      } else {
        document
            .querySelector(`[name="${sliderName.toLowerCase()}-toggle"]`)
            .classList
            .remove('sidebar__toggle_active');
      }

      document.querySelector('.page__wrap').style.overflow = 'hidden';
    };
  }

  /**
   * Hides slider
   * @param {Event} event
   */
  hideSliders(event) {
    event.preventDefault();

    document
        .querySelectorAll('.slider-wrapper')
        .forEach((slider) => slider.style.display = 'none');
    document
        .querySelectorAll('.slider-toggle')
        .forEach((toggle) => toggle.classList.remove('sidebar__toggle_active'));

    document.querySelector('.page__wrap').style.overflow = 'auto';
  }

  /**
   * Did
   */
  didMount() {
    document
        .querySelectorAll('.sidebar__view-option')
        .forEach((item) => {
          const link = item.querySelector('.sidebar__view-link');
          const currLocation = window.location.pathname === '/' ? '/home' : window.location.pathname;

          if (currLocation.startsWith(link.href.replace(urlRegexp, ''))) {
            item.classList.add('sidebar__view-option_selected');
          }
        });

    document.querySelector('.theme-toggle').addEventListener('click', this.toggleTheme);

    if (this._userIsAuthorized) {
      document
          .querySelectorAll('.page-shader')
          .forEach((button) => button.addEventListener('click', this.hideSliders));
      document
          .querySelector('[name="messages-toggle"]')
          .addEventListener('click', this.toggleSlider('Messages'));
      document
          .querySelector('[name="notifications-toggle"]')
          .addEventListener('click', this.toggleSlider('Notifications'));
    }
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.theme-toggle').removeEventListener('click', this.toggleTheme);

    if (this._userIsAuthorized) {
      document
          .querySelectorAll('.page-shader')
          .forEach((button) => button.removeEventListener('click', this.hideSliders));
      document
          .querySelector('[name="messages-toggle"]')
          .removeEventListener('click', this.toggleSlider('Messages'));
      document
          .querySelector('[name="notifications-toggle"]')
          .removeEventListener('click', this.toggleSlider('Notifications'));

      this._userIsAuthorized = false;
    }
  }
}
