'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var React = require('react');
var material = require('@mui/material');
var jsxRuntime = require('react/jsx-runtime');
var styled = require('styled-components');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var iconsMaterial = require('@mui/icons-material');

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

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);

var _g;

function _extends$j() { _extends$j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }

var SvgChia = function SvgChia(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$j({
    width: 150,
    height: 58,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    fill: "#3AAC59",
    fillRule: "nonzero"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M90 19h13v38H90zM72.151 16.14c-4.998 0-10.109 1.197-11.381 3.424-.017.029-.034.055-.05.084V3.704H47.371v25.337a51.616 51.616 0 0 1 5.218 2.764c.182.11.365.22.547.333.019.012-7.63 11.921-18.045 14.422-6.154 1.479-13.424-.311-14.896-6.485-.062-.255-.096-.512-.136-.769a43.052 43.052 0 0 1 2.994-1.617c2.55-1.111 4.494-1.944 5.23-2.226l.195-.072h.003l.002-.003c6.078-2.204 11.18-2.964 11.18-2.964-4.634-.4-8.611-.078-11.94.581l-.005-.002-.07.017c-3.014.604-5.494 1.482-7.42 2.358 1.074-4.45 4.945-8.315 9.527-9.416a15.389 15.389 0 0 1 1.573-.285c.318-.043.638-.077.96-.103.102-.008.206-.019.309-.024.411-.026.824-.04 1.238-.038.082 0 .163.005.244.006a21.154 21.154 0 0 1 1.756.098c1.973.204 4.396.733 7.083 1.646v-8.744a72.679 72.679 0 0 0-4.1-1.14c-3.764-1.003-10.228-2.07-17.297-.349C10.152 19.8 6.927 28.212 6.927 38.492c0 1.31.104 2.535.294 3.688-2.469 1.635-4.893 3.512-7.097 5.655 0 0 3.28-1.463 7.611-3.387C10.627 54.32 20.713 57.64 28.308 57.64c7.92 0 13.006-2.26 19.064-6.04v4.787h13.347V32.64l.05-.094v-.403c1.27-3.395 3.43-4.27 5.831-4.27 3.173 0 5.155 2.253 5.155 5.833v22.682h13.348V29.862c0-8.352-5.22-13.721-12.952-13.721M96.288.385c-4.03 0-6.872 2.85-6.872 6.894 0 4.043 2.842 6.892 6.872 6.892 4.03 0 6.873-2.85 6.873-6.892 0-4.044-2.843-6.894-6.873-6.894M147.39 34.867h.016l-.014-16.927h-13.364l-.073 2.406c-12.89-8.305-21.119.236-21.119.236-3.936 3.604-6.22 9.295-6.22 16.44 0 12.668 7.592 20.204 17.461 20.204 3.7 0 7.107-.838 10.05-4.918.34.952 1.1 3.28 1.644 4.08h13.906c-2.384-3.925-2.364-17.535-2.287-21.52m-20.197 11.384c-4.328 0-7.38-3.768-7.38-9.113s3.052-9.114 7.38-9.114c3.035 0 5.441 1.855 6.609 4.806v8.615c-1.167 2.95-3.574 4.806-6.609 4.806"
  }))));
};

