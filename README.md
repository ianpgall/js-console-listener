# js-console-listener

A library that allows you to listen for console events.

## Currently Supports:

The following **Method Names** can be listened for:

 - all \*
 - assert
 - clear
 - count
 - debug
 - dir
 - dirxml
 - error
 - exception
 - group
 - groupCollapsed
 - groupEnd
 - info
 - profile
 - profileEnd
 - table
 - time
 - timeEnd
 - timeStamp
 - trace
 - warn

\* *Custom method to listen to all the other methods*

## Use:

`ConsoleListener.on()`

*Available argument options*:

- **String**, **Function**
    - *String* can be any of the methods listed above
    - *Function* is called with any arguments originally used
    - The "all" **Method Name** cannot be used here; use the **Function** overload
    - Example: `ConsoleListener.on("log", function () { /* Your code */ });`
- **Function**
	- Used to listen for any console event.
    - The first argument passed is the **Method Name**; the rest are any arguments originally used
    - Example: `ConsoleListener.on(function (methodName) { /* Your code */ });`
- **Object**
    - Each key is a **Method Name**
    - Each value is a callback, where its arguments follow the convention from before (if "all", then the first argument to the callback is the **Method Name**...similar to using the **Function** overload)
    - Example: `ConsoleListener.on({ log: function () { /* Your code */ } });`

## Order of Callbacks:

The callbacks for a method are fired in the order they were bound, first calling directly bound callbacks, then "all" callbacks.

## Possible Problems:

If `console` is not available when this script is run, but **later** becomes available (this happens with Internet Explorer if you open Developer Tools after the page loads), this script currently has no way of knowing/binding at that point. This script works only if `console` is available at the time it is executed.

## Test
