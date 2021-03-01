/**
 * Adding one pin-builder instance
 * @param {object} context Context for hbs
 */
export function addPinBuilder(context) {
  const source = document.getElementById('pin-builder-template').innerHTML;
  const template = Handlebars.compile(source);
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
  plus.addEventListener('click', () => addPinBuilder(context));

  document
      .getElementById('app')
      .appendChild(plus)
  ;
}
