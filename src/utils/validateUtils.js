import {
  pathParamRegExp,
  regSubstr,
  urlRegexp,
  myEmailRegexp,
  usernameRegexp,
  passwordRegexp,
  firstNameRegexp,
} from 'consts/regexp';

/**
   * Validate data with regExp
   * @param {string} data - payload data
   * @param {RegExp} expr - regexp
   * @return {string}
   */
export const validateInput = (data, expr) => {
  let error;
  switch (expr) {
    case pathParamRegExp:
      error = 'Wrong pathParamRegExp text';
      break;
    case regSubstr:
      error = 'Wrong regSubstr text';
      break;
    case urlRegexp:
      error = 'Wrong urlRegexp text';
      break;
    case myEmailRegexp:
      error = 'Invalid email (example user@pinterbest.com)';
      break;
    case usernameRegexp:
      error = 'Username must be 2-42 letters. a-Z, 0-9';
      break;
    case passwordRegexp:
      error = 'Password must be 8 to 30 letters long and contains numbers';
      break;
    case firstNameRegexp:
      error = 'Name invalid';
      break;
    default:
      error = 'No expression found';
  }

  const match = data.match(expr);
  if (!match || match[0] !== data) {
    return error;
  }

  return '';
};

/**
 * Are they?
 * @param {Array} values
 * @param {Array} errorFieldsSelectors
 * @param {Array} regExps
 * @return {Boolean}
 */
export const validateInputs = (values, errorFieldsSelectors, regExps) => {
  document.querySelectorAll('.errors').forEach((errorField) => errorField.innerHTML = '');

  return values.map((value, index) => {
    const error = validateInput(value, regExps[index]);
    document.querySelector(errorFieldsSelectors[index]).innerHTML = error;

    return error;
  }).every((error) => error === '');
};
