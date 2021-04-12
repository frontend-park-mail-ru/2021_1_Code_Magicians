import {Component} from '../component.js';

/**
 * Comment (comment__body) //todo check
 */
export class Comment extends Component {
  /**
   * Constructs new comment component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.hideSliders = this.hideSliders.bind(this);
  }

  /**
   * Returns the html code for comment
   * @return {string} final html
   */
  render() {
    const tmpl = Handlebars.templates['comment.hbs'];
    return tmpl({
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
