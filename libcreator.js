function createLib (lib) {
  'use strict';

  return {
    mixins: require('./mixins')(lib)
  };
}
module.exports = createLib;
