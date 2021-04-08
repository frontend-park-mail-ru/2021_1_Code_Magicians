import {Navbar} from '../navbar/navbar.js';
import {Sidebar} from '../sidebar/sidebar.js';
import {Component} from '../component.js';
import {Slider} from '../slider/slider.js';

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

    this._nestedComponents.set('_pageNavbar', new Navbar(props));
    this._nestedComponents.set('_pageSidebar', new Sidebar(props));
    this._nestedComponents.set('_messagesSlider', new Slider({
      ...props,
      sliderType: 'Messages',
      typeIsMessages: true,
      items: Array(10).fill(0).map((item, i) => ({
        imageLink: '/assets/img/Logo.png',
        header: 'Pinterbest',
        text: 'Welcome to Pinterbest! Welcome to Pinterbest Welcome to Pinterbest Welcome to Pinterbest',
        isNew: i % 2 === 0,
      })),
    }));
    this._nestedComponents.set('_notificationsSlider', new Slider({
      ...props,
      sliderType: 'Notifications',
      typeIsMessages: false,
      items: Array(5).fill(0).map((item, i) => ({
        imageLink: '/assets/img/Logo.png',
        header: 'Pinterbest',
        text: 'Welcome to Pinterbest! Welcome to Pinterbest Welcome to Pinterbest Welcome to Pinterbest',
        isNew: i % 2 !== 0,
      })),
    }));
  }

  /**
   * Returns base page layout html
   * @return {String} final html
   */
  render() {
    const tmpl = Handlebars.templates['page.hbs'];
    return tmpl({
      ...this.props,
      page__navbar: this._nestedComponents.get('_pageNavbar').render(),
      page__sidebar: this._nestedComponents.get('_pageSidebar').render(),
      page__messagesSlider: this._nestedComponents.get('_messagesSlider').render(),
      page__notificationsSlider: this._nestedComponents.get('_notificationsSlider').render(),
    });
  }
}
