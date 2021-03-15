import {Component} from '../component.js';

/**
 * Makes default page-header
 */
export class Header extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns the html code for new page-header
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['header.hbs'];
    return tmpl(this.props);
  }
}
