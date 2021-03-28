import {Component} from '../component.js';

/**
 * Profile header
 */
export class ProfileHeader extends Component {
  /**
   * Constructs new profileViews header component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns the html code for the profileViews header
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['profileHeader.hbs'];
    return tmpl(this.props);
  }
}
