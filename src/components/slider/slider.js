import {Component} from '../component';

import SliderTemplate from './slider.hbs';
import './slider.scss';
import {actions} from 'actions/actions';

/**
 * Slider for notifications and messages
 */
export class Slider extends Component {
  /**
   * Constructs new slider component
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.tmpl = SliderTemplate;
    this.toggleMessageForm = this.toggleMessageForm.bind(this);
  }

  /**
   * Returns the html code for slider
   * @return {String} final html
   */
  render() {
    return this.tmpl({...this.props});
  }

  /**
   * Toggle it
   * @param {Event} event
   */
  toggleMessageForm(event) {
    event.preventDefault();

    const messageButton = document.querySelector('.slider__message-button');
    if (messageButton.innerHTML === 'Send') {
      messageButton.removeEventListener('click', this.submitMessageForm);
    } else {
      messageButton.addEventListener('click', this.submitMessageForm);
    }

    messageButton.classList.toggle('slider__message-button_primary');
    messageButton.innerHTML = messageButton.innerHTML === 'Send' ? 'New message' : 'Send';

    document.querySelector('.message-form').classList.toggle('message-form_hidden');
  }

  /**
   * Send new message
   * @param {Event} event
   */
  submitMessageForm(event) {
    event.preventDefault();
  }

  /**
   * Did
   */
  didMount() {
    if (!this.props.typeIsMessages) {
      document
          .querySelector('[name="MessagesSlider"]')
          .querySelectorAll('.slider__item').forEach((notification) => {
            notification.addEventListener('click', this.markAsRead);
          });

      return;
    }

    document
        .querySelector('.slider__message-button')
        .addEventListener('click', this.toggleMessageForm);
    document
        .querySelector('.message-form__close-button')
        .addEventListener('click', this.toggleMessageForm);
    document
        .querySelector('.message-form')
        .addEventListener('submit', this.submitMessageForm);
  }

  /**
   * Will
   */
  willUnmount() {
    if (!this.props.typeIsMessages) {
      document
          .querySelector('[name="MessagesSlider"]')
          .querySelectorAll('.slider__item').forEach((notification) => {
            notification.removeEventListener('click', this.markAsRead);
          });
      return;
    }

    document
        .querySelector('.slider__message-button')
        .removeEventListener('click', this.toggleMessageForm);
    document
        .querySelector('.slider__message-button')
        .removeEventListener('click', this.submitMessageForm);
    document
        .querySelector('.message-form__close-button')
        .removeEventListener('click', this.toggleMessageForm);
    document
        .querySelector('.message-form')
        .removeEventListener('submit', this.submitMessageForm);
  }

  /**
   * Mark notification as read
   * @param {Event} event
   */
  markAsRead(event) {
    event.preventDefault();

    const notification = event.target.closest('.slider__item');
    actions.notifications.readNotification(notification.getAttribute('data-id'));
  }
}
