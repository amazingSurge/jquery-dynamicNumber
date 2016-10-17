import $ from 'jquery';
import DEFAULTS from './defaults';
import formaters from './formaters';
import getTime from './getTime';

if (!Date.now) {
  Date.now = () => {
    'use strict';
    return new Date().getTime();
  };
}

let vendors = ['webkit', 'moz'];

for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
  let vp = vendors[i];
  window.requestAnimationFrame = window[`${vp}RequestAnimationFrame`];
  window.cancelAnimationFrame = (window[`${vp}CancelAnimationFrame`] || window[`${vp}CancelRequestAnimationFrame`]);
}

if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
  || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
  let lastTime = 0;
  window.requestAnimationFrame = callback => {
    'use strict';

    var now = Date.now();
    var nextTime = Math.max(lastTime + 16, now);
    return setTimeout(() => {
        callback(lastTime = nextTime);
      },
      nextTime - now);
  };
  window.cancelAnimationFrame = clearTimeout;
}

const NAMESPACE = 'dynamicNumber';

class dynamicNumber {
  constructor(element, options = {}) {
    this.element = element;
    this.$element = $(element);

    this.options = $.extend(true, {}, DEFAULTS, options, this.$element.data());
    this.options.step = parseFloat(this.options.step, 10);

    this.first = this.$element.attr('aria-valuenow');
    this.first = this.first ? this.first : this.options.from;
    this.first = parseFloat(this.first, 10);

    this.now = this.first;
    this.to = parseFloat(this.options.to, 10);

    this._requestId = null;
    this.initialized = false;
    this._trigger('init');
    this.init();
  }

  init() {
    this.initialized = true;
    this._trigger('ready');
  }

  _trigger(eventType, ...params) {
    let data = [this].concat(params);
    //event
    this.$element.trigger(`${NAMESPACE}::${eventType}`, data);

    //callback
    eventType = eventType.replace(/\b\w+\b/g, word => {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    });

    let onFunction = `on${eventType}`;
    if (typeof this.options[onFunction] === 'function') {
      this.options[onFunction].apply(this, params);
    }
  }

  go(to) {
    this._clear();

    if (typeof to === 'undefined') {
      to = this.to;
    } else {
      to = parseFloat(to, 10);
    }

    let start = this.now;
    var startTime = getTime();

    let animation = (time) => {
      let distance = (time - startTime) / this.options.duration;
      let next = Math.abs(distance * (start - to));

      if (to > start) {
        next = start + next;
        if (next > to) {
          next = to;
        }
      } else {
        next = start - next;
        if (next < to) {
          next = to;
        }
      }

      this._update(next);

      if (next === to) {
        window.cancelAnimationFrame(this._requestId);
        this._requestId = null;
        if (this.now === this.to) {
          this._trigger('finish');
        }
      } else {
        this._requestId = window.requestAnimationFrame(animation);
      }
    };

    this._requestId = window.requestAnimationFrame(animation);
  }

  _update(n) {
    this.now = n;

    this.$element.attr('aria-valuenow', this.now);
    let formated = n;

    if (!isNaN(n)) {
      if (typeof this.options.format === 'function') {
        formated = this.options.format.apply(this, [n, this.options]);
      } else if (typeof this.options.format === 'string') {
        if (typeof formaters[this.options.format] !== 'undefined') {
          formated = formaters[this.options.format].apply(this, [n, this.options[this.options.format]]);
        } else if (typeof window[this.options.format] === 'function') {
          formated = window[this.options.format].apply(this, [n, this.options]);
        }
      }
    }

    this.$element.html(formated);
    this._trigger('update', n);
  }

  get() {
    return this.now;
  }

  start() {
    this._clear();
    this._trigger('start');
    this.go(this.to);
  }

  _clear() {
    if (this._requestId) {
      window.cancelAnimationFrame(this._requestId);
      this._requestId = null;
    }
  }

  reset() {
    this._clear();
    this._update(this.first);
    this._trigger('reset');
  }

  stop() {
    this._clear();
    this._trigger('stop');
  }

  finish() {
    this._clear();
    this._update(this.to);
    this._trigger('finish');
  }

  destroy() {
    this.$element.data(NAMESPACE, null);
    this._trigger('destroy');
  }

  static setDefaults(options) {
    $.extend(true, DEFAULTS, $.isPlainObject(options) && options);
  }
}

export default dynamicNumber;
