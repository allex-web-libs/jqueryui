

(function createSpeeedometerMixin (execlib) {
  'use strict';

  var lib = execlib.lib;

  execlib.execSuite.libRegistry.register('allex_jqueryuiweblib', require('./libcreator')(lib));
})(ALLEX);

