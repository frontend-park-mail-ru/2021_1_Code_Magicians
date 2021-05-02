import {Component} from '../component';
import {userStore} from '../../stores/userStore/UserStore';
import {actions} from '../../actions/actions';

import ChatBlockTemplate from './chatBlock.hbs';
import './chatBlock.scss';

/**
 * Chat block. Later can be used in mobile
 */
export class ChatBlock extends Component {
  /**
   * Makes new chat block
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.tmpl = ChatBlockTemplate;
  }

  /**
   * Returns the html code for chatBlock
   * @return {String}
   */
  render() {
    const user = userStore.getUser();
    const chat = userStore.getChat(this._state.chatID);
    const messages = chat && chat.messages.map((message) => {
      message.isSelf = message.authorID === (user && user['ID']);

      return message;
    });

    return this.tmpl({
      ...this.props,
      profile: chat && chat.profile,
      messages: messages,
    });
  }

  /**
   * Did
   */
  didMount() {
    document
        .querySelector('.chat__send-button')
        .addEventListener('click', this.submitMessageForm);
    document
        .querySelector('.chat__message-form')
        .addEventListener('submit', this.submitMessageForm);
  }

  /**
   * Will
   */
  willUnmount() {
    document
        .querySelector('.chat__send-button')
        .removeEventListener('click', this.submitMessageForm);
    document
        .querySelector('.chat__message-form')
        .removeEventListener('submit', this.submitMessageForm);
  }

  /**
   * Submit form
   * @param {Event} event
   */
  submitMessageForm(event) {
    event.preventDefault();

    const messageText = event.target.closest('.chat__message-input').value.trim();
    const chat = userStore.getChat(this._state.chatID);
    const targetUsername = chat && chat['targetProfile'].username;

    if (messageText && targetUsername) {
      actions.messages.sendMessage(messageText, targetUsername);
    }
  }
}
