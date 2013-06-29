js-console-listener
===================

A library that allows you to listen for console events.

Currently Supports:
-------------------

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

Use:
----

<code>ConsoleListener.on()</code>

*Available argument options*:

- **String**, **Function**
    - *String* can be any of the methods listed above
    - *Function* is called with any arguments originally used
    - The "all" **Method Name** cannot be used here; use the **Function** overload
- **Function**
	- Used to listen for any console event.
    - The first argument passed is the **Method Name**; the rest are any arguments originally used
- **Object**
    - Each key is a **Method Name**
    - Each value is a callback, where its arguments follow the convention from before (if "all", then the first argument is the **Method Name**)

Order of Callbacks:
-------------------

The callbacks for a method are fired in the order they were bound, first calling directly bound callbacks, then "all" callbacks.
