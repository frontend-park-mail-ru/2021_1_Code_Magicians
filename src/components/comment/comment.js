import {Component} from '../component.js';

import CommentTemplate from './comment.hbs';
import './comment.scss';

/**
 * Comment (comment) //todo check
 */
export class Comment extends Component {
  /**
   * Constructs new comment component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = CommentTemplate;
    this.hideSliders = this.hideSliders.bind(this);
  }

  /**
   * Returns the html code for comment
   * @return {string} final html
   */
  render() {
    return this.tmpl({
      ...this.props,
      userIsAuthorized: this._userIsAuthorized,
    });
  }

  /**
   * Did
   */
  didMount() {

  }

  /**
   * Will
   */
  willUnmount() {

  }
}
