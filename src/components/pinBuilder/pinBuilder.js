import {Component} from '../component.js';

/**
 * Makes pin builder (form)
 */
export class PinBuilder extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns the html code for new pin builder
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['pinBuilder.hbs'];
    return tmpl(this.props);
  }
}
