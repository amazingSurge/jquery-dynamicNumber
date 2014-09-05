# jQuery dynamicNumber
A jQuery plugin that animate the number dynamicly.

## Usage

Import this libraries:
* jQuery
* jquery-dynamicNumber.js

Create base html element:
```html
    <span class="dynamicNumber" data-from="0" data-step="1" data-to="30">0</span>
```

Initialize progress:
```javascript
$(".dynamicNumber").dynamicNumber();
```

## Settings

```javascript
{
    from: 0,
    to: 100,
    step: 1,
    speed: 20,
    format: function(n) {
        return n;
    },
    onStart: function(){},
    onStop: function(){},
    onUpdate: function(){},
    onReset: function(){}
}
```

## Public methods

jquery dynamicNumber has different methods , we can use it as below :
```javascript
$(".progress").dynamicNumber("start");
$(".progress").dynamicNumber("stop");
$(".progress").dynamicNumber("finish");
$(".progress").dynamicNumber("go", 50);
$(".progress").dynamicNumber("reset");
```
## Event

* <code>dynamicNumber::start</code>
* <code>dynamicNumber::stop</code>
* <code>dynamicNumber::finish</code>
* <code>dynamicNumber::update</code>
* <code>dynamicNumber::reset</code>

## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-dynamicNumber plugin is released under the <a href="https://github.com/amazingSurge/jquery-dynamicNumber/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.