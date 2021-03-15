import {Component} from '../component.js';
import {Header} from '../header/header.js';

/**
 * Renders default page components in browser
 */
export class Page extends Component {
  /**
   * Construct default page elements (like sidebar, header etc)
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.header = new Header(props);
  }

  /**
   * Returns the html code for new page
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['page.hbs'];

    return tmpl({
      header: this.header.render(),
    });
  }
}
