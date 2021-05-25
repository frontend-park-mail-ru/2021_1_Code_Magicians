import { userStore } from 'stores/userStore';
import { boardsStore } from 'stores/boardsStore';
import { toastBox } from 'components/toast/toast';
import { actions } from 'actions/actions';
import { Component } from '../component.js';

import FeedbackControlTemplate from './feedbackControl.hbs';
import './feedbackControl.scss';

/**
 * Vlist
 */
export class FeedbackControl extends Component {
  /**
   * Constructs new board control component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.feedbackSubmit = this.feedbackSubmit.bind(this);
    this.tmpl = FeedbackControlTemplate;
  }

  /**
   * Returns the html code for comment
   * @return {string} final html
   */
  render() {
    const user = userStore.getUser();
    const profile = user && user.profile;
    const userBoards = profile && boardsStore.getBoardsByProfileID(profile.ID);
    this._userIsAuthorized = user && user.authorized();

    return this.tmpl({
      ...this.props,
      profileBoards: userBoards,
      userIsAuthorized: this._userIsAuthorized,
    });
  }

  /**
   * Did
   */
  didMount() {
    if (!this._userIsAuthorized) {
      return;
    }

    document
      .getElementById('feedback-button')
      .addEventListener('click', this.showFeedbackForm);
    document
      .querySelector('.feedback-form')
      .addEventListener('click', this.hideFeedbackForm);
    document
      .querySelector('.feedback-form__button')
      .addEventListener('click', this.feedbackSubmit);
  }

  /**
   * Will
   */
  willUnmount() {
    if (!this._userIsAuthorized) {
      return;
    }

    document
      .getElementById('create-board')
      .removeEventListener('click', this.showFeedbackForm);
    document
      .querySelector('.feedback-form')
      .removeEventListener('click', this.hideFeedbackForm);
    document
      .querySelector('.feedback-form__button')
      .removeEventListener('click', this.feedbackSubmit);
  }

  /**
   * hideBoard callback
   * @param {Event} event
   */
  hideFeedbackForm(event) {
    // event.preventDefault();
    if (event.target.id === 'feedback-form' || event.target.id === 'feedback-close') {
      document.querySelector('.feedback-form').style.visibility = 'hidden';
    }
  }

  /**
   * createBoard callback
   * @param {Event} event
   */
  showFeedbackForm(event) {
    event.preventDefault();

    document.querySelector('.feedback-form').style.visibility = 'visible';
  }

  /**
   * Sending data from the form
   * @param {Event} event
   */
  feedbackSubmit(event) {
    event.preventDefault();

    if (event.target.className !== 'feedback-form__button') {
      return;
    }

    const description = document.querySelector('.feedback-form__text').value.trim();

    if (!description) {
      toastBox.addToast('Don\'t forget your feedback', true);
      return;
    }

    actions.pins.reportPin({ pinID: this.props.currentPin.ID, description });
    document.querySelector('.feedback-form').style.visibility = 'hidden';
  }
}
