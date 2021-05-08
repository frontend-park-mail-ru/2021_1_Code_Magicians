export const pathParamRegExp = /(:[^/]+)(?:\/|$)/g;
export const regSubstr = '[^\\/]+';
export const urlRegexp = /https*:\/\/[-._a-zA-Z0-9:]+/;
export const usernameRegexp = /^[a-zA-Z0-9_]{2,42}$/;
export const passwordRegexp = /^\S.{8,30}$/;
export const descriptionRegexp = /^\S.{1,300}$/;
export const firstNameRegexp = /[a-zA-Z ]{0,42}/;
export const pathPropTypeRegexp = /({(.+)})/;
export const myEmailRegexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
