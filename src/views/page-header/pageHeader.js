// eslint-disable-next-line require-jsdoc
function switchBgColor(elem, colorVarName1, colorVarName2) {
  const color1 = getComputedStyle(elem).getPropertyValue(colorVarName1).trim();
  const color2 = getComputedStyle(elem).getPropertyValue(colorVarName2).trim();

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
  const template = Handlebars.templates['pageHeader.hbs'];
  const html = template(context);

  const application = document.getElementById('app');
  application.innerHTML += html;

  application.querySelectorAll('.header-button')

      .forEach((btn) => {
        const switchColor = function() {
          switchBgColor(btn, '--main-bg-color', '--dark-bg-color');
        };
        btn.addEventListener('mouseover', switchColor);
        btn.addEventListener('mouseleave', switchColor);
      });
}
