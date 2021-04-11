import {View} from '../view.js';
import {Page} from '../../components/page/page.js';

/**
 * Build pin view
 */
export class PinBuilderView extends View {
  /**
   * Makes new pin building view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props, document.getElementById('app'));

    this.submit = this.submit.bind(this);
    // userStore.bind('submit', this.refresh);
  }

  /**
   * Did
   */
  didMount() {
    // if (userStore.getStatus() === constants.store.statuses.userStore.alreadyAuthorized) {
    //   appRouter.go('/');
    //   return '';
    // }

    document.querySelector('.pin-builder-form').addEventListener('submit', this.submit);

    super.didMount();
  }

  /**
   * Will
   */
  willUnmount() {
    document.querySelector('.pin-builder-form').removeEventListener('submit', this.submit);

    super.willUnmount();
  }

  /**
   * Returns pinBuilder view html
   * @return {String}
   */
  render() {
    // if (!userStore.getUser().authorized()) {
    // if (!userStore.getUser().authorized()) {
    //   appRouter.go('/');
    //   return '';
    // }

    const tmpl = Handlebars.templates['pinBuilderView.hbs'];

    // let pinBuilderForm;
    // switch (this.props.pathArgs['section']) {
    //   case 'profile':
    //     pinBuilderForm = new ProfileChanges(this.props);
    //     break;
    //   case 'notifications':
    //     pinBuilderForm = new NotificationSettings(this.props);
    //     break;
    //   case 'security':
    //     pinBuilderForm = new SecuritySettings(this.props);
    //     break;
    //   default:
    //     pinBuilderForm = new ProfileChanges(this.props);
    // }

    //  this._nestedComponents.set('_settingsForm', pinBuilderForm);
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: tmpl({
        ...this.props,
        // setltingsForm: this._nestedComponents.get('_settingsForm').render(),
      }),
    }));

    // this._nestedComponents.get('page').setState({view: 'settings'});
    return this._nestedComponents.get('page').render();
  }

  /**
   * Process section settings links
   */
  // processSections() {
  //   this
  //       ._parent
  //       .querySelectorAll('.settings__section-link')
  //       .forEach((link) => {
  //         if (window.location.pathname === '/settings') {
  //           if (link.href.replace(urlRegexp, '') === '/settings/profile') {
  //             link.classList.add('settings__section-link_active');
  //           }
  //         } else if (link.href.replace(urlRegexp, '').startsWith(window.location.pathname)) {
  //           link.classList.add('settings__section-link_active');
  //         }
  //       });
  // }

  /**
   * Submit callback
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();

    // const userName = document.querySelector('[name="login-username"]').value.trim();
    // const userPassword = document.querySelector('[name="login-pass"]').value.trim();
    //
    // AuthView.clearInputs('.errors');
    //
    // const errors = [];
    // errors.push(validateInput(userName, usernameRegexp));
    // document.querySelector('.name-errors').innerHTML = errors[0];
    // errors.push(validateInput(userPassword, passwordRegexp));
    // document.querySelector('.password-errors').innerHTML = errors[1];
    //
    // if ([...errors].find((el) => el !== '')) return;
    //
    // const payload = {
    //   name: userName,
    //   password: userPassword,
    // };
    //
    // this.setState(payload);
    // actions.user.login(userName, userPassword);
    // appRouter.go('/profile');
  }
}
