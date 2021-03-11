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
    text: 'Menu',
    open: menuPage,
  },
  signup: {
    href: '/signup',
    text: 'Sign up!',
    open: signupPage,
  },
  login: {
    href: '/login',
    text: 'Log in!',
    open: loginPage,
  },
  pinBuilder: {
    href: '/pin-builder',
    text: 'Create pin',
    open: pinBuilderPage,
  },
  profile: {
    href: '/profile',
    text: 'My profile',
    open: profilePage,
  },
  logout: {
    href: '/auth/logout',
    text: 'Log out',
    open: logOutPage,
  },
}

function profilePage() {
  application.innerHTML = '';
  const back = createBack();

  HttpModule.get({
      url: '/profile',
      callback: (status, response) => {
        if (status === 200) {
          let username = document.createElement('div');
          username.className = 'username';

          let user = JSON.parse(response);
          username.innerHTML = user.username;

          application.appendChild(username);
        }
      }
    }
  );

  application.appendChild(back);
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

  const titleInput = createInput('text', 'Title', 'title');
  const descriptionInput = createInput('text', 'description', 'description');
  const tagsInput = createInput('text', 'Tags divided by " "', 'tags');
  const boardNumberInput = createInput('text', 'board number', 'boardNumber');

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Create pin!';

  const back = createBack();

  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(tagsInput);
  form.appendChild(boardNumberInput);
  form.appendChild(submitBtn);
  form.appendChild(back);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const tags = tagsInput.value.trim().split(' ');
    const boardNumber = boardNumberInput.value.trim();
    const pinImage = 'testtset';

    HttpModule.post({
      url: '/pin',
      body: {title, description, tags, pinImage, boardNumber},
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

  HttpModule.get({
    url: '/auth/check',
    callback: (status, response) => {
      let authorized = status === 200;
      Object
          .entries(config)
          .map(([menuKey, {text, href}]) => {
            const menuItem = document.createElement('a');
            menuItem.href = href;
            menuItem.textContent = text;
            menuItem.dataset.section = menuKey;

            if (['pinBuilder', 'logout', 'profile'].indexOf(menuKey) !== -1) {
              if (!authorized) return document.createElement('div');
            }
            if (['signup', 'login'].indexOf(menuKey) !== -1) {
              if (authorized) return document.createElement('div');
            }

            return menuItem;
          })
          .forEach(element => application.appendChild(element))
      ;
    },
  });
}
function uint8ToString(buf) {
  let i, length, out = '';
  for (i = 0, length = buf.length; i < length; i += 1) {
    out += String.fromCharCode(buf[i]);
  }
  return out;
}
function signupPage() {
  application.innerHTML = '<h1>Регистрация!</h1>';

  const form = document.createElement('form');

  const usernameInput = createInput('text', 'Username', 'username');
  const emailInput = createInput('text', 'Емайл', 'email');
  const passwordInput = createInput('password', 'Пароль', 'password');
  const avatarImageInput = createInput('file', 'avatar', 'avatarImage');


  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.value = 'Зарегистрироваться!';

  const back = createBack();

  form.appendChild(usernameInput);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(avatarImageInput);
  form.appendChild(submitBtn);
  form.appendChild(back);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let avatar = '';

    let file = avatarImageInput.files[0];
    let reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function() {
      avatar = btoa(reader.result);
    };
    reader.onerror = function() {
      console.log('there are some problems');
    };



    HttpModule.post({
      url: '/auth/signup',
      body: {username, email, password, avatar},
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

  const usernameInput = createInput('text', 'username', 'username');
  const passwordInput = createInput('text', 'Пароль', 'password');

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
