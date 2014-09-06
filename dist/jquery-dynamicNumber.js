/*! jQuery dynamicNumber - v0.1.0 - 2014-09-06
* https://github.com/amazingSurge/jquery-dynamicNumber
* Copyright (c) 2014 amazingSurge; Licensed GPL */
(function($, document, window, undefined) {
    "use strict";

    if (!Date.now){
        Date.now = function() { return new Date().getTime(); };
    }

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }

    function getTime(){
        if (window.performance.now) {
            return window.performance.now();
        } else {
            return Date.now();
        }
    }

    var pluginName = 'dynamicNumber';

    var Plugin = $[pluginName] = function(element, options) {
        this.element = element;
        this.$element = $(element);

        this.options = $.extend(true, {}, Plugin.defaults, options, this.$element.data());
        this.options.step = parseFloat(this.options.step, 10);

        this.first = this.$element.attr('aria-valuenow');
        this.first = this.first? this.first: this.options.from;
        this.first = parseFloat(this.first, 10);

        this.now = this.first;
        this.to = parseFloat(this.options.to, 10);

        this._requestId = null;
        this.initialized = false;
        this._trigger('init');
        this.init();
    };

    Plugin.defaults = {
        from: 0,
        to: 100,
        duration: 1000,
        decimals: 0,
        format: function(n, options) {
            return n.toFixed(options.decimals);
        },
        percentage: {
            decimals: 0
        },
        currency: {
            indicator: '$',
            size: 3,
            decimals: '2',
            separator: ',',
            decimalsPoint: '.'
        },
        group: {
            size: 3,
            decimals: '2',
            separator: ',',
            decimalsPoint: '.' 
        }
    };

    Plugin.formaters = {
        percentage: function(n, options){
            return n.toFixed(options.decimals) + '%';
        },
        currency: function(n, options){
            return options.indicator + Plugin.formaters.group(n, options);
        },
        group: function(n, options){
            var s = '', decimals = options.decimals;
            if(decimals){
                var k = Math.pow(10, decimals);
                s = '' + Math.round(n * k)/k;
            } else {
                s = '' + Math.round(n);
            }
            s = s.split('.');

            if(s[0].length > 3){
                var reg = new RegExp('\\B(?=(?:\\d{'+options.size+'})+(?!\\d))', 'g');
                s[0] = s[0].replace(reg, options.separator);
            }
            if((s[1] || '').length < decimals) {
                s[1] = s[1] || '';
                s[1] += new Array(decimals - s[1].length + 1).join('0');
            }
            return s.join(options.decimalsPoint);
        }
    };

    Plugin.prototype = {
        constructor: Plugin,
        init: function() {
            this.initialized = true;
            this._trigger('ready');
        },
        _trigger: function(eventType) {
            var method_arguments = Array.prototype.slice.call(arguments, 1),
                data = method_arguments.concat([this]);

            // event
            this.$element.trigger(pluginName + '::' + eventType, data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function(word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;
            if (typeof this.options[onFunction] === 'function') {
                this.options[onFunction].apply(this, method_arguments);
            }
        },
        go: function(to) {
            var self = this;
            this._clear();

            if (typeof to === 'undefined') {
                to = this.to;
            } else {
                to = parseFloat(to, 10);
            }

            var start = self.now;
            var startTime = getTime();

            var animation = function(time){
                var distance = (time - startTime)/self.options.duration;
                var next = Math.abs(distance * (start - to));

                if(to > start){
                    next = start + next;
                    if(next > to){
                        next = to;
                    }
                } else{
                    next = start - next;
                    if(next < to){
                        next = to;
                    }
                }

                self._update(next);
                if (next === to) {
                    window.cancelAnimationFrame(self._requestId);
                    self._requestId = null;

                    if (self.now === self.to) {
                        self._trigger('finish');
                    }
                } else {
                    self._requestId =  window.requestAnimationFrame(animation);
                }
            };

            self._requestId =  window.requestAnimationFrame(animation);
        },
        _update: function(n) {
            this.now = n;

            this.$element.attr('aria-valuenow', this.now);
            
            var formated = n;

            if(!isNaN(n)){ 
                if (typeof this.options.format === 'function') {
                    formated = this.options.format.apply(this, [n, this.options]);
                } else if(typeof this.options.format === 'string'){
                    if(typeof Plugin.formaters[this.options.format] !== 'undefined'){
                        formated = Plugin.formaters[this.options.format].apply(this, [n, this.options[this.options.format]]);
                    } else if(typeof window[this.options.format] === 'function') {
                        formated = window[this.options.format].apply(this, [n, this.options]);
                    }
                }
            }

            this.$element.html(formated);

            this._trigger('update', n);
        },
        get: function() {
            return this.now;
        },
        start: function() {
            this._clear();
            this._trigger('start');
            this.go(this.to);
        },
        _clear: function() {
            if (this._requestId) {
                window.cancelAnimationFrame(this._requestId);
                this._requestId = null;
            }
        },
        reset: function() {
            this._clear();
            this._update(this.first);
            this._trigger('reset');
        },
        stop: function() {
            this._clear();
            this._trigger('stop');
        },
        finish: function() {
            this._clear();
            this._update(this.to);
            this._trigger('finish');
        },
        destory: function() {
            this.$element.data(pluginName, null);
            this._trigger('destory');
        }
    };

    $.fn[pluginName] = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = Array.prototype.slice.call(arguments, 1);

            if (/^\_/.test(method)) {
                return false;
            } else if ((/^(get)$/.test(method))) {
                var api = this.first().data(pluginName);
                if (api && typeof api[method] === 'function') {
                    return api[method].apply(api, method_arguments);
                }
            } else {
                return this.each(function() {
                    var api = $.data(this, pluginName);
                    if (api && typeof api[method] === 'function') {
                        api[method].apply(api, method_arguments);
                    }
                });
            }
        } else {
            return this.each(function() {
                if (!$.data(this, pluginName)) {
                    $.data(this, pluginName, new Plugin(this, options));
                }
            });
        }
    };
})(jQuery, document, window);