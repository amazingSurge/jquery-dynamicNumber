# [jQuery dynamicNumber](https://github.com/amazingSurge/jquery-dynamicNumber) ![bower][bower-image] [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![prs-welcome]](#contributing)

> A jQuery plugin that animate the number dynamically.

## Table of contents
- [Main files](#main-files)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [Usage](#usage)
- [Examples](#examples)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Development](#development)
- [Changelog](#changelog)
- [Copyright and license](#copyright-and-license)

## Main files
```
dist/
├── jquery-dynamicNumber.js
├── jquery-dynamicNumber.es.js
└── jquery-dynamicNumber.min.js
```

## Quick start
Several quick start options are available:
#### Download the latest build

 * [Development](https://raw.githubusercontent.com/amazingSurge/jquery-dynamicNumber/master/dist/jquery-dynamicNumber.js) - unminified
 * [Production](https://raw.githubusercontent.com/amazingSurge/jquery-dynamicNumber/master/dist/jquery-dynamicNumber.min.js) - minified

#### Install From Bower
```sh
bower install jquery-dynamicNumber --save
```

#### Install From Npm
```sh
npm install jquery-dynamicNumber --save
```

#### Install From Yarn
```sh
yarn add jquery-dynamicNumber
```

#### Build From Source
If you want build from source:

```sh
git clone git@github.com:amazingSurge/jquery-dynamicNumber.git
cd jquery-dynamicNumber
npm install
npm install -g gulp-cli babel-cli
gulp build
```

Done!

## Requirements
`jquery-dynamicNumber` requires the latest version of [`jQuery`](https://jquery.com/download/).

## Usage
#### Including files:

```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery-dynamicNumber.js"></script>
```

#### Required HTML structure

```html
<span class="dynamicNumber" data-from="0" data-to="30">0</span>
<span class="dynamicNumber" data-from="0" data-to="30" data-decimals="2">0</span>
<span class="dynamicNumber" data-from="0" data-to="30" data-currency='{"indicator": "$"}' data-format="currency">$0</span>
<span class="dynamicNumber" data-from="0.00" data-to="10000.00" data-decimals="0" data-format="group">0</span>
<span class="dynamicNumber" data-from="0" data-to="30" data-format="percentage">0%</span>
<span class="dynamicNumber" data-from="0" data-to="30" data-format="custom_callback">%0</span>
```

#### Initialization
All you need to do is call the plugin on the element:

```javascript
jQuery(function($) {
  $('.example').dynamicNumber(); 
});
```

## Examples
There are some example usages that you can look at to get started. They can be found in the
[examples folder](https://github.com/amazingSurge/jquery-dynamicNumber/tree/master/examples).

## Options
`jquery-dynamicNumber` can accept an options object to alter the way it behaves. You can see the default options by call `$.dynamicNumber.setDefaults()`. The structure of an options object is as follows:

```
{
  namespace: '',
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
}
```

## Methods
Methods are called on dynamicNumber instances through the dynamicNumber method itself.
You can also save the instances to variable for further use.

```javascript
// call directly
$().dynamicNumber('start');

// or
var api = $().data('dynamicNumber');
api.start();
```

#### start()
Start the number animate.
```javascript
$().dynamicNumber('start');
```

#### finish()
Finish the number animate, and change the number to the goal.
```javascript
$().dynamicNumber('finish');
```

#### stop()
Stop the number animate.
```javascript
$().dynamicNumber('stop');
```

#### reset()
Reset the number to the first value.
```javascript
$().dynamicNumber('reset');
```

#### get()
Get the current number.
```javascript
$().dynamicNumber('get');
```

#### go(value)
Go to the number.
```javascript
$().dynamicNumber('go', value);
```

#### enable()
Enable the number animate functions.
```javascript
$().dynamicNumber('enable');
```

#### disable()
Disable the number animate functions.
```javascript
$().dynamicNumber('disable');
```

#### destroy()
Destroy the dynamic number instance.
```javascript
$().dynamicNumber('destroy');
```

## Events
`jquery-dynamicNumber` provides custom events for the plugin’s unique actions. 

```javascript
$('.the-element').on('dynamicNumber::ready', function (e) {
  // on instance ready
});

```

Event   | Description
------- | -----------
init    | Fires when the instance is setup for the first time.
ready   | Fires when the instance is ready for API use.
update  | Fires when the number value updated.
start   | Fires when the `start` instance method has been called.
stop    | Fires when the `stop` instance method has been called.
reset   | Fires when the `reset` instance method has been called.
finish  | Fires when the `finish` instance method has been called.
enable  | Fires when the `enable` instance method has been called.
disable | Fires when the `disable` instance method has been called.
destroy | Fires when an instance is destroyed. 

## No conflict
If you have to use other plugin with the same namespace, just call the `$.dynamicNumber.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="jquery-dynamicNumber.js"></script>
<script>
  $.dynamicNumber.noConflict();
  // Code that uses other plugin's "$().dynamicNumber" can follow here.
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | 9-11 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `jquery-dynamicNumber` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Development
`jquery-dynamicNumber` is built modularly and uses Gulp as a build system to build its distributable files. To install the necessary dependencies for the build system, please run:

```sh
npm install -g gulp
npm install -g babel-cli
npm install
```

Then you can generate new distributable files from the sources, using:
```
gulp build
```

More gulp tasks can be found [here](CONTRIBUTING.md#available-tasks).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/jquery-dynamicNumber/releases).

## Copyright and license
Copyright (C) 2016 amazingSurge.

Licensed under [the LGPL license](LICENSE).

[⬆ back to top](#table-of-contents)

[bower-image]: https://img.shields.io/bower/v/jquery-dynamicNumber.svg?style=flat
[bower-link]: https://david-dm.org/amazingSurge/jquery-dynamicNumber/dev-status.svg
[npm-image]: https://badge.fury.io/js/jquery-dynamicNumber.svg?style=flat
[npm-url]: https://npmjs.org/package/jquery-dynamicNumber
[license]: https://img.shields.io/npm/l/jquery-dynamicNumber.svg?style=flat
[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[daviddm-image]: https://david-dm.org/amazingSurge/jquery-dynamicNumber.svg?style=flat
[daviddm-url]: https://david-dm.org/amazingSurge/jquery-dynamicNumber


