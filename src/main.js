import $ from 'jquery';
import dynamicNumber from './dynamicNumber';
import info from './info';

const NAMESPACE = 'dynamicNumber';
const OtherDynamicNumber = $.fn.dynamicNumber;

const jQueryDynamicNumber = function(options, ...args) {
  if (typeof options === 'string') {
    const method = options;

    if (/^_/.test(method)) {
      return false;
    } else if ((/^(get)/.test(method))) {
      const instance = this.first().data(NAMESPACE);
      if (instance && typeof instance[method] === 'function') {
        return instance[method](...args);
      }
    } else {
      return this.each(function() {
        const instance = $.data(this, NAMESPACE);
        if (instance && typeof instance[method] === 'function') {
          instance[method](...args);
        }
      });
    }
  }

  return this.each(function() {
    if (!$(this).data(NAMESPACE)) {
      $(this).data(NAMESPACE, new dynamicNumber(this, options));
    }
  });
};

$.fn.dynamicNumber = jQueryDynamicNumber;

$.dynamicNumber = $.extend({
  setDefaults: dynamicNumber.setDefaults,
  noConflict: function() {
    $.fn.dynamicNumber = OtherDynamicNumber;
    return jQueryDynamicNumber;
  }
}, info);
