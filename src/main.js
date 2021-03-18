import {Page} from './components/page/page.js';

const application = document.getElementById('app');

const page = new Page({});

application.innerHTML = page.render();
