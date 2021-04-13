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
import {User} from 'models/user/User';
import {Profile} from 'models/profile/Profile';
import {actions} from 'actions/actions';
import {toastBox} from 'components/toast/toast';

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
    const user = userStore.getUser() || new User(new Profile(constants.mocks.defaultProfile));

    this._userIsAuthorized = user.authorized();
    this.props.userID = user.profile['ID'];
    this.props.profileID = this.props.pathArgs.profileID || 0;

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

    const user = userStore.getUser() || new User(new Profile(constants.mocks.defaultProfile));
    if (!user.authorized() &&
        Object.keys(this.props.pathArgs).length === 0) {
      appRouter.go(this.props.paths.home);
      return;
    }

    if (this.props.userID === Number(this.props.profileID)) {
      appRouter.go(this.props.paths.profile);
      return;
    }

    if (this.props.pathArgs.length !== 0) {
      switch (profilesStore.getStatus()) {
        case constants.store.statuses.profilesStore.profileNotFound:
          actions.profiles.statusProcessed();
          appRouter.go(this.props.paths.notFound);
          break;
        case constants.store.statuses.profilesStore.clientError:
        case constants.store.statuses.profilesStore.internalError:
          toastBox.addToast('Something went wrong. Please, try again or refresh the page');
          actions.profiles.statusProcessed();
          break;
      }
    }
  }
}
