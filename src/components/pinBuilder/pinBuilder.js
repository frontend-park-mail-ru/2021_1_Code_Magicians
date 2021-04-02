import {Component} from '../component.js';

/**
 * pin builder (pin-builder)
 */
export class PinBuilder extends Component {
  /**
     * Constructs new pinBuilder component
     * @param {Object} props
     */
  constructor(props) {
    super(props);
  }

  /**
     * Returns the html code for pin-builder
     * @return {string} final html
     */
  render() {
    const tmpl = Handlebars.templates['pinBuilder.hbs'];
    return tmpl(this.props);
  }
}
