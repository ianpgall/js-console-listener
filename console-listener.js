(function (w) {
	"use strict";
	
	var consoleMethods, fixConsoleMethod, consoleOn,
		methodObj, i, j, cur;
	
	consoleMethods = [
		"log", "assert", "clear", "count",
		"debug", "dir", "dirxml", "error",
		"exception", "group", "groupCollapsed",
		"groupEnd", "info", "profile", "profileEnd",
		"table", "time", "timeEnd", "timeStamp",
		"trace", "warn"
	];
	
	methodObj = {};
	
	fixConsoleMethod = (function () {
		var func, empty;
		
		empty = function (methodName) {
			return function () {};
		};
		
		if ("console" in w && w.console) {
			func = function (methodName) {
				var old;
				if (methodName in console && (old = console[methodName])) {
					console[methodName] = function () {
						var args, i, j;
						args = Array.prototype.slice.call(arguments, 0);
						for (i = 0, j = methodObj[methodName].handlers.length; i < j; i++) {
							Function.prototype.apply.call(methodObj[methodName].handlers[i], console, args);
						}
						Function.prototype.apply.call(old, console, args);
					};
				}
				return console[methodName] || empty;
			};
		} else {
			func = empty;
		}
		
		return func;
	}());
	
	for (i = 0, j = consoleMethods.length; i < j; i++) {
		cur = consoleMethods[i];
		methodObj[cur] = {
			handlers: []
		};
		fixConsoleMethod(cur);
	}
	
	consoleOn = function (methodName, callback) {
		if (methodName in methodObj) {
			methodObj[methodName].handlers.push(callback);
		}
	};
	
	w.ConsoleListener = {
		on: consoleOn
	};
}(window));
