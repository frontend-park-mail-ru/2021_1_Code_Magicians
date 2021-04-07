import {Component} from '../component.js';
import {urlRegexp} from '../../consts/regexp.js';

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

    this.hideSliders = this.hideSliders.bind(this);
  }

  /**
   * Returns the html code for page__sidebar
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['sidebar.hbs'];
    return tmpl({
      ...this.props,
    });
  }

  /**
   * Toggles theme
   * @param {Event} ev
   */
  toggleTheme(ev) {
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
    return (ev) => {
      ev.preventDefault();

      const display = document.querySelector(`[name="${sliderName}Slider"]`).style.display || 'none';

      this.hideSliders(ev);

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
    };
  }

  /**
   * Hides slider
   * @param {Event} ev
   */
  hideSliders(ev) {
    ev.preventDefault();

    document
        .querySelectorAll('.slider-wrapper')
        .forEach((slider) => slider.style.display = 'none');
    document
        .querySelectorAll('.slider-toggle')
        .forEach((toggle) => toggle.classList.remove('sidebar__toggle_active'));
  }

  /**
   * Did
   */
  didMount() {
    document
        .querySelectorAll('.sidebar__view-option')
        .forEach((item) => {
          const link = item.querySelector('.sidebar__view-link');
          if (window.location.pathname.startsWith(link.href.replace(urlRegexp, ''))) {
            item.classList.add('sidebar__view-option_selected');
          }
        });

    document.querySelector('.theme-toggle').addEventListener('click', this.toggleTheme);

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

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.theme-toggle').removeEventListener('click', this.toggleTheme);

    document
        .querySelectorAll('.page-shader')
        .forEach((button) => button.removeEventListener('click', this.hideSliders));
    document
        .querySelector('[name="messages-toggle"]')
        .removeEventListener('click', this.toggleSlider('Messages'));
    document
        .querySelector('[name="notifications-toggle"]')
        .removeEventListener('click', this.toggleSlider('Notifications'));
  }
}
