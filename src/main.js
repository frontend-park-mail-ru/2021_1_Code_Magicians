import {addPageHeader} from './views/page-header/page-header.js';
import {addPinBuilder, addPlusButton} from './views/pin-builder/pin-builder.js';

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
