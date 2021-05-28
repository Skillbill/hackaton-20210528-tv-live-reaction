export const isTizen = () => navigator && navigator.userAgent.indexOf('Tizen') > -1;
export const isWebOs = () => navigator && navigator.userAgent.indexOf('Web0S') > -1;
export const isBrowser = () => !isTizen() && !isWebOs();
