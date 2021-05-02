import {Component} from '../component';
import {actions} from 'actions/actions';
import {ChatBlock} from '../chatBlock/chatBlock';
import {validateInputs} from '../../utils/validateUtils';
import {usernameRegexp} from '../../consts/regexp';
import {userStore} from '../../stores/userStore/UserStore';
import {constants} from '../../consts/consts';
import {toastBox} from '../toast/toast';

import SliderTemplate from './slider.hbs';
import './slider.scss';


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
    this.showMessageForm = this.showMessageForm.bind(this);
    this.openChatBlock = this.openChatBlock.bind(this);
    this.closeMessageForm = this.closeMessageForm.bind(this);
    this.submitMessageForm = this.submitMessageForm.bind(this);
  }

  /**
   * Returns the html code for slider
   * @return {String} final html
   */
  render() {
    this._nestedComponents.set('_chatBlock', new ChatBlock({...this.props}));
    return this.tmpl({...this.props, chatBlock: this._nestedComponents.get('_chatBlock').render()});
  }

  /**
   * Toggle it
   * @param {Event} event
   */
  showMessageForm(event) {
    event.preventDefault();

    const messageButton = document.querySelector('.slider__message-button');

    if (messageButton.innerHTML === 'Send') {
      return;
    }

    messageButton.addEventListener('click', this.submitMessageForm);

    messageButton.classList.remove('slider__message-button_primary');
    messageButton.innerHTML = 'Send';

    document.querySelector('.message-form').classList.remove('message-form_hidden');
  }

  /**
   * Close it
   * @param {Event} event
   */
  closeMessageForm(event) {
    event.preventDefault();

    const messageButton = document.querySelector('.slider__message-button');
    messageButton.removeEventListener('click', this.submitMessageForm);
    messageButton.classList.add('slider__message-button_primary');
    messageButton.innerHTML = 'New message';

    document.querySelector('.message-form').classList.toggle('message-form_hidden');
  }

  /**
   * Send new message (can start new chat)
   * @param {Event} event
   */
  submitMessageForm(event) {
    event.preventDefault();

    const messageText = document.querySelector('.message-form__text-input').value.trim();
    const targetUsername = document.querySelector('.message-form__target-input').value.trim();

    const inputsValid = validateInputs(
        [targetUsername],
        ['.chat-username-errors'],
        [usernameRegexp],
    );

    if (!inputsValid) {
      return;
    }

    if (messageText && targetUsername) {
      actions.messages.sendMessage(messageText, targetUsername);
      this.closeMessageForm(event);
    }
  }

  /**
   * Did
   */
  didMount() {
    switch (userStore.getStatus()) {
      case constants.store.statuses.userStore.userNotFound:
        toastBox.addToast('User not found. Message wasn\'t send', true);
        actions.user.statusProcessed();
        break;
      case constants.store.statuses.userStore.messageSent:
        toastBox.addToast('Message sent');
        actions.user.statusProcessed();
        break;
      case constants.store.statuses.userStore.internalError:
        toastBox.addToast(constants.toastMessages.unknownError, true);
        actions.user.statusProcessed();
        break;
    }

    if (this.props.typeIsMessages) {
      document
          .querySelector('.slider__message-button')
          .addEventListener('click', this.showMessageForm);
      document
          .querySelector('.message-form__close-button')
          .addEventListener('click', this.closeMessageForm);
      document
          .querySelector('.message-form')
          .addEventListener('submit', this.submitMessageForm);

      document
          .querySelector('[name="MessagesSlider"]')
          .querySelectorAll('.slider__item')
          .forEach((chat) => chat.addEventListener('click', this.openChatBlock));
    } else {
      document
          .querySelector('[name="NotificationsSlider"]')
          .querySelectorAll('.slider__item').forEach((notification) => {
            notification.addEventListener('click', this.markNotificationRead);
          });
    }

    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    if (this.props.typeIsMessages) {
      document
          .querySelector('.slider__message-button')
          .removeEventListener('click', this.showMessageForm);
      document
          .querySelector('.message-form__close-button')
          .removeEventListener('click', this.closeMessageForm);
      document
          .querySelector('.message-form')
          .removeEventListener('submit', this.submitMessageForm);

      document
          .querySelector('[name="MessagesSlider"]')
          .querySelectorAll('.slider__item')
          .forEach((chat) => chat.removeEventListener('click', this.openChatBlock));
    } else {
      document
          .querySelector('[name="NotificationsSlider"]')
          .querySelectorAll('.slider__item').forEach((notification) => {
            notification.removeEventListener('click', this.markNotificationRead);
          });
    }

    super.willUnmount();
  }

  /**
   * Mark notification as read
   * @param {Event} event
   */
  markNotificationRead(event) {
    event.preventDefault();

    const notification = event.target.closest('.slider__item');
    actions.notifications.readNotification(notification.getAttribute('data-id'));
  }

  /**
   * Mark it
   * @param {Event} event
   */
  markChatRead(event) {
    event.preventDefault();

    const chat = event.target.closest('.slider__item');
    actions.chats.markAsRead(chat.getAttribute('data-id'));
  }

  /**
   * Open it
   * @param {Event} event
   */
  openChatBlock(event) {
    event.preventDefault();
    this.markChatRead(event);

    const chat = event.target.closest('.slider__item');

    document.querySelector('.slider__item_selected').classList.remove('slider__item_selected');
    chat.classList.add('slider__item_selected');

    this._nestedComponents.get('_chatBlock').setState({chatID: chat.getAttribute('data-id')});
    document.querySelector('.chat').style.display = 'flex';
  }
}
