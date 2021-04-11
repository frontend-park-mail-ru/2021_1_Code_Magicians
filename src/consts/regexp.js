export const pathParamRegExp = /(:[^\/]+)(?:\/|$)/g;
export const regSubstr = '[^\\/]+';
export const urlRegexp = /https*:\/\/[-._a-zA-Z0-9:]+/;
export const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const usernameRegexp = /^[a-zA-Z0-9_]{2,42}$/;
export const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const firstNameRegexp = /[a-zA-Z ]{0,42}/;
