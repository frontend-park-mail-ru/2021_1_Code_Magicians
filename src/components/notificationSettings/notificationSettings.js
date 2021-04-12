import {Component} from '../component.js';

import NotificationSettingsTemplate from './notificationSettings.hbs';
import './notificationSettings.scss';

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

    this.tmpl = NotificationSettingsTemplate;
  }

  /**
   * Returns html code
   * @return {String}
   */
  render() {
    return this.tmpl({...this.props});
  }
}
