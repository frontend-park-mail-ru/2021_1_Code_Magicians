import {addPageHeader} from '../page-header/pageHeader.js';

const maxBuildersPerPage = 10;
const application = document.getElementById('app');

/**
 * Adding one pin-builder instance
 * @param {object} context Context for hbs
 */
export function addPinBuilder(context) {
  const template = Handlebars.templates['pinBuilder.hbs'];
  const html = template(context);
  document.querySelector('.pin-column').innerHTML += html;
}


/**
 * Adding button to increase pin-builders' number
 * @param {object} context context to new pin-builder
 */
export function addPlusButton(context) {
  const plus = document.createElement('button');
  plus.innerText = '+';
  plus.className = 'plus-button';
  plus.addEventListener('click', () => {
    if (document.querySelectorAll('.pin-builder').length < maxBuildersPerPage) {
      addPinBuilder(context);
    }
  });

  application.appendChild(plus);
}


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

  application.innerHTML = '';

  const main = document.createElement('div');
  main.className = 'main';
  const pinColumn = document.createElement('div');
  pinColumn.className = 'pin-column';
  main.appendChild(pinColumn);

  application.appendChild(main);

  addPageHeader(context);
  addPinBuilder(context);
  addPlusButton(context);
}

pinBuilderPage();
