import {ProfileView} from '../profileView/profileView.js';

const boards = [
  {
    id: 1,
    avatarLink: '/assets/img/boards/1.jpg',
    title: 'title1',
  },
  {
    id: 2,
    avatarLink: '/assets/img/boards/2.jpg',
    title: 'title2',
  },
  {
    id: 3,
    avatarLink: '/assets/img/boards/3.jpg',
    title: 'title3',
  },
  {
    id: 4,
    avatarLink: '/assets/img/boards/4.jpg',
    title: 'title4',
  },
  {
    id: 5,
    avatarLink: '/assets/img/boards/5.jpg',
    title: 'title5',
  },
  {
    id: 6,
    avatarLink: '/assets/img/boards/6.jpg',
    title: 'title6',
  },
];


/**
 * Base profile view
 */
export class ProfileBoardsView extends ProfileView {
  /**
   * Makes profile boards view
   * @param {Object} props
   */
  constructor(props = {}) {
    super(props);
  }

  /**
   * Rendering profile boards html
   * @return {String}
   */
  render() {
    const tmpl = Handlebars.templates['profileBoardsView.hbs'];
    this._profileMainContent = tmpl({
      ...this.props,
      boards: boards, // debugging purpose
    });

    return super.render();
  }

  /**
   * Did
   */
  didMount() {
    this
        ._parent
        .querySelectorAll('.profile-links__link')
        .forEach(link => {
          link.classList.remove('profile-links__link_active');
          if (link.innerHTML === 'Boards') link.classList.add('profile-links__link_active');
        });
  }

  /**
   * Will
   */
  willUnmount() {
    this
        ._parent
        .querySelectorAll('.profile-links__link')
        .forEach(link => {
          link.classList.remove('profile-links__link_active');
        });
  }
}
