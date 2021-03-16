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
}
