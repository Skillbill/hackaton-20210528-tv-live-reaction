import {isTizen, isWebOs} from './platformCheck';

const getPlatformKeyCodes = () => {
  if (isTizen()) {
    return {
      RED: 403,
      GREEN: 404,
      YELLOW: 405,
      BLUE: 406
    };
  } else if (isWebOs()) {
    return {
      RED: 403,
      GREEN: 404,
      YELLOW: 405,
      BLUE: 406
    };
  }

  return {
    RED: 114, // r
    GREEN: 103, // g
    YELLOW: 121, // y
    BLUE: 98 // b
  };
};

export const KEY_CODES = {
  ...getPlatformKeyCodes()
};
