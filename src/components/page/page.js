import {Navbar} from '../navbar/navbar';
import {Sidebar} from '../sidebar/sidebar';
import {Component} from '../component';
import {Slider} from '../slider/slider';
import {constants} from 'consts/consts';
import {userStore} from 'stores/userStore/UserStore';

import PageTemplate from './page.hbs';
import './page.scss';
import LogoImage from '../../assets/img/Logo.png';

/**
 * Base page component
 */
export class Page extends Component {
  /**
   * Constructs new page
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.tmpl = PageTemplate;

    this._nestedComponents.set('_pageNavbar', new Navbar(props));
    this._nestedComponents.set('_pageSidebar', new Sidebar(props));
    this._nestedComponents.set('_messagesSlider', new Slider({
      ...props,
      sliderType: 'Messages',
      typeIsMessages: true,
      items: constants.mocks.messages,
    }));

    this._nestedComponents.set('_notificationsSlider', new Slider({
      ...props,
      sliderType: 'Notifications',
      typeIsMessages: false,
      items: userStore.getNotifications() && userStore.getNotifications().map((notification) => ({
        ID: notification.ID,
        imageLink: LogoImage,
        header: notification.title,
        isNew: !notification.isRead,
        text: notification.text,
      })),
    }));
  }

  /**
   * Returns base page layout html
   * @return {String} final html
   */
  render() {
    return this.tmpl({
      ...this.props,
      page__navbar: this._nestedComponents.get('_pageNavbar').render(),
      page__sidebar: this._nestedComponents.get('_pageSidebar').render(),
      page__messagesSlider: this._nestedComponents.get('_messagesSlider').render(),
      page__notificationsSlider: this._nestedComponents.get('_notificationsSlider').render(),
    });
  }
}
