import {PinBuilderView} from './views/pinBuilderView/pinBuilderView.js';

const props = {
  user: {
    avatarURL: 'assets/img/default-avatar.png',
    isAuthorized: false,
  },
};

const application = document.getElementById('app');

const view = new PinBuilderView(props, application);

view.show();
