function changeBgColor (elem, colorVarName) {
  const newColor = getComputedStyle(elem).getPropertyValue(colorVarName);
  elem.style.backgroundColor = newColor;
}

function switchBgColor(elem, colorVarName1, colorVarName2) {
  const color1 = getComputedStyle(elem).getPropertyValue(colorVarName1);
  const color2 = getComputedStyle(elem).getPropertyValue(colorVarName2);

  if (elem.style.backgroundColor === color1) {
    elem.style.backgroundColor = color2;
  } else {
    elem.style.backgroundColor = color1;
  }
}

/**
 * Adding header on the page
 * @param {object} context Context for hbs
 */
export function addPageHeader(context) {
  const source = document.getElementById('page-header-template').innerHTML;
  const template = Handlebars.compile(source);
  const html = template(context);

  const application = document.getElementById('app');
  application.innerHTML += html;

  application.querySelectorAll('.header-button')
      .forEach((btn) => {
        btn.addEventListener('mouseover', () => {
          changeBgColor(btn, '--main-bg-color');
        });
        btn.addEventListener('mouseleave', () => {
          changeBgColor(btn, '--dark-bg-color');
        });
      });
}
