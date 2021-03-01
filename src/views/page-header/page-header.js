/**
 * Adding header on the page
 * @param {object} context Context for hbs
 */
export function addPageHeader(context) {
  const source = document.getElementById('page-header-template').innerHTML;
  const template = Handlebars.compile(source);
  const html = template(context);

  document.getElementById('app').innerHTML += html;
}
