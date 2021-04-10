import {Component} from '../component.js';

/**
 * Standard pins feed component
 */
export class PinsFeed extends Component {
  /**
   * Makes new pins feed
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns html code
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['pinsFeed.hbs'];

    return tmpl({...this.props});
  }
}
