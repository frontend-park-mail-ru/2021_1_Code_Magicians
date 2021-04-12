import {
  pathParamRegExp,
  regSubstr,
  urlRegexp,
  emailRegexp,
  usernameRegexp,
  passwordRegexp,
  firstNameRegexp,
} from '../consts/regexp';

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
    case emailRegexp:
      error = 'Invalid email (example user@pinterbest.com)';
      break;
    case usernameRegexp:
      error = 'Username must be 2-42 letters. a-Z, 0-9';
      break;
    case passwordRegexp:
      error = 'Password must be 8 to 30 letters long and contains numbers';
      break;
    case firstNameRegexp:
      error = 'Wrong urlRegexp text';
      break;
    default:
      error = 'No expression found';
  }
  if (!data.match(expr)) {
    return error;
  }
  return '';
};
