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
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.theme-toggle').removeEventListener('click', this.toggleTheme);
  }
}