function ownKeys$i(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$i(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$i(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$i(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Keys$1(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$i({
    component: SvgChia,
    viewBox: "0 0 150 58"
  }, props));
}

var _path$i;

function _extends$i() { _extends$i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }

var SvgFarm = function SvgFarm(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$i({
    width: 32,
    height: 37,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$i || (_path$i = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M19.216 14.289c1.65-1.65 4.372-1.815 5.609-1.897 0 1.32-.33 3.959-2.062 5.608-1.65 1.65-4.371 1.814-5.69 1.897.164-1.237.494-3.959 2.143-5.608ZM7.01 31.526c-2.639-2.557-2.969-6.763-2.969-8.413 1.65 0 5.938.165 8.495 2.722 2.64 2.557 2.97 6.763 2.97 8.412-1.65.083-5.857-.164-8.496-2.721Zm8.495-11.464c-1.32-.083-3.959-.33-5.608-2.062-1.65-1.65-1.815-4.371-1.897-5.608 1.32 0 3.959.33 5.608 2.062 1.402 1.484 1.815 3.71 1.815 5.113v.495h.082Zm-.99-14.186c0-1.65 1.073-3.134 1.732-3.876.743.742 1.815 2.227 1.815 3.794 0 1.65-1.072 3.134-1.815 3.876-.577-.742-1.732-2.227-1.732-3.794Zm2.64 28.371c0-1.65.33-5.855 2.969-8.412 2.639-2.557 6.845-2.722 8.495-2.722 0 1.732-.33 5.939-2.97 8.413-2.556 2.557-6.762 2.804-8.494 2.721ZM0 36.804h32v-1.65h-9.32c1.485-.494 2.97-1.237 4.207-2.391 3.876-3.711 3.463-10.144 3.463-10.474a.74.74 0 0 0-.742-.743c-.247 0-6.68-.577-10.556 3.134-.743.743-1.32 1.567-1.815 2.475v-5.609c1.485 0 4.701-.247 6.846-2.309 2.804-2.721 2.556-7.423 2.556-7.587a.74.74 0 0 0-.742-.743c-.165 0-4.866-.412-7.67 2.31-.33.33-.66.742-.907 1.072v-3.052c.66-.66 2.639-2.804 2.639-5.443 0-3.134-2.887-5.526-2.97-5.608a.867.867 0 0 0-1.072 0c-.082.082-2.886 2.556-2.886 5.69 0 2.475 1.814 4.536 2.64 5.279v2.886a5.776 5.776 0 0 0-.66-.825c-2.722-2.804-7.423-2.556-7.588-2.556a.74.74 0 0 0-.743.742c0 .165-.412 4.866 2.31 7.67 2.062 2.145 5.278 2.474 6.763 2.557v5.443c-.495-.907-1.073-1.732-1.815-2.474-3.876-3.711-10.31-3.134-10.557-3.134-.412.082-.742.33-.742.742 0 .248-.412 6.763 3.464 10.474 1.237 1.155 2.722 1.897 4.206 2.392H0v1.732Z"
  })));
};

function ownKeys$h(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$h(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$h(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$h(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Farm$1(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$h({
    component: SvgFarm,
    viewBox: "0 0 32 37"
  }, props));
}

var _path$h;

function _extends$h() { _extends$h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

var SvgFarming = function SvgFarming(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$h({
    width: 32,
    height: 32,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$h || (_path$h = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 6.168V.289l11.769 6.626a10.27 10.27 0 0 1 5.18 7.929 10.258 10.258 0 0 1 3.282-2.929L32 5.29v5.879c0 3.66-1.969 7.036-5.153 8.84L17 25.582V30h5a1 1 0 1 1 0 2H10a1 1 0 1 1 0-2h5v-9.417l-9.847-5.575A10.159 10.159 0 0 1 0 6.168Zm25.861 12.1L17 23.284V20.864c0-2.987 1.61-5.74 4.212-7.206L30 8.711v2.457a8.159 8.159 0 0 1-4.139 7.1ZM15 15.863V18.285l-8.861-5.018A8.159 8.159 0 0 1 2 6.167V3.712l8.788 4.947A8.269 8.269 0 0 1 15 15.864Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys$g(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$g(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$g(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$g(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Farming(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$g({
    component: SvgFarming,
    viewBox: "0 0 32 32"
  }, props));
}

var _path$g;

function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

var SvgFullNode = function SvgFullNode(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$g({
    width: 32,
    height: 32,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$g || (_path$g = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.3 2.816C5.661 4.82 2.031 10.144 2 15.917c.002.028.004.055.004.083 0 .79.41 1.639 1.358 2.487.95.85 2.367 1.627 4.165 2.235 1.339.453 2.866.805 4.525 1.023C13.305 21.91 14.63 22 16 22a1 1 0 1 1 0 2c-1.456 0-2.868-.095-4.209-.271-1.774-.234-3.43-.612-4.905-1.112-1.587-.537-2.993-1.223-4.113-2.04a13.913 13.913 0 0 0 2.764 4.726 1 1 0 0 1-1.493 1.33 15.937 15.937 0 0 1-3.42-6.223C-1.811 11.917 3.099 3.06 11.59.624A15.985 15.985 0 0 1 16.563.01a1 1 0 0 1 .29.053c1.76.28 3.255 1.537 4.4 3.226a1 1 0 1 1-1.655 1.122c-1.124-1.658-2.351-2.408-3.492-2.408-1.575 0-3.318 1.464-4.635 4.535-.215.503-.415 1.04-.597 1.61a23.623 23.623 0 0 0-.881 3.993 1 1 0 0 1-1.982-.268 25.62 25.62 0 0 1 .959-4.334c.2-.625.421-1.223.664-1.789.463-1.08 1.02-2.08 1.665-2.934Zm16.427 2.3a1 1 0 1 0-1.464 1.362 13.912 13.912 0 0 1 2.965 4.946c-.908-.662-2.001-1.236-3.22-1.714-.43-.17-.88-.328-1.345-.474a26.724 26.724 0 0 0-4.805-1.008A32.815 32.815 0 0 0 16 8.002a1 1 0 0 0 0 2 30.81 30.81 0 0 1 3.619.212c1.616.193 3.115.512 4.444.93.423.133.829.276 1.215.427 1.556.61 2.765 1.35 3.569 2.138.8.784 1.149 1.561 1.149 2.291l.003.084c-.031 5.672-3.535 10.91-9.005 12.992.055-.075.11-.15.163-.227 1.302-1.863 2.279-4.43 2.823-7.356a1 1 0 0 0-1.965-.366c-.51 2.736-1.403 5.012-2.497 6.577-1.104 1.58-2.3 2.293-3.413 2.293-1.123 0-2.329-.725-3.44-2.33a1 1 0 0 0-1.644 1.137c1.085 1.568 2.479 2.749 4.11 3.091.122.06.26.094.405.098 1.607.047 3.247-.15 4.872-.616 8.493-2.436 13.403-11.294 10.968-19.786a15.933 15.933 0 0 0-3.65-6.475ZM15.001 16a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys$f(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$f(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$f(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$f(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function FullNode(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$f({
    component: SvgFullNode,
    viewBox: "0 0 32 32"
  }, props));
}

var _path$f;

function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

var SvgHome = function SvgHome(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$f({
    width: 32,
    height: 31,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$f || (_path$f = /*#__PURE__*/React__namespace.createElement("path", {
    d: "m17.165.446.051.05 14.555 14.556a.738.738 0 0 1 0 1.069.773.773 0 0 1-1.018.05l-.05-.05-1.731-1.73v15.216a1.02 1.02 0 0 1-1.018 1.018H3.526a1.02 1.02 0 0 1-1.018-1.018V14.899l-1.221 1.222a.738.738 0 0 1-1.069 0 .773.773 0 0 1-.05-1.018l.05-.051L14.722.548c.662-.713 1.781-.713 2.443-.102Zm-1.323 1.12L4.035 13.372v15.726h7.125V18.92c0-.56.458-1.018 1.018-1.018h7.633c.56 0 1.018.458 1.018 1.018v10.178h6.616V12.864L16.198 1.617a.314.314 0 0 0-.356-.051Zm3.46 17.863h-6.615v9.669h6.615v-9.67Z"
  })));
};

function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$e(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getColor(_ref) {
  var theme = _ref.theme,
      color = _ref.color;

  if (color !== 'inherit') {
    return color;
  }

  return theme.palette.type === 'dark' ? 'white' : '#757575';
}

var StyledHomeIcon = styled__default["default"](SvgHome).withConfig({
  displayName: "Home__StyledHomeIcon",
  componentId: "sc-gill23-0"
})(["path{stroke:", ";stroke-width:2;}"], getColor);
function Home(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$e({
    component: StyledHomeIcon,
    viewBox: "0 0 32 31"
  }, props));
}

var _path$e;

function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

var SvgKeys = function SvgKeys(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$e({
    width: 32,
    height: 33,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$e || (_path$e = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M32 16.005C32 7.129 24.798 0 15.995 0A15.85 15.85 0 0 0 4.647 4.801h-.073v.073c-6.11 6.184-6.11 16.223.073 22.406v.073h.073c6.183 6.184 16.15 6.256 22.406.146h.073v-.073C30.254 24.37 32 20.296 32 16.005Zm-5.31 9.82-5.166-5.165c2.255-2.691 2.328-6.62.073-9.311l5.165-5.165c5.093 5.674 5.02 14.185-.073 19.642Zm-14.768-5.674c-2.183-2.328-2.11-6.038.218-8.22a5.85 5.85 0 0 1 8.002 0c2.183 2.328 2.11 6.038-.218 8.22-2.255 2.11-5.82 2.11-8.002 0ZM25.67 5.238l-5.165 5.165c-2.692-2.182-6.62-2.182-9.312.073L6.102 5.31C11.63.218 20.142.145 25.67 5.238ZM5.156 6.402l5.165 5.165c-2.11 2.692-2.037 6.474.073 9.093l-5.165 5.166a14.487 14.487 0 0 1-.073-19.424Zm1.091 20.37 5.165-5.166c2.62 2.11 6.402 2.182 9.094.073l5.165 5.165c-5.602 5.02-13.968 4.947-19.424-.073Z"
  })));
};

function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$d(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Keys(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$d({
    component: SvgKeys,
    viewBox: "0 0 32 33"
  }, props));
}

var _path$d;

function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

var SvgLinkSmall = function SvgLinkSmall(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$d({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$d || (_path$d = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.25 3a.75.75 0 0 1 .75-.75h4.75a1 1 0 0 1 1 1V8a.75.75 0 0 1-1.5 0V4.81l-5.72 5.72a.75.75 0 1 1-1.06-1.06l5.72-5.72H10A.75.75 0 0 1 9.25 3ZM4 5.75a.25.25 0 0 0-.25.25v8c0 .138.112.25.25.25h8a.25.25 0 0 0 .25-.25v-4a.75.75 0 0 1 1.5 0v4A1.75 1.75 0 0 1 12 15.75H4A1.75 1.75 0 0 1 2.25 14V6c0-.966.784-1.75 1.75-1.75h4a.75.75 0 0 1 0 1.5H4Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function LinkSmall(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$c({
    component: SvgLinkSmall,
    viewBox: "0 0 18 18"
  }, props));
}

var _path$c;

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

var SvgNfTs = function SvgNfTs(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$c({
    width: 38,
    height: 28,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$c || (_path$c = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.51 0h20.98l7.866 10.115L18.48 27.373.66 10.093 8.51 0Zm.98 2L4.044 9h29.91l-5.444-7H9.489Zm23.934 9H4.468L18.52 24.627 33.424 11Z",
    fill: "current",
    stroke: "transparent"
  })));
};

var _path$b;

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

var SvgNfTsSmall = function SvgNfTsSmall(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$b({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$b || (_path$b = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.625 3.25h8.75l3.615 4.82L9 16.06 1.01 8.07l3.615-4.82Zm.75 1.5L3.5 7.25h11l-1.875-2.5h-7.25Zm8.814 4H3.811L9 13.94l5.19-5.19Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function NFTsSmall(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$b({
    component: SvgNfTsSmall,
    viewBox: "0 0 18 18"
  }, props));
}
function NFTs(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$b({
    component: SvgNfTs,
    viewBox: "0 0 38 28"
  }, props));
}

var _path$a;

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

var SvgOffers = function SvgOffers(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$a({
    width: 32,
    height: 32,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$a || (_path$a = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2s14 6.268 14 14Zm2 0c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16ZM18.293 8.293a1 1 0 0 1 1.414 0l3.659 3.659c.756.755.22 2.048-.849 2.048H9a1 1 0 1 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414Zm-4.586 15.414a1 1 0 0 1-1.414 0l-3.659-3.659c-.756-.755-.22-2.048.849-2.048H23a1 1 0 1 1 0 2H11.414l2.293 2.293a1 1 0 0 1 0 1.414Z",
    fill: "current",
    stroke: "transparent"
  })));
};

var _path$9, _path2$1;

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

var SvgOffersSmall = function SvgOffersSmall(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$9({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$9 || (_path$9 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 16.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5ZM17.75 9A8.75 8.75 0 1 1 .25 9a8.75 8.75 0 0 1 17.5 0Z",
    fill: "current",
    stroke: "transparent"
  })), _path2$1 || (_path2$1 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.928 6.25H5a.75.75 0 1 0 0 1.5h7.586c.841 0 1.223-1.053.576-1.591L10.48 3.924a.75.75 0 0 0-.96 1.152l1.408 1.174ZM4.838 11.841c-.646-.538-.265-1.591.576-1.591H13a.75.75 0 0 1 0 1.5H7.072l1.408 1.174a.75.75 0 0 1-.96 1.152l-2.682-2.235Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function OffersSmall(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$a({
    component: SvgOffersSmall,
    viewBox: "0 0 18 18"
  }, props));
}
function Offers(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$a({
    component: SvgOffers,
    viewBox: "0 0 32 32"
  }, props));
}

var _path$8;

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

var SvgPlot = function SvgPlot(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$8({
    width: 40,
    height: 32,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$8 || (_path$8 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M39.84 21.04 34.16 1.36C33.88.56 33.12 0 32.28 0H7.72C6.84 0 6.08.56 5.8 1.4L.12 21c-.08.32-.12.64-.12.96v6.84C0 30.56 1.44 32 3.2 32h33.6c1.76 0 3.2-1.44 3.2-3.2v-6.84c0-.32-.04-.64-.16-.92ZM7.36 1.88c.04-.16.2-.28.36-.28h24.56c.16 0 .28.08.36.24l5.08 17.52c-.32-.12-.6-.16-.92-.16H3.2c-.32 0-.6.04-.92.16L7.36 1.88ZM38.4 28.8c0 .88-.72 1.6-1.6 1.6H3.2c-.88 0-1.6-.72-1.6-1.6v-6.4c0-.88.72-1.6 1.6-1.6h33.6c.88 0 1.6.72 1.6 1.6v6.4ZM8 25.6c0 .88-.72 1.6-1.6 1.6-.88 0-1.6-.72-1.6-1.6 0-.88.72-1.6 1.6-1.6.88 0 1.6.72 1.6 1.6Zm4.8 0c0 .88-.72 1.6-1.6 1.6-.88 0-1.6-.72-1.6-1.6 0-.88.72-1.6 1.6-1.6.88 0 1.6.72 1.6 1.6Zm4.8 0c0 .88-.72 1.6-1.6 1.6-.88 0-1.6-.72-1.6-1.6 0-.88.72-1.6 1.6-1.6.88 0 1.6.72 1.6 1.6Zm3.2-1.6h14.4v1.6H20.8V24Z"
  })));
};

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Plot(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$9({
    component: SvgPlot,
    viewBox: "0 0 40 32"
  }, props));
}

var _path$7;

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

var SvgPlots = function SvgPlots(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$7({
    width: 26,
    height: 32,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$7 || (_path$7 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "m13.367 1.16.037-1-.037 1Zm6.479 10.1.924.382v-.002l.003-.004.005-.014.019-.046.063-.166a14.788 14.788 0 0 0 .687-2.57c.26-1.525.347-3.647-.732-5.33-1.08-1.682-3.045-2.488-4.539-2.888a14.8 14.8 0 0 0-2.8-.458l-.05-.003h-.022l-.695-.026-.266.642.924.383a92.013 92.013 0 0 0-.924-.382l-.001.001-.002.005-.005.014-.02.046-.063.166a14.807 14.807 0 0 0-.687 2.57c-.26 1.525-.346 3.647.733 5.33 1.079 1.682 3.045 2.488 4.538 2.887a14.808 14.808 0 0 0 2.8.459l.05.003h.022l.695.026.267-.642-.924-.383Zm-.038 1 .038-1-.038 1Zm-.645-2.065c.136-.431.3-1.025.413-1.691.239-1.403.215-2.885-.445-3.914-.66-1.028-1.997-1.668-3.372-2.036a12.797 12.797 0 0 0-1.709-.33 12.8 12.8 0 0 0-.413 1.692c-.239 1.403-.216 2.885.444 3.914.66 1.028 1.998 1.668 3.372 2.035.653.175 1.26.274 1.71.33Zm-5.462 5.34.962-.273-.962.274Zm-7.607 9.282c-.08.996-.079.996-.078.996h.006l.015.002.05.003.178.01a14.794 14.794 0 0 0 2.657-.14c1.53-.224 3.575-.797 4.842-2.342 1.267-1.546 1.427-3.664 1.346-5.209a14.807 14.807 0 0 0-.428-2.804l-.013-.049-.004-.014-.002-.005v-.003l-.19-.668-.693-.055-.08.997.079-.997h-.007l-.015-.002-.05-.003a13.399 13.399 0 0 0-.803-.02c-.52.003-1.239.035-2.031.15-1.53.224-3.576.797-4.843 2.342-1.267 1.546-1.427 3.665-1.346 5.209a14.803 14.803 0 0 0 .429 2.804l.013.049.004.014v.005l.002.002.19.67.692.054.08-.996Zm-.962.272.962-.272-.962.272Zm1.764-1.251a12.81 12.81 0 0 0 1.736-.13c1.408-.205 2.81-.685 3.585-1.63.775-.945.97-2.415.896-3.836a12.807 12.807 0 0 0-.214-1.728c-.453.003-1.068.032-1.737.13-1.408.205-2.81.685-3.585 1.63-.775.945-.97 2.415-.895 3.836.035.675.128 1.284.214 1.728ZM1 30a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2H1Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Plots(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$8({
    component: SvgPlots,
    viewBox: "0 0 26 32"
  }, props));
}

var _path$6;

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

var SvgPool = function SvgPool(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$6({
    width: 34,
    height: 34,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M22.718.864c-3.361-.273-6.68.908-9.044 3.317a11.54 11.54 0 0 0-3.206 6.28 11.393 11.393 0 0 0-6.28 3.206A11.498 11.498 0 0 0 .87 20.801c-.273 3.046.682 6 2.636 8.317 1.953 2.317 4.726 3.772 7.772 4 3.36.272 6.678-.909 9.043-3.318a11.396 11.396 0 0 0 3.206-6.28 11.394 11.394 0 0 0 6.28-3.206 11.498 11.498 0 0 0 3.317-7.133c.59-6.23-4.092-11.772-10.407-12.317Zm-12.37 11.035c-.081 2.829.83 5.562 2.69 7.777 1.954 2.317 4.726 3.772 7.772 4 .47.04.907.045 1.367.016a10.001 10.001 0 0 1-10.69 8.047 10.087 10.087 0 0 1-9.194-10.863 10.01 10.01 0 0 1 2.903-6.245 9.88 9.88 0 0 1 5.153-2.732Zm10.58 10.354c-5.448-.436-9.514-5.146-9.202-10.58a9.497 9.497 0 0 1 1.43.01c5.45.48 9.514 5.192 9.203 10.582a9.504 9.504 0 0 1-1.431-.012Zm7.963-2.904-.002.001a9.88 9.88 0 0 1-5.152 2.732c.199-6.041-4.354-11.282-10.461-11.777a9.283 9.283 0 0 0-1.37-.016 9.876 9.876 0 0 1 2.732-5.145 10 10 0 0 1 7.96-2.903c5.544.485 9.677 5.324 9.194 10.864-.22 2.465-1.277 4.663-2.901 6.244Z"
  })));
};

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Farm(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$7({
    component: SvgPool,
    viewBox: "0 0 34 34"
  }, props));
}

var _path$5;

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

var SvgPooling = function SvgPooling(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$5({
    width: 32,
    height: 32,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M18.898 15.32A9 9 0 1 1 11 2c3.74 0 6.95 2.281 8.308 5.532a1 1 0 1 0 1.846-.77C19.495 2.792 15.575 0 11 0 4.925 0 0 4.925 0 11S4.924 22 11 22c4.163 0 7.785-2.313 9.652-5.72a1 1 0 1 0-1.754-.96Zm-5.796 1.361A9 9 0 1 1 21 30a9.003 9.003 0 0 1-8.308-5.533 1 1 0 1 0-1.845.771C12.505 29.208 16.425 32 21 32c6.075 0 11-4.925 11-11s-4.925-11-11-11a10.998 10.998 0 0 0-9.652 5.72 1 1 0 1 0 1.754.961Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Pooling(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$6({
    component: SvgPooling,
    viewBox: "0 0 32 32"
  }, props));
}

var _path$4, _path2;

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

var SvgPlotHero = function SvgPlotHero(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$4({
    width: 67,
    height: 55,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M11.563 0h45.61L66 37H2l9.563-37Z",
    fill: "#EACA8B"
  })), _path2 || (_path2 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "m66.732 36.505-9.514-33.21C56.749 1.945 55.476 1 54.069 1H12.931c-1.474 0-2.747.945-3.216 2.362L.201 36.438A6.704 6.704 0 0 0 0 38.057V49.6C0 52.57 2.412 55 5.36 55h56.28c2.948 0 5.36-2.43 5.36-5.4V38.057c0-.54-.067-1.08-.268-1.552ZM12.328 4.172a.644.644 0 0 1 .603-.472h41.138c.268 0 .469.135.603.405l8.509 29.565a4.127 4.127 0 0 0-1.541-.27H5.36c-.536 0-1.005.068-1.541.27l8.509-29.498ZM64.32 49.6c0 1.485-1.206 2.7-2.68 2.7H5.36c-1.474 0-2.68-1.215-2.68-2.7V38.8c0-1.485 1.206-2.7 2.68-2.7h56.28c1.474 0 2.68 1.215 2.68 2.7v10.8ZM13.4 44.2c0 1.485-1.206 2.7-2.68 2.7-1.474 0-2.68-1.215-2.68-2.7s1.206-2.7 2.68-2.7c1.474 0 2.68 1.215 2.68 2.7Zm8.04 0c0 1.485-1.206 2.7-2.68 2.7-1.474 0-2.68-1.215-2.68-2.7s1.206-2.7 2.68-2.7c1.474 0 2.68 1.215 2.68 2.7Zm8.04 0c0 1.485-1.206 2.7-2.68 2.7-1.474 0-2.68-1.215-2.68-2.7s1.206-2.7 2.68-2.7c1.474 0 2.68 1.215 2.68 2.7Zm5.36-2.7h24.12v2.7H34.84v-2.7Z",
    fill: "#000"
  })));
};

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function PlotHero(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$5({
    component: SvgPlotHero,
    viewBox: "0 0 67 54"
  }, props));
}

var _excluded = ["color"];

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledFiberManualRecordIcon = styled__default["default"](function (_ref) {
  _ref.color;
      var rest = _objectWithoutProperties__default["default"](_ref, _excluded);

  return /*#__PURE__*/jsxRuntime.jsx(iconsMaterial.FiberManualRecord, _objectSpread$4({}, rest));
}).withConfig({
  displayName: "Status__StyledFiberManualRecordIcon",
  componentId: "sc-1mlnyi5-0"
})(["font-size:1rem;color:", ";"], function (_ref2) {
  var color = _ref2.color;
  return color;
});

// @ts-ignore
function Status(props, ref) {
  var color = props.color;
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ref: ref,
    children: /*#__PURE__*/jsxRuntime.jsx(StyledFiberManualRecordIcon, {
      color: color
    })
  });
}

var Status$1 = /*#__PURE__*/React.forwardRef(Status);

var _path$3;

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

var SvgTokens = function SvgTokens(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$3({
    width: 37,
    height: 28,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S32.523 0 27 0ZM10 3a8 8 0 0 0-4.444 14.653 1 1 0 0 1-1.112 1.663A9.991 9.991 0 0 1 0 11C0 5.477 4.477 1 10 1a9.96 9.96 0 0 1 5.949 1.961 1 1 0 0 1-1.191 1.607A7.96 7.96 0 0 0 10 3Zm4.366 6.703A1 1 0 0 1 14 11.07a8 8 0 1 0 10.653 11.374 1 1 0 0 1 1.662 1.112A9.992 9.992 0 0 1 18 28c-5.523 0-10-4.477-10-10a9.996 9.996 0 0 1 5-8.662 1 1 0 0 1 1.366.365Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Tokens(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$3({
    component: SvgTokens,
    viewBox: "0 0 37 28"
  }, props));
}

var _path$2;

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var SvgTrade = function SvgTrade(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$2({
    width: 34,
    height: 34,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M22.718.864c-3.361-.273-6.68.908-9.044 3.317a11.54 11.54 0 0 0-3.206 6.28 11.393 11.393 0 0 0-6.28 3.206A11.498 11.498 0 0 0 .87 20.801c-.273 3.046.682 6 2.636 8.317 1.953 2.317 4.726 3.772 7.772 4 3.36.272 6.678-.909 9.043-3.318a11.396 11.396 0 0 0 3.206-6.28 11.394 11.394 0 0 0 6.28-3.206 11.498 11.498 0 0 0 3.317-7.133c.59-6.23-4.092-11.772-10.407-12.317Zm-12.37 11.035c-.081 2.829.83 5.562 2.69 7.777 1.954 2.317 4.726 3.772 7.772 4 .47.04.907.045 1.367.016a10.001 10.001 0 0 1-10.69 8.047 10.087 10.087 0 0 1-9.194-10.863 10.01 10.01 0 0 1 2.903-6.245 9.88 9.88 0 0 1 5.153-2.732Zm10.58 10.354c-5.448-.436-9.514-5.146-9.202-10.58a9.497 9.497 0 0 1 1.43.01c5.45.48 9.514 5.192 9.203 10.582a9.504 9.504 0 0 1-1.431-.012Zm7.963-2.904-.002.001a9.88 9.88 0 0 1-5.152 2.732c.199-6.041-4.354-11.282-10.461-11.777a9.283 9.283 0 0 0-1.37-.016 9.876 9.876 0 0 1 2.732-5.145 10 10 0 0 1 7.96-2.903c5.544.485 9.677 5.324 9.194 10.864-.22 2.465-1.277 4.663-2.901 6.244Z"
  })));
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Trade(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$2({
    component: SvgTrade,
    viewBox: "0 0 34 34"
  }, props));
}

var _path$1;

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var SvgWallet = function SvgWallet(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$1({
    width: 32,
    height: 39,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M30.573 13.999h-.192l-.733-2.237L25.985.543A.9.9 0 0 0 25.6.081c-.193-.078-.386-.116-.578-.039L5.166 6.596l-3.47 1.157c-.385.116-.616.578-.5.964l1.734 5.282H1.427c-.81 0-1.427.655-1.427 1.426V36.63c0 .81.655 1.426 1.427 1.426h29.146c.81 0 1.427-.655 1.427-1.426V15.425c0-.77-.617-1.426-1.427-1.426Zm-.115 14.226H22.94v-4.357h7.556l-.038 4.357ZM2.892 8.832l21.86-7.17 4.125 12.26-7.402.077a5.753 5.753 0 0 0 .077-3.856c-1.003-3.046-4.318-4.742-7.364-3.74-1.465.502-2.699 1.504-3.393 2.93a6.004 6.004 0 0 0-.347 4.473c.039.077.039.154.077.231H4.55L2.892 8.832ZM19.007 14c.27-.502.309-1.08.154-1.658a2.123 2.123 0 0 0-1.08-1.234c-.423-.193-.847-.27-1.31-.193-.077 0-.154 0-.231.039l-.116.038-.385-1.118.115-.038c.386-.116.617-.579.501-.964-.115-.386-.578-.617-.963-.501l-.116.038v-.154a.809.809 0 0 0-.501-.501 4.546 4.546 0 0 1 2.853.347c1.04.501 1.773 1.388 2.159 2.506a4.182 4.182 0 0 1-.309 3.393h-.77Zm-6.785 0a5.462 5.462 0 0 1-.309-.694 4.385 4.385 0 0 1 .232-3.277 4.292 4.292 0 0 1 2.082-1.967.748.748 0 0 0-.116.694l.038.154c-.54.193-.963.54-1.233 1.041a1.98 1.98 0 0 0-.116 1.62c.193.54.54.964 1.08 1.233.308.155.616.232.963.232.116 0 .232 0 .386-.039.077 0 .116 0 .193-.038l.115-.039.347 1.08h-3.662Zm2.12-3.355c.077-.115.193-.23.309-.27l.347 1.119c-.155.038-.309.038-.425-.039-.154-.077-.23-.193-.308-.347 0-.154 0-.308.077-.463Zm3.007 2.93-.347-1.117c.155-.04.309-.04.425.038.154.077.23.193.308.347.077.308-.116.617-.386.733ZM1.542 36.554V15.54h28.955v6.785h-7.673c-.81 0-1.426.656-1.426 1.427v4.588c0 .81.655 1.426 1.426 1.426h7.634v6.786H1.542Z"
  })));
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Wallet(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread$1({
    component: SvgWallet,
    viewBox: "0 0 32 39"
  }, props));
}

var _path;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgSettings = function SvgSettings(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    width: 30,
    height: 30,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M17.754 1.856c-1.042-2.415-4.466-2.415-5.508 0l-.415.96a1 1 0 0 1-1.428.465l-.9-.534C7.24 1.407 4.47 3.42 5.045 5.985l.229 1.021a1 1 0 0 1-.883 1.215l-1.042.098c-2.618.245-3.676 3.501-1.702 5.238l.786.692a1 1 0 0 1 0 1.502l-.786.691c-1.974 1.738-.916 4.994 1.702 5.24l1.042.097a1 1 0 0 1 .883 1.215l-.23 1.021c-.575 2.566 2.195 4.578 4.457 3.238l.9-.534a1 1 0 0 1 1.429.464l.415.961c1.042 2.415 4.466 2.415 5.508 0l.415-.96a1 1 0 0 1 1.428-.465l.9.534c2.263 1.34 5.033-.672 4.457-3.238l-.229-1.021a1 1 0 0 1 .883-1.215l1.042-.098c2.618-.245 3.676-3.501 1.702-5.239l-.786-.691a1 1 0 0 1 0-1.502l.786-.692c1.974-1.737.916-4.993-1.702-5.238l-1.042-.098a1 1 0 0 1-.883-1.215l.23-1.021c.575-2.566-2.195-4.578-4.457-3.238l-.901.534a1 1 0 0 1-1.428-.464l-.415-.961Zm-3.672.792c.347-.804 1.488-.804 1.836 0l.415.962A3 3 0 0 0 20.616 5l.901-.533c.755-.447 1.678.224 1.486 1.079l-.23 1.022a3 3 0 0 0 2.648 3.643l1.042.098c.873.082 1.226 1.167.568 1.746l-.786.692a3 3 0 0 0 0 4.504l.786.692c.658.579.305 1.664-.568 1.746l-1.042.098a3 3 0 0 0-2.647 3.643l.229 1.022c.192.855-.732 1.526-1.486 1.08l-.9-.535a3 3 0 0 0-4.284 1.392l-.415.962c-.348.804-1.489.804-1.836 0l-.415-.962a3 3 0 0 0-4.283-1.392l-.901.534c-.755.447-1.678-.224-1.486-1.079l.23-1.022a3 3 0 0 0-2.648-3.643l-1.042-.098c-.873-.082-1.226-1.167-.568-1.746l.786-.692a3 3 0 0 0 0-4.504l-.786-.692c-.658-.579-.305-1.664.568-1.746l1.042-.098A3 3 0 0 0 7.226 6.57l-.229-1.022c-.192-.855.731-1.526 1.486-1.08l.9.534a3 3 0 0 0 4.284-1.391l.415-.962ZM11 15a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z",
    fill: "current",
    stroke: "transparent"
  })));
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Settings(props) {
  return /*#__PURE__*/jsxRuntime.jsx(material.SvgIcon, _objectSpread({
    component: SvgSettings,
    viewBox: "0 0 30 30"
  }, props));
}

exports.Chia = Keys$1;
exports.Farm = Farm$1;
exports.Farming = Farming;
exports.FullNode = FullNode;
exports.Home = Home;
exports.Keys = Keys;
exports.LinkSmall = LinkSmall;
exports.NFTs = NFTs;
exports.NFTsSmall = NFTsSmall;
exports.Offers = Offers;
exports.OffersSmall = OffersSmall;
exports.Plot = Plot;
exports.PlotHero = PlotHero;
exports.Plots = Plots;
exports.Pool = Farm;
exports.Pooling = Pooling;
exports.Settings = Settings;
exports.Status = Status$1;
exports.Tokens = Tokens;
exports.Trade = Trade;
exports.Wallet = Wallet;
//# sourceMappingURL=index.js.map
