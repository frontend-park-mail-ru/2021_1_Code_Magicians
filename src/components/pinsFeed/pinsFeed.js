import {Component} from '../component';

import PinsFeedTemplate from './pinsFeed.hbs';
import './pinsFeed.scss';

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

    this.tmpl = PinsFeedTemplate;
  }

  /**
   * Returns html code
   * @return {String}
   */
  render() {
    return this.tmpl({...this.props});
  }
}
