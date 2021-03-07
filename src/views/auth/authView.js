import {addColorSwitchCallback} from '../../modules/layoutUtils/colorChanger.js';
import {pinBuilderPage} from '../pin-builder/pinBuilderPage.js';

const app = document.getElementById('app');


/**
 * Rendering auth view
 * @param {string} action current action (signin or signup)
 */
function authView(action = 'signin') {
  const signinLayer = document.createElement('div');
  signinLayer.className = 'signinLayer';
  app.appendChild(signinLayer);

  const template = Handlebars.templates['baseAuth.hbs'];
  const html = template({});
  let authWindow = document.createElement('div');
  authWindow.className = 'auth-window';
  authWindow.innerHTML = html;

  authWindow
      .querySelector('.auth-form__signup-link')
      .addEventListener('click', (ev) => {
        ev.preventDefault();
        app.removeChild(app.querySelector('.auth-window'));
        app.removeChild(app.querySelector('.signinLayer'));

        authView('signup');
      });

  if (action === 'signup') {
    authWindow = modifyToSignup(authWindow);
  }

  app.appendChild(signinLayer);
  app.appendChild(authWindow);

  const btn = app.querySelector('.auth-window__close-button');
  addColorSwitchCallback(
      '--main-bg-color',
      '--dark-bg-color',
      'backgroundColor')(btn);
  btn.addEventListener('click', () => {
    app.removeChild(app.querySelector('.auth-window'));
    app.removeChild(app.querySelector('.signinLayer'));
  });
}


/**
 * Modifying signin window to signup
 * @param {HTMLElement} authWindow element to modify
 * @return {HTMLElement} modified element
 */
function modifyToSignup(authWindow) {
  authWindow
      .querySelector('.auth-form')
      .removeChild(authWindow.querySelector('.auth-form__recover-link'));

  authWindow
      .querySelector('.auth-form__password')
      .setAttribute('placeholder', 'Create a password');

  authWindow
      .querySelector('.auth-form__log-in-button')
      .setAttribute('value', 'Continue');

  authWindow.querySelector('.auth-form__signup-link').innerHTML = 'Already have an account? Log in';

  const passwordConfirmation = document.createElement('input');
  passwordConfirmation.type = 'text';
  passwordConfirmation.className = 'auth-form__password-confirmation';
  passwordConfirmation.placeholder = 'Confirm your password';

  authWindow.querySelector('.auth-form__password').after(passwordConfirmation);


  authWindow
      .querySelector('.auth-form__signup-link')
      .addEventListener('click', (ev) => {
        ev.preventDefault();
        app.removeChild(app.querySelector('.auth-window'));
        app.removeChild(app.querySelector('.signinLayer'));

        authView('signin');
      });

  return authWindow;
}

pinBuilderPage();
authView('signup');
// authView();
