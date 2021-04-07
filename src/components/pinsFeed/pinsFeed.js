import {Component} from '../component.js';
import {Pin} from '../../models/pin/Pin.js';

const pins = Array(50).fill(0).map((pin, i) => new Pin({
  ID: i,
  boardID: 100 + i % 3,
  title: `title${i}`,
  description: 'blah blah blah',
  tags: [],
  imageLink: '/assets/img/default-avatar.jpg',
}));

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

    return tmpl({...this.props, pins: pins});
  }
}
