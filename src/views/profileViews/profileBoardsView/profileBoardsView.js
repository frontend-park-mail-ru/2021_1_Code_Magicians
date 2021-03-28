import {ProfileView} from '../profileView/profileView.js';
import {constants} from '../../../consts/consts.js';

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
      board: {
        id: 42,
        avatarLink: constants.network.defaultAvatarLink,
        title: 'Illustrations',
      },
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
}
