// eslint-disable-next-line require-jsdoc
export function switchColorFunc(elem, color1, color2, colorProp = 'color') {
  return () => {
    [color1, color2] = [color1, color2].map((colorName) => {
      if (colorName.startsWith('--')) { // that means it's a CSSVariable
        return getComputedStyle(elem).getPropertyValue(colorName).trim();
      } else {
        return colorName;
      }
    });

    switch (elem.style[colorProp]) {
      case color1:
        elem.style[colorProp] = color2;
        break;
      case color2:
        elem.style[colorProp] = color1;
        break;
      default:
        elem.style[colorProp] = color1;
    }
  };
}

/**
 * Adding header on the page
 * @param {string} color1
 * @param {string} color2
 * @param {string} colorProp
 * @param {string} event
 * @return {function} colorSwitchCallbackMaker
 */
export function addColorSwitchCallback(color1, color2, colorProp = 'color', event = 'hover') {
  return (elem) => {
    let ev1; let ev2;
    if (event === 'focus') {
      ev1 = 'focusin';
      ev2 = 'focusout';
    } else {
      ev1 = 'mouseover';
      ev2 = 'mouseleave';
    }

    elem.addEventListener(ev1, switchColorFunc(elem, color1, color2, colorProp));
    elem.addEventListener(ev2, switchColorFunc(elem, color1, color2, colorProp));
  };
}


