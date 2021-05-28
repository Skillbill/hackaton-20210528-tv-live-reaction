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
    RED: 82, // R
    GREEN: 71, // G
    YELLOW: 89, // Y
    BLUE: 66 // B
  };
};

export const KEY_CODES = {
  ...getPlatformKeyCodes()
};
