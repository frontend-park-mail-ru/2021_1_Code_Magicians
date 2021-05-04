import {Component} from '../component';

import ProfilesFeedTemplate from './profilesFeed.hbs';
import './profilesFeed.scss';

/**
 * Standard pins feed component
 */
export class ProfilesFeed extends Component {
  /**
   * Makes new pins feed
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = ProfilesFeedTemplate;
  }

  /**
   * Returns html code
   * @return {String}
   */
  render() {
    return this.tmpl({...this.props});
  }
}
