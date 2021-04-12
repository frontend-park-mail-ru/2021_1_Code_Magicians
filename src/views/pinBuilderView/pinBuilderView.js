import {View} from '../view.js';
import {Page} from '../../components/page/page.js';
import {userStore} from '../../stores/userStore/UserStore.js';

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

    const payload = {
      name: '',
      description: '',
      image: '',
      link: '',
    };

    this.setState(payload);
    this.submit = this.submit.bind(this);
    userStore.bind('change', this.refresh);
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
    const tmpl = Handlebars.templates['pinBuilderView.hbs'];

    //  this._nestedComponents.set('_settingsForm', pinBuilderForm);
    this._nestedComponents.set('page', new Page({
      ...this.props,
      page__content: tmpl({
        ...this.props,
        // settingsForm: this._nestedComponents.get('_settingsForm').render(),
      }),
    }));

    // this._nestedComponents.get('page').setState({view: 'settings'});
    return this._nestedComponents.get('page').render();
  }

  /**
   * Submit callback
   * @param {Event} event
   */
  submit(event) {
    event.preventDefault();

    // const userName = document.querySelector('[name="login-username"]').value.trim();
    // const userPassword = document.querySelector('[name="login-pass"]').value.trim();
    const name = document.querySelector('[name="name"]').value.trim();
    const description = document.querySelector('[name="description"]').value.trim();
    const pinImage = document.querySelector('[name="pin-image"]').value.trim();
    const link = document.querySelector('[name="link"]').value.trim();


    // add validation

    const payload = {
      name: name,
      description: description,
      image: pinImage,
      link: link,
    };

    this.setState(payload);
    // actions.user.login(userName, userPassword);
    // appRouter.go('/profile');
  }
}
