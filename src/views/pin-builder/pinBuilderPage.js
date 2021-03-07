import {addPageHeader} from '../page-header/pageHeader.js';
import {addColorSwitchCallback} from '../../modules/layoutUtils/colorChanger.js';

const maxBuildersPerPage = 10;
const app = document.getElementById('app');

/**
 * Adding one pin-builder instance
 * @param {object} context Context for hbs
 */
function addPinBuilder(context) {
  const template = Handlebars.templates['pinBuilder.hbs'];
  const html = template(context);
  const builder = document.createElement('div');
  builder.innerHTML = html;

  const switchMaker = addColorSwitchCallback(
      '--main-bg-color',
      '--dark-bg-color',
      'backgroundColor');

  switchMaker(builder.querySelector('.delete-duplicate-menu-button'));

  builder.querySelectorAll('textarea').forEach((field) => {
    addColorSwitchCallback(
        'rgb(6, 98, 189)',
        'rgb(60, 64, 65)',
        'borderBottomColor',
        'focus')(field);
  });
  document.querySelector('.pin-column').appendChild(builder);
}


/**
 * Adding button to increase pin-builders' number
 * @param {object} context context to new pin-builder
 */
function addPlusButton(context) {
  const plus = document.createElement('button');
  plus.innerText = '+';
  plus.className = 'plus-button';
  plus.addEventListener('click', () => {
    if (document.querySelectorAll('.pin-builder').length < maxBuildersPerPage) {
      addPinBuilder(context);
    }
  });
  addColorSwitchCallback('rgb(40, 42, 43)', '--dark-bg-color', 'backgroundColor')(plus);

  app.appendChild(plus);
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

  app.innerHTML = '';

  const main = document.createElement('div');
  main.className = 'main';
  const pinColumn = document.createElement('div');
  pinColumn.className = 'pin-column';
  main.appendChild(pinColumn);

  app.appendChild(main);

  addPageHeader(context);
  addPinBuilder(context);
  addPlusButton(context);
}

pinBuilderPage();
