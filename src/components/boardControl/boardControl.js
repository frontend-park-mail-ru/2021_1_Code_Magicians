import {Component} from '../component.js';

import BoardControlTemplate from './boardControl.hbs';
import './boardControl.scss';

/**
 * BoardControl
 */
export class BoardControl extends Component {
  /**
   * Constructs new board control component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = BoardControlTemplate;
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
