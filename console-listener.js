(function (w) {
	"use strict";

	var A, F, O, consoleMethods, fixConsoleMethod, consoleOn,
		allHandlers, methodObj, i, j, cur;

	A = [];
	F = function () {};
	O = {};
	consoleMethods = [
		"assert", "clear", "count", "debug",
		"dir", "dirxml", "error", "exception",
		"group", "groupCollapsed", "groupEnd",
		"info", "log", "profile", "profileEnd",
		"table", "time", "timeEnd", "timeStamp",
		"trace", "warn"
	];
	allHandlers = [];
	methodObj = {};
	fixConsoleMethod = (function () {
		var func, empty;

		empty = function () {
			return function () {};
		};

		if (w.console) {
			func = function (methodName) {
				var old;
				if (methodName in console && (old = console[methodName])) {
					console[methodName] = function () {
						var args, argsForAll, i, j;
						args = A.slice.call(arguments, 0);
						for (i = 0, j = methodObj[methodName].handlers.length; i < j; i++) {
							F.apply.call(methodObj[methodName].handlers[i], console, args);
						}
						for (i = 0, j = allHandlers.length; i < j; i++) {
							argsForAll = [methodName];
							A.push.apply(argsForAll, args);
							F.apply.call(allHandlers[i], console, argsForAll);
						}
						F.apply.call(old, console, args);
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
		var key, cur;
		if (O.toString.call(methodName) === "[object Object]") {
			for (key in methodName) {
				if (key === "all") {
					cur = methodName[key];
					allHandlers.push(cur);
				} else if (key in methodObj) {
					cur = methodName[key];
					methodObj[key].handlers.push(cur);
				}
			}
		} else if (typeof methodName === "function") {
			allHandlers.push(methodName);
		} else if (methodName in methodObj) {
			methodObj[methodName].handlers.push(callback);
		}
	};

	w.ConsoleListener = {
		on: consoleOn
	};
}(window));
