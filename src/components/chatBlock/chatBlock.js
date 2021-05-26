import { Component } from '../component';
import { userStore } from '../../stores/userStore';
import { actions } from '../../actions/actions';

import ChatBlockTemplate from './chatBlock.hbs';
import './chatBlock.scss';
import { Profile } from '../../models/Profile';
import { emojis, stickers } from '../../consts/emoji';

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
    const chat = userStore.getChat();
    const profile = chat && new Profile(chat.targetProfile);

    const messages = chat && chat.messages.map((message) => {
      message.isSelf = message.authorID === (user && user.profile.ID);

      return message;
    });

    return this.tmpl({
      ...this.props,
      profile,
      messages,
    });
  }

  /**
   * Did
   */
  didMount() {
    const emojiPicker = document.querySelector(`.chat__emoji-picker`);
    emojiPicker.innerHTML = '';
    emojis.forEach((emoji) => {
      emojiPicker.innerHTML += `<div class="chat__emoji-picker_emoji">${emoji}</div>`;
    });

    const stickerPicker = document.querySelector(`.chat__sticker-picker`);
    stickerPicker.innerHTML = '';
    Object.entries(stickers).forEach((sticker) => {
      stickerPicker.innerHTML += `<img class="chat__sticker-picker_sticker" data-link="&&${sticker[1]}" src="/assets/img/stickers/${sticker[1]}" >`;
    });
    document.querySelector('.chat__emoji-picker').addEventListener('click', this.pickEmoji);
    document.querySelector('.chat__sticker-picker').addEventListener('click', this.pickSticker);

    document.querySelector('.chat__emoji-button').addEventListener('click', this.showEmojis);
    document.querySelector('.chat__sticker-button').addEventListener('click', this.showStickers);

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
    document.querySelector('.chat__emoji-picker').removeEventListener('click', this.pickEmoji);
    document.querySelector('.chat__sticker-picker').removeEventListener('click', this.pickSticker);

    document.querySelector('.chat__emoji-button').removeEventListener('click', this.showEmojis);
    document.querySelector('.chat__sticker-button').removeEventListener('click', this.showStickers);

    document
      .querySelector('.chat__send-button')
      .removeEventListener('click', this.submitMessageForm);
    document
      .querySelector('.chat__message-form')
      .removeEventListener('submit', this.submitMessageForm);
  }

  /**
   * Pick an emoji
   * @param {Event} event
   */
  pickEmoji(event) {
    event.preventDefault();
    if (event.target.className === 'chat__emoji-picker_emoji') {
      document.querySelector('.chat__message-input').value += event.target.innerHTML;
      document.querySelector('.chat__emoji-picker').style.visibility = 'hidden';
      document.querySelector('.chat__sticker-button').style.color = 'var(--gray)';
      document.querySelector('.chat__emoji-button').style.color = 'var(--gray)';
    }
  }

  /**
   * Pick a sticker
   * @param {Event} event
   */
  pickSticker(event) {
    event.preventDefault();
    if (event.target.className === 'chat__sticker-picker_sticker') {
      document.querySelector('.chat__message-input').value += event.target.dataset.link;
      document.querySelector('.chat__sticker-picker').style.visibility = 'hidden';
      document.querySelector('.chat__sticker-button').style.color = 'var(--gray)';
      document.querySelector('.chat__emoji-button').style.color = 'var(--gray)';
    }
  }

  /**
   * Pick a sticker
   * @param {Event} event
   */
  showEmojis(event) {
    event.preventDefault();

    const form = document.querySelector('.chat__emoji-picker');
    if (form.style.visibility === 'visible') {
      form.style.visibility = 'hidden';
      document.querySelector('.chat__emoji-button').style.color = 'var(--gray)';
    } else {
      form.style.visibility = 'visible';
      document.querySelector('.chat__emoji-button').style.color = 'var(--red)';
      document.querySelector('.chat__sticker-picker').style.visibility = 'hidden';
      document.querySelector('.chat__sticker-button').style.color = 'var(--gray)';
    }
  }

  /**
   * Pick a sticker
   * @param {Event} event
   */
  showStickers(event) {
    event.preventDefault();
    const form = document.querySelector('.chat__sticker-picker');
    if (form.style.visibility === 'visible') {
      form.style.visibility = 'hidden';
      document.querySelector('.chat__sticker-button').style.color = 'var(--gray)';
    } else {
      form.style.visibility = 'visible';
      document.querySelector('.chat__sticker-button').style.color = 'var(--red)';
      document.querySelector('.chat__emoji-picker').style.visibility = 'hidden';
      document.querySelector('.chat__emoji-button').style.color = 'var(--gray)';
    }
  }

  /**
   * Submit form
   * @param {Event} event
   */
  submitMessageForm(event) {
    event.preventDefault();

    const messageText = document.querySelector('.chat__message-input').value.trim();
    const chat = userStore.getChat();
    const targetUsername = chat && chat.targetProfile.username;

    if (messageText && targetUsername) {
      actions.messages.sendMessage(messageText, targetUsername);
    }
  }
}
