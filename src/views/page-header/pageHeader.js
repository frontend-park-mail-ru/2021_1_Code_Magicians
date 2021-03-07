import {addColorSwitchCallback} from '../../modules/layoutUtils/colorChanger.js';

/**
 * Adding header on the page
 * @param {object} context Context for hbs
 */
export function addPageHeader(context) {
  const template = Handlebars.templates['pageHeader.hbs'];
  const html = template(context);

  const app = document.getElementById('app');
  app.innerHTML += html;

  app.querySelectorAll('.header-button')
      .forEach(addColorSwitchCallback(
          '--main-bg-color',
          '--dark-bg-color',
          'backgroundColor'));
  const searchBar = app.querySelector('.page-header__search-bar');
  addColorSwitchCallback(
      'rgb(44, 47, 48)',
      '--main-bg-color',
      'backgroundColor')(searchBar);
}
