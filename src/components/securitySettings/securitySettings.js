import {Component} from '../component.js';

/**
 * Security settings form
 */
export class SecuritySettings extends Component {
  /**
   * Makes new form
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
    const tmpl = Handlebars.templates['securitySettings.hbs'];

    return tmpl({...this.props});
  }
}
