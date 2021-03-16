import {Page} from './components/page/page.js';

const application = document.getElementById('app');

const page = new Page({
  user: {
    username: 'Username Usernamov',
    avatarURL: 'assets/img/default-avatar.jpg',
  },
});

application.innerHTML = page.render();
