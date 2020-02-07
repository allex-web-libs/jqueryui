(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


(function createSpeeedometerMixin (execlib) {
  'use strict';

  var lib = execlib.lib;

  execlib.execSuite.libRegistry.register('allex_jqueryuiweblib', require('./libcreator')(lib));
})(ALLEX);


},{"./libcreator":2}],2:[function(require,module,exports){
function createLib (lib) {
  'use strict';

  return {
    mixins: require('./mixins')(lib)
  };
}
module.exports = createLib;

},{"./mixins":3}],3:[function(require,module,exports){
function createMixins (lib) {
  'use strict';

  return {
    Slider: require('./slidercreator')(lib)
  };
}
module.exports = createMixins;

},{"./slidercreator":4}],4:[function(require,module,exports){
function createSliderMixin (lib) {
  'use strict';

  function SliderMixin (options) {
    this.slidervalues = null;
  }
  SliderMixin.prototype.destroy = function () {
    if (this.$element) {
      this.$element.slider('destroy');
    }
  };
  SliderMixin.prototype.initializeSlider = function () {
    this.$element.slider(lib.extend({}, this.getConfigVal('slider'), {slide: onSlid.bind(this), create: onCreated.bind(this)}));
  };
  SliderMixin.prototype.initiateSliderValues = function (vals) {
    var configvals = this.getConfigVal('slider').values,
      configvalcount = lib.isArray(configvals) ? configvals.length : 1,
      i,
      val,
      valsforset;
    if (!lib.isArray(vals)) {
      valsforset = defaultVals(this.$element.slider, configvalcount);
    } else {
      valsforset = [];
      for(i=0; i<configvalcount; i++) {
        valsforset.push(vals[i] || 0);
      }
    }
    setValues.call(this, vals);
  };

  //statics
  function onSlid (evnt, ui) {
    if (!(evnt && evnt.type==='slide')) {
      return;
    }
    setValues.call(this, ui.values);
  }

  function onCreated (evnt, ui) {
    setValues.call(this, this.getConfigVal('slider').values);
  }

  function setValues (vals) {
    if (!this.$element) {
      return;
    }
    if (this.getConfigVal('slider').annotate_handles) {
      this.$element.find('.ui-slider-handle').each(handleTexter.bind(this, vals));
    }
    this.set('slidervalues', vals);
    vals = null;
  }

  function handleTexter (values, index, handle) {
    var func = this.getConfigVal('slider').annotate_handles,
      val;
    val = values[index];
    if (lib.isFunction(func)) {
      val = func(val);
    }
    handle.innerText = val;
  }
  //endof statics
  
  //helpers

  SliderMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, SliderMixin
      ,'initializeSlider'
      ,'initiateSliderValues'
    );
    klass.prototype.postInitializationMethodNames = 
      klass.prototype.postInitializationMethodNames.concat('initializeSlider');
  };


  return SliderMixin;
}
module.exports = createSliderMixin;

},{}]},{},[1]);
