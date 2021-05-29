import { Page } from 'components/page/page';
import { pinsStore } from 'stores/pinsStore';
import { actions } from 'actions/actions';
import { profilesStore } from 'stores/profilesStore';
import { constants } from 'consts/consts';
import { userStore } from 'stores/userStore';
import { appRouter } from 'appManagers/router';
import { BoardControl } from 'components/boardControl/boardControl';
import { boardsStore } from 'stores/boardsStore';
import { ShareControl } from 'components/shareControl/shareControl';
import { FeedbackControl } from 'components/feedbackControl/feedbackControl';
import { View } from '../view.js';

import PinViewTemplate from './pinView.hbs';
import './pinView.scss';

/**
 * Build pin view
 */
export class PinView extends View {
  /**
   * Makes new pin view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.tmpl = PinViewTemplate;
    this.sendComment = this.sendComment.bind(this);
    this.follow = this.follow.bind(this);

    pinsStore.bind('change', this.refresh);
    boardsStore.bind('change', this.refresh);
    profilesStore.bind('change', this.refresh);
    boardsStore.bind('change', this.refresh);
  }

  /**
   * Returns pinBuilder view html
   * @return {String}
   */
  render() {
    const userIsAuthorized = userStore.getUser() && userStore.getUser().authorized();
    const selfProfile = userStore.getUser() && userStore.getUser().profile;

    const currentPin = pinsStore.getPinByID(this.props.pathArgs.pinID);
    const comments = pinsStore.getComments(this.props.pathArgs.pinID);
    const commentProfiles = comments && profilesStore.getProfiles(comments.map((comment) => comment.userID));
    this.profile = currentPin && profilesStore.getProfileByID(currentPin.userID);
    const pinIsSelfOwned = this.profile && selfProfile && this.profile.ID === selfProfile.ID;

    const templateComments = comments && commentProfiles && comments.map((comment, index) => ({
      comment,
      author: commentProfiles[index],
    }));
    const feedbackControl = new FeedbackControl({
      userIsAuthorized,
      currentPin,
    });
    const shareControl = new ShareControl({
      shareLink: window.location.href,
      shareTitle: currentPin ? currentPin.title : '',
      shareDescription: currentPin ? currentPin.description : '',
      shareImage: currentPin ? currentPin.imageLink : '',
    });
    const boardControl = new BoardControl(this.props);
    this._nestedComponents.set('_feedbackControl', feedbackControl);
    this._nestedComponents.set('_shareControl', shareControl);
    this._nestedComponents.set('_boardControl', boardControl);
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        ...this.props,
        profile: this.profile,
        userIsAuthorized,
        pinIsSelfOwned,
        pin: currentPin,
        comments: templateComments,
        feedbackControl: this._nestedComponents.get('_feedbackControl').render(),
        shareControl: this._nestedComponents.get('_shareControl').render(),
        boardControl: this._nestedComponents.get('_boardControl').render(),
        shareLink: window.location.href,
      }),
    }));

    return this._nestedComponents.get('page').render();
  }

  /**
   * Did
   */
  didMount() {
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
      commentForm.addEventListener('submit', this.sendComment);
    }

    const followButton = document.querySelector('.user-info__follow-button_active');
    if (followButton) {
      followButton.addEventListener('click', this.follow);
    }

    if (profilesStore.getStatus() === constants.store.statuses.profilesStore.followed) {
      actions.profiles.statusProcessed();
    }

    super.didMount();

    if (pinsStore.getStatus() === constants.store.statuses.pinsStore.pinNotFound) {
      appRouter.back();
    }
  }

  /**
   * Will
   */
  willUnmount() {
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
      commentForm.removeEventListener('submit', this.sendComment);
    }

    super.willUnmount();
  }

  /**
   * Send comment
   * @param {Event} event
   */
  sendComment(event) {
    event.preventDefault();

    const commentText = document.getElementById('comment-input').value.trim();
    if (commentText) {
      actions.comments.postComment(commentText, this.props.pathArgs.pinID);
    }
  }

  /**
   * Follow listener
   * @param {Event} event
   */
  follow(event) {
    event.preventDefault();

    actions.profiles.follow(this.profile.ID);
  }
}
