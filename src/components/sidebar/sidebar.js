import {Component} from '../component.js';

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
   * Did
   */
  didMount() {
    document
        .querySelectorAll('.view-selector__item')
        .forEach(item => {
          // item.classList.remove('view-selector__item_selected');
          if (item.getAttribute('data-view') === this._state.view) {
            item.classList.add('view-selector__item_selected');
          }
        });
  }
}
