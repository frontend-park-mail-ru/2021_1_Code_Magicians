import { urlRegexp } from 'consts/regexp';
import { userStore } from 'stores/userStore';
import { actions } from 'actions/actions';
import { Component } from '../component';

import SidebarTemplate from './sidebar.hbs';
import './sidebar.scss';

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
  }

  /**
   * Returns the html code for page__sidebar
   * @return {string} final html
   */
  render() {
    this._userIsAuthorized = userStore.getUser() && userStore.getUser().authorized();

    return this.tmpl({
      ...this.props,
      userIsAuthorized: this._userIsAuthorized,
      hasNewNotification: userStore.hasNewNotification(),
      hasNewMessage: userStore.hasNewMessage(),
    });
  }

  /**
   * Toggles theme
   * @param {Event} event
   */
  toggleTheme(event) {
    event.preventDefault();

    const htmlTag = document.documentElement;
    const newTheme = htmlTag.getAttribute('theme') === 'dark' ? 'light' : 'dark';

    window.localStorage.setItem('theme', newTheme);
    htmlTag.setAttribute('theme', newTheme);

    const icon = document.querySelector('.theme-toggle-icon');

    icon.classList.toggle('far');
    icon.classList.toggle('fas');
  }

  /**
   * Returns event listener
   * @param {String} sliderName
   * @param {Boolean} initial
   * @return {(function(*=): void)|*}
   */
  static toggleSlider(sliderName, initial = false) {
    return (event) => {
      event.preventDefault();

      const display = document.querySelector(`[name="${sliderName}Slider"]`).style.display || 'none';

      Sidebar.hideSliders(event);

      document
        .querySelector(`[name="${sliderName}Slider"]`)
        .style
        .display = display === 'none' ? 'flex' : 'none';

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

      if (!initial) {
        actions.user.sliderToggled(sliderName);
      }
    };
  }

  /**
   * Hides slider
   * @param {Boolean} initial
   * @param {Event} event
   */
  static hideSliders(event, initial = false) {
    event.preventDefault();

    document
      .querySelectorAll('.slider-wrapper')
      .forEach((slider) => slider.style.display = 'none');
    document
      .querySelectorAll('.slider-toggle')
      .forEach((toggle) => toggle.classList.remove('sidebar__toggle_active'));

    document.querySelector('.page__wrap').style.overflow = 'auto';

    if (!initial) {
      actions.user.sliderToggled('');
    }
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

    document
      .querySelector('.theme-toggle')
      .addEventListener('click', this.toggleTheme);

    if (this._userIsAuthorized) {
      document
        .querySelectorAll('.page-shader')
        .forEach((button) => button.addEventListener('click', Sidebar.hideSliders));
      document
        .querySelector('[name="messages-toggle"]')
        .addEventListener('click', Sidebar.toggleSlider('Messages'));
      document
        .querySelector('[name="notifications-toggle"]')
        .addEventListener('click', Sidebar.toggleSlider('Notifications'));
    }
  }

  /**
   * Will
   */
  willUnmount() {
    document
      .querySelector('.theme-toggle')
      .removeEventListener('click', this.toggleTheme);

    if (this._userIsAuthorized) {
      document
        .querySelectorAll('.page-shader')
        .forEach((button) => button.removeEventListener('click', Sidebar.hideSliders));
      document
        .querySelector('[name="messages-toggle"]')
        .removeEventListener('click', Sidebar.toggleSlider('Messages'));
      document
        .querySelector('[name="notifications-toggle"]')
        .removeEventListener('click', Sidebar.toggleSlider('Notifications'));

      this._userIsAuthorized = false;
    }
  }
}
