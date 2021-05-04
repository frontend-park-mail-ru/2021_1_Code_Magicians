export const pathParamRegExp = /(:[^\/]+)(?:\/|$)/g;
export const regSubstr = '[^\\/]+';
export const urlRegexp = /https*:\/\/[-._a-zA-Z0-9:]+/;
export const usernameRegexp = /^[a-zA-Z0-9_]{2,42}$/;
export const passwordRegexp = /^\S.{8,30}$/;
export const descriptionRegexp = /^\S.{1,300}$/;
export const firstNameRegexp = /[a-zA-Z ]{0,42}/;
export const pathPropTypeRegexp = /({(.+)})/;
export const myEmailRegexp = /(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

