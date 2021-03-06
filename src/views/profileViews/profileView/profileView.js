import { Page } from 'components/page/page';
import { ProfileHeader } from 'components/profileHeader/profileHeader';
import { userStore } from 'stores/userStore';
import { appRouter } from 'appManagers/router';
import { constants } from 'consts/consts';
import { profilesStore } from 'stores/profilesStore';
import { boardsStore } from 'stores/boardsStore';
import { pinsStore } from 'stores/pinsStore';
import { actions } from 'actions/actions';
import { toastBox } from 'components/toast/toast';
import { View } from '../../view';

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

    this._profileMainContent = '<div class="profile-overview"></div>'; // different in different views

    this.baseTmpl = ProfileViewTemplate;

    profilesStore.bind('change', this.refresh);
    boardsStore.bind('change', this.refresh);
    pinsStore.bind('change', this.refresh);
  }

  /**
   * Rendering profile html
   * @return {String}
   */
  render() {
    const user = userStore.getUser();

    this._userIsAuthorized = user && user.authorized();
    this.props.userID = user && user.profile.ID;
    this.props.profileID = this.props.pathArgs.profileID || 0;

    this._nestedComponents.set('profileHeader', new ProfileHeader({ ...this.props }));
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

    const user = userStore.getUser();
    if ((!user || !user.authorized())
        && Object.keys(this.props.pathArgs).length === 0
        && userStore.getStatus() === constants.store.statuses.userStore.unauthorized) {
      this._active = false;
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
        toastBox.addToast(constants.toastMessages.unknownError);
        actions.profiles.statusProcessed();
        break;
      default:
        break;
      }
    }
  }
}
