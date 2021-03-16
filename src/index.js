import {Sidebar} from './components/sidebar/sidebar.js';

const application = document.getElementById('app');

const sidebar = new Sidebar({});

application.innerHTML = sidebar.render();
