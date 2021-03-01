import {addPageHeader} from '../../modules/page-header.js';
import {addPinBuilder, addPlusButton} from '../../modules/pin-builder.js';

/**
 * Rendering pin builder page
 */
export function pinBuilderPage() {
  const context = {
    user: {
      name: 'Nikita Ermilov',
      avatarURL: 'assets/img/default-avatar.png',
      boards: [
        'board1',
        'board2',
        'board3',
      ],
    },
  };

  addPageHeader(context);
  addPinBuilder(context);
  addPlusButton(context);
}

pinBuilderPage();
