import {Component} from '../component.js';

/**
 * Notification settings form
 */
export class NotificationSettings extends Component {
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
    const tmpl = Handlebars.templates['notificationSettings.hbs'];

    return tmpl({...this.props});
  }
}
