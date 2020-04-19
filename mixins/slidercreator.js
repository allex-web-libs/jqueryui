function createSliderMixin (lib) {
  'use strict';

  function SliderMixin (options) {
    this.slidervalues = null;
  }
  SliderMixin.prototype.destroy = function () {
    this.slidervalues = null;
    if (this.$element) {
      this.$element.slider('destroy');
    }
  };
  SliderMixin.prototype.initializeSlider = function () {
    this.$element.slider(lib.extend({}, this.getConfigVal('slider'), {slide: onSlid.bind(this), create: onCreated.bind(this)}));
  };
  SliderMixin.prototype.initializeSliderValues = function (vals) {
    var configvals = this.getConfigVal('slider').values,
      configvalcount = lib.isArray(configvals) ? configvals.length : 1,
      i,
      val,
      valsforset;
    if (!lib.isVal(vals)) {
      //valsforset = defaultVals(this.$element, configvalcount);
      valsforset = this.defaultSliderValues(configvalcount);
    } else if (!lib.isArray(vals)) {
      valsforset = [vals];
    }else {
      valsforset = [];
      for(i=0; i<configvalcount; i++) {
        valsforset.push(vals[i] || 0);
      }
    }
    setValues.call(this, valsforset);
  };
  SliderMixin.prototype.defaultSliderValues = function (count) {
    if (count===1) {
      return [this.$element.slider('option', 'min')];
    }
    if (count===2) {
      return [this.$element.slider('option', 'min'), this.$element.slider('option', 'max')];
    }
  };

  //statics
  function onSlid (evnt, ui) {
    if (!(evnt && evnt.type==='slide')) {
      return;
    }
    setValues.call(this, ui.values || [ui.value]);
  }

  function onCreated (evnt, ui) {
    setValues.call(this, this.getConfigVal('slider').values);
  }

  function setValues (vals) {
    if (!this.$element) {
      return;
    }
    if (lib.isArray(vals)) {
      this.$element.slider('option', 'values', vals);
      if (this.getConfigVal('slider').annotate_handles) {
        this.$element.find('.ui-slider-handle').each(handleTexter.bind(this, vals));
      }
    } else {
      this.$element.slider('option', 'values', null);
      this.$element.slider('option', 'value', null);
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
  function defaultVals(elem, count) {
    if (count===1) {
      return [elem.slider('option', 'min')];
    }
    if (count===2) {
      return [elem.slider('option', 'min'), elem.slider('option', 'max')];
    }
  }
  //endof helpers

  SliderMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, SliderMixin
      ,'initializeSlider'
      ,'initializeSliderValues'
      ,'defaultSliderValues'
    );
    klass.prototype.postInitializationMethodNames = 
      klass.prototype.postInitializationMethodNames.concat('initializeSlider');
  };


  return SliderMixin;
}
module.exports = createSliderMixin;
