import {Component} from '../component.js';

/**
 * Slider for notifications and messages
 */
export class Slider extends Component {
  /**
   * Constructs new slider component
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Returns the html code for slider
   * @return {String} final html
   */
  render() {
    const tmpl = Handlebars.templates['slider.hbs'];
    return tmpl({
      ...this.props,
    });
  }
}
