import {View} from '../../view';
import {Page} from 'components/page/page';
import {ProfileHeader} from 'components/profileHeader/profileHeader';
import {userStore} from 'stores/userStore/UserStore';
import {appRouter} from 'appManagers/router';
import {constants} from 'consts/consts';
import {profilesStore} from 'stores/profilesStore/profilesStore';
import {boardsStore} from 'stores/boardsStore/boardsStore';
import {pinsStore} from 'stores/pinsStore/pinsStore';

import ProfileViewTemplate from './profileView.hbs';
import './profileView.scss';

/**
 * Base profile view
 */
export class ProfileView extends View {
  /**
   * Makes base profile view's layout
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this._profileMainContent = ''; // different in different views

    this.baseTmpl = ProfileViewTemplate;

    userStore.bind('change', this.refresh);
    profilesStore.bind('change', this.refresh);
    boardsStore.bind('change', this.refresh);
    pinsStore.bind('change', this.refresh);
  }

  /**
   * Rendering profile html
   * @return {String}
   */
  render() {
    this._userIsAuthorized = userStore.getUser().authorized();
    this.props.userID = userStore.getUser().profile['ID'];
    this.props.profileID = this.props.pathArgs.profileID || 0;

    if ((!this._userIsAuthorized &&
      Object.keys(this.props.pathArgs).length === 0) ||
      this.props.userID === this.props.profileID) {
      return '';
    }

    this._nestedComponents.set('profileHeader', new ProfileHeader({...this.props}));
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: this.baseTmpl({
        profileHeader: this._nestedComponents.get('profileHeader').render(),
        profileContent: this._profileMainContent,
      }),
    }));

    return this._nestedComponents.get('page').render();
  }

  /**
   * Did.
   */
  didMount() {
    super.didMount();
    if (!userStore.getUser().authorized() &&
        Object.keys(this.props.pathArgs).length === 0 &&
        userStore.getStatus() === constants.store.statuses.userStore.unauthorized) {
      appRouter.go('/');
    }

    if (this.props.userID === Number(this.props.profileID)) {
      appRouter.go('/profile');
    }
  }
}
