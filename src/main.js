import {createBack} from './utils/back.js';
import {
  RENDER_MAP,
  BoardComponent
} from './components/Board/Board.js';
const HttpModule = window.HttpModule;

const application = document.getElementById('app');

const config = {
  menu: {
    href: '/menu',
    text: 'Меню!',
    open: menuPage,
  },
  signup: {
    href: '/signup',
    text: 'Зарегистрироваться!',
    open: signupPage,
  },
  login: {
    href: '/login',
    text: 'Авторизоваться!',
    open: loginPage,
  },
  pinBuilder: {
    href: '/pin-builder',
    text: 'Create pin',
    open: pinBuilderPage,
  },
  logout: {
    href: '/auth/logout',
    text: 'Log out',
    open: logOutPage,
  }
}

function logOutPage() {
  HttpModule.post({
    url: '/auth/logout',
    callback: (status, response) => {
      if (status === 200) {
        alert('logged out successfully');
        menuPage();
      } else {
        const {error} = JSON.parse(response);
        alert(error);
      }
    },
  });
}

function pinBuilderPage() {
  application.innerHTML = '<h1>Pin builder</h1>';

  const form = document.createElement('form');

  const titleInput = createInput('title', 'Title', 'title');
  const descriptionInput = createInput('description', 'description', 'description');
  const tagsInput = createInput('tags', 'Tags divided by " "', 'tags');

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Create pin!';

  const back = createBack();

  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(tagsInput);
  form.appendChild(submitBtn);
  form.appendChild(back);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const tags = tagsInput.value.trim().split(' ');
    const avatarImage = 'testtset';

    HttpModule.post({
      url: '/pin',
      body: {title, description, tags, avatarImage},
      callback: (status, response) => {
        if (status === 201) {
          menuPage();
        } else {
          const {error} = JSON.parse(response);
          alert(error);
        }
      },
    });
  });

  application.appendChild(form);
}

function createInput(type, text, name) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = text;

  return input;
}

function menuPage() {
  application.innerHTML = '';

  let authorized;
  HttpModule.get({
    url: '/auth/check',
    callback: (status, response) => authorized = status === 200,
  });

  Object
      .entries(config)
      .map(([menuKey, {text, href}]) => {
        const menuItem = document.createElement('a');
        menuItem.href = href;
        menuItem.textContent = text;
        menuItem.dataset.section = menuKey;

        if (['pinBuilder', 'logout'].indexOf(menuKey) !== -1) {
          if (!authorized) return null;
        }
        if (menuKey === 'signup') {
          if (authorized) return null;
        }

        return menuItem;
      })
      .forEach(element => application.appendChild(element))
  ;
}

function signupPage() {
  application.innerHTML = '<h1>Регистрация!</h1>';

  const form = document.createElement('form');

  const usernameInput = createInput('username', 'Username', 'username');
  const emailInput = createInput('email', 'Емайл', 'email');
  const passwordInput = createInput('password', 'Пароль', 'password');

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Зарегистрироваться!';

  const back = createBack();

  form.appendChild(usernameInput);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitBtn);
  form.appendChild(back);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    HttpModule.post({
      url: '/auth/signup',
      body: {username, email, password},
      callback: (status, response) => {
        if (status === 201) {
          menuPage();
        } else {
          const {error} = JSON.parse(response);
          alert(error);
        }
      },
    });
  });

  application.appendChild(form);
}

function loginPage() {
  application.innerHTML = '';
  const form = document.createElement('form');

  const usernameInput = createInput('username', 'username', 'username');
  const passwordInput = createInput('password', 'Пароль', 'password');

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Авторизироваться!';

  const back = createBack();

  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.appendChild(submitBtn);
  form.appendChild(back);


  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    HttpModule.post({
      url: '/auth/login',
      body: {username, password},
      callback: (status, response) => {
        if (status === 200) {
          menuPage();
        } else {
          const {error} = JSON.parse(response);
          alert(error);
        }
      },
    });
  });

  application.appendChild(form);
}

menuPage();

application.addEventListener('click', e => {
  const {target} = e;

  if (target instanceof HTMLAnchorElement) {
    e.preventDefault();
    config[target.dataset.section].open();
  }
});
