function createMixins (lib) {
  'use strict';

  return {
    Slider: require('./slidercreator')(lib)
  };
}
module.exports = createMixins;
