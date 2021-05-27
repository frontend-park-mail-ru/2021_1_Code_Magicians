import { Component } from '../component.js';

import ShareControlTemplate from './shareControl.hbs';
import './shareControl.scss';

/**
 * Share control
 */
export class ShareControl extends Component {
  /**
   * Constructs new share button control component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = ShareControlTemplate;

    document.querySelector('meta[property="og:title"]').setAttribute('content', this.props.shareTitle);
    document.querySelector('meta[property="og:description"]').setAttribute('content', this.props.shareDescription);
    document.querySelector('meta[property="og:image"]').setAttribute('content', this.props.shareImage);
    document.querySelector('meta[property="og:url"]').setAttribute('content', this.props.shareLink);
    document.querySelector('meta[property="og:site_name"]').setAttribute('content', 'Pinter-best');
    document.querySelector('meta[name="twitter:site"]').setAttribute('content', this.props.shareLink);
    document.querySelector('meta[name="twitter:title"]').setAttribute('content', this.props.shareTitle);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', this.props.shareDescription);
    document.querySelector('meta[name="twitter:image"]').setAttribute('content', this.props.shareImage);
  }

  /**
   * Returns the html code for comment
   * @return {string} final html
   */
  render() {
    return this.tmpl({
      ...this.props,
    });
  }

  /**
   * Did
   */
  didMount() {
    document
      .querySelector('.show-button')
      .addEventListener('click', this.showBoardForm);
    document
      .getElementById('copy-link')
      .addEventListener('click', this.copyLink);
  }

  /**
   * Will
   */
  willUnmount() {
    if (!this._userIsAuthorized) {
      return;
    }

    document
      .querySelector('.show-button')
      .removeEventListener('click', this.showBoardForm);
    document
      .getElementById('copy-link')
      .removeEventListener('click', this.copyLink);
  }

  /**
   * hideBoard callback
   * @param {Event} event
   */
  copyLink(event) {
    event.preventDefault();
    const input = document.body.appendChild(document.createElement('input'));
    input.value = window.location.href;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);

    document.querySelector('.share-form').dataset.visibile = 'false';
    document.querySelector('.share-form').style.width = '0';
  }

  /**
   * createBoard callback
   * @param {Event} event
   */
  showBoardForm(event) {
    event.preventDefault();

    const element = document.querySelector('.share-form');

    if (element.dataset.visible === 'false') {
      element.style.width = '100%';
      element.dataset.visible = 'true';
    } else {
      element.style.width = '0';
      element.dataset.visible = 'false';
    }
  }
}
