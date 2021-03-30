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
  }

  /**
   * Did
   */
  didMount() {
    document
        .querySelectorAll('.view-selector__item')
        .forEach((item) => {
          const link = item.querySelector('.view-selector__link');
          if (window.location.pathname.startsWith(link.href.replace(urlRegexp, ''))) {
            item.classList.add('view-selector__item_selected');
          }
        });

    document.querySelector('.sidebar__theme-toggle').addEventListener('click', this.toggleTheme);
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.sidebar__theme-toggle').removeEventListener('click', this.toggleTheme);
  }
}
