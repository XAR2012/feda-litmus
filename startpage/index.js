webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(2);
	__webpack_require__(6);

	$(function () {
	  if ($('body').data('startpage')) {
	    (function () {
	      var transitionToStep = function transitionToStep(index) {
	        $('#pager .page-btn').removeClass('active');
	        $('#pager .page-btn[data-step="' + index + '"]').addClass('active');

	        const $nextStep = $('#step' + index);

	        // Fade out current step and fade in next
	        $('.step.visible').fadeOut(250, function () {
	          $('.step.visible').removeClass('visible');
	          $nextStep.fadeIn(250, function () {
	            $(this).addClass('visible');
	          });
	        });

	        var prevStepButton = $('.page-btn[data-step=' + (index - 1) + ']');
	        prevStepButton.off();
	        prevStepButton.css('cursor', 'default');
	        prevStepButton.find('.counter').html('<span class="feathericon-check"></span>');
	        if (index === 3) {
	          $('.next-step.final').on('click', function (e) {
	            e.preventDefault();

	            chrome.tabs.getCurrent(function (tab) {
	              chrome.tabs.remove(tab.id);
	            });
	          });
	        }
	      };

	      try {
	        Typekit.load();
	      } catch (e) {}
	      if (window.location.hash.match(/step-(\d)*/)) {
	        var step = window.location.hash.match(/step-(\d)*/)[1];
	        if (step) {
	          transitionToStep(step);
	        }
	      }

	      $('.next-step').on('click', function (event) {
	        event.preventDefault();

	        const currentStep = $('#pager .page-btn.active').data('step');
	        const nextStep = currentStep + 1;

	        transitionToStep(nextStep);
	      });

	      $('.previous-step').on('click', function (event) {
	        event.preventDefault();

	        const currentStep = $('#pager .page-btn.active').data('step');
	        const nextStep = currentStep - 1;

	        transitionToStep(nextStep);
	      });

	      $('#pager .page-btn').on('click', function (event) {
	        event.preventDefault();
	      });

	      $('#file-access').on('click', function (e) {
	        chrome.tabs.create({ url: 'chrome://extensions/?id=' + chrome.runtime.id, active: true });
	        transitionToStep(2);
	      });
	    })();
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7)(__webpack_require__(8)+"\n\n// SCRIPT-LOADER FOOTER\n//# sourceURL=script:///Users/jiggypete/code/litmus/litmus-extension/node_modules/babel-loader/index.js%3F%7B%22loose%22:%22all%22,%22externalHelpers%22:true,%22cacheDirectory%22:true,%22blacklist%22:%5B%22useStrict%22,%22es6.constants%22%5D,%22optional%22:%5B%22es7.classProperties%22,%22utility.inlineEnvironmentVariables%22,%22validation.react%22%5D,%22stage%22:0,%22plugins%22:%5B%5D%7D!/Users/jiggypete/code/litmus/litmus-extension/node_modules/babel-loader/index.js?%7B%22loose%22:%22all%22,%22externalHelpers%22:true,%22cacheDirectory%22:true,%22blacklist%22:%5B%22useStrict%22,%22es6.constants%22%5D,%22optional%22:%5B%22es7.classProperties%22,%22utility.inlineEnvironmentVariables%22,%22validation.react%22%5D,%22stage%22:0,%22plugins%22:%5B%5D%7D!/Users/jiggypete/code/litmus/litmus-extension/src/chrome/sidebar/typekitjs.js")

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		function log(error) {
			(typeof console !== "undefined")
			&& (console.error || console.log)("[Script Loader]", error);
		}

		// Check for IE =< 8
		function isIE() {
			return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
		}

		try {
			if (typeof execScript !== "undefined" && isIE()) {
				execScript(src);
			} else if (typeof eval !== "undefined") {
				eval.call(null, src);
			} else {
				log("EvalError: No eval function available");
			}
		} catch (error) {
			log(error);
		}
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "(function (d) {\n    var config = {\n        kitId: 'yvr0kmo',\n        scriptTimeout: 3000,\n        async: true\n    },\n        h = d.documentElement,\n        t = setTimeout(function () {\n        h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive';\n    }, config.scriptTimeout),\n        tk = d.createElement('script'),\n        f = false,\n        s = d.getElementsByTagName('script')[0],\n        a;\n    h.className += ' wf-loading';\n    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';\n    tk.async = true;\n    tk.onload = tk.onreadystatechange = function () {\n        a = this.readyState;\n        if (f || a && a !== 'complete' && a !== 'loaded') {\n            return;\n        };\n        f = true;\n        clearTimeout(t);\n        try {\n            Typekit.load(config);\n        } catch (e) {}\n    };\n    s.parentNode.insertBefore(tk, s);\n})(document);"

/***/ }
]);
//# sourceMappingURL=index.js.map