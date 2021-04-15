import {View} from '../view.js';
import {Page} from 'components/page/page';
import {userStore} from 'stores/userStore/UserStore';
import PinViewTemplate from './pinView.hbs';
import './pinView.scss';
import {pinsStore} from 'stores/pinsStore/pinsStore';
import {actions} from 'actions/actions';
import {profilesStore} from 'stores/profilesStore/profilesStore';
import {constants} from 'consts/consts';

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
    this.submit = this.submit.bind(this);
    userStore.bind('change', this.refresh);
    pinsStore.bind('change', this.refresh);
    profilesStore.bind('change', this.refresh);
  }

  /**
   * Did
   */
  didMount() {
    // if (userStore.getStatus() === constants.store.statuses.userStore.alreadyAuthorized) {
    //   appRouter.go('/');
    //   return '';
    // }

    document.querySelector('.comment-form').addEventListener('submit', this.submit);

    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.comment-form').removeEventListener('submit', this.submit);

    super.willUnmount();
  }

  /**
   * Returns pinBuilder view html
   * @return {String}
   */
  render() {
    const currentPin = pinsStore.getPinByID(this.props.pathArgs.pinID);
    const profile = currentPin ? profilesStore.getProfileByID(currentPin['userID']) : constants.mocks.defaultProfile;
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.tmpl({
        ...this.props,
        profile: profile,
        pin: currentPin,
        comments: pinsStore.getComments(this.props.pathArgs.pinID), // || constants.mocks.comments[0]
      }),
    }));
    return this._nestedComponents.get('page').render();
  }

  /**
   * Submit callback
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();
    const commentText = document.getElementById('comment-input').value;

    actions.comments.postComment(commentText, this.props.pathArgs.pinID);
  }
}
