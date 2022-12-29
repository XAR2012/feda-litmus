/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// This script listens for keypresses and button clicks,
	// then posts an event to the parent page so that
	// we can show the "run retest" footer in the sidebar
	// when something changes in the editor

	const addEvent = function addEvent(element, eventName, callback) {
	  if (element.addEventListener) {
	    element.addEventListener(eventName, callback, false);
	  } else if (element.attachEvent) {
	    element.attachEvent('on' + eventName, callback);
	  } else {
	    element['on' + eventName] = callback;
	  }
	};

	// Show retest footer
	addEvent(document, 'keypress', function (e) {
	  window.parent.postMessage({ method: 'checklist-showRetestButton' }, '*');
	});

	addEvent(document, 'click', function (e) {
	  var matchRegex = /save|ok/;
	  var testContent = e.target.className || e.target.textContent || '';
	  if (testContent.toLowerCase().match(matchRegex)) {
	    window.parent.postMessage({ method: 'checklist-showRetestButton' }, '*');
	  }
	});

	// The ConstantContact editor sometimes fully reloads,
	// so we should always post a change event when this script is run
	// for the first time
		window.parent.postMessage({ method: 'checklist-showRetestButton' }, '*');

/***/ }
/******/ ]);
//# sourceMappingURL=iframeMessages.js.map