'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var jsxRuntime = require('react/jsx-runtime');
var styled$3 = require('styled-components');
var api = require('@chia/api');
var apiReact = require('@chia/api-react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var react = require('@lingui/react');
var reactUse = require('react-use');
var iconsMaterial = require('@mui/icons-material');
var reactUseTimeout = require('react-use-timeout');
var _extends = require('@babel/runtime/helpers/esm/extends');
var _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/esm/objectWithoutPropertiesLoose');
var styled$2 = require('@mui/styled-engine-sc');
var utils = require('@mui/utils');
var reactRouterDom = require('react-router-dom');
var NumberFormat = require('react-number-format');
var reactHookForm = require('react-hook-form');
var lodash = require('lodash');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var BigNumber = require('bignumber.js');
var moment = require('moment');
var localStorage = require('@rehooks/local-storage');
var matchSorter = require('match-sorter');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var lab = require('@mui/lab');
var reactDropzone = require('react-dropzone');
var styles = require('@mui/material/styles');
var Button$1 = require('@mui/material/Button');
var Menu = require('@mui/material/Menu');
var KeyboardArrowDownIcon = require('@mui/icons-material/KeyboardArrowDown');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var StackTrace = require('stacktrace-js');
var styles$1 = require('@mui/styles');
var qs = require('qs');
var isElectron = require('is-electron');
require('@fontsource/roboto/700.css');
require('@fontsource/roboto/500.css');
require('@fontsource/roboto/400.css');
require('@fontsource/roboto/300.css');
var reactRouter = require('react-router');
var reactRedux = require('react-redux');
var core = require('@lingui/core');
var icons = require('@chia/icons');
var _extends$1 = require('@babel/runtime/helpers/extends');
var ScrollToBottom = require('react-scroll-to-bottom');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var core$1 = require('@chia/core');
var materialLocales = require('@mui/material/locale');
var os = require('os');
var JSONbig = require('json-bigint');
var colors = require('@mui/material/colors');
var _wrapNativeSuper = require('@babel/runtime/helpers/wrapNativeSuper');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default$1 = /*#__PURE__*/_interopDefaultLegacy(styled$3);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutPropertiesLoose__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutPropertiesLoose);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled$2);
var NumberFormat__default = /*#__PURE__*/_interopDefaultLegacy(NumberFormat);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button$1);
var Menu__default = /*#__PURE__*/_interopDefaultLegacy(Menu);
var KeyboardArrowDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(KeyboardArrowDownIcon);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var StackTrace__default = /*#__PURE__*/_interopDefaultLegacy(StackTrace);
var qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);
var isElectron__default = /*#__PURE__*/_interopDefaultLegacy(isElectron);
var _extends__default$1 = /*#__PURE__*/_interopDefaultLegacy(_extends$1);
var ScrollToBottom__default = /*#__PURE__*/_interopDefaultLegacy(ScrollToBottom);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var materialLocales__namespace = /*#__PURE__*/_interopNamespace(materialLocales);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var JSONbig__default = /*#__PURE__*/_interopDefaultLegacy(JSONbig);
var _wrapNativeSuper__default = /*#__PURE__*/_interopDefaultLegacy(_wrapNativeSuper);

function Accordion(props) {
  var expanded = props.expanded,
      children = props.children;
  return /*#__PURE__*/jsxRuntime.jsx(material.Collapse, {
    "in": expanded,
    children: children
  });
}
Accordion.defaultProps = {
  children: undefined,
  expanded: false
};

function useCurrencyCode() {
  var _useGetNetworkInfoQue = apiReact.useGetNetworkInfoQuery(),
      networkInfo = _useGetNetworkInfoQue.data,
      isLoading = _useGetNetworkInfoQue.isLoading;

  if (isLoading || !networkInfo) {
    return undefined;
  }

  return networkInfo.networkPrefix.toUpperCase();
}

var _excluded$I = ["flexDirection", "direction", "inline", "sx"];

function ownKeys$M(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$M(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$M(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$M(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Flex(props) {
  var _props$flexDirection = props.flexDirection,
      flexDirection = _props$flexDirection === void 0 ? 'row' : _props$flexDirection,
      direction = props.direction,
      inline = props.inline,
      sx = props.sx,
      rest = _objectWithoutProperties__default["default"](props, _excluded$I);

  var computedDirection = direction !== null && direction !== void 0 ? direction : flexDirection;
  return /*#__PURE__*/jsxRuntime.jsx(material.Stack, _objectSpread$M({
    direction: computedDirection,
    sx: _objectSpread$M({
      display: inline ? 'inline-flex' : 'flex'
    }, sx)
  }, rest));
}

var propTypes = {exports: {}};

var reactIs = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

reactIs_development.AsyncMode = AsyncMode;
reactIs_development.ConcurrentMode = ConcurrentMode;
reactIs_development.ContextConsumer = ContextConsumer;
reactIs_development.ContextProvider = ContextProvider;
reactIs_development.Element = Element;
reactIs_development.ForwardRef = ForwardRef;
reactIs_development.Fragment = Fragment;
reactIs_development.Lazy = Lazy;
reactIs_development.Memo = Memo;
reactIs_development.Portal = Portal;
reactIs_development.Profiler = Profiler;
reactIs_development.StrictMode = StrictMode;
reactIs_development.Suspense = Suspense;
reactIs_development.isAsyncMode = isAsyncMode;
reactIs_development.isConcurrentMode = isConcurrentMode;
reactIs_development.isContextConsumer = isContextConsumer;
reactIs_development.isContextProvider = isContextProvider;
reactIs_development.isElement = isElement;
reactIs_development.isForwardRef = isForwardRef;
reactIs_development.isFragment = isFragment;
reactIs_development.isLazy = isLazy;
reactIs_development.isMemo = isMemo;
reactIs_development.isPortal = isPortal;
reactIs_development.isProfiler = isProfiler;
reactIs_development.isStrictMode = isStrictMode;
reactIs_development.isSuspense = isSuspense;
reactIs_development.isValidElementType = isValidElementType;
reactIs_development.typeOf = typeOf;
  })();
}

if (process.env.NODE_ENV === 'production') {
  reactIs.exports = reactIs_production_min;
} else {
  reactIs.exports = reactIs_development;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$3;

var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = has$2;

  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning$1(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes$1.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactIs$1 = reactIs.exports;
var assign = objectAssign;

var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
var has = has$2;
var checkPropTypes = checkPropTypes_1;

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret$1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs$1.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs.exports;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}

var PropTypes = propTypes.exports;

const responsivePropType = process.env.NODE_ENV !== 'production' ? PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]) : {};
var responsivePropType$1 = responsivePropType;

function merge(acc, item) {
  if (!item) {
    return acc;
  }

  return utils.deepmerge(acc, item, {
    clone: false // No need to clone deep, it's way faster.

  });
}

// For instance with the first breakpoint xs: [xs, sm[.

const values = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536 // large screen

};
const defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: key => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};

  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }

  if (typeof propValue === 'object') {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      // key is breakpoint
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }

      return acc;
    }, {});
  }

  const output = styleFromPropValue(propValue);
  return output;
}

function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;

  const breakpointsInOrder = breakpointsInput == null ? void 0 : (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;

    if (isBreakpointUnused) {
      delete acc[key];
    }

    return acc;
  }, style);
}

function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  } // Check if CSS variables are used


  if (obj && obj.vars) {
    const val = `vars.${path}`.split('.').reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);

    if (val != null) {
      return val;
    }
  }

  return path.split('.').reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }

    return null;
  }, obj);
}

function getValue$1(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }

  if (transform) {
    value = transform(value);
  }

  return value;
}

function style$1(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;

  const fn = props => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};

    const styleFromPropValue = propValueFinal => {
      let value = getValue$1(themeMapping, transform, propValueFinal);

      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue$1(themeMapping, transform, `${prop}${propValueFinal === 'default' ? '' : utils.unstable_capitalize(propValueFinal)}`, propValueFinal);
      }

      if (cssProperty === false) {
        return value;
      }

      return {
        [cssProperty]: value
      };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  fn.propTypes = process.env.NODE_ENV !== 'production' ? {
    [prop]: responsivePropType$1
  } : {};
  fn.filterProps = [prop];
  return fn;
}

function compose(...styles) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach(prop => {
      acc[prop] = style;
    });
    return acc;
  }, {});

  const fn = props => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }

      return acc;
    }, {});
  };

  fn.propTypes = process.env.NODE_ENV !== 'production' ? styles.reduce((acc, style) => Object.assign(acc, style.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style) => acc.concat(style.filterProps), []);
  return fn;
}

function memoize(fn) {
  const cache = {};
  return arg => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}

const properties = {
  m: 'margin',
  p: 'padding'
};
const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom']
};
const aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py'
}; // memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec

const getCssProperties = memoize(prop => {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }

  const [a, b] = prop.split('');
  const property = properties[a];
  const direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(dir => property + dir) : [property + direction];
});
const marginKeys = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'marginInline', 'marginInlineStart', 'marginInlineEnd', 'marginBlock', 'marginBlockStart', 'marginBlockEnd'];
const paddingKeys = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY', 'paddingInline', 'paddingInlineStart', 'paddingInlineEnd', 'paddingBlock', 'paddingBlockStart', 'paddingBlockEnd'];
const spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;

  const themeSpacing = (_getPath = getPath(theme, themeKey)) != null ? _getPath : defaultValue;

  if (typeof themeSpacing === 'number') {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (typeof abs !== 'number') {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
        }
      }

      return themeSpacing * abs;
    };
  }

  if (Array.isArray(themeSpacing)) {
    return abs => {
      if (typeof abs === 'string') {
        return abs;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (!Number.isInteger(abs)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.` + `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join('\n'));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join('\n'));
        }
      }

      return themeSpacing[abs];
    };
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, 'It should be a number, an array or a function.'].join('\n'));
  }

  return () => undefined;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, 'spacing', 8, 'spacing');
}
function getValue(transformer, propValue) {
  if (typeof propValue === 'string' || propValue == null) {
    return propValue;
  }

  const abs = Math.abs(propValue);
  const transformed = transformer(abs);

  if (propValue >= 0) {
    return transformed;
  }

  if (typeof transformed === 'number') {
    return -transformed;
  }

  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return propValue => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}

function resolveCssProperty(props, keys, prop, transformer) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it's doesn't worth the bundle size.
  if (keys.indexOf(prop) === -1) {
    return null;
  }

  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}

function style(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map(prop => resolveCssProperty(props, keys, prop, transformer)).reduce(merge, {});
}
process.env.NODE_ENV !== 'production' ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
process.env.NODE_ENV !== 'production' ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};

function spacing(props) {
  return style(props, spacingKeys);
}

spacing.propTypes = process.env.NODE_ENV !== 'production' ? spacingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType$1;
  return obj;
}, {}) : {};
spacing.filterProps = spacingKeys;

function getBorder(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return `${value}px solid`;
}

const border = style$1({
  prop: 'border',
  themeKey: 'borders',
  transform: getBorder
});
const borderTop = style$1({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: getBorder
});
const borderRight = style$1({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: getBorder
});
const borderBottom = style$1({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: getBorder
});
const borderLeft = style$1({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: getBorder
});
const borderColor = style$1({
  prop: 'borderColor',
  themeKey: 'palette'
});
const borderTopColor = style$1({
  prop: 'borderTopColor',
  themeKey: 'palette'
});
const borderRightColor = style$1({
  prop: 'borderRightColor',
  themeKey: 'palette'
});
const borderBottomColor = style$1({
  prop: 'borderBottomColor',
  themeKey: 'palette'
});
const borderLeftColor = style$1({
  prop: 'borderLeftColor',
  themeKey: 'palette'
});
const borderRadius = props => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4, 'borderRadius');

    const styleFromPropValue = propValue => ({
      borderRadius: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }

  return null;
};
borderRadius.propTypes = process.env.NODE_ENV !== 'production' ? {
  borderRadius: responsivePropType$1
} : {};
borderRadius.filterProps = ['borderRadius'];
const borders = compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
var borders$1 = borders;

const displayPrint = style$1({
  prop: 'displayPrint',
  cssProperty: false,
  transform: value => ({
    '@media print': {
      display: value
    }
  })
});
const displayRaw = style$1({
  prop: 'display'
});
const overflow = style$1({
  prop: 'overflow'
});
const textOverflow = style$1({
  prop: 'textOverflow'
});
const visibility = style$1({
  prop: 'visibility'
});
const whiteSpace = style$1({
  prop: 'whiteSpace'
});
var display = compose(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);

const flexBasis = style$1({
  prop: 'flexBasis'
});
const flexDirection = style$1({
  prop: 'flexDirection'
});
const flexWrap = style$1({
  prop: 'flexWrap'
});
const justifyContent = style$1({
  prop: 'justifyContent'
});
const alignItems = style$1({
  prop: 'alignItems'
});
const alignContent = style$1({
  prop: 'alignContent'
});
const order = style$1({
  prop: 'order'
});
const flex = style$1({
  prop: 'flex'
});
const flexGrow = style$1({
  prop: 'flexGrow'
});
const flexShrink = style$1({
  prop: 'flexShrink'
});
const alignSelf = style$1({
  prop: 'alignSelf'
});
const justifyItems = style$1({
  prop: 'justifyItems'
});
const justifySelf = style$1({
  prop: 'justifySelf'
});
const flexbox = compose(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var flexbox$1 = flexbox;

const gap = props => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');

    const styleFromPropValue = propValue => ({
      gap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }

  return null;
};
gap.propTypes = process.env.NODE_ENV !== 'production' ? {
  gap: responsivePropType$1
} : {};
gap.filterProps = ['gap'];
const columnGap = props => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'columnGap');

    const styleFromPropValue = propValue => ({
      columnGap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }

  return null;
};
columnGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  columnGap: responsivePropType$1
} : {};
columnGap.filterProps = ['columnGap'];
const rowGap = props => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'rowGap');

    const styleFromPropValue = propValue => ({
      rowGap: getValue(transformer, propValue)
    });

    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }

  return null;
};
rowGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  rowGap: responsivePropType$1
} : {};
rowGap.filterProps = ['rowGap'];
const gridColumn = style$1({
  prop: 'gridColumn'
});
const gridRow = style$1({
  prop: 'gridRow'
});
const gridAutoFlow = style$1({
  prop: 'gridAutoFlow'
});
const gridAutoColumns = style$1({
  prop: 'gridAutoColumns'
});
const gridAutoRows = style$1({
  prop: 'gridAutoRows'
});
const gridTemplateColumns = style$1({
  prop: 'gridTemplateColumns'
});
const gridTemplateRows = style$1({
  prop: 'gridTemplateRows'
});
const gridTemplateAreas = style$1({
  prop: 'gridTemplateAreas'
});
const gridArea = style$1({
  prop: 'gridArea'
});
const grid = compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var grid$1 = grid;

const color = style$1({
  prop: 'color',
  themeKey: 'palette'
});
const bgcolor = style$1({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette'
});
const backgroundColor = style$1({
  prop: 'backgroundColor',
  themeKey: 'palette'
});
const palette = compose(color, bgcolor, backgroundColor);
var palette$1 = palette;

const position = style$1({
  prop: 'position'
});
const zIndex = style$1({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
const top = style$1({
  prop: 'top'
});
const right = style$1({
  prop: 'right'
});
const bottom = style$1({
  prop: 'bottom'
});
const left = style$1({
  prop: 'left'
});
var positions = compose(position, zIndex, top, right, bottom, left);

const boxShadow = style$1({
  prop: 'boxShadow',
  themeKey: 'shadows'
});
var shadows = boxShadow;

function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}

const width = style$1({
  prop: 'width',
  transform
});
const maxWidth = props => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = propValue => {
      var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;

      const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    };

    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }

  return null;
};
maxWidth.filterProps = ['maxWidth'];
const minWidth = style$1({
  prop: 'minWidth',
  transform
});
const height = style$1({
  prop: 'height',
  transform
});
const maxHeight = style$1({
  prop: 'maxHeight',
  transform
});
const minHeight = style$1({
  prop: 'minHeight',
  transform
});
style$1({
  prop: 'size',
  cssProperty: 'width',
  transform
});
style$1({
  prop: 'size',
  cssProperty: 'height',
  transform
});
const boxSizing = style$1({
  prop: 'boxSizing'
});
const sizing = compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var sizing$1 = sizing;

const fontFamily = style$1({
  prop: 'fontFamily',
  themeKey: 'typography'
});
const fontSize = style$1({
  prop: 'fontSize',
  themeKey: 'typography'
});
const fontStyle = style$1({
  prop: 'fontStyle',
  themeKey: 'typography'
});
const fontWeight = style$1({
  prop: 'fontWeight',
  themeKey: 'typography'
});
const letterSpacing = style$1({
  prop: 'letterSpacing'
});
const textTransform = style$1({
  prop: 'textTransform'
});
const lineHeight = style$1({
  prop: 'lineHeight'
});
const textAlign = style$1({
  prop: 'textAlign'
});
const typographyVariant = style$1({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography'
});
const typography = compose(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
var typography$1 = typography;

const filterPropsMapping = {
  borders: borders$1.filterProps,
  display: display.filterProps,
  flexbox: flexbox$1.filterProps,
  grid: grid$1.filterProps,
  positions: positions.filterProps,
  palette: palette$1.filterProps,
  shadows: shadows.filterProps,
  sizing: sizing$1.filterProps,
  spacing: spacing.filterProps,
  typography: typography$1.filterProps
};
const styleFunctionMapping = {
  borders: borders$1,
  display,
  flexbox: flexbox$1,
  grid: grid$1,
  positions,
  palette: palette$1,
  shadows,
  sizing: sizing$1,
  spacing,
  typography: typography$1
};
Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach(propName => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});

function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}

function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
} // eslint-disable-next-line @typescript-eslint/naming-convention


function unstable_createStyleFunctionSx(styleFunctionMapping$1 = styleFunctionMapping) {
  const propToStyleFunction = Object.keys(styleFunctionMapping$1).reduce((acc, styleFnName) => {
    styleFunctionMapping$1[styleFnName].filterProps.forEach(propName => {
      acc[propName] = styleFunctionMapping$1[styleFnName];
    });
    return acc;
  }, {});

  function getThemeValue(prop, value, theme) {
    const inputProps = {
      [prop]: value,
      theme
    };
    const styleFunction = propToStyleFunction[prop];
    return styleFunction ? styleFunction(inputProps) : {
      [prop]: value
    };
  }

  function styleFunctionSx(props) {
    const {
      sx,
      theme = {}
    } = props || {};

    if (!sx) {
      return null; // emotion & styled-components will neglect null
    }
    /*
     * Receive `sxInput` as object or callback
     * and then recursively check keys & values to create media query object styles.
     * (the result will be used in `styled`)
     */


    function traverse(sxInput) {
      let sxObject = sxInput;

      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== 'object') {
        // value
        return sxInput;
      }

      if (!sxObject) {
        return null;
      }

      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css = emptyBreakpoints;
      Object.keys(sxObject).forEach(styleKey => {
        const value = callIfFn(sxObject[styleKey], theme);

        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if (propToStyleFunction[styleKey]) {
              css = merge(css, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, x => ({
                [styleKey]: x
              }));

              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[styleKey] = styleFunctionSx({
                  sx: value,
                  theme
                });
              } else {
                css = merge(css, breakpointsValues);
              }
            }
          } else {
            css = merge(css, getThemeValue(styleKey, value, theme));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css);
    }

    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }

  return styleFunctionSx;
}
const styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ['sx'];
var defaultStyleFunctionSx = styleFunctionSx;

const _excluded$H = ["values", "unit", "step"];

const sortBreakpointsValues = values => {
  const breakpointsAsArray = Object.keys(values).map(key => ({
    key,
    val: values[key]
  })) || []; // Sort in ascending order

  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return _extends__default["default"]({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
}; // Keep in mind that @media is inclusive by the CSS specification.


function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536 // large screen

    },
    unit = 'px',
    step = 5
  } = breakpoints,
        other = _objectWithoutPropertiesLoose__default["default"](breakpoints, _excluded$H);

  const sortedValues = sortBreakpointsValues(values);
  const keys = Object.keys(sortedValues);

  function up(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = typeof values[key] === 'number' ? values[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values[start] === 'number' ? values[start] : start}${unit}) and ` + `(max-width:${(endIndex !== -1 && typeof values[keys[endIndex]] === 'number' ? values[keys[endIndex]] : end) - step / 100}${unit})`;
  }

  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }

    return up(key);
  }

  function not(key) {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key);

    if (keyIndex === 0) {
      return up(keys[1]);
    }

    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }

    return between(key, keys[keys.indexOf(key) + 1]).replace('@media', '@media not all and');
  }

  return _extends__default["default"]({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}

const shape = {
  borderRadius: 4
};
var shape$1 = shape;

/* tslint:enable:unified-signatures */
function createSpacing(spacingInput = 8) {
  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  } // Material Design layouts are visually balanced. Most measurements align to an 8dp grid, which aligns both spacing and the overall layout.
  // Smaller components, such as icons, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage


  const transform = createUnarySpacing({
    spacing: spacingInput
  });

  const spacing = (...argsInput) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }

    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map(argument => {
      const output = transform(argument);
      return typeof output === 'number' ? `${output}px` : output;
    }).join(' ');
  };

  spacing.mui = true;
  return spacing;
}

const _excluded$G = ["breakpoints", "palette", "spacing", "shape"];

function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options,
        other = _objectWithoutPropertiesLoose__default["default"](options, _excluded$G);

  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);
  let muiTheme = utils.deepmerge({
    breakpoints,
    direction: 'ltr',
    components: {},
    // Inject component definitions.
    palette: _extends__default["default"]({
      mode: 'light'
    }, paletteInput),
    spacing,
    shape: _extends__default["default"]({}, shape$1, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => utils.deepmerge(acc, argument), muiTheme);
  return muiTheme;
}

const _excluded$F = ["variant"];

function isEmpty$1(string) {
  return string.length === 0;
}
/**
 * Generates string classKey based on the properties provided. It starts with the
 * variant if defined, and then it appends all other properties in alphabetical order.
 * @param {object} props - the properties for which the classKey should be created.
 */


function propsToClassKey(props) {
  const {
    variant
  } = props,
        other = _objectWithoutPropertiesLoose__default["default"](props, _excluded$F);

  let classKey = variant || '';
  Object.keys(other).sort().forEach(key => {
    if (key === 'color') {
      classKey += isEmpty$1(classKey) ? props[key] : utils.unstable_capitalize(props[key]);
    } else {
      classKey += `${isEmpty$1(classKey) ? key : utils.unstable_capitalize(key)}${utils.unstable_capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}

const _excluded$E = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"],
      _excluded2$8 = ["theme"],
      _excluded3$2 = ["theme"];

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

const getVariantStyles = (name, theme) => {
  let variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};
  variants.forEach(definition => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

const variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;

  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(themeVariant => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach(key => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles.push(styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
}; // Update /system/styled/#api in case if this changes


function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}
const systemDefaultTheme = createTheme();

const lowercaseFirstLetter = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

function createStyled(input = {}) {
  const {
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
    styleFunctionSx = defaultStyleFunctionSx
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions,
          options = _objectWithoutPropertiesLoose__default["default"](inputOptions, _excluded$E); // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.


    const skipVariantsResolver = inputSkipVariantsResolver !== undefined ? inputSkipVariantsResolver : componentSlot && componentSlot !== 'Root' || false;
    const skipSx = inputSkipSx || false;
    let label;

    if (process.env.NODE_ENV !== 'production') {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    let shouldForwardPropOption = shouldForwardProp;

    if (componentSlot === 'Root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    }

    const defaultStyledResolver = styled__default["default"](tag, _extends__default["default"]({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));

    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map(stylesArg => {
        // On the server emotion doesn't use React.forwardRef for creating components, so the created
        // component stays as a function. This condition makes sure that we do not interpolate functions
        // which are basically components used as a selectors.
        // eslint-disable-next-line no-underscore-dangle
        return typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg ? _ref => {
          let {
            theme: themeInput
          } = _ref,
              other = _objectWithoutPropertiesLoose__default["default"](_ref, _excluded2$8);

          return stylesArg(_extends__default["default"]({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);

          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] = typeof slotStyle === 'function' ? slotStyle(_extends__default["default"]({}, props, {
                theme
              })) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }

          return null;
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }

      if (!skipSx) {
        expressionsWithDefaultTheme.push(props => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return styleFunctionSx(_extends__default["default"]({}, props, {
            theme
          }));
        });
      }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill(''); // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.

        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === 'function' && // On the server emotion doesn't use React.forwardRef for creating components, so the created
      // component stays as a function. This condition makes sure that we do not interpolate functions
      // which are basically components used as a selectors.
      // eslint-disable-next-line no-underscore-dangle
      styleArg.__emotion_real !== styleArg) {
        // If the type is function, we need to define the default theme.
        transformedStyleArg = _ref2 => {
          let {
            theme: themeInput
          } = _ref2,
              other = _objectWithoutPropertiesLoose__default["default"](_ref2, _excluded3$2);

          return styleArg(_extends__default["default"]({
            theme: isEmpty(themeInput) ? defaultTheme : themeInput
          }, other));
        };
      }

      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (process.env.NODE_ENV !== 'production') {
        let displayName;

        if (componentName) {
          displayName = `${componentName}${componentSlot || ''}`;
        }

        if (displayName === undefined) {
          displayName = `Styled(${utils.getDisplayName(tag)})`;
        }

        Component.displayName = displayName;
      }

      return Component;
    };

    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }

    return muiStyledResolver;
  };
}

const styled = createStyled();
var styled$1 = styled;

var _excluded$D = ["value", "size", "fontSize", "clearCopiedDelay", "invertColor", "data-testid"];

function ownKeys$L(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$L(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$L(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$L(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledAssignmentIcon = styled$1(iconsMaterial.Assignment)(function (_ref) {
  var theme = _ref.theme,
      invertColor = _ref.invertColor;
  return "\n  color: ".concat(invertColor ? theme.palette.common.white : theme.palette.text.secondary, ";\n");
});
function CopyToClipboard(props) {
  var value = props.value,
      _props$size = props.size,
      size = _props$size === void 0 ? 'small' : _props$size,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === void 0 ? 'medium' : _props$fontSize,
      _props$clearCopiedDel = props.clearCopiedDelay,
      clearCopiedDelay = _props$clearCopiedDel === void 0 ? 1000 : _props$clearCopiedDel,
      _props$invertColor = props.invertColor,
      invertColor = _props$invertColor === void 0 ? false : _props$invertColor,
      dataTestid = props["data-testid"],
      rest = _objectWithoutProperties__default["default"](props, _excluded$D);

  var _useCopyToClipboard = reactUse.useCopyToClipboard(),
      _useCopyToClipboard2 = _slicedToArray__default["default"](_useCopyToClipboard, 2),
      copyToClipboard = _useCopyToClipboard2[1];

  var _useState = React.useState(false),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      copied = _useState2[0],
      setCopied = _useState2[1];

  var timeout = reactUseTimeout.useTimeout(function () {
    setCopied(false);
  }, clearCopiedDelay);

  function handleCopy(event) {
    event.preventDefault();
    event.stopPropagation();
    copyToClipboard(value);
    setCopied(true);
    timeout.start();
  }

  var tooltipTitle = copied ? /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Copied"
  }) : /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Copy to Clipboard"
  });
  return /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
    title: tooltipTitle,
    children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
      onClick: handleCopy,
      size: size,
      "data-testid": dataTestid,
      children: /*#__PURE__*/jsxRuntime.jsx(StyledAssignmentIcon, _objectSpread$L({
        fontSize: fontSize,
        invertColor: invertColor
      }, rest))
    })
  });
}

var _excluded$C = ["copyToClipboard", "title", "maxWidth", "interactive"];

function ownKeys$K(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$K(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$K(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$K(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Tooltip(props) {
  var copyToClipboard = props.copyToClipboard,
      title = props.title,
      maxWidth = props.maxWidth,
      interactive = props.interactive,
      rest = _objectWithoutProperties__default["default"](props, _excluded$C);

  var titleContent = copyToClipboard ? /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    alignItems: "center",
    gap: 1,
    children: [/*#__PURE__*/jsxRuntime.jsx(material.Box, {
      maxWidth: maxWidth,
      children: title
    }), /*#__PURE__*/jsxRuntime.jsx(CopyToClipboard, {
      value: title,
      fontSize: "small",
      invertColor: true
    })]
  }) : title;
  var currentInteractive = copyToClipboard || interactive;
  return /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, _objectSpread$K({
    title: titleContent,
    interactive: currentInteractive
  }, rest));
}
Tooltip.defaultProps = {
  copyToClipboard: false,
  maxWidth: 200
};

var StyledValue$1 = styled__default$1["default"](material.Box).withConfig({
  displayName: "Address__StyledValue",
  componentId: "sc-alrlxv-0"
})(["word-break:break-all;"]);
function Address(props) {
  var value = props.value,
      copyToClipboard = props.copyToClipboard,
      tooltip = props.tooltip,
      children = props.children;
  var currencyCode = useCurrencyCode();
  var address = currencyCode && value ? api.toBech32m(value, currencyCode.toLowerCase()) : '';

  if (!children) {
    if (copyToClipboard) {
      return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
        alignItems: "center",
        gap: 1,
        children: [/*#__PURE__*/jsxRuntime.jsx(StyledValue$1, {
          children: address
        }), /*#__PURE__*/jsxRuntime.jsx(CopyToClipboard, {
          value: address,
          fontSize: "small"
        })]
      });
    }

    return address;
  }

  if (tooltip) {
    return /*#__PURE__*/jsxRuntime.jsx(Tooltip, {
      title: address,
      copyToClipboard: copyToClipboard,
      children: children(address)
    });
  }

  if (copyToClipboard) {
    return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      alignItems: "center",
      gap: 1,
      children: [children(address), " asdf", /*#__PURE__*/jsxRuntime.jsx(CopyToClipboard, {
        value: address,
        fontSize: "small"
      })]
    });
  }

  return children(address);
}
Address.defaultProps = {
  copyToClipboard: false,
  tooltip: false
};

var _excluded$B = ["expanded"];

function ownKeys$J(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$J(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$J(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$J(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledToggleAdvancedOptions = styled__default$1["default"](function (_ref) {
  _ref.expanded;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$B);

  return /*#__PURE__*/jsxRuntime.jsx(material.Typography, _objectSpread$J({}, rest));
}).withConfig({
  displayName: "AdvancedOptions__StyledToggleAdvancedOptions",
  componentId: "sc-1giuh2u-0"
})(["cursor:pointer;"]);
function AdvancedOptions(props) {
  var children = props.children,
      defaultExpanded = props.expanded,
      hideExpanded = props.hideExpanded,
      moreTitle = props.moreTitle,
      lessTitle = props.lessTitle;

  var _useToggle = reactUse.useToggle(defaultExpanded),
      _useToggle2 = _slicedToArray__default["default"](_useToggle, 2),
      isExpanded = _useToggle2[0],
      setIsExpanded = _useToggle2[1];

  var hideTitle = hideExpanded && isExpanded;

  function handleToggle() {
    setIsExpanded(!isExpanded);
  }

  return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    flexDirection: "column",
    gap: 1,
    children: [!hideTitle && /*#__PURE__*/jsxRuntime.jsx(StyledToggleAdvancedOptions, {
      variant: "caption",
      expanded: isExpanded,
      onClick: handleToggle,
      children: isExpanded ? /*#__PURE__*/jsxRuntime.jsxs(Flex, {
        alignItems: "center",
        children: [/*#__PURE__*/jsxRuntime.jsx(iconsMaterial.KeyboardArrowUp, {}), lessTitle]
      }) : /*#__PURE__*/jsxRuntime.jsxs(Flex, {
        alignItems: "center",
        children: [/*#__PURE__*/jsxRuntime.jsx(iconsMaterial.KeyboardArrowDown, {}), moreTitle]
      })
    }), /*#__PURE__*/jsxRuntime.jsx(Accordion, {
      expanded: isExpanded,
      children: children
    })]
  });
}
AdvancedOptions.defaultProps = {
  expanded: false,
  children: undefined,
  hideExpanded: false,
  moreTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Show Advanced Options"
  }),
  lessTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Hide Advanced Options"
  })
};

var DialogActions = styled__default$1["default"](material.DialogActions).withConfig({
  displayName: "DialogActions",
  componentId: "sc-v2dr16-0"
})(["padding:", ";"], function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.spacing(2), " ").concat(theme.spacing(3));
});

var _excluded$A = ["nowrap", "selected"],
    _excluded2$7 = ["color", "to", "onClick", "disableElevation"];

function ownKeys$I(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$I(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$I(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$I(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledBaseButton = styled__default$1["default"](function (_ref) {
  _ref.nowrap;
      _ref.selected;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$A);

  return /*#__PURE__*/jsxRuntime.jsx(material.Button, _objectSpread$I({}, rest));
}).withConfig({
  displayName: "Button__StyledBaseButton",
  componentId: "sc-ldbdsx-0"
})(["white-space:", ";", ""], function (_ref2) {
  var nowrap = _ref2.nowrap;
  return nowrap ? 'nowrap' : 'normal';
}, function (_ref3) {
  var selected = _ref3.selected,
      theme = _ref3.theme;

  if (!selected) {
    return '';
  }

  var isDark = theme.palette.mode === 'dark';
  var color = isDark ? '255' : '0';
  return "\n      background-color: rgba(".concat(color, ", ").concat(color, ", ").concat(color, ", 0.1);\n      border-color: rgba(").concat(color, ", ").concat(color, ", ").concat(color, ", 0.3) !important;\n    ");
});

function getColor(theme, variant) {
  switch (variant) {
    case 'contained':
      return theme.palette.danger.contrastText;

    default:
      return theme.palette.danger.main;
  }
}

var DangerButton = styled__default$1["default"](StyledBaseButton).withConfig({
  displayName: "Button__DangerButton",
  componentId: "sc-ldbdsx-1"
})(["color:", ";", " &:hover{color:", ";", "}"], function (_ref4) {
  var theme = _ref4.theme,
      variant = _ref4.variant;
  return getColor(theme, variant);
}, function (_ref5) {
  var theme = _ref5.theme,
      variant = _ref5.variant;
  return variant === 'contained' ? "background-color: ".concat(theme.palette.danger.main, ";") : undefined;
}, function (_ref6) {
  var theme = _ref6.theme,
      variant = _ref6.variant;
  return getColor(theme, variant);
}, function (_ref7) {
  var theme = _ref7.theme,
      variant = _ref7.variant;
  return variant === 'contained' ? "background-color: ".concat(theme.palette.danger.main, ";") : undefined;
});
function Button(props) {
  var _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      to = props.to,
      onClick = props.onClick,
      _props$disableElevati = props.disableElevation,
      disableElevation = _props$disableElevati === void 0 ? true : _props$disableElevati,
      rest = _objectWithoutProperties__default["default"](props, _excluded2$7);

  var navigate = reactRouterDom.useNavigate();

  function handleClick() {
    if (to) {
      navigate(to);
    }

    if (onClick) {
      onClick.apply(void 0, arguments);
    }
  }

  switch (color) {
    case 'danger':
      return /*#__PURE__*/jsxRuntime.jsx(DangerButton, _objectSpread$I({
        onClick: handleClick,
        disableElevation: disableElevation
      }, rest));

    case 'primary':
      return /*#__PURE__*/jsxRuntime.jsx(StyledBaseButton, _objectSpread$I({
        onClick: handleClick,
        disableElevation: disableElevation,
        color: "primary"
      }, rest));

    case 'secondary':
      return /*#__PURE__*/jsxRuntime.jsx(StyledBaseButton, _objectSpread$I({
        onClick: handleClick,
        disableElevation: disableElevation,
        color: "secondary"
      }, rest));

    default:
      return /*#__PURE__*/jsxRuntime.jsx(StyledBaseButton, _objectSpread$I({
        onClick: handleClick,
        disableElevation: disableElevation
      }, rest));
  }
}

function AlertDialog(props) {
  var onClose = props.onClose,
      open = props.open,
      title = props.title,
      children = props.children;

  function handleClose() {
    if (onClose) {
      onClose(true);
    }
  }

  function handleHide() {
    if (onClose) {
      onClose();
    }
  }

  return /*#__PURE__*/jsxRuntime.jsxs(material.Dialog, {
    onClose: handleHide,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    open: open,
    children: [title && /*#__PURE__*/jsxRuntime.jsx(material.DialogTitle, {
      id: "alert-dialog-title",
      children: title
    }), children && /*#__PURE__*/jsxRuntime.jsx(material.DialogContent, {
      id: "alert-dialog-description",
      children: children
    }), /*#__PURE__*/jsxRuntime.jsx(DialogActions, {
      children: /*#__PURE__*/jsxRuntime.jsx(Button, {
        onClick: handleClose,
        variant: "outlined",
        color: "primary",
        autoFocus: true,
        children: "OK"
      })
    })]
  });
}
AlertDialog.defaultProps = {
  open: false,
  title: undefined,
  children: undefined,
  onClose: function onClose() {}
};

var _excluded$z = ["name", "onChange", "data-testid", "inputProps"];

function ownKeys$H(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$H(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$H(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$H(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function TextField(props) {
  var name = props.name,
      baseOnChange = props.onChange,
      dataTestid = props["data-testid"],
      inputProps = props.inputProps,
      rest = _objectWithoutProperties__default["default"](props, _excluded$z);

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control,
      errors = _useFormContext.errors;

  var errorMessage = lodash.get(errors, name);
  return (
    /*#__PURE__*/
    // @ts-ignore
    jsxRuntime.jsx(reactHookForm.Controller, {
      name: name,
      control: control,
      render: function render(_ref) {
        var _ref$field = _ref.field,
            onChange = _ref$field.onChange,
            value = _ref$field.value;

        function handleChange() {
          onChange.apply(void 0, arguments);

          if (baseOnChange) {
            baseOnChange.apply(void 0, arguments);
          }
        }

        return /*#__PURE__*/jsxRuntime.jsx(material.TextField, _objectSpread$H({
          value: value,
          onChange: handleChange,
          error: !!errorMessage,
          helperText: errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.message,
          inputProps: _objectSpread$H({
            "data-testid": dataTestid
          }, inputProps)
        }, rest));
      }
    })
  );
}

var Unit;

(function (Unit) {
  Unit["CHIA"] = "chia";
  Unit["MOJO"] = "mojo";
  Unit["CAT"] = "cat";
})(Unit || (Unit = {}));

var Unit$1 = Unit;

var _UnitValue;
var UnitValue = (_UnitValue = {}, _defineProperty__default["default"](_UnitValue, Unit$1.CHIA, 1), _defineProperty__default["default"](_UnitValue, Unit$1.MOJO, 1 / 1e12), _defineProperty__default["default"](_UnitValue, Unit$1.CAT, 1 / 1e9), _UnitValue);

var complexNumber = 1234567.0123456789;
function bigNumberToLocaleString(value, locale) {
  var _decimalPart$value, _groupPart$value, _integerPart$value$le, _integerPart$value;

  var formatter = Intl.NumberFormat(locale);

  if (!formatter) {
    throw new Error("Formatter for ".concat(locale, " is not supported"));
  }

  var decimalFormatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 12
  });

  if (!decimalFormatter) {
    throw new Error("Decimal formatter for ".concat(locale, " is not supported"));
  }

  var parts = decimalFormatter.formatToParts(complexNumber);
  var decimalPart = parts.find(function (part) {
    return part.type === 'decimal';
  });
  var groupPart = parts.find(function (part) {
    return part.type === 'group';
  });
  var reversedParts = parts.slice().reverse();
  var integerPart = reversedParts.find(function (part) {
    return part.type === 'integer';
  });
  var format = {
    prefix: '',
    decimalSeparator: (_decimalPart$value = decimalPart === null || decimalPart === void 0 ? void 0 : decimalPart.value) !== null && _decimalPart$value !== void 0 ? _decimalPart$value : '.',
    groupSeparator: (_groupPart$value = groupPart === null || groupPart === void 0 ? void 0 : groupPart.value) !== null && _groupPart$value !== void 0 ? _groupPart$value : ',',
    groupSize: (_integerPart$value$le = integerPart === null || integerPart === void 0 ? void 0 : (_integerPart$value = integerPart.value) === null || _integerPart$value === void 0 ? void 0 : _integerPart$value.length) !== null && _integerPart$value$le !== void 0 ? _integerPart$value$le : 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: ''
  };
  return value.toFormat(format);
}

var Chia = /*#__PURE__*/function () {
  function Chia(value, unit) {
    _classCallCheck__default["default"](this, Chia);

    var stringValue = value === '' || value === '.' || value === null || value === undefined ? '0' : value.toString();
    this._value = new BigNumber__default["default"](stringValue);
    this._unit = unit;
  }

  _createClass__default["default"](Chia, [{
    key: "value",
    get: function get() {
      return this._value;
    }
  }, {
    key: "unit",
    get: function get() {
      return this._unit;
    }
  }, {
    key: "to",
    value: function to(newUnit) {
      var fromUnitValue = UnitValue[this.unit];
      var toUnitValue = UnitValue[newUnit];
      var amountInFromUnit = this.value.times(fromUnitValue.toString());
      var newValue = amountInFromUnit.div(toUnitValue.toString());
      return new Chia(newValue, newUnit);
    }
  }, {
    key: "toFixed",
    value: function toFixed(decimals) {
      return this.value.toFixed(decimals);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.value.toString();
    }
  }, {
    key: "toBigNumber",
    value: function toBigNumber() {
      return this.value;
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString(locale) {
      return bigNumberToLocaleString(this.value, locale);
    }
  }]);

  return Chia;
}();

function chiaFormatter(value, unit) {
  return new Chia(value, unit);
}

function chiaToMojo(chia) {
  return chiaFormatter(chia, Unit$1.CHIA).to(Unit$1.MOJO).toBigNumber();
}

function catToMojo(cat) {
  return chiaFormatter(cat, Unit$1.CAT).to(Unit$1.MOJO).toBigNumber();
}

function activateLocale(i18n, locale) {
  i18n.activate(locale);
  moment__default["default"].locale([locale, 'en']); // @ts-ignore

  if (typeof window !== 'undefined' && window.ipcRenderer) {
    window.ipcRenderer.invoke('setLocale', locale);
  }
}

function useLocalStorage(storageKey, defaultValue) {
  var _useLocalStorageBase = localStorage.useLocalStorage(storageKey, defaultValue),
      _useLocalStorageBase2 = _slicedToArray__default["default"](_useLocalStorageBase, 1),
      value = _useLocalStorageBase2[0];

  var setValue = React.useCallback(function (newValue) {
    var newValueToStore = typeof newValue === 'function' ? newValue(value) : newValue;
    localStorage.writeStorage(storageKey, newValueToStore);
  }, [storageKey, value]);
  return [value, setValue];
}

var LocaleContext = /*#__PURE__*/React.createContext(undefined);
function LocaleProvider(props) {
  var children = props.children,
      i18n = props.i18n,
      locales = props.locales,
      defaultLocale = props.defaultLocale;

  var _useLocalStorage = useLocalStorage('locale', defaultLocale),
      _useLocalStorage2 = _slicedToArray__default["default"](_useLocalStorage, 2),
      locale = _useLocalStorage2[0],
      setLocale = _useLocalStorage2[1];

  if (typeof locale !== 'string' || locale && locale.length === 2) {
    locale = defaultLocale;
  }

  var handleSetLocale = React.useCallback(function (locale) {
    if (typeof locale !== 'string') {
      throw new Error("Locale ".concat(locales, " is not a string"));
    }

    setLocale(locale);
  }, [setLocale]);
  var context = React.useMemo(function () {
    return {
      locales: locales,
      defaultLocale: defaultLocale,
      locale: locale,
      setLocale: handleSetLocale
    };
  }, [locales, defaultLocale, locale, handleSetLocale]); // prepare default locale

  React.useMemo(function () {
    activateLocale(i18n, defaultLocale);
  }, []);
  React.useEffect(function () {
    activateLocale(i18n, locale);
  }, [locale]);
  return /*#__PURE__*/jsxRuntime.jsx(LocaleContext.Provider, {
    value: context,
    children: /*#__PURE__*/jsxRuntime.jsx(react.I18nProvider, {
      i18n: i18n,
      children: children
    })
  });
}

function useLocale() {
  var localeContext = React.useContext(LocaleContext);

  if (!localeContext) {
    throw new Error('You need to use LocaleProvider.');
  }

  var locale = localeContext.locale,
      setLocale = localeContext.setLocale;
  return [locale, setLocale];
}

// TODO add ability to use it in new settings page

/*
const compactConfig = {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
  notation: 'compact',
};
*/
function FormatLargeNumber(props) {
  var value = props.value;

  var _useLocale = useLocale(),
      _useLocale2 = _slicedToArray__default["default"](_useLocale, 1),
      locale = _useLocale2[0];

  var numberFormat = React.useMemo(function () {
    return new Intl.NumberFormat(locale);
  }, [locale]);
  var formatedValue = React.useMemo(function () {
    if (typeof value === 'undefined' || value === null) {
      return value;
    } else if (value instanceof BigNumber__default["default"]) {
      return bigNumberToLocaleString(value, locale);
    } else if (typeof value === 'bigint') {
      return BigInt(value).toLocaleString(locale);
    }

    return numberFormat.format(value);
  }, [value, numberFormat]);
  return /*#__PURE__*/jsxRuntime.jsx("span", {
    children: formatedValue
  });
}

var _excluded$y = ["inputRef", "onChange"],
    _excluded2$6 = ["children", "name", "symbol", "showAmountInMojos", "variant", "fullWidth", "data-testid"];

function ownKeys$G(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$G(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$G(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$G(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function NumberFormatCustom$1(props) {
  var inputRef = props.inputRef,
      onChange = props.onChange,
      other = _objectWithoutProperties__default["default"](props, _excluded$y);

  function handleChange(values) {
    onChange(values.value);
  }

  return /*#__PURE__*/jsxRuntime.jsx(NumberFormat__default["default"], _objectSpread$G(_objectSpread$G({}, other), {}, {
    getInputRef: inputRef,
    onValueChange: handleChange,
    thousandSeparator: true,
    allowNegative: false,
    isNumericString: true
  }));
}

function Amount(props) {
  var children = props.children,
      name = props.name,
      symbol = props.symbol,
      showAmountInMojos = props.showAmountInMojos,
      variant = props.variant,
      fullWidth = props.fullWidth,
      dataTestid = props["data-testid"],
      rest = _objectWithoutProperties__default["default"](props, _excluded2$6);

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control;

  var defaultCurrencyCode = useCurrencyCode();
  var value = reactHookForm.useWatch({
    control: control,
    name: name
  });
  var correctedValue = value && value[0] === '.' ? "0".concat(value) : value;
  var currencyCode = symbol === undefined ? defaultCurrencyCode : symbol;
  var isChiaCurrency = ['XCH', 'TXCH'].includes(currencyCode);
  var mojo = isChiaCurrency ? chiaToMojo(correctedValue) : catToMojo(correctedValue);
  return /*#__PURE__*/jsxRuntime.jsxs(material.FormControl, {
    variant: variant,
    fullWidth: fullWidth,
    children: [/*#__PURE__*/jsxRuntime.jsx(TextField, _objectSpread$G({
      name: name,
      variant: variant,
      autoComplete: "off",
      InputProps: {
        spellCheck: false,
        inputComponent: NumberFormatCustom$1,
        inputProps: {
          decimalScale: isChiaCurrency ? 12 : 3,
          "data-testid": dataTestid
        },
        endAdornment: /*#__PURE__*/jsxRuntime.jsx(material.InputAdornment, {
          position: "end",
          children: currencyCode
        })
      }
    }, rest)), /*#__PURE__*/jsxRuntime.jsx(material.FormHelperText, {
      component: "div",
      children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
        alignItems: "center",
        gap: 2,
        children: [showAmountInMojos && /*#__PURE__*/jsxRuntime.jsx(Flex, {
          flexGrow: 1,
          gap: 1,
          children: !mojo.isZero() && /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [/*#__PURE__*/jsxRuntime.jsx(FormatLargeNumber, {
              value: mojo
            }), /*#__PURE__*/jsxRuntime.jsx(material.Box, {
              children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                id: "{0, plural, one {mojo} other {mojos}}",
                values: {
                  "0": mojo.toNumber()
                }
              })
            })]
          })
        }), children && children({
          mojo: mojo,
          value: value
        })]
      })
    })]
  });
}
Amount.defaultProps = {
  label: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Amount"
  }),
  name: 'amount',
  children: undefined,
  showAmountInMojos: true,
  feeMode: false
};

var _excluded$x = ["ration"];

function ownKeys$F(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$F(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$F(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$F(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var OuterWrapper = styled__default$1["default"](function (_ref) {
  _ref.ration;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$x);

  return /*#__PURE__*/jsxRuntime.jsx(material.Box, _objectSpread$F({}, rest));
}).withConfig({
  displayName: "AspectRatio__OuterWrapper",
  componentId: "sc-misvqa-0"
})(["position:relative;width:100%;display:flex;&:before{padding-bottom:", "%;content:'';float:left;}&:after{display:table;content:'';clear:both;}"], function (props) {
  return 1 / props.ratio * 100;
});
var InnerWrapper = styled__default$1["default"](material.Box).withConfig({
  displayName: "AspectRatio__InnerWrapper",
  componentId: "sc-misvqa-1"
})(["display:flex;flex-direction:column;justify-content:center;align-content:center;align-self:stretch;width:100%;"]);
function AspectRatio(props) {
  var children = props.children,
      ratio = props.ratio;
  return /*#__PURE__*/jsxRuntime.jsx(OuterWrapper, {
    ratio: ratio,
    children: /*#__PURE__*/jsxRuntime.jsx(InnerWrapper, {
      children: children
    })
  });
}

var _excluded$w = ["name", "defaultValue", "rules", "options", "fullWidth", "freeSolo", "forcePopupIcon", "disableClearable", "onChange"];

function ownKeys$E(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$E(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$E(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$E(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var filterOptions = function filterOptions(options, _ref) {
  var inputValue = _ref.inputValue;
  return matchSorter.matchSorter(options, inputValue, {
    threshold: matchSorter.matchSorter.rankings.STARTS_WITH
  });
};

function Autocomplete(props) {
  var name = props.name,
      defaultValue = props.defaultValue,
      rules = props.rules,
      options = props.options,
      fullWidth = props.fullWidth,
      freeSolo = props.freeSolo,
      forcePopupIcon = props.forcePopupIcon,
      disableClearable = props.disableClearable,
      defaultOnChange = props.onChange,
      rest = _objectWithoutProperties__default["default"](props, _excluded$w);

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control,
      errors = _useFormContext.errors;

  var _useController = reactHookForm.useController({
    name: name,
    control: control,
    defaultValue: defaultValue,
    rules: rules // shouldUnregister,

  }),
      _useController$field = _useController.field,
      onChange = _useController$field.onChange,
      onBlur = _useController$field.onBlur,
      value = _useController$field.value,
      ref = _useController$field.ref;

  function handleChange(newValue) {
    var updatedValue = newValue || '';
    onChange(updatedValue);

    if (defaultOnChange) {
      defaultOnChange(updatedValue);
    }
  }

  function handleTextFieldChange(event) {
    if (freeSolo) {
      handleChange(event.target.value);
    }
  }

  var errorMessage = lodash.get(errors, name);
  return /*#__PURE__*/jsxRuntime.jsx(material.Autocomplete, {
    autoComplete: true,
    autoHighlight: true,
    autoSelect: true,
    options: options,
    filterOptions: filterOptions,
    onChange: function onChange(_e, newValue) {
      return handleChange(newValue);
    },
    value: value,
    renderInput: function renderInput(params) {
      return /*#__PURE__*/jsxRuntime.jsx(material.TextField, _objectSpread$E(_objectSpread$E({
        autoComplete: "off",
        error: errorMessage,
        onChange: handleTextFieldChange,
        onBlur: onBlur,
        inputRef: ref
      }, rest), params));
    },
    freeSolo: freeSolo,
    fullWidth: fullWidth,
    forcePopupIcon: forcePopupIcon,
    disableClearable: disableClearable
  });
}

var ModalDialogsContext = /*#__PURE__*/React.createContext();

function useOpenDialog() {
  var _useState = React.useState([]),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      dialogs = _useState2[0],
      setDialogs = _useState2[1];

  var context = React.useContext(ModalDialogsContext);

  if (!context) {
    throw new Error('Use ModalDialogsProvider provider');
  }

  var hide = context.hide,
      show = context.show; // remove all modals after unmount

  React.useEffect(function () {
    return function () {
      dialogs.forEach(function (dialog) {
        hide(dialog);
      }); // todo maybe remove ecause it is uneccessary

      setDialogs([]);
    };
  }, []);

  function handleOpen(_x) {
    return _handleOpen.apply(this, arguments);
  }

  function _handleOpen() {
    _handleOpen = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(dialog) {
      var result;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setDialogs(function (dialogs) {
                return [].concat(_toConsumableArray__default["default"](dialogs), [dialog]);
              });
              _context.next = 3;
              return show(dialog);

            case 3:
              result = _context.sent;
              setDialogs(function (dialogs) {
                return dialogs.filter(function (d) {
                  return d !== dialog;
                });
              });
              return _context.abrupt("return", result);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleOpen.apply(this, arguments);
  }

  return handleOpen;
}

var _excluded$v = ["color", "loading", "onClick"];

function ownKeys$D(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$D(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$D(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$D(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function ButtonLoading(props) {
  var _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      loading = props.loading,
      onClick = props.onClick,
      rest = _objectWithoutProperties__default["default"](props, _excluded$v);

  function handleClick() {
    if (!loading && onClick) {
      onClick.apply(void 0, arguments);
    }
  }

  return /*#__PURE__*/jsxRuntime.jsx(lab.LoadingButton, _objectSpread$D({
    onClick: handleClick,
    loading: loading,
    color: color
  }, rest));
}

function useShowError() {
  var openDialog = useOpenDialog();

  function showError(_x) {
    return _showError.apply(this, arguments);
  }

  function _showError() {
    _showError = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(error) {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", openDialog( /*#__PURE__*/jsxRuntime.jsx(AlertDialog, {
                title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Error"
                }),
                children: error.message
              })));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _showError.apply(this, arguments);
  }

  return showError;
}

var _excluded$u = ["onClose", "open", "title", "children", "cancelTitle", "confirmTitle", "confirmColor", "onConfirm"];

function ownKeys$C(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$C(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$C(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$C(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function ConfirmDialog(props) {
  var onClose = props.onClose,
      open = props.open,
      title = props.title,
      children = props.children,
      cancelTitle = props.cancelTitle,
      confirmTitle = props.confirmTitle,
      confirmColor = props.confirmColor,
      onConfirm = props.onConfirm,
      rest = _objectWithoutProperties__default["default"](props, _excluded$u);

  var _useState = React.useState(false),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var showError = useShowError();

  function handleConfirm() {
    return _handleConfirm.apply(this, arguments);
  }

  function _handleConfirm() {
    _handleConfirm = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!onConfirm) {
                _context.next = 13;
                break;
              }

              _context.prev = 1;
              setLoading(true);
              _context.next = 5;
              return onConfirm();

            case 5:
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);
              showError(_context.t0);

            case 10:
              _context.prev = 10;
              setLoading(false);
              return _context.finish(10);

            case 13:
              onClose(true);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 7, 10, 13]]);
    }));
    return _handleConfirm.apply(this, arguments);
  }

  function handleCancel() {
    onClose(false);
  }

  return /*#__PURE__*/jsxRuntime.jsxs(material.Dialog, _objectSpread$C(_objectSpread$C({
    onClose: handleCancel,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    open: open
  }, rest), {}, {
    children: [title && /*#__PURE__*/jsxRuntime.jsx(material.DialogTitle, {
      id: "alert-dialog-title",
      children: title
    }), children && /*#__PURE__*/jsxRuntime.jsx(material.DialogContent, {
      children: /*#__PURE__*/jsxRuntime.jsx(material.DialogContentText, {
        id: "alert-dialog-description",
        children: children
      })
    }), /*#__PURE__*/jsxRuntime.jsxs(DialogActions, {
      children: [/*#__PURE__*/jsxRuntime.jsx(Button, {
        onClick: handleCancel,
        color: "secondary",
        variant: "outlined",
        autoFocus: true,
        children: cancelTitle
      }), /*#__PURE__*/jsxRuntime.jsx(ButtonLoading, {
        onClick: handleConfirm,
        color: confirmColor,
        variant: "contained",
        loading: loading,
        children: confirmTitle
      })]
    })]
  }));
}
ConfirmDialog.defaultProps = {
  open: false,
  onClose: function onClose() {},
  title: undefined,
  children: undefined,
  cancelTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Cancel"
  }),
  confirmTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "OK"
  }),
  confirmColor: 'default'
};

function Back(props) {
  var _formContext$formStat;

  var children = props.children,
      variant = props.variant,
      to = props.to,
      goBack = props.goBack,
      _props$form = props.form,
      form = _props$form === void 0 ? false : _props$form,
      iconStyle = props.iconStyle;
  var navigate = reactRouterDom.useNavigate();
  var openDialog = useOpenDialog();
  var formContext = reactHookForm.useFormContext();
  var isDirty = formContext === null || formContext === void 0 ? void 0 : (_formContext$formStat = formContext.formState) === null || _formContext$formStat === void 0 ? void 0 : _formContext$formStat.isDirty;

  function handleGoBack() {
    return _handleGoBack.apply(this, arguments);
  }

  function _handleGoBack() {
    _handleGoBack = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var canGoBack;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!form) {
                _context.next = 9;
                break;
              }

              _context.t0 = !isDirty;

              if (_context.t0) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return openDialog( /*#__PURE__*/jsxRuntime.jsx(ConfirmDialog, {
                title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Unsaved Changes"
                }),
                confirmTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Discard"
                }),
                confirmColor: "danger",
                children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "You have made changes. Do you want to discard them?"
                })
              }));

            case 5:
              _context.t0 = _context.sent;

            case 6:
              canGoBack = _context.t0;

              if (canGoBack) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return");

            case 9:
              if (!goBack) {
                _context.next = 12;
                break;
              }

              navigate(-1);
              return _context.abrupt("return");

            case 12:
              if (to) {
                navigate(to);
              }

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleGoBack.apply(this, arguments);
  }

  return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    gap: 1,
    alignItems: "center",
    children: [/*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
      onClick: handleGoBack,
      sx: iconStyle,
      children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.ArrowBackIosNew, {})
    }), /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
      variant: variant,
      children: children
    })]
  });
}
Back.defaultProps = {
  children: undefined,
  variant: "body2",
  goBack: true,
  to: undefined
};

var _excluded$t = ["selected", "children"];

function ownKeys$B(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$B(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$B(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$B(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function ButtonSelected(props) {
  var selected = props.selected,
      children = props.children,
      rest = _objectWithoutProperties__default["default"](props, _excluded$t);

  var color = selected ? 'primary' : 'secondary';
  return /*#__PURE__*/jsxRuntime.jsx(Button, _objectSpread$B(_objectSpread$B({
    color: color
  }, rest), {}, {
    children: selected ? /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx(iconsMaterial.Check, {}), " ", children]
    }) : children
  }));
}

var StyledHelpIcon = styled__default$1["default"](iconsMaterial.Help).withConfig({
  displayName: "TooltipIcon__StyledHelpIcon",
  componentId: "sc-ahv3c5-0"
})(["color:", ";font-size:1rem;"], function (_ref) {
  var theme = _ref.theme;
  return theme.palette.mode === 'dark' ? '#c8c8c8' : '#757575';
});
function TooltipIcon(props) {
  var children = props.children,
      interactive = props.interactive;

  if (!children) {
    return null;
  }

  return /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
    title: children,
    interactive: interactive,
    arrow: true,
    children: /*#__PURE__*/jsxRuntime.jsx(StyledHelpIcon, {
      color: "disabled"
    })
  });
}
TooltipIcon.defaultProps = {
  children: undefined
};

var _excluded$s = ["cursor", "opacity", "clickable", "fullHeight", "highlight", "transparent"],
    _excluded2$5 = ["fullHeight", "transparent"],
    _excluded3$1 = ["fullHeight"];

function ownKeys$A(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$A(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$A(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$A(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledCardTitle = styled__default$1["default"](material.Box).withConfig({
  displayName: "Card__StyledCardTitle",
  componentId: "sc-ebut2u-0"
})(["padding:", ";"], function (_ref) {
  var theme = _ref.theme,
      transparent = _ref.transparent;
  return !transparent ? "".concat(theme.spacing(2), " ").concat(theme.spacing(2)) : "0 0 ".concat(theme.spacing(2), " 0");
});
var StyledCardMaterial = styled__default$1["default"](function (_ref2) {
  _ref2.cursor;
      _ref2.opacity;
      _ref2.clickable;
      _ref2.fullHeight;
      _ref2.highlight;
      _ref2.transparent;
      var rest = _objectWithoutProperties__default["default"](_ref2, _excluded$s);

  return /*#__PURE__*/jsxRuntime.jsx(material.Card, _objectSpread$A({}, rest));
}).withConfig({
  displayName: "Card__StyledCardMaterial",
  componentId: "sc-ebut2u-1"
})(["cursor:", ";opacity:", ";height:", ";border:", ";border-radius:", ";&:hover{border-color:", ";}", ""], function (_ref3) {
  var clickable = _ref3.clickable;
  return clickable ? 'pointer' : 'default';
}, function (_ref4) {
  var disabled = _ref4.disabled;
  return disabled ? '0.5' : '1';
}, function (_ref5) {
  var fullHeight = _ref5.fullHeight;
  return fullHeight ? '100%' : 'auto';
}, function (_ref6) {
  var clickable = _ref6.clickable;
  return clickable ? '1px solid transparent' : 'none';
}, function (_ref7) {
  var theme = _ref7.theme,
      highlight = _ref7.highlight;
  return highlight ? "0 0 ".concat(theme.shape.borderRadius, "px ").concat(theme.shape.borderRadius, "px") : "".concat(theme.shape.borderRadius, "px");
}, function (_ref8) {
  var theme = _ref8.theme,
      clickable = _ref8.clickable;
  return clickable ? theme.palette.primary.main : 'transparent';
}, function (_ref9) {
  var transparent = _ref9.transparent;
  return transparent ? "\n    background-color: transparent;\n    background-image: none;\n    border: none;\n    box-shadow: none;\n    overflow: visible;\n\n    &:hover {\n      border-color: transparent;\n    }\n  }\n  " : '';
});
var StyledCardContent$2 = styled__default$1["default"](function (_ref10) {
  _ref10.fullHeight;
      _ref10.transparent;
      var rest = _objectWithoutProperties__default["default"](_ref10, _excluded2$5);

  return /*#__PURE__*/jsxRuntime.jsx(material.CardContent, _objectSpread$A({}, rest));
}).withConfig({
  displayName: "Card__StyledCardContent",
  componentId: "sc-ebut2u-2"
})(["display:flex;flex-direction:column;height:", ";padding-bottom:", " !important;", ""], function (_ref11) {
  var fullHeight = _ref11.fullHeight;
  return fullHeight ? '100%' : 'auto';
}, function (_ref12) {
  var theme = _ref12.theme,
      transparent = _ref12.transparent;
  return !transparent ? theme.spacing(2) : '0';
}, function (_ref13) {
  var transparent = _ref13.transparent;
  return transparent ? "\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n  " : '';
});
var StyledRoot$4 = styled__default$1["default"](function (_ref14) {
  _ref14.fullHeight;
      var rest = _objectWithoutProperties__default["default"](_ref14, _excluded3$1);

  return /*#__PURE__*/jsxRuntime.jsx(Flex, _objectSpread$A({}, rest));
}).withConfig({
  displayName: "Card__StyledRoot",
  componentId: "sc-ebut2u-3"
})(["display:flex;flex-direction:column;height:", ";"], function (_ref15) {
  var fullHeight = _ref15.fullHeight;
  return fullHeight ? '100%' : 'auto';
});
var StyledHighlight = styled__default$1["default"](material.Box).withConfig({
  displayName: "Card__StyledHighlight",
  componentId: "sc-ebut2u-4"
})(["background-color:", ";padding:", "px;color:", ";font-weight:500;text-align:center;text-transform:uppercase;font-size:0.75rem;visibility:", ";border-radius:", "px ", "px 0 0;"], function (_ref16) {
  var theme = _ref16.theme;
  return theme.palette.primary.main;
}, function (_ref17) {
  var theme = _ref17.theme;
  return theme.spacing(1);
}, function (_ref18) {
  var theme = _ref18.theme;
  return theme.palette.primary.contrastText;
}, function (_ref19) {
  var empty = _ref19.empty;
  return empty ? 'hidden' : 'visible';
}, function (_ref20) {
  var theme = _ref20.theme;
  return theme.shape.borderRadius;
}, function (_ref21) {
  var theme = _ref21.theme;
  return theme.shape.borderRadius;
});
function Card(props) {
  var children = props.children,
      highlight = props.highlight,
      title = props.title,
      tooltip = props.tooltip,
      actions = props.actions,
      _props$gap = props.gap,
      gap = _props$gap === void 0 ? 2 : _props$gap,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? false : _props$interactive,
      _props$titleVariant = props.titleVariant,
      titleVariant = _props$titleVariant === void 0 ? 'h5' : _props$titleVariant,
      action = props.action,
      onSelect = props.onSelect,
      disabled = props.disabled,
      fullHeight = props.fullHeight,
      _props$transparent = props.transparent,
      transparent = _props$transparent === void 0 ? false : _props$transparent;
  var headerTitle = tooltip ? /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    alignItems: "center",
    gap: 1,
    children: [/*#__PURE__*/jsxRuntime.jsx(material.Box, {
      children: title
    }), /*#__PURE__*/jsxRuntime.jsx(TooltipIcon, {
      interactive: interactive,
      children: tooltip
    })]
  }) : title;

  function handleClick() {
    if (onSelect) {
      onSelect();
    }
  }

  return /*#__PURE__*/jsxRuntime.jsxs(StyledRoot$4, {
    fullHeight: fullHeight,
    children: [highlight === false && /*#__PURE__*/jsxRuntime.jsx(StyledHighlight, {
      empty: true,
      children: "\xA0"
    }), highlight && /*#__PURE__*/jsxRuntime.jsx(StyledHighlight, {
      children: highlight
    }), /*#__PURE__*/jsxRuntime.jsxs(StyledCardMaterial, {
      onClick: handleClick,
      clickable: !!onSelect,
      disabled: disabled,
      fullHeight: fullHeight,
      highlight: !!highlight,
      transparent: transparent,
      children: [title && /*#__PURE__*/jsxRuntime.jsx(StyledCardTitle, {
        transparent: transparent,
        children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          children: [/*#__PURE__*/jsxRuntime.jsx(material.Box, {
            flexGrow: 1,
            children: /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
              variant: titleVariant,
              children: headerTitle
            })
          }), action && /*#__PURE__*/jsxRuntime.jsx(material.Box, {
            children: action
          })]
        })
      }), /*#__PURE__*/jsxRuntime.jsx(StyledCardContent$2, {
        fullHeight: fullHeight,
        transparent: transparent,
        children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
          flexDirection: "column",
          gap: 3,
          flexGrow: 1,
          children: [/*#__PURE__*/jsxRuntime.jsx(Flex, {
            flexDirection: "column",
            gap: gap,
            flexGrow: 1,
            children: children
          }), actions && /*#__PURE__*/jsxRuntime.jsx(material.Grid, {
            xs: 12,
            item: true,
            children: /*#__PURE__*/jsxRuntime.jsx(Flex, {
              gap: 2,
              children: actions
            })
          })]
        })
      })]
    })]
  });
}

var StyledContent$1 = styled__default$1["default"](material.CardContent).withConfig({
  displayName: "CardHero__StyledContent",
  componentId: "sc-1bdieb-0"
})(["padding:", ";"], function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.spacing(5), " ").concat(theme.spacing(4), " !important");
});
function CardHero(props) {
  var children = props.children;
  return /*#__PURE__*/jsxRuntime.jsx(material.Card, {
    children: /*#__PURE__*/jsxRuntime.jsx(StyledContent$1, {
      children: /*#__PURE__*/jsxRuntime.jsx(Flex, {
        flexDirection: "column",
        gap: 3,
        children: children
      })
    })
  });
}
CardHero.defaultProps = {
  children: undefined
};

var _excluded$r = ["hideDivider"];

function ownKeys$z(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$z(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$z(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$z(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledTableCell$1 = styled__default$1["default"](function (_ref) {
  _ref.hideDivider;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$r);

  return /*#__PURE__*/jsxRuntime.jsx(material.TableCell, _objectSpread$z({}, rest));
}).withConfig({
  displayName: "CardKeyValue__StyledTableCell",
  componentId: "sc-wjor8s-0"
})(["", ""], function (_ref2) {
  var hideDivider = _ref2.hideDivider;
  return hideDivider ? "\n      border-bottom: 0px solid transparent;\n      padding-left: 0;\n      padding-right: 0 !important;\n    " : '';
});
function CardKeyValue(props) {
  var rows = props.rows,
      label = props.label,
      hideDivider = props.hideDivider,
      size = props.size;
  return /*#__PURE__*/jsxRuntime.jsx(material.Table, {
    size: size,
    "aria-label": label,
    children: /*#__PURE__*/jsxRuntime.jsx(material.TableBody, {
      children: rows.map(function (row) {
        return /*#__PURE__*/jsxRuntime.jsxs(material.TableRow, {
          children: [/*#__PURE__*/jsxRuntime.jsx(StyledTableCell$1, {
            hideDivider: hideDivider,
            children: /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
              component: "div",
              variant: "body1",
              color: "textSecondary",
              noWrap: true,
              children: row.label
            })
          }), /*#__PURE__*/jsxRuntime.jsx(StyledTableCell$1, {
            hideDivider: hideDivider,
            width: "100%",
            children: /*#__PURE__*/jsxRuntime.jsx(material.Box, {
              ml: 2,
              position: "relative",
              children: /*#__PURE__*/jsxRuntime.jsx(material.Box, {
                position: "absolute",
                left: "0",
                top: "0",
                bottom: "0",
                right: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                children: /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
                  component: "div",
                  variant: "body2",
                  noWrap: true,
                  children: row.value
                })
              })
            })
          })]
        }, row.key);
      })
    })
  });
}
CardKeyValue.defaultProps = {
  label: undefined,
  hideDivider: false,
  size: 'small'
};

function useColorModeValue(theme, color) {
  var isDark = theme.palette.mode === 'dark';
  var value = isDark ? theme.palette[color].dark : theme.palette[color].light;
  return value !== null && value !== void 0 ? value : theme.palette[color].main;
}

var _excluded$q = ["children", "selected", "onSelect"];

function ownKeys$y(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$y(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$y(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$y(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledCard$1 = styled$1(material.Card, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return !['selected'].includes(prop.toString());
  }
})(function (_ref) {
  var theme = _ref.theme,
      selected = _ref.selected;
  return "\n  width: 100%;\n  border-radius: ".concat(theme.spacing(1), ";\n  border: 1px solid ").concat(selected ? theme.palette.highlight.main : theme.palette.divider, ";\n  background-color: ").concat(selected ? useColorModeValue(theme, 'sidebarBackground') : theme.palette.background.paper, ";\n  margin-bottom: ").concat(theme.spacing(1), ";\n\n  &:hover {\n    border-color: ").concat(theme.palette.highlight.main, ";\n  }\n");
});
var StyledCardContent$1 = styled$1(material.CardContent)(function (_ref2) {
  var theme = _ref2.theme;
  return "\n  padding-bottom: ".concat(theme.spacing(2), " !important;\n");
});
function CardListItem(props) {
  var children = props.children,
      selected = props.selected,
      onSelect = props.onSelect,
      rest = _objectWithoutProperties__default["default"](props, _excluded$q);

  var content = /*#__PURE__*/jsxRuntime.jsx(StyledCardContent$1, {
    children: children
  });

  return /*#__PURE__*/jsxRuntime.jsx(StyledCard$1, _objectSpread$y(_objectSpread$y({
    variant: "outlined",
    selected: selected
  }, rest), {}, {
    children: onSelect ? /*#__PURE__*/jsxRuntime.jsx(material.CardActionArea, {
      onClick: onSelect,
      children: content
    }) : content
  }));
}

var StyledCard = styled__default$1["default"](material.Card).withConfig({
  displayName: "CardSimple__StyledCard",
  componentId: "sc-7rjyv2-0"
})(["height:100%;overflow:visible;margin-bottom:-0.5rem;"]);
var StyledTitle = styled__default$1["default"](material.Box).withConfig({
  displayName: "CardSimple__StyledTitle",
  componentId: "sc-7rjyv2-1"
})(["margin-bottom:0.5rem;"]);
var StyledValue = styled__default$1["default"](material.Typography).withConfig({
  displayName: "CardSimple__StyledValue",
  componentId: "sc-7rjyv2-2"
})(["font-size:1.25rem;"]);
function CardSimple(props) {
  var title = props.title,
      value = props.value,
      description = props.description,
      valueColor = props.valueColor,
      loading = props.loading,
      tooltip = props.tooltip,
      error = props.error,
      actions = props.actions,
      children = props.children;
  return /*#__PURE__*/jsxRuntime.jsx(StyledCard, {
    children: /*#__PURE__*/jsxRuntime.jsxs(material.CardContent, {
      sx: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(StyledTitle, {
        children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 0.5,
          children: [/*#__PURE__*/jsxRuntime.jsxs(Flex, {
            gap: 1,
            alignItems: "center",
            children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
              color: "textSecondary",
              children: title
            }), tooltip && /*#__PURE__*/jsxRuntime.jsx(TooltipIcon, {
              children: tooltip
            })]
          }), actions]
        })
      }), loading ? /*#__PURE__*/jsxRuntime.jsx(material.Box, {
        children: /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
          color: "secondary",
          size: 25
        })
      }) : error ? /*#__PURE__*/jsxRuntime.jsxs(Flex, {
        alignItems: "center",
        children: [/*#__PURE__*/jsxRuntime.jsx(StyledValue, {
          variant: "h5",
          color: "error",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Error"
          })
        }), "\xA0", /*#__PURE__*/jsxRuntime.jsx(TooltipIcon, {
          children: error === null || error === void 0 ? void 0 : error.message
        })]
      }) : /*#__PURE__*/jsxRuntime.jsx(StyledValue, {
        variant: "h5",
        color: valueColor,
        children: value
      }), description && /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
        variant: "caption",
        color: "textSecondary",
        flexGrow: 1,
        children: description
      }), children]
    })
  });
}
CardSimple.defaultProps = {
  valueColor: 'primary',
  description: undefined,
  loading: false,
  value: undefined,
  error: undefined
};

var StyledCardContent = styled__default$1["default"](material.CardContent).withConfig({
  displayName: "CardStep__StyledCardContent",
  componentId: "sc-1c8ppdm-0"
})(["padding-left:72px;"]);
var StyledStep = styled__default$1["default"](material.Avatar).withConfig({
  displayName: "CardStep__StyledStep",
  componentId: "sc-1c8ppdm-1"
})(["width:2rem;height:2rem;"]);
function CardStep(props) {
  var children = props.children,
      step = props.step,
      title = props.title,
      action = props.action;
  return /*#__PURE__*/jsxRuntime.jsxs(material.Card, {
    children: [/*#__PURE__*/jsxRuntime.jsx(material.CardHeader, {
      avatar: /*#__PURE__*/jsxRuntime.jsx(StyledStep, {
        "aria-label": "step",
        children: step
      }),
      title: /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
        variant: "h6",
        children: title
      }),
      action: action
    }), /*#__PURE__*/jsxRuntime.jsx(material.Divider, {}), /*#__PURE__*/jsxRuntime.jsx(StyledCardContent, {
      children: /*#__PURE__*/jsxRuntime.jsx(material.Grid, {
        container: true,
        children: /*#__PURE__*/jsxRuntime.jsx(material.Grid, {
          md: 10,
          lg: 8,
          item: true,
          children: /*#__PURE__*/jsxRuntime.jsx(Flex, {
            flexDirection: "column",
            gap: 2,
            children: children
          })
        })
      })
    })]
  });
}

var _excluded$p = ["onChange"],
    _excluded2$4 = ["name"];

function ownKeys$x(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$x(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$x(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$x(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var ParseBoolean$1 = function ParseBoolean(props) {
  var onChange = props.onChange,
      rest = _objectWithoutProperties__default["default"](props, _excluded$p);

  var name = rest.name;

  var _useFormContext = reactHookForm.useFormContext(),
      setValue = _useFormContext.setValue;

  function handleChange(e) {
    var value = !!e.target.checked; // @ts-ignore

    onChange(e, value);

    if (name) {
      setValue(name, value);
    }
  }

  return /*#__PURE__*/jsxRuntime.jsx(material.Checkbox, _objectSpread$x({
    onChange: handleChange
  }, rest));
};

function Checkbox(props) {
  var name = props.name,
      rest = _objectWithoutProperties__default["default"](props, _excluded2$4);

  var _useFormContext2 = reactHookForm.useFormContext(),
      control = _useFormContext2.control;

  return (
    /*#__PURE__*/
    // @ts-ignore
    jsxRuntime.jsx(reactHookForm.Controller, {
      name: name,
      control: control,
      render: function render(_ref) {
        var field = _ref.field;
        return /*#__PURE__*/jsxRuntime.jsx(ParseBoolean$1, _objectSpread$x(_objectSpread$x({}, field), rest));
      }
    })
  );
}
Checkbox.defaultProps = {
  value: true
};

function ownKeys$w(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$w(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$w(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$w(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledPaper$1 = styled__default$1["default"](material.Paper).withConfig({
  displayName: "Dropzone__StyledPaper",
  componentId: "sc-1arphkp-0"
})(["background-color:#999999;padding:", ";"], function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.spacing(1), " ").concat(theme.spacing(2));
});
function Dropzone(props) {
  var children = props.children,
      onDrop = props.onDrop,
      maxFiles = props.maxFiles,
      accept = props.accept,
      ratio = props.ratio,
      processing = props.processing;
  var config = {
    onDrop: onDrop,
    maxFiles: maxFiles
  };

  if (accept) {
    config.accept = accept.join(', ');
  }

  var _useDropzone = reactDropzone.useDropzone(config),
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps,
      isDragActive = _useDropzone.isDragActive;

  var childrenContent = typeof children === 'function' ? children({
    isDragActive: isDragActive
  }) : children;
  return /*#__PURE__*/jsxRuntime.jsxs("div", _objectSpread$w(_objectSpread$w({}, getRootProps()), {}, {
    children: [/*#__PURE__*/jsxRuntime.jsx("input", _objectSpread$w({}, getInputProps())), /*#__PURE__*/jsxRuntime.jsx(StyledPaper$1, {
      children: /*#__PURE__*/jsxRuntime.jsx(AspectRatio, {
        ratio: ratio,
        children: /*#__PURE__*/jsxRuntime.jsx(Flex, {
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          children: processing ? /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
            color: "secondary"
          }) : childrenContent
        })
      })
    })]
  }));
}
Dropzone.defaultProps = {
  maxFiles: undefined,
  accept: undefined,
  ratio: 16 / 6,
  processing: false
};

var StateColor;

(function (StateColor) {
  StateColor["SUCCESS"] = "#3AAC59";
  StateColor["WARNING"] = "#f57c00";
  StateColor["ERROR"] = "#F44336";
})(StateColor || (StateColor = {}));

var StateColor$1 = StateColor;

function ownKeys$v(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$v(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$v(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$v(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledWarning = styled__default$1["default"](material.Box).withConfig({
  displayName: "Fee__StyledWarning",
  componentId: "sc-1qxwx6o-0"
})(["color:", ";"], StateColor$1.WARNING);
var StyledError = styled__default$1["default"](material.Box).withConfig({
  displayName: "Fee__StyledError",
  componentId: "sc-1qxwx6o-1"
})(["color:", ";"], StateColor$1.ERROR);
function Fee(props) {
  return /*#__PURE__*/jsxRuntime.jsx(Amount, _objectSpread$v(_objectSpread$v({}, props), {}, {
    children: function children(_ref) {
      var value = _ref.value,
          mojo = _ref.mojo;
      var isHigh = mojo.gte('100000000000');
      var isLow = mojo.gt('0') && mojo.lt('1');

      if (!value) {
        return;
      }

      if (isHigh) {
        return /*#__PURE__*/jsxRuntime.jsx(StyledWarning, {
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Value seems high"
          })
        });
      }

      if (isLow) {
        return /*#__PURE__*/jsxRuntime.jsx(StyledError, {
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Incorrect value"
          })
        });
      }

      return null;
    }
  }));
}
Fee.defaultProps = {
  label: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Fee"
  }),
  name: 'fee'
};

var _excluded$o = ["variant"];

function ownKeys$u(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$u(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$u(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$u(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getMuiVariant(variant) {
  switch (variant) {
    case 'TITLE':
      return 'h5';

    case 'SUBTITLE':
      return 'h6';

    default:
      return 'h5';
  }
}

function Heading(props) {
  var _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'TITLE' : _props$variant,
      rest = _objectWithoutProperties__default["default"](props, _excluded$o);

  return /*#__PURE__*/jsxRuntime.jsx(material.Typography, _objectSpread$u({
    variant: getMuiVariant(variant)
  }, rest));
}

var COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
function useDarkMode(defaultValue) {
  var _ref;

  var isDarkOS = material.useMediaQuery(COLOR_SCHEME_QUERY);

  var _useLocalStorage = useLocalStorage('darkMode', (_ref = defaultValue !== null && defaultValue !== void 0 ? defaultValue : isDarkOS) !== null && _ref !== void 0 ? _ref : false),
      _useLocalStorage2 = _slicedToArray__default["default"](_useLocalStorage, 2),
      isDarkMode = _useLocalStorage2[0],
      setDarkMode = _useLocalStorage2[1];

  return {
    isDarkMode: isDarkMode,
    toggle: function toggle() {
      return setDarkMode(!isDarkMode);
    },
    enable: function enable() {
      return setDarkMode(true);
    },
    disable: function disable() {
      return setDarkMode(false);
    }
  };
}

function DarkModeToggle() {
  var _useDarkMode = useDarkMode(),
      toggle = _useDarkMode.toggle,
      isDarkMode = _useDarkMode.isDarkMode;

  function handleClick() {
    toggle();
  }

  return /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
    color: "inherit",
    onClick: handleClick,
    children: isDarkMode ? /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.Brightness7, {}) : /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.Brightness4, {})
  });
}

var _excluded$n = ["selected", "options", "defaultOpen", "onSelect", "placeholder", "startIcon", "children", "open"];

function ownKeys$t(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$t(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$t(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$t(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Dropdown(props) {
  var _selectedOption$label;

  var selected = props.selected,
      options = props.options,
      defaultOpen = props.defaultOpen,
      onSelect = props.onSelect,
      placeholder = props.placeholder,
      startIcon = props.startIcon,
      children = props.children;
      props.open;
      var rest = _objectWithoutProperties__default["default"](props, _excluded$n);

  var _useToggle = reactUse.useToggle(defaultOpen),
      _useToggle2 = _slicedToArray__default["default"](_useToggle, 2),
      open = _useToggle2[0],
      toggleOpen = _useToggle2[1];

  var _useState = React.useState(null),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
    toggleOpen();
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
    toggleOpen();
  };

  function handleSelect(option) {
    toggleOpen();
    onSelect(option.value);
  }

  var selectedOption = React.useMemo(function () {
    return options.find(function (option) {
      return option.value === selected;
    });
  }, [options, selected]);
  var value = (_selectedOption$label = selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.label) !== null && _selectedOption$label !== void 0 ? _selectedOption$label : placeholder;
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(material.Button, {
      "aria-controls": "dropdown",
      "aria-haspopup": "true",
      onClick: handleClick,
      endIcon: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.ExpandMore, {}),
      startIcon: startIcon,
      children: children ? children(selectedOption) : value
    }), /*#__PURE__*/jsxRuntime.jsx(material.Menu, _objectSpread$t(_objectSpread$t({
      id: "dropdown",
      anchorEl: anchorEl,
      onClose: handleClose,
      getContentAnchorEl: null,
      open: open
    }, rest), {}, {
      keepMounted: true,
      children: options.map(function (option) {
        return /*#__PURE__*/jsxRuntime.jsx(material.MenuItem, {
          onClick: function onClick() {
            return handleSelect(option);
          },
          selected: option.value === selected,
          children: option.label
        }, option.value);
      })
    }))]
  });
}
Dropdown.defaultProps = {
  defaultOpen: false,
  placeholder: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Select..."
  }),
  startIcon: undefined,
  children: undefined
};

var _excluded$m = ["label", "children", "toggle"];

function ownKeys$s(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$s(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$s(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$s(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledMenu$1 = styles.styled(function (props) {
  return /*#__PURE__*/jsxRuntime.jsx(Menu__default["default"], _objectSpread$s({
    elevation: 0,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  }, props));
})(function (_ref) {
  var theme = _ref.theme;
  return {
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: styles.alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }
      }
    }
  };
});
function DropdownActions$1(props) {
  var label = props.label,
      children = props.children,
      toggle = props.toggle,
      rest = _objectWithoutProperties__default["default"](props, _excluded$m);

  var _React$useState = React__default["default"].useState(null),
      _React$useState2 = _slicedToArray__default["default"](_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var open = Boolean(anchorEl);

  var handleClick = function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  function handlePreventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    children: [toggle ? /*#__PURE__*/React.cloneElement(toggle, {
      onClick: handleClick
    }) : /*#__PURE__*/jsxRuntime.jsx(Button__default["default"], _objectSpread$s(_objectSpread$s({
      variant: "contained",
      onClick: handleClick,
      endIcon: /*#__PURE__*/jsxRuntime.jsx(KeyboardArrowDownIcon__default["default"], {}),
      disableElevation: true
    }, rest), {}, {
      children: label
    })), /*#__PURE__*/jsxRuntime.jsx(StyledMenu$1, {
      anchorEl: anchorEl,
      open: open,
      onClose: handleClose,
      onClick: handlePreventDefault,
      children: children({
        onClose: handleClose
      })
    })]
  });
}

function ownKeys$r(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$r(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$r(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$r(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledMenu = styles.styled(function (props) {
  return /*#__PURE__*/jsxRuntime.jsx(Menu__default["default"], _objectSpread$r({
    elevation: 0,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  }, props));
})(function (_ref) {
  var theme = _ref.theme;
  return {
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: styles.alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }
      }
    }
  };
});
function DropdownActions(props) {
  var children = props.children;

  var _React$useState = React__default["default"].useState(null),
      _React$useState2 = _slicedToArray__default["default"](_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var open = Boolean(anchorEl);

  var handleOpen = function handleOpen(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  function handleToggle(event) {
    if (open) {
      handleClose();
    } else {
      handleOpen(event);
    }
  }

  var _children = children({
    onClose: handleClose,
    onOpen: handleOpen,
    onToggle: handleToggle,
    open: open
  }),
      _children2 = _slicedToArray__default["default"](_children, 2),
      item = _children2[0],
      menuItems = _children2[1];

  return /*#__PURE__*/jsxRuntime.jsxs(material.Box, {
    children: [item, /*#__PURE__*/jsxRuntime.jsx(StyledMenu, {
      anchorEl: anchorEl,
      open: open,
      onClose: handleClose,
      children: menuItems
    })]
  });
}

var _excluded$l = ["children", "icon"];

function ownKeys$q(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$q(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$q(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$q(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function DropdownIconButton(props) {
  var _children = props.children,
      icon = props.icon,
      rest = _objectWithoutProperties__default["default"](props, _excluded$l);

  return /*#__PURE__*/jsxRuntime.jsx(DropdownActions, {
    children: function children(_ref) {
      var onClose = _ref.onClose,
          onToggle = _ref.onToggle,
          open = _ref.open;
      return [/*#__PURE__*/jsxRuntime.jsx(material.IconButton, _objectSpread$q(_objectSpread$q({
        onClick: onToggle
      }, rest), {}, {
        children: icon
      }), "button"), _children({
        onClose: onClose,
        open: open
      })];
    }
  });
}

var StyledWrapper = styled__default$1["default"](material.Box).withConfig({
  displayName: "LayoutHero__StyledWrapper",
  componentId: "sc-10xkrnx-0"
})(["padding-top:", ";display:flex;flex-direction:column;flex-grow:1;background:", ";"], function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.spacing(3));
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.mode === 'dark' ? "linear-gradient(45deg, #222222 30%, #333333 90%)" : "linear-gradient(45deg, #ffffff 30%, #fdfdfd 90%)";
});
var StyledBody$3 = styled__default$1["default"](material.Box).withConfig({
  displayName: "LayoutHero__StyledBody",
  componentId: "sc-10xkrnx-1"
})(["display:flex;flex-direction:column;justify-content:center;align-items:center;flex-grow:1;padding-bottom:1rem;"]);
function LayoutHero(props) {
  var children = props.children,
      header = props.header,
      _props$back = props.back,
      back = _props$back === void 0 ? false : _props$back,
      _props$outlet = props.outlet,
      outlet = _props$outlet === void 0 ? false : _props$outlet;
  return /*#__PURE__*/jsxRuntime.jsxs(StyledWrapper, {
    children: [/*#__PURE__*/jsxRuntime.jsx(material.AppBar, {
      color: "transparent",
      elevation: 0,
      children: /*#__PURE__*/jsxRuntime.jsxs(material.Toolbar, {
        children: [header, back && /*#__PURE__*/jsxRuntime.jsx(reactRouterDom.Link, {
          to: "-1",
          children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.ArrowBackIos, {
            fontSize: "large",
            color: "secondary"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Flex, {
          flexGrow: 1
        })]
      })
    }), /*#__PURE__*/jsxRuntime.jsx(StyledBody$3, {
      children: /*#__PURE__*/jsxRuntime.jsx(Flex, {
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        alignSelf: "stretch",
        children: outlet ? /*#__PURE__*/jsxRuntime.jsx(reactRouterDom.Outlet, {}) : children
      })
    })]
  });
}

function useOpenExternal() {
  function handleOpen(url) {
    if (isElectron__default["default"]()) {
      // @ts-ignore
      window.shell.openExternal(url);
      return;
    }

    window.open(url, '_blank');
  }

  return handleOpen;
}

var _excluded$k = ["fullWidth", "noWrap"];

function ownKeys$p(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$p(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$p(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$p(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledBaseLink = styled__default$1["default"](function (_ref) {
  _ref.fullWidth;
      _ref.noWrap;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$k);

  return /*#__PURE__*/jsxRuntime.jsx(material.Link, _objectSpread$p({}, rest));
}).withConfig({
  displayName: "Link__StyledBaseLink",
  componentId: "sc-117la1z-0"
})(["width:", ";", " cursor:pointer;"], function (_ref2) {
  var fullWidth = _ref2.fullWidth;
  return fullWidth ? '100%' : 'inherit';
}, function (_ref3) {
  _ref3.noWrap;
  return "white-space: nowrap;";
});
function Link(props) {
  var target = props.target,
      href = props.href,
      to = props.to,
      onClick = props.onClick;
  var openExternal = useOpenExternal();

  var newProps = _objectSpread$p({}, props);

  function handleClick(event) {
    if (onClick) {
      event.preventDefault();
      event.stopPropagation();
      onClick(event);
      return;
    }

    if (href && target === '_blank') {
      event.preventDefault();
      event.stopPropagation();
      openExternal(href);
      return;
    }
  }

  return /*#__PURE__*/jsxRuntime.jsx(StyledBaseLink, _objectSpread$p(_objectSpread$p({
    component: to ? reactRouterDom.Link : material.Link
  }, newProps), {}, {
    onClick: handleClick
  }));
}

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var StyledPre = styles$1.styled(material.Typography)(function () {
  return {
    whiteSpace: 'pre-wrap'
  };
});

function formatStackTrace(stack) {
  var stackTrace = stack.map(function (_ref) {
    var fileName = _ref.fileName,
        columnNumber = _ref.columnNumber,
        lineNumber = _ref.lineNumber,
        functionName = _ref.functionName;
    return "at ".concat(fileName, ":").concat(lineNumber, ":").concat(columnNumber, " ").concat(functionName);
  });
  return stackTrace.join('\n');
}

var ErrorBoundary = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](ErrorBoundary, _Component);

  var _super = _createSuper$1(ErrorBoundary);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck__default["default"](this, ErrorBoundary);

    _this = _super.call(this, props);

    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "handleReload", function () {
      window.location.hash = '#/';
      window.location.reload();
    });

    _this.state = {
      hasError: false,
      error: null,
      stacktrace: ''
    };
    return _this;
  }

  _createClass__default["default"](ErrorBoundary, [{
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_prevProps, prevState) {
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.state.error && prevState.error !== this.state.error)) {
                  _context.next = 9;
                  break;
                }

                _context.t0 = this;
                _context.t1 = formatStackTrace;
                _context.next = 5;
                return StackTrace__default["default"].fromError(this.state.error);

              case 5:
                _context.t2 = _context.sent;
                _context.t3 = (0, _context.t1)(_context.t2);
                _context.t4 = {
                  stacktrace: _context.t3
                };

                _context.t0.setState.call(_context.t0, _context.t4);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidUpdate(_x, _x2) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        var _this$state = this.state,
            stacktrace = _this$state.stacktrace,
            error = _this$state.error;
        var issueLink = "https://github.com/Chia-Network/chia-blockchain-gui/issues/new?".concat(qs__default["default"].stringify({
          labels: 'bug',
          template: 'bug_report.yaml',
          title: "[BUG] ".concat(error.message),
          ui: 'GUI',
          logs: "".concat(error.message, "\n\nURL\n").concat(window.location.hash, "\n\nStacktrace\n").concat(stacktrace)
        })); // You can render any custom fallback UI

        return /*#__PURE__*/jsxRuntime.jsx(LayoutHero, {
          children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
            flexDirection: "column",
            gap: 4,
            children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
              variant: "h5",
              textAlign: "center",
              color: "danger",
              children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                id: "Something went wrong"
              })
            }), /*#__PURE__*/jsxRuntime.jsxs(Flex, {
              flexDirection: "column",
              children: [/*#__PURE__*/jsxRuntime.jsxs(material.Typography, {
                variant: "h6",
                children: [/*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Error:"
                }), " ", error.message]
              }), /*#__PURE__*/jsxRuntime.jsx(StyledPre, {
                variant: "body2",
                children: stacktrace
              })]
            }), /*#__PURE__*/jsxRuntime.jsxs(Flex, {
              justifyContent: "center",
              children: [/*#__PURE__*/jsxRuntime.jsx(Link, {
                target: "_blank",
                href: issueLink,
                children: /*#__PURE__*/jsxRuntime.jsx(Button, {
                  children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                    id: "Report an Issue"
                  })
                })
              }), "\xA0", /*#__PURE__*/jsxRuntime.jsx(Button, {
                onClick: this.handleReload,
                color: "primary",
                children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Reload Application"
                })
              })]
            })]
          })
        });
      }

      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return {
        hasError: true,
        error: error
      };
    }
  }]);

  return ErrorBoundary;
}(React.Component);

var Fonts = styled$3.createGlobalStyle(["body{font-family:\"Roboto\";}"]);

var _excluded$j = ["methods", "onSubmit"];

function ownKeys$o(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$o(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$o(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$o(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Form(props) {
  var methods = props.methods,
      onSubmit = props.onSubmit,
      rest = _objectWithoutProperties__default["default"](props, _excluded$j);

  var handleSubmit = methods.handleSubmit;
  var showError = useShowError();

  var _useState = React.useState(false),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  function processSubmit() {
    return _processSubmit.apply(this, arguments);
  }

  function _processSubmit() {
    _processSubmit = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var _args = arguments;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!loading) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;
              setLoading(true);
              _context.next = 6;
              return onSubmit.apply(void 0, _args);

            case 6:
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              showError(_context.t0);

            case 11:
              _context.prev = 11;
              setLoading(false);
              return _context.finish(11);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8, 11, 14]]);
    }));
    return _processSubmit.apply(this, arguments);
  }

  return /*#__PURE__*/jsxRuntime.jsx(reactHookForm.FormProvider, _objectSpread$o(_objectSpread$o({}, methods), {}, {
    children: /*#__PURE__*/jsxRuntime.jsx("form", _objectSpread$o({
      onSubmit: handleSubmit(processSubmit)
    }, rest))
  }));
}

var _excluded$i = ["children"];

function ownKeys$n(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$n(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$n(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$n(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function FormBackButton(props) {
  var children = props.children,
      rest = _objectWithoutProperties__default["default"](props, _excluded$i);

  var openDialog = useOpenDialog();

  var _useFormContext = reactHookForm.useFormContext(),
      formState = _useFormContext.formState;

  var navigate = reactRouter.useNavigate();
  var isDirty = formState.isDirty;

  function handleBack() {
    return _handleBack.apply(this, arguments);
  }

  function _handleBack() {
    _handleBack = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var canGoBack;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = !isDirty;

              if (_context.t0) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return openDialog( /*#__PURE__*/jsxRuntime.jsx(ConfirmDialog, {
                title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Unsaved Changes"
                }),
                confirmTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Discard"
                }),
                confirmColor: "danger",
                children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "You have made changes. Do you want to discard them?"
                })
              }));

            case 4:
              _context.t0 = _context.sent;

            case 5:
              canGoBack = _context.t0;

              if (canGoBack) {
                navigate(-1);
              }

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleBack.apply(this, arguments);
  }

  return /*#__PURE__*/jsxRuntime.jsx(Button, _objectSpread$n(_objectSpread$n({
    onClick: handleBack
  }, rest), {}, {
    children: children
  }));
}
FormBackButton.defaultProps = {
  children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Back"
  })
};

var Convert = [[new BigNumber__default["default"](0), 'B'], [new BigNumber__default["default"](1024).exponentiatedBy(1), 'KiB'], [new BigNumber__default["default"](1024).exponentiatedBy(2), 'MiB'], [new BigNumber__default["default"](1024).exponentiatedBy(3), 'GiB'], [new BigNumber__default["default"](1024).exponentiatedBy(4), 'TiB'], [new BigNumber__default["default"](1024).exponentiatedBy(5), 'PiB'], [new BigNumber__default["default"](1024).exponentiatedBy(6), 'EiB'], [new BigNumber__default["default"](1024).exponentiatedBy(7), 'ZiB'], [new BigNumber__default["default"](1024).exponentiatedBy(8), 'YiB']];
var CovertReversed = Convert.slice().reverse();
function FormatBytes(props) {
  var value = props.value,
      precision = props.precision,
      unit = props.unit,
      removeUnit = props.removeUnit,
      _props$unitSeparator = props.unitSeparator,
      unitSeparator = _props$unitSeparator === void 0 ? ' ' : _props$unitSeparator,
      fixedDecimals = props.fixedDecimals;

  if (value === null || value === undefined) {
    return null;
  }

  var bigValue = new BigNumber__default["default"](value);
  var isNegative = bigValue.isNegative();
  var absValue = isNegative ? bigValue.abs() : bigValue;
  var humanValue;
  var humanUnit;

  if (unit) {
    var unitIndex = Convert.findIndex(function (item) {
      return item[1].toLowerCase() === unit.toLowerCase();
    });

    var _Convert$unitIndex = _slicedToArray__default["default"](Convert[unitIndex], 2),
        unitValue = _Convert$unitIndex[0],
        unitName = _Convert$unitIndex[1];

    humanValue = bigValue.dividedBy(unitValue);
    humanUnit = unitName;
  } else {
    // convert value to nearest bytes representation
    var _unitIndex = Math.min(CovertReversed.length - 1, CovertReversed.findIndex(function (item) {
      return absValue.isGreaterThanOrEqualTo(item[0]);
    }));

    var _CovertReversed$_unit = _slicedToArray__default["default"](CovertReversed[_unitIndex], 2),
        _unitValue = _CovertReversed$_unit[0],
        _unitName = _CovertReversed$_unit[1];

    humanValue = !_unitValue.isZero() ? bigValue.dividedBy(_unitValue) : bigValue;
    humanUnit = _unitName;
  }

  if (fixedDecimals) {
    humanValue = humanValue.decimalPlaces(precision !== null && precision !== void 0 ? precision : 2);
  }

  if (precision || fixedDecimals) {
    humanValue = humanValue.toFixed(precision !== null && precision !== void 0 ? precision : 2);
  } else {
    humanValue = humanValue.toString();
  }

  if (removeUnit) {
    return humanValue;
  }

  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [humanValue, unitSeparator, humanUnit]
  });
}

var _excluded$h = ["iconSize"];

function ownKeys$m(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$m(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$m(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$m(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getIconSize(size) {
  switch (size) {
    case 'lg':
      return '1.5rem';

    case 'sm':
      return '0.8rem';

    case 'xs':
      return '0.5rem';

    default:
      return '1rem';
  }
}

var StyledFiberManualRecordIcon = styled__default$1["default"](function (_ref) {
  _ref.iconSize;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$h);

  return /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.FiberManualRecord, _objectSpread$m({}, rest));
}).withConfig({
  displayName: "FormatConnectionStatus__StyledFiberManualRecordIcon",
  componentId: "sc-cdps2e-0"
})(["font-size:", ";"], function (_ref2) {
  var iconSize = _ref2.iconSize;
  return getIconSize(iconSize);
});
function FormatConnectionStatus(props) {
  var connected = props.connected,
      connectedTitle = props.connectedTitle,
      notConnectedTitle = props.notConnectedTitle,
      variant = props.variant,
      iconSize = props.iconSize;
  var color = connected ? 'primary' : 'secondary';
  return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    alignItems: "center",
    gap: 1,
    inline: true,
    children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
      variant: variant,
      color: color,
      children: connected ? connectedTitle : notConnectedTitle
    }), /*#__PURE__*/jsxRuntime.jsx(StyledFiberManualRecordIcon, {
      color: color,
      iconSize: iconSize
    })]
  });
}
FormatConnectionStatus.defaultProps = {
  connectedTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Connected"
  }),
  notConnectedTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
    id: "Not connected"
  }),
  variant: 'caption',
  iconSize: 'sm'
};

function ownKeys$l(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$l(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$l(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$l(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function GuestRoute(props) {
  var loggedIn = reactRedux.useSelector(function (state) {
    return state.wallet_state.logged_in;
  });

  if (loggedIn) {
    return /*#__PURE__*/jsxRuntime.jsx(reactRouterDom.Navigate, {
      to: "/dashboard"
    });
  }

  return /*#__PURE__*/jsxRuntime.jsx(reactRouterDom.Route, _objectSpread$l({}, props));
}

var StyledIconButton = styled__default$1["default"](material.IconButton).withConfig({
  displayName: "IconButton__StyledIconButton",
  componentId: "sc-12gofw4-0"
})(["padding:0.2rem;"]);

var _excluded$g = ["icon", "children"];

function ownKeys$k(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$k(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$k(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$k(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function IconMessage(props) {
  var icon = props.icon,
      children = props.children,
      rest = _objectWithoutProperties__default["default"](props, _excluded$g);

  return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    flexDirection: "column",
    gap: 1,
    alignItems: "center",
    children: [icon, /*#__PURE__*/jsxRuntime.jsx(material.Typography, _objectSpread$k(_objectSpread$k({
      variant: "body1",
      align: "center"
    }, rest), {}, {
      children: children
    }))]
  });
}

var StyledIndicator = styled__default$1["default"](material.Box).withConfig({
  displayName: "Indicator__StyledIndicator",
  componentId: "sc-1gz5qeo-0"
})(["display:inline-block;height:10px;width:75px;background-color:", ";"], function (_ref) {
  var color = _ref.color;
  return color;
});
var StyledLinearProgress = styled__default$1["default"](material.LinearProgress).withConfig({
  displayName: "Indicator__StyledLinearProgress",
  componentId: "sc-1gz5qeo-1"
})(["height:10px;width:75px;border-radius:0;"]);
function PlotStatus(props) {
  var children = props.children,
      color = props.color,
      progress = props.progress;
  return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    flexDirection: "column",
    gap: 1,
    children: [progress !== undefined ? /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      gap: 1,
      alignItems: "center",
      children: [/*#__PURE__*/jsxRuntime.jsx(StyledLinearProgress, {
        variant: "determinate",
        value: progress * 100,
        color: "secondary"
      }), /*#__PURE__*/jsxRuntime.jsx(Flex, {
        children: /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          variant: "body2",
          color: "textSecondary",
          children: "".concat(Math.round(progress * 100), "%")
        })
      })]
    }) : /*#__PURE__*/jsxRuntime.jsx(StyledIndicator, {
      color: color
    }), /*#__PURE__*/jsxRuntime.jsx(Flex, {
      children: children
    })]
  });
}
PlotStatus.defaultProps = {
  children: undefined
};

var _excluded$f = ["name"];

function ownKeys$j(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$j(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$j(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$j(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function InputBase(props) {
  var name = props.name,
      rest = _objectWithoutProperties__default["default"](props, _excluded$f);

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control,
      errors = _useFormContext.errors;

  var errorMessage = lodash.get(errors, name);
  return (
    /*#__PURE__*/
    // @ts-ignore
    jsxRuntime.jsx(reactHookForm.Controller, {
      name: name,
      control: control,
      render: function render(_ref) {
        var field = _ref.field;
        return /*#__PURE__*/jsxRuntime.jsx(material.InputBase, _objectSpread$j(_objectSpread$j({
          error: !!errorMessage
        }, rest), field));
      }
    })
  );
}

function ownKeys$i(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$i(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$i(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$i(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledChia = styled__default$1["default"](icons.Chia).withConfig({
  displayName: "Logo__StyledChia",
  componentId: "sc-1w61omv-0"
})(["max-width:100%;width:auto;height:auto;"]);
function Logo(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.Box, _objectSpread$i(_objectSpread$i({}, props), {}, {
    children: /*#__PURE__*/jsxRuntime.jsx(StyledChia, {})
  }));
}

var useStyles = styles$1.makeStyles(function (theme) {
  return styles$1.createStyles({
    toolbar: theme.mixins.toolbar
  });
});
function ToolbarSpacing() {
  var classes = useStyles();
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    className: classes.toolbar
  });
}

var _excluded$e = ["children", "center"];

function ownKeys$h(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$h(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$h(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$h(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledCircularProgress = styled__default$1["default"](material.CircularProgress).withConfig({
  displayName: "Loading__StyledCircularProgress",
  componentId: "sc-c25shm-0"
})(["color:", ";;"], function (_ref) {
  var theme = _ref.theme;
  return theme.palette.mode === 'dark' ? 'white' : 'inherit';
});
function Loading(props) {
  var children = props.children,
      center = props.center,
      rest = _objectWithoutProperties__default["default"](props, _excluded$e);

  if (children) {
    return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      flexDirection: "column",
      gap: 1,
      alignItems: "center",
      children: [/*#__PURE__*/jsxRuntime.jsx(StyledCircularProgress, _objectSpread$h({}, rest)), /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
        variant: "body1",
        align: "center",
        children: children
      })]
    });
  }

  if (center) {
    return /*#__PURE__*/jsxRuntime.jsx(Flex, {
      flexDirection: "column",
      gap: 1,
      alignItems: "center",
      children: /*#__PURE__*/jsxRuntime.jsx(StyledCircularProgress, _objectSpread$h({}, rest))
    });
  }

  return /*#__PURE__*/jsxRuntime.jsx(StyledCircularProgress, _objectSpread$h({}, rest));
}
Loading.defaultProps = {
  children: undefined,
  center: false
};

var ModeContext = /*#__PURE__*/React.createContext(undefined);
function ModeProvider(props) {
  var defaultMode = props.mode,
      children = props.children,
      _props$persist = props.persist,
      persist = _props$persist === void 0 ? false : _props$persist;

  var _useState = React.useState(defaultMode),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      modeState = _useState2[0],
      setModeState = _useState2[1];

  var _useLocalStorage = useLocalStorage('mode', defaultMode),
      _useLocalStorage2 = _slicedToArray__default["default"](_useLocalStorage, 2),
      modeLocalStorage = _useLocalStorage2[0],
      setModeLocalStorage = _useLocalStorage2[1];

  var handleSetMode = React.useCallback(function (newMode) {
    if (persist) {
      setModeLocalStorage(newMode);
    } else {
      setModeState(newMode);
    }
  }, [persist]);
  var mode = persist ? modeLocalStorage : modeState;
  var context = React.useMemo(function () {
    return {
      mode: mode,
      setMode: handleSetMode
    };
  }, [mode, handleSetMode]);
  return /*#__PURE__*/jsxRuntime.jsx(ModeContext.Provider, {
    value: context,
    children: children
  });
}

function useMode() {
  var context = React.useContext(ModeContext);

  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }

  var mode = context.mode,
      setMode = context.setMode;
  return [mode, setMode];
}

function SettingsLabel(props) {
  var children = props.children;
  return /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
    variant: "body1",
    children: children
  });
}

var Mode;

(function (Mode) {
  Mode["WALLET"] = "wallet";
  Mode["FARMING"] = "farming";
})(Mode || (Mode = {}));

var Mode$1 = Mode;

function ownKeys$g(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$g(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$g(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$g(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function LocaleToggle(props) {
  var _localeData$label;

  var rest = _extends__default$1["default"]({}, props);

  var _useContext = React.useContext(LocaleContext),
      locales = _useContext.locales;

  var _useLocale = useLocale(),
      _useLocale2 = _slicedToArray__default["default"](_useLocale, 2),
      currentLocale = _useLocale2[0],
      setLocale = _useLocale2[1];

  var _useToggle = reactUse.useToggle(false),
      _useToggle2 = _slicedToArray__default["default"](_useToggle, 2),
      open = _useToggle2[0],
      toggleOpen = _useToggle2[1];

  var openExternal = useOpenExternal();

  var _React$useState = React__default["default"].useState(null),
      _React$useState2 = _slicedToArray__default["default"](_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
    toggleOpen();
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
    toggleOpen();
  };

  function handleSelect(locale) {
    setLocale(locale);
    toggleOpen();
  }

  function handleHelpTranslate() {
    handleClose();
    openExternal('https://github.com/Chia-Network/chia-blockchain-gui/tree/main/src/locales/README.md');
  }

  var localeData = React.useMemo(function () {
    return locales.find(function (item) {
      return item.locale === currentLocale;
    });
  }, [currentLocale, locales]);
  var currentLocaleLabel = (_localeData$label = localeData === null || localeData === void 0 ? void 0 : localeData.label) !== null && _localeData$label !== void 0 ? _localeData$label :
  /*i18n*/
  core.i18n._("Unknown");
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(Button, _objectSpread$g(_objectSpread$g({
      "aria-controls": "menu",
      "aria-haspopup": "true",
      onClick: handleClick,
      startIcon: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.Translate, {}),
      endIcon: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.ExpandMore, {}),
      "data-testid": "LocaleToggle-dropdown"
    }, rest), {}, {
      children: currentLocaleLabel
    })), /*#__PURE__*/jsxRuntime.jsxs(material.Menu, {
      id: "simple-menu",
      anchorEl: anchorEl,
      keepMounted: true,
      open: open,
      onClose: handleClose,
      children: [/*#__PURE__*/jsxRuntime.jsx(material.MenuItem, {
        onClick: handleHelpTranslate,
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Help translate"
        })
      }), /*#__PURE__*/jsxRuntime.jsx(material.Divider, {}), locales.map(function (item) {
        return /*#__PURE__*/jsxRuntime.jsx(material.MenuItem, {
          onClick: function onClick() {
            return handleSelect(item.locale);
          },
          selected: item.locale === currentLocale,
          "data-testid": "LocaleToggle-locale-".concat(item.locale),
          children: item.label
        }, item.locale);
      })]
    })]
  });
}

function SettingsApp(props) {
  var children = props.children;

  var _useMode = useMode(),
      _useMode2 = _slicedToArray__default["default"](_useMode, 2),
      mode = _useMode2[0],
      setMode = _useMode2[1];

  var showError = useShowError();

  var _useDarkMode = useDarkMode(),
      enable = _useDarkMode.enable,
      disable = _useDarkMode.disable,
      isDarkMode = _useDarkMode.isDarkMode;

  function handleSetFarmingMode() {
    setMode(Mode$1.FARMING);
  }

  function handleSetWalletMode() {
    setMode(Mode$1.WALLET);
  }

  function handleOpenFAQURL() {
    return _handleOpenFAQURL.apply(this, arguments);
  }

  function _handleOpenFAQURL() {
    _handleOpenFAQURL = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var shell;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              shell = window.shell;
              _context.next = 4;
              return shell.openExternal('https://github.com/Chia-Network/chia-blockchain/wiki/FAQ');

            case 4:
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              showError(_context.t0);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));
    return _handleOpenFAQURL.apply(this, arguments);
  }

  function handleOpenSendFeedbackURL() {
    return _handleOpenSendFeedbackURL.apply(this, arguments);
  }

  function _handleOpenSendFeedbackURL() {
    _handleOpenSendFeedbackURL = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
      var shell;
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              shell = window.shell;
              _context2.next = 4;
              return shell.openExternal('https://feedback.chia.net/lightwallet');

            case 4:
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              showError(_context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));
    return _handleOpenSendFeedbackURL.apply(this, arguments);
  }

  return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    flexDirection: "column",
    gap: 3,
    children: [/*#__PURE__*/jsxRuntime.jsxs(Flex, {
      flexDirection: "column",
      gap: 1,
      children: [/*#__PURE__*/jsxRuntime.jsx(SettingsLabel, {
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Mode"
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(material.ButtonGroup, {
        fullWidth: true,
        children: [/*#__PURE__*/jsxRuntime.jsx(Button, {
          startIcon: /*#__PURE__*/jsxRuntime.jsx(icons.Farming, {}),
          selected: mode === Mode$1.FARMING,
          onClick: handleSetFarmingMode,
          "data-testid": "SettingsApp-mode-farming",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Farming"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Button, {
          startIcon: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.AccountBalanceWallet, {}),
          selected: mode === Mode$1.WALLET,
          onClick: handleSetWalletMode,
          "data-testid": "SettingsApp-mode-wallet",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Wallet"
          })
        })]
      })]
    }), /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      flexDirection: "column",
      gap: 1,
      children: [/*#__PURE__*/jsxRuntime.jsx(SettingsLabel, {
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Appearance"
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(material.ButtonGroup, {
        fullWidth: true,
        children: [/*#__PURE__*/jsxRuntime.jsx(Button, {
          startIcon: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.WbSunny, {}),
          selected: !isDarkMode,
          onClick: function onClick() {
            return disable();
          },
          "data-testid": "SettingsApp-appearance-light",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Light"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Button, {
          startIcon: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.NightsStay, {}),
          selected: isDarkMode,
          onClick: function onClick() {
            return enable();
          },
          "data-testid": "SettingsApp-appearance-dark",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Dark"
          })
        })]
      })]
    }), /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      flexDirection: "column",
      gap: 1,
      children: [/*#__PURE__*/jsxRuntime.jsx(SettingsLabel, {
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Language"
        })
      }), /*#__PURE__*/jsxRuntime.jsx(LocaleToggle, {
        variant: "outlined"
      })]
    }), children, /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      flexDirection: "column",
      gap: 1,
      children: [/*#__PURE__*/jsxRuntime.jsx(SettingsLabel, {
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Help"
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(Flex, {
        flexDirection: "column",
        children: [/*#__PURE__*/jsxRuntime.jsx(Link, {
          onClick: handleOpenFAQURL,
          "data-testid": "SettingsApp-faq",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Frequently Asked Questions"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Link, {
          onClick: handleOpenSendFeedbackURL,
          "data-testid": "SettingsApp-send-feedback",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Send Feedback"
          })
        })]
      })]
    })]
  });
}

var name = "@chia/core";
var author = "Chia Network <hello@chia.net> (https://chia.net/)";
var description = "Chia Core Library";
var productName$2 = "Chia Blockchain";
var version = "1.0.0";
var engines = {
	node: ">=12.20.0"
};
var main = "dist/index.js";
var module$1 = "dist/esm.js";
var scripts = {
	build: "npm run locale && npm run build:js",
	"build:js": "rollup -c",
	"build:watch": "rollup -c -w",
	"build:types": "tsc --emitDeclarationOnly",
	"locale:extract": "lingui extract",
	"locale:clean": "lingui extract --clean",
	"locale:compile": "lingui compile",
	locale: "lingui extract && lingui compile"
};
var dependencies = {
	"@babel/runtime": "7.16.7",
	"@chia/icons": "1.0.0",
	"@fontsource/roboto": "4.5.1",
	"@lingui/macro": "3.13.0",
	"@mui/utils": "5.5.3",
	"@rehooks/local-storage": "2.4.4",
	"bignumber.js": "9.0.2",
	cookie: "0.4.1",
	"core-js": "3.20.3",
	"is-electron": "2.2.1",
	"isomorphic-fetch": "3.0.0",
	"json-bigint": "1.0.0",
	lodash: "4.17.21",
	"match-sorter": "6.3.1",
	moment: "2.29.4",
	qs: "6.10.3",
	"react-dropzone": "11.5.1",
	"react-hook-form": "7.24.1",
	"react-number-format": "4.9.1",
	"react-redux": "7.2.6",
	"react-scroll-to-bottom": "4.2.0",
	"react-teleporter": "2.2.1",
	"react-use": "17.3.2",
	"react-use-timeout": "1.0.0",
	"stacktrace-gps": "3.0.4",
	"stacktrace-js": "2.0.2"
};
var devDependencies = {
	"@babel/core": "7.16.7",
	"@babel/helper-get-function-arity": "^7.16.7",
	"@babel/plugin-transform-runtime": "7.16.8",
	"@babel/preset-env": "7.16.8",
	"@babel/preset-react": "7.16.7",
	"@babel/preset-typescript": "7.16.7",
	"@chia/api": "1.0.0",
	"@chia/api-react": "1.0.0",
	"@lingui/cli": "3.13.0",
	"@lingui/core": "3.13.0",
	"@lingui/react": "3.13.0",
	"@loadable/babel-plugin": "5.13.2",
	"@loadable/component": "5.15.2",
	"@mui/icons-material": "5.5.1",
	"@mui/lab": "5.0.0-alpha.75",
	"@mui/material": "5.5.2",
	"@mui/styled-engine-sc": "5.5.2",
	"@mui/styles": "5.5.1",
	"@rollup/plugin-alias": "3.1.9",
	"@rollup/plugin-babel": "5.3.0",
	"@rollup/plugin-commonjs": "21.0.1",
	"@rollup/plugin-json": "4.1.0",
	"@rollup/plugin-node-resolve": "13.1.3",
	"@types/core-js": "2.5.5",
	"@types/isomorphic-fetch": "0.0.35",
	"@types/lodash": "4.14.178",
	"@types/qs": "6.9.7",
	"@types/react": "17.0.38",
	"@types/react-dom": "17.0.11",
	"@types/react-router-dom": "5.3.2",
	"babel-plugin-macros": "3.1.0",
	"babel-plugin-styled-components": "2.0.2",
	"babel-plugin-transform-imports": "2.0.0",
	"cross-env": "7.0.3",
	react: "17.0.2",
	"react-dom": "17.0.2",
	"react-router": "6.2.1",
	"react-router-dom": "6.2.1",
	rollup: "2.64.0",
	"rollup-plugin-node-externals": "3.1.2",
	"styled-components": "5.3.3",
	typescript: "4.5.4"
};
var peerDependencies = {
	"@chia/api": "1.0.0",
	"@chia/api-react": "1.0.0",
	"@lingui/core": "3.13.0",
	"@lingui/react": "3.13.0",
	"@mui/icons-material": "5.5.1",
	"@mui/lab": "5.0.0-alpha.75",
	"@mui/material": "5.5.2",
	"@mui/styled-engine-sc": "5.5.2",
	"@mui/styles": "5.5.1",
	react: "17.0.2",
	"react-dom": "17.0.2",
	"react-router": "6.2.1",
	"react-router-dom": "6.2.1",
	"styled-components": "5.3.3"
};
var walletPackageJson = {
	name: name,
	author: author,
	description: description,
	productName: productName$2,
	"private": true,
	version: version,
	engines: engines,
	main: main,
	module: module$1,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	peerDependencies: peerDependencies
};

function useAppVersion() {
  var _useState = React.useState(undefined),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      version = _useState2[0],
      setVersion = _useState2[1];

  function getVersion() {
    return _getVersion.apply(this, arguments);
  }

  function _getVersion() {
    _getVersion = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var currentVersion;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return window.ipcRenderer.invoke('getVersion');

            case 2:
              currentVersion = _context.sent;
              setVersion(currentVersion);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getVersion.apply(this, arguments);
  }

  React.useEffect(function () {
    getVersion();
  }, []);
  return {
    version: version,
    isLoading: version === undefined
  };
}

var productName$1 = walletPackageJson.productName;
var StyledRoot$3 = styled__default$1["default"](Flex).withConfig({
  displayName: "SettingsFooter__StyledRoot",
  componentId: "sc-10599jb-0"
})(["padding:1rem;"]);
function SettingsFooter() {
  var _useAppVersion = useAppVersion(),
      version = _useAppVersion.version;

  return /*#__PURE__*/jsxRuntime.jsx(StyledRoot$3, {
    children: /*#__PURE__*/jsxRuntime.jsxs(material.Typography, {
      color: "textSecondary",
      variant: "caption",
      children: [productName$1, " ", version]
    })
  });
}

var StyledHeader$1 = styled__default$1["default"](material.Box).withConfig({
  displayName: "Settings__StyledHeader",
  componentId: "sc-7mriid-0"
})(["padding:0.5rem 1rem;width:360px;"]);
var StyledBody$2 = styled__default$1["default"](material.Box).withConfig({
  displayName: "Settings__StyledBody",
  componentId: "sc-7mriid-1"
})(["padding:1rem 1rem;flex-grow:1;overflow-y:overlay;"]);
function Settings(props) {
  var _props$children = props.children,
      children = _props$children === void 0 ? /*#__PURE__*/jsxRuntime.jsx(SettingsApp, {}) : _props$children;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  function handleOpen(event) {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(true);
  }

  function handleClose(event) {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(false);
  }

  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(Tooltip, {
      title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
        id: "Settings"
      }),
      children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
        color: "inherit",
        onClick: handleOpen,
        disableFocusRipple: true,
        children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.Settings, {})
      })
    }), /*#__PURE__*/jsxRuntime.jsx(material.Drawer, {
      anchor: "right",
      open: open,
      onClose: handleClose,
      children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
        flexDirection: "column",
        height: "100%",
        children: [/*#__PURE__*/jsxRuntime.jsx(StyledHeader$1, {
          children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
            children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
              variant: "h6",
              children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                id: "Settings"
              })
            }), /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
              color: "inherit",
              onClick: handleClose,
              children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.Close, {})
            })]
          })
        }), /*#__PURE__*/jsxRuntime.jsx(material.Divider, {}), /*#__PURE__*/jsxRuntime.jsx(StyledBody$2, {
          children: children
        }), /*#__PURE__*/jsxRuntime.jsx(SettingsFooter, {})]
      })
    })]
  });
}

var StyledRoot$2 = styled__default$1["default"](Flex).withConfig({
  displayName: "LayoutDashboard__StyledRoot",
  componentId: "sc-1nay716-0"
})(["height:100%;"]);
var StyledAppBar = styled__default$1["default"](material.AppBar).withConfig({
  displayName: "LayoutDashboard__StyledAppBar",
  componentId: "sc-1nay716-1"
})(["border-bottom:1px solid ", ";width:", ";margin-left:", ";z-index:", ";};"], function (_ref) {
  var theme = _ref.theme;
  return theme.palette.divider;
}, function (_ref2) {
  var theme = _ref2.theme,
      drawer = _ref2.drawer;
  return drawer ? "calc(100% - ".concat(theme.drawer.width, ")") : '100%';
}, function (_ref3) {
  var theme = _ref3.theme,
      drawer = _ref3.drawer;
  return drawer ? theme.drawer.width : 0;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.zIndex.drawer + 1;
});
var StyledDrawer = styled__default$1["default"](material.Drawer).withConfig({
  displayName: "LayoutDashboard__StyledDrawer",
  componentId: "sc-1nay716-2"
})(["z-index:", ";width:", ";flex-shrink:0;> div{width:", ";}"], function (_ref5) {
  var theme = _ref5.theme;
  return theme.zIndex.drawer + 2;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.drawer.width;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.drawer.width;
});
var StyledBody$1 = styled__default$1["default"](Flex).withConfig({
  displayName: "LayoutDashboard__StyledBody",
  componentId: "sc-1nay716-3"
})(["min-width:0;"]);
var StyledToolbar = styled__default$1["default"](material.Toolbar).withConfig({
  displayName: "LayoutDashboard__StyledToolbar",
  componentId: "sc-1nay716-4"
})(["padding-left:", ";padding-right:", ";"], function (_ref8) {
  var theme = _ref8.theme;
  return theme.spacing(3);
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.spacing(3);
});
var StyledInlineTypography = styled__default$1["default"](material.Typography).withConfig({
  displayName: "LayoutDashboard__StyledInlineTypography",
  componentId: "sc-1nay716-5"
})(["display:inline-block;"]);
function LayoutDashboard(props) {
  var children = props.children,
      sidebar = props.sidebar,
      settings = props.settings,
      _props$outlet = props.outlet,
      outlet = _props$outlet === void 0 ? false : _props$outlet,
      actions = props.actions;
  var navigate = reactRouterDom.useNavigate();
  var logout = apiReact.useLogout();

  var _useGetLoggedInFinger = apiReact.useGetLoggedInFingerprintQuery(),
      fingerprint = _useGetLoggedInFinger.data;

  function handleLogout() {
    return _handleLogout.apply(this, arguments);
  }

  function _handleLogout() {
    _handleLogout = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return logout();

            case 2:
              navigate('/');

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleLogout.apply(this, arguments);
  }

  return /*#__PURE__*/jsxRuntime.jsx(StyledRoot$2, {
    children: /*#__PURE__*/jsxRuntime.jsxs(React.Suspense, {
      fallback: /*#__PURE__*/jsxRuntime.jsx(Loading, {
        center: true
      }),
      children: [sidebar ? /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.jsx(StyledAppBar, {
          position: "fixed",
          color: "transparent",
          elevation: 0,
          drawer: true,
          children: /*#__PURE__*/jsxRuntime.jsx(StyledToolbar, {
            children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
              children: [/*#__PURE__*/jsxRuntime.jsxs(Flex, {
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
                children: [/*#__PURE__*/jsxRuntime.jsx(material.Box, {
                  children: /*#__PURE__*/jsxRuntime.jsxs(material.Typography, {
                    variant: "h4",
                    children: [/*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                      id: "Wallet"
                    }), "\xA0", fingerprint && /*#__PURE__*/jsxRuntime.jsx(StyledInlineTypography, {
                      color: "textSecondary",
                      variant: "h5",
                      "data-testid": "LayoutDashboard-fingerprint",
                      children: fingerprint
                    })]
                  })
                }), /*#__PURE__*/jsxRuntime.jsx(Flex, {
                  alignItems: "center",
                  gap: 1,
                  children: actions
                })]
              }), /*#__PURE__*/jsxRuntime.jsx(material.Box, {
                children: /*#__PURE__*/jsxRuntime.jsx(Tooltip, {
                  title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                    id: "Log Out"
                  }),
                  children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
                    onClick: handleLogout,
                    "data-testid": "LayoutDashboard-log-out",
                    children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.ExitToApp, {})
                  })
                })
              })]
            })
          })
        }), /*#__PURE__*/jsxRuntime.jsx(StyledDrawer, {
          variant: "permanent",
          children: sidebar
        })]
      }) : /*#__PURE__*/jsxRuntime.jsx(StyledAppBar, {
        position: "fixed",
        color: "transparent",
        elevation: 0,
        children: /*#__PURE__*/jsxRuntime.jsx(StyledToolbar, {
          children: /*#__PURE__*/jsxRuntime.jsx(material.Container, {
            maxWidth: "lg",
            children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
              alignItems: "center",
              children: [/*#__PURE__*/jsxRuntime.jsx(Logo, {
                width: "100px"
              }), /*#__PURE__*/jsxRuntime.jsx(Flex, {
                flexGrow: 1
              }), /*#__PURE__*/jsxRuntime.jsx(Tooltip, {
                title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Logout"
                }),
                children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
                  color: "inherit",
                  onClick: handleLogout,
                  title:
                  /*i18n*/
                  core.i18n._("Log Out"),
                  children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.ExitToApp, {})
                })
              }), /*#__PURE__*/jsxRuntime.jsx(Settings, {
                children: settings
              })]
            })
          })
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(StyledBody$1, {
        flexDirection: "column",
        flexGrow: 1,
        children: [/*#__PURE__*/jsxRuntime.jsx(ToolbarSpacing, {}), /*#__PURE__*/jsxRuntime.jsx(Flex, {
          flexDirection: "column",
          gap: 2,
          flexGrow: 1,
          overflow: "auto",
          children: /*#__PURE__*/jsxRuntime.jsx(React.Suspense, {
            fallback: /*#__PURE__*/jsxRuntime.jsx(Loading, {
              center: true
            }),
            children: outlet ? /*#__PURE__*/jsxRuntime.jsx(reactRouterDom.Outlet, {}) : children
          })
        })]
      })]
    })
  });
}

var StyledRoot$1 = styled__default$1["default"](Flex).withConfig({
  displayName: "LayoutDashboardSub__StyledRoot",
  componentId: "sc-1srf8a1-0"
})(["width:100%;height:100%;"]);
var StyledSidebar = styled__default$1["default"](material.Box).withConfig({
  displayName: "LayoutDashboardSub__StyledSidebar",
  componentId: "sc-1srf8a1-1"
})(["height:100%;position:relative;"]);
var StyledHeader = styled__default$1["default"](material.Box).withConfig({
  displayName: "LayoutDashboardSub__StyledHeader",
  componentId: "sc-1srf8a1-2"
})(["padding-top:", ";padding-bottom:", ";padding-right:", ";padding-left:", ";margin-left:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.spacing(3);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.spacing(3);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.spacing(3);
}, function (_ref4) {
  var theme = _ref4.theme,
      sidebar = _ref4.sidebar;
  return !sidebar ? theme.spacing(3) : '10px';
}, function (_ref5) {
  var sidebar = _ref5.sidebar;
  return !sidebar ? "0" : '-10px';
});
var StyledContent = styled__default$1["default"](material.Box).withConfig({
  displayName: "LayoutDashboardSub__StyledContent",
  componentId: "sc-1srf8a1-3"
})(["display:flex;flex-direction:column;height:100%;flex-grow:1;overflow-y:scroll;position:relative;padding-top:", ";padding-bottom:", ";padding-right:", ";padding-left:", ";margin-left:", ";"], function (_ref6) {
  var theme = _ref6.theme,
      header = _ref6.header;
  return header ? 0 : theme.spacing(3);
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.spacing(3);
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.spacing(3);
}, function (_ref9) {
  var theme = _ref9.theme,
      sidebar = _ref9.sidebar;
  return !sidebar ? theme.spacing(3) : '10px';
}, function (_ref10) {
  var sidebar = _ref10.sidebar;
  return !sidebar ? "0" : '-10px';
});
function DashboardLayout(props) {
  var sidebar = props.sidebar,
      children = props.children,
      _props$outlet = props.outlet,
      outlet = _props$outlet === void 0 ? false : _props$outlet,
      header = props.header; // two layout column with always visible left column
  // and right column with content

  return /*#__PURE__*/jsxRuntime.jsxs(StyledRoot$1, {
    children: [sidebar && /*#__PURE__*/jsxRuntime.jsx(StyledSidebar, {
      children: sidebar
    }), header ? /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      flexDirection: "column",
      flexGrow: 1,
      children: [/*#__PURE__*/jsxRuntime.jsx(StyledHeader, {
        sidebar: !!sidebar,
        children: header
      }), /*#__PURE__*/jsxRuntime.jsx(StyledContent, {
        sidebar: !!sidebar,
        header: !!header,
        children: outlet ? /*#__PURE__*/jsxRuntime.jsx(reactRouter.Outlet, {}) : children
      })]
    }) : /*#__PURE__*/jsxRuntime.jsx(StyledContent, {
      sidebar: !!sidebar,
      children: outlet ? /*#__PURE__*/jsxRuntime.jsx(reactRouter.Outlet, {}) : children
    })]
  });
}

function LayoutLoading(props) {
  var children = props.children,
      hideSettings = props.hideSettings;
  return /*#__PURE__*/jsxRuntime.jsxs(LayoutHero, {
    hideSettings: hideSettings,
    children: [/*#__PURE__*/jsxRuntime.jsx(Loading, {
      center: true
    }), /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
      variant: "body1",
      children: children
    })]
  });
}

var productName = walletPackageJson.productName;
var FAQ = styled__default$1["default"].a.withConfig({
  displayName: "LayoutFooter__FAQ",
  componentId: "sc-oe71b2-0"
})(["color:rgb(128,160,194);"]);
var SendFeedback = styled__default$1["default"].a.withConfig({
  displayName: "LayoutFooter__SendFeedback",
  componentId: "sc-oe71b2-1"
})(["color:rgb(128,160,194);"]);

function openFAQURL() {
  return _openFAQURL.apply(this, arguments);
}

function _openFAQURL() {
  _openFAQURL = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    var shell;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            shell = window.shell;
            _context.next = 4;
            return shell.openExternal('https://github.com/Chia-Network/chia-blockchain/wiki/FAQ');

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _openFAQURL.apply(this, arguments);
}

function openSendFeedbackURL() {
  return _openSendFeedbackURL.apply(this, arguments);
}

function _openSendFeedbackURL() {
  _openSendFeedbackURL = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
    var shell;
    return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            shell = window.shell;
            _context2.next = 4;
            return shell.openExternal('https://feedback.chia.net/lightwallet');

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return _openSendFeedbackURL.apply(this, arguments);
}

function LayoutFooter() {
  var _useAppVersion = useAppVersion(),
      version = _useAppVersion.version;

  return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    children: [/*#__PURE__*/jsxRuntime.jsxs(material.Typography, {
      color: "textSecondary",
      variant: "body2",
      children: [productName, " ", version]
    }), /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      gap: 2,
      children: [/*#__PURE__*/jsxRuntime.jsx(FAQ, {
        onClick: openFAQURL,
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "FAQ"
        })
      }), /*#__PURE__*/jsxRuntime.jsx(SendFeedback, {
        onClick: openSendFeedbackURL,
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Send Feedback"
        })
      })]
    })]
  });
}

var StyledContainer$1 = styled__default$1["default"](material.Container).withConfig({
  displayName: "LayoutMain__StyledContainer",
  componentId: "sc-124n2l5-0"
})(["padding-top:", ";padding-bottom:", ";flex-grow:1;display:flex;"], function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.spacing(3));
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.spacing(3));
});
var StyledInnerContainer = styled__default$1["default"](Flex).withConfig({
  displayName: "LayoutMain__StyledInnerContainer",
  componentId: "sc-124n2l5-1"
})(["box-shadow:inset 6px 0 8px -8px rgba(0,0,0,0.2);flex-grow:1;"]);
var StyledBody = styled__default$1["default"](Flex).withConfig({
  displayName: "LayoutMain__StyledBody",
  componentId: "sc-124n2l5-2"
})(["min-width:0;"]);
function LayoutMain(props) {
  var children = props.children,
      bodyHeader = props.bodyHeader,
      _props$outlet = props.outlet,
      outlet = _props$outlet === void 0 ? false : _props$outlet;
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsxs(StyledInnerContainer, {
      flexDirection: "column",
      children: [bodyHeader, /*#__PURE__*/jsxRuntime.jsx(StyledContainer$1, {
        maxWidth: "lg",
        children: /*#__PURE__*/jsxRuntime.jsx(StyledBody, {
          flexDirection: "column",
          gap: 2,
          flexGrow: "1",
          children: outlet ? /*#__PURE__*/jsxRuntime.jsx(reactRouterDom.Outlet, {}) : children
        })
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(LayoutFooter, {})]
  });
}

var StyledRoot = styled__default$1["default"](material.Box).withConfig({
  displayName: "LoadingOverlay__StyledRoot",
  componentId: "sc-wwe8k-0"
})(["position:relative;width:100%;"]);
var StyledLoadingContainer = styled__default$1["default"](material.Box).withConfig({
  displayName: "LoadingOverlay__StyledLoadingContainer",
  componentId: "sc-wwe8k-1"
})(["position:absolute;left:0;right:0;bottom:0;top:0;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,0.2);"]);
function LoadingOverlay(props) {
  var children = props.children,
      loading = props.loading,
      disabled = props.disabled;
  return /*#__PURE__*/jsxRuntime.jsxs(StyledRoot, {
    children: [children, (loading || disabled) && /*#__PURE__*/jsxRuntime.jsx(StyledLoadingContainer, {
      children: !disabled && /*#__PURE__*/jsxRuntime.jsx(Loading, {
        center: true
      })
    })]
  });
}
LoadingOverlay.defaultProps = {
  children: undefined,
  loading: false,
  disabled: false
};

var StyledScrollToBottom = styled__default$1["default"](ScrollToBottom__default["default"]).withConfig({
  displayName: "Log__StyledScrollToBottom",
  componentId: "sc-113tsy6-0"
})(["width:100%;height:100%;"]);
var StyledPaper = styled__default$1["default"](material.Paper).withConfig({
  displayName: "Log__StyledPaper",
  componentId: "sc-113tsy6-1"
})(["background-color:#272c34;color:white;min-width:50vw;width:100%;height:40vh;pre{word-break:break-all;white-space:pre-wrap;font-size:14px;padding:", ";}"], function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.spacing(1), " ").concat(theme.spacing(2));
});
function Log(props) {
  var children = props.children;
  return /*#__PURE__*/jsxRuntime.jsx(StyledPaper, {
    children: /*#__PURE__*/jsxRuntime.jsx(StyledScrollToBottom, {
      debug: false,
      children: /*#__PURE__*/jsxRuntime.jsx("pre", {
        children: children
      })
    })
  });
}
Log.defaultProps = {
  children: undefined
};

function DialogLoading(props) {
  var onClose = props.onClose;
  return /*#__PURE__*/jsxRuntime.jsx(material.Dialog, {
    onClose: onClose,
    open: true,
    children: /*#__PURE__*/jsxRuntime.jsx(material.DialogContent, {
      children: /*#__PURE__*/jsxRuntime.jsx(Loading, {
        center: true
      })
    })
  });
}

function ModalDialogs() {
  var _useContext = React.useContext(ModalDialogsContext),
      dialogs = _useContext.dialogs;

  return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: dialogs.map(function (item) {
      var id = item.id,
          dialog = item.dialog,
          handleClose = item.handleClose;
      var updatedDialog = /*#__PURE__*/React.cloneElement(dialog, {
        show: true,
        onClose: handleClose,
        open: true
      });
      return /*#__PURE__*/jsxRuntime.jsx(React.Suspense, {
        fallback: /*#__PURE__*/jsxRuntime.jsx(DialogLoading, {
          onClose: handleClose
        }),
        children: updatedDialog
      }, id);
    })
  });
}

var nextId = 1;
function ModalDialogsProvider(props) {
  var children = props.children;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      dialogs = _useState2[0],
      setDialogs = _useState2[1];

  function hide(dialog) {
    setDialogs(function (dialogs) {
      return dialogs.filter(function (d) {
        return d.dialog !== dialog;
      });
    });
  }

  function show(dialog) {
    var id = nextId;
    nextId += 1;
    return new Promise(function (resolve, reject) {
      function handleClose(value) {
        // remove modal from dom
        hide(dialog);

        if (value instanceof Error) {
          reject(value);
        }

        resolve(value);
      }

      setDialogs(function (dialogs) {
        return [].concat(_toConsumableArray__default["default"](dialogs), [{
          id: id,
          dialog: dialog,
          handleClose: handleClose
        }]);
      });
    });
  }

  var value = {
    show: show,
    hide: hide,
    dialogs: dialogs
  };
  return /*#__PURE__*/jsxRuntime.jsx(ModalDialogsContext.Provider, {
    value: value,
    children: children
  });
}

var _excluded$d = ["children", "disabled"];

function ownKeys$f(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$f(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$f(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$f(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function More(props) {
  var children = props.children,
      disabled = props.disabled,
      rest = _objectWithoutProperties__default["default"](props, _excluded$d);

  var _React$useState = React__default["default"].useState(null),
      _React$useState2 = _slicedToArray__default["default"](_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var open = !!anchorEl;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(StyledIconButton, {
      "aria-label": "more",
      "aria-haspopup": "true",
      onClick: handleClick,
      disabled: disabled,
      children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.MoreVert, {})
    }), /*#__PURE__*/jsxRuntime.jsx(material.Menu, _objectSpread$f(_objectSpread$f({
      anchorEl: anchorEl,
      keepMounted: true,
      onClose: handleClose
    }, rest), {}, {
      open: open,
      children: children({
        onClose: handleClose
      })
    }))]
  });
}
More.defaultProps = {
  disabled: false
};

var PersistContext = /*#__PURE__*/React.createContext(undefined);

function Persist(props, ref) {
  var children = props.children,
      _props$value = props.value,
      defaultValue = _props$value === void 0 ? {} : _props$value,
      onChange = props.onChange;
  var persistNamespace = 'namespace' in props ? props.namespace : props.persist();
  var parentPersistContext = React.useContext(PersistContext);

  var _useState = React.useState(defaultValue),
      _useState2 = _slicedToArray__default["default"](_useState, 1),
      state = _useState2[0];

  var getValue = React.useCallback(function (defaultValue, namespace) {
    var _state$currentNamespa;

    var currentNamespace = namespace ? "".concat(persistNamespace, ".").concat(namespace) : persistNamespace;

    if (parentPersistContext) {
      return parentPersistContext.getValue(defaultValue, currentNamespace);
    }

    return (_state$currentNamespa = state[currentNamespace]) !== null && _state$currentNamespa !== void 0 ? _state$currentNamespa : defaultValue;
  }, [state, persistNamespace, parentPersistContext]);
  var setValue = React.useCallback(function (value, namespace) {
    var currentNamespace = namespace ? "".concat(persistNamespace, ".").concat(namespace) : persistNamespace;

    if (parentPersistContext) {
      parentPersistContext.setValue(value, currentNamespace);
    } else {
      state[currentNamespace] = value;
    }

    if (onChange) {
      onChange(value);
    }
  }, [state, persistNamespace, parentPersistContext, onChange]);
  var context = React.useMemo(function () {
    return {
      getValue: getValue,
      setValue: setValue
    };
  }, [getValue]);
  return /*#__PURE__*/jsxRuntime.jsx(PersistContext.Provider, {
    value: context,
    ref: ref,
    children: children
  });
}

var Persist$1 = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Persist));

var _excluded$c = ["inputRef", "onChange"],
    _excluded2$3 = ["children", "name", "variant", "fullWidth", "currency"];

function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$e(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function NumberFormatCustom(props) {
  var inputRef = props.inputRef,
      onChange = props.onChange,
      other = _objectWithoutProperties__default["default"](props, _excluded$c);

  function handleChange(values) {
    onChange(values.value);
  }

  return /*#__PURE__*/jsxRuntime.jsx(NumberFormat__default["default"], _objectSpread$e(_objectSpread$e({}, other), {}, {
    getInputRef: inputRef,
    onValueChange: handleChange,
    thousandSeparator: true,
    allowNegative: false,
    isNumericString: true
  }));
}

function TextFieldNumber(props) {
  var children = props.children,
      name = props.name,
      variant = props.variant,
      fullWidth = props.fullWidth,
      currency = props.currency,
      rest = _objectWithoutProperties__default["default"](props, _excluded2$3);

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control;

  var value = reactHookForm.useWatch({
    control: control,
    name: name
  });
  return /*#__PURE__*/jsxRuntime.jsxs(material.FormControl, {
    variant: variant,
    fullWidth: fullWidth,
    children: [/*#__PURE__*/jsxRuntime.jsx(TextField, _objectSpread$e({
      name: name,
      variant: variant,
      autoComplete: "off",
      InputProps: {
        spellCheck: false,
        inputComponent: NumberFormatCustom,
        endAdornment: currency ? /*#__PURE__*/jsxRuntime.jsx(material.InputAdornment, {
          position: "end",
          children: currency
        }) : undefined
      }
    }, rest)), /*#__PURE__*/jsxRuntime.jsx(material.FormHelperText, {
      component: "div",
      children: children && children({
        value: value
      })
    })]
  });
}
TextFieldNumber.defaultProps = {
  label: undefined,
  name: undefined,
  children: undefined,
  currency: undefined
};

function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$d(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function PrivateRoute(props) {
  /*
  const loggedIn = useSelector(
    (state: RootState) => state.wallet_state.logged_in,
  );
  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  */
  return /*#__PURE__*/jsxRuntime.jsx(reactRouterDom.Route, _objectSpread$d({}, props));
}

var _excluded$b = ["onChange"],
    _excluded2$2 = ["name", "boolean"];

function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ParseBoolean = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var onChange = props.onChange,
      rest = _objectWithoutProperties__default["default"](props, _excluded$b);

  var name = rest.name;

  var _useFormContext = reactHookForm.useFormContext(),
      setValue = _useFormContext.setValue;

  function handleChange(e) {
    var value = e.target.value === 'true'; // @ts-ignore

    onChange(e, e.target.value === 'true');

    if (name) {
      setValue(name, value);
    }
  }

  return /*#__PURE__*/jsxRuntime.jsx(material.RadioGroup, _objectSpread$c({
    onChange: handleChange,
    ref: ref
  }, rest));
});
function RadioGroup(props) {
  var name = props.name,
      _boolean = props["boolean"],
      rest = _objectWithoutProperties__default["default"](props, _excluded2$2);

  var _useFormContext2 = reactHookForm.useFormContext(),
      control = _useFormContext2.control;

  return (
    /*#__PURE__*/
    // @ts-ignore
    jsxRuntime.jsx(reactHookForm.Controller, {
      name: name,
      control: control,
      render: function render(_ref) {
        var field = _ref.field;
        return _boolean ? /*#__PURE__*/jsxRuntime.jsx(ParseBoolean, _objectSpread$c(_objectSpread$c({}, field), rest)) : /*#__PURE__*/jsxRuntime.jsx(material.RadioGroup, _objectSpread$c(_objectSpread$c({}, field), rest));
      }
    })
  );
}

var _excluded$a = ["isVisible"];

function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledIframe = styled__default$1["default"](function (_ref) {
  _ref.isVisible;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$a);

  return /*#__PURE__*/jsxRuntime.jsx("iframe", _objectSpread$b({}, rest));
}).withConfig({
  displayName: "SandboxedIframe__StyledIframe",
  componentId: "sc-c0lck4-0"
})(["position:relative;pointer-events:none;width:100%;height:100%;opacity:", ";"], function (_ref2) {
  var isVisible = _ref2.isVisible;
  return isVisible ? 1 : 0;
});

function SandboxedIframe(props) {
  var srcDoc = props.srcDoc,
      _props$height = props.height,
      height = _props$height === void 0 ? '300px' : _props$height,
      width = props.width,
      onLoadedChange = props.onLoadedChange,
      _props$hideUntilLoade = props.hideUntilLoaded,
      hideUntilLoaded = _props$hideUntilLoade === void 0 ? false : _props$hideUntilLoade;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1];

  React.useEffect(function () {
    setLoaded(false);
    onLoadedChange === null || onLoadedChange === void 0 ? void 0 : onLoadedChange(false);
  }, [srcDoc]);

  function handleLoad() {
    setLoaded(true);
    onLoadedChange === null || onLoadedChange === void 0 ? void 0 : onLoadedChange(true);
  }

  var isVisible = hideUntilLoaded ? loaded : true;
  return /*#__PURE__*/jsxRuntime.jsx(StyledIframe, {
    srcDoc: srcDoc,
    sandbox: "",
    height: height,
    width: width,
    frameBorder: "0",
    onLoad: handleLoad,
    isVisible: isVisible
  });
}

var SandboxedIframe$1 = /*#__PURE__*/React.memo(SandboxedIframe);

var _excluded$9 = ["name", "value", "children"];

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Select(props) {
  var controllerName = props.name;
      props.value;
      var children = props.children,
      rest = _objectWithoutProperties__default["default"](props, _excluded$9);

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control,
      errors = _useFormContext.errors;

  var errorMessage = lodash.get(errors, controllerName);
  return (
    /*#__PURE__*/
    // @ts-ignore
    jsxRuntime.jsx(reactHookForm.Controller, {
      name: controllerName,
      control: control,
      render: function render(_ref) {
        var _ref$field = _ref.field,
            _onChange = _ref$field.onChange,
            onBlur = _ref$field.onBlur,
            value = _ref$field.value,
            name = _ref$field.name,
            ref = _ref$field.ref;
        return /*#__PURE__*/jsxRuntime.jsx(material.Select, _objectSpread$a(_objectSpread$a({
          onChange: function onChange(event) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            _onChange.apply(void 0, [event].concat(args));

            if (props.onChange) {
              props.onChange.apply(props, [event].concat(args));
            }
          },
          onBlur: onBlur,
          value: value,
          name: name,
          ref: ref,
          error: !!errorMessage
        }, rest), {}, {
          children: children
        }));
      }
    })
  );
}

var _excluded$8 = ["to", "title", "icon", "end", "onSelect"];

var _templateObject, _templateObject2, _templateObject3;

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledListItemIcon = styled$1(material.ListItemIcon)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  min-width: auto;\n  position: relative;\n  background-color: ", ";\n  border-radius: ", ";\n  width: ", ";\n  height: ", ";\n  border: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: border 0.3s ease-in-out;\n\n  &::after {\n    content: \"\";\n    border-radius: ", ";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    box-shadow: 0px -2px 4px rgba(104, 249, 127, 0.41), 0px 1px 8px rgba(145, 247, 53, 0.45);\n    opacity: 0;\n    transition: opacity 0.3s ease-in-out;\n  }\n\n  svg {\n    color: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme,
      selected = _ref.selected;
  return selected ? useColorModeValue(theme, 'sidebarBackground') : 'transparent';
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.spacing(1.5);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.spacing(6);
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.spacing(6);
}, function (_ref5) {
  var selected = _ref5.selected,
      theme = _ref5.theme;
  return "1px solid ".concat(selected ? theme.palette.highlight.main : useColorModeValue(theme, 'border'));
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.spacing(1.5);
}, function (_ref7) {
  var selected = _ref7.selected,
      theme = _ref7.theme;
  return selected ? useColorModeValue(theme, 'sidebarIconSelected') : useColorModeValue(theme, 'sidebarIcon');
});
var StyledListItem = styled$1(material.ListItem)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: ", ";\n  padding-bottom: ", ";\n\n  &:hover {\n    background-color: transparent;\n  }\n\n  &:hover ", " {\n    border-color: #4CAF50;\n\n    svg {\n      color: ", " !important;\n    }\n\n    &::after {\n      opacity: 1;\n    }\n  }\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.spacing(1);
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.spacing(1);
}, StyledListItemIcon, function (_ref10) {
  var theme = _ref10.theme;
  return useColorModeValue(theme, 'sidebarIconHover');
});
var StyledListItemText = styled$1(material.Typography)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  font-size: ", " !important;\n  font-weight: 500;\n"])), function (_ref11) {
  var theme = _ref11.theme;
  return theme.typography.pxToRem(10);
});
function SideBarItem(props) {
  var to = props.to,
      title = props.title,
      Icon = props.icon,
      _props$end = props.end,
      end = _props$end === void 0 ? false : _props$end,
      onSelect = props.onSelect,
      rest = _objectWithoutProperties__default["default"](props, _excluded$8);

  var navigate = reactRouterDom.useNavigate();
  var match = reactRouterDom.useMatch({
    path: to,
    end: end
  });
  var isSelected = !!match;

  function handleClick() {
    return _handleClick.apply(this, arguments);
  }

  function _handleClick() {
    _handleClick = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!onSelect) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return onSelect();

            case 3:
              navigate(to);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleClick.apply(this, arguments);
  }

  return /*#__PURE__*/jsxRuntime.jsx(StyledListItem, _objectSpread$9(_objectSpread$9({
    button: true,
    onClick: function onClick() {
      return handleClick();
    }
  }, rest), {}, {
    children: /*#__PURE__*/jsxRuntime.jsxs(core$1.Flex, {
      flexDirection: "column",
      alignItems: "center",
      gap: 0.5,
      children: [/*#__PURE__*/jsxRuntime.jsx(StyledListItemIcon, {
        selected: isSelected,
        children: /*#__PURE__*/jsxRuntime.jsx(Icon, {
          fontSize: "sidebarIcon"
        })
      }), /*#__PURE__*/jsxRuntime.jsx(StyledListItemText, {
        align: "center",
        children: title
      })]
    })
  }));
}

function Spacer() {
  return /*#__PURE__*/jsxRuntime.jsx(Flex, {
    flexGrow: 1
  });
}

var StyledBackdrop = styled__default$1["default"](material.Backdrop).withConfig({
  displayName: "Spinner__StyledBackdrop",
  componentId: "sc-1ml1wy7-0"
})(["z-index:2000;"]);
function Spinner(props) {
  var show = props.show;
  return /*#__PURE__*/jsxRuntime.jsx(StyledBackdrop, {
    open: show,
    children: /*#__PURE__*/jsxRuntime.jsx(material.CircularProgress, {
      color: "inherit",
      disableShrink: true
    })
  });
}

var State;

(function (State) {
  State["SUCCESS"] = "SUCCESS";
  State["WARNING"] = "WARNING";
  State["ERROR"] = "ERROR";
})(State || (State = {}));

var State$1 = State;

var StateIndicatorDot = styled__default$1["default"](iconsMaterial.FiberManualRecord).withConfig({
  displayName: "StateIndicatorDot",
  componentId: "sc-1wo1h11-0"
})(["font-size:1rem;color:", ";"], function (_ref) {
  var color = _ref.color;
  return color;
});

var _excluded$7 = ["color"];

var _Color$1;

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Color$1 = (_Color$1 = {}, _defineProperty__default["default"](_Color$1, State$1.SUCCESS, StateColor$1.SUCCESS), _defineProperty__default["default"](_Color$1, State$1.WARNING, StateColor$1.WARNING), _defineProperty__default["default"](_Color$1, State$1.ERROR, StateColor$1.ERROR), _Color$1);
var StyledFlexContainer = styled__default$1["default"](function (_ref) {
  _ref.color;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$7);

  return /*#__PURE__*/jsxRuntime.jsx(Flex, _objectSpread$8({}, rest));
}).withConfig({
  displayName: "StateIndicator__StyledFlexContainer",
  componentId: "sc-3e28ts-0"
})(["color:", ";"], function (_ref2) {
  var color = _ref2.color;
  return color;
});
function StateComponent(props) {
  var children = props.children,
      state = props.state,
      _props$indicator = props.indicator,
      indicator = _props$indicator === void 0 ? false : _props$indicator,
      _props$reversed = props.reversed,
      reversed = _props$reversed === void 0 ? false : _props$reversed,
      _props$color = props.color,
      color = _props$color === void 0 ? Color$1[state] : _props$color,
      _props$gap = props.gap,
      gap = _props$gap === void 0 ? 1 : _props$gap;
  var iconColor = Color$1[state];
  return /*#__PURE__*/jsxRuntime.jsxs(StyledFlexContainer, {
    color: color,
    alignItems: "center",
    gap: gap,
    flexDirection: reversed ? 'row-reverse' : 'row',
    children: [/*#__PURE__*/jsxRuntime.jsx("span", {
      children: children
    }), indicator && /*#__PURE__*/jsxRuntime.jsx(StateIndicatorDot, {
      color: iconColor
    })]
  });
}

var _excluded$6 = ["state"];

var _Color;

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Color = (_Color = {}, _defineProperty__default["default"](_Color, State$1.SUCCESS, StateColor$1.SUCCESS), _defineProperty__default["default"](_Color, State$1.WARNING, StateColor$1.WARNING), _defineProperty__default["default"](_Color, State$1.ERROR, StateColor$1.ERROR), _Color);
var StateTypography = styled__default$1["default"](function (_ref) {
  _ref.state;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded$6);

  return /*#__PURE__*/jsxRuntime.jsx(material.Typography, _objectSpread$7({}, rest));
}).withConfig({
  displayName: "StateTypography",
  componentId: "sc-u50jgr-0"
})(["", ""], function (_ref2) {
  var state = _ref2.state;
  return state ? "color: ".concat(Color[state], ";") : '';
});

function Suspender() {
  var resolve = React.useRef();
  var promise = React.useMemo(function () {
    return new Promise(function (res) {
      resolve.current = res;
    });
  }, []);
  React.useEffect(function () {
    return function () {
      var _resolve$current;

      (_resolve$current = resolve.current) === null || _resolve$current === void 0 ? void 0 : _resolve$current.call(resolve);
    };
  });
  throw promise;
}

var _excluded$5 = ["odd"],
    _excluded2$1 = ["width", "minWidth", "maxWidth"],
    _excluded3 = ["isExpanded"];

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledTableHead = styled__default$1["default"](material.TableHead).withConfig({
  displayName: "TableControlled__StyledTableHead",
  componentId: "sc-13nrzb8-0"
})(["background-color:", ";font-weight:500;"], function (_ref) {
  var theme = _ref.theme;
  return theme.palette.action.selected;
});
var StyledTableRow = styled__default$1["default"](function (_ref2) {
  _ref2.odd;
      var rest = _objectWithoutProperties__default["default"](_ref2, _excluded$5);

  return /*#__PURE__*/jsxRuntime.jsx(material.TableRow, _objectSpread$6({}, rest));
}).withConfig({
  displayName: "TableControlled__StyledTableRow",
  componentId: "sc-13nrzb8-1"
})(["", ""], function (_ref3) {
  var odd = _ref3.odd,
      theme = _ref3.theme;
  return odd ? "background-color: ".concat(theme.palette.action.hover, ";") : undefined;
});
var StyledExpandedTableRow = styled__default$1["default"](material.TableRow).withConfig({
  displayName: "TableControlled__StyledExpandedTableRow",
  componentId: "sc-13nrzb8-2"
})(["background-color:", ";", ""], function (_ref4) {
  var theme = _ref4.theme;
  return theme.palette.mode === 'dark' ? '#1E1E1E' : '#EEEEEE';
}, function (_ref5) {
  var isExpanded = _ref5.isExpanded;
  return !isExpanded ? 'display: none;' : undefined;
});
var StyledTableCell = styled__default$1["default"](function (_ref6) {
  _ref6.width;
      _ref6.minWidth;
      _ref6.maxWidth;
      var rest = _objectWithoutProperties__default["default"](_ref6, _excluded2$1);

  return /*#__PURE__*/jsxRuntime.jsx(material.TableCell, _objectSpread$6({}, rest));
}).withConfig({
  displayName: "TableControlled__StyledTableCell",
  componentId: "sc-13nrzb8-3"
})(["max-width:", ";min-width:", ";width:", "};border-bottom:1px solid ", ";"], function (_ref7) {
  var _ref8;

  var minWidth = _ref7.minWidth,
      maxWidth = _ref7.maxWidth,
      width = _ref7.width;
  return (_ref8 = maxWidth || width || minWidth) !== null && _ref8 !== void 0 ? _ref8 : 'none';
}, function (_ref9) {
  var minWidth = _ref9.minWidth;
  return minWidth || '0';
}, function (_ref10) {
  var width = _ref10.width,
      minWidth = _ref10.minWidth;
  return width || minWidth ? width : 'auto';
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.palette.mode === 'dark' ? '#353535' : '#e0e0e0';
});
var StyledTableCellContent = styled__default$1["default"](material.Box).withConfig({
  displayName: "TableControlled__StyledTableCellContent",
  componentId: "sc-13nrzb8-4"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
var StyledExpandedTableCell = styled__default$1["default"](function (_ref12) {
  _ref12.isExpanded;
      var rest = _objectWithoutProperties__default["default"](_ref12, _excluded3);

  return /*#__PURE__*/jsxRuntime.jsx(material.TableCell, _objectSpread$6({}, rest));
}).withConfig({
  displayName: "TableControlled__StyledExpandedTableCell",
  componentId: "sc-13nrzb8-5"
})([""]);
var StyledExpandedTableCellContent = styled__default$1["default"](material.Box).withConfig({
  displayName: "TableControlled__StyledExpandedTableCellContent",
  componentId: "sc-13nrzb8-6"
})(["padding:1rem 0;"]);
function TableControlled(props) {
  var _ref13;

  var cols = props.cols,
      rows = props.rows,
      page = props.page,
      pages = props.pages,
      rowsPerPageOptions = props.rowsPerPageOptions,
      rowsPerPage = props.rowsPerPage,
      hideHeader = props.hideHeader,
      caption = props.caption,
      onRowClick = props.onRowClick,
      rowHover = props.rowHover,
      uniqueField = props.uniqueField,
      metadata = props.metadata,
      expandedField = props.expandedField,
      expandedCellShift = props.expandedCellShift,
      onPageChange = props.onPageChange,
      count = props.count,
      isLoading = props.isLoading;

  var _useState = React.useState({}),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  function handleSetRowsPerPage(newRowsPerPage) {
    if (onPageChange) {
      onPageChange(newRowsPerPage, 0);
    }
  }

  function handleSetPage(newPage) {
    if (onPageChange) {
      onPageChange(rowsPerPage, newPage);
    }
  }

  function handleToggleExpand(rowId) {
    setExpanded(_objectSpread$6(_objectSpread$6({}, expanded), {}, _defineProperty__default["default"]({}, rowId, !expanded[rowId])));
  }

  function handleChangePage(_event, newPage) {
    handleSetPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    handleSetRowsPerPage(+event.target.value);
  }

  var currentCols = React.useMemo(function () {
    return cols.map(function (col, index) {
      return _objectSpread$6({
        key: index
      }, col);
    });
  }, [cols]);
  var preparedRows = React.useMemo(function () {
    return rows.map(function (row, rowIndex) {
      return _objectSpread$6({
        $uniqueId: uniqueField ? lodash.get(row, uniqueField) : rowIndex
      }, row);
    });
  }, [rows]);

  function handleRowClick(e, row) {
    if (onRowClick) {
      onRowClick(e, row);
    }
  }

  return /*#__PURE__*/jsxRuntime.jsx(LoadingOverlay, {
    loading: isLoading,
    children: /*#__PURE__*/jsxRuntime.jsxs(material.TableContainer, {
      component: material.Paper,
      children: [/*#__PURE__*/jsxRuntime.jsxs(material.Table, {
        children: [caption && /*#__PURE__*/jsxRuntime.jsx("caption", {
          children: caption
        }), !hideHeader && /*#__PURE__*/jsxRuntime.jsx(StyledTableHead, {
          children: /*#__PURE__*/jsxRuntime.jsx(material.TableRow, {
            children: currentCols.map(function (col) {
              return /*#__PURE__*/jsxRuntime.jsx(StyledTableCell, {
                minWidth: col.minWidth,
                maxWidth: col.maxWidth,
                width: col.width,
                children: /*#__PURE__*/jsxRuntime.jsx(StyledTableCellContent, {
                  children: col.title
                })
              }, col.key);
            })
          })
        }), /*#__PURE__*/jsxRuntime.jsx(material.TableBody, {
          children: preparedRows.map(function (row, rowIndex) {
            var _row$$uniqueId;

            var id = "".concat((_row$$uniqueId = row.$uniqueId) === null || _row$$uniqueId === void 0 ? void 0 : _row$$uniqueId.toString(), "-").concat(rowIndex);
            var isExpanded = !!expanded[id];
            var expandableCells = [];

            for (var i = 0; i < expandedCellShift; i += 1) {
              expandableCells.push( /*#__PURE__*/jsxRuntime.jsx(StyledExpandedTableCell, {
                style: {
                  paddingBottom: 0,
                  paddingTop: 0
                },
                isExpanded: isExpanded
              }, i));
            }

            return /*#__PURE__*/jsxRuntime.jsxs(React.Fragment, {
              children: [/*#__PURE__*/jsxRuntime.jsx(StyledTableRow, {
                odd: rowIndex % 2 === 1,
                onClick: function onClick(e) {
                  return handleRowClick(e, row);
                },
                hover: rowHover,
                children: currentCols.map(function (col) {
                  var field = col.field,
                      tooltip = col.tooltip;
                  var value = typeof field === 'function' ? field(row, metadata, isExpanded, function () {
                    return handleToggleExpand(id);
                  }) : // @ts-ignore
                  lodash.get(row, field);
                  var tooltipValue;

                  if (tooltip) {
                    if (tooltip === true) {
                      tooltipValue = value;
                    } else {
                      tooltipValue = typeof tooltip === 'function' ? tooltip(row) : // @ts-ignore
                      lodash.get(row, tooltip);
                    }
                  }

                  return /*#__PURE__*/jsxRuntime.jsx(StyledTableCell, {
                    minWidth: col.minWidth,
                    maxWidth: col.maxWidth,
                    width: col.width,
                    children: tooltipValue ? /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
                      title: tooltipValue,
                      children: /*#__PURE__*/jsxRuntime.jsx(StyledTableCellContent, {
                        children: value
                      })
                    }) : /*#__PURE__*/jsxRuntime.jsx(StyledTableCellContent, {
                      children: value
                    })
                  }, col.key);
                })
              }), /*#__PURE__*/jsxRuntime.jsxs(StyledExpandedTableRow, {
                isExpanded: isExpanded,
                children: [expandableCells, /*#__PURE__*/jsxRuntime.jsx(StyledExpandedTableCell, {
                  style: {
                    paddingBottom: 0,
                    paddingTop: 0
                  },
                  colSpan: cols.length - expandedCellShift,
                  children: /*#__PURE__*/jsxRuntime.jsx(material.Collapse, {
                    "in": isExpanded,
                    timeout: "auto",
                    unmountOnExit: true,
                    children: /*#__PURE__*/jsxRuntime.jsx(StyledExpandedTableCellContent, {
                      children: expandedField && expandedField(row)
                    })
                  })
                })]
              })]
            }, id);
          })
        })]
      }), pages && /*#__PURE__*/jsxRuntime.jsx(material.TablePagination, {
        rowsPerPageOptions: rowsPerPageOptions,
        component: "div",
        count: (_ref13 = count !== null && count !== void 0 ? count : rows.length) !== null && _ref13 !== void 0 ? _ref13 : 0,
        rowsPerPage: rowsPerPage,
        page: page,
        onPageChange: handleChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage
      })]
    })
  });
}
TableControlled.defaultProps = {
  rows: [],
  cols: [],
  pages: false,
  rowsPerPageOptions: [10, 25, 100],
  rowsPerPage: 10,
  hideHeader: false,
  caption: undefined,
  children: undefined,
  rowHover: false,
  uniqueField: undefined,
  metadata: undefined,
  expandable: false,
  expandedCellShift: 0
};

var _excluded$4 = ["rows", "page", "pages", "rowsPerPage"];

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Table(props) {
  var rows = props.rows,
      defaultPage = props.page,
      pages = props.pages,
      defaultRowsPerPage = props.rowsPerPage,
      rest = _objectWithoutProperties__default["default"](props, _excluded$4);

  var _useState = React.useState({}),
      _useState2 = _slicedToArray__default["default"](_useState, 2);
      _useState2[0];
      _useState2[1];

  var _useState3 = React.useState(defaultPage !== null && defaultPage !== void 0 ? defaultPage : 0),
      _useState4 = _slicedToArray__default["default"](_useState3, 2),
      page = _useState4[0],
      setPage = _useState4[1];

  var _useState5 = React.useState(defaultRowsPerPage !== null && defaultRowsPerPage !== void 0 ? defaultRowsPerPage : 10),
      _useState6 = _slicedToArray__default["default"](_useState5, 2),
      rowsPerPage = _useState6[0],
      setRowsPerPage = _useState6[1];

  function handlePageChange(newRowsPerPage, newPage) {
    setPage(newPage);
    setRowsPerPage(newRowsPerPage);
  }

  var visibleRows = React.useMemo(function () {
    if (!pages) {
      return rows;
    }

    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, pages, page, rowsPerPage]);
  return /*#__PURE__*/jsxRuntime.jsx(TableControlled, _objectSpread$5({
    rows: visibleRows,
    onPageChange: handlePageChange,
    page: page,
    rowsPerPage: rowsPerPage,
    pages: pages,
    count: rows.length
  }, rest));
}
Table.defaultProps = {
  rows: [],
  pages: false,
  page: 0,
  rowsPerPageOptions: [10, 25, 100],
  rowsPerPage: 10,
  hideHeader: false,
  caption: undefined,
  children: undefined,
  rowHover: false,
  uniqueField: undefined,
  metadata: undefined,
  expandable: false,
  expandedCellShift: 0
};

function getMaterialLocale(locale) {
  var _materialLocales$mate;

  if (!locale) {
    return materialLocales__namespace.enUS;
  }

  var materialLocale = locale.replace('-', '');
  return (_materialLocales$mate = materialLocales__namespace[materialLocale]) !== null && _materialLocales$mate !== void 0 ? _materialLocales$mate : materialLocales__namespace.enUS;
}
var GlobalStyle = styled$3.createGlobalStyle(["html,body,#root{height:100%;}#root{display:flex;flex-direction:column;}ul .MuiBox-root{outline:none;}"]);
function ThemeProvider(props) {
  var children = props.children,
      theme = props.theme,
      global = props.global,
      fonts = props.fonts;

  var _useLocale = useLocale(),
      _useLocale2 = _slicedToArray__default["default"](_useLocale, 1),
      locale = _useLocale2[0];

  var finallTheme = React.useMemo(function () {
    var localisedTheme = getMaterialLocale(locale);
    return styles.createTheme(theme, localisedTheme);
  }, [theme, locale]);
  return /*#__PURE__*/jsxRuntime.jsx(styled$3.ThemeProvider, {
    theme: finallTheme,
    children: /*#__PURE__*/jsxRuntime.jsx(styles.ThemeProvider, {
      theme: finallTheme,
      children: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.jsx(material.CssBaseline, {}), global && /*#__PURE__*/jsxRuntime.jsx(GlobalStyle, {}), fonts && /*#__PURE__*/jsxRuntime.jsx(Fonts, {}), children]
      })
    })
  });
}
ThemeProvider.defaultProps = {
  fonts: false,
  global: false
};

var _excluded$3 = ["title"];

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function TooltipTypography(props) {
  var title = props.title,
      rest = _objectWithoutProperties__default["default"](props, _excluded$3);

  return /*#__PURE__*/jsxRuntime.jsxs(Flex, {
    alignItems: "center",
    gap: 1,
    children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, _objectSpread$4({}, rest)), /*#__PURE__*/jsxRuntime.jsx(TooltipIcon, {
      children: title
    })]
  });
}

var _excluded$2 = ["tooltip", "children", "copyToClipboard", "ValueProps"];

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function truncateValue(children, opts) {
  var _opts$separator = opts.separator,
      separator = _opts$separator === void 0 ? '...' : _opts$separator,
      _opts$leftLength = opts.leftLength,
      leftLength = _opts$leftLength === void 0 ? 4 : _opts$leftLength,
      _opts$rightLength = opts.rightLength,
      rightLength = _opts$rightLength === void 0 ? 4 : _opts$rightLength,
      _opts$splitSeparator = opts.splitSeparator,
      splitSeparator = _opts$splitSeparator === void 0 ? ':' : _opts$splitSeparator,
      _opts$prefixes = opts.prefixes,
      prefixes = _opts$prefixes === void 0 ? ['nft1', 'txch1', 'xch1', 'did:chia:1', '0x'] : _opts$prefixes;

  if (!children) {
    return children;
  }

  var stringValue = children.toString();

  if (stringValue === 'did:chia:19qf3g9876t0rkq7tfdkc28cxfy424yzanea29rkzylq89kped9hq3q7wd2') {
    return 'Chia Network';
  }

  var parts = stringValue.split(splitSeparator);

  if (!parts.length) {
    return children;
  } // get last part and rest of the string


  var value = parts.pop();

  if (!value) {
    return children;
  }

  var rest = parts.join(splitSeparator); // skip prefix from truncation

  var prefixIndex = prefixes.findIndex(function (prefix) {
    return value.startsWith(prefix);
  });
  var selectedPrefix = prefixIndex === -1 ? '' : prefixes[prefixIndex];
  var subValue = prefixIndex === -1 ? value : value.substring(selectedPrefix.length);
  var totalNewSize = leftLength + rightLength + separator.length;

  if (totalNewSize >= subValue.length + selectedPrefix.length) {
    return children;
  }

  var truncatedSubValue = "".concat(subValue.substring(0, leftLength)).concat(separator).concat(subValue.substring(subValue.length - rightLength));
  return rest ? "".concat(rest).concat(splitSeparator).concat(selectedPrefix).concat(truncatedSubValue) : "".concat(selectedPrefix).concat(truncatedSubValue);
}
/* ========================================================================== */

function Truncate(props) {
  var tooltip = props.tooltip,
      children = props.children,
      _props$copyToClipboar = props.copyToClipboard,
      copyToClipboard = _props$copyToClipboar === void 0 ? false : _props$copyToClipboar,
      ValueProps = props.ValueProps,
      rest = _objectWithoutProperties__default["default"](props, _excluded$2);

  var value = truncateValue(children, rest);

  if (tooltip) {
    return /*#__PURE__*/jsxRuntime.jsx(Tooltip, {
      title: children,
      copyToClipboard: copyToClipboard,
      children: /*#__PURE__*/jsxRuntime.jsx(material.Typography, _objectSpread$3(_objectSpread$3({}, ValueProps), {}, {
        children: value
      }))
    });
  }

  return /*#__PURE__*/jsxRuntime.jsx(material.Typography, _objectSpread$3(_objectSpread$3({}, ValueProps), {}, {
    children: value
  }));
}

var _excluded$1 = ["value", "variant", "state"];

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function UnitFormat(props) {
  var value = props.value,
      variant = props.variant,
      state = props.state,
      rest = _objectWithoutProperties__default["default"](props, _excluded$1);

  var currencyCode = useCurrencyCode();
  return /*#__PURE__*/jsxRuntime.jsx(StateTypography, _objectSpread$2(_objectSpread$2({
    variant: variant,
    state: state
  }, rest), {}, {
    children: "".concat(value, " ").concat(currencyCode)
  }));
}
UnitFormat.defaultProps = {
  variant: 'body1'
};

var _UnitAliases;

var UnitAliases = (_UnitAliases = {}, _defineProperty__default["default"](_UnitAliases, Unit$1.CHIA, ['ch', 'chia', 'xch']), _defineProperty__default["default"](_UnitAliases, Unit$1.MOJO, ['mj', 'mojo', 'mojos']), _defineProperty__default["default"](_UnitAliases, Unit$1.CAT, ['cat', 'cc', 'colouredcoin']), _UnitAliases);

var BLOCK_DURATION_SECONDS = 24 * 60 * 60 / 4608;
function blockHeightToTimestamp(height, peakTransaction) {
  var diff = peakTransaction.confirmedAtHeight - height;
  var seconds = diff * BLOCK_DURATION_SECONDS;
  return peakTransaction.createdAtTime - seconds;
}

var MOJO_PER_CHIA = new BigNumber__default["default"]('1000000000000');
var BLOCKS_PER_YEAR = 1681920;
var POOL_REWARD = '0.875'; // 7 / 8

var FARMER_REWARD = '0.125'; // 1 /8

function calculatePoolReward(height) {
  if (height === 0) {
    return MOJO_PER_CHIA.times('21000000').times(POOL_REWARD);
  }

  if (height < 3 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times('2').times(POOL_REWARD);
  }

  if (height < 6 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times('1').times(POOL_REWARD);
  }

  if (height < 9 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times('0.5').times(POOL_REWARD);
  }

  if (height < 12 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times('0.25').times(POOL_REWARD);
  }

  return MOJO_PER_CHIA.times('0.125').times(POOL_REWARD);
}
function calculateBaseFarmerReward(height) {
  if (height === 0) {
    return MOJO_PER_CHIA.times('21000000').times(FARMER_REWARD);
  }

  if (height < 3 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times('2').times(FARMER_REWARD);
  }

  if (height < 6 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times('1').times(FARMER_REWARD);
  }

  if (height < 9 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times('0.5').times(FARMER_REWARD);
  }

  if (height < 12 * BLOCKS_PER_YEAR) {
    return MOJO_PER_CHIA.times('0.25').times(FARMER_REWARD);
  }

  return MOJO_PER_CHIA.times('0.125').times(FARMER_REWARD);
}

function sumPoints(points) {
  var _sumBy;

  return (_sumBy = lodash.sumBy(points, function (point) {
    return point[1];
  })) !== null && _sumBy !== void 0 ? _sumBy : 0;
}

function getPercentPointsSuccessfull(pointsAcknowledged, pointsFound) {
  var acknowledged = sumPoints(pointsAcknowledged);
  var found = sumPoints(pointsFound);

  if (!acknowledged || !found) {
    return 0;
  }

  return acknowledged / found;
}

function getPoolInfo(_x) {
  return _getPoolInfo.apply(this, arguments);
}

function _getPoolInfo() {
  _getPoolInfo = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(poolUrl) {
    var url, response;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "".concat(poolUrl, "/pool_info");
            _context.next = 3;
            return fetch(url);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.json());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPoolInfo.apply(this, arguments);
}

var mempoolInclusionStatus = {
  SUCCESS: 1,
  // Transaction added to mempool
  PENDING: 2,
  // Transaction not yet added to mempool
  FAILED: 3 // Transaction was invalid and dropped

};
function getTransactionResult(transaction) {
  if (!transaction || !transaction.sentTo || !transaction.sentTo.length) {
    return {
      message:
      /*i18n*/
      core.i18n._("Transaction has not been sent to node yet"),
      success: true
    };
  } // At least one node has accepted our transaction


  var hasSuccess = !!transaction.sentTo.find(function (item) {
    return item[1] === mempoolInclusionStatus.SUCCESS;
  });

  if (hasSuccess) {
    return {
      message:
      /*i18n*/
      core.i18n._("Transaction has successfully been sent to a full node and included in the mempool."),
      success: true
    };
  } // At least one node has accepted our transaction as pending


  var pendingNodeResponse = transaction.sentTo.find(function (item) {
    return item[1] === mempoolInclusionStatus.PENDING;
  });

  if (pendingNodeResponse) {
    return {
      message:
      /*i18n*/
      core.i18n._("Transaction has sent to a full node and is pending inclusion into the mempool. {0}", {
        "0": pendingNodeResponse[2]
      }),
      success: true
    };
  } // No nodes have accepted our transaction, so display the error message of the first


  return {
    message: transaction.sentTo[0][2],
    success: false
  };
}

var platform = os__default["default"].platform();
var isWindows = platform && platform.startsWith('win');

function mojoToCAT(mojo) {
  return chiaFormatter(mojo, Unit$1.MOJO).to(Unit$1.CAT).toBigNumber();
}

function mojoToCATLocaleString(mojo, locale) {
  return chiaFormatter(mojo, Unit$1.MOJO).to(Unit$1.CAT).toLocaleString(locale);
}

function mojoToChia(mojo) {
  return chiaFormatter(mojo, Unit$1.MOJO).to(Unit$1.CHIA).toBigNumber();
}

function mojoToChiaLocaleString(mojo, locale) {
  return chiaFormatter(mojo, Unit$1.MOJO).to(Unit$1.CHIA).toLocaleString(locale);
}

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function validAddress(address, allowedPrefixes) {
  var response = api.decodeBech32m(address);
  var prefix = response.prefix.toLowerCase();

  if (allowedPrefixes && !allowedPrefixes.includes(prefix)) {
    throw new Error("Invalid address: ".concat(address, ". Valid addresses must contain one of the following prefixes: ").concat(allowedPrefixes.join(', ')));
  }
}

function useIsSimulator() {
  return false;
}

function usePersist(baseNamespace) {
  if (!baseNamespace) {
    throw new Error('baseNamespace is required');
  }

  function handleGenerateNamespace(namespace) {
    return namespace ? "".concat(baseNamespace, ".").concat(namespace) : baseNamespace;
  }

  return handleGenerateNamespace;
}

function usePersistState(defaultValue, namespace) {
  var persistContext = React.useContext(PersistContext);
  var update = reactUse.useUpdate();
  var value = namespace && persistContext ? persistContext.getValue(defaultValue, namespace) : defaultValue;
  var setValue = React.useCallback(function (value) {
    if (namespace && persistContext) {
      persistContext.setValue(value, namespace);
    }

    update();
  }, []);
  return [value, setValue];
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useSerializedNavigationState() {
  var originalNavigate = reactRouterDom.useNavigate();
  var location = reactRouterDom.useLocation();

  function wrappedNavigate(path, options) {
    if (options !== null && options !== void 0 && options.state) {
      var state = JSONbig__default["default"].stringify(options === null || options === void 0 ? void 0 : options.state);
      originalNavigate(path, _objectSpread$1(_objectSpread$1({}, options), {}, {
        state: state
      }));
    } else {
      originalNavigate(path, options);
    }
  }

  function getLocationState() {
    var state = location.state;

    if (state && lodash.isString(state)) {
      return JSONbig__default["default"].parse(state);
    }

    return state;
  }

  return {
    navigate: wrappedNavigate,
    location: location,
    getLocationState: getLocationState
  };
}

function useShowSaveDialog() {
  function handleShowSaveDialog() {
    return _handleShowSaveDialog.apply(this, arguments);
  }

  function _handleShowSaveDialog() {
    _handleShowSaveDialog = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var _window$ipcRenderer;

      var options,
          _args = arguments;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

              if (isElectron__default["default"]()) {
                _context.next = 3;
                break;
              }

              throw new Error('useSaveDialog is only available in electron');

            case 3:
              if (window.ipcRenderer) {
                _context.next = 5;
                break;
              }

              throw new Error('ipcRenderer is not available');

            case 5:
              _context.next = 7;
              return (_window$ipcRenderer = window.ipcRenderer) === null || _window$ipcRenderer === void 0 ? void 0 : _window$ipcRenderer.invoke('showSaveDialog', options);

            case 7:
              return _context.abrupt("return", _context.sent);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleShowSaveDialog.apply(this, arguments);
  }

  return handleShowSaveDialog;
}

function useShowDebugInformation() {
  return true;
}

function useSkipMigration() {
  var _useLocalStorage = useLocalStorage('skipMigration', false),
      _useLocalStorage2 = _slicedToArray__default["default"](_useLocalStorage, 2),
      skip = _useLocalStorage2[0],
      setSkip = _useLocalStorage2[1];

  return [skip, setSkip];
}

function useTrans() {
  var _useLingui = react.useLingui(),
      i18n = _useLingui.i18n;

  var handleTranslate = React.useCallback(function (messageId, values, options) {
    return i18n._(messageId, values, options);
  }, [i18n]);
  return handleTranslate;
}

function useValidateChangePassphraseParams() {
  var _useGetKeyringStatusQ = apiReact.useGetKeyringStatusQuery(),
      keyringState = _useGetKeyringStatusQ.data,
      isLoading = _useGetKeyringStatusQ.isLoading,
      error = _useGetKeyringStatusQ.error;

  var openDialog = useOpenDialog();

  function validateChangePassphraseParams(_x, _x2, _x3) {
    return _validateChangePassphraseParams.apply(this, arguments);
  }

  function _validateChangePassphraseParams() {
    _validateChangePassphraseParams = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(currentPassphrase, newPassphrase, confirmationPassphrase) {
      var allowEmptyPassphrase, minPassphraseLength, alertTitle, buttonTitle, message, useEmptyPassphrase;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!isLoading) {
                _context.next = 5;
                break;
              }

              throw new Error('Keyring state is loading please wait');

            case 5:
              if (keyringState) {
                _context.next = 7;
                break;
              }

              throw new Error('Keyring state is not defined');

            case 7:
              allowEmptyPassphrase = keyringState.allowEmptyPassphrase, minPassphraseLength = keyringState.minPassphraseLength;

              if (!(newPassphrase != confirmationPassphrase)) {
                _context.next = 12;
                break;
              }

              throw new Error(
              /*i18n*/
              core.i18n._("The provided passphrase and confirmation do not match"));

            case 12:
              if (!(newPassphrase.length == 0 && !allowEmptyPassphrase || // Passphrase required, no passphrase provided
              newPassphrase.length > 0 && newPassphrase.length < minPassphraseLength)) {
                _context.next = 16;
                break;
              }

              throw new Error(
              /*i18n*/
              core.i18n._("{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}", {
                minPassphraseLength: minPassphraseLength
              }));

            case 16:
              if (!(currentPassphrase !== null && currentPassphrase == newPassphrase)) {
                _context.next = 20;
                break;
              }

              throw new Error(
              /*i18n*/
              core.i18n._("New passphrase is the same as your current passphrase"));

            case 20:
              if (!(newPassphrase.length == 0)) {
                _context.next = 27;
                break;
              }

              // Warn about using an empty passphrase
              if (currentPassphrase === null) {
                alertTitle = /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Skip Passphrase Protection"
                });
                buttonTitle = /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Skip"
                });
                message = /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?"
                });
              } else {
                alertTitle = /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Disable Passphrase Protection"
                });
                buttonTitle = /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Disable"
                });
                message = /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?"
                });
              }

              _context.next = 24;
              return openDialog( /*#__PURE__*/jsxRuntime.jsx(ConfirmDialog, {
                title: alertTitle,
                confirmTitle: buttonTitle,
                confirmColor: "danger" // @ts-ignore
                ,
                // @ts-ignore
                maxWidth: "xs",
                children: message
              }));

            case 24:
              useEmptyPassphrase = _context.sent;

              if (useEmptyPassphrase) {
                _context.next = 27;
                break;
              }

              return _context.abrupt("return", false);

            case 27:
              return _context.abrupt("return", true);

            case 30:
              _context.prev = 30;
              _context.t0 = _context["catch"](0);
              _context.next = 34;
              return openDialog( /*#__PURE__*/jsxRuntime.jsx(AlertDialog, {
                children: _context.t0.message
              }));

            case 34:
              return _context.abrupt("return", false);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 30]]);
    }));
    return _validateChangePassphraseParams.apply(this, arguments);
  }

  return [validateChangePassphraseParams, {
    isLoading: isLoading,
    error: error
  }];
}

var greyTheme = {
  palette: {
    grey: {
      main: colors.grey[300],
      dark: colors.grey[400]
    }
  }
};
var theme = styles.createTheme(greyTheme);
var theme$1 = utils.deepmerge(greyTheme, {
  palette: {
    background: {
      "default": '#fafafa'
    },
    primary: {
      main: '#3AAC59',
      // '#00C853',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#000000',
      contrastText: '#ffffff'
    },
    danger: {
      main: '#dc3545',
      contrastText: '#ffffff'
    },
    highlight: {
      main: '#00C853'
    },
    border: {
      main: '#E0E0E0',
      dark: '#484747'
    },
    sidebarBackground: {
      main: '#E8F5E9',
      dark: '#505C4E'
    },
    sidebarIconSelected: {
      main: '#1B5E20',
      dark: '#3AAC59'
    },
    sidebarIcon: {
      main: '#9E9E9E',
      dark: '#9E9E9E'
    },
    sidebarIconHover: {
      main: '#424242',
      dark: 'white'
    }
  },
  drawer: {
    width: '72px'
  },
  mixins: {
    toolbar: {
      minHeight: '90px'
    }
  },
  components: {
    MuiSvgIcon: {
      variants: [{
        props: {
          fontSize: 'extraLarge'
        },
        style: {
          fontSize: '3rem'
        }
      }, {
        props: {
          fontSize: 'sidebarIcon'
        },
        style: {
          fontSize: '2rem'
        }
      }]
    },
    MuiTypography: {
      variants: [{
        props: {
          variant: 'h6'
        },
        style: {
          fontWeight: 400
        }
      }]
    },
    MuiChip: {
      variants: [{
        props: {
          size: 'extraSmall'
        },
        style: {
          height: '20px',
          fontSize: '0.75rem',
          '.MuiChip-label': {
            paddingLeft: '6px',
            paddingRight: '6px'
          }
        }
      }]
    },
    MuiButton: {
      variants: [{
        props: {
          variant: 'contained',
          color: 'grey'
        },
        style: {
          color: theme.palette.getContrastText(theme.palette.grey[300])
        }
      }, {
        props: {
          variant: 'outlined',
          color: 'grey'
        },
        style: {
          color: theme.palette.text.primary,
          borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
          '&.Mui-disabled': {
            border: "1px solid ".concat(theme.palette.action.disabledBackground)
          },
          '&:hover': {
            borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
            backgroundColor: styles.alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity)
          }
        }
      }, {
        props: {
          color: 'grey',
          variant: 'text'
        },
        style: {
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: styles.alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity)
          }
        }
      }]
    }
  }
});

var dark = styles.createTheme(utils.deepmerge(theme$1, {
  palette: {
    background: {
      "default": '#212121',
      paper: '#333333'
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#000000'
    },
    mode: 'dark'
  }
}));

var light = styles.createTheme(theme$1);

var _excluded = ["fingerprint"],
    _excluded2 = ["data", "isLoading"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledTypographyDD = styled__default$1["default"](material.Typography).withConfig({
  displayName: "SelectKeyDetailDialog__StyledTypographyDD",
  componentId: "sc-1tf0vvl-0"
})(["word-break:break-all;"]);
function SelectKeyDetailDialog(props) {
  var fingerprint = props.fingerprint,
      rest = _objectWithoutProperties__default["default"](props, _excluded);

  var _useGetPrivateKeyQuer = apiReact.useGetPrivateKeyQuery({
    fingerprint: fingerprint
  }),
      privateKey = _useGetPrivateKeyQuer.data,
      isLoading = _useGetPrivateKeyQuer.isLoading;
      _objectWithoutProperties__default["default"](_useGetPrivateKeyQuer, _excluded2);

  if (isLoading) {
    return /*#__PURE__*/jsxRuntime.jsx(AlertDialog, _objectSpread(_objectSpread({
      title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
        id: "Private key {fingerprint}",
        values: {
          fingerprint: fingerprint
        }
      })
    }, rest), {}, {
      children: /*#__PURE__*/jsxRuntime.jsx(Loading, {
        center: true
      })
    }));
  }

  return /*#__PURE__*/jsxRuntime.jsx(AlertDialog, _objectSpread(_objectSpread({
    title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
      id: "Private key {fingerprint}",
      values: {
        fingerprint: fingerprint
      }
    })
  }, rest), {}, {
    children: /*#__PURE__*/jsxRuntime.jsxs(material.Grid, {
      container: true,
      component: "dl" // mount a Definition List
      ,
      spacing: 2,
      children: [/*#__PURE__*/jsxRuntime.jsxs(material.Grid, {
        item: true,
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          component: "dt",
          variant: "subtitle2",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Private key:"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(StyledTypographyDD, {
          component: "dd",
          variant: "body2",
          children: privateKey.sk
        })]
      }), /*#__PURE__*/jsxRuntime.jsxs(material.Grid, {
        item: true,
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          component: "dt",
          variant: "subtitle2",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Public key:"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(StyledTypographyDD, {
          component: "dd",
          variant: "body2",
          children: privateKey.pk
        })]
      }), /*#__PURE__*/jsxRuntime.jsxs(material.Grid, {
        item: true,
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          component: "dt",
          variant: "subtitle2",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Farmer public key:"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(StyledTypographyDD, {
          component: "dd",
          variant: "body2",
          children: privateKey.farmerPk
        })]
      }), /*#__PURE__*/jsxRuntime.jsxs(material.Grid, {
        item: true,
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          component: "dt",
          variant: "subtitle2",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Pool public key:"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(StyledTypographyDD, {
          component: "dd",
          variant: "body2",
          children: privateKey.poolPk
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(material.Grid, {
        item: true,
        children: privateKey.seed ? /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
            component: "dt",
            variant: "subtitle2",
            children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
              id: "Seed:"
            })
          }), /*#__PURE__*/jsxRuntime.jsx(StyledTypographyDD, {
            component: "dd",
            variant: "body2",
            children: privateKey.seed
          })]
        }) : /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          component: "dd",
          variant: "body2",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "No 24 word seed, since this key is imported."
          })
        })
      })]
    })
  }));
}

function useKeyringMigrationPrompt() {
  var _useSkipMigration = useSkipMigration(),
      _useSkipMigration2 = _slicedToArray__default["default"](_useSkipMigration, 2);
      _useSkipMigration2[0];
      var setSkipMigration = _useSkipMigration2[1];

  var openDialog = useOpenDialog();

  function promptForKeyringMigration() {
    return _promptForKeyringMigration.apply(this, arguments);
  }

  function _promptForKeyringMigration() {
    _promptForKeyringMigration = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      var beginMigration;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return openDialog( /*#__PURE__*/jsxRuntime.jsx(ConfirmDialog, {
                title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Migration required"
                }),
                confirmTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Migrate"
                }),
                cancelTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Cancel"
                }),
                confirmColor: "default",
                children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?"
                })
              }));

            case 2:
              beginMigration = _context.sent;

              if (beginMigration) {
                setSkipMigration(false);
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _promptForKeyringMigration.apply(this, arguments);
  }

  return [promptForKeyringMigration];
}

var StyledFingerprintListItem = styled__default$1["default"](material.ListItem).withConfig({
  displayName: "SelectKeyItem__StyledFingerprintListItem",
  componentId: "sc-vnw1qh-0"
})(["padding-right:", ";"], function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.spacing(11));
});
function SelectKeyItem(props) {
  var fingerprint = props.fingerprint,
      onSelect = props.onSelect,
      disabled = props.disabled,
      loading = props.loading;

  var _useGetKeyringStatusQ = apiReact.useGetKeyringStatusQuery(),
      keyringState = _useGetKeyringStatusQ.data,
      isLoadingKeyringStatus = _useGetKeyringStatusQ.isLoading;

  var openDialog = useOpenDialog();

  var _useDeleteKeyMutation = apiReact.useDeleteKeyMutation(),
      _useDeleteKeyMutation2 = _slicedToArray__default["default"](_useDeleteKeyMutation, 1),
      deleteKey = _useDeleteKeyMutation2[0];

  var _useCheckDeleteKeyMut = apiReact.useCheckDeleteKeyMutation(),
      _useCheckDeleteKeyMut2 = _slicedToArray__default["default"](_useCheckDeleteKeyMut, 1),
      checkDeleteKey = _useCheckDeleteKeyMut2[0];

  var _useSkipMigration = useSkipMigration(),
      _useSkipMigration2 = _slicedToArray__default["default"](_useSkipMigration, 1),
      skippedMigration = _useSkipMigration2[0];

  var _useKeyringMigrationP = useKeyringMigrationPrompt(),
      _useKeyringMigrationP2 = _slicedToArray__default["default"](_useKeyringMigrationP, 1),
      promptForKeyringMigration = _useKeyringMigrationP2[0];

  function handleLogin() {
    return _handleLogin.apply(this, arguments);
  }

  function _handleLogin() {
    _handleLogin = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onSelect(fingerprint);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleLogin.apply(this, arguments);
  }

  function handleShowKey(event) {
    event.stopPropagation();
    openDialog( /*#__PURE__*/jsxRuntime.jsx(SelectKeyDetailDialog, {
      fingerprint: fingerprint
    }));
  }

  function handleDeletePrivateKey(_x) {
    return _handleDeletePrivateKey.apply(this, arguments);
  }

  function _handleDeletePrivateKey() {
    _handleDeletePrivateKey = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(event) {
      var canModifyKeyring, _yield$checkDeleteKey, _yield$checkDeleteKey2, usedForFarmerRewards, usedForPoolRewards, walletBalance, handleKeyringMutator, _handleKeyringMutator;

      return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _handleKeyringMutator = function _handleKeyringMutator3() {
                _handleKeyringMutator = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
                  return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(isLoadingKeyringStatus || keyringState !== null && keyringState !== void 0 && keyringState.needsMigration && skippedMigration)) {
                            _context2.next = 4;
                            break;
                          }

                          _context2.next = 3;
                          return promptForKeyringMigration();

                        case 3:
                          return _context2.abrupt("return", false);

                        case 4:
                          return _context2.abrupt("return", true);

                        case 5:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                return _handleKeyringMutator.apply(this, arguments);
              };

              handleKeyringMutator = function _handleKeyringMutator2() {
                return _handleKeyringMutator.apply(this, arguments);
              };

              _context3.next = 4;
              return handleKeyringMutator();

            case 4:
              canModifyKeyring = _context3.sent;

              if (canModifyKeyring) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return");

            case 7:
              event.stopPropagation();
              _context3.next = 10;
              return checkDeleteKey({
                fingerprint: fingerprint
              });

            case 10:
              _yield$checkDeleteKey = _context3.sent;
              _yield$checkDeleteKey2 = _yield$checkDeleteKey.data;
              usedForFarmerRewards = _yield$checkDeleteKey2.usedForFarmerRewards;
              usedForPoolRewards = _yield$checkDeleteKey2.usedForPoolRewards;
              walletBalance = _yield$checkDeleteKey2.walletBalance;
              _context3.next = 17;
              return openDialog( /*#__PURE__*/jsxRuntime.jsxs(ConfirmDialog, {
                title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Delete key {fingerprint}",
                  values: {
                    fingerprint: fingerprint
                  }
                }),
                confirmTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Delete"
                }),
                cancelTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Back"
                }),
                confirmColor: "danger",
                onConfirm: function onConfirm() {
                  return deleteKey({
                    fingerprint: fingerprint
                  }).unwrap();
                },
                children: [usedForFarmerRewards && /*#__PURE__*/jsxRuntime.jsx(material.Alert, {
                  severity: "warning",
                  children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                    id: "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards"
                  })
                }), usedForPoolRewards && /*#__PURE__*/jsxRuntime.jsx(material.Alert, {
                  severity: "warning",
                  children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                    id: "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards"
                  })
                }), walletBalance && /*#__PURE__*/jsxRuntime.jsx(material.Alert, {
                  severity: "warning",
                  children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                    id: "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet"
                  })
                }), /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?"
                })]
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _handleDeletePrivateKey.apply(this, arguments);
  }

  return /*#__PURE__*/jsxRuntime.jsx(LoadingOverlay, {
    loading: loading,
    disabled: disabled,
    children: /*#__PURE__*/jsxRuntime.jsxs(StyledFingerprintListItem, {
      onClick: handleLogin,
      "data-testid": "SelectKeyItem-fingerprint-".concat(fingerprint),
      button: true,
      children: [/*#__PURE__*/jsxRuntime.jsx(material.ListItemText, {
        primary: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Private key with public fingerprint {fingerprint}",
          values: {
            fingerprint: fingerprint
          }
        }),
        secondary: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Can be backed up to mnemonic seed"
        })
      }), /*#__PURE__*/jsxRuntime.jsxs(material.ListItemSecondaryAction, {
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
          title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "See private key"
          }),
          children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
            edge: "end",
            "aria-label": "show",
            onClick: handleShowKey,
            "data-testid": "SelectKeyItem-detail-".concat(fingerprint),
            children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.Visibility, {})
          })
        }), /*#__PURE__*/jsxRuntime.jsx(material.Tooltip, {
          title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "DANGER: permanently delete private key"
          }),
          children: /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
            edge: "end",
            "aria-label": "delete",
            onClick: handleDeletePrivateKey,
            "data-testid": "SelectKeyItem-delete-".concat(fingerprint),
            children: /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.Delete, {})
          })
        })]
      })]
    }, fingerprint)
  });
}

var StyledContainer = styled__default$1["default"](material.Container).withConfig({
  displayName: "SelectKey__StyledContainer",
  componentId: "sc-19vg2hf-0"
})(["padding-bottom:1rem;"]);
function SelectKey() {
  var openDialog = useOpenDialog();
  var navigate = reactRouter.useNavigate();

  var _useDeleteAllKeysMuta = apiReact.useDeleteAllKeysMutation(),
      _useDeleteAllKeysMuta2 = _slicedToArray__default["default"](_useDeleteAllKeysMuta, 1),
      deleteAllKeys = _useDeleteAllKeysMuta2[0];

  var _useLogInAndSkipImpor = apiReact.useLogInAndSkipImportMutation(),
      _useLogInAndSkipImpor2 = _slicedToArray__default["default"](_useLogInAndSkipImpor, 2),
      logIn = _useLogInAndSkipImpor2[0],
      isLoadingLogIn = _useLogInAndSkipImpor2[1].isLoading;

  var _useGetPublicKeysQuer = apiReact.useGetPublicKeysQuery(),
      publicKeyFingerprints = _useGetPublicKeysQuer.data,
      isLoadingPublicKeys = _useGetPublicKeysQuer.isLoading,
      error = _useGetPublicKeysQuer.error,
      refetch = _useGetPublicKeysQuer.refetch;

  var _useGetKeyringStatusQ = apiReact.useGetKeyringStatusQuery(),
      keyringState = _useGetKeyringStatusQ.data,
      isLoadingKeyringStatus = _useGetKeyringStatusQ.isLoading;

  var hasFingerprints = !!(publicKeyFingerprints !== null && publicKeyFingerprints !== void 0 && publicKeyFingerprints.length);

  var _useState = React.useState(),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      selectedFingerprint = _useState2[0],
      setSelectedFingerprint = _useState2[1];

  var _useSkipMigration = useSkipMigration(),
      _useSkipMigration2 = _slicedToArray__default["default"](_useSkipMigration, 2),
      skippedMigration = _useSkipMigration2[0];
      _useSkipMigration2[1];

  var _useKeyringMigrationP = useKeyringMigrationPrompt(),
      _useKeyringMigrationP2 = _slicedToArray__default["default"](_useKeyringMigrationP, 1),
      promptForKeyringMigration = _useKeyringMigrationP2[0];

  var showError = useShowError();
  var isLoading = isLoadingPublicKeys || isLoadingLogIn;

  function handleSelect(_x) {
    return _handleSelect.apply(this, arguments);
  }

  function _handleSelect() {
    _handleSelect = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(fingerprint) {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!selectedFingerprint) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;
              setSelectedFingerprint(fingerprint);
              _context.next = 6;
              return logIn({
                fingerprint: fingerprint
              }).unwrap();

            case 6:
              navigate('/dashboard/wallets');
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              showError(_context.t0);

            case 12:
              _context.prev = 12;
              setSelectedFingerprint(undefined);
              return _context.finish(12);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9, 12, 15]]);
    }));
    return _handleSelect.apply(this, arguments);
  }

  function handleDeleteAllKeys() {
    return _handleDeleteAllKeys.apply(this, arguments);
  }

  function _handleDeleteAllKeys() {
    _handleDeleteAllKeys = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
      var canModifyKeyring;
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return handleKeyringMutator();

            case 2:
              canModifyKeyring = _context2.sent;

              if (canModifyKeyring) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              _context2.next = 7;
              return openDialog( /*#__PURE__*/jsxRuntime.jsx(ConfirmDialog, {
                title: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Delete all keys"
                }),
                confirmTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Delete"
                }),
                cancelTitle: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Back"
                }),
                confirmColor: "danger",
                onConfirm: function onConfirm() {
                  return deleteAllKeys().unwrap();
                },
                children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
                  id: "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?"
                })
              }));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _handleDeleteAllKeys.apply(this, arguments);
  }

  function handleKeyringMutator() {
    return _handleKeyringMutator.apply(this, arguments);
  }

  function _handleKeyringMutator() {
    _handleKeyringMutator = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3() {
      return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(isLoadingKeyringStatus || keyringState !== null && keyringState !== void 0 && keyringState.needsMigration && skippedMigration)) {
                _context3.next = 4;
                break;
              }

              _context3.next = 3;
              return promptForKeyringMigration();

            case 3:
              return _context3.abrupt("return", false);

            case 4:
              return _context3.abrupt("return", true);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _handleKeyringMutator.apply(this, arguments);
  }

  function handleNavigationIfKeyringIsMutable(_x2) {
    return _handleNavigationIfKeyringIsMutable.apply(this, arguments);
  }

  function _handleNavigationIfKeyringIsMutable() {
    _handleNavigationIfKeyringIsMutable = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4(url) {
      var canModifyKeyring;
      return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return handleKeyringMutator();

            case 2:
              canModifyKeyring = _context4.sent;

              if (canModifyKeyring) {
                navigate(url);
              }

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _handleNavigationIfKeyringIsMutable.apply(this, arguments);
  }

  return /*#__PURE__*/jsxRuntime.jsx(StyledContainer, {
    maxWidth: "xs",
    children: /*#__PURE__*/jsxRuntime.jsxs(Flex, {
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      children: [/*#__PURE__*/jsxRuntime.jsx(Logo, {
        width: 130
      }), isLoadingPublicKeys ? /*#__PURE__*/jsxRuntime.jsx(Loading, {
        center: true,
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Loading list of the keys"
        })
      }) : error ? /*#__PURE__*/jsxRuntime.jsxs(material.Alert, {
        severity: "error",
        action: /*#__PURE__*/jsxRuntime.jsx(Button, {
          onClick: refetch,
          color: "inherit",
          size: "small",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Try Again"
          })
        }),
        children: [/*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Unable to load the list of the keys"
        }), "\xA0", /*#__PURE__*/jsxRuntime.jsx(TooltipIcon, {
          children: error.message
        })]
      }) : hasFingerprints ? /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
        variant: "h5",
        component: "h1",
        children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
          id: "Select Key"
        })
      }) : /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          variant: "h5",
          component: "h1",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Sign In"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(material.Typography, {
          variant: "subtitle1",
          align: "center",
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Welcome to Chia. Please log in with an existing key, or create a new key."
          })
        })]
      }), /*#__PURE__*/jsxRuntime.jsxs(Flex, {
        flexDirection: "column",
        gap: 3,
        alignItems: "stretch",
        alignSelf: "stretch",
        children: [hasFingerprints && /*#__PURE__*/jsxRuntime.jsx(material.Card, {
          children: /*#__PURE__*/jsxRuntime.jsx(material.List, {
            children: publicKeyFingerprints.map(function (fingerprint) {
              return /*#__PURE__*/jsxRuntime.jsx(SelectKeyItem, {
                fingerprint: fingerprint,
                onSelect: handleSelect,
                loading: fingerprint === selectedFingerprint,
                disabled: !!selectedFingerprint && fingerprint !== selectedFingerprint
              }, fingerprint);
            })
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Button, {
          onClick: function onClick() {
            return handleNavigationIfKeyringIsMutable("/wallet/add");
          },
          variant: "contained",
          color: "primary",
          size: "large",
          disabled: isLoading,
          "data-testid": "SelectKey-create-new-key",
          fullWidth: true,
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Create a new private key"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Button, {
          onClick: function onClick() {
            return handleNavigationIfKeyringIsMutable("/wallet/import");
          },
          type: "submit",
          variant: "outlined",
          size: "large",
          disabled: isLoading,
          "data-testid": "SelectKey-import-from-mnemonics",
          fullWidth: true,
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Import from Mnemonics (24 words)"
          })
        }), /*#__PURE__*/jsxRuntime.jsx(Button, {
          onClick: handleDeleteAllKeys,
          variant: "outlined",
          color: "danger",
          size: "large",
          disabled: isLoading,
          "data-testid": "SelectKey-delete-all-keys",
          fullWidth: true,
          children: /*#__PURE__*/jsxRuntime.jsx(react.Trans, {
            id: "Delete all keys"
          })
        })]
      })]
    })
  });
}

/*eslint-disable*/
var messages$C = {
  messages: {
    "Amount": "المبلغ",
    "Appearance": "Appearance",
    "Back": "رجوع",
    "Can be backed up to mnemonic seed": "يمكن الإسترجاع من النسخة الاحتياطية للكلمات السرية",
    "Cancel": "إلغاء",
    "Connected": "متصل",
    "Copied": "تم النسخ",
    "Copy to Clipboard": "نسخ إلى الحافظة",
    "Create a new private key": "إنشاء مفتاح خاص جديد",
    "DANGER: permanently delete private key": "تحذير: حذف المفتاح الخاص بشكل دائم",
    "Dark": "Dark",
    "Delete": "حذف",
    "Delete all keys": "حذف جميع المفاتيح",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "سيؤدي حذف جميع المفاتيح إلى إزالة المفاتيح بشكل دائم من جهاز الكمبيوتر الخاص بك، تأكد من أن لديك نسخ احتياطية. هل أنت متأكد من أنك تريد المتابعة؟",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "سيؤدي حذف المفتاح إلى إزالة المفتاح بشكل دائم من جهاز الكمبيوتر الخاص بك، تأكد من أن لديك نسخ احتياطية. هل أنت متأكد من أنك تريد المتابعة؟",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "خطأ",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "المزرعة",
    "Fee": "الرسوم",
    "Frequently Asked Questions": "الأسئلة المتكررة",
    "Help": "المساعدة",
    "Help translate": "المساعدة في الترجمة",
    "Hide Advanced Options": "إخفاء الاختيارات المتقدمة",
    "Import from Mnemonics (24 words)": "إستيراد من Mnemonics (24 كلمة)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "لا يوجد بذور 24 كلمة، لأن هذا المفتاح مستورد.",
    "Not connected": "غير متّصل",
    "OK": "موافق",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["مفتاح خاص ببصمة إصبع عامة ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "المفتاح الخاص:",
    "Public key:": "المفتاح العمومي",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "عرض المفتاح الخاص",
    "Seed:": "توزيع الجدول:",
    "Select Key": "اختر المفتاح",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "إظهار الخيارات المتقدمة",
    "Sign In": "تسجيل الدخول",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "غير معروف",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "مرحبا بكم في تشيا. الرجاء تسجيل الدخول باستخدام مفتاح موجود, أو إنشاء مفتاح جديد.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$B = {
  messages: {
    "Amount": "Сума",
    "Appearance": "Appearance",
    "Back": "Назад",
    "Can be backed up to mnemonic seed": "Рэзервовая копія можна быць зроблена ў мнеманічнае зерне",
    "Cancel": "Скасаваць",
    "Connected": "Падлучана",
    "Copied": "Скапіравана",
    "Copy to Clipboard": "Скапіраваць у буфер абмену",
    "Create a new private key": "Стварыць новы закрыты ключ",
    "DANGER: permanently delete private key": "НЕБЯСПЕЧНА: выдаліць закрыты ключ назаўсёды",
    "Dark": "Dark",
    "Delete": "Выдаліць",
    "Delete all keys": "Выдаліць усе ключы",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Выдаленне ўсіх ключоў незваротна выдаліць ключы з вашага камп'ютара — перад гэтым упэўніцеся, што маеце іх рэзервовыя копіі. Сапраўды працягнуць?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Выдаленне ключа незваротна выдаліць ключ з вашага камп'ютара — перад гэтым упэўніцеся, што маеце яго рэзервовую копію. Сапраўды працягнуць?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Памылка",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Ідзе фермерства",
    "Fee": "Камісійныя",
    "Frequently Asked Questions": "Частыя пытанні",
    "Help": "Даведка",
    "Help translate": "Дапамагчы з перакладам",
    "Hide Advanced Options": "Не паказваць дадатковыя параметры",
    "Import from Mnemonics (24 words)": "Імпарт з мнеманічнага фразы (24 словы)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Мнеманічнае зерне (24 ключавыя словы) адсутнічае, паколькі гэты ключ імпартаваны.",
    "Not connected": "Падлучэння няма",
    "OK": "ОК",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Закрыты ключ з адкрытым лічбавым адбіткам ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Закрыты ключ:",
    "Public key:": "Адкрыты ключ:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Паглядзець закрыты ключ",
    "Seed:": "Зерне:",
    "Select Key": "Выберыце ключ",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Паказаць дадатковыя параметры",
    "Sign In": "Увайсці ў сістэму",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Невядомы",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Вітаем у Chia. Увайдзіце ў сістэму з дапамогай існуючага ключа або стварыце новы.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$A = {
  messages: {
    "Amount": "Количество",
    "Appearance": "Appearance",
    "Back": "Назад",
    "Can be backed up to mnemonic seed": "Може да бъде създадена точка за възстановяване в мнемонично семе",
    "Cancel": "Отмяна",
    "Connected": "Свързан",
    "Copied": "Копирано",
    "Copy to Clipboard": "Копиране в клипборда",
    "Create a new private key": "Създай нов таен ключ",
    "DANGER: permanently delete private key": "ОПАСНОСТ: Необратимо изтриване на личен ключ",
    "Dark": "Dark",
    "Delete": "Изтриване",
    "Delete all keys": "Изтриване на всички ключове",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Изтриването на всички ключове необратимо ще премахме всички ключове от компютъра, подсигури се че имаш точка за възстановяване! Сигурен ли си че искаш да продължиш?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Изтриването на ключа необратимо ще премахне всички ключа от компютъра, подсигури се че имаш точка за възстановяване! Сигурен ли си че искаш да продължиш?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Грешка",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Фармене",
    "Fee": "Такса",
    "Frequently Asked Questions": "Често задавани въпроси",
    "Help": "Помощ",
    "Help translate": "Помогнете за превода",
    "Hide Advanced Options": "Скриване на разширените опции",
    "Import from Mnemonics (24 words)": "Внеси от мнемоники (24 думи)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Няма ключ от 24 думи, тъй като този частен ключ е бил импортиран.",
    "Not connected": "Не е свързан",
    "OK": "Ок",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Личен ключ със публичен отпечатък ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Частен ключ:",
    "Public key:": "Публичен ключ:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Виж частен ключ",
    "Seed:": "Семе:",
    "Select Key": "Избери ключ",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Показване на разширени опции",
    "Sign In": "Вход",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Неизвестно",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Добре дошли в Chia. Моля влезте със съществуващ ключ или създайте нов.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$z = {
  messages: {
    "Amount": "Quantitat",
    "Appearance": "Appearance",
    "Back": "Enrere",
    "Can be backed up to mnemonic seed": "Pots fer una còpia de seguretat a una llavor mnemónica",
    "Cancel": "Cancel·lar",
    "Connected": "Connectat",
    "Copied": "Copiat",
    "Copy to Clipboard": "Copiar al porta-retalls",
    "Create a new private key": "Crear una nova clau privada",
    "DANGER: permanently delete private key": "PERILL: elimina definitivament la clau privada",
    "Dark": "Dark",
    "Delete": "Eliminar",
    "Delete all keys": "Eliminar totes les claus",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Si esborres totes les claus, seran eliminades definitivament de l'ordinador. Assegura't que tens còpies de seguretat. Estàs segur que vols continuar?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Si esborres la clau, serà eliminada definitivament de l'ordinador. Assegura't que tens còpies de seguretat. Estas segur que vols continuar?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Error",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Cultivant",
    "Fee": "Taxa",
    "Frequently Asked Questions": "Preguntes Freqüents",
    "Help": "Ajuda",
    "Help translate": "Ajuda'ns a traduir",
    "Hide Advanced Options": "Ocultar les opcions avançades",
    "Import from Mnemonics (24 words)": "Importar des de mnemotècnics (24 mots)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "No hi ha llavor de 24 paraules, ja que aquesta clau ha estat importada.",
    "Not connected": "Desconnectat",
    "OK": "D'acord",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Clau privada amb l'empremta pública ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Clau privada:",
    "Public key:": "Clau pública:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Veure la clau privada",
    "Seed:": "Llavors:",
    "Select Key": "Escollir la clau",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Mostrar les opcions avançades",
    "Sign In": "Inicia la sessió",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Desconegut",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Benvingut a Chia. Inicia la sessió amb una clau existent o crea'n una de nova.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$y = {
  messages: {
    "Amount": "Částka",
    "Appearance": "Vzhled",
    "Back": "Zpět",
    "Can be backed up to mnemonic seed": "Lze zálohovat do sledu 24 slov",
    "Cancel": "Zrušit",
    "Connected": "Připojeno",
    "Copied": "Zkopírováno",
    "Copy to Clipboard": "Zkopírovat do schránky",
    "Create a new private key": "Vytvořit nový privátní klíč",
    "DANGER: permanently delete private key": "POZOR: trvale odstraní privátní klíč",
    "Dark": "Tmavý",
    "Delete": "Odstranit",
    "Delete all keys": "Smazat všechny klíče",
    "Delete key {fingerprint}": ["Smazat klíč ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Smazáním klíčů permanentně odeberete všechny klíče z počítače. Ujistěte se, že máte zálohu. Jste si jisti, že chcete pokračovat?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Smazáním klíče tento klíč nevratně odeberete z počítače. Ujistěte se, že máte zálohu. Jste si jisti, že chcete pokračovat?",
    "Disable": "Zakázat",
    "Disable Passphrase Protection": "Vypnutí ochrany heslem",
    "Discard": "Zahodit",
    "Error": "Chyba",
    "Error:": "Chyba:",
    "FAQ": "Často kladené dotazy",
    "Farmer public key:": "Farmářuv veřejný klíč:",
    "Farming": "Farmaření",
    "Fee": "Poplatek",
    "Frequently Asked Questions": "Často kladené otázky",
    "Help": "Nápověda",
    "Help translate": "Pomozte s překladem",
    "Hide Advanced Options": "Skrýt Rozšířené Možnosti",
    "Import from Mnemonics (24 words)": "Import pomocí 24 slov",
    "Incorrect value": "Nesprávná hodnota",
    "Language": "Jazyk",
    "Light": "Světlý",
    "Loading list of the keys": "Načítání seznamu klíčů",
    "Log Out": "Odhlásit",
    "Logout": "Odhlásit",
    "Migrate": "Migrovat",
    "Migration required": "Vyžadována migrace",
    "Mode": "Režim",
    "New passphrase is the same as your current passphrase": "Nové heslo je stejné jako vaše aktuální heslo",
    "No 24 word seed, since this key is imported.": "Žádný 24 slov, protože tento klíč je importován.",
    "Not connected": "Nepřipojeno",
    "OK": "OK",
    "Pool public key:": "Veřejný klíč poolu:",
    "Private key with public fingerprint {fingerprint}": ["Soukromý klíč s veřejným otiskem ", ["fingerprint"]],
    "Private key {fingerprint}": ["Soukromý klíč ", ["fingerprint"]],
    "Private key:": "Soukromý klíč:",
    "Public key:": "Veřejný klíč:",
    "Reload Application": "Znovu spustit aplikaci",
    "Report an Issue": "Nahlásit problém",
    "See private key": "Zobrazit soukromý klíč",
    "Seed:": "Slova pro zálohu:",
    "Select Key": "Vyberte klíč",
    "Select...": "Zvolit...",
    "Send Feedback": "Odeslat zpětnou vazbu",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Nastavení hesla je výrazně doporučeno pro ochranu vašich klíčů. Jste si jisti, že chcete přeskočit nastavení hesla?",
    "Settings": "Nastavení",
    "Show Advanced Options": "Zobrazit pokročilé možnosti",
    "Sign In": "Přihlásit se",
    "Skip": "Přeskočit",
    "Skip Passphrase Protection": "Přeskočit ochranu heslem",
    "Something went wrong": "Něco se pokazilo",
    "The provided passphrase and confirmation do not match": "Zadané heslo a potvrzení hesla se neshodují",
    "Transaction has not been sent to node yet": "Transakce zatím nebyla odeslána do uzlu",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transakce byla odeslána do úplného uzlu a čeká na zahrnutí do mempoolu. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transakce byla úspěšně odeslána do plného uzlu a zahrnuta do mempoolu.",
    "Try Again": "Zkusit znovu",
    "Unable to load the list of the keys": "Nelze načíst seznam klíčů",
    "Unknown": "Neznámé",
    "Unsaved Changes": "Neuložené změny",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Nastavení hesla je výrazně doporučeno pro ochranu vašich klíčů. Jste si jisti, že chcete vypnout ochranu heslem?",
    "Value seems high": "Hodnota se zdá vysoká",
    "Wallet": "Peněženka",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Varování: Tento klíč je používán pro peněženku, která může mít nenulový zůstatek. Smazáním tohoto klíče můžete ztratit přístup k této peněžence",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Varování: Tento klíč se používá pro vaši farmářskou adresu odměny. Odstraněním tohoto klíče můžete ztratit přístup k jakýmkoli budoucím odměnám z farmaření",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Varování: Tento klíč se používá pro vaši poolovou adresu odměny. Odstraněním tohoto klíče můžete ztratit přístup k jakýmkoli budoucím odměnám z poolu",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Vítejte v Chia. Přihlaste se pomocí existujícího klíče, nebo si vytvořte nový klíč.",
    "You have made changes. Do you want to discard them?": "Provedli jste změny. Chcete je zahodit?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Vaše klíče nebyly migrovány do nové klíčenky. Nebudete schopni vytvářet nové klíče nebo odstraňovat staré, dokud nedokončíte migraci. Přejete si migrovat klíče nyní?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Heslo musí mít minimálně ", "#", " znak"],
      other: ["Heslo musí být minimálně ", "#", " znaků dlouhé"]
    }]]
  }
};

/*eslint-disable*/
var messages$x = {
  messages: {
    "Amount": "Beløb",
    "Appearance": "Appearance",
    "Back": "Tilbage",
    "Can be backed up to mnemonic seed": "Kan sikkerhedskopieres af et mnemonisk seed",
    "Cancel": "Annuller",
    "Connected": "Forbundet",
    "Copied": "Kopieret",
    "Copy to Clipboard": "Kopier til Udklipsholder",
    "Create a new private key": "Generer en ny privat nøgle",
    "DANGER: permanently delete private key": "ADVARSEL: permanent sletning af privat nøgle",
    "Dark": "Dark",
    "Delete": "Slet",
    "Delete all keys": "Slet alle nøgler",
    "Delete key {fingerprint}": ["Slet nøgle ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Sletning af alle nøgler vil permanent fjerne nøglerne fra din computer, vær sikker på at du har backup. Er du sikker du vil fortsætte?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Sletning af nøglen vil permanent fjerne nøglen fra denne computer, vær sikker på at du har backup. Er du sikker på at du bil fortsætte?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Kassér",
    "Error": "Fejl",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer offentlig nøgle:",
    "Farming": "Farmer",
    "Fee": "Gebyr",
    "Frequently Asked Questions": "Ofte Stillet Spørgsmål",
    "Help": "Hjælp",
    "Help translate": "Hjælp med oversættelse",
    "Hide Advanced Options": "Gem Avanceret Indstillinger",
    "Import from Mnemonics (24 words)": "Importer fra mnemonik (24 ord)",
    "Incorrect value": "Forkert værdi",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Ingen 24 ord seed, da denne nøgle allerede er importeret.",
    "Not connected": "Ikke forbundet",
    "OK": "OK",
    "Pool public key:": "Pool offentlig nøgle:",
    "Private key with public fingerprint {fingerprint}": ["Privat nøgle med public fingeraftryk ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Privat nøgle:",
    "Public key:": "Offentlig nøgle:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Se privat nøgle",
    "Seed:": "Seed:",
    "Select Key": "Vælg Nøgle",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Vis Avanceret Indstillinger",
    "Sign In": "Log Ind",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Ukendt",
    "Unsaved Changes": "Ikke Gemte Ændringer",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Værdi virker høj",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Advarsel: Denne nøgle bruges til en tegnebog, der kan have en saldo der ikke er nul. Ved at slette denne nøgle kan du miste adgangen til denne tegnebog",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Advarsel: Denne nøgle bruges som farmer belønningsadresse. Ved at slette denne nøgle kan du miste adgang til fremtidige farmer belønninger",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Advarsel: Denne nøgle bruges som pulje belønningsadresse. Ved at slette denne nøgle kan du miste adgang til fremtidige pulje belønninger",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Velkommen til Chia. Venligst log ind med en eksisterende nøgle, eller generer en ny nøgle.",
    "You have made changes. Do you want to discard them?": "Du har foretaget ændringer. Vil du kassere dem?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$w = {
  messages: {
    "Amount": "Betrag",
    "Appearance": "Appearance",
    "Back": "Zurück",
    "Can be backed up to mnemonic seed": "Kann als Mnemonik-Seed gesichert werden",
    "Cancel": "Abbrechen",
    "Connected": "Verbunden",
    "Copied": "Kopiert",
    "Copy to Clipboard": "In die Zwischenablage kopieren",
    "Create a new private key": "Erstelle einen neuen privaten Schlüssel",
    "DANGER: permanently delete private key": "ACHTUNG: Privaten Schlüssel unwiederbringlich löschen",
    "Dark": "Dark",
    "Delete": "Löschen",
    "Delete all keys": "Lösche alle Schlüssel",
    "Delete key {fingerprint}": ["Key mit Fingerabdruck ", ["fingerprint"], " löschen"],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Alle Schlüssel löschen entfernt alle Schlüssel unwiederbringlich vom Computer. \nDas Erstellen einer Sicherungskopie wird empfohlen!\nBist du sicher, dass du mit dem Löschen fortfahren möchtest?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Diesen Schlüssel löschen entfernt diesen Schlüssel unwiederbringlich vom Computer. \nDas Erstellen einer Sicherungskopie wird empfohlen!\nBist du sicher, dass du mit dem Löschen fortfahren möchtest?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Verwerfen",
    "Error": "Fehler",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Öffentlicher Schlüssel des Farmers:",
    "Farming": "Farming",
    "Fee": "Gebühr",
    "Frequently Asked Questions": "Häufig gestellte Fragen",
    "Help": "Hilfe",
    "Help translate": "Hilf mit bei der Übersetzung",
    "Hide Advanced Options": "Erweiterte Optionen ausblenden",
    "Import from Mnemonics (24 words)": "Import aus Mnemonics (24 Wörter)",
    "Incorrect value": "Ungültiger Wert",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Kein 24 Wort Seed seit dieser Schlüssel importiert wurde.",
    "Not connected": "Nicht verbunden",
    "OK": "OK",
    "Pool public key:": "Öffentlicher Pool-Schlüssel:",
    "Private key with public fingerprint {fingerprint}": ["Privater Schlüssel mit öffentlichem Fingerabdruck ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Privater Schlüssel:",
    "Public key:": "Öffentlicher Schlüssel:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Privaten Schlüssel anzeigen",
    "Seed:": "Seed:",
    "Select Key": "Schlüssel auswählen",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Erweiterte Optionen anzeigen",
    "Sign In": "Anmelden",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Unbekannt",
    "Unsaved Changes": "Ungesicherte Änderungen",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Wert scheint hoch",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warnung: Dieser Key wird für eine Wallet benutzt die möglicherweise nicht leer ist. Beim Löschen des Keys könnte der Zugang zur Wallet verloren gehen",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warnung: Dieser Key wird für deine Farming-Belohnungen verwendet. Durch das Löschen dieses Keys kannst du den Zugriff auf zukünftige Farming-Belohnungen verlieren",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warnung: Dieser Key wird für deine Pool-Farming-Belohnungen verwendet. Durch das Löschen dieses Keys kannst du den Zugriff auf zukünftige Pool-Farming-Belohnungen verlieren",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Willkommen bei Chia. Melde dich mit einem bestehenden Schlüssel an oder erstelle einen neuen Schlüssel.",
    "You have made changes. Do you want to discard them?": "Es gibt Änderungen. Möchtest du diese verwerfen?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$v = {
  messages: {
    "Amount": "Ποσό",
    "Appearance": "Appearance",
    "Back": "Επιστροφή",
    "Can be backed up to mnemonic seed": "Μπορεί να δημιουργηθεί αντίγραφο ασφαλείας σε μνημονικό seed",
    "Cancel": "Ακύρωση",
    "Connected": "Συνδέθηκε",
    "Copied": "Αντιγράφηκε",
    "Copy to Clipboard": "Αντιγραφή στο Πρόχειρο",
    "Create a new private key": "Δημιουργία νέου ιδιωτικού κλειδιού",
    "DANGER: permanently delete private key": "ΚΙΝΔΥΝΟΣ: μόνιμη διαγραφή ιδιωτικού κλειδιού",
    "Dark": "Dark",
    "Delete": "Διαγραφή",
    "Delete all keys": "Διαγραφή όλων των κλειδιών",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Διαγράφοντας όλα τα κλειδιά θα αφαιρέσετε μόνιμα τα κλειδιά από τον υπολογιστή σας, βεβαιωθείτε ότι έχετε αντίγραφα ασφαλείας. Είστε σίγουροι ότι θέλετε να συνεχίσετε;",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Διαγραφή του κλειδιού θα αφαιρέσει μόνιμα το κλειδί από τον υπολογιστή σας, βεβαιωθείτε ότι έχετε αντίγραφο ασφαλείας. Είστε σίγουροι ότι θέλετε να συνεχίσετε;",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Σφάλμα",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Συγκομιδή",
    "Fee": "Προμήθεια",
    "Frequently Asked Questions": "Συχνές ερωτήσεις",
    "Help": "Βοήθεια",
    "Help translate": "Βοηθήστε στην Μετάφραση",
    "Hide Advanced Options": "Απόκρυψη Προχωρημένων επιλογών",
    "Import from Mnemonics (24 words)": "Εισαγωγή από Mnemonics (24 λέξεις)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Κανένα seed 24 λέξεων, καθώς αυτό το κλειδί έχει εισαχθεί.",
    "Not connected": "Χωρίς σύνδεση",
    "OK": "Εντάξει",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Ιδιωτικό κλειδί με δημόσιο αποτύπωμα ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Ιδιωτικό κλειδί:",
    "Public key:": "Δημόσιο κλειδί:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Προβολή ιδιωτικού κλειδιού",
    "Seed:": "Seed:",
    "Select Key": "Επιλογή Κλειδιού",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Δείξε επιλογές για προχωρημένους",
    "Sign In": "Είσοδος",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Άγνωστο",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Καλώς ήρθατε στη Chia. Παρακαλώ συνδεθείτε με ένα υπάρχον κλειδί ή δημιουργήστε ένα νέο κλειδί.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$u = {
  messages: {
    "Amount": "How much beer money",
    "Appearance": "Appearance",
    "Back": "Back 'er up",
    "Can be backed up to mnemonic seed": "Can be backed up to mnemonic seed",
    "Cancel": "Yeh Nah",
    "Connected": "Connected",
    "Copied": "Copied",
    "Copy to Clipboard": "Copy to Clipboard",
    "Create a new private key": "Create a new private key",
    "DANGER: permanently delete private key": "DANGER: this permanently deletes private key",
    "Dark": "Night time",
    "Delete": "Delete",
    "Delete all keys": "Delete all keys",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Error, she's knackered",
    "Error:": "Error, she's knackered:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Earning beer money",
    "Fee": "Fee",
    "Frequently Asked Questions": "Frequently Asked Questions because people can't read",
    "Help": "Help me Jebus",
    "Help translate": "Help translate",
    "Hide Advanced Options": "Hide this from your wife",
    "Import from Mnemonics (24 words)": "Import Wallet from from your 24 words you wrote down",
    "Incorrect value": "Incorrect value you drongo",
    "Language": "Language",
    "Light": "Daytime",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase you drongo",
    "No 24 word seed, since this key is imported.": "No 24 word seed, since this key is imported.",
    "Not connected": "Not connected",
    "OK": "You ripper",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Private key with public fingerprint ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Private key:",
    "Public key:": "Public key:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "See private key",
    "Seed:": "Seed:",
    "Select Key": "Select Key",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Hide this from your wife",
    "Sign In": "Sign In",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Woops, something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Unknown",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Welcome to Chia. Please log in with an existing key, or create a new key.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$t = {
  messages: {
    "Amount": "Amount",
    "Appearance": "Appearance",
    "Back": "Back",
    "Can be backed up to mnemonic seed": "Can be backed up to mnemonic seed",
    "Cancel": "Cancel",
    "Connected": "Connected",
    "Copied": "Copied",
    "Copy to Clipboard": "Copy to Clipboard",
    "Create a new private key": "Create a new private key",
    "DANGER: permanently delete private key": "DANGER: permanently delete private key",
    "Dark": "Dark",
    "Delete": "Delete",
    "Delete all keys": "Delete all keys",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Error",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Farming",
    "Fee": "Fee",
    "Frequently Asked Questions": "Frequently Asked Questions",
    "Help": "Help",
    "Help translate": "Help translate",
    "Hide Advanced Options": "Hide Advanced Options",
    "Import from Mnemonics (24 words)": "Import from Mnemonics (24 words)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "No 24 word seed, since this key is imported.",
    "Not connected": "Not connected",
    "OK": "OK",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Private key with public fingerprint ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Private key:",
    "Public key:": "Public key:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "See private key",
    "Seed:": "Seed:",
    "Select Key": "Select Key",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Show Advanced Options",
    "Sign In": "Sign In",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Unknown",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Welcome to Chia. Please log in with an existing key, or create a new key.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$s = {
  messages: {
    "Amount": "Amount",
    "Appearance": "Appearance",
    "Back": "Backwarrrds",
    "Can be backed up to mnemonic seed": "Can be scribbled down as mnemonic seed",
    "Cancel": "Abandon",
    "Connected": "Natter'd wit' me hearties jus' now",
    "Copied": "'tis in yer hand now",
    "Copy to Clipboard": "Take into yer hand (Clipboard)",
    "Create a new private key": "Make a new private treasure map",
    "DANGER: permanently delete private key": "Arrr: Burn all your treasure maps",
    "Dark": "Dark",
    "Delete": "Maroon",
    "Delete all keys": "Burn all treasure maps",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Burnin' all treasure maps will permanently scuttle the treasure maps from yer computer, make sure ye 'ave backups. Are ye sure ye wants t' go on?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Burnin' the treasure map will permanently scuttle the treasure map from yer computer, make sure ye 'ave backups. Are ye sure ye wants t' go on?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "It ain't right",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Under Full Sail",
    "Fee": "Fee",
    "Frequently Asked Questions": "Oftentimes Asked Questions",
    "Help": "Help",
    "Help translate": "Help translate",
    "Hide Advanced Options": "Hide Voodoo",
    "Import from Mnemonics (24 words)": "Get from Mnemonics (24 words)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "No 24 word seed 'cause this treasure map be imported.",
    "Not connected": "Arrgh, can see naught in this fog",
    "OK": "YARR",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Private treasure map wit' public fingerprint ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Private treasure map:",
    "Public key:": "Public treasure map:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Look at private treasure map",
    "Seed:": "Seed:",
    "Select Key": "Choose Treasure Map",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Reveal Voodoo",
    "Sign In": "Enter",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Unknown",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Ahoy t' Chia. Come in wit' an existin' treasure map, or make a new treasure map.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$r = {
  messages: {
    "Amount": "Amount",
    "Appearance": "Appearance",
    "Back": "Back",
    "Can be backed up to mnemonic seed": "Can be backed up to mnemonic seed",
    "Cancel": "Cancel",
    "Connected": "Connected",
    "Copied": "Copied",
    "Copy to Clipboard": "Copy to Clipboard",
    "Create a new private key": "Create a new private key",
    "DANGER: permanently delete private key": "DANGER: permanently delete private key",
    "Dark": "Dark",
    "Delete": "Delete",
    "Delete all keys": "Delete all keys",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Error",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Farming",
    "Fee": "Fee",
    "Frequently Asked Questions": "Frequently Asked Questions",
    "Help": "Help",
    "Help translate": "Help translate",
    "Hide Advanced Options": "Hide Advanced Options",
    "Import from Mnemonics (24 words)": "Import from Mnemonics (24 words)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "No 24 word seed, since this key is imported.",
    "Not connected": "Not connected",
    "OK": "OK",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Private key with public fingerprint ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Private key:",
    "Public key:": "Public key:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "See private key",
    "Seed:": "Seed:",
    "Select Key": "Select Key",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Show Advanced Options",
    "Sign In": "Sign In",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Unknown",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Welcome to Chia. Please log in with an existing key, or create a new key.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$q = {
  messages: {
    "Amount": "Cantidad",
    "Appearance": "Apariencia",
    "Back": "Atrás",
    "Can be backed up to mnemonic seed": "Puede respaldarse en una semilla mnemotécnica",
    "Cancel": "Cancelar",
    "Connected": "Conectado",
    "Copied": "Copiado",
    "Copy to Clipboard": "Copiar al porta-papeles",
    "Create a new private key": "Crear una nueva llave privada",
    "DANGER: permanently delete private key": "ADVERTENCIA: eliminar llave privada permanentemente",
    "Dark": "Oscuro",
    "Delete": "Eliminar",
    "Delete all keys": "Borrar todas las llaves",
    "Delete key {fingerprint}": ["Eliminar llave ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Borrar todas las llaves eliminará permanentemente las llaves de su ordenador, asegúrese de tener una copia de seguridad. ¿Esta seguro de que quiere continuar?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Borrar la llave eliminará permanentemente la llave de su ordenador, asegurase de tener una copia de seguridad. ¿Está seguro de que quiere continuar?",
    "Disable": "Deshabilitar",
    "Disable Passphrase Protection": "Deshabilitar protección de frase de contraseña",
    "Discard": "Descartar",
    "Error": "Error",
    "Error:": "Error:",
    "FAQ": "Preguntas más frecuentes",
    "Farmer public key:": "Llave Pública de Granjero:",
    "Farming": "Cultivando",
    "Fee": "Tarifa",
    "Frequently Asked Questions": "Preguntas Frecuentes",
    "Help": "Ayuda",
    "Help translate": "Ayudar a traducir",
    "Hide Advanced Options": "Ocultar Opciones Avanzadas",
    "Import from Mnemonics (24 words)": "Importar desde Mnemotécnica (24 palabras)",
    "Incorrect value": "Valor incorrecto",
    "Language": "Idioma",
    "Light": "Claro",
    "Loading list of the keys": "Cargando lista de llaves",
    "Log Out": "Cerrar sesión",
    "Logout": "Cerrar sesión",
    "Migrate": "Emigrar",
    "Migration required": "Migración requerida",
    "Mode": "Modo",
    "New passphrase is the same as your current passphrase": "La nueva contraseña es la misma que su contraseña actual",
    "No 24 word seed, since this key is imported.": "No hay semilla de 24 palabras, ya que esta llave es importada.",
    "Not connected": "Desconectado",
    "OK": "OK",
    "Pool public key:": "Llave Pública de Fondo:",
    "Private key with public fingerprint {fingerprint}": ["Llave privada con huella digital pública ", ["fingerprint"]],
    "Private key {fingerprint}": ["Clave privada ", ["fingerprint"]],
    "Private key:": "Llave privada:",
    "Public key:": "Llave pública:",
    "Reload Application": "Recargar aplicación",
    "Report an Issue": "Reportar un problema",
    "See private key": "Ver llave privada",
    "Seed:": "Semilla:",
    "Select Key": "Seleccione Llave",
    "Select...": "Seleccione...",
    "Send Feedback": "Enviar comentarios",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Se recomienda encarecidamente establecer una contraseña para proteger sus claves. ¿Está seguro de que desea omitir la configuración de una contraseña?",
    "Settings": "Ajustes",
    "Show Advanced Options": "Mostrar Opciones Avanzadas",
    "Sign In": "Iniciar Sesión",
    "Skip": "Saltar",
    "Skip Passphrase Protection": "Omitir protección de contraseña",
    "Something went wrong": "Algo salió mal",
    "The provided passphrase and confirmation do not match": "La contraseña y la confirmación proporcionadas no coinciden",
    "Transaction has not been sent to node yet": "La transacción aún no se ha enviado al nodo",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["La transacción se ha enviado a un nodo completo y está pendiente de inclusión en el mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "La transacción se envió con éxito a un nodo completo y se incluyó en el mempool.",
    "Try Again": "Intentar otra vez",
    "Unable to load the list of the keys": "No se puede cargar la lista de las llaves",
    "Unknown": "Desconocido",
    "Unsaved Changes": "Cambios sin guardar",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Se recomienda encarecidamente utilizar una frase de contraseña para proteger sus claves. ¿Está seguro de que desea deshabilitar la protección con frase de contraseña?",
    "Value seems high": "El valor parece alto",
    "Wallet": "Cartera",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Advertencia: Esta clave se utiliza para una cartera que puede tener un saldo distinto de cero. Al eliminar esta clave puede perder el acceso a esta cartera",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Advertencia: Esta llave se utiliza para tu dirección de recompensas de recolección. Al eliminar esta clave puedes perder el acceso a futuras recompensas",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Advertencia: Esta llave se utiliza para la dirección de recompensas de fondo. Al eliminar esta clave puedes perder el acceso a futuras recompensas de fondo",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Bienvenidos a Chia. Por favor inicie sesión con una llave existente o cree una nueva.",
    "You have made changes. Do you want to discard them?": "Ha hecho cambios. ¿Desea descartarlos?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Sus claves no se han migrado a un nuevo conjunto de claves. No podrá crear claves nuevas ni eliminar claves existentes hasta que finalice la migración. ¿Le gustaría migrar sus claves ahora?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Las frases de contraseña deben tener al menos ", "#", " caracteres de longitud"],
      other: ["Las frases de contraseña deben tener al menos ", "#", " caracteres de longitud"]
    }]]
  }
};

/*eslint-disable*/
var messages$p = {
  messages: {
    "Amount": "Cantidad",
    "Appearance": "Appearance",
    "Back": "Atrás",
    "Can be backed up to mnemonic seed": "Se puede respaldar en una semilla mnemotécnica",
    "Cancel": "Cancelar",
    "Connected": "Conectado",
    "Copied": "Copiado",
    "Copy to Clipboard": "Copiar al Portapapeles",
    "Create a new private key": "Crear una nueva llave privada",
    "DANGER: permanently delete private key": "ADVERTENCIA: eliminar llave privada permanentemente",
    "Dark": "Dark",
    "Delete": "Eliminar",
    "Delete all keys": "Eliminar todas las llaves",
    "Delete key {fingerprint}": "Eliminar clave",
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Eliminar todas las llaves va a hacer que estas se eliminen para siempre. Revisa que tenes un backup de estas. ¿Estás seguro de continuar?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Eliminar la llave va a hacer que esta se elimine para siempre. Revisa que tenes un backup. ¿Estás seguro de continuar?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Descartar",
    "Error": "Error",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Cultivando",
    "Fee": "Comisión",
    "Frequently Asked Questions": "Preguntas Frecuentes",
    "Help": "Ayuda",
    "Help translate": "Ayudar a traducir",
    "Hide Advanced Options": "Ocultar Opciones Avanzadas",
    "Import from Mnemonics (24 words)": "Importar de Mnemonics (24 palabras)",
    "Incorrect value": "Valor incorrecto",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "No hay semilla de 24 palabras, ya que esta llave es importada.",
    "Not connected": "No conectado",
    "OK": "OK",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Clave privada con huella digital pública ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Llave privada:",
    "Public key:": "Llave pública:",
    "Reload Application": "Recargar Aplicación",
    "Report an Issue": "Reportar un Problema",
    "See private key": "Ver llave privada",
    "Seed:": "Semilla:",
    "Select Key": "Seleccione Llave",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Mostrar Opciones Avanzadas",
    "Sign In": "Iniciar sesión",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Algo salió mal",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Desconocido",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Advertencia: esta clave se utilizó para una billetera que puede tener un saldo distinto de cero. Al eliminar esta clave, es posible que pierda el acceso a esta billetera",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Advertencia: esta clave se utiliza para su dirección de recompensas de recolección. Al eliminar esta clave, es posible que pierda el acceso a futuras recompensas de recolección",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Advertencia: esta clave se utiliza para la dirección de recompensas de la piscina. Al eliminar esta clave, puede perder el acceso a futuras recompensas de la piscina",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Bienvenidos a Chia. Por favor inicie sesión con una llave existente o cree una nueva.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$o = {
  messages: {
    "Amount": "Cantidad",
    "Appearance": "Appearance",
    "Back": "Volver",
    "Can be backed up to mnemonic seed": "Puede respaldarse en una semilla mnemotécnica",
    "Cancel": "Cancelar",
    "Connected": "Conectado",
    "Copied": "Copiado",
    "Copy to Clipboard": "Copiar al porta-papeles",
    "Create a new private key": "Crear una nueva llave privada",
    "DANGER: permanently delete private key": "ADVERTENCIA: eliminar llave privada permanentemente",
    "Dark": "Dark",
    "Delete": "Eliminar",
    "Delete all keys": "Borrar todas las llaves",
    "Delete key {fingerprint}": ["Borrar clave ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Borrar todas las llaves eliminará permanentemente las llaves de su ordenador, asegúrese de tener una copia de seguridad. ¿Esta seguro de que quiere continuar?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Borrar la llave eliminará permanentemente la llave de su ordenador, asegurase de tener una copia de seguridad. ¿Está seguro de que quiere continuar?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Descartar",
    "Error": "Error",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Llave pública de Agricultor:",
    "Farming": "Cultivando",
    "Fee": "Tarifa",
    "Frequently Asked Questions": "Preguntas Frecuentes",
    "Help": "Ayuda",
    "Help translate": "Ayuda a traducir",
    "Hide Advanced Options": "Ocultar Opciones Avanzadas",
    "Import from Mnemonics (24 words)": "Importar de Mnemotécnia (24 palabras)",
    "Incorrect value": "Valor Incorrecto",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "No hay semilla de 24 palabras, desde que esta llave esta importada.",
    "Not connected": "Sin conexión",
    "OK": "OK",
    "Pool public key:": "Llave Pública de Conjunto:",
    "Private key with public fingerprint {fingerprint}": ["Llave privada con huella pública ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Llave privada:",
    "Public key:": "Llave pública:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Ver llave privada",
    "Seed:": "Semilla:",
    "Select Key": "Seleccione Llave",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Mostrar Opciones Avanzadas",
    "Sign In": "Iniciar Sesión",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Desconocido",
    "Unsaved Changes": "Cambios sin Guardar",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "El valor parece alto",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Advertencia: Esta clave se utiliza en una cartera que pueda tener un saldo distinto a cero. Al eliminar esta clave podría perder el acceso a esta cartera",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Advertencia: Esta clave se utiliza en tu dirección de recompensas. Al eliminar esta clave puedes perder el acceso a futuras recompensas",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Bienvenidos a Chia. Por favor inicie sesión con una llave existente o cree una nueva.",
    "You have made changes. Do you want to discard them?": "Ha hecho cambios, ¿quiere descartarlos?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$n = {
  messages: {
    "Amount": "مقدار",
    "Appearance": "Appearance",
    "Back": "بازگشت",
    "Can be backed up to mnemonic seed": "میتواند در دانه های کمک یادآوری، پشتیبان گیری شود",
    "Cancel": "انصراف",
    "Connected": "متصل شد",
    "Copied": "رونوشت شد",
    "Copy to Clipboard": "رونوشت در کلیپ بورد",
    "Create a new private key": "Create a new private key",
    "DANGER: permanently delete private key": "DANGER: permanently delete private key",
    "Dark": "Dark",
    "Delete": "حذف",
    "Delete all keys": "Delete all keys",
    "Delete key {fingerprint}": ["حذف کلید ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "حذف همه کلیدها، آنها را برای همیشه از روی کامپیوتر شما حذف میکند، مطمئن شوید که نسخه پشتیبان دارید.\n آیا مطمئنید که می‌خواهید ادامه دهید؟",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "حذف کلید، آن را برای همیشه از روی کامپیوتر شما حذف می‌کند، مطمئن شوید که نسخه پشتیبان دارید. آیا مطمئنید که می‌خواهید ادامه دهید؟",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "لغو",
    "Error": "Error",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "مزرعه داری",
    "Fee": "Fee",
    "Frequently Asked Questions": "سوالات متداول",
    "Help": "Help",
    "Help translate": "Help translate",
    "Hide Advanced Options": "Hide Advanced Options",
    "Import from Mnemonics (24 words)": "Import from Mnemonics (24 words)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "هیچ بذر ۲۴ کلمه‌ای نیست، از هنگامی که این کلید را وارد کرده اید.",
    "Not connected": "Not connected",
    "OK": "تأیید",
    "Pool public key:": "کلید عمومی استخر:",
    "Private key with public fingerprint {fingerprint}": ["کلید خصوصی به همراه اثر انگشت عمومی ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Private key:",
    "Public key:": "Public key:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "See private key",
    "Seed:": "بذر:",
    "Select Key": "Select Key",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Show Advanced Options",
    "Sign In": "Sign In",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Unknown",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "این کلید استفده شده برای کیف پول که ممکنه پول داخلش باشه که اگر حذف کنی دیگر به آن دسترسی نخواهی داشت",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "این کلید در farming استفاده شده اگر این کلید را حذف کنید دیگر دسترسی به ویژگی های farming ندارید",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "این کلید در استخر استفاده شده. اگر این کلید را حذف کنید دیگر دسترسی به ویژگی های استخرتان ندارید.",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "به چیـا خوش آمدید. لطفا با کلیدی که از قبل دارید وارد شوید، یا کلیدی جدید بسازید.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$m = {
  messages: {
    "Amount": "Määrä",
    "Appearance": "Ulkoasu",
    "Back": "Palaa",
    "Can be backed up to mnemonic seed": "Varmuuskopioitavissa muistisanoiksi",
    "Cancel": "Peru",
    "Connected": "Yhdistetty",
    "Copied": "Kopioitu",
    "Copy to Clipboard": "Kopioi Leikepöydälle",
    "Create a new private key": "Luo yksityinen avain",
    "DANGER: permanently delete private key": "VAROITUS: tuhoaa yksityisen avaimen",
    "Dark": "Tumma",
    "Delete": "Poista",
    "Delete all keys": "Poista kaikki avaimet",
    "Delete key {fingerprint}": ["Poista avain ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Avainten poisto poistaa ne tietokoneeltasi. Varmista että sinulla on varmuuskopio. Haluatko jatkaa?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Avaimen poisto poistaa sen tietokoneeltasi. Varmista että sinulla on varmuuskopio. Haluatko jatkaa?",
    "Disable": "Poista Käytöstä",
    "Disable Passphrase Protection": "Poista Salasanasuojaus Käytöstä",
    "Discard": "Hylkää",
    "Error": "Virhe",
    "Error:": "Virhe:",
    "FAQ": "USEIN KYSYTTYÄ",
    "Farmer public key:": "Farmarin julkinen avain:",
    "Farming": "Farmaroidaan",
    "Fee": "Maksu",
    "Frequently Asked Questions": "Usein Kysytyt Kysymykset",
    "Help": "Apuja",
    "Help translate": "Auta kääntämisessä",
    "Hide Advanced Options": "Piilota Lisävalinnat",
    "Import from Mnemonics (24 words)": "Tuo Muistisanoista (24)",
    "Incorrect value": "Virheellinen arvo",
    "Language": "Kieli",
    "Light": "Vaalea",
    "Loading list of the keys": "Ladataan avaimien luetteloa",
    "Log Out": "Kirjaudu ulos",
    "Logout": "Kirjaudu Ulos",
    "Migrate": "Siirrä",
    "Migration required": "Siirto vaaditaan",
    "Mode": "Tila",
    "New passphrase is the same as your current passphrase": "Uusi salasana on sama kuin nykyinen salasana",
    "No 24 word seed, since this key is imported.": "Tuotu avain, ei 24 muistisanaa.",
    "Not connected": "Ei yhteyttä",
    "OK": "OK",
    "Pool public key:": "Poolin julkinen avain:",
    "Private key with public fingerprint {fingerprint}": ["Yksityinen avain julkisella sormenjäljellä ", ["fingerprint"]],
    "Private key {fingerprint}": ["Yksityinen avain ", ["fingerprint"]],
    "Private key:": "Yksityinen avain:",
    "Public key:": "Julkinen avain:",
    "Reload Application": "Uudelleenkäynnistä Sovellus",
    "Report an Issue": "Raportoi Ongelma",
    "See private key": "Katso yksityinen avain",
    "Seed:": "Siemenarvo:",
    "Select Key": "Valitse Avain",
    "Select...": "Valitse...",
    "Send Feedback": "Lähetä palautetta",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Salasanan asettaminen on erittäin suositeltavaa avaimien suojaamiseksi. Oletko varma, että haluat ohittaa salasanan asettamisen?",
    "Settings": "Asetukset",
    "Show Advanced Options": "Näytä Lisävalinnat",
    "Sign In": "Kirjaudu",
    "Skip": "Ohita",
    "Skip Passphrase Protection": "Ohita Salasanalauseiden Suojaus",
    "Something went wrong": "Jokin meni pieleen",
    "The provided passphrase and confirmation do not match": "Annettu salasana ja vahvistus eivät täsmää",
    "Transaction has not been sent to node yet": "Transaktioita ei ole vielä lähetetty noodiin",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Tapahtuma on lähetetty noodille ja odottaa sisällyttämistä mempooliin. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Tapahtuma on onnistuneesti lähetetty noodille ja sisällytetty mempooliin.",
    "Try Again": "Yritä uudelleen",
    "Unable to load the list of the keys": "Avainten luetteloa ei voitu ladata",
    "Unknown": "Tuntematon",
    "Unsaved Changes": "Tallentamattomia muutoksia",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Salasanan asettaminen on erittäin suositeltavaa avaimien suojaamiseksi. Oletko varma, että haluat ohittaa salasanan asettamisen?",
    "Value seems high": "Arvo vaikuttaa suurelta",
    "Wallet": "Lompakko",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Varoitus: Tätä avainta käytetään lompakossa, jolla voi olla saldoa. Poistamalla tämän avaimen voit menettää pääsyn tähän lompakkoon",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Varoitus: tätä avainta käytetään farmarin palkinto-osoitteeseen. Poistamalla tämän avaimen voit menettää pääsyn tuleviin farmaripalkkioihin",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Varoitus: tätä avainta käytetään poolin palkinto-osoitteeseen. Poistamalla tämän avaimen voit menettää pääsyn tuleviin poolipalkkioihin",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Tervetuloa Chiaan. Kirjaudu sisään avaimella tai luo uusi avain.",
    "You have made changes. Do you want to discard them?": "Olet tehnyt muutoksia. Haluatko hylätä ne?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Avaimiasi ei ole siirretty uuteen avainrenkaaseen. Et voi luoda uusia avaimia tai poistaa olemassa olevia avaimia ennen kuin siirto on tehty. Haluatko siirtää avaimesi nyt?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojoa"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Salasanojen on oltava vähintään ", "#", " merkki pituudeltaan"],
      other: ["Salasanojen on oltava vähintään ", "#", " merkkiä pituudeltaan"]
    }]]
  }
};

/*eslint-disable*/
var messages$l = {
  messages: {
    "Amount": "Montant",
    "Appearance": "Apparence",
    "Back": "Retour",
    "Can be backed up to mnemonic seed": "Peut être sauvegardé en seed mnémonique",
    "Cancel": "Annuler",
    "Connected": "Connecté",
    "Copied": "Copié",
    "Copy to Clipboard": "Copier dans le presse-papier",
    "Create a new private key": "Créer une nouvelle clé privée",
    "DANGER: permanently delete private key": "DANGER : Suppression permanente de la clé privée",
    "Dark": "Sombre",
    "Delete": "Supprimer",
    "Delete all keys": "Supprimer toutes les clés",
    "Delete key {fingerprint}": ["Supprimer la clé ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Supprimer toutes les clés va définitivement les enlever de votre ordinateur, assurez-vous d'avoir une sauvegarde. Êtes-vous sûr de vouloir continuer ?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Supprimer la clé va définitivement l'enlever de votre ordinateur, assurez-vous d'avoir une sauvegarde. Êtes-vous sûr de vouloir continuer ?",
    "Disable": "Désactiver",
    "Disable Passphrase Protection": "Désactiver la protection par phrase secrète",
    "Discard": "Rejeter",
    "Error": "Erreur",
    "Error:": "Erreur :",
    "FAQ": "FAQ",
    "Farmer public key:": "Clé publique du fermier :",
    "Farming": "Culture",
    "Fee": "Frais",
    "Frequently Asked Questions": "Question fréquentes",
    "Help": "Aide",
    "Help translate": "Aider à traduire",
    "Hide Advanced Options": "Masquer les options avancées",
    "Import from Mnemonics (24 words)": "Importer depuis une phrase mnémonique (24 mots)",
    "Incorrect value": "Valeur incorrecte",
    "Language": "Langue",
    "Light": "Clair",
    "Loading list of the keys": "Chargement de la liste des clés",
    "Log Out": "Se déconnecter",
    "Logout": "Déconnexion",
    "Migrate": "Migrer",
    "Migration required": "Migration nécessaire",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "La nouvelle phrase secrète est identique à votre phrase secrète actuelle",
    "No 24 word seed, since this key is imported.": "Pas de phrase mnémonique (24 mots), car cette clé est importée.",
    "Not connected": "Non connecté",
    "OK": "D'accord",
    "Pool public key:": "Clé publique du pool :",
    "Private key with public fingerprint {fingerprint}": ["Clé privée avec empreinte publique ", ["fingerprint"]],
    "Private key {fingerprint}": ["Clé privée ", ["fingerprint"]],
    "Private key:": "Clé privée :",
    "Public key:": "Clé publique :",
    "Reload Application": "Relancer l'application",
    "Report an Issue": "Signaler un problème",
    "See private key": "Voir la clé privée",
    "Seed:": "Graine :",
    "Select Key": "Selectionnez la Clé",
    "Select...": "Sélectionner...",
    "Send Feedback": "Envoyer un commentaire",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Définir une phrase secrète est fortement recommandé pour la protection de vos clés. Êtes-vous certain de vouloir ignorer la mise en place d'une phrase secrète ?",
    "Settings": "Paramètres",
    "Show Advanced Options": "Afficher les options avancées",
    "Sign In": "S'identifier",
    "Skip": "Ignorer",
    "Skip Passphrase Protection": "Ignorer la protection par phrase secrète",
    "Something went wrong": "Une erreur s'est produite",
    "The provided passphrase and confirmation do not match": "La phrase secrète fournie et la confirmation ne correspondent pas",
    "Transaction has not been sent to node yet": "Transaction pas encore transmise au nœud",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction transmise au nœud, en attente d'inclusion en mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction transmise au nœud et incluse en mempool.",
    "Try Again": "Réessayer",
    "Unable to load the list of the keys": "Impossible de charger la liste des clés",
    "Unknown": "Inconnu",
    "Unsaved Changes": "Changements non enregistrés",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Utiliser une phrase secrète est fortement recommandé pour la protection de vos clés. Êtes-vous certain de vouloir désactiver la protection par phrase secrète ?",
    "Value seems high": "La valeur semble élevée",
    "Wallet": "Portefeuille",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Attention : Cette clé est utilisée pour un portefeuille qui pourrait avoir un solde non nul. En supprimant cette clé, vous risquez de perdre accès à ce portefeuille",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Attention : Cette clé est utilisée pour votre adresse de récompenses de culture. En supprimant cette clé, vous risquez de perdre accès à toute future récompense de culture",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Attention : Cette clé est utilisée pour votre adresse de récompenses de pool. En supprimant cette clé, vous risquez de perdre accès à toute future récompense de pool",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Bienvenue sur Chia. Veuillez vous connecter avec une clé existante, ou créer une nouvelle clé.",
    "You have made changes. Do you want to discard them?": "Vous avez apporté des modifications. Voulez-vous les ignorer ?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Vos clés n'ont pas été migrées vers un nouveau trousseau de clés. Vous ne pourrez pas créer de nouvelles clés ou supprimer les clés existantes tant que la migration n'est pas terminée. Voulez-vous migrer vos clés maintenant ?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Les phrases secrètes doivent comporter au moins ", "#", " caractères"],
      other: ["Les phrases secrètes doivent comporter au moins ", "#", " caractères"]
    }]]
  }
};

/*eslint-disable*/
var messages$k = {
  messages: {
    "Amount": "Iznos",
    "Appearance": "Appearance",
    "Back": "Natrag",
    "Can be backed up to mnemonic seed": "Može biti sigurnosno kopirano na \"mnemonic seed\"",
    "Cancel": "Otkaži",
    "Connected": "Povezano",
    "Copied": "Kopirano",
    "Copy to Clipboard": "Kopiraj u Međuspremnik",
    "Create a new private key": "Kreiraj novi privatni ključ",
    "DANGER: permanently delete private key": "OPREZ: Trajno brisanje privatnog ključa",
    "Dark": "Dark",
    "Delete": "Ukloni",
    "Delete all keys": "Ukloni sve ključeve",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Brisanjem svih ključeva, ključevi spremljeni na računalu biti će trajno uklonjeni. Provjeri da imaš sigurnosnu kopiju. Sigurno želiš nastaviti?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Brisanjem ključa, ključ spremljen na računalu biti će trajno uklonjeni. Provjeri da imaš sigurnosnu kopiju. Sigurno želiš nastaviti?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Greška",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Uzgajam",
    "Fee": "Naknada",
    "Frequently Asked Questions": "Često Postavljana Pitanja",
    "Help": "Pomoć",
    "Help translate": "Pomozite prevesti",
    "Hide Advanced Options": "Sakrij napredne opcije",
    "Import from Mnemonics (24 words)": "Uvezi sa Mnemonics (24 riječi)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Nema sjemena od 24 riječi, pošto je ovaj ključ uvezen.",
    "Not connected": "Nije povezano",
    "OK": "U redu",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Privatni ključ sa javnim otiskom ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Privatni ključ:",
    "Public key:": "Javni ključ:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Pogledaj privatni ključ",
    "Seed:": "Sjeme:",
    "Select Key": "Odaberi ključ",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Prikaži napredne opcije",
    "Sign In": "Prijavi se",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Nepoznat",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Dobrodošao u Chia. Prijavi se sa postojećim ključem, ili kreiraj novi.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$j = {
  messages: {
    "Amount": "Összeg",
    "Appearance": "Megjelenés",
    "Back": "Vissza",
    "Can be backed up to mnemonic seed": "Biztonsági mentés elérhető a mnemonic maggal",
    "Cancel": "Mégsem",
    "Connected": "Csatlakozva",
    "Copied": "Másolva",
    "Copy to Clipboard": "Másolás a vágólapra",
    "Create a new private key": "Új privát kulcs készítése",
    "DANGER: permanently delete private key": "VIGYÁZAT: Privát kulcs végleges törlése",
    "Dark": "Sötét",
    "Delete": "Törlés",
    "Delete all keys": "Minden kulcs törlése",
    "Delete key {fingerprint}": ["Kulcs törlése ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Az összes kulcs törlése véglegesen eltávolítja a kulcsokat a számítógépedről, ezért gondoskodj biztonsági mentésekről. Biztos, hogy folytatni szeretnéd?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "A kulcs törlése véglegesen eltávolítja a kulcsot a számítógépedről, ezért gondoskodj biztonsági mentésről. Biztos, hogy folytatni szeretnéd?",
    "Disable": "Letiltás",
    "Disable Passphrase Protection": "Jelszavas védelem kikapcsolása",
    "Discard": "Elvetés",
    "Error": "Hiba",
    "Error:": "Hiba:",
    "FAQ": "GYÍK",
    "Farmer public key:": "Farmer nyilvános kulcsa:",
    "Farming": "Farmolás",
    "Fee": "Díj",
    "Frequently Asked Questions": "Gyakran Ismételt Kérdések",
    "Help": "Súgó",
    "Help translate": "Segíts a fordításban",
    "Hide Advanced Options": "Speciális beállítások elrejtése",
    "Import from Mnemonics (24 words)": "Importálás a memonikából (24 szó)",
    "Incorrect value": "Érvénytelen érték",
    "Language": "Nyelv",
    "Light": "Világos",
    "Loading list of the keys": "A kulcsok listájának betöltése",
    "Log Out": "Kijelentkezés",
    "Logout": "Kijelentkezés",
    "Migrate": "Áttelepítés",
    "Migration required": "Áttelepítés szükséges",
    "Mode": "Mód",
    "New passphrase is the same as your current passphrase": "Az új jelszó megegyezik a jelenlegi jelszóval",
    "No 24 word seed, since this key is imported.": "Nincs 24 szó mag, mivel ezt a kulcsot importálják.",
    "Not connected": "Nincs csatlakozva",
    "OK": "Rendben",
    "Pool public key:": "Pool nyilvános kulcsa:",
    "Private key with public fingerprint {fingerprint}": ["Privát kulcs nyilvános ujjlenyomattal ", ["fingerprint"]],
    "Private key {fingerprint}": ["Privát kulcs ", ["fingerprint"]],
    "Private key:": "Privát kulcs:",
    "Public key:": "Nyilvános kulcsok",
    "Reload Application": "Alkalmazás újratöltése",
    "Report an Issue": "Hibabejelentés",
    "See private key": "Lásd a privát kulcsot",
    "Seed:": "Seed:",
    "Select Key": "Válasszon kulcsot",
    "Select...": "Kiválasztás...",
    "Send Feedback": "Visszajelzés küldése",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Erősen javasolt a jelszó beállítása, hogy a kulcsok védve legyenek. Biztos, hogy nem akar jelszót beállítani?",
    "Settings": "Beállítások",
    "Show Advanced Options": "Speciális beállítások megjelenítése",
    "Sign In": "Bejelentkezés",
    "Skip": "Kihagyás",
    "Skip Passphrase Protection": "Jelszavas védelem kikapcsolása",
    "Something went wrong": "Valami rosszul sült el",
    "The provided passphrase and confirmation do not match": "Az új jelszó és a megerősítése nem egyeznek meg",
    "Transaction has not been sent to node yet": "A tranzakciót még nem küldték el a nodenak",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["A tranzakciót egy teljesnodera küldték el, és a mempoolba való felvételre vár. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "A tranzakciót sikeresen elküldték egy teljes nodera és felvették a mempoolba.",
    "Try Again": "Újrapróbálkozás",
    "Unable to load the list of the keys": "Nem lehet betölteni a kulcsok listáját",
    "Unknown": "Ismeretlen",
    "Unsaved Changes": "Nem mentett módosítások",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Erősen javasolt a jelszó beállítása, hogy a kulcsok védve legyenek. Biztos, hogy ki akarja kapcsolni a jelszavas védelmet?",
    "Value seems high": "Az érték túl magasnak tűnik",
    "Wallet": "Tárca",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Figyelem: Ezt a kulcsot egy olyan tárcához használják, amihez pozitív egyenleg tartozhat. Ennek a kulcsnak a törlésével elveszhet a hozzáférése a tárcához",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Figyelem: Ezt a kulcsot a farmolási jutalmak címére használják. Ha törlöd ezt a kulcsot, elveszítheted a hozzáférést a jövőbeni farming jutalmaidhoz",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Figyelem: Ezt a kulcsot a pool jutalmazási címéhez használják. Ha törli ezt a kulcsot, elveszítheti a hozzáférést a jövőbeni pool jutalmakhoz",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Üdvözöljük a Chia-ban. Kérem jelentkezzen be egy létező kulccsal, vagy készítsen egy új kulcsot magának.",
    "You have made changes. Do you want to discard them?": "Változtatásokat hajtott végre. El akarja vetni őket?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Kulcsai nem kerültek át egy új kulcstartóra. A migráció befejezéséig nem tud új kulcsokat létrehozni vagy meglévő kulcsokat törölni. Szeretné most áttelepíteni a kulcsait?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojok"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["A jelszavaknak legalább ", "#", " karakter hosszúságúnak kell lennie"],
      other: ["A jelszavaknak legalább ", "#", " karakter hosszúságúnak kell lennie"]
    }]]
  }
};

/*eslint-disable*/
var messages$i = {
  messages: {
    "Amount": "Jumlah",
    "Appearance": "Tampilan",
    "Back": "Kembali",
    "Can be backed up to mnemonic seed": "Dapat dibackup ke mnemonic seed",
    "Cancel": "Batal",
    "Connected": "Tersambung",
    "Copied": "Disalin",
    "Copy to Clipboard": "Salin ke Clipboard",
    "Create a new private key": "Buat sebuah private key baru",
    "DANGER: permanently delete private key": "BAHAYA: menghapus permanen private key",
    "Dark": "Gelap",
    "Delete": "Hapus",
    "Delete all keys": "Hapus semua key",
    "Delete key {fingerprint}": ["Hapus Kunci ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Menghapus semua kunci akan menghilangkan kunci-kunci tersebut dari komputer anda, pastikan anda telah memiliki cadangan. Apa anda yakin ingin melanjutkan?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Menghapus semua kunci akan menghilangkan kunci-kunci tersebut dari komputer anda, pastikan anda telah memiliki cadangan. Apa anda yakin ingin melanjutkan?",
    "Disable": "Nonaktifkan",
    "Disable Passphrase Protection": "Nonaktifkan proteksi sandi",
    "Discard": "Buang",
    "Error": "Error",
    "Error:": "Error:",
    "FAQ": "Pertanyaan Umum",
    "Farmer public key:": "Kunci Publik Farmer:",
    "Farming": "Farming",
    "Fee": "Biaya",
    "Frequently Asked Questions": "Pertanyaan Umum",
    "Help": "Bantuan",
    "Help translate": "Bantu menterjemahkan",
    "Hide Advanced Options": "Sembunyikan Opsi Tingkat Lanjut",
    "Import from Mnemonics (24 words)": "Impor dari Mnemonic (24 kata)",
    "Incorrect value": "Nilai Salah",
    "Language": "Bahasa",
    "Light": "Terang",
    "Loading list of the keys": "Memuat Daftar dompet",
    "Log Out": "Keluar",
    "Logout": "Keluar",
    "Migrate": "Migrasi",
    "Migration required": "Migrasi di wajibkan",
    "Mode": "Modus",
    "New passphrase is the same as your current passphrase": "Kalimat sandi baru sama dengan kalimat sandi yang sekarang",
    "No 24 word seed, since this key is imported.": "Tidak ada benih 24 kata, sejak kunci ini di impor.",
    "Not connected": "Tidak terhubung",
    "OK": "OK",
    "Pool public key:": "Kunci Publik Pool:",
    "Private key with public fingerprint {fingerprint}": ["Kunci privat dengan sidik jari publik ", ["fingerprint"]],
    "Private key {fingerprint}": ["Kunci privat ", ["fingerprint"]],
    "Private key:": "Kunci privat:",
    "Public key:": "Kunci publik:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Lihat kata kunci pribadi",
    "Seed:": "Benih:",
    "Select Key": "Pilih kunci",
    "Select...": "Pilih...",
    "Send Feedback": "Kirim Masukan",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Mengaktifkan opsi kata kunci sangat di ajurkan untuk melindungi kunci dompet anda. Apa anda yakin mau melewati pengaktifan kata kunci?",
    "Settings": "Pengaturan",
    "Show Advanced Options": "Lihat opsi lanjutan",
    "Sign In": "Log Masuk",
    "Skip": "Lewati",
    "Skip Passphrase Protection": "Lewati perlindungan kata kunci",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "Kata sandi yang dimasukan tidak sama dengan konfirmasi",
    "Transaction has not been sent to node yet": "Tansaksi belum dinkirim ke node",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaksi sudah di kirim ke full node dan sedang menunggu di tambahkan ke mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaksi sudah sukses di kirimkan ke node utama dan sudah tercatat di mempool.",
    "Try Again": "Coba Lagi",
    "Unable to load the list of the keys": "Tisak bisa menampilkan daftar kunci dompet",
    "Unknown": "Diketahui",
    "Unsaved Changes": "Perubahan yang belum disimpan",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Mengaktifkan opsi kalimat kunci sangat di ajurkan untuk melindungi kunci dompet anda. Apa anda yakin mau melewati pengaktifan kalimat kunci?",
    "Value seems high": "Nilai Kelihatan terlalu tinggi",
    "Wallet": "Dompet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Perhatian: Kunci ini di gunakan oleh dompet yang mungkin tidak kosong. Dengan menghapus kunci ini anda akan kehilangan akses ke dompet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Perhatian: Kunci ini digunakan sebagai alamat dari penghasilan farming. Dengan menghapus kunci ini anda akan kehilangan penhasilan farming di masa depan",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Perhatian: Kunci ini di gunakan untuk pengasilan pool. Dengan menghapus kunci ini anda akan kehilangan akses ke pengasilan pool di masa depan",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Selamat datang di Chia. Silahkan masuk dengan key eksisting atau dengan membuat key baru.",
    "You have made changes. Do you want to discard them?": "Ada perubahan yang belum disimpan. Apakah kamu ingin membuangnya?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Kunci anda belum migrasi ke penyimpanan kunci baru. Anda tidak akan bisa membuat kunci baru atau menghapus kunci yang ada sampai dengan migrasi selesai. Apa anda mau migrasi kunci anda sekarang?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Kata kunci harus paling sedikit ", "#", " karakter panjang nya"],
      other: ["Kata kunci harus paling sedikit ", "#", " karakter panjang nya"]
    }]]
  }
};

/*eslint-disable*/
var messages$h = {
  messages: {
    "Amount": "Totale",
    "Appearance": "Interfaccia",
    "Back": "Indietro",
    "Can be backed up to mnemonic seed": "Può essere eseguito il backup su seed mnemonico",
    "Cancel": "Annulla",
    "Connected": "Connesso",
    "Copied": "Copiato",
    "Copy to Clipboard": "Copia negli appunti",
    "Create a new private key": "Crea una nuova chiave privata",
    "DANGER: permanently delete private key": "ATTENZIONE: cancella permanentemente la chiave privata",
    "Dark": "Scuro",
    "Delete": "Elimina",
    "Delete all keys": "Elimina tutte le chiavi",
    "Delete key {fingerprint}": ["Elimina chiave ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Eliminando tutte le chiavi queste saranno rimosse definitivamente dal tuo computer, assicurati di avere un backup. Sei sicuro di voler continuare?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Eliminando la chiave questa sarà rimossa definitivamente dal tuo computer, assicurati di avere un backup. Sei sicuro di voler continuare?",
    "Disable": "Disabilita",
    "Disable Passphrase Protection": "Disabilita protezione con password",
    "Discard": "Annulla",
    "Error": "Errore",
    "Error:": "Errore:",
    "FAQ": "FAQ",
    "Farmer public key:": "Chiave pubblica del farmer:",
    "Farming": "Coltivando",
    "Fee": "Costo della commissione",
    "Frequently Asked Questions": "Domande Frequenti",
    "Help": "Aiuto",
    "Help translate": "Aiuta a tradurre",
    "Hide Advanced Options": "Nascondi Opzioni Avanzate",
    "Import from Mnemonics (24 words)": "Importa dalle Mnemonic (24 parole)",
    "Incorrect value": "Valore errato",
    "Language": "Lingua",
    "Light": "Chiaro",
    "Loading list of the keys": "Caricamento lista delle chiavi",
    "Log Out": "Disconnetti",
    "Logout": "Disconnettiti",
    "Migrate": "Migra",
    "Migration required": "Migrazione richiesta",
    "Mode": "Modalità",
    "New passphrase is the same as your current passphrase": "La nuova passphrase è la stessa della tua passphrase attuale",
    "No 24 word seed, since this key is imported.": "Nessun seed di 24 parole, dato che la chiave è importata.",
    "Not connected": "Non connesso",
    "OK": "OK",
    "Pool public key:": "Chiave Pubblica Pool:",
    "Private key with public fingerprint {fingerprint}": ["Chiave privata con impronta pubblica ", ["fingerprint"]],
    "Private key {fingerprint}": ["Chiave privata ", ["fingerprint"]],
    "Private key:": "Chiave privata:",
    "Public key:": "Chiave pubblica:",
    "Reload Application": "Ricarica Applicazione",
    "Report an Issue": "Riporta un problema",
    "See private key": "Vedi chiave privata",
    "Seed:": "Seed:",
    "Select Key": "Selezione Chiave",
    "Select...": "Seleziona...",
    "Send Feedback": "Invia Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Impostare una passphrase è fortemente raccomandato per proteggere le chiavi. Sei sicuro di voler saltare l'impostazione di una passphrase?",
    "Settings": "Impostazioni",
    "Show Advanced Options": "Mostra Opzioni Avanzate",
    "Sign In": "Registrati",
    "Skip": "Salta",
    "Skip Passphrase Protection": "Salta Protezione Passphrase",
    "Something went wrong": "Ops, qualcosa non ha funzionato",
    "The provided passphrase and confirmation do not match": "La passphrase e la conferma fornite non corrispondono",
    "Transaction has not been sent to node yet": "La transazione non è stata ancora inviata al nodo",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": "La transazione è stata inviata ad un nodo completo ed è in attesa di inclusione nella mempool",
    "Transaction has successfully been sent to a full node and included in the mempool.": "La transazione é stata inviata con successo ad un nodo completo ed inclusa nella mempol.",
    "Try Again": "Riprova",
    "Unable to load the list of the keys": "Impossibile caricare la lista delle chiavi",
    "Unknown": "Sconosciuto",
    "Unsaved Changes": "Modifiche non salvate",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Utilizzare una passphrase è fortemente raccomandato per proteggere le chiavi. Sei sicuro di voler disabilitare la protezione delle passphrase ?",
    "Value seems high": "Il valore sembra alto",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Attenzione: Questa chiave è usata per un wallet che può avere un saldo diverso da zero. Eliminando questa chiave potresti perdere l'accesso a questo wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Attenzione: Questa chiave è utilizzata per il tuo indirizzo delle ricompense per il farming. Eliminando questa chiave potresti perdere l'accesso a qualsiasi ricompensa futura per il farming",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Attenzione: Questa chiave è utilizzata per il tuo indirizzo delle ricompense per il farming. Eliminando questa chiave potresti perdere l'accesso a qualsiasi ricompensa futura per il farming",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Benvenuto da Chia. Per favore accedi con una chiave esistente, o crea una nuova chiave.",
    "You have made changes. Do you want to discard them?": "Sono state apportate modifiche non salvate. Vuoi scartarle?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Le chiavi non sono state migrate ad un nuovo keyring. Non sarà possibile creare nuove chiavi o eliminare le chiavi esistenti fino al completamento della migrazione. Vuoi migrare le tue chiavi ora?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$g = {
  messages: {
    "Amount": "金額",
    "Appearance": "外観の設定",
    "Back": "戻る",
    "Can be backed up to mnemonic seed": "合言葉でバックアップ作成可能",
    "Cancel": "キャンセル",
    "Connected": "接続済み",
    "Copied": "コピーしました",
    "Copy to Clipboard": "クリップボードにコピー",
    "Create a new private key": "秘密鍵を新規作成",
    "DANGER: permanently delete private key": "！危険！: 秘密鍵を永久的に削除",
    "Dark": "暗め",
    "Delete": "削除",
    "Delete all keys": "全ての鍵を削除",
    "Delete key {fingerprint}": ["鍵 ", ["fingerprint"], " を削除"],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "全ての鍵を削除するとどれも復元することができなくなりますので、必ずバックアップを取ってください。本当に続行しますか？",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "鍵を削除すると復元することができませんので、必ずバックアップを取ってください。本当に続行しますか？",
    "Disable": "無効にする",
    "Disable Passphrase Protection": "パスフレーズで保護しない",
    "Discard": "破棄する",
    "Error": "エラー",
    "Error:": "エラー:",
    "FAQ": "よくある質問",
    "Farmer public key:": "農家公開鍵:",
    "Farming": "耕作中",
    "Fee": "手数料",
    "Frequently Asked Questions": "よくある質問",
    "Help": "ヘルプ",
    "Help translate": "翻訳に協力",
    "Hide Advanced Options": "詳細設定を隠す",
    "Import from Mnemonics (24 words)": "合言葉 (24語) で鍵をインポート",
    "Incorrect value": "不正な値",
    "Language": "言語",
    "Light": "明るめ",
    "Loading list of the keys": "鍵一覧を読み込み中",
    "Log Out": "ログアウトする",
    "Logout": "ログアウトする",
    "Migrate": "移行する",
    "Migration required": "移行必須",
    "Mode": "モード",
    "New passphrase is the same as your current passphrase": "新しいパスフレーズが現在のパスフレーズと同じです",
    "No 24 word seed, since this key is imported.": "この鍵はインポートされているため、24語の種がありません。",
    "Not connected": "未接続",
    "OK": "OK",
    "Pool public key:": "プール公開鍵:",
    "Private key with public fingerprint {fingerprint}": ["公開指紋 ", ["fingerprint"], " に対応する秘密鍵"],
    "Private key {fingerprint}": ["秘密鍵 ", ["fingerprint"]],
    "Private key:": "秘密鍵:",
    "Public key:": "公開鍵:",
    "Reload Application": "アプリの再読み込み",
    "Report an Issue": "問題を報告する",
    "See private key": "秘密鍵を表示",
    "Seed:": "シード値:",
    "Select Key": "鍵を選択してください:",
    "Select...": "選択してください...",
    "Send Feedback": "フィードバックの送信",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "設定",
    "Show Advanced Options": "詳細設定を表示",
    "Sign In": "ログイン",
    "Skip": "スキップする",
    "Skip Passphrase Protection": "パスフレーズ保護をスキップする",
    "Something went wrong": "問題が発生しました",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "不明",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "ウォレット",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "注意: この鍵を使用するウォレットは残高がゼロでない可能性があります。この鍵を削除するとウォレットを失くすかもしれません。",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "注意: この鍵は耕作報酬アドレスに使われています。この鍵を削除すると、今後の耕作報酬を失くすかもしれません。",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "注意: この鍵はプール報酬アドレスに使われています。この鍵を削除すると、今後のプール報酬を失くすかもしれません。",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "チアにようこそ。お持ちの鍵でログインするか、新しく鍵を作成してください。",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$f = {
  messages: {
    "Amount": "총합계",
    "Appearance": "외관",
    "Back": "뒤로",
    "Can be backed up to mnemonic seed": "니모닉 시드에 백업할 수 있습니다",
    "Cancel": "취소",
    "Connected": "연결됨",
    "Copied": "복사됨",
    "Copy to Clipboard": "클립보드에 복사",
    "Create a new private key": "새로운 개인 키 만들기",
    "DANGER: permanently delete private key": "경고: 영구적으로 개인 키를 삭제합니다.",
    "Dark": "어두운 테마",
    "Delete": "삭제",
    "Delete all keys": "모든 키 삭제",
    "Delete key {fingerprint}": ["보호키 삭제 ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "모든 키를 컴퓨터에서 영구적으로 제거합니다. 만일을 대비하여 백업이 준비되었는지 확인하십시오. 계속하시겠습니까?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "이 키를 컴퓨터에서 영구적으로 삭제합니다. 만일을 대비하여 백업이 되어 있는지 확인하십시오. 계속하시겠습니까?",
    "Disable": "사용 안함",
    "Disable Passphrase Protection": "암호 보호 비활성화",
    "Discard": "디스코드",
    "Error": "오류",
    "Error:": "오류:",
    "FAQ": "자주하는 질문",
    "Farmer public key:": "농부 퍼블릭 키",
    "Farming": "재배 중",
    "Fee": "수수료",
    "Frequently Asked Questions": "자주 묻는 질문",
    "Help": "도움말",
    "Help translate": "번역 돕기",
    "Hide Advanced Options": "고급 옵션 숨기기",
    "Import from Mnemonics (24 words)": "니모닉에서 불러오기 (24단어)",
    "Incorrect value": "올바르지 않은 값",
    "Language": "언어설정",
    "Light": "밝은 테마",
    "Loading list of the keys": "키 목록 로드 중",
    "Log Out": "로그아웃",
    "Logout": "로그아웃",
    "Migrate": "마이그레이션",
    "Migration required": "마이그레이션 필요함",
    "Mode": "모드",
    "New passphrase is the same as your current passphrase": "새 암호가 현재 암호와 동일합니다.",
    "No 24 word seed, since this key is imported.": "24 단어의 씨드가 없습니다, 나중에 키를 가져 옵니다.",
    "Not connected": "연결되지 않음",
    "OK": "확인",
    "Pool public key:": "풀 퍼블릭 키",
    "Private key with public fingerprint {fingerprint}": ["퍼블릭 핑거프린트 ", ["fingerprint"], " 의 개인 키"],
    "Private key {fingerprint}": ["개인 키 ", ["fingerprint"]],
    "Private key:": "개인 키:",
    "Public key:": "퍼블릭 키:",
    "Reload Application": "애플리케이션 새로고침",
    "Report an Issue": "문제 보고",
    "See private key": "개인 키 보기",
    "Seed:": "시드:",
    "Select Key": "키 선택",
    "Select...": "선택...",
    "Send Feedback": "피드백 전송",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "키를 보호하려면 암호를 설정하는 것이 좋습니다. 암호 설정을 건너뛰시겠습니까?",
    "Settings": "설정",
    "Show Advanced Options": "고급 옵션 표시",
    "Sign In": "로그인",
    "Skip": "건너뛰기",
    "Skip Passphrase Protection": "암호 보호 건너뛰기",
    "Something went wrong": "문제가 발생함",
    "The provided passphrase and confirmation do not match": "제공한 암호와 확인이 일치하지 않습니다",
    "Transaction has not been sent to node yet": "거래가 아직 노드로 전송되지 않음",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["거래가 전체 노드로 전송되었으며 mempool에 포함되도록 보류 중입니다. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "거래가 전체 노드로 성공적으로 전송되었고 mempool에 포함되었습니다.",
    "Try Again": "다시 시도",
    "Unable to load the list of the keys": "키 목록을 로드할 수 없습니다.",
    "Unknown": "알 수 없음",
    "Unsaved Changes": "변경 내용이 저장되지 않음",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "키를 보호하려면 암호를 사용하는 것이 좋습니다. 암호 보호를 비활성화하시겠습니까?",
    "Value seems high": "값이 높음",
    "Wallet": "내 지갑",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "경고: 이 키는 잔액이 있을수도 있는 지갑에 사용됩니다. 이 키를 삭제하면 이 지갑에 액세스하지 못할 수 있습니다.",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "경고: 이 키는 파밍 보상 주소에 사용됩니다. 이 키를 삭제하면 향후 파밍 보상에 액세스하지 못할 수 있습니다.",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "경고: 이 키는 풀 보상 주소에 사용됩니다. 이 키를 삭제하면 향후 풀 보상에 접근하지 못할 수 있습니다.",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Chia에 오신 것을 환영합니다. 사용하고 계신 키로 로그인하시거나 새로운 키를 만드세요.",
    "You have made changes. Do you want to discard them?": "변경했습니다. 삭제하시겠습니까?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "키가 새 키링으로 마이그레이션되지 않았습니다. 마이그레이션이 완료될 때까지 새 키를 생성하거나 기존 키를 삭제할 수 없습니다. 지금 키를 마이그레이션하시겠습니까?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$e = {
  messages: {
    "Amount": "Hoeveelheid",
    "Appearance": "Appearance",
    "Back": "Terug",
    "Can be backed up to mnemonic seed": "Kan opgeslagen worden als mnemonic seed",
    "Cancel": "Annuleer",
    "Connected": "Verbonden",
    "Copied": "Gekopieerd",
    "Copy to Clipboard": "Kopieer naar klembord",
    "Create a new private key": "Maak een nieuwe privé sleutel",
    "DANGER: permanently delete private key": "GEVAAR: permanent verwijderen private sleutel",
    "Dark": "Dark",
    "Delete": "Verwijder",
    "Delete all keys": "Verwijder alle sleutels",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Alle sleutels zullen permanent verwijderd worden op deze computer, zorg dat je een reservekopie hebt. Ben je zeker dat je verder wil gaan?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "De sleutel zal permanent verwijderd worden op deze computer, zorg dat je een reservekopie hebt. Ben je zeker dat je verder wil gaan?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Fout",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Farming",
    "Fee": "Vergoeding",
    "Frequently Asked Questions": "Veel gestelde vragen",
    "Help": "Hulp",
    "Help translate": "Help vertalen",
    "Hide Advanced Options": "Verberg geavanceerde opties",
    "Import from Mnemonics (24 words)": "Importeer via Mnomonics (24 woorden)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Geen 24 woorden seed, omdat deze sleutel geïmporteerd is.",
    "Not connected": "Niet verbonden",
    "OK": "OK",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Private key with public fingerprint ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Private sleutel:",
    "Public key:": "Publieke sleutel:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Bekijk private sleutel",
    "Seed:": "Seed:",
    "Select Key": "Selecteer sleutel",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Toon geavanceerde opties",
    "Sign In": "Meld aan",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Onbekend",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Welcome to Chia. Please log in with an existing key, or create a new key.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$d = {
  messages: {
    "Amount": "Beløp",
    "Appearance": "Appearance",
    "Back": "Tilbake",
    "Can be backed up to mnemonic seed": "Kan sikkerhetskopieres til mnemonic frø",
    "Cancel": "Avbryt",
    "Connected": "Koble til",
    "Copied": "Kopiert",
    "Copy to Clipboard": "Kopier til utklippstavlen",
    "Create a new private key": "Opprett en ny privat nøkkel",
    "DANGER: permanently delete private key": "ADVARSEL: permanent slette privat nøkkel",
    "Dark": "Dark",
    "Delete": "Slett",
    "Delete all keys": "Slett alle nøkler",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Sletting av alle nøkler vil fjerne nøkler fra datamaskinen permanent, sørg for at du har sikkerhetskopier. Er du sikker på at du vil fortsette?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Sletting av nøkkel vil fjerne nøkkel fra datamaskinen permanent, sørg for at du har sikkerhetskopier. Er du sikker på at du vil fortsette?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Feil",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Jordbruk",
    "Fee": "Avgift",
    "Frequently Asked Questions": "Ofte Stilte Spørsmål",
    "Help": "Hjelp",
    "Help translate": "Hjelp med oversetting",
    "Hide Advanced Options": "Skjul Avanserte Alternativer",
    "Import from Mnemonics (24 words)": "Importer fra Mnemonics (24 ord)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "No 24 word seed, since this key is imported.",
    "Not connected": "Ikke tilkoblet",
    "OK": "Ok",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Private key with public fingerprint ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Private key:",
    "Public key:": "Public key:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "See private key",
    "Seed:": "Seed:",
    "Select Key": "Select Key",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Show Advanced Options",
    "Sign In": "Sign In",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Unknown",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Velkommen til Chia. Vennligst logg inn med en eksisterende nøkkel, eller opprett en ny nøkkel.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$c = {
  messages: {
    "Amount": "Ilość",
    "Appearance": "Wygląd",
    "Back": "Wstecz",
    "Can be backed up to mnemonic seed": "Można utworzyć kopię zapasową do ziarna mnemonicznego",
    "Cancel": "Anuluj",
    "Connected": "Połączono",
    "Copied": "Skopiowano",
    "Copy to Clipboard": "Skopiuj do schowka",
    "Create a new private key": "Utwórz nowy klucz prywatny",
    "DANGER: permanently delete private key": "NIEBEZPIECZEŃSTWO: klucz prywatny zostanie nieodwracalnie usunięty",
    "Dark": "Ciemny",
    "Delete": "Usuń",
    "Delete all keys": "Usuń wszystkie klucze",
    "Delete key {fingerprint}": ["Usuń klucz ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Usunięcie wszystkich kluczy nieodwracalnie usunie je z twojego komputera, zachowaj ich kopię zapasową. Czy chcesz kontynuować?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Usunięcie klucza nieodwracalnie usunie z twojego komputera plik klucza, bądź pewien że masz kopię zapasową. Czy chcesz kontynuować?",
    "Disable": "Wyłącz",
    "Disable Passphrase Protection": "Wyłącz ochronę hasłem",
    "Discard": "Odrzuć",
    "Error": "Błąd",
    "Error:": "Błąd:",
    "FAQ": "Najczęściej zadawane pytania (FAQ)",
    "Farmer public key:": "Klucz publiczny rolnika:",
    "Farming": "Uprawa",
    "Fee": "Opłata",
    "Frequently Asked Questions": "Często zadawane pytania",
    "Help": "Pomoc",
    "Help translate": "Pomóż przetłumaczyć",
    "Hide Advanced Options": "Ukryj Opcje Zaawansowane",
    "Import from Mnemonics (24 words)": "Importuj z ziarna mnemonicznego (24 słowa)",
    "Incorrect value": "Niepoprawna wartość",
    "Language": "Język",
    "Light": "Światło",
    "Loading list of the keys": "Lista wczytywania kluczy",
    "Log Out": "Wyloguj",
    "Logout": "Wylogowany",
    "Migrate": "Migruj",
    "Migration required": "Migracja wymagana",
    "Mode": "Tryb",
    "New passphrase is the same as your current passphrase": "Nowe hasło jest takie samo jak twoje obecne hasło",
    "No 24 word seed, since this key is imported.": "Brak ziarna (24 słowa), ponieważ ten klucz jest zaimportowany.",
    "Not connected": "Nie połączono",
    "OK": "W porządku",
    "Pool public key:": "Publiczny klucz puli:",
    "Private key with public fingerprint {fingerprint}": ["Klucz prywatny z publicznym odciskiem ", ["fingerprint"]],
    "Private key {fingerprint}": ["Klucz prywatny ", ["fingerprint"]],
    "Private key:": "Klucz prywatny:",
    "Public key:": "Klucz publiczny:",
    "Reload Application": "Przeładuj aplikacje",
    "Report an Issue": "Zgłoś problem",
    "See private key": "Zobacz klucz prywatny",
    "Seed:": "Ziarno:",
    "Select Key": "Wybierz Klucz",
    "Select...": "Wybierz...",
    "Send Feedback": "Wyślij opinię",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Ustawianie hasła jest zdecydowanie zalecane w celu ochrony kluczy. Czy na pewno chcesz pominąć ustawienie hasła?",
    "Settings": "Ustawienia",
    "Show Advanced Options": "Pokaż zaawansowane opcje",
    "Sign In": "Zaloguj się",
    "Skip": "Pomiń",
    "Skip Passphrase Protection": "Pomiń ochronę hasłem",
    "Something went wrong": "Coś poszło nie tak",
    "The provided passphrase and confirmation do not match": "Nowe hasło i potwierdzenie nie pasują do siebie",
    "Transaction has not been sent to node yet": "Transakcja nie została jeszcze przesłana do węzła",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Spróbuj ponownie",
    "Unable to load the list of the keys": "Nie można załadować listy kluczy",
    "Unknown": "Nieznany",
    "Unsaved Changes": "Niezapisane zmiany",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Portfel",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Witaj w Chia. Zaloguj się z instniejącym kluczem, lub utwórz nowy klucz.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$b = {
  messages: {
    "Amount": "Quantidade",
    "Appearance": "Aparência",
    "Back": "Voltar",
    "Can be backed up to mnemonic seed": "Pode ser feito backup para semente mnemônica",
    "Cancel": "Cancelar",
    "Connected": "Conectado",
    "Copied": "Copiado",
    "Copy to Clipboard": "Copiar para área de transferência",
    "Create a new private key": "Crie uma nova chave privada",
    "DANGER: permanently delete private key": "PERIGO: excluir permanentemente a chave privada",
    "Dark": "Escuro",
    "Delete": "Apagar",
    "Delete all keys": "Apagar todas as chaves",
    "Delete key {fingerprint}": ["Excluir chave ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "A exclusão de todas as chaves removerá permanentemente as chaves do computador, certifique-se de fazer backups. Você tem certeza que quer continuar?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "A exclusão da chave removerá permanentemente a chave do seu computador, certifique-se de ter backups. Você tem certeza que quer continuar?",
    "Disable": "Desativado",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Descartar",
    "Error": "Erro",
    "Error:": "Error:",
    "FAQ": "Perguntas frequentes (FAQ)",
    "Farmer public key:": "Chave Pública do Fazendeiro:",
    "Farming": "Cultivando",
    "Fee": "Taxa",
    "Frequently Asked Questions": "Perguntas Frequentes",
    "Help": "Ajuda",
    "Help translate": "Ajude a traduzir",
    "Hide Advanced Options": "Ocultar opções avançadas",
    "Import from Mnemonics (24 words)": "Importar do Mnemônico (24 palavras)",
    "Incorrect value": "Valor incorreto",
    "Language": "Idioma",
    "Light": "Claro",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Sair",
    "Logout": "Sair",
    "Migrate": "Migrar",
    "Migration required": "Migração necessária",
    "Mode": "Modo",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Sem semente de 24 palavras, uma vez que esta chave é importada.",
    "Not connected": "Não conectado",
    "OK": "Aceitar",
    "Pool public key:": "Chave pública do bolão:",
    "Private key with public fingerprint {fingerprint}": ["Chave privada com impressão digital pública ", ["fingerprint"]],
    "Private key {fingerprint}": ["Chave privada ", ["fingerprint"]],
    "Private key:": "Chave privada:",
    "Public key:": "Chave pública:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Ver chave privada",
    "Seed:": "Semente:",
    "Select Key": "Selecione a chave",
    "Select...": "Selecionar...",
    "Send Feedback": "Enviar Sugestão",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Configurações",
    "Show Advanced Options": "Mostrar opções avançadas",
    "Sign In": "Iniciar Sessão",
    "Skip": "Ignorar",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Tentar Novamente",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Desconhecido",
    "Unsaved Changes": "Alterações não salvas",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "O valor parece alto",
    "Wallet": "Carteira",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Aviso: Esta chave é usada para uma carteira que pode ter um saldo diferente de zero. Ao excluir esta chave, você pode perder o acesso a esta carteira",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Aviso: Esta chave é usada para o endereço das recompensas da sua coleta. Ao excluir esta chave, você pode perder acesso a qualquer futuro prêmio da coleta",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Aviso: Esta chave é usada para o endereço das recompensas da sua coleta. Ao excluir esta chave, você pode perder acesso a qualquer futuro prêmio da coleta",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Bem-vindo a Chia. Faça login com uma chave existente ou crie uma nova chave.",
    "You have made changes. Do you want to discard them?": "Você possui alterações não salvas. Deseja salvá-las?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$a = {
  messages: {
    "Amount": "Quantidade",
    "Appearance": "Aparência",
    "Back": "Voltar",
    "Can be backed up to mnemonic seed": "Pode ser feito backup para semente mnemônica",
    "Cancel": "Cancelar",
    "Connected": "Conectado",
    "Copied": "Copiado",
    "Copy to Clipboard": "Copiar para área de transferência",
    "Create a new private key": "Crie uma nova chave privada",
    "DANGER: permanently delete private key": "PERIGO: excluir permanentemente a chave privada",
    "Dark": "Noturno",
    "Delete": "Eliminar",
    "Delete all keys": "Apagar todas as chaves",
    "Delete key {fingerprint}": ["Apagar chave ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "A exclusão de todas as chaves removerá permanentemente as chaves do seu computador, certifique-se de ter backups. Você tem certeza que quer continuar?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "A exclusão de todas as chaves removerá permanentemente as chaves do seu computador, certifique-se de ter backups. Você tem certeza que quer continuar?",
    "Disable": "Desativar",
    "Disable Passphrase Protection": "Desativar a proteção por password",
    "Discard": "Descartar",
    "Error": "Erro",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Chave pública do Farmer:",
    "Farming": "Cultivando",
    "Fee": "Taxa",
    "Frequently Asked Questions": "Perguntas frequentes",
    "Help": "Ajuda",
    "Help translate": "Ajude a traduzir",
    "Hide Advanced Options": "Ocultar opções avançadas",
    "Import from Mnemonics (24 words)": "Importar do Mnemônico (24 palavras)",
    "Incorrect value": "Valor incorreto",
    "Language": "Idioma",
    "Light": "Claro",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Terminar Sessão",
    "Logout": "Encerrar Sessão",
    "Migrate": "Migrar",
    "Migration required": "Migração necessária",
    "Mode": "Modo",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Sem semente de 24 palavras, uma vez que esta chave é importada.",
    "Not connected": "Não conectado",
    "OK": "OK",
    "Pool public key:": "Chave Pública da Pool:",
    "Private key with public fingerprint {fingerprint}": ["Chave privada com impressão digital pública ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Chave privada:",
    "Public key:": "Chave pública:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Veja a chave privada",
    "Seed:": "Semente:",
    "Select Key": "Selecione a chave",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Mostrar opções avançadas",
    "Sign In": "Iniciar Sessão",
    "Skip": "Ignorar",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Desconhecido",
    "Unsaved Changes": "Alterações por gravar",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "O valor parece alto",
    "Wallet": "Carteira",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Aviso: Esta chave é usada para uma carteira que pode ter um saldo diferente de zero. Ao excluir esta chave, você pode perder acesso a esta carteira",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Aviso: Esta chave é usada para o endereço das recompensas da sua farm. Ao excluir esta chave, você pode perder acesso a quaisquer futuras recompensas da farm",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Aviso: Esta chave é usada para o endereço das recompensas da sua pool. Ao excluir esta chave, você pode perder acesso a quaisquer futuras recompensas da pool",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Bem-vindo à Chia. Faça login com uma chave existente ou crie uma nova chave.",
    "You have made changes. Do you want to discard them?": "Você fez alterações. Você deseja descartá-las?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$9 = {
  messages: {
    "Amount": "Sumă",
    "Appearance": "Appearance",
    "Back": "Înapoi",
    "Can be backed up to mnemonic seed": "Poate fi făcut backup la cuvinte mnemonice",
    "Cancel": "Anulare",
    "Connected": "Conectat",
    "Copied": "Copiat",
    "Copy to Clipboard": "Copiază in Clipboard",
    "Create a new private key": "Creează o noua cheie privată",
    "DANGER: permanently delete private key": "PERICOL: Șterge permanent cheia privată",
    "Dark": "Dark",
    "Delete": "Ștergere",
    "Delete all keys": "Sterge toate cheile",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Ștergerea tuturor cheilor va elimina definitiv cheile de pe computer, asigurați-vă că aveți copii de rezervă. Esti sigur ca vrei sa continui?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Ștergerea tuturor cheilor va elimina definitiv cheile de pe computer, asigurați-vă că aveți copii de rezervă. Esti sigur ca vrei sa continui?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Eroare",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Cultivare",
    "Fee": "Taxe",
    "Frequently Asked Questions": "Întrebări frecvente",
    "Help": "Ajutor",
    "Help translate": "Ajuta la traducere",
    "Hide Advanced Options": "Ascunde optiunile avansate",
    "Import from Mnemonics (24 words)": "Importă din Mnemonice (24 cuvinte)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Fără mnemonice de 24 de cuvinte, deoarece această cheie este importată.",
    "Not connected": "Neconectat",
    "OK": "OK",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Cheie privată având amprenta cheii publice ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Cheia privată:",
    "Public key:": "Cheie publică:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Vezi cheia privată",
    "Seed:": "Seed:",
    "Select Key": "Selectează cheia",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Arată Opțiunile Avansate",
    "Sign In": "Loghează-te",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Necunoscut",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Bine ati venit la Chia. Va rugam logati-va cu o cheie existenta, sau creati o noua cheie.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$8 = {
  messages: {
    "Amount": "Количество",
    "Appearance": "Внешний вид",
    "Back": "Назад",
    "Can be backed up to mnemonic seed": "может быть сохранен в качестве резервной копии при помощи мнемонического зерна",
    "Cancel": "Отмена",
    "Connected": "Подключен",
    "Copied": "Скопировано",
    "Copy to Clipboard": "Скопировать в буфер обмена",
    "Create a new private key": "Создать новый приватный ключ",
    "DANGER: permanently delete private key": "ОПАСНО: удалить закрытый ключ навсегда",
    "Dark": "Тёмный",
    "Delete": "Удалить",
    "Delete all keys": "Удалить все ключи",
    "Delete key {fingerprint}": ["Удалить ключ ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Удаление всех ключей приведет к безвозвратному удалению ключей с вашего компьютера, убедитесь, что у вас есть резервные копии. Вы уверены что хотите продолжить?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Удаление ключа приведет к безвозвратному удалению ключа с вашего компьютера, убедитесь, что у вас есть резервные копии. Вы уверены что хотите продолжить?",
    "Disable": "Отключить",
    "Disable Passphrase Protection": "Отключить защиту паролем",
    "Discard": "Oтказаться",
    "Error": "Ошибка",
    "Error:": "Ошибка:",
    "FAQ": "ЧаВо",
    "Farmer public key:": "Открытый ключ фермера:",
    "Farming": "Фарминг",
    "Fee": "Комиссия",
    "Frequently Asked Questions": "Часто задаваемые вопросы",
    "Help": "Помощь",
    "Help translate": "Помогите с переводом",
    "Hide Advanced Options": "Скрыть дополнительные опции",
    "Import from Mnemonics (24 words)": "Импорт мнемоники (24 слова)",
    "Incorrect value": "Некорректное значение",
    "Language": "Язык",
    "Light": "Светлый",
    "Loading list of the keys": "Загрузка списка ключей",
    "Log Out": "Выйти",
    "Logout": "Выйти",
    "Migrate": "Мигрировать",
    "Migration required": "Требуется миграция",
    "Mode": "Режим",
    "New passphrase is the same as your current passphrase": "Новый пароль совпадает с вашим текущим паролем",
    "No 24 word seed, since this key is imported.": "Нет 24 слов семя, так как этот ключ импортируется.",
    "Not connected": "Нет подключения",
    "OK": "ОК",
    "Pool public key:": "Публичный ключ пула:",
    "Private key with public fingerprint {fingerprint}": ["Приватный ключ с публичным отпечатком ", ["fingerprint"]],
    "Private key {fingerprint}": ["Закрытый ключ ", ["fingerprint"]],
    "Private key:": "Закрытый ключ:",
    "Public key:": "Открытый ключ:",
    "Reload Application": "Перезагрузить приложение",
    "Report an Issue": "Сообщить о проблеме",
    "See private key": "Посмотреть закрытый ключ",
    "Seed:": "Семя:",
    "Select Key": "Выбор ключа",
    "Select...": "Выбрать...",
    "Send Feedback": "Оставить отзыв",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Установка пароля для защиты ваших ключей настоятельно рекомендуется. Вы уверены, что хотите отключить защиту паролем?",
    "Settings": "Настройки",
    "Show Advanced Options": "Показать дополнительные опции",
    "Sign In": "Войти в систему",
    "Skip": "Пропустить",
    "Skip Passphrase Protection": "Пропустить защиту паролем",
    "Something went wrong": "Что-то пошло не так",
    "The provided passphrase and confirmation do not match": "Пароли не совпадают",
    "Transaction has not been sent to node yet": "Транзакция пока еще не была отправлена узлу",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Транзакция отправлена на полный узел и ожидает включения в мемпул. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Транзакция была успешно отправлена на полный узел и включена в мемпул.",
    "Try Again": "Попробовать снова",
    "Unable to load the list of the keys": "Не удается загрузить список ключей",
    "Unknown": "Неизвестный",
    "Unsaved Changes": "Несохранённые изменения",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Настоятельно рекомендуется использовать пароль для защиты ваших ключей. Вы уверены, что хотите отключить защиту паролем?",
    "Value seems high": "Значение вероятно завышено",
    "Wallet": "Кошелёк",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Предупреждение: Этот ключ используется для кошелька, который может иметь ненулевой баланс. Удаляя этот ключ, вы можете потерять доступ к этому кошельку",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Предупреждение: Этот ключ используется для вашего адреса фермерских вознаграждений. Удаляя этот ключ, вы можете потерять доступ к будущим фермерским вознаграждениям",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Предупреждение: Этот ключ используется для вашего адреса фермерских вознаграждений. Удаляя этот ключ, вы можете потерять доступ к будущим фермерским вознаграждениям",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Добро пожаловать в Чиа. Пожалуйста, войдите в систему с существующим ключом или создайте новый ключ.",
    "You have made changes. Do you want to discard them?": "У вас есть несохраненные изменения. Хотите сохранить их?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Ваши ключи не были перенесены в новую систему ключей. Вы не сможете создавать новые ключи или удалять существующие ключи до тех пор, пока не завершится миграция. Хотите перенести ваши ключи сейчас?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$7 = {
  messages: {
    "Amount": "Suma",
    "Appearance": "Vzhľad",
    "Back": "Späť",
    "Can be backed up to mnemonic seed": "Možnosť zálohovať pomocou mnemotechnickej pomôcky",
    "Cancel": "Zrušiť",
    "Connected": "Pripojené",
    "Copied": "Skopírované",
    "Copy to Clipboard": "Skopírovať do schránky",
    "Create a new private key": "Vytvoriť nový privátny kľúč",
    "DANGER: permanently delete private key": "POZOR: natrvalo odstrániť súkromný klúč",
    "Dark": "Tmavý",
    "Delete": "Zmazať",
    "Delete all keys": "Zmazať všetky kľúče",
    "Delete key {fingerprint}": ["Odstrániť kľúč ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Po stlačení tlačidla zmazať odstránite natrvalo všetký kľúče z počítača. Uistite sa, že máte zálohu. Ste si istý, že chcete pokračovať?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Odstránením kľúča natrvalo odstránite kľúč z počítača. Uistite sa, že máte zálohy. Ste si istý, že chcete pokračovať?",
    "Disable": "Deaktivovať",
    "Disable Passphrase Protection": "Deaktivovať ochranu prístupovou frázou",
    "Discard": "Odstrániť",
    "Error": "Chyba",
    "Error:": "Chyba:",
    "FAQ": "Často kladené otázky",
    "Farmer public key:": "Verejný kľúč farmára:",
    "Farming": "Ťažba",
    "Fee": "Poplatok",
    "Frequently Asked Questions": "Často kladené otázky (FAQ)",
    "Help": "Pomoc",
    "Help translate": "Pomôcť s prekladom",
    "Hide Advanced Options": "Skryť rozšírené možnosti",
    "Import from Mnemonics (24 words)": "Obnoviť z mnemotechniky (24 slov)",
    "Incorrect value": "Nesprávna hodnota",
    "Language": "Jazyk",
    "Light": "Svetlý",
    "Loading list of the keys": "Načítavanie zoznamu kľúčov",
    "Log Out": "Odhlásiť sa",
    "Logout": "Odhlásiť",
    "Migrate": "Migrovať",
    "Migration required": "Vyžaduje sa migrácia",
    "Mode": "Režim",
    "New passphrase is the same as your current passphrase": "Nová prístupová fráza je rovnaká ako vaša aktuálna prístupová fráza",
    "No 24 word seed, since this key is imported.": "Žiadny 24-slovný seed, pretože tento kľúč je importovaný.",
    "Not connected": "Nepripojené",
    "OK": "OK",
    "Pool public key:": "Verejný kľúč združenia:",
    "Private key with public fingerprint {fingerprint}": ["Privátny kľúč s verejným odtlačkom ", ["fingerprint"]],
    "Private key {fingerprint}": ["Súkromný kľúč ", ["fingerprint"]],
    "Private key:": "Privátny kľúč:",
    "Public key:": "Verejný kľúč:",
    "Reload Application": "Znova načítať aplikáciu",
    "Report an Issue": "Nahlásiť problém",
    "See private key": "Zobraziť privátny kľúč",
    "Seed:": "Zrnko:",
    "Select Key": "Vyberte kľúč",
    "Select...": "Vybrať...",
    "Send Feedback": "Odoslať spätnú väzbu",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Na ochranu vašich kľúčov sa dôrazne odporúča nastaviť prístupovú frázu. Naozaj chcete preskočiť nastavenie prístupovej frázy?",
    "Settings": "Nastavenia",
    "Show Advanced Options": "Zobraziť rozšírené možnosti",
    "Sign In": "Prihlásiť sa",
    "Skip": "Preskočiť",
    "Skip Passphrase Protection": "Preskočiť ochranu prístupovou frázou",
    "Something went wrong": "Niečo sa pokazilo",
    "The provided passphrase and confirmation do not match": "Poskytnutá prístupová fráza a potvrdenie sa nezhodujú",
    "Transaction has not been sent to node yet": "Transakcia ešte nebola odoslaná uzlu",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transakcia bola odoslaná úplnému uzlu a čaká na zahrnutie do pamäťového fondu. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transakcia bola úspešne odoslaná úplnému uzlu a zahrnutá do pamäťového fondu.",
    "Try Again": "Skúsiť znova",
    "Unable to load the list of the keys": "Nie je možné načítať zoznam kľúčov",
    "Unknown": "Neznáme",
    "Unsaved Changes": "Neuložené zmeny",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Na ochranu vašich kľúčov sa dôrazne odporúča používať prístupovú frázu. Naozaj chcete deaktivovať ochranu prístupovou frázou?",
    "Value seems high": "Hodnota sa zdá byť vysoká",
    "Wallet": "Peňaženka",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Varovanie: Tento kľúč sa používa pre peňaženku, ktorá môže mať nenulový zostatok. Odstránením tohto kľúča môžete stratiť prístup k tejto peňaženke",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Varovanie: Tento kľúč sa používa pre vašu adresu farmárskych odmien. Odstránením tohto kľúča môžete stratiť prístup k budúcim farmárskym odmenám",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Varovanie: Tento kľúč sa používa pre vašu adresu odmien združenia. Odstránením tohto kľúča môžete stratiť prístup k budúcim odmenám združenia",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Vitajte v Chia. Prosím prihláste sa s existujúcim kľúčom, alebo si vytvorte nový.",
    "You have made changes. Do you want to discard them?": "Urobili ste zmeny. Chcete ich zrušiť?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Vaše kľúče zatiaľ neboli migrované do nového zväzku kľúčov. Kým sa migrácia nedokončí, nebudete môcť vytvárať nové kľúče ani odstraňovať existujúce kľúče. Chcete teraz migrovať svoje kľúče?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      few: "mojos",
      many: "mojos",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Prístupové frázy musia mať dĺžku aspoň ", "#", " znak"],
      few: ["Prístupové frázy musia mať dĺžku aspoň ", "#", " znaky"],
      many: ["Prístupové frázy musia mať dĺžku aspoň ", "#", " znakov"],
      other: ["Prístupové frázy musia mať dĺžku aspoň ", "#", " znakov"]
    }]]
  }
};

/*eslint-disable*/
var messages$6 = {
  messages: {
    "Amount": "Sasia",
    "Appearance": "Appearance",
    "Back": "Kthe",
    "Can be backed up to mnemonic seed": "Mund të ruhet ne bërthamen mnemonic",
    "Cancel": "Anuloje",
    "Connected": "Lidhur",
    "Copied": "Kopjuar",
    "Copy to Clipboard": "Kopjo në klipbord",
    "Create a new private key": "Krijo një çelës privat",
    "DANGER: permanently delete private key": "KUJDES: Fshije përgjithmonë çelësin privat",
    "Dark": "Dark",
    "Delete": "Fshij",
    "Delete all keys": "Fshij të gjithë Celsat",
    "Delete key {fingerprint}": ["Fshij çelësin ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Fshirja e të gjithë celsave do të fshij përgjithëmon Celsat nga kompjuteri jotë, sigurohuni që keni një kopje të ruajtur. Jeni i sigurt që doni të vashdoni?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Fshirja e të gjithë celsave do të fshij përgjithëmon Celsat nga kompjuteri jotë, sigurohuni që keni një kopje të ruajtur. Jeni i sigurt që doni të vashdoni?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Mos e ruaj",
    "Error": "Gabim",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Çelësi publik i fermerit:",
    "Farming": "Farming",
    "Fee": "Tarifa",
    "Frequently Asked Questions": "Pyetjet më të shpeshta",
    "Help": "Ndihmë",
    "Help translate": "Ndihmo në përkthim",
    "Hide Advanced Options": "Fshih opsionet e avancuara",
    "Import from Mnemonics (24 words)": "Import nga Mnemonics (24 fjalë)",
    "Incorrect value": "Vlera e pasaktë",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Nuk ka farë 24 fjalësh, pasi që ky çelës importohet.",
    "Not connected": "Nuk është lidhur",
    "OK": "Ok",
    "Pool public key:": "Çelësi publik i pollit:",
    "Private key with public fingerprint {fingerprint}": ["Çelës privat me gjurmë gishtash publike ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Çelësi privat:",
    "Public key:": "Çelësi publik:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Shiko çelësin privat",
    "Seed:": "Fara:",
    "Select Key": "Zgjidhni çelësin",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Shfaq opsionet e avancuara",
    "Sign In": "Identifikohu",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "I panjohur",
    "Unsaved Changes": "Ndryshimet e pa ruajtura",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Vlera duket e lartë",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Paralajmërim: Ky çelës përdoret për një portofol që mund të ketë një bilanc jo-zero. Duke fshirë këtë çelës mund të humbni qasjen në këtë portofol",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Paralajmërim: Ky çelës përdoret për adresën tuaj të shpërblimeve. Duke fshirë këtë çelës, ju mund të humbni qasjen në çdo shpërblim të ardhshëm",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Paralajmërim: Ky çelës përdoret për adresën tuaj të shpërblimeve në poll. Duke fshirë këtë çelës, mund të humbni qasjen në çdo shpërblim të ardhshëm të pollit",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Mirësevini në Chia. Ju lutemi identifikohuni me një çelës ekzistues, ose krijoni një çelës të ri.",
    "You have made changes. Do you want to discard them?": "Ju keni bërë ndryshime. A doni t'i hidhni ato?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$5 = {
  messages: {
    "Amount": "Количина",
    "Appearance": "Appearance",
    "Back": "Назад",
    "Can be backed up to mnemonic seed": "Може се сачувати у мнемоничко семе",
    "Cancel": "Откажи",
    "Connected": "Повезано",
    "Copied": "Копирано",
    "Copy to Clipboard": "Копирај у привремену меморију",
    "Create a new private key": "Креирај нови приватни кључ",
    "DANGER: permanently delete private key": "ОПАСНОСТ: трајно брисање приватног кључа",
    "Dark": "Dark",
    "Delete": "Обриши",
    "Delete all keys": "Обриши све кључеве",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Брисање свих кључева уклониће их трајно са твог рачунара, побрини се да имаш резервне копије. Да ли сигурно желиш да наставиш?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Брисање ће трајно уклонити кључ са твог рачунара, побрини се да имаш резервне копије. Да ли сигурно желиш да наставиш?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Грешка",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Обрађивање",
    "Fee": "Накнада",
    "Frequently Asked Questions": "Често Постављана Питања",
    "Help": "Помоћ",
    "Help translate": "Помози у превођењу",
    "Hide Advanced Options": "Сакриј напредне опције",
    "Import from Mnemonics (24 words)": "Увези уз помоћ мнемотехнике (24 речи)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Нема 24 речи, јер је кључ увезен.",
    "Not connected": "Није повезано",
    "OK": "ОК",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Приватни кључ са јавним потписом ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Приватни кључ:",
    "Public key:": "Јавни кључ:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Прикажи приватни кључ",
    "Seed:": "Семе:",
    "Select Key": "Изабери кључ",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Прикажи напредне опције",
    "Sign In": "Пријави се",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Непознато",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Добродошли у Chia. Пријави се помоћу постојећег кључа или креирај нови кључ.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$4 = {
  messages: {
    "Amount": "Belopp",
    "Appearance": "Utseende",
    "Back": "Tillbaka",
    "Can be backed up to mnemonic seed": "Kan säkerhetskopieras till minnesfras",
    "Cancel": "Avbryt",
    "Connected": "Ansluten",
    "Copied": "Kopierad",
    "Copy to Clipboard": "Kopiera till Urklipp",
    "Create a new private key": "Skapa ny privat nyckel",
    "DANGER: permanently delete private key": "VARNING: permanent ta bort privat nyckel",
    "Dark": "Mörkt",
    "Delete": "Ta bort",
    "Delete all keys": "Ta bort alla nycklar",
    "Delete key {fingerprint}": ["Ta bort nyckel ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Om du tar bort alla nycklar kommer de att permanent tas bort från datorn. Se till att du har säkerhetskopierat dem. Är det säkert att du vill fortsätta?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Om du tar bort nyckeln kommer den att permanent tas bort från datorn. Se till att du har säkerhetskopierat den. Är det säkert att du vill fortsätta?",
    "Disable": "Inaktivera",
    "Disable Passphrase Protection": "Inaktivera lösenfrasskydd",
    "Discard": "Spara inte",
    "Error": "Fel",
    "Error:": "Fel:",
    "FAQ": "FAQ",
    "Farmer public key:": "Publik nyckel för odlare:",
    "Farming": "Odlar",
    "Fee": "Avgift",
    "Frequently Asked Questions": "Vanliga frågor",
    "Help": "Hjälp",
    "Help translate": "Hjälp till med översättning",
    "Hide Advanced Options": "Dölj avancerade alternativ",
    "Import from Mnemonics (24 words)": "Importera från minnesfras (24 ord)",
    "Incorrect value": "Felaktigt värde",
    "Language": "Språk",
    "Light": "Ljust",
    "Loading list of the keys": "Läser in en lista över nycklarna",
    "Log Out": "Logga ut",
    "Logout": "Logga ut",
    "Migrate": "Migrera",
    "Migration required": "Migrering krävs",
    "Mode": "Läge",
    "New passphrase is the same as your current passphrase": "Ny lösenfras är densamma som din nuvarande lösenfras",
    "No 24 word seed, since this key is imported.": "Ingen 24 ords minnesfras eftersom denna nyckel har importerats.",
    "Not connected": "Inte ansluten",
    "OK": "OK",
    "Pool public key:": "Publik nyckel för pool:",
    "Private key with public fingerprint {fingerprint}": ["Privat nyckel med publikt fingeravtryck ", ["fingerprint"]],
    "Private key {fingerprint}": ["Privat nyckel ", ["fingerprint"]],
    "Private key:": "Privat nyckel:",
    "Public key:": "Publik nyckel:",
    "Reload Application": "Läs in applikationen på nytt",
    "Report an Issue": "Rapportera ett problem",
    "See private key": "Visa privat nyckel",
    "Seed:": "Minnesfras:",
    "Select Key": "Välj nyckel",
    "Select...": "Välj...",
    "Send Feedback": "Skicka feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Att ange en lösenfras rekommenderas starkt för att skydda dina nycklar. Är du säker på att du inte vill ange en lösenfras?",
    "Settings": "Inställningar",
    "Show Advanced Options": "Visa avancerade alternativ",
    "Sign In": "Logga in",
    "Skip": "Hoppa över",
    "Skip Passphrase Protection": "Hoppa över lösenfrasskydd",
    "Something went wrong": "Något gick fel",
    "The provided passphrase and confirmation do not match": "Lösenfras och bekräftelse matchar inte",
    "Transaction has not been sent to node yet": "Transaktionen har inte skickats till noden ännu",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaktionen har skickats till en fullständig nod och väntar på att inkluderas i mempoolen. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaktionen har skickats till en hel nod och inkluderats i mempoolen.",
    "Try Again": "Försök igen",
    "Unable to load the list of the keys": "Det gick inte att läsa in listan över nycklarna",
    "Unknown": "Okänd",
    "Unsaved Changes": "Osparade ändringar",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Att använda en lösenfras rekommenderas starkt för att skydda dina nycklar. Är det säkert att du vill ta bort lösenfrasskyddet?",
    "Value seems high": "Värdet verkar högt",
    "Wallet": "Plånbok",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Varning: Denna nyckel används för en plånbok som kan ha ett saldo som inte är noll. Genom att ta bort denna nyckel kan du förlora åtkomst till denna plånbok",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Varning: Denna nyckel används av din farmer. Genom att ta bort denna nyckel kan du förlora tillgång till framtida vinster",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Varning: Denna nyckel används av din pool. Genom att ta bort denna nyckel kan du förlora tillgång till framtida vinster från poolen",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Välkommen till Chia. Logga in med en existerande nyckel, eller skapa en ny nyckel.",
    "You have made changes. Do you want to discard them?": "Du har gjort ändringar. Vill du kasta dem?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Dina nycklar har inte migrerats till en ny nyckelring. Du kommer inte att kunna skapa nya nycklar eller ta bort befintliga nycklar tills migreringen är klar. Vill du migrera nycklarna nu?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojo"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Lösenfraser måste vara minst ", "#", " tecken lång"],
      other: ["Lösenfraser måste vara minst ", "#", " tecken lång"]
    }]]
  }
};

/*eslint-disable*/
var messages$3 = {
  messages: {
    "Amount": "Miktar",
    "Appearance": "Appearance",
    "Back": "Geri",
    "Can be backed up to mnemonic seed": "Mnemonic seed'e yedeklenebilir",
    "Cancel": "İptal Et",
    "Connected": "Bağlandı",
    "Copied": "Kopyalandı",
    "Copy to Clipboard": "Panoya kopyala",
    "Create a new private key": "Yeni bir gizli anahtar oluştur",
    "DANGER: permanently delete private key": "TEHLİKE: Özel anahtarı geri döndürülemeyecek şekilde sil",
    "Dark": "Koyu",
    "Delete": "Sil",
    "Delete all keys": "Tüm anahtarları sil",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Tüm anahtarları silmek bilgisayarında olan tüm anahtarları kalıcı olarak kaldıracaktır, yedekleme yaptığından emin ol. Devam etmek istediğine emin misin?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Anahtarı silmek kalıcı olarak anahtarı bilgisayarından kaldıracaktır. Anahtarı yedeklediğinden emin ol. Devam etmek istediğine emin misin?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Hata",
    "Error:": "Hata:",
    "FAQ": "SSS",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Üretim yapılıyor",
    "Fee": "Ücret",
    "Frequently Asked Questions": "Sıkça Sorulan Sorular",
    "Help": "Yardım",
    "Help translate": "Çeviriye Yardım Et",
    "Hide Advanced Options": "Gelişmiş Seçenekleri Gizle",
    "Import from Mnemonics (24 words)": "Mneminocs'ten içe aktar. (24 kelime)",
    "Incorrect value": "Yanlış değer",
    "Language": "Dil",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mod",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Bu anahtar içe aktarıldığı için 24 kelimeye ihtiyaç yok.",
    "Not connected": "Bağlantı Yok",
    "OK": "Tamam",
    "Pool public key:": "Herkese Açık Havuz Anahtarı:",
    "Private key with public fingerprint {fingerprint}": ["Herkese açık parmak izi ile gizli anahtar ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Özel Anahtar:",
    "Public key:": "Açık anahtar",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Gizli anahtarı gör",
    "Seed:": "Tohum:",
    "Select Key": "Anahtar Seç",
    "Select...": "Seç...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Ayarlar",
    "Show Advanced Options": "Gelişmiş Seçenekleri Göster",
    "Sign In": "Oturum Aç",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Tekrar Dene",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Bilinmeyen",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Cüzdan",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Chia'ya hoş geldiniz. Lütfen mevcut bir anahtarla giriş yapın veya yeni bir anahtar oluşturun.",
    "You have made changes. Do you want to discard them?": "Kaydedilmemiş değişiklikler var. Değişiklikleri çıkarmak ister misiniz?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$2 = {
  messages: {
    "Amount": "Кількість",
    "Appearance": "Appearance",
    "Back": "Назад",
    "Can be backed up to mnemonic seed": "Може бути збережений в якості резервної копії за допомогою мнемонічного зерна",
    "Cancel": "Відміна",
    "Connected": "Підключено",
    "Copied": "Скопійовано",
    "Copy to Clipboard": "Скопіювати до буферу обміну",
    "Create a new private key": "Створити новий приватний ключ",
    "DANGER: permanently delete private key": "НЕБЕЗПЕКА: видалити приватний ключ назавжди",
    "Dark": "Dark",
    "Delete": "Видалити",
    "Delete all keys": "Видалити всі ключі",
    "Delete key {fingerprint}": ["Delete key ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "Видалення усіх ключів призведе до безповоротного видалення ключів з Вашого комп'ютеру. Переконайтесь, що маєте резервні копії. Ви впевнені, що хочете продовжити?",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "Видалення ключа призведе до безповоротного його видалення з Вашого комп'ютеру. Переконайтесь, що маєте резервні копії. Ви впевнені, що хочете продовжити?",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "Discard",
    "Error": "Помилка",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "Farmer public key:",
    "Farming": "Фермерство",
    "Fee": "Комісія",
    "Frequently Asked Questions": "Найчастіші питання",
    "Help": "Допомога",
    "Help translate": "Допомогти з перекладом",
    "Hide Advanced Options": "Приховати додаткові параметри",
    "Import from Mnemonics (24 words)": "Імпортувати за допомогою мнемоніки (24 слова)",
    "Incorrect value": "Incorrect value",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "Відсутні 24 ключових слова, оскільки ключ імпортовано.",
    "Not connected": "Немає з'єднання",
    "OK": "ОК",
    "Pool public key:": "Pool public key:",
    "Private key with public fingerprint {fingerprint}": ["Закритий ключ з публічним відбитком пальця ", ["fingerprint"]],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "Закритий ключ:",
    "Public key:": "Публічний ключ:",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "Переглянути приватний ключ",
    "Seed:": "Фраза:",
    "Select Key": "Вибрати ключ",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "Показати розширені параметри",
    "Sign In": "Увійти",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "Невідомо",
    "Unsaved Changes": "Unsaved Changes",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "Value seems high",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "Ласкаво просимо в Chia. Будь ласка, увійдіть за допомогою існуючого ключа або створіть новий ключ.",
    "You have made changes. Do you want to discard them?": "You have made changes. Do you want to discard them?",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages$1 = {
  messages: {
    "Amount": "數量",
    "Appearance": "Appearance",
    "Back": "返回",
    "Can be backed up to mnemonic seed": "可以備份到助記符號種子",
    "Cancel": "取消",
    "Connected": "已連線",
    "Copied": "已複製",
    "Copy to Clipboard": "複製到剪貼板",
    "Create a new private key": "建立一個新的私鑰",
    "DANGER: permanently delete private key": "危險：將永久刪除私鑰",
    "Dark": "Dark",
    "Delete": "刪除",
    "Delete all keys": "刪除全部金鑰",
    "Delete key {fingerprint}": ["刪除帳號指紋：", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "刪除全部金鑰將會永久從你的電腦中移除，請確保你有備份。你確定要繼續？",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "刪除此金鑰將會永久從你的電腦中移除，請確保你有備份。你確定要繼續？",
    "Disable": "Disable",
    "Disable Passphrase Protection": "Disable Passphrase Protection",
    "Discard": "放棄",
    "Error": "錯誤",
    "Error:": "Error:",
    "FAQ": "FAQ",
    "Farmer public key:": "農夫公鑰:",
    "Farming": "耕種中",
    "Fee": "費用",
    "Frequently Asked Questions": "常見問題",
    "Help": "幫助",
    "Help translate": "協助翻譯",
    "Hide Advanced Options": "隱藏進階選項",
    "Import from Mnemonics (24 words)": "從助記詞(24 字) 匯入",
    "Incorrect value": "數值不正確",
    "Language": "Language",
    "Light": "Light",
    "Loading list of the keys": "Loading list of the keys",
    "Log Out": "Log Out",
    "Logout": "Logout",
    "Migrate": "Migrate",
    "Migration required": "Migration required",
    "Mode": "Mode",
    "New passphrase is the same as your current passphrase": "New passphrase is the same as your current passphrase",
    "No 24 word seed, since this key is imported.": "由這個鑰匙是匯入的，沒有 24 個字種子。",
    "Not connected": "未連線",
    "OK": "好",
    "Pool public key:": "礦池公鑰 (PPK):",
    "Private key with public fingerprint {fingerprint}": ["帶有公有指紋 ", ["fingerprint"], " 的私鑰"],
    "Private key {fingerprint}": ["Private key ", ["fingerprint"]],
    "Private key:": "私鑰：",
    "Public key:": "公鑰：",
    "Reload Application": "Reload Application",
    "Report an Issue": "Report an Issue",
    "See private key": "看私鑰",
    "Seed:": "種子：",
    "Select Key": "選擇金鑰",
    "Select...": "Select...",
    "Send Feedback": "Send Feedback",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?",
    "Settings": "Settings",
    "Show Advanced Options": "顯示進階選項",
    "Sign In": "登入",
    "Skip": "Skip",
    "Skip Passphrase Protection": "Skip Passphrase Protection",
    "Something went wrong": "Something went wrong",
    "The provided passphrase and confirmation do not match": "The provided passphrase and confirmation do not match",
    "Transaction has not been sent to node yet": "Transaction has not been sent to node yet",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["Transaction has been sent to a full node and is pending inclusion into the mempool. ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Try Again": "Try Again",
    "Unable to load the list of the keys": "Unable to load the list of the keys",
    "Unknown": "未知",
    "Unsaved Changes": "尚未儲存變更",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?",
    "Value seems high": "數值有點高",
    "Wallet": "Wallet",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "警告：這個金鑰的錢包還有餘額，如果刪除金鑰可能會導致你遺失這個錢包",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "警告：這個金鑰用於你的耕種獎勵地址。刪除金鑰後可能會無法領取之後的耕種獎勵。",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "警告：這個金鑰用於你的農會獎勵地址。刪除金鑰後可能會無法領取之後的農會獎勵。",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "歡迎來到 Chia。請用已有的金鑰登入，或建立新的金鑰。",
    "You have made changes. Do you want to discard them?": "您有做過變更。請問您想要放棄它們嗎？",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      one: ["Passphrases must be at least ", "#", " character in length"],
      other: ["Passphrases must be at least ", "#", " characters in length"]
    }]]
  }
};

/*eslint-disable*/
var messages = {
  messages: {
    "Amount": "数量",
    "Appearance": "界面",
    "Back": "返回",
    "Can be backed up to mnemonic seed": "可备份为助记词",
    "Cancel": "取消",
    "Connected": "已连接",
    "Copied": "已复制",
    "Copy to Clipboard": "复制到剪贴板",
    "Create a new private key": "创建新私钥",
    "DANGER: permanently delete private key": "注意：永久性删除私钥",
    "Dark": "深色",
    "Delete": "删除",
    "Delete all keys": "删除所有密钥",
    "Delete key {fingerprint}": ["删除密钥 ", ["fingerprint"]],
    "Deleting all keys will permanently remove the keys from your computer, make sure you have backups. Are you sure you want to continue?": "删除所有密钥将会把你的密钥从你的计算机中永久移除，请确保你已经将其备份。确定继续？",
    "Deleting the key will permanently remove the key from your computer, make sure you have backups. Are you sure you want to continue?": "删除此密钥将会把密钥从你的计算机中永久移除，请确保你已经将其备份。确定继续？",
    "Disable": "禁用",
    "Disable Passphrase Protection": "跳过私钥密码保护",
    "Discard": "放弃",
    "Error": "错误",
    "Error:": "错误:",
    "FAQ": "常见问题",
    "Farmer public key:": "农民公钥：",
    "Farming": "正在耕种",
    "Fee": "费用",
    "Frequently Asked Questions": "常见问题解答",
    "Help": "帮助",
    "Help translate": "改进翻译",
    "Hide Advanced Options": "隐藏高级选项",
    "Import from Mnemonics (24 words)": "自助记词导入（24个词）",
    "Incorrect value": "数值错误",
    "Language": "语言",
    "Light": "浅色",
    "Loading list of the keys": "加载密钥列表",
    "Log Out": "登出",
    "Logout": "登出",
    "Migrate": "迁移",
    "Migration required": "需要迁移",
    "Mode": "显示方式",
    "New passphrase is the same as your current passphrase": "新私钥密码与当前私钥密码相同",
    "No 24 word seed, since this key is imported.": "没有24个助记词种子，因为此密钥已导入。",
    "Not connected": "未连接",
    "OK": "确定",
    "Pool public key:": "奖励池公钥：",
    "Private key with public fingerprint {fingerprint}": ["公共指纹为 ", ["fingerprint"], " 的私钥"],
    "Private key {fingerprint}": ["私钥 ", ["fingerprint"]],
    "Private key:": "私钥:",
    "Public key:": "公钥：",
    "Reload Application": "重新加载程序",
    "Report an Issue": "反馈问题",
    "See private key": "查看私钥：",
    "Seed:": "种子：",
    "Select Key": "选择密钥",
    "Select...": "请选择...",
    "Send Feedback": "发送反馈",
    "Setting a passphrase is strongly recommended to protect your keys. Are you sure you want to skip setting a passphrase?": "强烈建议设置私钥密码以保护您的密钥。是否要跳过设置私钥密码？",
    "Settings": "设置",
    "Show Advanced Options": "显示高级选项",
    "Sign In": "登录",
    "Skip": "跳过",
    "Skip Passphrase Protection": "跳过私钥密码保护",
    "Something went wrong": "出错了",
    "The provided passphrase and confirmation do not match": "提供的私钥密码跟确认的不匹配",
    "Transaction has not been sent to node yet": "交易尚未发送到节点",
    "Transaction has sent to a full node and is pending inclusion into the mempool. {0}": ["交易已经发送到一个完整的节点，正在等待加入备注。 ", ["0"]],
    "Transaction has successfully been sent to a full node and included in the mempool.": "交易已成功发送到一个完整的节点，并包含在备注库中。",
    "Try Again": "请重试",
    "Unable to load the list of the keys": "无法加载密钥列表",
    "Unknown": "未知",
    "Unsaved Changes": "未保存的更改",
    "Using a passphrase is strongly recommended to protect your keys. Are you sure you want to disable passphrase protection?": "强烈建议设置私钥密码以保护您的密钥。是否要跳过禁用私钥密码？",
    "Value seems high": "值似乎过高",
    "Wallet": "钱包",
    "Warning: This key is used for a wallet that may have a non-zero balance. By deleting this key you may lose access to this wallet": "警告：此密钥用于可能有余额的钱包。删除此密钥可能会无法访问此钱包。",
    "Warning: This key is used for your farming rewards address. By deleting this key you may lose access to any future farming rewards": "警告：此密钥用于耕作奖励地址。删除此密钥后可能会无法提取将来的耕作奖励。",
    "Warning: This key is used for your pool rewards address. By deleting this key you may lose access to any future pool rewards": "警告：此密钥用于池奖励地址。删除此密钥可能会无法获得将来的池奖励。",
    "Welcome to Chia. Please log in with an existing key, or create a new key.": "欢迎来到奇亚。请用已有的密钥登录，或者创建一个新的密钥。",
    "You have made changes. Do you want to discard them?": "你已经做了一些更改。你确定要放弃这些修改吗？",
    "Your keys have not been migrated to a new keyring. You will be unable to create new keys or delete existing keys until migration completes. Would you like to migrate your keys now?": "您的密钥尚未迁移到新的密钥串。在迁移完成之前，您将无法创建新密钥或删除现有密钥。您想要现在迁移密钥吗？",
    "{0, plural, one {mojo} other {mojos}}": [["0", "plural", {
      one: "mojo",
      other: "mojos"
    }]],
    "{minPassphraseLength, plural, one {Passphrases must be at least # character in length} other {Passphrases must be at least # characters in length}}": [["minPassphraseLength", "plural", {
      other: ["密码长度必须至少为 ", "#", " 个字符"]
    }]]
  }
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arSA: messages$C,
  beBY: messages$B,
  bgBG: messages$A,
  caES: messages$z,
  csCZ: messages$y,
  daDK: messages$x,
  deDE: messages$w,
  elGR: messages$v,
  enAU: messages$u,
  enNZ: messages$t,
  enPT: messages$s,
  enUS: messages$r,
  esES: messages$q,
  esAR: messages$p,
  esMX: messages$o,
  faIR: messages$n,
  fiFI: messages$m,
  frFR: messages$l,
  hrHR: messages$k,
  huHU: messages$j,
  idID: messages$i,
  itIT: messages$h,
  jaJP: messages$g,
  koKR: messages$f,
  nlNL: messages$e,
  noNO: messages$d,
  plPL: messages$c,
  ptBR: messages$b,
  ptPT: messages$a,
  roRO: messages$9,
  ruRU: messages$8,
  skSK: messages$7,
  sqAL: messages$6,
  srSP: messages$5,
  svSE: messages$4,
  trTR: messages$3,
  ukUA: messages$2,
  zhTW: messages$1,
  zhCN: messages
});

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FileSizeError = /*#__PURE__*/function (_Error) {
  _inherits__default["default"](FileSizeError, _Error);

  var _super = _createSuper(FileSizeError);

  function FileSizeError() {
    var _this;

    _classCallCheck__default["default"](this, FileSizeError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "code", 'FILE_SIZE_ERROR');

    return _this;
  }

  return _createClass__default["default"](FileSizeError);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));

exports.Accordion = Accordion;
exports.Address = Address;
exports.AdvancedOptions = AdvancedOptions;
exports.AlertDialog = AlertDialog;
exports.Amount = Amount;
exports.AspectRatio = AspectRatio;
exports.Autocomplete = Autocomplete;
exports.Back = Back;
exports.Button = Button;
exports.ButtonLoading = ButtonLoading;
exports.ButtonSelected = ButtonSelected;
exports.Card = Card;
exports.CardHero = CardHero;
exports.CardKeyValue = CardKeyValue;
exports.CardListItem = CardListItem;
exports.CardSimple = CardSimple;
exports.CardStep = CardStep;
exports.Checkbox = Checkbox;
exports.ConfirmDialog = ConfirmDialog;
exports.CopyToClipboard = CopyToClipboard;
exports.DarkModeToggle = DarkModeToggle;
exports.DialogActions = DialogActions;
exports.Dropdown = Dropdown;
exports.DropdownActions = DropdownActions$1;
exports.DropdownIconButton = DropdownIconButton;
exports.Dropzone = Dropzone;
exports.ErrorBoundary = ErrorBoundary;
exports.Fee = Fee;
exports.FileSizeError = FileSizeError;
exports.Flex = Flex;
exports.Fonts = Fonts;
exports.Form = Form;
exports.FormBackButton = FormBackButton;
exports.FormatBytes = FormatBytes;
exports.FormatConnectionStatus = FormatConnectionStatus;
exports.FormatLargeNumber = FormatLargeNumber;
exports.GuestRoute = GuestRoute;
exports.Heading = Heading;
exports.IconButton = StyledIconButton;
exports.IconMessage = IconMessage;
exports.Indicator = PlotStatus;
exports.InputBase = InputBase;
exports.LayoutDashboard = LayoutDashboard;
exports.LayoutDashboardSub = DashboardLayout;
exports.LayoutHero = LayoutHero;
exports.LayoutLoading = LayoutLoading;
exports.LayoutMain = LayoutMain;
exports.Link = Link;
exports.Loading = Loading;
exports.LoadingOverlay = LoadingOverlay;
exports.LocaleContext = LocaleContext;
exports.LocaleProvider = LocaleProvider;
exports.LocaleToggle = LocaleToggle;
exports.Log = Log;
exports.Logo = Logo;
exports.ModalDialogs = ModalDialogs;
exports.ModalDialogsProvider = ModalDialogsProvider;
exports.Mode = Mode$1;
exports.ModeProvider = ModeProvider;
exports.More = More;
exports.Persist = Persist$1;
exports.PrivateRoute = PrivateRoute;
exports.RadioGroup = RadioGroup;
exports.SandboxedIframe = SandboxedIframe$1;
exports.Select = Select;
exports.SelectKey = SelectKey;
exports.SettingsApp = SettingsApp;
exports.SettingsLabel = SettingsLabel;
exports.SideBarItem = SideBarItem;
exports.Spacer = Spacer;
exports.Spinner = Spinner;
exports.State = State$1;
exports.StateColor = StateColor$1;
exports.StateIndicator = StateComponent;
exports.StateIndicatorDot = StateIndicatorDot;
exports.StateTypography = StateTypography;
exports.Suspender = Suspender;
exports.Table = Table;
exports.TableControlled = TableControlled;
exports.TextField = TextField;
exports.TextFieldNumber = TextFieldNumber;
exports.ThemeProvider = ThemeProvider;
exports.ToolbarSpacing = ToolbarSpacing;
exports.Tooltip = Tooltip;
exports.TooltipIcon = TooltipIcon;
exports.TooltipTypography = TooltipTypography;
exports.Truncate = Truncate;
exports.Unit = Unit$1;
exports.UnitAliases = UnitAliases;
exports.UnitFormat = UnitFormat;
exports.UnitValue = UnitValue;
exports.activateLocale = activateLocale;
exports.blockHeightToTimestamp = blockHeightToTimestamp;
exports.calculateBaseFarmerReward = calculateBaseFarmerReward;
exports.calculatePoolReward = calculatePoolReward;
exports.catToMojo = catToMojo;
exports.chiaFormatter = chiaFormatter;
exports.chiaToMojo = chiaToMojo;
exports.dark = dark;
exports.getPercentPointsSuccessfull = getPercentPointsSuccessfull;
exports.getPoolInfo = getPoolInfo;
exports.getTransactionResult = getTransactionResult;
exports.isWindows = isWindows;
exports.light = light;
exports.locales = index;
exports.mojoToCAT = mojoToCAT;
exports.mojoToCATLocaleString = mojoToCATLocaleString;
exports.mojoToChia = mojoToChia;
exports.mojoToChiaLocaleString = mojoToChiaLocaleString;
exports.sleep = sleep;
exports.truncateValue = truncateValue;
exports.useColorModeValue = useColorModeValue;
exports.useCurrencyCode = useCurrencyCode;
exports.useDarkMode = useDarkMode;
exports.useIsSimulator = useIsSimulator;
exports.useLocalStorage = useLocalStorage;
exports.useLocale = useLocale;
exports.useMode = useMode;
exports.useOpenDialog = useOpenDialog;
exports.useOpenExternal = useOpenExternal;
exports.usePersist = usePersist;
exports.usePersistState = usePersistState;
exports.useSerializedNavigationState = useSerializedNavigationState;
exports.useShowDebugInformation = useShowDebugInformation;
exports.useShowError = useShowError;
exports.useShowSaveDialog = useShowSaveDialog;
exports.useSkipMigration = useSkipMigration;
exports.useTrans = useTrans;
exports.useValidateChangePassphraseParams = useValidateChangePassphraseParams;
exports.validAddress = validAddress;
//# sourceMappingURL=index.js.map
