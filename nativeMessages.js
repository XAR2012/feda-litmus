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
/***/ function(module, exports, __webpack_require__) {

	// Bridge between the page and Chrome extension

	__webpack_require__(2);

	try {
	  __webpack_require__(3);
	} catch (ex) {
	  console.log(ex);
	}

	function handleNativeEvent(message) {
	  var jQuery = __webpack_require__(96);
	  var result = message.data.result;
	  switch (message.data.method) {
	    case 'checklist-expand':
	      if (window.ChecklistProvider && window.ChecklistProvider.opened) {
	        window.ChecklistProvider.opened();
	      }
	      return jQuery('html').addClass('litmus-checklist-expanded');

	    case 'checklist-collapse':
	      if (window.ChecklistProvider && window.ChecklistProvider.closed) {
	        window.ChecklistProvider.closed();
	      }
	      return jQuery('html').removeClass('litmus-checklist-expanded');

	    case 'checklist-adobeCampaignEmailDesignerPreviewSendContent':
	      return window.postMessage({
	        method: 'checklist-adobeCampaignEmailDesignerPreviewSaveContent',
	        content: message.data.content
	      }, '*');

	    case 'checklist-adobeCampaignEmailDesignerSendSubjectLine':
	      return window.postMessage({
	        method: 'checklist-adobeCampaignEmailDesignerSaveSubjectLine',
	        content: message.data.content
	      }, '*');

	    case 'checklist-exacttargetSendContent':
	      return window.postMessage({
	        method: 'checklist-exacttargetSaveContent',
	        content: message.data.content,
	        id: message.data.id
	      }, '*');

	    case 'checklist-eloquaSendContent':
	      return window.postMessage({
	        method: 'checklist-eloquaSaveContent',
	        content: message.data.content
	      }, '*');

	    case 'checklist-ibmSendContent':
	      return window.postMessage({
	        method: 'checklist-ibmSaveContent',
	        id: message.data.id,
	        content: message.data.content
	      }, '*');

	    case 'checklist-pardotSendContent':
	      return window.postMessage({
	        method: 'checklist-pardotSaveContent',
	        id: message.data.id,
	        content: message.data.content
	      }, '*');

	    case 'checklist-isEditable':
	      return window.postMessage({
	        method: 'checklist-isEditableResult',
	        editable: window.ChecklistProvider ? window.ChecklistProvider.editable : void 0
	      }, '*');

	    case 'checklist-injectCSS':
	      if (window.ChecklistProvider && window.ChecklistProvider.injectCSS) {
	        window.ChecklistProvider.injectCSS();
	      }
	      return;

	    case 'checklist-requireLocalEspScript':
	      var providerKey = message.data.provider;
	      return __webpack_require__(97)("./" + providerKey);

	    case 'checklist-lookupResult':
	      var payload = {
	        method: 'checklist-fetchContentResult',
	        testType: message.data.testType,
	        providerType: result.providerType,
	        subject: result.subject,
	        content: result.content,
	        fromName: result.fromName,
	        fromEmail: result.fromEmail,
	        id: result.id
	      };

	      if (result.imageData && Object.keys(result.imageData).length > 0) {
	        payload['imageData'] = result.imageData;
	      }

	      //Send the result to inject.coffee
	      return window.postMessage(payload, '*');

	    case 'checklist-fetchContent':
	      // Start fetching the content of the email.
	      if (window.ChecklistProvider) {
	        window.ChecklistProvider.lookup({ testType: message.data.testType });
	      }
	      return;

	    case 'checklist-replaceSubject':
	      // Replace the subject with the given value
	      var subject = message.data.subject;
	      if (window.ChecklistProvider && window.ChecklistProvider.editSubject) {
	        result = window.ChecklistProvider.editSubject(subject);
	      }

	      // Send the result to inject.coffee
	      return window.postMessage({
	        method: 'checklist-replaceSubjectResult',
	        subject: subject,
	        success: result
	      }, '*');

	    case 'checklist-replaceContent':
	      // Replace the content with the given value
	      var previousContent = message.data.previousContent;
	      var newContent = message.data.newContent;
	      if (window.ChecklistProvider && window.ChecklistProvider.editContent) {
	        result = window.ChecklistProvider.editContent(previousContent, newContent);
	      }

	      // Send the result to inject.coffee
	      return window.postMessage({
	        method: 'checklist-replaceContentResult',
	        previousContent: previousContent,
	        newContent: newContent,
	        success: result
	      }, '*');

	    default:
	    //Do Nothing
	  }
	}

	window.addEventListener('message', handleNativeEvent);

	window.postMessage({ method: 'checklist-nativeMessagesScriptLoaded' }, '*');

	if (undefined) {
	  module.exports = { handleNativeEvent: handleNativeEvent };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {(function (global) {
	  var babelHelpers = global.babelHelpers = {};

	  babelHelpers.inherits = function (subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	    }

	    subClass.prototype = Object.create(superClass && superClass.prototype, {
	      constructor: {
	        value: subClass,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    if (superClass) subClass.__proto__ = superClass;
	  };

	  babelHelpers.defaults = function (obj, defaults) {
	    var keys = Object.getOwnPropertyNames(defaults);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var value = Object.getOwnPropertyDescriptor(defaults, key);

	      if (value && value.configurable && obj[key] === undefined) {
	        Object.defineProperty(obj, key, value);
	      }
	    }

	    return obj;
	  };

	  babelHelpers.createClass = (function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  })();

	  babelHelpers.createDecoratedClass = (function () {
	    function defineProperties(target, descriptors, initializers) {
	      for (var i = 0; i < descriptors.length; i++) {
	        var descriptor = descriptors[i];
	        var decorators = descriptor.decorators;
	        var key = descriptor.key;
	        delete descriptor.key;
	        delete descriptor.decorators;
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

	        if (decorators) {
	          for (var f = 0; f < decorators.length; f++) {
	            var decorator = decorators[f];

	            if (typeof decorator === "function") {
	              descriptor = decorator(target, key, descriptor) || descriptor;
	            } else {
	              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
	            }
	          }

	          if (descriptor.initializer !== undefined) {
	            initializers[key] = descriptor;
	            continue;
	          }
	        }

	        Object.defineProperty(target, key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
	      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
	      return Constructor;
	    };
	  })();

	  babelHelpers.createDecoratedObject = function (descriptors) {
	    var target = {};

	    for (var i = 0; i < descriptors.length; i++) {
	      var descriptor = descriptors[i];
	      var decorators = descriptor.decorators;
	      var key = descriptor.key;
	      delete descriptor.key;
	      delete descriptor.decorators;
	      descriptor.enumerable = true;
	      descriptor.configurable = true;
	      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

	      if (decorators) {
	        for (var f = 0; f < decorators.length; f++) {
	          var decorator = decorators[f];

	          if (typeof decorator === "function") {
	            descriptor = decorator(target, key, descriptor) || descriptor;
	          } else {
	            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
	          }
	        }
	      }

	      if (descriptor.initializer) {
	        descriptor.value = descriptor.initializer.call(target);
	      }

	      Object.defineProperty(target, key, descriptor);
	    }

	    return target;
	  };

	  babelHelpers.defineDecoratedPropertyDescriptor = function (target, key, descriptors) {
	    var _descriptor = descriptors[key];
	    if (!_descriptor) return;
	    var descriptor = {};

	    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

	    descriptor.value = descriptor.initializer.call(target);
	    Object.defineProperty(target, key, descriptor);
	  };

	  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
	    return Object.freeze(Object.defineProperties(strings, {
	      raw: {
	        value: Object.freeze(raw)
	      }
	    }));
	  };

	  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
	    strings.raw = raw;
	    return strings;
	  };

	  babelHelpers.toArray = function (arr) {
	    return Array.isArray(arr) ? arr : Array.from(arr);
	  };

	  babelHelpers.toConsumableArray = function (arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	      return arr2;
	    } else {
	      return Array.from(arr);
	    }
	  };

	  babelHelpers.slicedToArray = (function () {
	    function sliceIterator(arr, i) {
	      var _arr = [];
	      var _n = true;
	      var _d = false;
	      var _e = undefined;

	      try {
	        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	          _arr.push(_s.value);

	          if (i && _arr.length === i) break;
	        }
	      } catch (err) {
	        _d = true;
	        _e = err;
	      } finally {
	        try {
	          if (!_n && _i["return"]) _i["return"]();
	        } finally {
	          if (_d) throw _e;
	        }
	      }

	      return _arr;
	    }

	    return function (arr, i) {
	      if (Array.isArray(arr)) {
	        return arr;
	      } else if (Symbol.iterator in Object(arr)) {
	        return sliceIterator(arr, i);
	      } else {
	        throw new TypeError("Invalid attempt to destructure non-iterable instance");
	      }
	    };
	  })();

	  babelHelpers.slicedToArrayLoose = function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      var _arr = [];

	      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
	        _arr.push(_step.value);

	        if (i && _arr.length === i) break;
	      }

	      return _arr;
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };

	  babelHelpers.objectWithoutProperties = function (obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  };

	  babelHelpers.hasOwn = Object.prototype.hasOwnProperty;
	  babelHelpers.slice = Array.prototype.slice;
	  babelHelpers.bind = Function.prototype.bind;

	  babelHelpers.defineProperty = function (obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    } else {
	      obj[key] = value;
	    }

	    return obj;
	  };

	  babelHelpers.asyncToGenerator = function (fn) {
	    return function () {
	      var gen = fn.apply(this, arguments);
	      return new Promise(function (resolve, reject) {
	        var callNext = step.bind(null, "next");
	        var callThrow = step.bind(null, "throw");

	        function step(key, arg) {
	          try {
	            var info = gen[key](arg);
	            var value = info.value;
	          } catch (error) {
	            reject(error);
	            return;
	          }

	          if (info.done) {
	            resolve(value);
	          } else {
	            Promise.resolve(value).then(callNext, callThrow);
	          }
	        }

	        callNext();
	      });
	    };
	  };

	  babelHelpers.interopRequireWildcard = function (obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj["default"] = obj;
	      return newObj;
	    }
	  };

	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };

	  babelHelpers._typeof = function (obj) {
	    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
	  };

	  babelHelpers._extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  babelHelpers.get = function get(object, property, receiver) {
	    if (object === null) object = Function.prototype;
	    var desc = Object.getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        return get(parent, property, receiver);
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  };

	  babelHelpers.set = function set(object, property, value, receiver) {
	    var desc = Object.getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent !== null) {
	        set(parent, property, value, receiver);
	      }
	    } else if ("value" in desc && desc.writable) {
	      desc.value = value;
	    } else {
	      var setter = desc.set;

	      if (setter !== undefined) {
	        setter.call(receiver, value);
	      }
	    }

	    return value;
	  };

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };

	  babelHelpers.objectDestructuringEmpty = function (obj) {
	    if (obj == null) throw new TypeError("Cannot destructure undefined");
	  };

	  babelHelpers.temporalUndefined = {};

	  babelHelpers.temporalAssertDefined = function (val, name, undef) {
	    if (val === undef) {
	      throw new ReferenceError(name + " is not defined - temporal dead zone");
	    }

	    return true;
	  };

	  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;

	  babelHelpers.defaultProps = function (defaultProps, props) {
	    if (defaultProps) {
	      for (var propName in defaultProps) {
	        if (typeof props[propName] === "undefined") {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    return props;
	  };

	  babelHelpers._instanceof = function (left, right) {
	    if (right != null && right[Symbol.hasInstance]) {
	      return right[Symbol.hasInstance](left);
	    } else {
	      return left instanceof right;
	    }
	  };

	  babelHelpers.interopRequire = function (obj) {
	    return obj && obj.__esModule ? obj["default"] : obj;
	  };
	})(typeof global === "undefined" ? self : global);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	__webpack_require__(5);

	__webpack_require__(94);

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	__webpack_require__(23);
	__webpack_require__(27);
	__webpack_require__(29);
	__webpack_require__(31);
	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(42);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(58);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(69);
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(82);
	__webpack_require__(83);
	__webpack_require__(84);
	__webpack_require__(85);
	__webpack_require__(86);
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(92);
	__webpack_require__(93);
	module.exports = __webpack_require__(7).core;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $                = __webpack_require__(7)
	  , cel              = __webpack_require__(9)
	  , cof              = __webpack_require__(10)
	  , $def             = __webpack_require__(14)
	  , invoke           = __webpack_require__(16)
	  , arrayMethod      = __webpack_require__(17)
	  , IE_PROTO         = __webpack_require__(13).safe('__proto__')
	  , assert           = __webpack_require__(19)
	  , assertObject     = assert.obj
	  , ObjectProto      = Object.prototype
	  , html             = $.html
	  , A                = []
	  , _slice           = A.slice
	  , _join            = A.join
	  , classof          = cof.classof
	  , has              = $.has
	  , defineProperty   = $.setDesc
	  , getOwnDescriptor = $.getDesc
	  , defineProperties = $.setDescs
	  , isFunction       = $.isFunction
	  , isObject         = $.isObject
	  , toObject         = $.toObject
	  , toLength         = $.toLength
	  , toIndex          = $.toIndex
	  , IE8_DOM_DEFINE   = false
	  , $indexOf         = __webpack_require__(20)(false)
	  , $forEach         = arrayMethod(0)
	  , $map             = arrayMethod(1)
	  , $filter          = arrayMethod(2)
	  , $some            = arrayMethod(3)
	  , $every           = arrayMethod(4);

	if(!$.DESC){
	  try {
	    IE8_DOM_DEFINE = defineProperty(cel('div'), 'x',
	      {get: function(){ return 8; }}
	    ).x == 8;
	  } catch(e){ /* empty */ }
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)assertObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    assertObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$def($def.S + $def.F * !$.DESC, 'Object', {
	  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $.getDesc,
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  defineProperty: $.setDesc,
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties
	});

	  // IE 8- don't enum bug keys
	var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
	            'toLocaleString,toString,valueOf').split(',')
	  // Additional keys for getOwnPropertyNames
	  , keys2 = keys1.concat('length', 'prototype')
	  , keysLen1 = keys1.length;

	// Create object with `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe')
	    , i      = keysLen1
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict.prototype[keys1[i]];
	  return createDict();
	};
	function createGetKeys(names, length){
	  return function(object){
	    var O      = toObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~$indexOf(result, key) || result.push(key);
	    }
	    return result;
	  };
	}
	function Empty(){}
	$def($def.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = Object(assert.def(O));
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(isFunction(O.constructor) && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = assertObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
	  // 19.1.2.17 / 15.2.3.8 Object.seal(O)
	  seal: function seal(it){
	    return it; // <- cap
	  },
	  // 19.1.2.5 / 15.2.3.9 Object.freeze(O)
	  freeze: function freeze(it){
	    return it; // <- cap
	  },
	  // 19.1.2.15 / 15.2.3.10 Object.preventExtensions(O)
	  preventExtensions: function preventExtensions(it){
	    return it; // <- cap
	  },
	  // 19.1.2.13 / 15.2.3.11 Object.isSealed(O)
	  isSealed: function isSealed(it){
	    return !isObject(it); // <- cap
	  },
	  // 19.1.2.12 / 15.2.3.12 Object.isFrozen(O)
	  isFrozen: function isFrozen(it){
	    return !isObject(it); // <- cap
	  },
	  // 19.1.2.11 / 15.2.3.13 Object.isExtensible(O)
	  isExtensible: function isExtensible(it){
	    return isObject(it); // <- cap
	  }
	});

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$def($def.P, 'Function', {
	  bind: function(that /*, args... */){
	    var fn       = assert.fn(this)
	      , partArgs = _slice.call(arguments, 1);
	    function bound(/* args... */){
	      var args   = partArgs.concat(_slice.call(arguments))
	        , constr = this instanceof bound
	        , ctx    = constr ? $.create(fn.prototype) : that
	        , result = invoke(fn, args, ctx);
	      return constr ? ctx : result;
	    }
	    if(fn.prototype)bound.prototype = fn.prototype;
	    return bound;
	  }
	});

	// Fix for not array-like ES3 string and DOM objects
	if(!(0 in Object('z') && 'z'[0] == 'z')){
	  $.ES5Object = function(it){
	    return cof(it) == 'String' ? it.split('') : Object(it);
	  };
	}

	var buggySlice = true;
	try {
	  if(html)_slice.call(html);
	  buggySlice = false;
	} catch(e){ /* empty */ }

	$def($def.P + $def.F * buggySlice, 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return _slice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

	$def($def.P + $def.F * ($.ES5Object != Object), 'Array', {
	  join: function join(){
	    return _join.apply($.ES5Object(this), arguments);
	  }
	});

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$def($def.S, 'Array', {
	  isArray: function(arg){
	    return cof(arg) == 'Array';
	  }
	});
	function createArrayReduce(isRight){
	  return function(callbackfn, memo){
	    assert.fn(callbackfn);
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = isRight ? length - 1 : 0
	      , i      = isRight ? -1 : 1;
	    if(arguments.length < 2)for(;;){
	      if(index in O){
	        memo = O[index];
	        index += i;
	        break;
	      }
	      index += i;
	      assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	}
	$def($def.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || function forEach(callbackfn/*, that = undefined */){
	    return $forEach(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn/*, that = undefined */){
	    return $map(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn/*, that = undefined */){
	    return $filter(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn/*, that = undefined */){
	    return $some(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn/*, that = undefined */){
	    return $every(this, callbackfn, arguments[1]);
	  },
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(el /*, fromIndex = 0 */){
	    return $indexOf(this, el, arguments[1]);
	  },
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, $.toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});

	// 21.1.3.25 / 15.5.4.20 String.prototype.trim()
	$def($def.P, 'String', {trim: __webpack_require__(21)(/^\s*([\s\S]*\S)?\s*$/, '$1')});

	// 20.3.3.1 / 15.9.4.4 Date.now()
	$def($def.S, 'Date', {now: function(){
	  return +new Date;
	}});

	function lz(num){
	  return num > 9 ? num : '0' + num;
	}

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS and old webkit had a broken Date implementation.
	var date       = new Date(-5e13 - 1)
	  , brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z'
	      && __webpack_require__(22)(function(){ new Date(NaN).toISOString(); }));
	$def($def.P + $def.F * brokenDate, 'Date', {toISOString: function(){
	  if(!isFinite(this))throw RangeError('Invalid time value');
	  var d = this
	    , y = d.getUTCFullYear()
	    , m = d.getUTCMilliseconds()
	    , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	}});

	if(classof(function(){ return arguments; }()) == 'Object')cof.classof = function(it){
	  var tag = classof(it);
	  return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(8)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = true;
	  $.path = $.g;
	  return $;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(7)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(7)
	  , TAG      = __webpack_require__(11)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7).g
	  , store  = __webpack_require__(12)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(13).safe('Symbol.' + name));
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(7).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(7)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction
	  , $redef     = __webpack_require__(15);
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	global.core = core;
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    if(type & $def.B && own)exp = ctx(out, global);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)$redef(target, key, out);
	    // export
	    if(exports[key] != out)$.hide(exports, key, exp);
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var $   = __webpack_require__(7)
	  , tpl = String({}.hasOwnProperty)
	  , SRC = __webpack_require__(13).safe('src')
	  , _toString = Function.toString;

	function $redef(O, key, val, safe){
	  if($.isFunction(val)){
	    var base = O[key];
	    $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
	    if(!('name' in val))val.name = key;
	  }
	  if(O === $.g){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    $.hide(O, key, val);
	  }
	}

	// add fake Function#toString for correct work wrapped methods / constructors
	// with methods similar to LoDash isNative
	$redef(Function.prototype, 'toString', function toString(){
	  return $.has(this, SRC) ? this[SRC] : _toString.call(this);
	});

	$.core.inspectSource = function(it){
	  return _toString.call(it);
	};

	module.exports = $redef;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var $   = __webpack_require__(7)
	  , ctx = __webpack_require__(18);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = Object($.assertDefined($this))
	      , self   = $.ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = $.toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(19).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var $ = __webpack_require__(7);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = $.toObject($this)
	      , length = $.toLength(O.length)
	      , index  = $.toIndex(fromIndex, length)
	      , value;
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function(regExp, replace, isStatic){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(isStatic ? it : this).replace(regExp, replacer);
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    exec();
	    return false;
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $        = __webpack_require__(7)
	  , setTag   = __webpack_require__(10).set
	  , uid      = __webpack_require__(13)
	  , shared   = __webpack_require__(12)
	  , $def     = __webpack_require__(14)
	  , $redef   = __webpack_require__(15)
	  , keyOf    = __webpack_require__(24)
	  , enumKeys = __webpack_require__(25)
	  , assertObject = __webpack_require__(19).obj
	  , ObjectProto = Object.prototype
	  , DESC     = $.DESC
	  , has      = $.has
	  , $create  = $.create
	  , getDesc  = $.getDesc
	  , setDesc  = $.setDesc
	  , desc     = $.desc
	  , $names   = __webpack_require__(26)
	  , getNames = $names.get
	  , toObject = $.toObject
	  , $Symbol  = $.g.Symbol
	  , setter   = false
	  , TAG      = uid('tag')
	  , HIDDEN   = uid('hidden')
	  , _propertyIsEnumerable = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols = shared('symbols')
	  , useNative = $.isFunction($Symbol);

	var setSymbolDesc = DESC ? function(){ // fallback for old Android
	  try {
	    return $create(setDesc({}, HIDDEN, {
	      get: function(){
	        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
	      }
	    }))[HIDDEN] || setDesc;
	  } catch(e){
	    return function(it, key, D){
	      var protoDesc = getDesc(ObjectProto, key);
	      if(protoDesc)delete ObjectProto[key];
	      setDesc(it, key, D);
	      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	    };
	  }
	}() : setDesc;

	function wrap(tag){
	  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
	  DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, desc(1, value));
	    }
	  });
	  return sym;
	}

	function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = $create(D, {enumerable: desc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	}
	function defineProperties(it, P){
	  assertObject(it);
	  var keys = enumKeys(P = toObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)defineProperty(it, key = keys[i++], P[key]);
	  return it;
	}
	function create(it, P){
	  return P === undefined ? $create(it) : defineProperties($create(it), P);
	}
	function propertyIsEnumerable(key){
	  var E = _propertyIsEnumerable.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	}
	function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	}
	function getOwnPropertyNames(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	}
	function getOwnPropertySymbols(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	}

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function(){
	    return this[TAG];
	  });

	  $.create     = create;
	  $.setDesc    = defineProperty;
	  $.getDesc    = getOwnPropertyDescriptor;
	  $.setDescs   = defineProperties;
	  $.getNames   = $names.get = getOwnPropertyNames;
	  $.getSymbols = getOwnPropertySymbols;

	  if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = __webpack_require__(11)(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);

	setter = true;

	$def($def.G + $def.W, {Symbol: $Symbol});

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: getOwnPropertySymbols
	});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag($.g.JSON, 'JSON', true);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	module.exports = function(object, el){
	  var O      = $.toObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(7)
	  , toString = {}.toString
	  , getNames = $.getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(14);
	$def($def.S, 'Object', {assign: __webpack_require__(28)});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(7)
	  , enumKeys = __webpack_require__(25);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $def = __webpack_require__(14);
	$def($def.S, 'Object', {
	  is: __webpack_require__(30)
	});

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $def = __webpack_require__(14);
	$def($def.S, 'Object', {setPrototypeOf: __webpack_require__(32).set});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(7)
	  , assert = __webpack_require__(19);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(18)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(10)
	  , tmp = {};
	tmp[__webpack_require__(11)('toStringTag')] = 'z';
	if(__webpack_require__(7).FW && cof(tmp) != 'z'){
	  __webpack_require__(15)(Object.prototype, 'toString', function toString(){
	    return '[object ' + cof.classof(this) + ']';
	  }, true);
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(7)
	  , $def     = __webpack_require__(14)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(26).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(7)
	  , NAME = 'name'
	  , setDesc = $.setDesc
	  , FunctionProto = Function.prototype;
	// 19.2.4.2 name
	NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = String(this).match(/^\s*function ([^ (]*)/)
	      , name  = match ? match[1] : '';
	    $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
	    return name;
	  },
	  set: function(value){
	    $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
	  }
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var $             = __webpack_require__(7)
	  , HAS_INSTANCE  = __webpack_require__(11)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(!$.isFunction(this) || !$.isObject(O))return false;
	  if(!$.isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(7)
	  , isObject   = $.isObject
	  , isFunction = $.isFunction
	  , NUMBER     = 'Number'
	  , $Number    = $.g[NUMBER]
	  , Base       = $Number
	  , proto      = $Number.prototype;
	function toPrimitive(it){
	  var fn, val;
	  if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
	  if(isFunction(fn = it.toString) && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to number");
	}
	function toNumber(it){
	  if(isObject(it))it = toPrimitive(it);
	  if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
	    var binary = false;
	    switch(it.charCodeAt(1)){
	      case 66 : case 98  : binary = true;
	      case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
	    }
	  } return +it;
	}
	if($.FW && !($Number('0o1') && $Number('0b1'))){
	  $Number = function Number(it){
	    return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call($.DESC ? $.getNames(Base) : (
	      // ES3:
	      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	      // ES6 (in case, if modules with ES6 Number statics required before):
	      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	    ).split(','), function(key){
	      if($.has(Base, key) && !$.has($Number, key)){
	        $.setDesc($Number, key, $.getDesc(Base, key));
	      }
	    }
	  );
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(15)($.g, NUMBER, $Number);
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(7)
	  , $def  = __webpack_require__(14)
	  , abs   = Math.abs
	  , floor = Math.floor
	  , _isFinite = $.g.isFinite
	  , MAX_SAFE_INTEGER = 0x1fffffffffffff; // pow(2, 53) - 1 == 9007199254740991;
	function isInteger(it){
	  return !$.isObject(it) && _isFinite(it) && floor(it) === it;
	}
	$def($def.S, 'Number', {
	  // 20.1.2.1 Number.EPSILON
	  EPSILON: Math.pow(2, -52),
	  // 20.1.2.2 Number.isFinite(number)
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  },
	  // 20.1.2.3 Number.isInteger(number)
	  isInteger: isInteger,
	  // 20.1.2.4 Number.isNaN(number)
	  isNaN: function isNaN(number){
	    return number != number;
	  },
	  // 20.1.2.5 Number.isSafeInteger(number)
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	  },
	  // 20.1.2.6 Number.MAX_SAFE_INTEGER
	  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	  // 20.1.2.10 Number.MIN_SAFE_INTEGER
	  MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	  // 20.1.2.12 Number.parseFloat(string)
	  parseFloat: parseFloat,
	  // 20.1.2.13 Number.parseInt(string, radix)
	  parseInt: parseInt
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Infinity = 1 / 0
	  , $def  = __webpack_require__(14)
	  , E     = Math.E
	  , pow   = Math.pow
	  , abs   = Math.abs
	  , exp   = Math.exp
	  , log   = Math.log
	  , sqrt  = Math.sqrt
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	function roundTiesToEven(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	}

	// 20.2.2.28 Math.sign(x)
	function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	}
	// 20.2.2.5 Math.asinh(x)
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	}
	// 20.2.2.14 Math.expm1(x)
	function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	}

	$def($def.S, 'Math', {
	  // 20.2.2.3 Math.acosh(x)
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
	  },
	  // 20.2.2.5 Math.asinh(x)
	  asinh: asinh,
	  // 20.2.2.7 Math.atanh(x)
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	  },
	  // 20.2.2.9 Math.cbrt(x)
	  cbrt: function cbrt(x){
	    return sign(x = +x) * pow(abs(x), 1 / 3);
	  },
	  // 20.2.2.11 Math.clz32(x)
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
	  },
	  // 20.2.2.12 Math.cosh(x)
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  },
	  // 20.2.2.14 Math.expm1(x)
	  expm1: expm1,
	  // 20.2.2.16 Math.fround(x)
	  fround: function fround(x){
	    var $abs  = abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  },
	  // 20.2.2.17 Math.hypot([value1[, value2[, ??? ]]])
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , len  = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < len){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * sqrt(sum);
	  },
	  // 20.2.2.18 Math.imul(x, y)
	  imul: function imul(x, y){
	    var UInt16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UInt16 & xn
	      , yl = UInt16 & yn;
	    return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
	  },
	  // 20.2.2.20 Math.log1p(x)
	  log1p: function log1p(x){
	    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
	  },
	  // 20.2.2.21 Math.log10(x)
	  log10: function log10(x){
	    return log(x) / Math.LN10;
	  },
	  // 20.2.2.22 Math.log2(x)
	  log2: function log2(x){
	    return log(x) / Math.LN2;
	  },
	  // 20.2.2.28 Math.sign(x)
	  sign: sign,
	  // 20.2.2.30 Math.sinh(x)
	  sinh: function sinh(x){
	    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	  },
	  // 20.2.2.33 Math.tanh(x)
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  },
	  // 20.2.2.34 Math.trunc(x)
	  trunc: function trunc(it){
	    return (it > 0 ? floor : ceil)(it);
	  }
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var $def    = __webpack_require__(14)
	  , toIndex = __webpack_require__(7).toIndex
	  , fromCharCode = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res = []
	      , len = arguments.length
	      , i   = 0
	      , code;
	    while(len > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var $    = __webpack_require__(7)
	  , $def = __webpack_require__(14);

	$def($def.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl = $.toObject(callSite.raw)
	      , len = $.toLength(tpl.length)
	      , sln = arguments.length
	      , res = []
	      , i   = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < sln)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(7).set
	  , $at   = __webpack_require__(43)(true)
	  , ITER  = __webpack_require__(13).safe('iter')
	  , $iter = __webpack_require__(44)
	  , step  = $iter.step;

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(45)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(7);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(7)
	  , cof               = __webpack_require__(10)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(19)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(11)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(12)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}

	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(14)
	  , $redef          = __webpack_require__(15)
	  , $               = __webpack_require__(7)
	  , cof             = __webpack_require__(10)
	  , $iter           = __webpack_require__(44)
	  , SYMBOL_ITERATOR = __webpack_require__(11)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW || FORCE)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(14)
	  , $at  = __webpack_require__(43)(false);
	$def($def.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(7)
	  , cof  = __webpack_require__(10)
	  , $def = __webpack_require__(14)
	  , toLength = $.toLength;

	// should throw error on regex
	$def($def.P + $def.F * !__webpack_require__(22)(function(){ 'q'.endsWith(/./); }), 'String', {
	  // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    var that = String($.assertDefined(this))
	      , endPosition = arguments[1]
	      , len = toLength(that.length)
	      , end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
	    searchString += '';
	    return that.slice(end - searchString.length, end) === searchString;
	  }
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(7)
	  , cof  = __webpack_require__(10)
	  , $def = __webpack_require__(14);

	$def($def.P, 'String', {
	  // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	  includes: function includes(searchString /*, position = 0 */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
	  }
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $def = __webpack_require__(14);

	$def($def.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(50)
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(7);

	module.exports = function repeat(count){
	  var str = String($.assertDefined(this))
	    , res = ''
	    , n   = $.toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $    = __webpack_require__(7)
	  , cof  = __webpack_require__(10)
	  , $def = __webpack_require__(14);

	// should throw error on regex
	$def($def.P + $def.F * !__webpack_require__(22)(function(){ 'q'.startsWith(/./); }), 'String', {
	  // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    if(cof(searchString) == 'RegExp')throw TypeError();
	    var that  = String($.assertDefined(this))
	      , index = $.toLength(Math.min(arguments[1], that.length));
	    searchString += '';
	    return that.slice(index, index + searchString.length) === searchString;
	  }
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(7)
	  , ctx   = __webpack_require__(18)
	  , $def  = __webpack_require__(14)
	  , $iter = __webpack_require__(44)
	  , call  = __webpack_require__(53);
	$def($def.S + $def.F * !__webpack_require__(54)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = Object($.assertDefined(arrayLike))
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	      , index   = 0
	      , length, result, step, iterator;
	    if($iter.is(O)){
	      iterator = $iter.get(O);
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result   = new (typeof this == 'function' ? this : Array);
	      for(; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
	      }
	    } else {
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
	      for(; length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(19).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(11)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var $def = __webpack_require__(14);
	$def($def.S, 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , length = arguments.length
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      , result = new (typeof this == 'function' ? this : Array)(length);
	    while(length > index)result[index] = arguments[index++];
	    result.length = length;
	    return result;
	  }
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(7)
	  , setUnscope = __webpack_require__(57)
	  , ITER       = __webpack_require__(13).safe('iter')
	  , $iter      = __webpack_require__(44)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(45)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(11)('unscopables');
	if(!(UNSCOPABLES in []))__webpack_require__(7).hide(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  [][UNSCOPABLES][key] = true;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59)(Array);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(7)
	  , SPECIES = __webpack_require__(11)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(7)
	  , $def    = __webpack_require__(14)
	  , toIndex = $.toIndex;
	$def($def.P, 'Array', {
	  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	  copyWithin: function copyWithin(target/* = 0 */, start /* = 0, end = @length */){
	    var O     = Object($.assertDefined(this))
	      , len   = $.toLength(O.length)
	      , to    = toIndex(target, len)
	      , from  = toIndex(start, len)
	      , end   = arguments[2]
	      , fin   = end === undefined ? len : toIndex(end, len)
	      , count = Math.min(fin - from, len - to)
	      , inc   = 1;
	    if(from < to && to < from + count){
	      inc  = -1;
	      from = from + count - 1;
	      to   = to   + count - 1;
	    }
	    while(count-- > 0){
	      if(from in O)O[to] = O[from];
	      else delete O[to];
	      to   += inc;
	      from += inc;
	    } return O;
	  }
	});
	__webpack_require__(57)('copyWithin');

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $       = __webpack_require__(7)
	  , $def    = __webpack_require__(14)
	  , toIndex = $.toIndex;
	$def($def.P, 'Array', {
	  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	  fill: function fill(value /*, start = 0, end = @length */){
	    var O      = Object($.assertDefined(this))
	      , length = $.toLength(O.length)
	      , index  = toIndex(arguments[1], length)
	      , end    = arguments[2]
	      , endPos = end === undefined ? length : toIndex(end, length);
	    while(endPos > index)O[index++] = value;
	    return O;
	  }
	});
	__webpack_require__(57)('fill');

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var KEY    = 'find'
	  , $def   = __webpack_require__(14)
	  , forced = true
	  , $find  = __webpack_require__(17)(5);
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$def($def.P + $def.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments[1]);
	  }
	});
	__webpack_require__(57)(KEY);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var KEY    = 'findIndex'
	  , $def   = __webpack_require__(14)
	  , forced = true
	  , $find  = __webpack_require__(17)(6);
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$def($def.P + $def.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments[1]);
	  }
	});
	__webpack_require__(57)(KEY);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(7)
	  , cof     = __webpack_require__(10)
	  , $RegExp = $.g.RegExp
	  , Base    = $RegExp
	  , proto   = $RegExp.prototype
	  , re      = /a/g
	  // "new" creates a new object
	  , CORRECT_NEW = new $RegExp(re) !== re
	  // RegExp allows a regex with flags as the pattern
	  , ALLOWS_RE_WITH_FLAGS = function(){
	    try {
	      return $RegExp(re, 'i') == '/a/i';
	    } catch(e){ /* empty */ }
	  }();
	if($.FW && $.DESC){
	  if(!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS){
	    $RegExp = function RegExp(pattern, flags){
	      var patternIsRegExp  = cof(pattern) == 'RegExp'
	        , flagsIsUndefined = flags === undefined;
	      if(!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)return pattern;
	      return CORRECT_NEW
	        ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags)
	        : new Base(patternIsRegExp ? pattern.source : pattern
	          , patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
	    };
	    $.each.call($.getNames(Base), function(key){
	      key in $RegExp || $.setDesc($RegExp, key, {
	        configurable: true,
	        get: function(){ return Base[key]; },
	        set: function(it){ Base[key] = it; }
	      });
	    });
	    proto.constructor = $RegExp;
	    $RegExp.prototype = proto;
	    __webpack_require__(15)($.g, 'RegExp', $RegExp);
	  }
	  // 21.2.5.3 get RegExp.prototype.flags()
	  if(/./g.flags != 'g')$.setDesc(proto, 'flags', {
	    configurable: true,
	    get: __webpack_require__(21)(/^.*\/(\w*)$/, '$1')
	  });
	}
	__webpack_require__(59)($RegExp);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(7)
	  , ctx      = __webpack_require__(18)
	  , cof      = __webpack_require__(10)
	  , $def     = __webpack_require__(14)
	  , assert   = __webpack_require__(19)
	  , forOf    = __webpack_require__(66)
	  , setProto = __webpack_require__(32).set
	  , same     = __webpack_require__(30)
	  , species  = __webpack_require__(59)
	  , SPECIES  = __webpack_require__(11)('species')
	  , RECORD   = __webpack_require__(13).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , isNode   = cof(process) == 'process'
	  , asap     = process && process.nextTick || __webpack_require__(67).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj
	  , Wrapper;

	function testResolve(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	}

	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && $.DESC){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	function isPromise(it){
	  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
	}
	function sameConstructor(a, b){
	  // library wrapper special case
	  if(!$.FW && a === P && b === Wrapper)return true;
	  return same(a, b);
	}
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  // strange IE + webpack dev server bug - use .call(global)
	  if(chain.length)asap.call(global, function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    asap.call(global, function(){
	      if(isUnhandled(promise = record.p)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      // strange IE + webpack dev server bug - use .call(global)
	      asap.call(global, function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	}

	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(68)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species(Wrapper = $.core[PROMISE]);

	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(54)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(18)
	  , get  = __webpack_require__(44).get
	  , call = __webpack_require__(53);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(7)
	  , ctx    = __webpack_require__(18)
	  , cof    = __webpack_require__(10)
	  , invoke = __webpack_require__(16)
	  , cel    = __webpack_require__(9)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id, '*');
	    };
	    global.addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(15);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(70);

	// 23.1 Map Objects
	__webpack_require__(71)('Map', function(get){
	  return function Map(){ return get(this, arguments[0]); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(7)
	  , ctx      = __webpack_require__(18)
	  , safe     = __webpack_require__(13).safe
	  , assert   = __webpack_require__(19)
	  , forOf    = __webpack_require__(66)
	  , step     = __webpack_require__(44).step
	  , $has     = $.has
	  , set      = $.set
	  , isObject = $.isObject
	  , hide     = $.hide
	  , isExtensible = Object.isExtensible || isObject
	  , ID       = safe('id')
	  , O1       = safe('O1')
	  , LAST     = safe('last')
	  , FIRST    = safe('first')
	  , ITER     = safe('iter')
	  , SIZE     = $.DESC ? safe('size') : 'size'
	  , id       = 0;

	function fastKey(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	}

	function getEntry(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that[O1][index];
	  // frozen object case
	  for(entry = that[FIRST]; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	}

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      assert.inst(that, C, NAME);
	      set(that, O1, $.create(null));
	      set(that, SIZE, 0);
	      set(that, LAST, undefined);
	      set(that, FIRST, undefined);
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    __webpack_require__(68)(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that[FIRST] = that[LAST] = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that[O1][entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that[FIRST] == entry)that[FIRST] = next;
	          if(that[LAST] == entry)that[LAST] = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments[1], 3)
	          , entry;
	        while(entry = entry ? entry.n : this[FIRST]){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if($.DESC)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return assert.def(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that[O1][index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  // add .keys, .values, .entries, [@@iterator]
	  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	  setIter: function(C, NAME, IS_MAP){
	    __webpack_require__(45)(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	  }
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $     = __webpack_require__(7)
	  , $def  = __webpack_require__(14)
	  , BUGGY = __webpack_require__(44).BUGGY
	  , forOf = __webpack_require__(66)
	  , species = __webpack_require__(59)
	  , assertInstance = __webpack_require__(19).inst;

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = $.g[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  function fixMethod(KEY){
	    var fn = proto[KEY];
	    __webpack_require__(15)(proto, KEY,
	      KEY == 'delete' ? function(a){ return fn.call(this, a === 0 ? 0 : a); }
	      : KEY == 'has' ? function has(a){ return fn.call(this, a === 0 ? 0 : a); }
	      : KEY == 'get' ? function get(a){ return fn.call(this, a === 0 ? 0 : a); }
	      : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	      : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  }
	  if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    __webpack_require__(68)(C.prototype, methods);
	  } else {
	    var inst  = new C
	      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
	      , buggyZero;
	    // wrap for init collections from iterable
	    if(!__webpack_require__(54)(function(iter){ new C(iter); })){ // eslint-disable-line no-new
	      C = wrapper(function(target, iterable){
	        assertInstance(target, C, NAME);
	        var that = new Base;
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    IS_WEAK || inst.forEach(function(val, key){
	      buggyZero = 1 / key === -Infinity;
	    });
	    // fix converting -0 key to +0
	    if(buggyZero){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    // + fix .add & .set for chaining
	    if(buggyZero || chain !== inst)fixMethod(ADDER);
	  }

	  __webpack_require__(10).set(C, NAME);

	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F * (C != Base), O);
	  species(C);
	  species($.core[NAME]); // for wrapper

	  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(70);

	// 23.2 Set Objects
	__webpack_require__(71)('Set', function(get){
	  return function Set(){ return get(this, arguments[0]); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $         = __webpack_require__(7)
	  , weak      = __webpack_require__(74)
	  , leakStore = weak.leakStore
	  , ID        = weak.ID
	  , WEAK      = weak.WEAK
	  , has       = $.has
	  , isObject  = $.isObject
	  , isExtensible = Object.isExtensible || isObject
	  , tmp       = {};

	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(71)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments[0]); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return leakStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this[ID]];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    __webpack_require__(15)(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = leakStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $         = __webpack_require__(7)
	  , safe      = __webpack_require__(13).safe
	  , assert    = __webpack_require__(19)
	  , forOf     = __webpack_require__(66)
	  , $has      = $.has
	  , isObject  = $.isObject
	  , hide      = $.hide
	  , isExtensible = Object.isExtensible || isObject
	  , id        = 0
	  , ID        = safe('id')
	  , WEAK      = safe('weak')
	  , LEAK      = safe('leak')
	  , method    = __webpack_require__(17)
	  , find      = method(5)
	  , findIndex = method(6);
	function findFrozen(store, key){
	  return find(store.array, function(it){
	    return it[0] === key;
	  });
	}
	// fallback for frozen keys
	function leakStore(that){
	  return that[LEAK] || hide(that, LEAK, {
	    array: [],
	    get: function(key){
	      var entry = findFrozen(this, key);
	      if(entry)return entry[1];
	    },
	    has: function(key){
	      return !!findFrozen(this, key);
	    },
	    set: function(key, value){
	      var entry = findFrozen(this, key);
	      if(entry)entry[1] = value;
	      else this.array.push([key, value]);
	    },
	    'delete': function(key){
	      var index = findIndex(this.array, function(it){
	        return it[0] === key;
	      });
	      if(~index)this.array.splice(index, 1);
	      return !!~index;
	    }
	  })[LEAK];
	}

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      $.set(assert.inst(that, C, NAME), ID, id++);
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    __webpack_require__(68)(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return leakStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return leakStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this[ID]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(assert.obj(key))){
	      leakStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that[ID]] = value;
	    } return that;
	  },
	  leakStore: leakStore,
	  WEAK: WEAK,
	  ID: ID
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(74);

	// 23.4 WeakSet Objects
	__webpack_require__(71)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments[0]); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(7)
	  , $def      = __webpack_require__(14)
	  , setProto  = __webpack_require__(32)
	  , $iter     = __webpack_require__(44)
	  , ITERATOR  = __webpack_require__(11)('iterator')
	  , ITER      = __webpack_require__(13).safe('iter')
	  , step      = $iter.step
	  , assert    = __webpack_require__(19)
	  , isObject  = $.isObject
	  , getProto  = $.getProto
	  , $Reflect  = $.g.Reflect
	  , _apply    = Function.apply
	  , assertObject = assert.obj
	  , _isExtensible = Object.isExtensible || isObject
	  , _preventExtensions = Object.preventExtensions
	  // IE TP has broken Reflect.enumerate
	  , buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));

	function Enumerate(iterated){
	  $.set(this, ITER, {o: iterated, k: undefined, i: 0});
	}
	$iter.create(Enumerate, 'Object', function(){
	  var iter = this[ITER]
	    , keys = iter.k
	    , key;
	  if(keys == undefined){
	    iter.k = keys = [];
	    for(key in iter.o)keys.push(key);
	  }
	  do {
	    if(iter.i >= keys.length)return step(1);
	  } while(!((key = keys[iter.i++]) in iter.o));
	  return step(0, key);
	});

	var reflect = {
	  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  },
	  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	  construct: function construct(target, argumentsList /*, newTarget*/){
	    var proto    = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = _apply.call(target, instance, argumentsList);
	    return isObject(result) ? result : instance;
	  },
	  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    assertObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  },
	  // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = $.getDesc(assertObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  },
	  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	  get: function get(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = $.getDesc(assertObject(target), propertyKey), proto;
	    if(desc)return $.has(desc, 'value')
	      ? desc.value
	      : desc.get === undefined
	        ? undefined
	        : desc.get.call(receiver);
	    return isObject(proto = getProto(target))
	      ? get(proto, propertyKey, receiver)
	      : undefined;
	  },
	  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(assertObject(target), propertyKey);
	  },
	  // 26.1.8 Reflect.getPrototypeOf(target)
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(assertObject(target));
	  },
	  // 26.1.9 Reflect.has(target, propertyKey)
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  },
	  // 26.1.10 Reflect.isExtensible(target)
	  isExtensible: function isExtensible(target){
	    return _isExtensible(assertObject(target));
	  },
	  // 26.1.11 Reflect.ownKeys(target)
	  ownKeys: __webpack_require__(77),
	  // 26.1.12 Reflect.preventExtensions(target)
	  preventExtensions: function preventExtensions(target){
	    assertObject(target);
	    try {
	      if(_preventExtensions)_preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  },
	  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	  set: function set(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , ownDesc  = $.getDesc(assertObject(target), propertyKey)
	      , existingDescriptor, proto;
	    if(!ownDesc){
	      if(isObject(proto = getProto(target))){
	        return set(proto, propertyKey, V, receiver);
	      }
	      ownDesc = $.desc(0);
	    }
	    if($.has(ownDesc, 'value')){
	      if(ownDesc.writable === false || !isObject(receiver))return false;
	      existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
	      existingDescriptor.value = V;
	      $.setDesc(receiver, propertyKey, existingDescriptor);
	      return true;
	    }
	    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	  }
	};
	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	if(setProto)reflect.setPrototypeOf = function setPrototypeOf(target, proto){
	  setProto.check(target, proto);
	  try {
	    setProto.set(target, proto);
	    return true;
	  } catch(e){
	    return false;
	  }
	};

	$def($def.G, {Reflect: {}});

	$def($def.S + $def.F * buggyEnumerate, 'Reflect', {
	  // 26.1.5 Reflect.enumerate(target)
	  enumerate: function enumerate(target){
	    return new Enumerate(assertObject(target));
	  }
	});

	$def($def.S, 'Reflect', reflect);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var $            = __webpack_require__(7)
	  , assertObject = __webpack_require__(19).obj;
	module.exports = function ownKeys(it){
	  assertObject(it);
	  var keys       = $.getNames(it)
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def      = __webpack_require__(14)
	  , $includes = __webpack_require__(20)(true);
	$def($def.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments[1]);
	  }
	});
	__webpack_require__(57)('includes');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/mathiasbynens/String.prototype.at
	'use strict';
	var $def = __webpack_require__(14)
	  , $at  = __webpack_require__(43)(true);
	$def($def.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(14)
	  , $pad = __webpack_require__(81);
	$def($def.P, 'String', {
	  lpad: function lpad(n){
	    return $pad(this, n, arguments[1], true);
	  }
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// http://wiki.ecmascript.org/doku.php?id=strawman:string_padding
	var $      = __webpack_require__(7)
	  , repeat = __webpack_require__(50);

	module.exports = function(that, minLength, fillChar, left){
	  // 1. Let O be CheckObjectCoercible(this value).
	  // 2. Let S be ToString(O).
	  var S = String($.assertDefined(that));
	  // 4. If intMinLength is undefined, return S.
	  if(minLength === undefined)return S;
	  // 4. Let intMinLength be ToInteger(minLength).
	  var intMinLength = $.toInteger(minLength);
	  // 5. Let fillLen be the number of characters in S minus intMinLength.
	  var fillLen = intMinLength - S.length;
	  // 6. If fillLen < 0, then throw a RangeError exception.
	  // 7. If fillLen is +???, then throw a RangeError exception.
	  if(fillLen < 0 || fillLen === Infinity){
	    throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
	  }
	  // 8. Let sFillStr be the string represented by fillStr.
	  // 9. If sFillStr is undefined, let sFillStr be a space character.
	  var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
	  // 10. Let sFillVal be a String made of sFillStr, repeated until fillLen is met.
	  var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
	  // truncate if we overflowed
	  if(sFillVal.length > fillLen)sFillVal = left
	    ? sFillVal.slice(sFillVal.length - fillLen)
	    : sFillVal.slice(0, fillLen);
	  // 11. Return a string made from sFillVal, followed by S.
	  // 11. Return a String made from S, followed by sFillVal.
	  return left ? sFillVal.concat(S) : S.concat(sFillVal);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $def = __webpack_require__(14)
	  , $pad = __webpack_require__(81);
	$def($def.P, 'String', {
	  rpad: function rpad(n){
	    return $pad(this, n, arguments[1], false);
	  }
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $def = __webpack_require__(14);
	$def($def.S, 'RegExp', {
	  escape: __webpack_require__(21)(/[\\^$*+?.()|[\]{}]/g, '\\$&', true)
	});


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $       = __webpack_require__(7)
	  , $def    = __webpack_require__(14)
	  , ownKeys = __webpack_require__(77);

	$def($def.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O      = $.toObject(object)
	      , result = {};
	    $.each.call(ownKeys(O), function(key){
	      $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
	    });
	    return result;
	  }
	});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $    = __webpack_require__(7)
	  , $def = __webpack_require__(14);
	function createObjectToArray(isEntries){
	  return function(object){
	    var O      = $.toObject(object)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = Array(length)
	      , key;
	    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	    else while(length > i)result[i] = O[keys[i++]];
	    return result;
	  };
	}
	$def($def.S, 'Object', {
	  values:  createObjectToArray(false),
	  entries: createObjectToArray(true)
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(87)('Map');

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(14)
	  , forOf = __webpack_require__(66);
	module.exports = function(NAME){
	  $def($def.P, NAME, {
	    toJSON: function toJSON(){
	      var arr = [];
	      forOf(this, false, arr.push, arr);
	      return arr;
	    }
	  });
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(87)('Set');

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(7)
	  , $def    = __webpack_require__(14)
	  , $Array  = $.core.Array || Array
	  , statics = {};
	function setStatics(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = __webpack_require__(18)(Function.call, [][key], length);
	  });
	}
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill,turn');
	$def($def.S, 'Array', statics);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var $         = __webpack_require__(7)
	  , $def      = __webpack_require__(14)
	  , invoke    = __webpack_require__(16)
	  , partial   = __webpack_require__(91)
	  , navigator = $.g.navigator
	  , MSIE      = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	function wrap(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      $.isFunction(fn) ? fn : Function(fn)
	    ), time);
	  } : set;
	}
	$def($def.G + $def.B + $def.F * MSIE, {
	  setTimeout:  wrap($.g.setTimeout),
	  setInterval: wrap($.g.setInterval)
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(7)
	  , invoke = __webpack_require__(16)
	  , assertFunction = __webpack_require__(19).fn;
	module.exports = function(/* ...pargs */){
	  var fn     = assertFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = $.path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !_length)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(_length > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var $def  = __webpack_require__(14)
	  , $task = __webpack_require__(67);
	$def($def.G + $def.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	var $           = __webpack_require__(7)
	  , Iterators   = __webpack_require__(44).Iterators
	  , ITERATOR    = __webpack_require__(11)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);

	    generator._invoke = makeInvokeMethod(
	      innerFn, self || null,
	      new Context(tryLocsList || [])
	    );

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;

	    function enqueue(method, arg) {
	      var enqueueResult =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(function() {
	          return invoke(method, arg);
	        }) : new Promise(function(resolve) {
	          resolve(invoke(method, arg));
	        });

	      // Avoid propagating enqueueResult failures to Promises returned by
	      // later invocations of the iterator.
	      previousPromise = enqueueResult["catch"](function(ignored){});

	      return enqueueResult;
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(95)))

/***/ },
/* 95 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./admin-mailchimp-com": 98,
		"./admin-mailchimp-com.js": 98,
		"./app-e2ma-net": 99,
		"./app-e2ma-net.js": 99,
		"./checklist-test-dev": 100,
		"./checklist-test-dev.js": 100,
		"./cloud-goacoustic-com": 101,
		"./cloud-goacoustic-com.js": 101,
		"./createsend-com": 104,
		"./createsend-com.js": 104,
		"./eloqua-com": 105,
		"./eloqua-com.js": 105,
		"./exacttarget-com": 108,
		"./exacttarget-com.js": 108,
		"./experience-adobe-com": 109,
		"./experience-adobe-com.js": 109,
		"./ibm-com": 110,
		"./ibm-com.js": 110,
		"./interact2-responsys-net": 111,
		"./interact2-responsys-net.js": 111,
		"./interact5-responsys-net": 113,
		"./interact5-responsys-net.js": 113,
		"./interact8-responsys-net": 114,
		"./interact8-responsys-net.js": 114,
		"./interact9-responsys-net": 115,
		"./interact9-responsys-net.js": 115,
		"./klaviyo-com": 116,
		"./klaviyo-com.js": 116,
		"./litmus-com": 117,
		"./litmus-com.js": 117,
		"./litmus-dev": 118,
		"./litmus-dev.js": 118,
		"./mail-google-com": 119,
		"./mail-google-com.js": 119,
		"./mandrillapp-com": 120,
		"./mandrillapp-com.js": 120,
		"./marketodesigner-com": 121,
		"./marketodesigner-com.js": 121,
		"./pi-pardot-com": 132,
		"./pi-pardot-com.js": 132,
		"./responsys-provider": 112,
		"./responsys-provider.js": 112,
		"./sendgrid-com": 133,
		"./sendgrid-com.js": 133,
		"./silverpop-com": 134,
		"./silverpop-com.js": 134,
		"./ui-constantcontact-com": 135,
		"./ui-constantcontact-com.js": 135
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 97;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	exports.__esModule = true;
	const jQuery = __webpack_require__(96);

	var MailchimpProvider = (function () {
	  function MailchimpProvider() {
	    babelHelpers.classCallCheck(this, MailchimpProvider);

	    this.editable = false;
	    this.id = this.getTemplateId;
	  }

	  MailchimpProvider.prototype.getParameterByName = function getParameterByName(name) {
	    name = name.replace(/[\\[]/, '\\\\[').replace(/[\\]]/, '\\\\]');
	    var regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)');
	    var results = regex.exec(location.search);
	    return decodeURIComponent(results[1].replace(/\\+/g, ' '));
	  };

	  MailchimpProvider.prototype.urlForPath = function urlForPath(path) {
	    var prefix = window.location.origin + '/campaigns/';
	    var campaignId = this.getParameterByName('id');
	    return '' + prefix + path + '?id=' + campaignId;
	  };

	  MailchimpProvider.prototype.getTemplateId = function getTemplateId() {
	    var matchData = window.location.search.match(/\?.*id=(\d+)/);
	    if (matchData !== null) {
	      return matchData[1];
	    } else {
	      return null;
	    }
	  };

	  MailchimpProvider.prototype.isOnTemplatePath = function isOnTemplatePath() {
	    var match = window.location.pathname.match(/templates\/(edit|design)/);
	    return match !== null;
	  };

	  MailchimpProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    if (this.isOnTemplatePath()) {
	      this.templateLookup(options);
	    } else {
	      this.normalLookup(options);
	    }
	  };

	  MailchimpProvider.prototype.templateLookup = function templateLookup(options) {
	    var templateId = this.getTemplateId();
	    jQuery.get('/templates/preview?id=' + templateId).done(function (html) {
	      var result = {
	        content: html,
	        text: ' ',
	        subject: ' ',
	        fromName: ' ',
	        fromEmail: ' ',
	        id: templateId
	      };
	      window.postMessage({
	        method: 'checklist-lookupResult',
	        result: result,
	        testType: options.testType || 'checklist'
	      }, '*');
	      window.postMessage({ method: 'checklist-skipFirstImpressionsSection' }, '*');
	    });
	  };

	  MailchimpProvider.prototype.normalLookup = function normalLookup(options) {
	    var _this = this;

	    var subject = null,
	        fromName = null,
	        fromEmail = null,
	        $fromData = null;

	    if (jQuery('input[name="content[subject]"]').length) {
	      subject = jQuery('input[name="content[subject]"]').val();
	    }

	    if (jQuery('input[name="content[from_name]"]').length) {
	      fromName = jQuery('input[name="content[from_name]"]').val();
	    }

	    if (jQuery('input[name="content[from_email]"]').length) {
	      fromEmail = jQuery('input[name="content[from_email]"]').val();
	    }

	    jQuery.get(this.urlForPath('wizard/setup')).done(function (fromData) {
	      var $fromData = jQuery(fromData);
	      if (fromName === null) {
	        fromName = $fromData.find('#from-name').val();
	      }
	      if (fromEmail === null) {
	        fromEmail = $fromData.find('#from-email').val();
	      }

	      if (subject === null) {
	        subject = $fromData.find('#subject').val();
	      }

	      // Sample response: {"member_id":79809301,"email":"kevin@litmus.com","is_last":true}
	      jQuery.get(_this.urlForPath('preview-recipient') + '&pos=0').done(function (recipient) {
	        jQuery.get(_this.urlForPath('preview-content-html') + '&e=' + recipient.member_id).done(function (html) {

	          var result = {
	            content: html,
	            text: '',
	            subject: subject,
	            fromName: fromName,
	            fromEmail: fromEmail,
	            id: _this.id()
	          };

	          window.postMessage({
	            method: 'checklist-lookupResult',
	            result: result,
	            testType: options.testType || 'checklist'
	          }, '*');
	        });
	      });
	    });
	  };

	  MailchimpProvider.prototype.injectCSS = function injectCSS() {
	    jQuery('body').append('\n      <style id=\'checklist-injected-css\'>\n\n        #paste-code > .template-meta, #import-file > .template-meta, #import-url > .template-meta {\n          padding-bottom: 100%;\n        }\n\n        #import-zip {\n          left: 200px!important;\n          top: 50px!important;\n        }\n\n        .topsliderpane-container.filemanager-container {\n          width: inherit;\n        }\n\n        .dijitDialog {\n          left: 200px!important;\n        }\n      </style>\n    ');
	  };

	  MailchimpProvider.prototype.getAccountInfo = function getAccountInfo(callback) {
	    var accountUrl = window.location.origin + '/account/profile/';
	    jQuery.get(accountUrl).done(function (page) {
	      var $page = jQuery(page);
	      var username = null;
	      var email = null;
	      var $usernameInput = $page.find('#username');
	      if ($usernameInput) {
	        username = $usernameInput.val();
	      }
	      var $emailInput = $page.find('#email');
	      if ($emailInput) {
	        email = $emailInput.val();
	      }
	      callback({ name: 'MailChimp', username: username, email: email, campaign_url: window.location.origin + '/campaigns' });
	    }).fail(function (error) {
	      //console.log("Failed to Retrieve Account Page!!!", accountUrl);
	    });
	  };

	  return MailchimpProvider;
	})();

	exports['default'] = MailchimpProvider;

	window.ChecklistProvider = new MailchimpProvider();
		module.exports = exports['default'];

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	var EmmaProvider = (function () {
	  function EmmaProvider() {
	    babelHelpers.classCallCheck(this, EmmaProvider);

	    this.editable = false;
	    this.id = this.getCampaignId;
	  }

	  EmmaProvider.prototype.getCampaignId = function getCampaignId() {
	    // Example: app2/campaigns/review_send/209207486/
	    var idMatch = window.location.href.match(/app2\/campaigns\/[^/]+\/([0-9]+)/);
	    if (idMatch) {
	      return idMatch[1];
	    } else {
	      return null;
	    }
	  };

	  EmmaProvider.prototype.lookup = function lookup() {
	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var campaignId = this.getCampaignId();
	    var previewPath = '/app2/campaigns/preview_iframe/' + campaignId;

	    jQuery.get(previewPath).done(function (html) {
	      // Emma injects script tags inside the iframe HTML head,
	      // so we pass script tests via decapitation
	      html = html.replace(/<head>[\s\S]*<\/head>/, '');

	      var result = {
	        content: html,
	        text: '',
	        subject: '',
	        fromName: null,
	        fromEmail: null
	      };
	      var getDataFn = null;
	      if (window.location.pathname.indexOf('campaigns/review_send') !== -1) {
	        getDataFn = _this.fetchDataFromCurrentWindow();
	      } else {
	        getDataFn = _this.fetchReviewPageData();
	      }

	      getDataFn(function (data) {
	        result = jQuery.extend(result, data);

	        window.postMessage({
	          method: 'checklist-lookupResult',
	          result: result,
	          testType: options.testType || 'checklist'
	        }, '*');
	      });
	    });
	  };

	  EmmaProvider.prototype.fetchDataFromCurrentWindow = function fetchDataFromCurrentWindow() {
	    return function (callback) {
	      var data = {};

	      if (jQuery('#review-form-subject').is(':visible')) {
	        data.subject = jQuery('#review-form-subject').val();
	      } else {
	        // Emma allows users to split-test subjects.
	        // Just use variation A for now.
	        data.subject = jQuery('#review-form-subject-a').val();
	      }

	      data.fromName = jQuery('#review-form-from-name').val();
	      data.fromEmail = jQuery('#review-form-from-email').val();

	      callback(data);
	    };
	  };

	  EmmaProvider.prototype.fetchReviewPageData = function fetchReviewPageData(callback) {
	    var _this2 = this;

	    return function (callback) {
	      campaignId = _this2.getCampaignId();
	      reviewDataPath = '/app2/campaigns/edit/campaigns/' + campaignId + '/';
	      jQuery.get(reviewDataPath).done(function (response) {
	        var data = {};
	        // This API call doesn't seem to know about subject split tests,
	        // so subject is always a string.
	        data.subject = response.data.mailing.subject;
	        data.fromName = response.data.mailing.from.name;
	        data.fromEmail = response.data.mailing.from.email;

	        callback(data);
	      });
	    };
	  };

	  EmmaProvider.prototype.injectCSS = function injectCSS() {
	    jQuery('body').append('\n      <style id=\'checklist-injected-css\'>\n        #canvas-header .limit {\n          min-width: 0px;\n          padding: 0 8px;\n        }\n\n        #site {\n          min-width: 0px;\n        }\n\n        #canvas-toolbar {\n          margin-left: 145px;\n          width: inherit;\n          padding: 0px 10px 0px 10px;\n        }\n\n        #canvas-header {\n          width: inherit!important;\n        }\n\n        .canvas-fixed #canvas-header {\n          max-width: 955px;\n        }\n\n        .limit > #canvas-options {\n          margin-left: 145px;\n        }\n\n        #mailing-create {\n          padding-left: 9px;\n          min-width: 0px;\n          padding-right: 9px;\n        }\n\n\n        #viewport {\n          margin-left: 145px;\n        }\n\n        #campaign-title {\n          width: 32%;\n        }\n\n        #canvas-toolbar .button.secondary>a, #canvas-toolbar .button.tertiary>a, #canvas-toolbar .button.primary>a {\n          font-size: 11px;\n          padding-left: 8px;\n          padding-right: 8px;\n        }\n\n        #preview {\n          margin-right: 5px;\n        }\n\n        #save {\n          margin-right: 5px;\n        }\n\n        #undo {\n          margin-right: 5px;\n        }\n\n        .e2ma-content-block-helper {\n          width: 100px;\n        }\n\n        .content-type-list {\n          margin-left: 0px;\n        }\n\n        #site-head-wrap {\n          width: 100%;\n        }\n\n       .ui-dialog.e2ma-modal-dialog {\n          width: 50%!important;\n          left:  100px!important;\n       }\n\n\n      input + #viewport {\n        margin-left: 0px;\n      }\n\n      .limit + #canvas-options {\n          margin-left: 0px;\n        }\n\n      #thumbnail-column {\n        width: 250px;\n      }\n\n      #review_form_format_chzn, #review_form_signup_form_chzn {\n        width: 250px;\n      }\n\n      #canvas-toolbar:only-child {\n        margin-left: 0px!important;\n      }\n\n      #recipient-list .e2ma-token-input-wrapper .e2ma-token-label {\n        bottom: 7px!important;\n      }\n\n      footer {\n        padding-top: 70px!important;\n      }\n      </style>\n    ');
	  };

	  return EmmaProvider;
	})();

		window.ChecklistProvider = new EmmaProvider();

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	var ChecklistTestPageProvider = (function () {
	  function ChecklistTestPageProvider() {
	    babelHelpers.classCallCheck(this, ChecklistTestPageProvider);

	    this.editable = false;
	  }

	  ChecklistTestPageProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var content = jQuery('#htmlContent').val();
	    var text = jQuery('#textContent').val();
	    var subject = jQuery('#subject').val();
	    var fromName = jQuery('#name').val();
	    var fromEmail = jQuery('#email').val();

	    var result = { content: content, text: text, subject: subject, fromName: fromName, fromEmail: fromEmail };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  return ChecklistTestPageProvider;
	})();

		window.ChecklistProvider = new ChecklistTestPageProvider();

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var Provider = __webpack_require__(102);

	var CloudGoacousticProvider = (function () {
	  function CloudGoacousticProvider() {
	    babelHelpers.classCallCheck(this, CloudGoacousticProvider);

	    this.editable = false;
	  }

	  CloudGoacousticProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var result = {
	      providerType: Provider.acousticName()
	    };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  return CloudGoacousticProvider;
	})();

		window.ChecklistProvider = new CloudGoacousticProvider();

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var _providersJson = __webpack_require__(103);

	var _providersJson2 = babelHelpers.interopRequireDefault(_providersJson);

	var Provider = (function () {
	  function Provider() {
	    babelHelpers.classCallCheck(this, Provider);
	  }

	  Provider.prototype.acousticName = function acousticName() {
	    return _providersJson2["default"]["cloud.goacoustic.com"].name;
	  };

	  Provider.prototype.adobeName = function adobeName() {
	    return _providersJson2["default"]["experience.adobe.com"].name;
	  };

	  Provider.prototype.eloquaName = function eloquaName() {
	    return _providersJson2["default"]["eloqua.com"].name;
	  };

	  Provider.prototype.ibmName = function ibmName() {
	    return _providersJson2["default"]["ibm.com"].name;
	  };

	  Provider.prototype.klaviyoName = function klaviyoName() {
	    return _providersJson2["default"]["klaviyo.com"].name;
	  };

	  Provider.prototype.pardotName = function pardotName() {
	    return _providersJson2["default"]["pi.pardot.com"].name;
	  };

	  return Provider;
	})();

		module.exports = new Provider();

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = {"checklist-test.dev":{"name":"Checklist Development","domain":"checklist-test.dev","path":"","active":true},"experience.adobe.com":{"name":"AdobeCampaign","domain":"experience.adobe.com","path":".*","code":"ad","api_code":"adobe_campaign","pardotSlug":"adobe_campaign","active":true},"createsend.com":{"name":"CreateSend","domain":"createsend.com","path":"campaigns\\/(create|design|gallery|send|createSend)\\/.*","finalPath":"campaigns/createSend/step4_2.aspx","code":"cs","api_code":"campaign_monitor","pardotSlug":"campaignmonitor","active":true},"admin.mailchimp.com":{"name":"MailChimp","domain":"admin.mailchimp.com","path":"(campaigns\\/wizard\\/(recipients|setup|template|html-paste|neapolitan|confirm)|templates\\/(edit|design))","finalPath":"campaigns\\/wizard\\/confirm","code":"mc","api_code":"mailchimp","pardotSlug":"mailchimp","active":true},"ui.constantcontact.com":{"name":"ConstantContact","domain":"ui.constantcontact.com","path":"rnavmap\\/emcf\\/email|rnavmap\\/evaluate\\.rnav","finalPath":"rnavmap\\/emcf\\/email\\/edit","code":"cc","active":true,"api_code":"constant_contact"},"pi.pardot.com":{"name":"Pardot","domain":"pi.pardot.com","path":"email\\/(.*)\\/(edit|test|send)\\/id","finalPath":"email\\/template\\/draft\\/send","code":"pt","active":true,"api_code":"pardot","pardotSlug":"pardot"},"litmus.com":{"name":"Litmus","domain":"litmus.com","path":"builder\\/documents\\/[0-9]+\\/edit","active":false},"litmus.dev":{"name":"Litmus","domain":"litmus.dev","path":"builder\\/documents","active":false},"mandrillapp.com":{"name":"Mandrill","domain":"mandrillapp.com","path":"templates\\/code","active":false,"api_code":"mandrill"},"sendgrid.com":{"name":"Sendgrid","domain":"sendgrid.com","path":"templates\\/[A-Za-z0-9-]+\\/versions\\/[A-Za-z0-9-]+\\/edit","code":"sg","active":true,"api_code":"send_grid"},"silverpop.com":{"name":"Silverpop","domain":"silverpop.com","path":"composeMailing\\d+\\.do|deliveryHub|ux\\/\\#\\/composer\\/[0-9]+","code":"sp","active":true,"enterprise":true,"api_code":"silverpop","pardotSlug":"ibmwatson"},"ibm.com":{"name":"IBM Watson","domain":"ibm.com","path":".*","code":"ibm","active":true,"enterprise":true,"api_code":"silverpop","pardotSlug":"ibmwatson"},"cloud.goacoustic.com":{"name":"Acoustic","domain":"cloud.goacoustic.com","path":".*","code":"ac","active":true,"enterprise":true,"api_code":"silverpop","pardotSlug":"ibmwatson"},"app.e2ma.net":{"name":"Emma","domain":"app.e2ma.net","path":"app2\\/campaigns\\/(create|review_send)\\/[0-9]+\\/?","finalPath":"app2\\/campaigns\\/review_send\\/[0-9]+\\/?","code":"em","active":true,"api_code":"emma"},"exacttarget.com":{"name":"Salesforce Marketing Cloud","domain":"exacttarget.com","path":"cloud\\/","code":"et","api_code":"exact_target","pardotSlug":"salesforce","active":true,"enterprise":true},"interact2.responsys.net":{"name":"Oracle Responsys","domain":"interact2.responsys.net","path":"emd\\/c\\/campaigndesigner\\/framework\\/page\\/launch","code":"ry","active":true,"enterprise":true,"api_code":"responsys","pardotSlug":"responsys"},"interact5.responsys.net":{"name":"Oracle Responsys","domain":"interact5.responsys.net","path":"emd\\/c\\/campaigndesigner\\/framework\\/page\\/launch","code":"ry","active":true,"enterprise":true,"api_code":"responsys","pardotSlug":"responsys"},"interact8.responsys.net":{"name":"Oracle Responsys","domain":"interact8.responsys.net","path":"emd\\/c\\/campaigndesigner\\/framework\\/page\\/launch","code":"ry","active":true,"enterprise":true,"api_code":"responsys","pardotSlug":"responsys"},"interact9.responsys.net":{"name":"Oracle Responsys","domain":"interact9.responsys.net","path":"emd\\/c\\/campaigndesigner\\/framework\\/page\\/launch","code":"ry","active":true,"enterprise":true,"api_code":"responsys","pardotSlug":"responsys"},"marketodesigner.com":{"name":"Marketo","domain":"marketodesigner.com","path":"(.*)#EM([TE]*)(.*)|email\\/templatePreview","code":"mo","active":true,"enterprise":true,"api_code":"marketo","pardotSlug":"marketo"},"eloqua.com":{"name":"Eloqua","domain":"eloqua.com","path":"Main.aspx","code":"el","api_code":"eloqua","pardotSlug":"eloqua","active":true,"enterprise":true},"klaviyo.com":{"name":"Klaviyo","domain":"klaviyo.com","path":"(.*)","code":"kl","api_code":"klaviyo","pardotSlug":"klaviyo","active":true,"enterprise":true}}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	exports.__esModule = true;
	const jQuery = __webpack_require__(96);

	var CampaignMonitorProvider = (function () {
	  function CampaignMonitorProvider() {
	    babelHelpers.classCallCheck(this, CampaignMonitorProvider);

	    this.editable = false;
	    this.id = this.getCampaignId;
	  }

	  CampaignMonitorProvider.prototype.getCampaignId = function getCampaignId() {
	    // Example: /campaigns/gallery/step2/AA84B178B26EAABF/s#import
	    var idMatch = window.location.href.match(/step[0-9]\/([A-Za-z0-9]+)/);
	    if (idMatch) {
	      return idMatch[1];
	    }

	    // Example: /campaigns/createSend/snapshot.aspx?cID=AA84B178B26EAABF
	    idMatch = window.location.href.match(/(cID|cid)=([A-Za-z0-9]+)/);
	    if (idMatch) {
	      return idMatch[2];
	    }

	    // Example: /campaigns/design/index/1e1eac4b0e2bf73?category=gallery-featured#/editor
	    idMatch = window.location.href.match(/campaigns\/design\/index\/([A-Za-z0-9]+)/);
	    if (idMatch) {
	      return idMatch[1];
	    }

	    return null;
	  };

	  CampaignMonitorProvider.prototype.lookup = function lookup() {
	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var entityId = this.getCampaignId();

	    if (entityId) {
	      (function () {
	        var snapshotUrl = '/campaigns/createSend/snapshot.aspx?cID=' + entityId;
	        var result = {};

	        const getPreviewPageFromSnapshot = function getPreviewPageFromSnapshot(snapshotData) {
	          var $snapshotHTML = jQuery(snapshotData);
	          var previewPopupURL = $snapshotHTML.find('a#htmlPreview').attr('href');
	          if (previewPopupURL) {
	            // Fetch the preview popup, which embeds an iframe containing the HTML email
	            return jQuery.get(previewPopupURL);
	          }

	          return jQuery.Deferred().reject('Could not find HTML preview link!');
	        };

	        const processSubjectAndSenderDetails = function processSubjectAndSenderDetails(snapshotData) {
	          var $snapshotHTML = jQuery(snapshotData);

	          result.subject = $snapshotHTML.find('.primary-form div.col:contains("Subject")').next().text().trim();
	          var fromNameAndEmail = $snapshotHTML.find('.primary-form div.col:contains("From")').next().text().trim();

	          // Parse name and email from "Test User <test@example.com>"
	          var nameEmailMatch = fromNameAndEmail.match(/([^<]+)<([^>]+)/);
	          if (nameEmailMatch) {
	            result.fromName = nameEmailMatch[1].trim();
	            result.fromEmail = nameEmailMatch[2].trim();
	          }

	          return getPreviewPageFromSnapshot(snapshotData);
	        };

	        const processPreviewPopup = function processPreviewPopup(previewPopupData) {
	          var $popupHTML = jQuery(previewPopupData);

	          var htmlPreviewURL = $popupHTML.find('iframe#htmlFrame').attr('src');
	          if (htmlPreviewURL) {
	            // Finally, fetch the HTML email from the iframe
	            return jQuery.get(htmlPreviewURL);
	          }
	          return jQuery.Deferred().reject('Could not find HTML preview iframe!');
	        };

	        const processHTMLPreview = function processHTMLPreview(htmlPreviewData) {
	          // Campaign Monitor injects two script tags which add target="_blank" to links in the preview,
	          // so we need to remove those to avoid breaking the 'script' check.
	          htmlPreviewData = htmlPreviewData.replace(/<script type="text\/javascript" src="https:\/\/js\.createsend.*<\/script>/, '');

	          result.content = htmlPreviewData;
	          result.text = '';
	          result.id = _this.id();

	          window.postMessage({
	            method: 'checklist-lookupResult',
	            result: result,
	            testType: options.testType || 'checklist'
	          }, '*');
	        };

	        if (_this.isOnCampaignAndSenderDetailsPage()) {
	          result.subject = $('input#Subject').val();
	          result.fromName = $('input#FromName').val();
	          result.fromEmail = $('input#fromEmailPrefix').val() + '@' + $('select#fromEmailDomain option[selected]').text();

	          jQuery.get(snapshotUrl).pipe(getPreviewPageFromSnapshot).pipe(processPreviewPopup).pipe(processHTMLPreview).fail(function (error) {
	            console.error(error);
	          });
	        } else {
	          // Fetch the snapshot page, which contains subject, from name, and email
	          jQuery.get(snapshotUrl).pipe(processSubjectAndSenderDetails).pipe(processPreviewPopup).pipe(processHTMLPreview).fail(function (error) {
	            console.error(error);
	          });
	        }
	      })();
	    } else {
	      console.error('Checklist Extension', 'Can\'t find entity id');
	    }
	  };

	  CampaignMonitorProvider.prototype.isOnCampaignAndSenderDetailsPage = function isOnCampaignAndSenderDetailsPage() {
	    var match = window.location.href.match(/step1\/([A-Za-z0-9]+)/);
	    return match !== null;
	  };

	  CampaignMonitorProvider.prototype.opened = function opened() {
	    jQuery('#emb-js-editor-header, #emb-editor-wrap').css('width', 'calc(100% - 470px)');
	  };

	  CampaignMonitorProvider.prototype.closed = function closed() {
	    jQuery('#emb-js-editor-header, #emb-editor-wrap').css('width', 'inherit');
	  };

	  CampaignMonitorProvider.prototype.injectCSS = function injectCSS() {
	    jQuery('body').append('\n      <style id=\'checklist-injected-css\'>\n        .wrap {\n          min-width: 0;\n        }\n\n        .wrap.content {\n          width: 90%;\n          padding: 0 5%;\n        }\n\n        .l-container {\n          min-width: 0;\n        }\n\n        #emb-body .emb-editor-header {\n          right: 0;\n        }\n\n        .primary-form-wrap.expanded > ul.primary-form { width: 60%!important; }\n\n        .l-grid.l-grid--gutter-huge {\n          margin-left: -14rem!important;\n        }\n\n        .litmus-checklist-expanded .l-container {\n          font-size: 10px;\n        }\n\n        .litmus-checklist-expanded .c-site-header__nav-main__link {\n          padding-left: 0.7rem;\n          padding-right: 0.7rem;\n        }\n\n        .galleryv2 .primary-form-wrap.expanded .primary-form textarea {\n          width: calc(100% - 21px);\n        }\n\n        @media screen and (max-width: 1320px) {\n          .litmus-checklist-expanded .l-container {\n            font-size: 9px;\n          }\n        }\n\n        .primary-form-wrap.message {\n          width: 100%;\n        }\n\n        a#editContent {\n          right: 0;\n        }\n\n        a#editCampaign {\n          right: 0;\n        }\n\n        a#addMoreRecipients {\n          right: 0;\n        }\n\n        #regular-content > .primary-form {\n          width: 100%!important;\n          margin: auto;\n        }\n\n        input#Name {\n          width: calc(100% - 25px);\n        }\n\n        input#Subject {\n          width: calc(100% - 25px);\n          padding-right: 13px!important;\n        }\n\n        input#FromName {\n          width: inherit;\n        }\n\n        input#fromEmailPrefix {\n          width: inherit;\n        }\n\n\n        form#step4 > ul.primary-form {\n          width: 100%;\n        }\n      </style>\n    ');

	    // @media screen and (max-width: 1400px) {
	    //   .primary-form-wrap { width: 756px; }
	    //   .primary-form { width: 724px; }
	    // }
	  };

	  CampaignMonitorProvider.prototype.getAccountInfo = function getAccountInfo(callback) {

	    const parseAccountInfo = function parseAccountInfo(page) {
	      var result = page.match(/(personData =)\s+(\[[^;]*);/);
	      var username = null;
	      var email = null;
	      var personData = null;
	      if (result && result[2]) {
	        personData = JSON.parse(result[2]);
	        email = personData[0].Email;
	        username = personData[0].Name;
	      }
	      if (personData) {
	        return { email: email, username: username };
	      } else {
	        return null;
	      }
	    };

	    const success = function success(email, username) {
	      callback({
	        name: 'CreateSend',
	        username: username,
	        email: email,
	        campaign_url: window.location.origin + '/campaigns'
	      });
	    };

	    const tryClientAccount = function tryClientAccount() {
	      var clientAccessAccountUrl = window.location.origin + '/settings/';
	      jQuery.get(clientAccessAccountUrl).done(function (page) {
	        var acc = parseAccountInfo(page);
	        if (acc !== null) {
	          success(acc.email, acc.username);
	        } else {
	          console.log('Failed to Retrive Account Page from url', clientAccessAccountUrl);
	        }
	      }).fail(function (error) {
	        console.log('Failed to Retrieve Account Page from url', clientAccessAccountUrl);
	      });
	    };

	    const tryNormalAccount = function tryNormalAccount() {
	      var normalAccountUrl = window.location.origin + '/team/';
	      jQuery.get(normalAccountUrl).done(function (page) {
	        var acc = parseAccountInfo(page);
	        if (acc !== null) {
	          success(acc.email, acc.username);
	        } else {
	          console.log('Failed to Retrive Account Page from url', normalAccountUrl);
	          tryClientAccount();
	        }
	      }).fail(function (error) {
	        console.log('Failed to Retrieve Account Page from url', normalAccountUrl);
	        tryClientAccount();
	      });
	    };

	    var adminAccountUrl = window.location.origin + '/admin/account/';
	    jQuery.get(adminAccountUrl).done(function (page) {
	      var acc = parseAccountInfo(page);
	      if (acc !== null) {
	        success(acc.email, acc.username);
	      } else {
	        console.log('Failed to Retrive Account Page from url', adminAccountUrl);
	        tryNormalAccount();
	      }
	    }).fail(function (error) {
	      console.log('Failed to Retrive Account Page from url', adminAccountUrl);
	      tryNormalAccount();
	    });
	  };

	  return CampaignMonitorProvider;
	})();

	exports['default'] = CampaignMonitorProvider;

	window.ChecklistProvider = new CampaignMonitorProvider();
		module.exports = exports['default'];

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var _jquery = __webpack_require__(96);

	var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

	var Provider = __webpack_require__(102);
	const debounce = __webpack_require__(106);
	const Utils = __webpack_require__(107);

	var EloquaProvider = (function () {
	  function EloquaProvider() {
	    babelHelpers.classCallCheck(this, EloquaProvider);

	    this.editable = false;
	    this.onEmailPage = false;
	    this.debounceDelay = 1500;
	    this.rendered = false;
	    this.onDashboard = false;
	    this.currentMarkup = null;
	    this.currentId = null;

	    this.initHashChangeListener();
	  }

	  EloquaProvider.prototype.lookup = function lookup() {
	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    this.rendered = false;
	    this.currentMarkup = null;
	    // manual check in case we open the plugin on an already-loaded page
	    // delayed so that it won't interfere with the observer
	    setTimeout(function () {
	      _this.handleCurrentPage();
	    }, this.debounceDelay);

	    var observer = new MutationObserver(function (mutations) {
	      mutations.forEach(function (mutation) {
	        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
	          _this.handleCurrentPage();
	        }
	      });
	    });

	    var config = {
	      attributes: true,
	      childList: true,
	      characterData: true,
	      subtree: true
	    };

	    observer.observe(document.body, config);
	  };

	  EloquaProvider.prototype.initHashChangeListener = function initHashChangeListener() {
	    var _this2 = this;

	    _jquery2['default'](window).on('hashchange', function () {
	      _this2.currentMarkup = null;
	      if (window.location.hash.match(/emails&id=(.*)/)) {
	        _this2.onEmailPage = true;
	      } else {
	        _this2.onEmailPage = false;
	      }
	    });
	  };

	  EloquaProvider.prototype.initCurrentMarkupListener = function initCurrentMarkupListener() {
	    var _this3 = this;

	    var timer = setInterval(function () {
	      if (_this3.currentMarkup) {
	        Utils.postMessageToIframeWindow({ method: 'checklist-showRetestButton' }, '*');
	      } else {
	        Utils.postMessageToIframeWindow({ method: 'checklist-hideRetestButton' }, '*');
	        clearInterval(timer);
	      }
	    }, 1000);
	  };

	  EloquaProvider.prototype.handleCurrentPage = function handleCurrentPage() {
	    var _this4 = this;

	    debounce('handleCurrentPage', this.debounceDelay, function () {
	      if (_this4.onEmailPage) {
	        var id = window.location.href.match(/id=(.*)/)[1];

	        // if coming from dashboard, fetch inital content if initial html is blank
	        if (_this4.onDashboard) {
	          Utils.postMessageToIframeWindow({ method: 'checklist-show-checklist' }, '*');
	          if (!_this4.currentMarkup) {
	            _this4.lookup();
	            Utils.postMessageToIframeWindow({ method: 'checklist-hideRetestButton' }, '*');
	          } else {
	            Utils.postMessageToIframeWindow({ method: 'checklist-showRetestButton' }, '*');
	          }
	        } else if (!_this4.currentMarkup) {
	          var result = {
	            providerType: Provider.eloquaName()
	          };

	          window.postMessage({
	            method: 'checklist-lookupResult',
	            result: result,
	            testType: 'checklist'
	          }, '*');

	          _this4.initCurrentMarkupListener();
	        }

	        // show retest button if we've changed to a different email
	        if (_this4.currentId !== id) {
	          Utils.postMessageToIframeWindow({ method: 'checklist-showRetestButton' }, '*');
	        }

	        _this4.onDashboard = false;
	        _this4.currentId = id;
	      } else {
	        Utils.postMessageToIframeWindow({ method: 'checklist-handle-unsupported-dashboard' }, '*');
	        _this4.onDashboard = true;
	      }
	      _this4.rendered = true;
	    });
	  };

	  EloquaProvider.prototype.id = function id() {
	    var matchData = window.location.href.match(/emails\&id=(\d+)/);
	    if (matchData !== null) {
	      return matchData[1];
	    }
	  };

	  return EloquaProvider;
	})();

		window.ChecklistProvider = new EloquaProvider();

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * debounce 0.2.0 by Louy Alakkad
	 * https://github.com/louy/debounce/
	 */
	(function(root, factory) {
	  /* global define */
	  /*istanbul ignore next*/
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.debounce = factory();
	  }
	}(this, function() {

	  /**
	   * debounce( id, delay, fn );
	   *   run fn after delay, it will cancel and override (debounce)
	   *   previous one with same id.
	   * debounce( id, true );
	   *   run fn with specified id instantly, cancel specified delay earlier.
	   * debounce( id );
	   *   cancel fn with specified delay.
	   *
	   * fn can return any of the following:
	   * - true(ish) : re-schedule the same fn after the same delay.
	   * - number    : re-schedule the same fn after (number) delay.
	   * - false(ish): don't re-schedule anything.
	   *
	   * if fn overrides the same id (i.e. calls debounce() with the same id) then
	   *   return value will be ignored.
	   */

	  var version = '0.2.0',
	  s = {};

	  function cb() {
	    var prevID = this.id,
	        exec = this.fn(this.run);
	    ++this.run;

	    if (prevID !== this.id) {
	      // detected override, cancel
	      return;
	    }

	    if (typeof exec === 'number') {
	      // re-schedule after (number) ms.
	      this.delay = exec;
	      exec = true;
	    }

	    if (!!exec) {
	      // reschedule
	      this.set();
	    } else {
	      // remove
	      delete this.fn;
	    }
	  }

	  var debounce = function(id, delay, fn) {

	    if (id && !fn) {
	      if (s[id]) {
	        if (delay === true) { // call instantly
	          clearTimeout(s[id].id);
	          s[id].cb();
	        } else { // cancel
	          clearTimeout(s[id].id);
	          s[id] = false;
	        }
	      }

	      return;
	    }

	    if (s[id]) {
	      clearTimeout(s[id].id);
	      s[id].fn = fn;
	      if (delay) {
	        s[id].delay = delay;
	      }
	    } else {
	      s[id] = {
	        fn: fn,
	        delay: delay,
	        run: 0,
	        set: function() {
	          return (this.id = setTimeout(this.cb, this.delay));
	        },
	      };
	    }

	    s[id].cb = function() {
	      cb.apply(s[id]);
	    };

	    s[id].set();
	  };

	  debounce.version = version;
	  debounce.isSet = function(id) {
	    return s.hasOwnProperty(id) && !!s[id].fn;
	  };

	  return debounce;
	}));


/***/ },
/* 107 */
/***/ function(module, exports) {

	var Utils = (function () {
	  function Utils() {
	    babelHelpers.classCallCheck(this, Utils);
	  }

	  // Get the contentWindow of the iframe

	  Utils.prototype.postMessageToIframeWindow = function postMessageToIframeWindow() {
	    var iframe = document.getElementById('inject-litmus-checklist-iframe');
	    if (iframe && iframe.contentWindow) {
	      var _iframe$contentWindow;

	      (_iframe$contentWindow = iframe.contentWindow).postMessage.apply(_iframe$contentWindow, arguments);
	    }
	  };

	  Utils.prototype.recordPageAction = function recordPageAction(action, attributes) {
	    this.postMessageToIframeWindow({ method: 'checklist-recordPageAction', action: action, attributes: attributes }, '*');
	  };

	  return Utils;
	})();

		module.exports = new Utils();

/***/ },
/* 108 */
/***/ function(module, exports) {

	exports.__esModule = true;

	var ExactTargetProvider = (function () {
	  function ExactTargetProvider() {
	    babelHelpers.classCallCheck(this, ExactTargetProvider);

	    this.editable = false;
	    this.firstRun = true;
	    this.originalMarkup = null;
	    this.onDashboard = false;

	    window.postMessage({ method: 'checklist-exacttargetClearContent' }, '*');
	  }

	  ExactTargetProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    // due to our usage of the chrome storage api, we need to send a message to the background scripts and
	    // handle the lookup there
	    window.postMessage({ method: 'checklist-exacttargetFetchContent', data: { options: options } }, '*');
	  };

	  return ExactTargetProvider;
	})();

	exports['default'] = ExactTargetProvider;

	window.ChecklistProvider = new ExactTargetProvider();
		module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var Provider = __webpack_require__(102);

	var AdobeCampaignProvider = (function () {
	  function AdobeCampaignProvider() {
	    babelHelpers.classCallCheck(this, AdobeCampaignProvider);
	  }

	  AdobeCampaignProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var result = {
	      providerType: Provider.adobeName()
	    };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  return AdobeCampaignProvider;
	})();

	if (undefined) {
	  module.exports = AdobeCampaignProvider;
	} else {
	  window.ChecklistProvider = new AdobeCampaignProvider();
	}

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var Provider = __webpack_require__(102);

	var IbmProvider = (function () {
	  function IbmProvider() {
	    babelHelpers.classCallCheck(this, IbmProvider);

	    this.editable = false;
	  }

	  IbmProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var result = {
	      providerType: Provider.ibmName()
	    };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  return IbmProvider;
	})();

		window.ChecklistProvider = new IbmProvider();

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var _responsysProvider = __webpack_require__(112);

		window.ChecklistProvider = new _responsysProvider.ResponsysProvider();

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	exports.__esModule = true;
	const jQuery = __webpack_require__(96);
	const Utils = __webpack_require__(107);

	var ResponsysProvider = (function () {
	  function ResponsysProvider() {
	    babelHelpers.classCallCheck(this, ResponsysProvider);

	    this.editable = false;
	    this.hasRun = false;
	    this.onNewPage = false;
	    this.sidebarOnDashboard = false;
	    this.ckEventsAdded = false;

	    this.html = null;
	    this.subject = null;
	    this.fromEmail = null;
	    this.fromName = null;

	    this.globals = null;
	  }

	  ResponsysProvider.prototype.getGlobals = function getGlobals() {
	    this.globals = {};
	    if (window.g_globalsFromJsp) {
	      this.globals = window.g_globalsFromJsp.campaignJson.messageSummary;
	    }
	    return this.globals;
	  };

	  ResponsysProvider.prototype.getSubject = function getSubject() {
	    if (!this.subject) {
	      this.subject = jQuery('input#subject-inputEl').val() || this.getGlobals().subjectLine;
	    }
	    return this.subject;
	  };

	  ResponsysProvider.prototype.getFromEmail = function getFromEmail() {
	    if (!this.fromEmail) {
	      this.fromEmail = this.getGlobals().fromAddress;
	    }
	    return this.fromEmail;
	  };

	  ResponsysProvider.prototype.getFromName = function getFromName() {
	    if (!this.fromName) {
	      this.fromName = this.getGlobals().fromName;
	    }
	    return this.fromName;
	  };

	  ResponsysProvider.prototype.getContent = function getContent() {
	    if (!this.html) {
	      if (window.CKEDITOR && window.CKEDITOR.instances['html-canvas-editor']) {
	        this.html = window.CKEDITOR.instances['html-canvas-editor'].getData();
	        this.onNewPage = false;
	      } else if (jQuery('#emailHtmlContainer-targetEl iframe').length && !jQuery('div[id*="loadmask-"]').filter(':visible').length) {
	        // preview page
	        var content = jQuery('#emailHtmlContainer-targetEl iframe').contents().find('html').html();
	        if (content !== '<head></head><body></body>') {
	          this.html = content;
	        }
	        this.onNewPage = false;
	      } else if (jQuery('.CodeMirror')[0]) {
	        editor = jQuery('.CodeMirror')[0].CodeMirror;
	        this.html = editor.getValue();
	        this.onNewPage = false;
	      }
	    }
	    return this.html;
	  };

	  ResponsysProvider.prototype.sendDataIfReady = function sendDataIfReady() {
	    // as long as we have html and this is the first run, run the test
	    if (this.getContent() && !this.hasRun) {
	      // switch sidebar page to checklist if we're coming from the dashboard
	      if (this.sidebarOnDashboard) {
	        Utils.postMessageToIframeWindow({ method: 'checklist-show-checklist' }, '*');
	        this.sidebarOnDashboard = false;
	      }

	      var result = {
	        content: this.getContent(),
	        text: '',
	        subject: this.getSubject(),
	        fromName: this.getFromName(),
	        fromEmail: this.getFromEmail(),
	        id: this.id()
	      };

	      window.postMessage({
	        method: 'checklist-lookupResult',
	        result: result,
	        testType: 'checklist'
	      }, '*');
	      this.hasRun = true;
	    } else {
	      return;
	    }
	  };

	  ResponsysProvider.prototype.applyCKEvents = function applyCKEvents() {
	    // if ckeditor is detected, set up listeners
	    if (!this.ckEventsAdded && window.CKEDITOR && window.CKEDITOR.instances['html-canvas-editor']) {
	      for (var i in CKEDITOR.instances) {
	        CKEDITOR.instances[i].on('change', function () {
	          if (jQuery('.x-btn-pressed').text() === 'Visual') {
	            window.postMessage({ method: 'checklist-showRetestButton' }, '*');
	          }
	        });
	      }
	      this.ckEventsAdded = true;
	    }
	  };

	  ResponsysProvider.prototype.applyTimeout = function applyTimeout() {
	    var _this = this;

	    setTimeout(function () {
	      if (jQuery('.mdf-from-library-icon').filter(':visible').length && jQuery('.mdf-from-library-icon').css('visibility') !== 'hidden' && !_this.html) {
	        _this.html = '&nbsp;';
	        _this.sendDataIfReady();
	        _this.onNewPage = true;
	      } else if (!_this.html) {
	        Utils.postMessageToIframeWindow({ method: 'checklist-show-dashboard' }, '*');
	        _this.hasRun = false;
	        _this.sidebarOnDashboard = true;
	      }
	    }, 5000);
	  };

	  ResponsysProvider.prototype.lookup = function lookup() {
	    var _this2 = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    this.hasRun = false;
	    this.html = null;
	    this.subject = null;
	    this.fromEmail = null;
	    this.fromName = null;

	    // send data now if page is already loaded
	    this.sendDataIfReady();

	    // observe page changes, and send data once page is loaded
	    var observer = new MutationObserver(function (mutations) {
	      mutations.forEach(function (mutation) {
	        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
	          // if we are coming from the "new campaign" page, show retest button
	          if (jQuery(mutation.target).hasClass('cke_contents') && _this2.onNewPage) {
	            window.postMessage({ method: 'checklist-showRetestButton' }, '*');
	          }

	          _this2.applyCKEvents();
	          _this2.sendDataIfReady();
	        }
	      });
	    });

	    var config = {
	      attributes: true,
	      childList: true,
	      characterData: true,
	      subtree: true
	    };

	    observer.observe(document.body, config);

	    // on the first page of create flow with no html
	    // technically the user should be able to run a test since we're on the first page of the email context
	    // so we should make sure it doesn't timeout if they run one for some reason
	    this.applyTimeout();
	  };

	  ResponsysProvider.prototype.id = function id() {
	    var matchData = window.location.search.match(/\?.*campaignId=(\d+)/);
	    if (matchData !== null) {
	      return matchData[1];
	    }
	  };

	  return ResponsysProvider;
	})();

	exports.ResponsysProvider = ResponsysProvider;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var _responsysProvider = __webpack_require__(112);

		window.ChecklistProvider = new _responsysProvider.ResponsysProvider();

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var _responsysProvider = __webpack_require__(112);

		window.ChecklistProvider = new _responsysProvider.ResponsysProvider();

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var _responsysProvider = __webpack_require__(112);

		window.ChecklistProvider = new _responsysProvider.ResponsysProvider();

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	const Provider = __webpack_require__(102);

	var KlaviyoProvider = (function () {
	  function KlaviyoProvider() {
	    babelHelpers.classCallCheck(this, KlaviyoProvider);
	  }

	  KlaviyoProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var result = {
	      providerType: Provider.klaviyoName()
	    };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	    window.postMessage({ method: 'checklist-skipFirstImpressionsSection' }, '*');
	  };

	  return KlaviyoProvider;
	})();

	if (undefined) {
	  module.exports = KlaviyoProvider;
	} else {
	  window.ChecklistProvider = new KlaviyoProvider();
	}

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	var LitmusComProvider = (function () {
	  function LitmusComProvider() {
	    babelHelpers.classCallCheck(this, LitmusComProvider);

	    this.editable = false;
	    this.editFrom = null;
	  }

	  LitmusComProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var subjectAndContent = window.checklistSubjectAndContent();
	    var result = {
	      subject: subjectAndContent.subject,
	      content: subjectAndContent.html,
	      text: subjectAndContent.text,
	      fromName: null,
	      fromEmail: null
	    };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  LitmusComProvider.prototype.editContent = function editContent(previousValue, newValue) {
	    var editor = window.editor.cm_editor;
	    editor.setValue(editor.getValue().replace('' + previousValue, '' + newValue));
	  };

	  LitmusComProvider.prototype.editSubject = function editSubject(subject) {
	    var $title = jQuery('input#title');
	    jQuery('#documents .document.current > a.display.clickable').text(subject);
	    $title.val(subject);
	    $title.trigger('focusout');
	  };

	  return LitmusComProvider;
	})();

		window.ChecklistProvider = new LitmusComProvider();

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	var LitmusDevProvider = (function () {
	  function LitmusDevProvider() {
	    babelHelpers.classCallCheck(this, LitmusDevProvider);

	    this.editable = false;
	    this.editFrom = null;
	  }

	  LitmusDevProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var subjectAndContent = window.checklistSubjectAndContent();
	    var result = {
	      subject: subjectAndContent.subject,
	      content: subjectAndContent.html,
	      text: subjectAndContent.text,
	      fromName: null,
	      fromEmail: null
	    };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  LitmusDevProvider.prototype.editContent = function editContent(previousValue, newValue) {
	    var editor = window.editor.cm_editor;
	    editor.setValue(editor.getValue().replace('' + previousValue, '' + newValue));
	  };

	  LitmusDevProvider.prototype.editSubject = function editSubject(subject) {
	    var $title = jQuery('input#title');
	    jQuery('#documents .document.current > a.display.clickable').text(subject);
	    $title.val(subject);
	    $title.trigger('focusout');
	  };

	  return LitmusDevProvider;
	})();

		window.ChecklistProvider = new LitmusDevProvider();

/***/ },
/* 119 */
/***/ function(module, exports) {

	var GmailProvider = (function () {
	  function GmailProvider() {
	    babelHelpers.classCallCheck(this, GmailProvider);

	    this.editable = false;
	  }

	  GmailProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var content = jQuery('.a3s').html();
	    var subject = jQuery('.hP:visible').text();
	    var fromName = jQuery('h3.iw:visible:first .gD').text();
	    var fromEmail = jQuery('h3.iw:visible:first .gD').attr('email');

	    var result = {
	      subject: subject,
	      content: content,
	      text: null,
	      fromName: fromName,
	      fromEmail: fromEmail
	    };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  return GmailProvider;
	})();

		window.ChecklistProvider = new GmailProvider();

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	var MandrillProvider = (function () {
	  function MandrillProvider() {
	    babelHelpers.classCallCheck(this, MandrillProvider);

	    this.editable = false;
	  }

	  MandrillProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var subject = jQuery('input#subject').val();
	    var content = jQuery('textarea#html').val();
	    var text = jQuery('textarea#text').val();
	    var fromName = jQuery('input#from_name').val();
	    var fromEmail = jQuery('input#from_email').val();

	    var result = { subject: subject, content: content, text: text, fromName: fromName, fromEmail: fromEmail };

	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  return MandrillProvider;
	})();

		window.ChecklistProvider = new MandrillProvider();

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	exports.__esModule = true;
	const jQuery = __webpack_require__(96);
	const ChecklistTester = __webpack_require__(122);

	var MarketoProvider = (function () {
	  function MarketoProvider() {
	    babelHelpers.classCallCheck(this, MarketoProvider);

	    this.editable = false;
	    this.subject = null;
	    this.name = null;
	    this.email = null;
	    this.html = null;
	    this.hasRun = false;
	  }

	  MarketoProvider.prototype.lookup = function lookup() {
	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    this.hasRun = false;
	    this.html = null;
	    var campaignId = this.campaignId();
	    var html = undefined,
	        subject = undefined,
	        fromName = undefined,
	        fromEmail = undefined;

	    this.fetchResultIfReady(options);

	    // if #contentFrame is on page, make sure we wait until it's loaded
	    if (jQuery('#contentFrame').length > 0 && !this.content()) {
	      jQuery('#contentFrame').load(function () {
	        _this.fetchResultIfReady(options);
	      });
	    }

	    if (campaignId) {
	      var observer = new MutationObserver(function (mutations) {
	        mutations.forEach(function (mutation) {
	          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
	            var frame = jQuery('div[id*=emailEditorCanvas-]').filter('div[id*=-body]').find('iframe').first();
	            if (jQuery('.CodeMirror')[0]) {
	              // on code edit page, run immediately
	              _this.fetchResultIfReady(options);
	            } else if (frame) {
	              frame.load(function () {
	                _this.fetchResultIfReady(options);
	              });
	            }
	          }
	        });
	      });

	      var config = {
	        attributes: true,
	        childList: true,
	        characterData: true,
	        subtree: true
	      };

	      observer.observe(document.body, config);
	    }
	  };

	  MarketoProvider.prototype.fetchResultIfReady = function fetchResultIfReady() {
	    var _this2 = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    if (this.content() && !this.hasRun) {
	      if (jQuery('.CodeMirror')[0]) {
	        this.fetchResult();
	      } else {
	        // if we're on the easy-edit page, replace dynamic image links
	        this.replaceImages(this.content()).then(function (imageData) {
	          _this2.fetchResult(imageData, options);
	        });
	      }
	      this.hasRun = true;
	    }
	  };

	  MarketoProvider.prototype.fetchResult = function fetchResult() {
	    var imageData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var result = {
	      content: this.content(),
	      text: ' ',
	      subject: this.subjectLine(),
	      fromName: this.fromName(),
	      fromEmail: this.fromEmail(),
	      imageData: imageData,
	      id: this.campaignId() || this.id()
	    };
	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  MarketoProvider.prototype.replaceImages = function replaceImages(html) {
	    var frame = jQuery('div[id*=emailEditorCanvas-]').filter('div[id*=-body]').find('iframe').first();
	    var images = frame.contents().find('html').find('img[src*="proxyAsset"]');
	    var loaded_images = Array.apply(null, Array(images.length)).map(Number.prototype.valueOf, 0);
	    var data = {};

	    return new Promise(function (resolve, reject) {
	      if (images.length > 0) {
	        images.each(function (i) {
	          var image = images.eq(i);
	          var path = image.attr('src');
	          var xhr = new XMLHttpRequest();
	          xhr.responseType = 'blob';

	          xhr.onload = function () {
	            var reader = new FileReader();

	            // run when image is converted to base64
	            reader.onloadend = function () {
	              var rpath = image.attr('src');
	              data[rpath] = reader.result;
	              loaded_images[i] = 1;

	              // // if all images have been accounted for, send payload to qa external api to retrieve s3 paths
	              if (loaded_images.every(function (elem) {
	                return elem === 1;
	              })) {
	                resolve(data);
	              }
	            };
	            // read requested image as base64 path
	            reader.readAsDataURL(xhr.response);
	          };

	          xhr.onerror = function () {};

	          // request image via xhr
	          ChecklistTester.requestImage(xhr, path);
	        });
	      } else {
	        resolve([]);
	      }
	    });
	  };

	  MarketoProvider.prototype.campaignId = function campaignId() {
	    var matchData = window.location.href.match(/\#EME(\d+)/) || window.location.href.match(/\#EMTE(\d+)/) || window.location.href.match(/\#templatePreview\?templateId=(\d+)/);
	    if (matchData !== null) {
	      return matchData[1];
	    } else {
	      return null;
	    }
	  };

	  MarketoProvider.prototype.content = function content() {
	    var frame = undefined;
	    if (this.html) {
	      return this.html;
	    }

	    if (jQuery('.CodeMirror')[0]) {
	      this.html = jQuery('.CodeMirror')[0].CodeMirror.getValue();
	      return this.html;
	    } else if (jQuery('#contentFrame').length > 0) {
	      frame = jQuery('#contentFrame');
	    } else {
	      frames = jQuery('div[id*=emailEditorCanvas-]').filter('div[id*=-body]').find('iframe');
	      frame = frames.filter(':visible').first();
	    }

	    if (frame && frame.contents().find('html').html() !== '<head></head><body></body>') {
	      this.html = frame.contents().find('html').html();
	    }
	    return this.html;
	  };

	  MarketoProvider.prototype.subjectLine = function subjectLine() {
	    if (this.subject) {
	      return this.subject;
	    }
	    var subjectLabel = jQuery('label:contains(Subject:)').first();
	    if (subjectLabel) {
	      this.subject = subjectLabel.next().text();
	    }
	    if (jQuery('input[name="subject"]').length) {
	      this.subject = jQuery('input[name="subject"]').val();
	    }
	    return this.subject;
	  };

	  MarketoProvider.prototype.fromName = function fromName() {
	    if (this.name) {
	      return this.name;
	    }
	    var fromLabel = jQuery('label:contains(From Name:)').first();
	    if (fromLabel) {
	      this.name = fromLabel.next().text();
	    }
	    if (jQuery('input[name="fromName"]').length) {
	      this.name = jQuery('input[name="fromName"]').val();
	    }
	    return this.name;
	  };

	  MarketoProvider.prototype.fromEmail = function fromEmail() {
	    if (this.email) {
	      return this.email;
	    }
	    var addressLabel = jQuery('label:contains(From Address:)').first();
	    if (addressLabel) {
	      this.email = addressLabel.next().text();
	    }
	    if (jQuery('input[name="fromName"]').length) {
	      this.email = jQuery('input[name="fromEmail"]').val();
	    }
	    return this.email;
	  };

	  MarketoProvider.prototype.id = function id() {
	    var matchData = window.location.search.match(/\#EM[T|E]*(\d*)/);
	    if (matchData !== null) {
	      return matchData[1];
	    }
	  };

	  return MarketoProvider;
	})();

	exports['default'] = MarketoProvider;

	window.ChecklistProvider = new MarketoProvider();
		module.exports = exports['default'];

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);
	const debounce = __webpack_require__(106);

	const Litmus = __webpack_require__(123);
	const Utils = __webpack_require__(107);
	const BrowserFunctions = __webpack_require__(126);
	const Accounts = __webpack_require__(127);
	const ScriptInjector = __webpack_require__(128);

	var checklistTester = (function () {
	  function checklistTester() {
	    babelHelpers.classCallCheck(this, checklistTester);

	    this.originalContent = null;
	    this.running = false;
	    this.completed = false;
	    this.editable = false;
	    this.currentTestRequest = null;
	    this.testTimeout = null;
	    this.testResult = null;
	    this.currentEsp = null;
	    this.pusher = null;

	    this.Litmus = Litmus;
	    this.Accounts = Accounts;
	    this.BrowserFunctions = BrowserFunctions;
	    this.debounce = debounce;
	  }

	  /**
	   * Returns true if dreamweaver livepreview is detected
	   * @property isDreamweaverTest
	   * @type boolean
	   * @public
	   */

	  checklistTester.prototype.isDreamweaverTest = function isDreamweaverTest() {
	    return jQuery('iframe#previewApp').length;
	  };

	  /**
	   * POST a test to the checklist API
	   * @property runChecklistTest
	   * @type null
	   * @public
	   */

	  checklistTester.prototype.runChecklistTest = function runChecklistTest(subject, htmlContent, textContent) {
	    var fromName = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	    var fromEmail = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
	    var id = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];

	    this._runTest('checklist', { subject: subject, htmlContent: htmlContent, textContent: textContent, fromName: fromName, fromEmail: fromEmail, id: id });
	  };

	  /**
	   * POST a test to the Instant API
	   * @property runInstantAPITest
	   * @type null
	   * @public
	   */

	  checklistTester.prototype.runInstantAPITest = function runInstantAPITest(subject, fromEmail, fromName, htmlContent) {
	    this._runTest('instantAPI', { subject: subject, htmlContent: htmlContent, fromName: fromName, fromEmail: fromEmail });
	  };

	  /**
	   * Fetches the content and title from a local file:// URL, then runs a test
	   * via the instant API
	   * @property runLocalFileTest
	   * @type null
	   * @public
	   */

	  checklistTester.prototype.runLocalFileTest = function runLocalFileTest() {
	    var _this = this;

	    if (this.BrowserFunctions.windowLocationProtocol() === 'file:') {
	      this._fetchFileContent(this.BrowserFunctions.windowLocationHref()).then(function (html) {
	        _this._runLocalFileTestFor(html);
	      });
	    } else {
	      this._runLocalFileTestFor(this.originalContent);
	    }
	  };

	  checklistTester.prototype._runLocalFileTestFor = function _runLocalFileTestFor(content) {
	    var _this2 = this;

	    var subject = document.title || '';
	    var images = this.localImages();
	    var links = this.localLinks();

	    this._replaceRelativeCssPaths(content).then(function (html) {
	      _this2._getImageBase64Paths(images, html).then(function (_ref) {
	        var content = _ref.content;
	        var imagePaths = _ref.imagePaths;

	        _this2.Accounts.currentAccount(function (account) {
	          // return early if we don't have extension access with our current plan
	          if (!_this2.checkAccessFor(account)) {
	            return false;
	          }

	          _this2.replaceImagesWithS3Paths(content, imagePaths).then(function (content) {
	            Utils.postMessageToIframeWindow({ method: 'checklist-recordPageAction', action: 'extension_local_test_run', attributes: { content: content } }, '*');
	            _this2.runInstantAPITest(subject, null, null, content);
	          });
	        });
	      });
	    });
	  };

	  /**
	   * Fetches an elements' css property value, both computed and current
	   * @property getPropertyValue
	   * @type string
	   * @public
	   */

	  checklistTester.prototype.getPropertyValue = function getPropertyValue(elem, property) {
	    return document.defaultView.getComputedStyle(elem, null).getPropertyValue(property);
	  };

	  /**
	   * Sets "file_access_dismissed" flag for current user
	   * @property dismissFileAccessNotice
	   * @type boolean
	   * @public
	   */

	  checklistTester.prototype.dismissFileAccessNotice = function dismissFileAccessNotice() {
	    this.Litmus.dismissFileAccessNotice();
	  };

	  /**
	   * Fetches the images from the document
	   * @property localImages
	   * @type object
	   * @public
	   */

	  checklistTester.prototype.localImages = function localImages() {
	    var images = this.localAssets('images');
	    var self = this;
	    var backgrounds = jQuery('*').filter(function () {
	      if (this.currentStyle) {
	        return this.currentStyle['backgroundImage'] !== 'none' || this.currentStyle['background'] !== 'none';
	      } else if (window.getComputedStyle) {
	        return self.getPropertyValue(this, 'background-image') !== 'none' && self.getPropertyValue(this, 'background-image').indexOf('chrome-extension://') === -1 || self.getPropertyValue(this, 'background') !== 'none' && (self.getPropertyValue(this, 'background').indexOf('chrome-extension://') === -1 && self.getPropertyValue(this, 'background').indexOf('url(') > -1);
	      }
	    });

	    backgrounds = backgrounds.map(function () {
	      var bg = jQuery(this).css('background-image') || jQuery(this).css('background');
	      bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, '');
	      var hostName = window.location.href.substr(0, window.location.href.lastIndexOf('\/'));
	      return { src: bg.replace(new RegExp(hostName + '(/*)', 'gi'), '') };
	    });

	    return images.add(backgrounds);
	  };

	  /**
	   * Fetches the link elements from the document
	   * @property localLinks
	   * @type object
	   * @public
	   */

	  checklistTester.prototype.localLinks = function localLinks() {
	    return this.localAssets('links');
	  };

	  /**
	   * Fetches and returns links or images based on type
	   * @property localAssets
	   * @type object
	   * @public
	   */

	  checklistTester.prototype.localAssets = function localAssets() {
	    var type = arguments.length <= 0 || arguments[0] === undefined ? 'images' : arguments[0];

	    var _ref2 = type === 'links' ? ['link', 'html'] : ['img', 'body'];

	    var tag = _ref2[0];
	    var container = _ref2[1];

	    return this.isDreamweaverTest() ? jQuery(this.originalContent).find(tag) : jQuery(container).find(tag);
	  };

	  /**
	   * Checks for extension access, and sends a message to the sidebar
	   * to render an upsell page if user account has no access or is logged out
	   * @property checkAccessFor
	   * @type boolean
	   * @public
	   */

	  checklistTester.prototype.checkAccessFor = function checkAccessFor(account) {
	    if (!account) {
	      Utils.postMessageToIframeWindow({ method: 'checklist-show-logged-out-upsell' }, '*');
	      return false;
	    } else if ('extension_enabled' in account && !account.extension_enabled) {
	      Utils.postMessageToIframeWindow({ method: 'checklist-show-extension-upgrade-cta' }, '*');
	      return false;
	    } else if (account.user_read_only) {
	      Utils.postMessageToIframeWindow({ method: 'checklist-show-read-only-cta' }, '*');
	      return false;
	    }
	    return true;
	  };

	  /**
	   * Takes a list of image paths, and sends them to an API endpoint which creates s3 documents of each image.
	   * Returns the html content with all image paths replaced with s3 paths.
	   * @property _replaceImagesWithS3Paths
	   * @type Promise
	   * @public
	   */

	  checklistTester.prototype.replaceImagesWithS3Paths = function replaceImagesWithS3Paths(content, data) {
	    return new Promise(function (resolve, reject) {
	      Accounts.getAPIKey(function (token) {
	        var url = Litmus.baseUrl() + '/checklist/external_api/images';
	        var tokenHash = btoa(token + ':');
	        var headers = {};

	        headers['Authorization'] = 'Basic ' + tokenHash;

	        if (!data || jQuery.isEmptyObject(data)) {
	          return resolve(content);
	        }
	        // request s3 paths
	        jQuery.ajax({
	          type: 'POST',
	          dataType: 'json',
	          url: url,
	          data: { 'images': data },
	          headers: headers,
	          success: function success(response) {
	            // replace image paths with s3 paths in content markup
	            for (var filename in response) {
	              escapedFilename = filename.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	              content = content.replace(new RegExp(escapedFilename, 'gi'), response[filename]);
	            }
	            // run the test!
	            resolve(content);
	          }
	        });
	      });
	    });
	  };

	  /**
	   * Determines whether the test should be autorun
	   * @property shouldAutorunTest
	   * @type boolean
	   * @public
	   */

	  checklistTester.prototype.shouldAutorunTest = function shouldAutorunTest() {
	    return false;
	    // return (sessionStorage.autoOpen === true || sessionStorage.autoOpen === 'true');
	  };

	  /**
	   * Clears the timeout used to display an error message
	   * when test runs too long
	   * @property clearTestTimeout
	   * @type null
	   * @public
	   */

	  checklistTester.prototype.clearTestTimeout = function clearTestTimeout() {
	    if (this.testTimeout) {
	      clearTimeout(this.testTimeout);
	      this.testTimeout = null;
	    }
	  };

	  /**
	   * Post message to render error when a checklist is taking too long
	   * @property handleTestTimeout
	   * @type null
	   * @public
	   */

	  checklistTester.prototype.handleTestTimeout = function handleTestTimeout() {
	    window.postMessage({ method: 'checklist-timeout' }, '*');
	    Utils.postMessageToIframeWindow({ method: 'checklist-timeoutError' }, '*');
	  };

	  checklistTester.prototype._fetchFileContent = function _fetchFileContent(url) {
	    return new Promise(function (resolve, reject) {
	      chrome.runtime.sendMessage({ type: 'local_html_file_content_fetch', data: url }, function (html) {
	        resolve(html);
	      });
	    });
	  };

	  /**
	   * Returns given content with image paths replaced with
	   * base64 encoded strings
	   * @property _getImageBase64Paths
	   * @type Promise
	   * @private
	   */

	  checklistTester.prototype._getImageBase64Paths = function _getImageBase64Paths(images, content) {
	    var self = this;
	    var localImages = false;
	    var data = {};

	    // account for missing protocol in src's
	    this._replaceMissingLinkProtocols();

	    return new Promise(function (resolve, reject) {
	      if (images.length === 0) {
	        // no images - just run the test
	        return resolve({ content: content });
	      }

	      // if this is a dreamweaver doc, lets find the correct image path
	      var origin = '';
	      if (self.isDreamweaverTest()) {
	        var previewSrc = jQuery('iframe#previewApp').attr('src');
	        origin = previewSrc.substr(0, previewSrc.lastIndexOf('/') + 1);
	      } else {
	        origin = window.location.origin;
	      }

	      Promise.all(images.map(function (_index, imageElement) {
	        return new Promise(function (resolve, reject) {
	          var $image = jQuery(imageElement);

	          // if path is absolute, skip this image
	          if (self._isAbsolutePath($image)) {
	            return resolve();
	          }

	          var imgPath = $image.attr('src');
	          // make sure the origin is separated by a '/'
	          imgPath = origin.slice(-1) === '/' || imgPath.slice(0) === '/' ? imgPath : '/' + imgPath;

	          if (origin === 'file://') {
	            var loc = window.location.href;
	            var dir = loc.substring(0, loc.lastIndexOf('/'));
	            var path = dir + '/' + imgPath;

	            chrome.runtime.sendMessage({ type: 'local_image_fetch', data: path }, function (base64Image) {
	              localImages = true;
	              var rpath = $image.attr('src');
	              data[rpath] = base64Image;
	              return resolve();
	            });
	          } else {
	            var path = origin + imgPath;

	            // image is a relative path.  Proceed.
	            var xhr = new XMLHttpRequest();
	            xhr.responseType = 'blob';

	            // run when image is loaded
	            xhr.onload = function () {
	              localImages = true;
	              var reader = new FileReader();

	              // run when image is converted to base64
	              reader.onloadend = function () {
	                var rpath = $image.attr('src');
	                data[rpath] = reader.result;

	                return resolve();
	              };
	              // read requested image as base64 path
	              reader.readAsDataURL(xhr.response);
	            };

	            xhr.onerror = function () {
	              return resolve();
	            };

	            // request image via xhr
	            self.requestImage(xhr, path);
	          }
	        });
	      })).then(function (_values) {
	        if (localImages === true) {
	          return resolve({ content: content, imagePaths: data });
	        } else {
	          return resolve({ content: content });
	        }
	      });
	    });
	  };

	  checklistTester.prototype._isAbsolutePath = function _isAbsolutePath($element) {
	    return /^(?:[a-z]+:)?\/\//.test($element.attr('src')) || !$element.attr('src');
	  };

	  /**
	   * Sends xhr request for image
	   * @property requestImage
	   * @type null
	   * @public
	   */

	  checklistTester.prototype.requestImage = function requestImage(xhr, path) {
	    try {
	      xhr.open('GET', path);
	      xhr.send();
	    } catch (err) {
	      console.log('Image path invalid: ' + path);
	      xhr.onerror();
	    }
	  };

	  /**
	   * Adds protocols to link and image paths that have none
	   * (i.e. '//foo.com/image.jpg' becomes 'http://foo.com/image.jpg')
	   * @property requestImage
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._replaceMissingLinkProtocols = function _replaceMissingLinkProtocols() {
	    jQuery('img, link').each(function (i) {
	      var src = jQuery(this).attr('src') || jQuery(this).attr('href');
	      elem = jQuery(this)[0];

	      if (/^\/\//.test(src)) {
	        if (elem.localName === 'img') {
	          jQuery(this).attr('src', src.replace(/^\/\//, 'http://'));
	        } else {
	          jQuery(this).attr('href', src.replace(/^\/\//, 'http://'));
	        }
	      }
	    });
	  };

	  /**
	   * Replaces relative css paths with absolute ones
	   * @property _replaceRelativeCssPaths
	   * @type Promise
	   * @private
	   */

	  checklistTester.prototype._replaceRelativeCssPaths = function _replaceRelativeCssPaths(content) {
	    return new Promise(function (resolve, reject) {
	      // account for relative css paths on localhost
	      if (window.location.origin.includes('localhost')) {
	        (function () {
	          var loadedStyles = 0;
	          var styleSheets = jQuery('link[rel="stylesheet"]');
	          if (styleSheets.length === 0) {
	            resolve(content);
	          }
	          styleSheets.each(function (i) {
	            var elem = jQuery(this);
	            jQuery.when(jQuery.get(elem.attr('href'))).done(function (response) {
	              jQuery('<style />').text(response).appendTo(jQuery('head'));
	              elem.remove();
	              content = jQuery('html').html();
	              loadedStyles++;
	              if (loadedStyles === styleSheets.length) {
	                resolve(content);
	              }
	            });
	          });
	        })();
	      } else {
	        resolve(content);
	      }
	    });
	  };

	  /**
	   * Send the successful Instant API test result to the popup
	   * @property _instantAPIResultSuccess
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._instantAPIResultSuccess = function _instantAPIResultSuccess(data, status, request) {
	    this.completed = true;
	    this.testResult = data;
	    this.running = false;

	    this.clearTestTimeout();

	    Utils.postMessageToIframeWindow({
	      method: 'checklist-instantAPIResult',
	      result: data
	    }, '*');
	  };

	  /**
	   * Send a message to the popup informing of an Instant API test exception
	   * @property _instantAPIResultFailure
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._instantAPIResultFailure = function _instantAPIResultFailure(request, exception) {
	    this.clearTestTimeout();
	    this.running = false;
	    var data = {
	      error_type: 'Sorry, something went wrong!'
	    };
	    try {
	      data = JSON.parse(request.responseText);
	    } catch (error) {
	      //Ignore Silently
	    }

	    if (this.mfaRequired(request, data)) {
	      return;
	    }

	    // if error response is handled with a redirect, stop
	    if (this._handleErrorRedirect(request, data)) {
	      return;
	    }
	    // log error
	    Utils.postMessageToIframeWindow({ method: 'checklist-recordPageAction', action: 'extension_instant_api_result_failure', attributes: { exception: exception, response_text: request.responseText } }, '*');
	    // fallback to display "something went wrong" message
	    Utils.postMessageToIframeWindow({
	      method: 'checklist-instantAPIError',
	      result: data
	    }, '*');
	  };

	  /**
	   * Successful result callback, sends the successful result response to the sidebar
	   * @property _checklistResultSuccess
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._checklistResultSuccess = function _checklistResultSuccess(data, status, request) {
	    // Clear the test timeout (Preview timeout just skips the loading window)
	    this.clearTestTimeout();

	    // update the current test lifecycle as complete
	    this._setTestAsComplete(data['checklist'] || data);

	    // send test result to sidebar
	    this._sendResultToSidebar(data, request, true);
	  };

	  /**
	   * Result failure callback, handles error response render in sidebar
	   * @property _checklistResultSuccess
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._checklistResultFailure = function _checklistResultFailure(request, exception) {
	    // Allow another test to be run
	    this.currentTestRequest = null;
	    this.running = false;
	    this.clearTestTimeout();

	    var data = undefined;
	    try {
	      data = JSON.parse(request.responseText);
	    } catch (error) {
	      data = {
	        error_type: 'Sorry, something went wrong!'
	      };
	    }

	    // if error response is handled with a redirect, stop here
	    if (this._handleErrorRedirect(request, data)) {
	      return;
	    }

	    if (this.mfaRequired(request, data)) {
	      return;
	    }

	    // log error
	    Utils.postMessageToIframeWindow({ method: 'checklist-recordPageAction', action: 'extension_checklist_result_failure', attributes: { exception: exception, response_text: request.responseText } }, '*');

	    // fallback to display "something went wrong" message
	    this._sendResultToSidebar(data, request, false);
	  };

	  /**
	   * Check status code.  If it's a 401 with a reason relating to 2FA, display the proper page.
	   * @property mfaRequired
	   * @type null
	   * @public
	   */

	  checklistTester.prototype.mfaRequired = function mfaRequired(request, data) {
	    if (request.status === 401) {
	      switch (data.reason) {
	        case 'mfa_setup_required':
	          Utils.postMessageToIframeWindow({ method: 'checklist-show-mfa-setup' }, '*');
	          return true;
	        case 'new_second_factor_required':
	          Utils.postMessageToIframeWindow({ method: 'checklist-show-new-second-factor' }, '*');
	          return true;
	      }
	    }
	  };

	  /**
	   * Sends a message to the sidebar iframe with a result object parameter
	   * @property _sendResultToSidebar
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._sendResultToSidebar = function _sendResultToSidebar(result, request) {
	    var success = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	    var data = result || this.testResult;
	    var method = success ? 'checklist-testResult' : 'checklist-testError';

	    Utils.postMessageToIframeWindow({
	      method: method,
	      result: data,
	      editable: this.editable,
	      testsRemaining: parseInt(request.getResponseHeader('X-Checklist-Tests-Remaining')),
	      nextTest: Date.parse(request.getResponseHeader('X-Checklist-Rate-Limit-Expires'))
	    }, '*');
	  };

	  /**
	   * Sets the test lifecycle to complete
	   * @property _setTestAsComplete
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._setTestAsComplete = function _setTestAsComplete(data) {
	    var msg = undefined;

	    // Clear the stored request
	    this.currentTestRequest = null;
	    this.running = false;
	    // Mark the request as complete
	    this.completed = true;
	    this.testResult = data;

	    if (!this.currentEsp || typeof this.currentEsp.name === 'undefined') {
	      msg = { type: 'test_lifecycle', data: { status: 'localActive' } };
	    } else {
	      msg = { type: 'test_lifecycle', data: { status: 'completed', result: this.testResult, from: 'success' } };
	    }

	    chrome.runtime.sendMessage(msg);
	  };

	  /**
	   * Handles error page renders depending on error status and code
	   * @property _handleErrorRedirect
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._handleErrorRedirect = function _handleErrorRedirect(request, error) {
	    if (request.status === 403) {
	      switch (error.error_type) {
	        case 'enterprise_error':
	          Utils.postMessageToIframeWindow({ method: 'checklist-show-enterprise-cta' }, '*');
	          return true;
	        case 'extension_access_error':
	          Utils.postMessageToIframeWindow({ method: 'checklist-show-extension-upgrade-cta' }, '*');
	          return true;
	        case 'esp_access_error':
	          Utils.postMessageToIframeWindow({ method: 'checklist-show-esp-upgrade-cta' }, '*');
	          return true;
	        case 'over_usage_limit_error':
	          Utils.postMessageToIframeWindow({ method: 'checklist-show-over-usage-limit-cta' }, '*');
	          return true;
	      }
	    }
	  };

	  /**
	   * Runs a test, given type 'checklist' or 'instantAPI'
	   * @property _runTest
	   * @type null
	   * @private
	   */

	  checklistTester.prototype._runTest = function _runTest(type, _ref3) {
	    var _this3 = this;

	    var subject = _ref3.subject;
	    var htmlContent = _ref3.htmlContent;
	    var textContent = _ref3.textContent;
	    var fromName = _ref3.fromName;
	    var fromEmail = _ref3.fromEmail;
	    var id = _ref3.id;

	    if (!type) {
	      return false;
	    }

	    this.Accounts.currentAccount(function (account) {
	      // return early if we don't have extension access with our current plan
	      if (!_this3.checkAccessFor(account)) {
	        return false;
	      }

	      var token = account.token;
	      var data = {
	        subject: subject,
	        html: ScriptInjector.stripNativeMessageScripts(htmlContent),
	        from_name: fromName,
	        from: fromEmail
	      };
	      if (textContent) {
	        data['text'] = textContent;
	      }
	      if (id) {
	        data['id'] = id;
	      }

	      var method = 'get' + (type.charAt(0).toUpperCase() + type.slice(1)) + 'Results';
	      var success = '_' + type + 'ResultSuccess';
	      var failure = '_' + type + 'ResultFailure';
	      // debounce to make sure we only send this request once
	      _this3.debounce('getTestResults', 1000, function () {
	        _this3.currentTestRequest = _this3.Litmus[method](data, _this3[success].bind(_this3), _this3[failure].bind(_this3), token);
	      });

	      chrome.runtime.sendMessage({ type: 'test_lifecycle', data: { status: 'running' } });
	    });
	  };

	  return checklistTester;
	})();

		module.exports = new checklistTester();

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var _servicesApi_service = __webpack_require__(124);

	var _commonEnvironmentWrapper = __webpack_require__(125);

	var _commonEnvironmentWrapper2 = babelHelpers.interopRequireDefault(_commonEnvironmentWrapper);

	const jQuery = __webpack_require__(96);

	const LITMUS_ENV_NAME =  true ? ("staging") : null;
	const LITMUS_ENV_HOST =  true ? ("master.litmusdev.com") : null;

	var Litmus = (function () {
	  function Litmus() {
	    babelHelpers.classCallCheck(this, Litmus);

	    this.ENV = new _commonEnvironmentWrapper2['default'](LITMUS_ENV_NAME, LITMUS_ENV_HOST);

	    this.ESPS = [];
	    this.ESPS_LOADED = false;
	    this.CURRENT_ESP = null;
	    this.PROTO = 'https://';

	    // Whether to load providers from litmus, or locally from extension
	    this.LOCAL = true;
	  }

	  Litmus.prototype.host = function host() {
	    return this.ENV.host;
	  };

	  Litmus.prototype.baseUrl = function baseUrl() {
	    return '' + this.PROTO + this.host();
	  };

	  Litmus.prototype.apiService = function apiService() {
	    if (this.externalApiService === undefined) {
	      this.externalApiService = new _servicesApi_service.ApiService(this.PROTO, this.host(), this.baseUrl());
	    }

	    return this.externalApiService;
	  };

	  Litmus.prototype.goToPage = function goToPage(pagename) {
	    if (window !== window.top) {
	      window.location.hash = pagename;
	    }
	  };

	  Litmus.prototype.persistMfaToken = function persistMfaToken(token) {
	    chrome.runtime.sendMessage({
	      type: 'storage_set',
	      data: { mfaToken: token }
	    }, function () {});
	  };

	  Litmus.prototype.removeMfaToken = function removeMfaToken() {
	    chrome.runtime.sendMessage({
	      type: 'storage_set',
	      data: { mfaToken: null }
	    }, function () {});
	  };

	  Litmus.prototype.getChecklistResults = function getChecklistResults(data, successCallback, errorCallback) {
	    var authToken = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	    this.apiService().getESPResults(data, successCallback, errorCallback, authToken, this.CURRENT_ESP);
	  };

	  Litmus.prototype.getInstantAPIResults = function getInstantAPIResults(data, successCallback, errorCallback) {
	    var authToken = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	    this.apiService().getLocalFileTestResults(data, successCallback, errorCallback, authToken);
	  };

	  Litmus.prototype.dismissFileAccessNotice = function dismissFileAccessNotice() {
	    var successCallback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var errorCallback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	    this.apiService().dismissFileAccessNotice(successCallback, errorCallback);
	  };

	  Litmus.prototype.login = function login(username, password, successCallback, errorCallback) {
	    this.apiService().login(username, password, successCallback, errorCallback);
	  };

	  Litmus.prototype.logout = function logout(successCallback, errorCallback) {
	    const logout_url = '' + this.PROTO + this.host() + '/logout';

	    jQuery.ajax({
	      type: 'GET',
	      url: logout_url,
	      headers: { 'X-Requested-With': 'XMLHttpRequest' },
	      success: successCallback,
	      error: errorCallback
	    });
	  };

	  Litmus.prototype.clearSession = function clearSession() {
	    chrome.runtime.sendMessage({
	      type: 'clear_session',
	      data: { url: this.baseUrl() }
	    }, function () {});
	  };

	  Litmus.prototype.checkLoginState = function checkLoginState(successCallback, errorCallback) {
	    this.apiService().checkLoginState(successCallback, errorCallback);
	  };

	  // requests an sms key to be sent to user's email address

	  Litmus.prototype.requestSmsToken = function requestSmsToken(token, successCallback, errorCallback) {
	    var url = this.PROTO + 'api.' + this.host() + '/v2/mfa_verification/new';

	    jQuery.ajax({
	      type: 'GET',
	      url: url,
	      headers: { 'Authorization': 'Basic ' + btoa(token + ':') },
	      success: successCallback,
	      error: errorCallback
	    });
	  };

	  Litmus.prototype.createMfa = function createMfa(authToken, mfaData, successCallback, errorCallback) {
	    var url = this.PROTO + 'api.' + this.host() + '/v2/mfa_setup';

	    jQuery.ajax({
	      type: 'POST',
	      url: url,
	      data: mfaData,
	      headers: { 'Authorization': 'Basic ' + btoa(authToken + ':') },
	      success: successCallback,
	      error: errorCallback
	    });
	  };

	  // validates the mfa token and handles response

	  Litmus.prototype.validateMfaToken = function validateMfaToken(authToken, mfaData, successCallback, errorCallback) {
	    var url = this.PROTO + 'api.' + this.host() + '/v2/mfa_verification';

	    jQuery.ajax({
	      type: 'POST',
	      url: url,
	      data: mfaData,
	      headers: { 'Authorization': 'Basic ' + btoa(authToken + ':') },
	      success: successCallback,
	      error: errorCallback
	    });
	  };

	  // Request rendering of email screenshots
	  //
	  // this.example Request screenshots
	  //   Litmus.renderScreenshots 'testId', (success) ->
	  //     console.log 'rendering requested'

	  Litmus.prototype.requestScreenshots = function requestScreenshots(token, testId, successCallback, errorCallback) {
	    this.apiService().requestESPScreenshots(token, testId, successCallback, errorCallback);
	  };

	  Litmus.prototype.requestInstantAPIScreenshots = function requestInstantAPIScreenshots(token, guid, pusher_channel, callback) {
	    var _this = this;

	    // this method should no longer be called when logged out or in a non-paid plan,
	    // since free plans are depreciated and we now show a cta page instead.  Return early if
	    // something slips through the cracks
	    if (token === null) {
	      return;
	    }

	    var headers = {};
	    var url = null;
	    var tokenHash = null;

	    chrome.runtime.sendMessage({
	      type: 'storage_get',
	      data: ['mfaToken']
	    }, function (items) {

	      url = _this.baseUrl() + '/checklist/external_api/local_tests/' + guid + '/render.json';
	      tokenHash = btoa(token + ':');
	      headers['Authorization'] = 'Basic ' + tokenHash;
	      headers['X-Litmus-OTP'] = items.mfaToken;

	      jQuery.ajax({
	        type: 'PUT',
	        url: url,
	        data: {
	          pusher_channel: pusher_channel
	        },
	        dataType: 'json',
	        headers: headers,
	        success: callback
	      });
	    });
	  };

	  Litmus.prototype.getCurrentClientResult = function getCurrentClientResult(token, code, testId, _success, error) {
	    var _this2 = this;

	    if (token === null) {
	      error();
	      return;
	    }

	    var headers = {};
	    var url = null;
	    var tokenHash = null;

	    chrome.runtime.sendMessage({
	      type: 'storage_get',
	      data: ['mfaToken']
	    }, function (items) {
	      url = _this2.baseUrl() + '/checklist/external_api/tests/' + testId + '/retest.json';
	      tokenHash = btoa(token + ':');
	      headers['Authorization'] = 'Basic ' + tokenHash;
	      headers['X-Litmus-OTP'] = items.mfaToken;

	      jQuery.ajax({
	        type: 'POST',
	        dataType: 'json',
	        data: {
	          code: code
	        },
	        url: url,
	        headers: headers,
	        success: function success(data) {
	          _success(data, code);
	        },
	        error: error
	      });
	    });
	  };

	  Litmus.prototype.getTestLink = function getTestLink(testId) {
	    return this.baseUrl() + '/checklist/tests/' + testId;
	  };

	  Litmus.prototype.getCatalystChecklistLink = function getCatalystChecklistLink(folderId, emailId) {
	    return this.baseUrl() + '/folders/' + folderId + '/emails/' + emailId + '/checklist';
	  };

	  return Litmus;
	})();

		module.exports = new Litmus();

/***/ },
/* 124 */
/***/ function(module, exports) {

	exports.__esModule = true;

	var ApiService = (function () {
	  function ApiService(proto, baseHost, baseUrl) {
	    babelHelpers.classCallCheck(this, ApiService);

	    this.proto = proto;
	    this.baseHost = baseHost;
	    this.baseUrl = baseUrl;

	    this.addConvenienceMethods();
	  }

	  ApiService.prototype.addConvenienceMethods = function addConvenienceMethods() {
	    var _this = this;

	    var requestTypes = ['GET', 'POST', 'PUT'];

	    var _loop = function _loop() {
	      var requestType = requestTypes[i];
	      _this[requestType.toLowerCase() + 'ToApi'] = function (url) {
	        var _this2 = this;

	        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        var authToken = opts['authToken'];
	        var mfaRequired = opts['mfaRequired'];
	        var data = opts['data'] || {};
	        var success = opts['successCallback'];
	        var error = opts['errorCallback'];
	        var asXHR = opts['asXHR'];
	        var username = opts['username'];
	        var password = opts['password'];
	        var headers = opts['headers'];
	        var dataType = opts['dataType'];

	        var options = {
	          type: requestType,
	          dataType: dataType || 'json',
	          headers: headers
	        };

	        options.url = url + '.json';

	        if (authToken) {
	          options.headers = options.headers || {};
	          options.headers['Authorization'] = 'Basic ' + btoa(authToken + ':');
	        } else if (username && password) {
	          var authorization = btoa(username + ':' + password);
	          options.headers = options.headers || {};
	          options.headers['Authorization'] = 'Basic ' + authorization;
	        }
	        if (data && !(Object.keys(data).length === 0 && data.constructor === Object)) {
	          options.data = data;
	        }

	        if (asXHR) {
	          options.headers = options.headers || {};
	          options.headers['X-Requested-With'] = 'XMLHttpRequest';
	        }

	        if (mfaRequired) {
	          chrome.runtime.sendMessage({
	            type: 'storage_get',
	            data: ['mfaToken']
	          }, function (items) {
	            var mfaToken = items.mfaToken;
	            options.headers = options.headers || {};
	            options.headers['X-Litmus-OTP'] = mfaToken;

	            _this2.backgroundJQueryAjax(options, success, error);
	          });
	        } else {
	          this.backgroundJQueryAjax(options, success, error);
	        }
	      };
	    };

	    for (var i = 0; i < requestTypes.length; i++) {
	      _loop();
	    }
	  };

	  ApiService.prototype.dismissFileAccessNotice = function dismissFileAccessNotice() {
	    var successCallback = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var errorCallback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	    data = {
	      file_access_dismissed: true
	    };
	    var url = this.v2Url("accounts/dismiss_file_access");
	    this.postToApi(url, { data: data, mfaRequired: true, successCallback: successCallback, errorCallback: errorCallback });
	  };

	  ApiService.prototype.login = function login(username, password, successCallback, errorCallback) {
	    var url = this.v2Url("accounts");
	    this.getToApi(url, { username: username, password: password, mfaRequired: false, asXHR: true, successCallback: successCallback, errorCallback: errorCallback });
	  };

	  ApiService.prototype.checkLoginState = function checkLoginState(successCallback, errorCallback) {
	    var url = this.v2Url("accounts");
	    this.getToApi(url, { headers: { 'Authorization': 'Basic ' }, successCallback: successCallback, errorCallback: errorCallback });
	  };

	  ApiService.prototype.getESPResults = function getESPResults(data, successCallback, errorCallback, authToken, currentESP) {
	    // this method should no longer be called when logged out or in a non-paid plan,
	    // since free plans are depreciated and we now show a cta page instead.  Return early if
	    // something slips through the cracks
	    if (authToken === null) {
	      return;
	    }

	    var id = data['id'];
	    delete data['id'];

	    data = {
	      email: data,
	      esp_uid: currentESP.code + '-' + id,
	      esp: currentESP.api_code
	    };

	    var url = this.baseUrl + '/folders/external_api/emails';
	    this.postToApi(url, { data: data, authToken: authToken, mfaRequired: true, successCallback: successCallback, errorCallback: errorCallback });
	  };

	  ApiService.prototype.requestESPScreenshots = function requestESPScreenshots(token, testId, successCallback, errorCallback) {
	    var _this3 = this;

	    // this method should no longer be called when logged out or in a non-paid plan,
	    // since free plans are depreciated and we now show a cta page instead.  Return early if
	    // something slips through the cracks
	    if (token === null) {
	      return;
	    }

	    if (typeof successCallback === 'undefined') {
	      successCallback = function () {};
	    }
	    if (typeof errorCallback === 'undefined') {
	      errorCallback = function () {};
	    }

	    var headers = {};
	    var url = null;
	    var tokenHash = null;

	    chrome.runtime.sendMessage({
	      type: 'storage_get',
	      data: ['mfaToken']
	    }, function (items) {
	      tokenHash = btoa(token + ':');
	      headers['Authorization'] = 'Basic ' + tokenHash;
	      headers['X-Litmus-OTP'] = items.mfaToken;

	      var url = _this3.checklistUrl('tests/' + testId + '/render');
	      _this3.putToApi(url, { dataType: 'text', headers: headers, successCallback: successCallback, errorCallback: errorCallback });
	    });
	  };

	  ApiService.prototype.getLocalFileTestResults = function getLocalFileTestResults(data, successCallback, errorCallback, authToken) {
	    // this method should no longer be called when logged out or in a non-paid plan,
	    // since free plans are depreciated and we now show a cta page instead.  Return early if
	    // something slips through the cracks
	    if (authToken === null) {
	      return;
	    }

	    data = {
	      email: data,
	      force_token_auth: true
	    };
	    var url = this.checklistUrl("local_tests");
	    this.postToApi(url, { data: data, authToken: authToken, mfaRequired: true, successCallback: successCallback, errorCallback: errorCallback });
	  };

	  ApiService.prototype.v2Url = function v2Url(endpoint) {
	    return this.proto + 'api.' + this.baseHost + '/v2/' + endpoint;
	  };

	  ApiService.prototype.checklistUrl = function checklistUrl(endpoint) {
	    return '' + this.proto + this.baseHost + '/checklist/external_api/' + endpoint;
	  };

	  ApiService.prototype.backgroundJQueryAjax = function backgroundJQueryAjax(options, successCallback, errorCallback) {
	    chrome.runtime.sendMessage({ type: 'background_jquery_ajax', data: options }, function (response) {
	      if (response == null) {
	        errorCallback(null, null, "No response from AJAX call to: ${options.url}");
	        return;
	      }

	      // we don't receive a full jqXHR object back from the chrome
	      // background script, so we need to re-assemble some of it for
	      // existing code that is expecting to receive an jqXHR object.
	      response.jqXHR.getAllResponseHeaders = function () {
	        return response.headers;
	      };

	      response.jqXHR.getResponseHeader = function (key) {
	        return response.headers[key];
	      };

	      if (response.success) {
	        successCallback(response.data, response.textStatus, response.jqXHR);
	      } else {
	        errorCallback(response.jqXHR, response.textStatus, response.errorThrown);
	      }
	    });
	  };

	  return ApiService;
	})();

	exports.ApiService = ApiService;

/***/ },
/* 125 */
/***/ function(module, exports) {

	var EnvironmentWrapper = (function () {
	  function EnvironmentWrapper(name, host) {
	    babelHelpers.classCallCheck(this, EnvironmentWrapper);

	    this.name = name;
	    this.host = host;
	  }

	  EnvironmentWrapper.prototype.isDevelopment = function isDevelopment() {
	    return "development" === this.name;
	  };

	  EnvironmentWrapper.prototype.isTest = function isTest() {
	    return "test" === this.name;
	  };

	  EnvironmentWrapper.prototype.isStaging = function isStaging() {
	    return "staging" === this.name;
	  };

	  EnvironmentWrapper.prototype.isProduction = function isProduction() {
	    return "production" === this.name;
	  };

	  EnvironmentWrapper.prototype.pusherKey = function pusherKey() {
	    return this.isProduction() ? "a12b134b7f8c626095b1" : "53983608d1ea376b664e";
	  };

	  EnvironmentWrapper.prototype.segmentWriteKey = function segmentWriteKey() {
	    return this.isProduction() ? "uUDJM6YIAL3AOFE07BvFfsudrFdronAf" : "tQzCKmeN632wfheXp4XYRSgOtlNo8X4z";
	  };

	  EnvironmentWrapper.prototype.newRelicLicenseKey = function newRelicLicenseKey() {
	    return "0cfd141a14";
	  };

	  EnvironmentWrapper.prototype.newRelicApplicationID = function newRelicApplicationID() {
	    return this.isProduction() ? "50793173" : "51002621";
	  };

	  return EnvironmentWrapper;
	})();

		module.exports = EnvironmentWrapper;

/***/ },
/* 126 */
/***/ function(module, exports) {

	function document() {
	  return window.document;
	}

	function windowLocationProtocol() {
	  return window.location.protocol;
	}

	function windowLocationHref() {
	  return window.location.href;
	}

	function windowLocationPathname() {
	  return window.location.pathname;
	}

	module.exports = { document: document, windowLocationProtocol: windowLocationProtocol, windowLocationHref: windowLocationHref, windowLocationPathname: windowLocationPathname };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	const Litmus = __webpack_require__(123);

	var Accounts = (function () {
	  function Accounts() {
	    babelHelpers.classCallCheck(this, Accounts);

	    this.accountSynced = false;
	  }

	  // Get the contentWindow of the iframe

	  Accounts.prototype.postMessageToIframeWindow = function postMessageToIframeWindow() {
	    var iframe = document.getElementById('inject-litmus-checklist-iframe');
	    if (iframe && iframe.contentWindow) {
	      var _iframe$contentWindow;

	      (_iframe$contentWindow = iframe.contentWindow).postMessage.apply(_iframe$contentWindow, arguments);
	    }
	  };

	  // Update the current account index

	  Accounts.prototype.selectCurrentAccount = function selectCurrentAccount(index) {
	    var _this = this;

	    Litmus.clearSession();

	    chrome.runtime.sendMessage({
	      type: 'storage_set',
	      data: { current_account: index }
	    }, function () {
	      _this.currentAccount(function (account) {
	        var accountSwitchUrl = 'https://' + Litmus.host() + '/accounts/switch?account%5Bid%5D=' + account.account_id;
	        chrome.runtime.sendMessage({ type: 'background_jquery_ajax', data: { type: 'GET', url: accountSwitchUrl } });
	      });
	    });

	    return true;
	  };

	  Accounts.prototype.getAccounts = function getAccounts(callback) {
	    chrome.runtime.sendMessage({
	      type: 'storage_get',
	      data: ['accounts', 'current_account']
	    }, function (items) {
	      var result = null;
	      if (items.hasOwnProperty('accounts')) {
	        result = {
	          accounts: items.accounts,
	          current_account: items.current_account
	        };
	      } else {
	        result = {
	          accounts: [],
	          current_account: null
	        };
	      }
	      callback(result);
	    });
	  };

	  Accounts.prototype.currentAccount = function currentAccount(callback) {
	    this.getAccounts(function (result) {
	      var account = null;
	      if (result.current_account !== null) {
	        account = result.accounts[result.current_account];
	      }
	      callback(account);
	    });
	  };

	  // Retrieve the API key, if present

	  Accounts.prototype.getAPIKey = function getAPIKey(callback) {
	    this.getAccounts(function (result) {
	      var key = null;
	      if (result.current_account !== null) {
	        key = result.accounts[result.current_account].token;
	      }

	      callback(key);
	    });
	  };

	  // Post a message to the iframe if the user is logged in or not.
	  // Also sends the list of accounts

	  Accounts.prototype.loginStatus = function loginStatus() {
	    var _this2 = this;

	    self = this;
	    this.getAccounts(function (result) {
	      var currentAccount = result.accounts[result.current_account];
	      var loggedIn = result.current_account !== null && currentAccount.extension_enabled != null; // eslint-disable-line

	      if (_this2.accountSynced && loggedIn) {
	        self.postMessageToIframeWindow({
	          method: 'login-status',
	          loggedIn: loggedIn,
	          accounts: result.accounts,
	          currentAccount: result.current_account
	        }, '*');
	      } else {
	        var successCallback = function successCallback(data) {
	          chrome.runtime.sendMessage({ type: 'storage_set', data: { accounts: data.accounts, current_account: 0 } }, function () {
	            self.postMessageToIframeWindow({ method: 'login-status', loggedIn: true, currentAccount: 0, accounts: data.accounts }, '*');
	            Litmus.goToPage('checklist');
	            _this2.accountSynced = true;
	          });
	        };
	        var errorCallback = function errorCallback() {
	          self.postMessageToIframeWindow({
	            method: 'login-status',
	            loggedIn: !!currentAccount,
	            accounts: result.accounts,
	            currentAccount: currentAccount ? result.current_account : null
	          }, '*');
	          _this2.accountSynced = true;
	        };

	        Litmus.checkLoginState(successCallback, errorCallback);
	      }
	    });
	  };

	  return Accounts;
	})();

		module.exports = new Accounts();

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var _commonBrowserApi = __webpack_require__(129);

	var _commonBrowserApi2 = babelHelpers.interopRequireDefault(_commonBrowserApi);

	const jQuery = __webpack_require__(96);

	const ChecklistPresenter = __webpack_require__(130);

	var ScriptInjector = (function () {
	  function ScriptInjector(commonBrowserApi) {
	    babelHelpers.classCallCheck(this, ScriptInjector);

	    this.commonBrowserApi = commonBrowserApi;
	    this.isLocal = false;
	  }

	  ScriptInjector.prototype.initialize = function initialize(opts) {
	    var _this = this;

	    jQuery.each(opts, function (key, value) {
	      _this[key] = value;
	    });
	  };

	  // Inject Javascript to determine if the API method exists on the window object

	  ScriptInjector.prototype.injectNativeMessages = function injectNativeMessages() {
	    var $body = jQuery('body');

	    // Prevent multiple message listeners
	    if ($body.find('script#checklist-messages').length === 0) {
	      var script = document.createElement('script');
	      script.setAttribute('id', 'checklist-messages');
	      script.setAttribute('data-checklist-script', 'true');
	      script.src = this.commonBrowserApi.getURL('nativeMessages.js');
	      document.body.append(script);
	      //(document.body || document.documentElement).appendChild(script);
	    }
	  };

	  ScriptInjector.prototype.injectSidebar = function injectSidebar() {
	    return ChecklistPresenter.inject(this.commonBrowserApi.getURL('sidebar/index.html#checklist'));
	  };

	  ScriptInjector.prototype.injectEspScript = function injectEspScript(currentEsp) {
	    if (!this.isLocal) {
	      var providerKey = currentEsp.domain.replace(/\./g, '-');
	      window.postMessage({
	        method: 'checklist-requireLocalEspScript',
	        provider: providerKey
	      }, '*');
	      window.postMessage({ method: 'checklist-isEditable' }, '*');
	    }
	  };

	  ScriptInjector.prototype.stripNativeMessageScripts = function stripNativeMessageScripts(content) {
	    if (content == null) {
	      return "";
	    }

	    var $body = jQuery('body');
	    var nativeMessageScriptContent = '';
	    if ($body.find('script#checklist-messages').length > 0) {
	      nativeMessageScriptContent = $body.find('script#checklist-messages')[0].innerHtml;
	    }
	    return content.replace(nativeMessageScriptContent, '');
	  };

	  return ScriptInjector;
	})();

		module.exports = new ScriptInjector(new _commonBrowserApi2['default']());

/***/ },
/* 129 */
/***/ function(module, exports) {

	exports.__esModule = true;

	var CommonBrowserApi = (function () {
	  function CommonBrowserApi() {
	    babelHelpers.classCallCheck(this, CommonBrowserApi);
	  }

	  CommonBrowserApi.prototype.getURL = function getURL(path) {
	    return chrome.runtime.getURL(path);
	  };

	  return CommonBrowserApi;
	})();

	exports["default"] = CommonBrowserApi;
	module.exports = exports["default"];

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var _commonBrowserApi = __webpack_require__(129);

	var _commonBrowserApi2 = babelHelpers.interopRequireDefault(_commonBrowserApi);

	const jQuery = __webpack_require__(96);

	const ChecklistDragHandler = __webpack_require__(131);

	var ChecklistPresenter = (function () {
	  function ChecklistPresenter(commonBrowserApi) {
	    babelHelpers.classCallCheck(this, ChecklistPresenter);

	    this.commonBrowserApi = commonBrowserApi;
	  }

	  ChecklistPresenter.prototype.injectBeacon = function injectBeacon() {
	    var _this = this;

	    var fileAccessOff = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	    jQuery(document).ready(function () {
	      if (!jQuery('#litmusBeacon') || jQuery('#litmusBeacon').length <= 0) {
	        var logoImage = fileAccessOff ? _this._getURL('images/icon128-gray.png') : _this._getURL('images/beacon.png');
	        _this._injectCSSForBeacon();
	        jQuery('body').append('\n          <div id="litmusBeacon" class="access-' + (fileAccessOff ? 'off' : 'on') + '" style="background-image: url(' + logoImage + ');">\n            <div class=\'beaconIndicator\'></div>\n          </div>');

	        jQuery('body').off('click', '#litmusBeacon');
	        jQuery('body').on('click', '#litmusBeacon', function () {
	          chrome.runtime.sendMessage({
	            type: 'activate_sidebar'
	          }, function () {});
	        });

	        if (fileAccessOff) {
	          chrome.runtime.sendMessage({
	            type: 'storage_get',
	            data: ['file_access_notice_dismissed']
	          }, function (result) {
	            var dismissed = result['file_access_notice_dismissed'];
	            if (!dismissed) {
	              _this.displayFileAccessNotice();
	            }
	          });
	        }
	      }
	    });
	  };

	  // Changes the width of the body element and posts a 'checklist-show' message

	  ChecklistPresenter.prototype.inject = function inject(src) {
	    var overlayMode = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    if (this.injected) {
	      return;
	    }
	    this.injected = true;
	    this.overlayMode = overlayMode;
	    // var injectClass  = (sessionStorage.autoOpen && window.innerWidth >= 600) ? '' : 'collapsed';
	    var injectClass = 'collapsed';
	    var injectWidth = '';
	    if (sessionStorage.currentSidebarWidth) {
	      injectWidth = sessionStorage.currentSidebarWidth + 'px';
	    }
	    jQuery('body').append('\n      <div id="inject-litmus-checklist" class="' + injectClass + '" style="width: ' + injectWidth + '">\n\n        <div class="draggable-bar">\n          <div class="draggable-icon" style="background-image: url(\'' + this._getURL('/images/draggable-icon.png') + '\')"></div>\n        </div>\n\n        <div class="draggable-overlay" style="display: none;"></div>\n\n        <iframe id="inject-litmus-checklist-iframe" src="' + src + '" frameborder="0" allowtransparency></iframe>\n      </div>\n    ');

	    this._injectCSSForFixedTopBars();

	    window.dispatchEvent(new Event('resize'));

	    // Initial state is collapsed
	    window.postMessage({ method: 'checklist-collapse' }, '*');

	    ChecklistDragHandler.start(this, this.overlayMode);
	    ChecklistDragHandler.updatePanes();
	  };

	  ChecklistPresenter.prototype.enableFullScreen = function enableFullScreen() {
	    ChecklistDragHandler.enableFullScreen();
	  };

	  // set dismissed flag

	  ChecklistPresenter.prototype.dismissFileAccessNotice = function dismissFileAccessNotice() {
	    chrome.runtime.sendMessage({
	      type: 'storage_set',
	      data: { 'file_access_notice_dismissed': true }
	    }, function () {});
	  };

	  ChecklistPresenter.prototype.toggleFileAccessNotice = function toggleFileAccessNotice() {
	    jQuery('#litmusBeacon .fileAccessNotice').length ? this.hideFileAccessNotice() : this.displayFileAccessNotice();
	  };

	  ChecklistPresenter.prototype.displayFileAccessNotice = function displayFileAccessNotice() {
	    jQuery('#litmusBeacon').append('\n      <div class="fileAccessNotice">\n        <span class="icon-cross close"></span>\n        <h1>Test and troubleshoot your email with Litmus</h1>\n        <img src="' + this._getURL('/images/allow-access-graphic.png') + '" />\n        <a href="#" class="access-link">Allow access to file URLs</a>\n      </div>\n    ');
	    jQuery('#litmusBeacon .access-link').on('click', function () {
	      chrome.runtime.sendMessage({ type: 'show_settings' });
	    });
	  };

	  ChecklistPresenter.prototype.hideFileAccessNotice = function hideFileAccessNotice() {
	    jQuery('#litmusBeacon .fileAccessNotice').remove();
	    this.dismissFileAccessNotice();
	  };

	  ChecklistPresenter.prototype._injectCSSForFixedTopBars = function _injectCSSForFixedTopBars() {
	    //for Campaign Monitor
	    jQuery('body').append('\n      <style id=\'litmus-pre-inject-css\'>\n        #emb-js-editor-header {\n          width: inherit!important;\n        }\n      </style>\n    ');
	  };

	  // Dynamically loads the proxima nova semibold font, and the litmus beacon css file

	  ChecklistPresenter.prototype._injectCSSForBeacon = function _injectCSSForBeacon() {
	    var font = new FontFace('proxima_novasemibold', 'url(' + this._getURL('/fonts/proximanova-semibold-webfont.woff') + ') format("woff")');
	    font.load().then(function (loaded_face) {
	      document.fonts.add(loaded_face);
	      jQuery('.fileAccessNotice')[0].style.fontFamily = '"proxima_novasemibold", Arial';
	    })['catch'](function (error) {
	      // error occurred
	      console.log(font);
	    });

	    var path = this._getURL('css/litmusBeacon.css');
	    jQuery('head').append(jQuery('<link>').attr('rel', 'stylesheet').attr('type', 'text/css').attr('href', path));
	  };

	  ChecklistPresenter.prototype.disableFullScreen = function disableFullScreen() {
	    ChecklistDragHandler.disableFullScreen();
	  };

	  ChecklistPresenter.prototype.remove = function remove() {
	    ChecklistDragHandler.stop();

	    jQuery('#inject-litmus-checklist').remove();
	    jQuery('#litmus-pre-inject-css').remove();
	    if (!this.overlayMode) {
	      jQuery('body').css('width', '100%');
	    }

	    this.injected = false;

	    window.dispatchEvent(new Event('resize'));

	    window.postMessage({ method: 'checklist-collapse' }, '*');
	  };

	  ChecklistPresenter.prototype.slideOutSlightly = function slideOutSlightly() {
	    if (jQuery('#inject-litmus-checklist').is('.collapsed')) {
	      jQuery('#inject-litmus-checklist').addClass('slightPopOut');
	    }
	  };

	  // When sidebar is collapsed to 10px draggable bar

	  ChecklistPresenter.prototype.expand = function expand() {
	    jQuery('#inject-litmus-checklist').removeClass('collapsed');
	    jQuery('#inject-litmus-checklist').removeClass('slightPopOut');
	    window.dispatchEvent(new Event('resize'));
	    window.postMessage({ method: 'checklist-expand' }, '*');
	    window.postMessage({ method: 'checklist-injectCSS' }, '*');
	    // sessionStorage.autoOpen = true;
	    chrome.runtime.sendMessage({ type: 'autoreload', data: { action: 'start' } });
	    if (!this.overlayMode) {
	      jQuery('body').css({ width: '100%', position: 'absolute', height: '100%' });
	      ChecklistDragHandler.updatePanes();
	    }
	  };

	  ChecklistPresenter.prototype.collapse = function collapse() {
	    jQuery('#inject-litmus-checklist').addClass('collapsed');
	    jQuery('#inject-litmus-checklist').removeClass('slightPopOut');
	    jQuery('#inject-litmus-checklist').removeAttr('style');
	    jQuery('#inject-litmus-checklist').removeClass('full-screen');
	    sessionStorage.removeItem('autoOpen');
	    window.dispatchEvent(new Event('resize'));

	    jQuery('#checklist-injected-css').remove();
	    chrome.runtime.sendMessage({ type: 'autoreload', data: { action: 'stop' } });
	    if (!this.overlayMode) {
	      ChecklistDragHandler.updatePanes();
	    }
	  };

	  // For full-screen previews

	  ChecklistPresenter.prototype.expandFullScreen = function expandFullScreen() {
	    jQuery('#inject-litmus-checklist').addClass('full-screen');
	    if (ChecklistDragHandler.fullScreenExpanded) {
	      ChecklistDragHandler.fullScreenExpanded();
	    }
	  };

	  ChecklistPresenter.prototype.collapseFullScreen = function collapseFullScreen() {
	    jQuery('#inject-litmus-checklist').removeClass('full-screen');
	    jQuery('.preview-hover').removeClass('expanded');
	    ChecklistDragHandler.checkForWideSidebar();
	    if (ChecklistDragHandler.fullScreenCollapsed) {
	      ChecklistDragHandler.fullScreenCollapsed();
	    }
	  };

	  ChecklistPresenter.prototype.updateThumbnailColumnCount = function updateThumbnailColumnCount() {
	    ChecklistDragHandler.checkForWideSidebar();
	  };

	  ChecklistPresenter.prototype._getURL = function _getURL(path) {
	    return this.commonBrowserApi.getURL(path);
	  };

	  return ChecklistPresenter;
	})();

		module.exports = new ChecklistPresenter(new _commonBrowserApi2['default']());

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	const Utils = __webpack_require__(107);

	var ChecklistDragHandler = (function () {
	  function ChecklistDragHandler() {
	    babelHelpers.classCallCheck(this, ChecklistDragHandler);
	  }

	  ChecklistDragHandler.prototype.start = function start(presenter) {
	    var overlayMode = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    this.checklistPresenter = presenter;

	    this.dragging = false;
	    this.moved = false;
	    this.origX = 0;
	    this.origRight = 0;
	    this.draggedDistance = 0;

	    this.minSidebarWidth = 460;
	    this.minRight = (this.minSidebarWidth - 1) * -1;
	    this.largeThumbThreshold = 640;
	    this.currentSidebarWidth = sessionStorage.currentSidebarWidth || this.minSidebarWidth;

	    this.fullScreenEnabled = false;
	    this.overlayMode = overlayMode;

	    jQuery('.draggable-bar').on('mousedown', this.mousedown.bind(this));
	    jQuery('body').on('mousemove.checklist', this.mousemove.bind(this));
	    jQuery('body').on('mouseup.checklist mouseleave.checklist', this.mouseup.bind(this));
	  };

	  ChecklistDragHandler.prototype.stop = function stop() {
	    jQuery('body').off('mousedown.checklist', 'mousemove.checklist', 'mouseup.checklist');
	  };

	  ChecklistDragHandler.prototype.enableFullScreen = function enableFullScreen() {
	    this.draggedDistance = 0;
	    this.fullScreenEnabled = true;
	  };

	  ChecklistDragHandler.prototype.disableFullScreen = function disableFullScreen() {
	    this.draggedDistance = 0;
	    this.fullScreenEnabled = false;
	    this.checkForWideSidebar(this.currentSidebarWidth);
	  };

	  ChecklistDragHandler.prototype.updatePanes = function updatePanes() {
	    sessionStorage.currentSidebarWidth = this.currentSidebarWidth;
	    this.sizeLeftPane(this.currentSidebarWidth);
	    if (jQuery('#inject-litmus-checklist').is('.collapsed')) {
	      jQuery('#inject-litmus-checklist').removeAttr('style');
	    } else {
	      jQuery('#inject-litmus-checklist').css({
	        'width': this.currentSidebarWidth + 'px'
	      });
	    }
	  };

	  ChecklistDragHandler.prototype.sizeLeftPane = function sizeLeftPane(width, force) {
	    if (!jQuery('#inject-litmus-checklist').is('.collapsed') || force) {
	      if (jQuery('#domFrame').length) {
	        jQuery('#domFrame').css('width', 'calc(100% - ' + width + 'px)');
	      } else if (jQuery('#previewApp').length) {
	        jQuery('#previewApp').css({ 'width': 'calc(100% - ' + width + 'px)', 'transition': 'width .2s ease-out' });
	      } else {
	        jQuery('body, .preview-container, #emb-editor-wrap').css('width', 'calc(100% - ' + width + 'px)');
	      }
	    } else {
	      jQuery('body, .c-topSliderPane.preview-container, #emb-editor-wrap').css('width', '100%');
	      jQuery('#domFrame').css('width', '100%');
	      jQuery('#previewApp').css('width', '100%');
	    }
	  };

	  ChecklistDragHandler.prototype.fullScreenExpanded = function fullScreenExpanded() {
	    // Reset default body width
	    console.log('Expanding full screen with overlayMode', this.overlayMode);
	    if (!this.overlayMode) {
	      this.updatePanes();
	    }
	    jQuery('#inject-litmus-checklist').removeAttr('style');
	    this.draggedDistance = 0;
	  };

	  ChecklistDragHandler.prototype.fullScreenCollapsed = function fullScreenCollapsed() {
	    jQuery('#inject-litmus-checklist').removeAttr('style');
	    jQuery('#inject-litmus-checklist').css({
	      'width': this.currentSidebarWidth + 'px'
	    });
	    // set a class on section-body if larger than the threshold
	    this.checkForWideSidebar(this.currentSidebarWidth);
	    this.draggedDistance = 0;
	  };

	  ChecklistDragHandler.prototype.mousedown = function mousedown(e) {
	    this.dragging = true;
	    this.origX = e.pageX;
	    this.origRight = parseInt(jQuery('#inject-litmus-checklist').css('right'));
	    jQuery('.draggable-overlay').show();
	    jQuery('#inject-litmus-checklist-iframe').css('pointer-events', 'none');

	    // Turn off transitions while dragging
	    jQuery('#inject-litmus-checklist').css('transition', 'none');
	  };

	  ChecklistDragHandler.prototype.mousemove = function mousemove(e) {
	    if (this.dragging) {
	      this.moved = true;
	      e.preventDefault();
	      var posX = jQuery(window).width() - e.pageX;

	      //let newRight = this.origRight + diffX;
	      var newWidth = posX;

	      // snap to minimum width if it is reached
	      if (newWidth < this.minSidebarWidth - 10) {
	        newWidth = this.minSidebarWidth;
	      }
	      // set a class on section-body if larger than the threshold
	      this.checkForWideSidebar(newWidth);

	      this.currentSidebarWidth = newWidth;
	      this.updatePanes();
	    }
	  };

	  ChecklistDragHandler.prototype.checkForWideSidebar = function checkForWideSidebar() {
	    var newWidth = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    newWidth = newWidth || this.currentSidebarWidth;
	    if (newWidth >= this.largeThumbThreshold) {
	      Utils.postMessageToIframeWindow({ method: 'checklist-activateWideSidebar' }, '*');
	    } else {
	      Utils.postMessageToIframeWindow({ method: 'checklist-deactivateWideSidebar' }, '*');
	    }
	  };

	  ChecklistDragHandler.prototype.mouseup = function mouseup(e) {
	    // Snap to collapsed/expand
	    var currWidth = null;
	    var currRight = null;
	    if (this.fullScreenEnabled) {
	      currWidth = parseInt(jQuery('#inject-litmus-checklist').css('width'));
	      this.draggedDistance = currWidth - 460;
	      jQuery('body').css('width', 'calc(100% - ' + currWidth + 'px)');
	    }

	    if (this.dragging) {
	      this.dragging = false;
	      jQuery('.draggable-overlay').hide();

	      // Remove transition override
	      jQuery('#inject-litmus-checklist').css('transition', '');
	      jQuery('#inject-litmus-checklist-iframe').css('pointer-events', '');

	      // If mouse didn't move, then this is a single click, so toggle expand/collapse.
	      // Don't handle single clicks when full screen is enabled.
	      // Handle single clicks when full screen is enabled and the checklist is collapsed
	      var collapsed = jQuery('#inject-litmus-checklist').is('.collapsed');

	      if (!this.moved) {
	        if (!this.fullScreenEnabled || collapsed) {
	          if (collapsed) {
	            this.checklistPresenter.expand();
	          } else {
	            this.checklistPresenter.collapse();
	          }
	        }
	      }

	      this.moved = false;

	      currRight = parseInt(jQuery('#inject-litmus-checklist').css('right'));
	    }
	  };

	  return ChecklistDragHandler;
	})();

		module.exports = new ChecklistDragHandler();

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);
	var Provider = __webpack_require__(102);

	var PardotProvider = (function () {
	  function PardotProvider() {
	    babelHelpers.classCallCheck(this, PardotProvider);

	    this.editable = false;
	  }

	  PardotProvider.prototype.id = function id() {
	    var matchData = window.location.href.match(/\.*id\/(\d+)/);
	    if (matchData !== null) {
	      return matchData[1];
	    } else {
	      return null;
	    }
	  };

	  PardotProvider.prototype.lookup = function lookup() {
	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    this._fetchSendDetailsJqueryObject().then(function (jQueryObject) {
	      _this.getContent(options, _this._emailDetails(jQueryObject));
	    });
	  };

	  PardotProvider.prototype._fetchSendDetailsJqueryObject = function _fetchSendDetailsJqueryObject() {
	    return new Promise(function (resolve, reject) {
	      if (document.getElementById('subject_a')) {
	        // We're in a page that has the subject available to read and we
	        // can fetch it directly
	        return resolve(jQuery('body'));
	      } else {
	        // We have to fetch a page that does contain the subject
	        var sendUrl = window.location.href.replace(/(edit|test)/, 'send');
	        fetch(sendUrl).then(function (response) {
	          return response.text();
	        }).then(function (htmlText) {
	          return resolve(jQuery(htmlText));
	        });
	      }
	    });
	  };

	  PardotProvider.prototype._emailDetails = function _emailDetails(jQueryObject) {
	    return {
	      providerType: Provider.pardotName(),
	      content: null,
	      text: null,
	      subject: jQueryObject.find('#subject_a').val(),
	      fromName: null,
	      fromEmail: null,
	      id: this.id()
	    };
	  };

	  PardotProvider.prototype.getContent = function getContent(options, result) {
	    window.postMessage({
	      method: 'checklist-lookupResult',
	      result: result,
	      testType: options.testType || 'checklist'
	    }, '*');
	  };

	  return PardotProvider;
	})();

		window.ChecklistProvider = new PardotProvider();

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	var SendgridProvider = (function () {
	  function SendgridProvider() {
	    babelHelpers.classCallCheck(this, SendgridProvider);

	    this.editable = false;
	  }

	  SendgridProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var previewURL = window.location.href.replace('edit', 'preview') + '.json';

	    jQuery.get(previewURL).done(function (data) {
	      var result = {
	        content: data.html_content,
	        text: data.plain_content,
	        subject: data.subject,
	        fromName: null,
	        fromEmail: null
	      };

	      window.postMessage({
	        method: 'checklist-lookupResult',
	        result: result,
	        testType: options.testType || 'checklist'
	      }, '*');
	    });
	  };

	  SendgridProvider.prototype.injectCSS = function injectCSS() {
	    jQuery('body').append('\n      <style id=\'checklist-injected-css\'>\n        .content-editor-container .left-action {\n          padding-right: 20px;\n          padding-left: 20px;\n        }\n\n        .modal-dialog {\n          margin-left: inherit;\n        }\n\n        .cke_dialog.cke_browser_webkit.cke_ltr.cke_single_page {\n          left: 200px!important;\n        }\n      </style>\n    ');
	  };

	  return SendgridProvider;
	})();

		window.ChecklistProvider = new SendgridProvider();

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	var SilverpopProvider = (function () {
	  function SilverpopProvider() {
	    babelHelpers.classCallCheck(this, SilverpopProvider);

	    this.editable = false;
	  }

	  SilverpopProvider.prototype.lookup = function lookup() {
	    var _this = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var lookupFn = null;
	    if (window.location.pathname.indexOf('composeMailing7.do') === -1) {
	      lookupFn = this.downloadComposeHTML();
	    } else {
	      lookupFn = this.fetchHTMLFromCurrentPage();
	    }

	    lookupFn(function (html) {
	      var content = html.find('#fckTextArea___Frame').contents().find('#xEditingArea').find('iframe').contents().find('body').html() || html.find('#fckTextArea___Frame').contents().find('#xEditingArea').find('textarea').val() || html.find('#mailingHTMLBody').val();

	      //let content   = html.find('#mailingHTMLBody').val();
	      var text = html.find('#mailingTEXTBody').val();
	      var subject = html.find('#mailingSubject').val();
	      var fromName = html.find('#mailingFromName').val();
	      var fromEmail = html.find('#mailingFromAddress').val();
	      var id = _this.id();

	      var result = { content: content, text: text, subject: subject, fromName: fromName, fromEmail: fromEmail, id: id };

	      window.postMessage({
	        method: 'checklist-lookupResult',
	        result: result,
	        testType: options.testType || 'checklist'
	      }, '*');
	    });
	  };

	  SilverpopProvider.prototype.fetchHTMLFromCurrentPage = function fetchHTMLFromCurrentPage() {
	    return function (callback) {
	      callback(jQuery('body'));
	    };
	  };

	  SilverpopProvider.prototype.downloadComposeHTML = function downloadComposeHTML() {
	    return function (callback) {
	      var thumbHolder = jQuery('.templateThumbnailHolder').eq(0);

	      if (thumbHolder.length) {
	        var mailingId = null;
	        var matchData = thumbHolder.attr('style').match(/MAILING_ID=(\d+)/);
	        if (matchData) {
	          mailingId = matchData[1];
	          composeURL = '/composeMailing7.do?action=displayLoadTemplate&mailingid=' + mailingId + '&templateType=0';

	          jQuery.get(composeURL).done(function (data) {
	            callback(jQuery(data));
	          });
	        } else {
	          console.log('Could not find mailing ID in .templateThumbnailHolder style!');
	        }
	      } else {
	        var matchData = window.location.href.match(/.\/composer\/(\d+)(\/.)*/);
	        if (matchData) {
	          var mailingId = matchData[1];
	          composeURL = '/composeMailing7.do?action=displayLoadTemplate&mailingid=' + mailingId + '&templateType=0';

	          jQuery.get(composeURL).done(function (data) {
	            callback(jQuery(data));
	          });
	        }
	      }
	    };
	  };

	  SilverpopProvider.prototype.id = function id() {
	    var idMatch = window.location.href.match(/mailingid=(\d+)/) || window.location.href.match(/.\/composer\/(\d+)(\/.)*/);
	    if (idMatch) {
	      return idMatch[1];
	    }
	  };

	  return SilverpopProvider;
	})();

		window.ChecklistProvider = new SilverpopProvider();

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	const jQuery = __webpack_require__(96);

	var ConstantContactProvider = (function () {
	  function ConstantContactProvider() {
	    babelHelpers.classCallCheck(this, ConstantContactProvider);

	    this.editable = false;
	  }

	  ConstantContactProvider.prototype.getParameterByName = function getParameterByName(name) {
	    name = name.replace(/[\\[]/, '\\\\[').replace(/[\\]]/, '\\\\]');
	    regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)');
	    var results = regex.exec(location.search);
	    if (results && results[1]) {
	      return decodeURIComponent(results[1].replace(/\\+/g, ' '));
	    } else {
	      return null;
	    }
	  };

	  ConstantContactProvider.prototype.getUidFromPreviewImageUrl = function getUidFromPreviewImageUrl() {
	    var srcUrl = jQuery('img#previewImage').attr('src');
	    var match = srcUrl.match(/.\/activity\/(d+)\/./);

	    if (match !== null) {
	      return match[0];
	    } else {
	      return null;
	    }
	  };

	  ConstantContactProvider.prototype.getUidFromPrevPage = function getUidFromPrevPage(callback) {
	    jQuery.get(window.location).success(function (data) {
	      var uid = jQuery(data).find('input[name="agent.uid"]').val();
	      return callback(uid);
	    });
	  };

	  ConstantContactProvider.prototype.lookup = function lookup() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    if (window.location.pathname.match(/rnavmap\/evaluate\.rnav/) !== null) {
	      this.lookupCustomCodeEmailCampaign(options);
	    }

	    if (window.location.pathname.match(/rnavmap\/emcf\/email/) !== null) {
	      this.lookupNewsletterEmailCampaign(options);
	    }
	  };

	  ConstantContactProvider.prototype.lookupCustomCodeEmailCampaign = function lookupCustomCodeEmailCampaign(options) {
	    const uid = jQuery('input[name="agent.uid"]').val() || this.getParameterByName('agent.uid');

	    var result = {};
	    var subject = jQuery('input[name  = "LETTER.SUBJECT"]').val();
	    var fromEmail = jQuery('select[name = "LETTER.FROM.EMAIL"] option[selected]').text();
	    var replyEmail = jQuery('select[name = "LETTER.REPLY.EMAIL"] option[selected]').text();
	    var fromName = jQuery('input[name  = "LETTER.FROM.NAME"]').val();

	    var popupHTMLPreviewUrl = 'https://ui.constantcontact.com/templates/previewer.jsp?format=html&agent.uid=' + uid;
	    var popupTextPreviewUrl = 'https://ui.constantcontact.com/templates/previewer.jsp?format=txt&agent.uid=' + uid;
	    jQuery.get(popupHTMLPreviewUrl).pipe(function (popupHtmlData) {
	      var $popupHTML = jQuery(popupHtmlData);
	      var foundBRTag = false;
	      var filteredData = [];
	      for (var i = 0; i < $popupHTML.length; i++) {
	        if (!foundBRTag) {
	          if ($popupHTML[i].localName === 'br') {
	            foundBRTag = true;
	          }
	        } else {
	          filteredData.push($popupHTML[i]);
	        }
	      }
	      var htmlData = '';
	      jQuery(filteredData).each(function (index, item) {
	        if (jQuery(item).html()) {
	          htmlData += jQuery(item).prop('outerHTML');
	        }
	      });

	      var $previewPage = jQuery(popupHtmlData);
	      var firstTrText = $previewPage.find('.previewHeaderTable tr:first td.previewHeaderValue').text();
	      var secondTrText = $previewPage.find('.previewHeaderTable tr:nth-child(2) td.previewHeaderValue').text();

	      var name = undefined,
	          email = undefined;
	      var fromRegex = /(.*)<(.*@.*)>/;
	      var match = fromRegex.exec(firstTrText.trim());
	      if (match !== null) {
	        email = match[2];

	        if (!fromName) {
	          fromName = match[1] && match[1].trim();
	        }
	      }

	      if (!subject) {
	        subject = secondTrText.replace('Subject:', '');
	      }

	      if (!fromEmail) {
	        fromEmail = email;
	      }

	      result = {
	        content: htmlData,
	        subject: subject,
	        fromName: fromName,
	        fromEmail: fromEmail
	      };
	      return jQuery.get(popupTextPreviewUrl);
	    }).pipe(function (popupTextData) {
	      var text = jQuery(popupTextData).find('pre').text();
	      result.text = text;
	      window.postMessage({
	        method: 'checklist-lookupResult',
	        result: result,
	        testType: options.testType || 'checklist'
	      }, '*');
	    }).fail(function () {
	      result.content = ' ';
	      result.text = ' ';

	      window.postMessage({
	        method: 'checklist-lookupResult',
	        result: result,
	        testType: options.testType || 'checklist'
	      }, '*');
	    });
	  };

	  ConstantContactProvider.prototype.lookupNewsletterEmailCampaign = function lookupNewsletterEmailCampaign(options) {
	    const processPreviewPage = function processPreviewPage(uid) {
	      var result = null;
	      var subject = jQuery('input#subject').val();
	      var fromEmail = jQuery('from-email-dropdown').text();

	      var replyEmail = jQuery('reply-email-dropdown').text();
	      var fromName = jQuery('input#fromName').val();

	      previewURL = '/visualeditor/visual_editor_preview.jsp?agent.uid=' + uid;

	      jQuery.get(previewURL, function (data) {
	        var htmlData = jQuery(data);
	        var htmlMatches = data.match(/<html\b[^>]*>((.|[\n\r])*)<\/html>/i);
	        if (!subject) {
	          subject = htmlData.find('td strong:contains("Subject:")').closest('tr').find('td').last().text().trim();
	        }

	        if (!fromEmail) {
	          fromEmail = htmlData.find('td strong:contains("From:")').closest('tr').find('td').last().text().trim();
	        }
	        if (!fromName) {
	          var nameEmailMatches = fromEmail.match(/([^<]+)<([^>]+)>/);
	          if (nameEmailMatches) {
	            fromName = nameEmailMatches[1].trim();
	            // fromEmail = nameEmailMatches[2].trim();
	          }
	        }

	        if (!replyEmail || replyEmail === '') {
	          /// Always set fromEmail to reply email for now.
	          replyEmail = htmlData.find('td strong:contains("Reply:")').closest('tr').find('td').last().text().trim();
	          fromEmail = replyEmail;
	        }

	        var html = htmlMatches !== null ? htmlMatches[0] : ' ';

	        // Preview popup injects some junk at the bottom of the email, including a hidden form.
	        html = html.replace(/<div id="leftActions"[\s\S]*<\/body>/, '</body>');

	        // Remove header table with subject/from/reply-to details
	        html = html.replace(/<table[^>]+class="header-info">[\s\S]*?<\/table>/, '');

	        result = {
	          content: html,
	          text: '',
	          subject: subject,
	          fromName: fromName,
	          fromEmail: fromEmail
	        };

	        window.postMessage({
	          method: 'checklist-lookupResult',
	          result: result,
	          testType: options.testType || 'checklist'
	        }, '*');
	      }).error(function (err) {
	        // empty html content for fallback
	        result = {
	          content: ' ',
	          text: '',
	          subject: subject,
	          fromName: fromName,
	          fromEmail: fromEmail
	        };

	        window.postMessage({
	          method: 'checklist-lookupResult',
	          result: result,
	          testType: options.testType || 'checklist'
	        }, '*');
	      });
	    };

	    var uid = jQuery('input[name="agent.uid"]').val() || this.getParameterByName('agent.uid');

	    if (uid) {
	      processPreviewPage(uid);
	    } else {
	      this.getUidFromPrevPage(processPreviewPage);
	    }
	  };

	  // Easiest way to fix the body width, since they have a fixed position sidebar on the left

	  ConstantContactProvider.prototype.opened = function opened() {
	    jQuery('body').css('width', 'calc(100% - 470px - 90px)');
	  };

	  ConstantContactProvider.prototype.closed = function closed() {
	    jQuery('body').css('width', 'calc(100% - 10px - 90px)');
	  };

	  ConstantContactProvider.prototype.injectCSS = function injectCSS() {
	    jQuery('body').append('\n      <style>\n        html.litmus-checklist-expanded body { margin-left: 0; }\n        html.litmus-checklist-expanded header.ToolkitHeader { width: calc(100% - 470px) }\n      </style>\n    ');
	  };

	  ConstantContactProvider.prototype.id = function id() {
	    var uid = jQuery('input[name="agent.uid"]').val() || this.getParameterByName('agent.uid');

	    if (uid) {
	      return processPreviewPage(uid);
	    } else {
	      return this.getUidFromPrevPage(processPreviewPage);
	    }
	  };

	  return ConstantContactProvider;
	})();

		window.ChecklistProvider = new ConstantContactProvider();

/***/ }
/******/ ]);
//# sourceMappingURL=nativeMessages.js.map