let getTime = () => {
  'use strict';
  if (window.performance.now) {
    return window.performance.now();
  }
  return Date.now();
};

export default getTime;
