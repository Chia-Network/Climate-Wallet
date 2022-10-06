import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import EventEmitter from 'events';
import debug from 'debug';
import { randomBytes } from 'crypto-browserify';
import JSONbig from 'json-bigint';
import { transform, isArray, camelCase, isObject, snakeCase, omitBy, isUndefined } from 'lodash';
import BigNumber from 'bignumber.js';
import _wrapNativeSuper from '@babel/runtime/helpers/wrapNativeSuper';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _get from '@babel/runtime/helpers/get';
import { bech32m } from 'bech32';

var ServiceName;

(function (ServiceName) {
  ServiceName["WALLET"] = "chia_wallet";
  ServiceName["FULL_NODE"] = "chia_full_node";
  ServiceName["FARMER"] = "chia_farmer";
  ServiceName["HARVESTER"] = "chia_harvester";
  ServiceName["SIMULATOR"] = "chia_full_node_simulator";
  ServiceName["DAEMON"] = "daemon";
  ServiceName["PLOTTER"] = "chia_plotter";
  ServiceName["TIMELORD"] = "chia_timelord";
  ServiceName["INTRODUCER"] = "chia_introducer";
  ServiceName["EVENTS"] = "wallet_ui";
})(ServiceName || (ServiceName = {}));
var ServiceName$1 = ServiceName;

function toCamelCase(object) {
  return transform(object, function (acc, value, key, target) {
    var newKey = isArray(target) || key.indexOf('_') === -1 ? key : camelCase(key);
    acc[newKey] = isObject(value) ? toCamelCase(value) : value;
  });
}

function toSnakeCase(object) {
  return transform(object, function (acc, value, key, target) {
    var newKey = isArray(target) ? key : snakeCase(key);
    acc[newKey] = isObject(value) ? toSnakeCase(value) : value;
  });
}

function toSafeNumber(object) {
  return transform(object, function (acc, value, key) {
    if (value instanceof BigNumber && value.isInteger() && value.isLessThanOrEqualTo(Number.MAX_SAFE_INTEGER)) {
      acc[key] = value.toNumber();
    } else {
      acc[key] = value;
    }
  });
}

var Message = /*#__PURE__*/function () {
  function Message(options) {
    _classCallCheck(this, Message);

    var command = options.command,
        origin = options.origin,
        destination = options.destination,
        _options$data = options.data,
        data = _options$data === void 0 ? {} : _options$data,
        _options$ack = options.ack,
        ack = _options$ack === void 0 ? false : _options$ack,
        _options$requestId = options.requestId,
        requestId = _options$requestId === void 0 ? randomBytes(32).toString('hex') : _options$requestId;
    this.command = command;
    this.origin = origin;
    this.destination = destination;
    this.data = data;
    this.ack = ack;
    this.requestId = requestId;
  }

  _createClass(Message, [{
    key: "toJSON",
    value: function toJSON(useSnakeCase) {
      var data = {
        command: this.command,
        data: this.data,
        origin: this.origin,
        destination: this.destination,
        ack: this.ack,
        request_id: this.requestId
      };
      var formatedData = useSnakeCase ? toSnakeCase(data) : data;
      return JSONbig.stringify(formatedData);
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json, useCamelCase) {
      var _toSafeNumber = toSafeNumber(JSONbig.parse(json)),
          command = _toSafeNumber.command,
          data = _toSafeNumber.data,
          origin = _toSafeNumber.origin,
          destination = _toSafeNumber.destination,
          ack = _toSafeNumber.ack,
          requestId = _toSafeNumber.request_id;

      return new Message({
        command: command,
        data: useCamelCase ? toCamelCase(data) : data,
        origin: origin,
        destination: destination,
        ack: ack,
        requestId: requestId
      });
    }
  }]);

  return Message;
}();

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Service = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Service, _EventEmitter);

  var _super = _createSuper$e(Service);

  function Service(name, client) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var onInit = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, Service);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "handleMessage", function (message) {
      if (message.origin !== _this.name) {
        return;
      }

      _this.processMessage(message);
    });

    var origin = options.origin,
        skipAddService = options.skipAddService;
    _this._client = client;
    _this._name = name;
    _this._origin = origin !== null && origin !== void 0 ? origin : client.origin;

    if (!skipAddService) {
      client.addService(_assertThisInitialized(_this));
    }

    client.on('message', _this.handleMessage);
    _this._readyPromise = new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(resolve, reject) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;

                          if (!onInit) {
                            _context.next = 4;
                            break;
                          }

                          _context.next = 4;
                          return onInit();

                        case 4:
                          resolve(null);
                          return _context.abrupt("return");

                        case 8:
                          _context.prev = 8;
                          _context.t0 = _context["catch"](0);
                          reject(_context.t0);

                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[0, 8]]);
                })));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    return _this;
  }

  _createClass(Service, [{
    key: "whenReady",
    value: function () {
      var _whenReady = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(callback) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._readyPromise;

              case 2:
                if (!callback) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", callback());

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function whenReady(_x3) {
        return _whenReady.apply(this, arguments);
      }

      return whenReady;
    }()
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "client",
    get: function get() {
      return this._client;
    }
  }, {
    key: "origin",
    get: function get() {
      return this._origin;
    }
  }, {
    key: "register",
    value: function register() {
      return this._client.registerService(this.name);
    }
  }, {
    key: "processMessage",
    value: function processMessage(message) {
      if (message.command) {
        this.emit(message.command, message.data, message);
      }
    }
  }, {
    key: "command",
    value: function () {
      var _command2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(_command) {
        var data,
            ack,
            timeout,
            disableFormat,
            client,
            origin,
            name,
            updatedData,
            response,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                data = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                ack = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false;
                timeout = _args4.length > 3 ? _args4[3] : undefined;
                disableFormat = _args4.length > 4 ? _args4[4] : undefined;
                client = this.client, origin = this.origin, name = this.name;

                if (_command) {
                  _context4.next = 7;
                  break;
                }

                throw new Error('Command is required parameter');

              case 7:
                // remove undefined values from root data
                updatedData = omitBy(data, isUndefined);
                _context4.next = 10;
                return client.send(new Message({
                  origin: origin,
                  destination: name,
                  command: _command,
                  data: updatedData,
                  ack: ack
                }), timeout, disableFormat);

              case 10:
                response = _context4.sent;
                return _context4.abrupt("return", response === null || response === void 0 ? void 0 : response.data);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function command(_x4) {
        return _command2.apply(this, arguments);
      }

      return command;
    }()
  }, {
    key: "ping",
    value: function () {
      var _ping = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.command('ping', undefined, undefined, 1000));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function ping() {
        return _ping.apply(this, arguments);
      }

      return ping;
    }()
  }, {
    key: "onCommand",
    value: function onCommand(command, callback, processData) {
      var _this2 = this;

      function handleCommand(data, message) {
        var updatedData = processData ? processData(data, message) : data;
        callback(updatedData, message);
      }

      this.on(command, handleCommand);
      return function () {
        _this2.off(command, handleCommand);
      };
    }
  }, {
    key: "onStateChanged",
    value: function onStateChanged(state, callback, processData) {
      return this.onCommand('state_changed', function (data, message) {
        if (data.state === state) {
          callback(data, message);
        }
      }, processData);
    }
  }]);

  return Service;
}(EventEmitter);

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Daemon = /*#__PURE__*/function (_Service) {
  _inherits(Daemon, _Service);

  var _super = _createSuper$d(Daemon);

  function Daemon(client, options) {
    _classCallCheck(this, Daemon);

    return _super.call(this, ServiceName$1.DAEMON, client, _objectSpread$4({
      skipAddService: true
    }, options));
  }

  _createClass(Daemon, [{
    key: "registerService",
    value: function registerService(service) {
      return this.command('register_service', {
        service: service
      });
    }
  }, {
    key: "startService",
    value: function startService(service, testing) {
      return this.command('start_service', {
        service: service,
        testing: testing ? true : undefined
      });
    }
  }, {
    key: "stopService",
    value: function stopService(service) {
      return this.command('stop_service', {
        service: service
      });
    }
  }, {
    key: "isRunning",
    value: function isRunning(service) {
      return this.command('is_running', {
        service: service
      });
    }
  }, {
    key: "keyringStatus",
    value: function keyringStatus() {
      return this.command('keyring_status');
    }
  }, {
    key: "setKeyringPassphrase",
    value: function setKeyringPassphrase(currentPassphrase, newPassphrase, passphraseHint, savePassphrase) {
      return this.command('set_keyring_passphrase', {
        currentPassphrase: currentPassphrase,
        newPassphrase: newPassphrase,
        passphraseHint: passphraseHint,
        savePassphrase: savePassphrase
      });
    }
  }, {
    key: "removeKeyringPassphrase",
    value: function removeKeyringPassphrase(currentPassphrase) {
      return this.command('remove_keyring_passphrase', {
        currentPassphrase: currentPassphrase
      });
    }
  }, {
    key: "migrateKeyring",
    value: function migrateKeyring(passphrase, passphraseHint, savePassphrase, cleanupLegacyKeyring) {
      return this.command('migrate_keyring', {
        passphrase: passphrase,
        passphraseHint: passphraseHint,
        savePassphrase: savePassphrase,
        cleanupLegacyKeyring: cleanupLegacyKeyring
      });
    }
  }, {
    key: "unlockKeyring",
    value: function unlockKeyring(key) {
      return this.command('unlock_keyring', {
        key: key
      });
    }
  }, {
    key: "getPlotters",
    value: function getPlotters() {
      return this.command('get_plotters');
    }
  }, {
    key: "stopPlotting",
    value: function stopPlotting(id) {
      return this.command('stop_plotting', {
        id: id,
        service: ServiceName$1.PLOTTER
      });
    }
  }, {
    key: "startPlotting",
    value: function startPlotting(plotterName, // plotterName
    k, // plotSize
    n, // plotCount
    t, // workspaceLocation
    t2, // workspaceLocation2
    d, // finalLocation
    b, // maxRam
    u, // numBuckets
    r, // numThreads,
    queue, // queue
    a, // fingerprint
    parallel, // parallel
    delay, // delay
    e, // disableBitfieldPlotting
    x, // excludeFinalDir
    overrideK, //overrideK
    f, // farmerPublicKey
    p, // poolPublicKey
    c, // poolContractAddress
    m, // bladebitDisableNUMA,
    w, // bladebitWarmStart,
    v, // madmaxNumBucketsPhase3,
    G, // madmaxTempToggle,
    K // madmaxThreadMultiplier,
    ) {
      var args = {
        service: ServiceName$1.PLOTTER,
        plotter: plotterName,
        k: k,
        n: n,
        t: t,
        t2: t2,
        d: d,
        b: b,
        u: u,
        r: r,
        queue: queue,
        parallel: parallel,
        delay: delay,
        e: e,
        x: x,
        overrideK: overrideK
      };

      if (a) {
        args.a = a;
      }

      if (f) {
        args.f = f;
      }

      if (p) {
        args.p = p;
      }

      if (c) {
        args.c = c;
      }

      if (m) {
        // bladebitDisableNUMA
        args.m = m;
      }

      if (w) {
        // bladebitWarmStart
        args.w = w;
      }

      if (v) {
        // madmaxNumBucketsPhase3
        args.v = v;
      }

      if (G) {
        // madmaxTempToggle
        args.G = G;
      }

      if (K) {
        // madmaxThreadMultiplier
        args.K = K;
      }

      return this.command('start_plotting', args, undefined, undefined, true);
    }
  }, {
    key: "exit",
    value: function exit() {
      return this.command('exit');
    }
  }, {
    key: "onKeyringStatusChanged",
    value: function onKeyringStatusChanged(callback, processData) {
      return this.onStateChanged('keyring_status_changed', callback, processData);
    }
  }]);

  return Daemon;
}(Service);

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ErrorData = /*#__PURE__*/function (_Error) {
  _inherits(ErrorData, _Error);

  var _super = _createSuper$c(ErrorData);

  function ErrorData(message, data) {
    var _this;

    _classCallCheck(this, ErrorData);

    _this = _super.call(this, message);
    _this.data = data;
    return _this;
  }

  return _createClass(ErrorData);
}( /*#__PURE__*/_wrapNativeSuper(Error));

var ConnectionState;

(function (ConnectionState) {
  ConnectionState["CONNECTED"] = "CONNECTED";
  ConnectionState["CONNECTING"] = "CONNECTING";
  ConnectionState["DISCONNECTED"] = "DISCONNECTED";
})(ConnectionState || (ConnectionState = {}));
var ConnectionState$1 = ConnectionState;

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var log = debug('chia-api:client');

var Client = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Client, _EventEmitter);

  var _super = _createSuper$b(Client);

  function Client(options) {
    var _this;

    _classCallCheck(this, Client);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "connected", false);

    _defineProperty(_assertThisInitialized(_this), "requests", new Map());

    _defineProperty(_assertThisInitialized(_this), "services", new Set());

    _defineProperty(_assertThisInitialized(_this), "started", new Set());

    _defineProperty(_assertThisInitialized(_this), "connectedPromise", null);

    _defineProperty(_assertThisInitialized(_this), "closed", false);

    _defineProperty(_assertThisInitialized(_this), "state", ConnectionState$1.DISCONNECTED);

    _defineProperty(_assertThisInitialized(_this), "reconnectAttempt", 0);

    _defineProperty(_assertThisInitialized(_this), "handleOpen", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.connected = true;

              _this.started.clear();

              _this.emit('state', _this.getState());

              _this.changeState(ConnectionState$1.CONNECTED);

              _context.next = 6;
              return _this.registerService(ServiceName$1.EVENTS);

            case 6:
              _context.next = 8;
              return _this.startServices();

            case 8:
              if (_this.connectedPromiseResponse) {
                _this.connectedPromiseResponse.resolve();

                _this.connectedPromiseResponse = null;
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.connected = false;
      _this.connectedPromise = null;

      _this.requests.forEach(function (request) {
        request.reject(new Error("Connection closed"));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleError", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(error) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this.connectedPromiseResponse) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 3;
                return sleep(1000);

              case 3:
                _this.connect(true);

                return _context2.abrupt("return");

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "handleMessage", function (data) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          camelCase = _assertThisInitialize.options.camelCase;

      log('Received message', data.toString());
      var message = Message.fromJSON(data, camelCase);
      var requestId = message.requestId;

      if (_this.requests.has(requestId)) {
        var _message$data, _message$data2;

        var _this$requests$get = _this.requests.get(requestId),
            resolve = _this$requests$get.resolve,
            reject = _this$requests$get.reject;

        _this.requests["delete"](requestId);

        if ((_message$data = message.data) !== null && _message$data !== void 0 && _message$data.error) {
          var errorMessage = message.data.error;

          if (errorMessage == '13') {
            errorMessage = '[Error 13] Permission denied. You are trying to access a file/directory without having the necessary permissions. Most likely one of the plot folders in your config.yaml has an issue.';
          } else if (errorMessage == '22') {
            errorMessage = '[Error 22] File not found. Most likely one of the plot folders in your config.yaml has an issue.';
          }

          log("Request ".concat(requestId, " rejected"), errorMessage);
          reject(new ErrorData(errorMessage, message.data));
          return;
        }

        if (((_message$data2 = message.data) === null || _message$data2 === void 0 ? void 0 : _message$data2.success) === false) {
          log("Request ".concat(requestId, " rejected"), 'Unknown error message');
          reject(new ErrorData("Request ".concat(requestId, " failed: ").concat(JSON.stringify(message.data)), message.data));
          return;
        }

        resolve(message);
      } else {
        // other messages can be events like get_harvesters
        _this.emit('message', message);
      }
    });

    _this.options = _objectSpread$3({
      timeout: 60 * 1000 * 10,
      // 10 minutes
      camelCase: true,
      backupHost: 'https://backup.chia.net',
      debug: false,
      services: []
    }, options);
    var url = _this.options.url;

    if (!url.startsWith('wss://')) {
      throw new Error('You need to use wss (WebSocket Secure) protocol');
    }

    _this.daemon = new Daemon(_assertThisInitialized(_this));

    _this.options.services.forEach(function (service) {
      _this.services.add(service);
    });

    if (_this.options.services.length) {
      _this.connect();
    }

    return _this;
  }

  _createClass(Client, [{
    key: "getState",
    value: function getState() {
      return {
        state: this.state,
        attempt: this.reconnectAttempt,
        startingService: this.startingService,
        startedServices: Array.from(this.started)
      };
    }
  }, {
    key: "changeState",
    value: function changeState(state) {
      log("Connection state changed: ".concat(state));

      if (state === ConnectionState$1.CONNECTING && state === this.state) {
        this.reconnectAttempt += 1;
        log("Reconnect attempt ".concat(this.reconnectAttempt));
      } else {
        this.reconnectAttempt = 0;
      }

      if (state !== ConnectionState$1.CONNECTING) {
        this.startingService = undefined;
      }

      this.state = state;
      this.emit('state', this.getState());
    }
  }, {
    key: "onStateChange",
    value: function onStateChange(callback) {
      var _this2 = this;

      this.on('state', callback);
      return function () {
        _this2.off('state', callback);
      };
    }
  }, {
    key: "origin",
    get: function get() {
      return ServiceName$1.EVENTS;
    }
  }, {
    key: "backupHost",
    get: function get() {
      return this.options.backupHost;
    }
  }, {
    key: "debug",
    get: function get() {
      return this.options.debug;
    }
  }, {
    key: "isStarted",
    value: function isStarted(serviceName) {
      return this.started.has(serviceName);
    }
  }, {
    key: "addService",
    value: function addService(service) {
      if (!this.services.has(service.name)) {
        this.services.add(service.name);
      }
    }
  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(reconnect) {
        var _this3 = this;

        var _this$options, url, key, cert, WebSocket, ws;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.closed) {
                  _context3.next = 3;
                  break;
                }

                log('Client is permanently closed');
                return _context3.abrupt("return");

              case 3:
                if (!(this.connectedPromise && !reconnect)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", this.connectedPromise);

              case 5:
                _this$options = this.options, url = _this$options.url, key = _this$options.key, cert = _this$options.cert, WebSocket = _this$options.webSocket;

                if (url) {
                  _context3.next = 10;
                  break;
                }

                throw new Error('Url is not defined');

              case 10:
                if (key) {
                  _context3.next = 14;
                  break;
                }

                throw new Error('Key is not defined');

              case 14:
                if (cert) {
                  _context3.next = 18;
                  break;
                }

                throw new Error('Cert is not defined');

              case 18:
                if (WebSocket) {
                  _context3.next = 20;
                  break;
                }

                throw new Error('WebSocket is not defined');

              case 20:
                this.changeState(ConnectionState$1.CONNECTING);
                log("Connecting to ".concat(url));
                ws = new WebSocket(url, {
                  key: key,
                  cert: cert,
                  rejectUnauthorized: false
                });

                if (!reconnect) {
                  this.connectedPromise = new Promise(function (resolve, reject) {
                    _this3.connectedPromiseResponse = {
                      resolve: resolve,
                      reject: reject
                    };
                  });
                }

                ws.on('open', this.handleOpen);
                ws.on('close', this.handleClose);
                ws.on('error', this.handleError);
                ws.on('message', this.handleMessage);
                this.ws = ws;
                return _context3.abrupt("return", this.connectedPromise);

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function connect(_x2) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "startService",
    value: function () {
      var _startService = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(serviceName, disableWait) {
        var response, _yield$this$send, pingResponse;

        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.started.has(serviceName)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                _context4.next = 4;
                return this.daemon.isRunning(serviceName);

              case 4:
                response = _context4.sent;

                if (response.isRunning) {
                  _context4.next = 9;
                  break;
                }

                log("Starting service: ".concat(serviceName));
                _context4.next = 9;
                return this.daemon.startService(serviceName);

              case 9:
                // wait for service initialisation
                log("Waiting for ping from service: ".concat(serviceName));

                if (disableWait) {
                  _context4.next = 28;
                  break;
                }

              case 11:

                _context4.prev = 12;
                _context4.next = 15;
                return this.send(new Message({
                  command: 'ping',
                  origin: this.origin,
                  destination: serviceName
                }), 1000);

              case 15:
                _yield$this$send = _context4.sent;
                pingResponse = _yield$this$send.data;

                if (!pingResponse.success) {
                  _context4.next = 19;
                  break;
                }

                return _context4.abrupt("break", 27);

              case 19:
                _context4.next = 25;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](12);
                _context4.next = 25;
                return sleep(1000);

              case 25:
                _context4.next = 11;
                break;

              case 27:
                log("Service: ".concat(serviceName, " started"));

              case 28:
                this.started.add(serviceName);
                this.emit('state', this.getState());

              case 30:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[12, 21]]);
      }));

      function startService(_x3, _x4) {
        return _startService.apply(this, arguments);
      }

      return startService;
    }()
  }, {
    key: "startServices",
    value: function () {
      var _startServices = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
        var _this4 = this;

        var services;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.connected) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                services = Array.from(this.services);
                _context6.next = 5;
                return Promise.all(services.map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(serviceName) {
                    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            return _context5.abrupt("return", _this4.startService(serviceName));

                          case 1:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x5) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function startServices() {
        return _startServices.apply(this, arguments);
      }

      return startServices;
    }()
  }, {
    key: "stopService",
    value: function () {
      var _stopService = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(serviceName) {
        var response, _yield$this$send2, pingResponse;

        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.started.has(serviceName)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return");

              case 2:
                _context7.next = 4;
                return this.daemon.isRunning(serviceName);

              case 4:
                response = _context7.sent;

                if (!response.isRunning) {
                  _context7.next = 9;
                  break;
                }

                log("Closing down service: ".concat(serviceName));
                _context7.next = 9;
                return this.daemon.stopService(serviceName);

              case 9:
                // wait for service initialisation
                log("Waiting for service: ".concat(serviceName));

              case 10:

                _context7.prev = 11;
                _context7.next = 14;
                return this.send(new Message({
                  command: 'ping',
                  origin: this.origin,
                  destination: serviceName
                }), 1000);

              case 14:
                _yield$this$send2 = _context7.sent;
                pingResponse = _yield$this$send2.data;

                if (!pingResponse.success) {
                  _context7.next = 19;
                  break;
                }

                _context7.next = 19;
                return sleep(1000);

              case 19:
                _context7.next = 24;
                break;

              case 21:
                _context7.prev = 21;
                _context7.t0 = _context7["catch"](11);
                return _context7.abrupt("break", 26);

              case 24:
                _context7.next = 10;
                break;

              case 26:
                log("Service: ".concat(serviceName, " stopped"));
                this.started["delete"](serviceName);
                this.emit('state', this.getState());

              case 29:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[11, 21]]);
      }));

      function stopService(_x6) {
        return _stopService.apply(this, arguments);
      }

      return stopService;
    }()
  }, {
    key: "registerService",
    value: function registerService(service) {
      return this.daemon.registerService(service);
    }
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(message, timeout, disableFormat) {
        var _this5 = this;

        var connected, _this$options2, defaultTimeout, camelCase, currentTimeout;

        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                connected = this.connected, _this$options2 = this.options, defaultTimeout = _this$options2.timeout, camelCase = _this$options2.camelCase;
                currentTimeout = timeout !== null && timeout !== void 0 ? timeout : defaultTimeout;

                if (connected) {
                  _context8.next = 6;
                  break;
                }

                log('API is not connected trying to connect');
                _context8.next = 6;
                return this.connect();

              case 6:
                return _context8.abrupt("return", new Promise(function (resolve, reject) {
                  var requestId = message.requestId;

                  _this5.requests.set(requestId, {
                    resolve: resolve,
                    reject: reject
                  });

                  var value = message.toJSON(camelCase && !disableFormat);
                  log('Sending message', value);

                  _this5.ws.send(value);

                  if (currentTimeout) {
                    setTimeout(function () {
                      if (_this5.requests.has(requestId)) {
                        _this5.requests["delete"](requestId);

                        reject(new ErrorData("The request ".concat(requestId, " has timed out ").concat(currentTimeout / 1000, " seconds.")));
                      }
                    }, currentTimeout);
                  }
                }));

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function send(_x7, _x8, _x9) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(force) {
        var _this6 = this;

        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (force) {
                  this.closed = true;
                }

                if (this.connected) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt("return");

              case 3:
                _context10.next = 5;
                return Promise.all(Array.from(this.started).map( /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(serviceName) {
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            _context9.next = 2;
                            return _this6.stopService(serviceName);

                          case 2:
                            return _context9.abrupt("return", _context9.sent);

                          case 3:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x11) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 5:
                _context10.next = 7;
                return this.daemon.exit();

              case 7:
                this.ws.close(); // this.changeState(ConnectionState.DISCONNECTED);

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function close(_x10) {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return Client;
}(EventEmitter);

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Events = /*#__PURE__*/function (_Service) {
  _inherits(Events, _Service);

  var _super = _createSuper$a(Events);

  function Events(client, options) {
    _classCallCheck(this, Events);

    return _super.call(this, ServiceName$1.EVENTS, client, _objectSpread$2({
      skipAddService: true
    }, options));
  }

  return _createClass(Events);
}(Service);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FARMING_INFO_MAX_ITEMS = 1000;

var Farmer = /*#__PURE__*/function (_Service) {
  _inherits(Farmer, _Service);

  var _super = _createSuper$9(Farmer);

  // last FARMING_INFO_MAX_ITEMS farming info
  function Farmer(client, options) {
    var _this;

    _classCallCheck(this, Farmer);

    _this = _super.call(this, ServiceName$1.FARMER, client, options, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.onNewFarmingInfo(function (data) {
                var farmingInfo = data.farmingInfo;

                if (farmingInfo) {
                  _this.farmingInfo = [farmingInfo].concat(_toConsumableArray(_this.farmingInfo)).slice(0, FARMING_INFO_MAX_ITEMS);

                  _this.emit('farming_info_changed', _this.farmingInfo, null);
                }
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "farmingInfo", []);

    return _this;
  }

  _createClass(Farmer, [{
    key: "getFarmingInfo",
    value: function () {
      var _getFarmingInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.whenReady();

              case 2:
                return _context2.abrupt("return", this.farmingInfo);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getFarmingInfo() {
        return _getFarmingInfo.apply(this, arguments);
      }

      return getFarmingInfo;
    }()
  }, {
    key: "getRewardTargets",
    value: function () {
      var _getRewardTargets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(searchForPrivateKey) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.command('get_reward_targets', {
                  searchForPrivateKey: searchForPrivateKey
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRewardTargets(_x) {
        return _getRewardTargets.apply(this, arguments);
      }

      return getRewardTargets;
    }()
  }, {
    key: "setRewardTargets",
    value: function () {
      var _setRewardTargets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(farmerTarget, poolTarget) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.command('set_reward_targets', {
                  farmerTarget: farmerTarget,
                  poolTarget: poolTarget
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setRewardTargets(_x2, _x3) {
        return _setRewardTargets.apply(this, arguments);
      }

      return setRewardTargets;
    }()
  }, {
    key: "getSignagePoints",
    value: function () {
      var _getSignagePoints = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.command('get_signage_points'));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getSignagePoints() {
        return _getSignagePoints.apply(this, arguments);
      }

      return getSignagePoints;
    }()
  }, {
    key: "getConnections",
    value: function () {
      var _getConnections = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6() {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.command('get_connections'));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getConnections() {
        return _getConnections.apply(this, arguments);
      }

      return getConnections;
    }()
  }, {
    key: "openConnection",
    value: function () {
      var _openConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(host, port) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.command('open_connection', {
                  host: host,
                  port: port
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function openConnection(_x4, _x5) {
        return _openConnection.apply(this, arguments);
      }

      return openConnection;
    }()
  }, {
    key: "closeConnection",
    value: function () {
      var _closeConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(nodeId) {
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.command('close_connection', {
                  nodeId: nodeId
                }));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function closeConnection(_x6) {
        return _closeConnection.apply(this, arguments);
      }

      return closeConnection;
    }()
  }, {
    key: "getPoolState",
    value: function () {
      var _getPoolState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9() {
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this.command('get_pool_state'));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getPoolState() {
        return _getPoolState.apply(this, arguments);
      }

      return getPoolState;
    }()
  }, {
    key: "setPayoutInstructions",
    value: function () {
      var _setPayoutInstructions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(launcherId, payoutInstructions) {
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", this.command('set_payout_instructions', {
                  launcherId: launcherId,
                  payoutInstructions: payoutInstructions
                }));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function setPayoutInstructions(_x7, _x8) {
        return _setPayoutInstructions.apply(this, arguments);
      }

      return setPayoutInstructions;
    }()
  }, {
    key: "getHarvesters",
    value: function () {
      var _getHarvesters = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11() {
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this.command('get_harvesters'));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getHarvesters() {
        return _getHarvesters.apply(this, arguments);
      }

      return getHarvesters;
    }()
  }, {
    key: "getHarvesterPlotsValid",
    value: function () {
      var _getHarvesterPlotsValid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(nodeId) {
        var page,
            pageSize,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                page = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 0;
                pageSize = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : 10;
                return _context12.abrupt("return", this.command('get_harvester_plots_valid', {
                  nodeId: nodeId,
                  page: page,
                  pageSize: pageSize
                }));

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getHarvesterPlotsValid(_x9) {
        return _getHarvesterPlotsValid.apply(this, arguments);
      }

      return getHarvesterPlotsValid;
    }()
  }, {
    key: "getHarvesterPlotsInvalid",
    value: function () {
      var _getHarvesterPlotsInvalid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(nodeId) {
        var page,
            pageSize,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                page = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 0;
                pageSize = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 10;
                return _context13.abrupt("return", this.command('get_harvester_plots_invalid', {
                  nodeId: nodeId,
                  page: page,
                  pageSize: pageSize
                }));

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getHarvesterPlotsInvalid(_x10) {
        return _getHarvesterPlotsInvalid.apply(this, arguments);
      }

      return getHarvesterPlotsInvalid;
    }()
  }, {
    key: "getHarvesterPlotsKeysMissing",
    value: function () {
      var _getHarvesterPlotsKeysMissing = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(nodeId) {
        var page,
            pageSize,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                page = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 0;
                pageSize = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 10;
                return _context14.abrupt("return", this.command('get_harvester_plots_keys_missing', {
                  nodeId: nodeId,
                  page: page,
                  pageSize: pageSize
                }));

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function getHarvesterPlotsKeysMissing(_x11) {
        return _getHarvesterPlotsKeysMissing.apply(this, arguments);
      }

      return getHarvesterPlotsKeysMissing;
    }()
  }, {
    key: "getHarvesterPlotsDuplicates",
    value: function () {
      var _getHarvesterPlotsDuplicates = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(nodeId) {
        var page,
            pageSize,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                page = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 0;
                pageSize = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : 10;
                return _context15.abrupt("return", this.command('get_harvester_plots_duplicates', {
                  nodeId: nodeId,
                  page: page,
                  pageSize: pageSize
                }));

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function getHarvesterPlotsDuplicates(_x12) {
        return _getHarvesterPlotsDuplicates.apply(this, arguments);
      }

      return getHarvesterPlotsDuplicates;
    }()
  }, {
    key: "getHarvestersSummary",
    value: function () {
      var _getHarvestersSummary = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16() {
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", this.command('get_harvesters_summary'));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function getHarvestersSummary() {
        return _getHarvestersSummary.apply(this, arguments);
      }

      return getHarvestersSummary;
    }()
  }, {
    key: "getPoolLoginLink",
    value: function () {
      var _getPoolLoginLink = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(launcherId) {
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                return _context17.abrupt("return", this.command('get_pool_login_link', {
                  launcherId: launcherId
                }));

              case 1:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function getPoolLoginLink(_x13) {
        return _getPoolLoginLink.apply(this, arguments);
      }

      return getPoolLoginLink;
    }()
  }, {
    key: "onConnections",
    value: function onConnections(callback, processData) {
      return this.onCommand('get_connections', callback, processData);
    }
  }, {
    key: "onNewFarmingInfo",
    value: function onNewFarmingInfo(callback, processData) {
      return this.onCommand('new_farming_info', callback, processData);
    }
  }, {
    key: "onNewPlots",
    value: function onNewPlots(callback, processData) {
      return this.onCommand('new_plots', callback, processData);
    }
  }, {
    key: "onNewSignagePoint",
    value: function onNewSignagePoint(callback, processData) {
      return this.onCommand('new_signage_point', callback, processData);
    }
  }, {
    key: "onHarvesterChanged",
    value: function onHarvesterChanged(callback, processData) {
      return this.onCommand('get_harvesters', callback, processData);
    }
  }, {
    key: "onHarvesterUpdated",
    value: function onHarvesterUpdated(callback, processData) {
      return this.onCommand('harvester_update', callback, processData);
    }
  }, {
    key: "onHarvesterRemoved",
    value: function onHarvesterRemoved(callback, processData) {
      return this.onCommand('harvester_removed', callback, processData);
    }
  }, {
    key: "onRefreshPlots",
    value: function onRefreshPlots(callback, processData) {
      return this.onCommand('refresh_plots', callback, processData);
    }
  }, {
    key: "onFarmingInfoChanged",
    value: function onFarmingInfoChanged(callback, processData) {
      return this.onCommand('farming_info_changed', callback, processData);
    }
  }]);

  return Farmer;
}(Service);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FullNode = /*#__PURE__*/function (_Service) {
  _inherits(FullNode, _Service);

  var _super = _createSuper$8(FullNode);

  function FullNode(client, options) {
    _classCallCheck(this, FullNode);

    return _super.call(this, ServiceName$1.FULL_NODE, client, options);
  }

  _createClass(FullNode, [{
    key: "getBlockRecords",
    value: function () {
      var _getBlockRecords = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(start, end) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.command('get_block_records', {
                  start: start,
                  end: end
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getBlockRecords(_x, _x2) {
        return _getBlockRecords.apply(this, arguments);
      }

      return getBlockRecords;
    }()
  }, {
    key: "getUnfinishedBlockHeaders",
    value: function () {
      var _getUnfinishedBlockHeaders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.command('get_unfinished_block_headers'));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUnfinishedBlockHeaders() {
        return _getUnfinishedBlockHeaders.apply(this, arguments);
      }

      return getUnfinishedBlockHeaders;
    }()
  }, {
    key: "getBlockchainState",
    value: function () {
      var _getBlockchainState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.command('get_blockchain_state'));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getBlockchainState() {
        return _getBlockchainState.apply(this, arguments);
      }

      return getBlockchainState;
    }()
  }, {
    key: "getConnections",
    value: function () {
      var _getConnections = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.command('get_connections'));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getConnections() {
        return _getConnections.apply(this, arguments);
      }

      return getConnections;
    }()
  }, {
    key: "openConnection",
    value: function () {
      var _openConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(host, port) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.command('open_connection', {
                  host: host,
                  port: port
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function openConnection(_x3, _x4) {
        return _openConnection.apply(this, arguments);
      }

      return openConnection;
    }()
  }, {
    key: "closeConnection",
    value: function () {
      var _closeConnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(nodeId) {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.command('close_connection', {
                  nodeId: nodeId
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function closeConnection(_x5) {
        return _closeConnection.apply(this, arguments);
      }

      return closeConnection;
    }()
  }, {
    key: "getBlock",
    value: function () {
      var _getBlock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(headerHash) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.command('get_block', {
                  headerHash: headerHash
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getBlock(_x6) {
        return _getBlock.apply(this, arguments);
      }

      return getBlock;
    }()
  }, {
    key: "getBlockRecord",
    value: function () {
      var _getBlockRecord = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(headerHash) {
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.command('get_block_record', {
                  headerHash: headerHash
                }));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getBlockRecord(_x7) {
        return _getBlockRecord.apply(this, arguments);
      }

      return getBlockRecord;
    }()
  }, {
    key: "onBlockchainState",
    value: function onBlockchainState(callback, processData) {
      return this.onCommand('get_blockchain_state', callback, processData);
    }
  }, {
    key: "onConnections",
    value: function onConnections(callback, processData) {
      return this.onCommand('get_connections', callback, processData);
    }
  }, {
    key: "onNewBlock",
    value: function onNewBlock(callback, processData) {
      return this.onStateChanged('new_block', callback, processData);
    }
  }, {
    key: "onNewPeak",
    value: function onNewPeak(callback, processData) {
      return this.onStateChanged('new_peak', callback, processData);
    }
  }]);

  return FullNode;
}(Service);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Harvester = /*#__PURE__*/function (_Service) {
  _inherits(Harvester, _Service);

  var _super = _createSuper$7(Harvester);

  function Harvester(client, options) {
    _classCallCheck(this, Harvester);

    return _super.call(this, ServiceName$1.HARVESTER, client, options);
  } // deprecated


  _createClass(Harvester, [{
    key: "getPlots",
    value: function () {
      var _getPlots = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('WARNING: get_plots is deprecated use get_harvesters');
                return _context.abrupt("return", this.command('get_plots'));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPlots() {
        return _getPlots.apply(this, arguments);
      }

      return getPlots;
    }()
  }, {
    key: "refreshPlots",
    value: function () {
      var _refreshPlots = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.command('refresh_plots'));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function refreshPlots() {
        return _refreshPlots.apply(this, arguments);
      }

      return refreshPlots;
    }()
  }, {
    key: "getPlotDirectories",
    value: function () {
      var _getPlotDirectories = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.command('get_plot_directories'));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPlotDirectories() {
        return _getPlotDirectories.apply(this, arguments);
      }

      return getPlotDirectories;
    }()
  }, {
    key: "deletePlot",
    value: function () {
      var _deletePlot = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(filename) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.command('delete_plot', {
                  filename: filename
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deletePlot(_x) {
        return _deletePlot.apply(this, arguments);
      }

      return deletePlot;
    }()
  }, {
    key: "addPlotDirectory",
    value: function () {
      var _addPlotDirectory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(dirname) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.command('add_plot_directory', {
                  dirname: dirname
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addPlotDirectory(_x2) {
        return _addPlotDirectory.apply(this, arguments);
      }

      return addPlotDirectory;
    }()
  }, {
    key: "removePlotDirectory",
    value: function () {
      var _removePlotDirectory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(dirname) {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.command('remove_plot_directory', {
                  dirname: dirname
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removePlotDirectory(_x3) {
        return _removePlotDirectory.apply(this, arguments);
      }

      return removePlotDirectory;
    }()
  }, {
    key: "onRefreshPlots",
    value: function onRefreshPlots(callback, processData) {
      return this.onCommand('refresh_plots', callback, processData);
    }
  }]);

  return Harvester;
}(Service);

var _excluded = ["id", "log", "logNew"];

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function parseProgressUpdate(line, currentProgress) {
  var progress = currentProgress;

  if (line.startsWith("Progress update: ")) {
    progress = Math.min(1, parseFloat(line.substr("Progress update: ".length)));
  }

  return progress;
}

function addPlotProgress(queue) {
  if (!queue) {
    return queue;
  }

  return queue.map(function (item) {
    var log = item.log,
        state = item.state;

    if (state === 'FINISHED') {
      return _objectSpread$1(_objectSpread$1({}, item), {}, {
        progress: 1.0
      });
    } else if (state !== 'RUNNING') {
      return item;
    }

    var progress = item.progress || 0;

    if (log) {
      var lines = log.trim().split(/\r\n|\r|\n/);
      var lastLine = lines[lines.length - 1];
      progress = parseProgressUpdate(lastLine, progress);
    }

    return _objectSpread$1(_objectSpread$1({}, item), {}, {
      progress: progress
    });
  });
}

function mergeQueue(currentQueue, partialQueue, isLogChange) {
  var result = _toConsumableArray(currentQueue);

  partialQueue.forEach(function (item) {
    var id = item.id;
        item.log;
        var logNew = item.logNew,
        rest = _objectWithoutProperties(item, _excluded);

    var index = currentQueue.findIndex(function (queueItem) {
      return queueItem.id === id;
    });

    if (index === -1) {
      result = [].concat(_toConsumableArray(currentQueue), [item]);
      return;
    }

    var originalItem = currentQueue[index];

    var newItem = _objectSpread$1(_objectSpread$1({}, originalItem), rest);

    if (isLogChange && logNew !== undefined) {
      var newLog = originalItem.log ? "".concat(originalItem.log).concat(logNew) : logNew;
      newItem.log = newLog;
    }

    result = Object.assign(_toConsumableArray(result), _defineProperty({}, index, newItem));
  });
  return addPlotProgress(result);
}

var Plotter = /*#__PURE__*/function (_Service) {
  _inherits(Plotter, _Service);

  var _super = _createSuper$6(Plotter);

  function Plotter(client, options) {
    var _this;

    _classCallCheck(this, Plotter);

    return _this = _super.call(this, ServiceName$1.PLOTTER, client, options, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _yield$_this$register, queue;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.onLogChanged(function (data) {
                var queue = data.queue;
                _this.queue = mergeQueue(_this.queue, queue, true);

                _this.emit('queue_changed', _this.queue, null);
              });

              _this.onPlotQueueStateChange(function (data) {
                var queue = data.queue;
                _this.queue = mergeQueue(_this.queue, queue);

                _this.emit('queue_changed', _this.queue, null);
              });

              _context.next = 4;
              return _this.register();

            case 4:
              _yield$_this$register = _context.sent;
              queue = _yield$_this$register.queue;

              if (queue) {
                _this.queue = queue;
              }

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  }
  /*
    startPlotting(
      plotterName, // plotterName
      k, // plotSize
      n, // plotCount
      t, // workspaceLocation
      t2, // workspaceLocation2
      d, // finalLocation
      b, // maxRam
      u, // numBuckets
      r, // numThreads,
      queue, // queue
      a, // fingerprint
      parallel, // parallel
      delay, // delay
      e, // disableBitfieldPlotting
      x, // excludeFinalDir
      overrideK, //overrideK
      f, // farmerPublicKey
      p, // poolPublicKey
      c, // poolContractAddress
      m, // bladebitDisableNUMA,
      w, // bladebitWarmStart,
      v, // madmaxNumBucketsPhase3,
      G, // madmaxTempToggle,
      K, // madmaxThreadMultiplier,
    ) {
      const args = {
        plotter: plotterName,
        k,
        n,
        t,
        t2,
        d,
        b,
        u,
        r,
        queue,
        parallel,
        delay,
        e,
        x,
        overrideK,
      };
    
      if (a) {
        args.a = a;
      }
    
      if (f) {
        args.f = f;
      }
    
      if (p) {
        args.p = p;
      }
    
      if (c) {
        args.c = c;
      }
    
      if (m) { // bladebitDisableNUMA
        args.m = m;
      }
    
      if (w) { // bladebitWarmStart
        args.w = w;
      }
    
      if (v) { // madmaxNumBucketsPhase3
        args.v = v;
      }
    
      if (G) { // madmaxTempToggle
        args.G = G;
      }
    
      if (K) { // madmaxThreadMultiplier
        args.K = K;
      }
  
      return this.command('start_plotting', args, undefined, undefined, true);  
    }
  
    stopPlotting(id: string) {
      return this.command('stop_plotting', {
        id,
      });
    }
    */


  _createClass(Plotter, [{
    key: "getQueue",
    value: function () {
      var _getQueue = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.whenReady();

              case 2:
                return _context2.abrupt("return", this.queue);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getQueue() {
        return _getQueue.apply(this, arguments);
      }

      return getQueue;
    }()
  }, {
    key: "onQueueChanged",
    value: function onQueueChanged(callback, processData) {
      return this.onCommand('queue_changed', callback, processData);
    }
  }, {
    key: "onLogChanged",
    value: function onLogChanged(callback, processData) {
      return this.onStateChanged('log_changed', callback, processData);
    }
  }, {
    key: "onPlotQueueStateChange",
    value: function onPlotQueueStateChange(callback, processData) {
      return this.onStateChanged('state_changed', callback, processData);
    }
  }]);

  return Plotter;
}(Service);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Wallet = /*#__PURE__*/function (_Service) {
  _inherits(Wallet, _Service);

  var _super = _createSuper$5(Wallet);

  function Wallet(client, options) {
    _classCallCheck(this, Wallet);

    return _super.call(this, ServiceName$1.WALLET, client, options);
  }

  _createClass(Wallet, [{
    key: "getLoggedInFingerprint",
    value: function () {
      var _getLoggedInFingerprint = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.command('get_logged_in_fingerprint'));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getLoggedInFingerprint() {
        return _getLoggedInFingerprint.apply(this, arguments);
      }

      return getLoggedInFingerprint;
    }()
  }, {
    key: "getWallets",
    value: function () {
      var _getWallets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.command('get_wallets'));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getWallets() {
        return _getWallets.apply(this, arguments);
      }

      return getWallets;
    }()
  }, {
    key: "getTransaction",
    value: function () {
      var _getTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(transactionId) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.command('get_transaction', {
                  transactionId: transactionId
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getTransaction(_x) {
        return _getTransaction.apply(this, arguments);
      }

      return getTransaction;
    }()
  }, {
    key: "getPwStatus",
    value: function () {
      var _getPwStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(walletId) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.command('pw_status', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPwStatus(_x2) {
        return _getPwStatus.apply(this, arguments);
      }

      return getPwStatus;
    }()
  }, {
    key: "pwAbsorbRewards",
    value: function () {
      var _pwAbsorbRewards = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(walletId, fee) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.command('pw_absorb_rewards', {
                  walletId: walletId,
                  fee: fee
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function pwAbsorbRewards(_x3, _x4) {
        return _pwAbsorbRewards.apply(this, arguments);
      }

      return pwAbsorbRewards;
    }()
  }, {
    key: "pwJoinPool",
    value: function () {
      var _pwJoinPool = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(walletId, poolUrl, relativeLockHeight, targetPuzzlehash, fee) {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.command('pw_join_pool', {
                  walletId: walletId,
                  poolUrl: poolUrl,
                  relativeLockHeight: relativeLockHeight,
                  targetPuzzlehash: targetPuzzlehash,
                  fee: fee
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function pwJoinPool(_x5, _x6, _x7, _x8, _x9) {
        return _pwJoinPool.apply(this, arguments);
      }

      return pwJoinPool;
    }()
  }, {
    key: "pwSelfPool",
    value: function () {
      var _pwSelfPool = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(walletId, fee) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.command('pw_self_pool', {
                  walletId: walletId,
                  fee: fee
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function pwSelfPool(_x10, _x11) {
        return _pwSelfPool.apply(this, arguments);
      }

      return pwSelfPool;
    }()
  }, {
    key: "createNewWallet",
    value: function () {
      var _createNewWallet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(walletType) {
        var options,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
                return _context8.abrupt("return", this.command('create_new_wallet', _objectSpread({
                  host: this.client.backupHost,
                  walletType: walletType
                }, options)));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function createNewWallet(_x12) {
        return _createNewWallet.apply(this, arguments);
      }

      return createNewWallet;
    }()
  }, {
    key: "deleteUnconfirmedTransactions",
    value: function () {
      var _deleteUnconfirmedTransactions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(walletId) {
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this.command('delete_unconfirmed_transactions', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function deleteUnconfirmedTransactions(_x13) {
        return _deleteUnconfirmedTransactions.apply(this, arguments);
      }

      return deleteUnconfirmedTransactions;
    }()
  }, {
    key: "getWalletBalance",
    value: function () {
      var _getWalletBalance = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(walletId) {
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", this.command('get_wallet_balance', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getWalletBalance(_x14) {
        return _getWalletBalance.apply(this, arguments);
      }

      return getWalletBalance;
    }()
  }, {
    key: "getFarmedAmount",
    value: function () {
      var _getFarmedAmount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11() {
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this.command('get_farmed_amount'));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getFarmedAmount() {
        return _getFarmedAmount.apply(this, arguments);
      }

      return getFarmedAmount;
    }()
  }, {
    key: "sendTransaction",
    value: function () {
      var _sendTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(walletId, amount, fee, address) {
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this.command('send_transaction', {
                  walletId: walletId,
                  amount: amount,
                  fee: fee,
                  address: address
                }));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function sendTransaction(_x15, _x16, _x17, _x18) {
        return _sendTransaction.apply(this, arguments);
      }

      return sendTransaction;
    }()
  }, {
    key: "generateMnemonic",
    value: function () {
      var _generateMnemonic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13() {
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", this.command('generate_mnemonic'));

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function generateMnemonic() {
        return _generateMnemonic.apply(this, arguments);
      }

      return generateMnemonic;
    }()
  }, {
    key: "getPublicKeys",
    value: function () {
      var _getPublicKeys = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14() {
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", this.command('get_public_keys'));

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function getPublicKeys() {
        return _getPublicKeys.apply(this, arguments);
      }

      return getPublicKeys;
    }()
  }, {
    key: "addKey",
    value: function () {
      var _addKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(mnemonic, type, filePath) {
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                return _context15.abrupt("return", this.command('add_key', {
                  mnemonic: mnemonic,
                  type: type,
                  filePath: filePath
                }));

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function addKey(_x19, _x20, _x21) {
        return _addKey.apply(this, arguments);
      }

      return addKey;
    }()
  }, {
    key: "deleteKey",
    value: function () {
      var _deleteKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(fingerprint) {
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", this.command('delete_key', {
                  fingerprint: fingerprint
                }));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function deleteKey(_x22) {
        return _deleteKey.apply(this, arguments);
      }

      return deleteKey;
    }()
  }, {
    key: "checkDeleteKey",
    value: function () {
      var _checkDeleteKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(fingerprint) {
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                return _context17.abrupt("return", this.command('check_delete_key', {
                  fingerprint: fingerprint
                }));

              case 1:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function checkDeleteKey(_x23) {
        return _checkDeleteKey.apply(this, arguments);
      }

      return checkDeleteKey;
    }()
  }, {
    key: "deleteAllKeys",
    value: function () {
      var _deleteAllKeys = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18() {
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                return _context18.abrupt("return", this.command('delete_all_keys'));

              case 1:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function deleteAllKeys() {
        return _deleteAllKeys.apply(this, arguments);
      }

      return deleteAllKeys;
    }()
  }, {
    key: "logIn",
    value: function () {
      var _logIn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee19(fingerprint) {
        var type,
            host,
            filePath,
            _args19 = arguments;
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                type = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : 'normal';
                host = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : this.client.backupHost;
                filePath = _args19.length > 3 ? _args19[3] : undefined;
                return _context19.abrupt("return", this.command('log_in', {
                  fingerprint: fingerprint,
                  type: type,
                  filePath: filePath,
                  host: host
                }));

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function logIn(_x24) {
        return _logIn.apply(this, arguments);
      }

      return logIn;
    }()
  }, {
    key: "logInAndSkipImport",
    value: function logInAndSkipImport(fingerprint) {
      var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.client.backupHost;
      return this.logIn(fingerprint, 'skip', host);
    }
  }, {
    key: "logInAndImportBackup",
    value: function logInAndImportBackup(fingerprint, filePath) {
      var host = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.client.backupHost;
      return this.logIn(fingerprint, 'restore_backup', host, filePath);
    }
  }, {
    key: "getBackupInfo",
    value: function () {
      var _getBackupInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee20(filePath, options) {
        return _regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                return _context20.abrupt("return", this.command('get_backup_info', _objectSpread({
                  filePath: filePath
                }, options)));

              case 1:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function getBackupInfo(_x25, _x26) {
        return _getBackupInfo.apply(this, arguments);
      }

      return getBackupInfo;
    }()
  }, {
    key: "getBackupInfoByFingerprint",
    value: function () {
      var _getBackupInfoByFingerprint = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee21(filePath, fingerprint) {
        return _regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                return _context21.abrupt("return", this.getBackupInfo(filePath, {
                  fingerprint: fingerprint
                }));

              case 1:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function getBackupInfoByFingerprint(_x27, _x28) {
        return _getBackupInfoByFingerprint.apply(this, arguments);
      }

      return getBackupInfoByFingerprint;
    }()
  }, {
    key: "getBackupInfoByWords",
    value: function () {
      var _getBackupInfoByWords = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee22(filePath, words) {
        return _regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                return _context22.abrupt("return", this.getBackupInfo(filePath, {
                  words: words
                }));

              case 1:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function getBackupInfoByWords(_x29, _x30) {
        return _getBackupInfoByWords.apply(this, arguments);
      }

      return getBackupInfoByWords;
    }()
  }, {
    key: "getPrivateKey",
    value: function () {
      var _getPrivateKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee23(fingerprint) {
        return _regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                return _context23.abrupt("return", this.command('get_private_key', {
                  fingerprint: fingerprint
                }));

              case 1:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function getPrivateKey(_x31) {
        return _getPrivateKey.apply(this, arguments);
      }

      return getPrivateKey;
    }()
  }, {
    key: "getTransactions",
    value: function () {
      var _getTransactions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee24(walletId, start, end, sortKey, reverse) {
        return _regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                return _context24.abrupt("return", this.command('get_transactions', {
                  walletId: walletId,
                  start: start,
                  end: end,
                  sortKey: sortKey,
                  reverse: reverse
                }));

              case 1:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function getTransactions(_x32, _x33, _x34, _x35, _x36) {
        return _getTransactions.apply(this, arguments);
      }

      return getTransactions;
    }()
  }, {
    key: "getTransactionsCount",
    value: function () {
      var _getTransactionsCount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee25(walletId) {
        return _regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                return _context25.abrupt("return", this.command('get_transaction_count', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function getTransactionsCount(_x37) {
        return _getTransactionsCount.apply(this, arguments);
      }

      return getTransactionsCount;
    }()
  }, {
    key: "getNextAddress",
    value: function () {
      var _getNextAddress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee26(walletId, newAddress) {
        return _regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                return _context26.abrupt("return", this.command('get_next_address', {
                  walletId: walletId,
                  newAddress: newAddress
                }));

              case 1:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function getNextAddress(_x38, _x39) {
        return _getNextAddress.apply(this, arguments);
      }

      return getNextAddress;
    }()
  }, {
    key: "farmBlock",
    value: function () {
      var _farmBlock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee27(address) {
        return _regeneratorRuntime.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                return _context27.abrupt("return", this.command('farm_block', {
                  address: address
                }));

              case 1:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function farmBlock(_x40) {
        return _farmBlock.apply(this, arguments);
      }

      return farmBlock;
    }()
  }, {
    key: "getHeightInfo",
    value: function () {
      var _getHeightInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee28() {
        return _regeneratorRuntime.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                return _context28.abrupt("return", this.command('get_height_info'));

              case 1:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function getHeightInfo() {
        return _getHeightInfo.apply(this, arguments);
      }

      return getHeightInfo;
    }()
  }, {
    key: "getNetworkInfo",
    value: function () {
      var _getNetworkInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee29() {
        return _regeneratorRuntime.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                return _context29.abrupt("return", this.command('get_network_info'));

              case 1:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function getNetworkInfo() {
        return _getNetworkInfo.apply(this, arguments);
      }

      return getNetworkInfo;
    }()
  }, {
    key: "getSyncStatus",
    value: function () {
      var _getSyncStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee30() {
        return _regeneratorRuntime.wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                return _context30.abrupt("return", this.command('get_sync_status'));

              case 1:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));

      function getSyncStatus() {
        return _getSyncStatus.apply(this, arguments);
      }

      return getSyncStatus;
    }()
  }, {
    key: "getConnections",
    value: function () {
      var _getConnections = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee31() {
        return _regeneratorRuntime.wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                return _context31.abrupt("return", this.command('get_connections'));

              case 1:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31, this);
      }));

      function getConnections() {
        return _getConnections.apply(this, arguments);
      }

      return getConnections;
    }()
  }, {
    key: "createBackup",
    value: function () {
      var _createBackup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee32(filePath) {
        return _regeneratorRuntime.wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                return _context32.abrupt("return", this.command('create_backup', {
                  filePath: filePath
                }));

              case 1:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32, this);
      }));

      function createBackup(_x41) {
        return _createBackup.apply(this, arguments);
      }

      return createBackup;
    }()
  }, {
    key: "getAllOffers",
    value: function () {
      var _getAllOffers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee33(start, end, sortKey, reverse, includeMyOffers, includeTakenOffers) {
        return _regeneratorRuntime.wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                return _context33.abrupt("return", this.command('get_all_offers', {
                  includeCompleted: true,
                  fileContents: true,
                  start: start,
                  end: end,
                  sortKey: sortKey,
                  reverse: reverse,
                  excludeMyOffers: includeMyOffers ? false : true,
                  excludeTakenOffers: includeTakenOffers ? false : true
                }));

              case 1:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33, this);
      }));

      function getAllOffers(_x42, _x43, _x44, _x45, _x46, _x47) {
        return _getAllOffers.apply(this, arguments);
      }

      return getAllOffers;
    }()
  }, {
    key: "getOffersCount",
    value: function () {
      var _getOffersCount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee34() {
        return _regeneratorRuntime.wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                return _context34.abrupt("return", this.command('get_offers_count', {}));

              case 1:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34, this);
      }));

      function getOffersCount() {
        return _getOffersCount.apply(this, arguments);
      }

      return getOffersCount;
    }()
  }, {
    key: "createOfferForIds",
    value: function () {
      var _createOfferForIds = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee35(offer, fee, driverDict, validateOnly, disableJSONFormatting) {
        return _regeneratorRuntime.wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                return _context35.abrupt("return", this.command('create_offer_for_ids', {
                  offer: offer,
                  fee: fee,
                  driver_dict: driverDict,
                  validate_only: !!validateOnly
                }, false, undefined, disableJSONFormatting));

              case 1:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35, this);
      }));

      function createOfferForIds(_x48, _x49, _x50, _x51, _x52) {
        return _createOfferForIds.apply(this, arguments);
      }

      return createOfferForIds;
    }()
  }, {
    key: "cancelOffer",
    value: function () {
      var _cancelOffer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee36(tradeId, secure, fee) {
        return _regeneratorRuntime.wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                return _context36.abrupt("return", this.command('cancel_offer', {
                  tradeId: tradeId,
                  secure: secure,
                  fee: fee
                }));

              case 1:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36, this);
      }));

      function cancelOffer(_x53, _x54, _x55) {
        return _cancelOffer.apply(this, arguments);
      }

      return cancelOffer;
    }()
  }, {
    key: "checkOfferValidity",
    value: function () {
      var _checkOfferValidity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee37(offer) {
        return _regeneratorRuntime.wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                return _context37.abrupt("return", this.command('check_offer_validity', {
                  offer: offer
                }));

              case 1:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37, this);
      }));

      function checkOfferValidity(_x56) {
        return _checkOfferValidity.apply(this, arguments);
      }

      return checkOfferValidity;
    }()
  }, {
    key: "takeOffer",
    value: function () {
      var _takeOffer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee38(offer, fee) {
        return _regeneratorRuntime.wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                return _context38.abrupt("return", this.command('take_offer', {
                  offer: offer,
                  fee: fee
                }));

              case 1:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38, this);
      }));

      function takeOffer(_x57, _x58) {
        return _takeOffer.apply(this, arguments);
      }

      return takeOffer;
    }()
  }, {
    key: "getOfferSummary",
    value: function () {
      var _getOfferSummary = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee39(offerData) {
        return _regeneratorRuntime.wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                return _context39.abrupt("return", this.command('get_offer_summary', {
                  offer: offerData
                }));

              case 1:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39, this);
      }));

      function getOfferSummary(_x59) {
        return _getOfferSummary.apply(this, arguments);
      }

      return getOfferSummary;
    }()
  }, {
    key: "getOfferData",
    value: function () {
      var _getOfferData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee40(offerId) {
        return _regeneratorRuntime.wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                return _context40.abrupt("return", this.command('get_offer', {
                  tradeId: offerId,
                  fileContents: true
                }));

              case 1:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40, this);
      }));

      function getOfferData(_x60) {
        return _getOfferData.apply(this, arguments);
      }

      return getOfferData;
    }()
  }, {
    key: "getOfferRecord",
    value: function () {
      var _getOfferRecord = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee41(offerId) {
        return _regeneratorRuntime.wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                return _context41.abrupt("return", this.command('get_offer', {
                  tradeId: offerId,
                  fileContents: false
                }));

              case 1:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41, this);
      }));

      function getOfferRecord(_x61) {
        return _getOfferRecord.apply(this, arguments);
      }

      return getOfferRecord;
    }()
  }, {
    key: "getCurrentDerivationIndex",
    value: function () {
      var _getCurrentDerivationIndex = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee42() {
        return _regeneratorRuntime.wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                return _context42.abrupt("return", this.command('get_current_derivation_index'));

              case 1:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42, this);
      }));

      function getCurrentDerivationIndex() {
        return _getCurrentDerivationIndex.apply(this, arguments);
      }

      return getCurrentDerivationIndex;
    }()
  }, {
    key: "extendDerivationIndex",
    value: function () {
      var _extendDerivationIndex = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee43(index) {
        return _regeneratorRuntime.wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                return _context43.abrupt("return", this.command('extend_derivation_index', {
                  index: index
                }));

              case 1:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43, this);
      }));

      function extendDerivationIndex(_x62) {
        return _extendDerivationIndex.apply(this, arguments);
      }

      return extendDerivationIndex;
    }()
  }, {
    key: "onSyncChanged",
    value: function onSyncChanged(callback, processData) {
      return this.onStateChanged('sync_changed', callback, processData);
    }
  }, {
    key: "onNewBlock",
    value: function onNewBlock(callback, processData) {
      return this.onStateChanged('new_block', callback, processData);
    }
  }, {
    key: "onNewPeak",
    value: function onNewPeak(callback, processData) {
      return this.onStateChanged('new_peak', callback, processData);
    }
  }, {
    key: "onCoinAdded",
    value: function onCoinAdded(callback) {
      return this.onStateChanged('coin_added', callback);
    }
  }, {
    key: "onCoinRemoved",
    value: function onCoinRemoved(callback) {
      return this.onStateChanged('coin_removed', callback);
    }
  }, {
    key: "onWalletCreated",
    value: function onWalletCreated(callback, processData) {
      return this.onStateChanged('wallet_created', callback, processData);
    }
  }, {
    key: "onConnections",
    value: function onConnections(callback, processData) {
      return this.onCommand('get_connections', callback, processData);
    }
  }, {
    key: "onTransactionUpdate",
    value: function onTransactionUpdate(callback, processData) {
      return this.onStateChanged('tx_update', callback, processData);
    }
  }, {
    key: "onPendingTransaction",
    value: function onPendingTransaction(callback, processData) {
      return this.onStateChanged('pending_transaction', callback, processData);
    }
  }, {
    key: "onOfferAdded",
    value: function onOfferAdded(callback) {
      return this.onStateChanged('offer_added', callback);
    }
  }, {
    key: "onOfferUpdated",
    value: function onOfferUpdated(callback) {
      return this.onStateChanged('offer_cancelled', callback);
    }
  }, {
    key: "onNFTCoinAdded",
    value: function onNFTCoinAdded(callback) {
      return this.onStateChanged('nft_coin_added', callback);
    }
  }, {
    key: "onNFTCoinRemoved",
    value: function onNFTCoinRemoved(callback) {
      return this.onStateChanged('nft_coin_removed', callback);
    }
  }, {
    key: "onNFTCoinTransferred",
    value: function onNFTCoinTransferred(callback) {
      return this.onStateChanged('nft_coin_transferred', callback);
    }
  }, {
    key: "onNewDerivationIndex",
    value: function onNewDerivationIndex(callback, processData) {
      return this.onStateChanged('new_derivation_index', callback, processData);
    }
  }]);

  return Wallet;
}(Service);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CATWallet = /*#__PURE__*/function (_Wallet) {
  _inherits(CATWallet, _Wallet);

  var _super = _createSuper$4(CATWallet);

  function CATWallet() {
    _classCallCheck(this, CATWallet);

    return _super.apply(this, arguments);
  }

  _createClass(CATWallet, [{
    key: "createNewWallet",
    value: function () {
      var _createNewWallet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(amount, fee) {
        var host,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                host = _args.length > 2 && _args[2] !== undefined ? _args[2] : this.client.backupHost;
                return _context.abrupt("return", _get(_getPrototypeOf(CATWallet.prototype), "createNewWallet", this).call(this, 'cat_wallet', {
                  mode: 'new',
                  amount: amount,
                  fee: fee,
                  host: host
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createNewWallet(_x, _x2) {
        return _createNewWallet.apply(this, arguments);
      }

      return createNewWallet;
    }()
  }, {
    key: "createWalletForExisting",
    value: function () {
      var _createWalletForExisting = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(assetId, fee) {
        var host,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                host = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : this.client.backupHost;
                return _context2.abrupt("return", _get(_getPrototypeOf(CATWallet.prototype), "createNewWallet", this).call(this, 'cat_wallet', {
                  mode: 'existing',
                  assetId: assetId,
                  fee: fee,
                  host: host
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createWalletForExisting(_x3, _x4) {
        return _createWalletForExisting.apply(this, arguments);
      }

      return createWalletForExisting;
    }()
  }, {
    key: "getAssetId",
    value: function () {
      var _getAssetId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(walletId) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.command('cat_get_asset_id', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAssetId(_x5) {
        return _getAssetId.apply(this, arguments);
      }

      return getAssetId;
    }()
  }, {
    key: "getName",
    value: function () {
      var _getName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(walletId) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.command('cat_get_name', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getName(_x6) {
        return _getName.apply(this, arguments);
      }

      return getName;
    }()
  }, {
    key: "setName",
    value: function () {
      var _setName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(walletId, name) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.command('cat_set_name', {
                  walletId: walletId,
                  name: name
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setName(_x7, _x8) {
        return _setName.apply(this, arguments);
      }

      return setName;
    }()
  }, {
    key: "spend",
    value: function () {
      var _spend = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(walletId, innerAddress, amount, fee, memos) {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.command('cat_spend', {
                  walletId: walletId,
                  innerAddress: innerAddress,
                  amount: amount,
                  fee: fee,
                  memos: memos
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function spend(_x9, _x10, _x11, _x12, _x13) {
        return _spend.apply(this, arguments);
      }

      return spend;
    }()
  }, {
    key: "getCatList",
    value: function () {
      var _getCatList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.command('get_cat_list'));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getCatList() {
        return _getCatList.apply(this, arguments);
      }

      return getCatList;
    }()
  }, {
    key: "getStrayCats",
    value: function () {
      var _getStrayCats = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8() {
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.command('get_stray_cats'));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getStrayCats() {
        return _getStrayCats.apply(this, arguments);
      }

      return getStrayCats;
    }()
  }]);

  return CATWallet;
}(Wallet);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DIDWallet = /*#__PURE__*/function (_Wallet) {
  _inherits(DIDWallet, _Wallet);

  var _super = _createSuper$3(DIDWallet);

  function DIDWallet() {
    _classCallCheck(this, DIDWallet);

    return _super.apply(this, arguments);
  }

  _createClass(DIDWallet, [{
    key: "createNewWallet",
    value: function () {
      var _createNewWallet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(amount, fee, backupDids, numOfBackupIdsNeeded) {
        var host,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                host = _args.length > 4 && _args[4] !== undefined ? _args[4] : this.client.backupHost;
                return _context.abrupt("return", _get(_getPrototypeOf(DIDWallet.prototype), "createNewWallet", this).call(this, 'did_wallet', {
                  did_type: 'new',
                  amount: amount,
                  fee: fee,
                  backupDids: backupDids,
                  numOfBackupIdsNeeded: numOfBackupIdsNeeded,
                  host: host
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createNewWallet(_x, _x2, _x3, _x4) {
        return _createNewWallet.apply(this, arguments);
      }

      return createNewWallet;
    }()
  }, {
    key: "createNewRecoveryWallet",
    value: function () {
      var _createNewRecoveryWallet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(filename) {
        var host,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                host = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : this.client.backupHost;
                return _context2.abrupt("return", _get(_getPrototypeOf(DIDWallet.prototype), "createNewWallet", this).call(this, 'did_wallet', {
                  did_type: 'recovery',
                  filename: filename,
                  host: host
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createNewRecoveryWallet(_x5) {
        return _createNewRecoveryWallet.apply(this, arguments);
      }

      return createNewRecoveryWallet;
    }()
  }, {
    key: "updateRecoveryIds",
    value: function () {
      var _updateRecoveryIds = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(walletId, newList, numVerificationsRequired) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.command('did_update_recovery_ids', {
                  walletId: walletId,
                  newList: newList,
                  numVerificationsRequired: numVerificationsRequired
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateRecoveryIds(_x6, _x7, _x8) {
        return _updateRecoveryIds.apply(this, arguments);
      }

      return updateRecoveryIds;
    }()
  }, {
    key: "getPubKey",
    value: function () {
      var _getPubKey = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(walletId) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.command('did_get_pubkey', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getPubKey(_x9) {
        return _getPubKey.apply(this, arguments);
      }

      return getPubKey;
    }()
  }, {
    key: "spend",
    value: function () {
      var _spend = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(walletId, puzzlehash) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.command('did_spend', {
                  walletId: walletId,
                  puzzlehash: puzzlehash
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function spend(_x10, _x11) {
        return _spend.apply(this, arguments);
      }

      return spend;
    }()
  }, {
    key: "getDid",
    value: function () {
      var _getDid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(walletId) {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.command('did_get_did', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getDid(_x12) {
        return _getDid.apply(this, arguments);
      }

      return getDid;
    }()
  }, {
    key: "getDidName",
    value: function () {
      var _getDidName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(walletId) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.command('did_get_wallet_name', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getDidName(_x13) {
        return _getDidName.apply(this, arguments);
      }

      return getDidName;
    }()
  }, {
    key: "setDIDName",
    value: function () {
      var _setDIDName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(walletId, name) {
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.command('did_set_wallet_name', {
                  walletId: walletId,
                  name: name
                }));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setDIDName(_x14, _x15) {
        return _setDIDName.apply(this, arguments);
      }

      return setDIDName;
    }()
  }, {
    key: "getRecoveryList",
    value: function () {
      var _getRecoveryList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(walletId) {
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this.command('did_get_recovery_list', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getRecoveryList(_x16) {
        return _getRecoveryList.apply(this, arguments);
      }

      return getRecoveryList;
    }()
  }, {
    key: "recoverySpend",
    value: function () {
      var _recoverySpend = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(walletId, attestFilenames) {
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", this.command('did_recovery_spend', {
                  walletId: walletId,
                  attestFilenames: attestFilenames
                }));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function recoverySpend(_x17, _x18) {
        return _recoverySpend.apply(this, arguments);
      }

      return recoverySpend;
    }()
  }, {
    key: "createAttest",
    value: function () {
      var _createAttest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(walletId, filename, coinName, pubkey, puzhash) {
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this.command('did_create_attest', {
                  walletId: walletId,
                  filename: filename,
                  coinName: coinName,
                  pubkey: pubkey,
                  puzhash: puzhash
                }));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function createAttest(_x19, _x20, _x21, _x22, _x23) {
        return _createAttest.apply(this, arguments);
      }

      return createAttest;
    }()
  }, {
    key: "createBackupFile",
    value: function () {
      var _createBackupFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(walletId, filename) {
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this.command('did_create_backup_file', {
                  walletId: walletId,
                  filename: filename
                }));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function createBackupFile(_x24, _x25) {
        return _createBackupFile.apply(this, arguments);
      }

      return createBackupFile;
    }()
  }, {
    key: "getInformationNeededForRecovery",
    value: function () {
      var _getInformationNeededForRecovery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(walletId) {
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", this.command('did_get_information_needed_for_recovery', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getInformationNeededForRecovery(_x26) {
        return _getInformationNeededForRecovery.apply(this, arguments);
      }

      return getInformationNeededForRecovery;
    }()
  }, {
    key: "getCurrentCoinInfo",
    value: function () {
      var _getCurrentCoinInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(walletId) {
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", this.command('did_get_current_coin_info', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function getCurrentCoinInfo(_x27) {
        return _getCurrentCoinInfo.apply(this, arguments);
      }

      return getCurrentCoinInfo;
    }()
  }, {
    key: "onDIDCoinAdded",
    value: function onDIDCoinAdded(callback) {
      return this.onStateChanged('did_coin_added', callback);
    }
  }]);

  return DIDWallet;
}(Wallet);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var NFTWallet = /*#__PURE__*/function (_Wallet) {
  _inherits(NFTWallet, _Wallet);

  var _super = _createSuper$2(NFTWallet);

  function NFTWallet() {
    _classCallCheck(this, NFTWallet);

    return _super.apply(this, arguments);
  }

  _createClass(NFTWallet, [{
    key: "getNfts",
    value: function () {
      var _getNfts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(walletId) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.command('nft_get_nfts', {
                  walletId: walletId
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getNfts(_x) {
        return _getNfts.apply(this, arguments);
      }

      return getNfts;
    }()
  }, {
    key: "getNftInfo",
    value: function () {
      var _getNftInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(coinId) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.command('nft_get_info', {
                  coinId: coinId
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getNftInfo(_x2) {
        return _getNftInfo.apply(this, arguments);
      }

      return getNftInfo;
    }()
  }, {
    key: "getNftWalletsWithDids",
    value: function () {
      var _getNftWalletsWithDids = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.command('nft_get_wallets_with_dids'));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getNftWalletsWithDids() {
        return _getNftWalletsWithDids.apply(this, arguments);
      }

      return getNftWalletsWithDids;
    }()
  }, {
    key: "transferNft",
    value: function () {
      var _transferNft = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(walletId, nftCoinId, targetAddress, fee) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.command('nft_transfer_nft', {
                  walletId: walletId,
                  nftCoinId: nftCoinId,
                  targetAddress: targetAddress,
                  fee: fee
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function transferNft(_x3, _x4, _x5, _x6) {
        return _transferNft.apply(this, arguments);
      }

      return transferNft;
    }()
  }, {
    key: "setNftDid",
    value: function () {
      var _setNftDid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(walletId, nftCoinId, did, fee) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.command('nft_set_nft_did', {
                  walletId: walletId,
                  nftCoinId: nftCoinId,
                  didId: did,
                  fee: fee
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setNftDid(_x7, _x8, _x9, _x10) {
        return _setNftDid.apply(this, arguments);
      }

      return setNftDid;
    }()
  }, {
    key: "setNftStatus",
    value: function () {
      var _setNftStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(walletId, nftCoinId, inTransaction) {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.command('nft_set_nft_status', {
                  walletId: walletId,
                  coinId: nftCoinId,
                  inTransaction: inTransaction
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function setNftStatus(_x11, _x12, _x13) {
        return _setNftStatus.apply(this, arguments);
      }

      return setNftStatus;
    }()
  }, {
    key: "receiveNft",
    value: function () {
      var _receiveNft = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(walletId, spendBundle, fee) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.command('nft_receive_nft', {
                  walletId: walletId,
                  spendBundle: spendBundle,
                  fee: fee
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function receiveNft(_x14, _x15, _x16) {
        return _receiveNft.apply(this, arguments);
      }

      return receiveNft;
    }()
  }]);

  return NFTWallet;
}(Wallet);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PoolWallet = /*#__PURE__*/function (_Wallet) {
  _inherits(PoolWallet, _Wallet);

  var _super = _createSuper$1(PoolWallet);

  function PoolWallet() {
    _classCallCheck(this, PoolWallet);

    return _super.apply(this, arguments);
  }

  _createClass(PoolWallet, [{
    key: "createNewWallet",
    value: function () {
      var _createNewWallet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(initialTargetState, fee) {
        var host,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                host = _args.length > 2 && _args[2] !== undefined ? _args[2] : this.client.backupHost;
                return _context.abrupt("return", _get(_getPrototypeOf(PoolWallet.prototype), "createNewWallet", this).call(this, 'pool_wallet', {
                  mode: 'new',
                  fee: fee,
                  host: host,
                  initialTargetState: initialTargetState
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createNewWallet(_x, _x2) {
        return _createNewWallet.apply(this, arguments);
      }

      return createNewWallet;
    }()
  }]);

  return PoolWallet;
}(Wallet);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var RLWallet = /*#__PURE__*/function (_Wallet) {
  _inherits(RLWallet, _Wallet);

  var _super = _createSuper(RLWallet);

  function RLWallet() {
    _classCallCheck(this, RLWallet);

    return _super.apply(this, arguments);
  }

  _createClass(RLWallet, [{
    key: "createAdminWallet",
    value: function () {
      var _createAdminWallet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(interval, limit, pubkey, amount) {
        var host,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                host = _args.length > 4 && _args[4] !== undefined ? _args[4] : this.client.backupHost;
                return _context.abrupt("return", this.createNewWallet('rl_wallet', {
                  rlType: 'admin',
                  interval: interval,
                  limit: limit,
                  pubkey: pubkey,
                  amount: amount,
                  host: host
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createAdminWallet(_x, _x2, _x3, _x4) {
        return _createAdminWallet.apply(this, arguments);
      }

      return createAdminWallet;
    }()
  }, {
    key: "createUserWallet",
    value: function () {
      var _createUserWallet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var host,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                host = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : this.client.backupHost;
                return _context2.abrupt("return", this.createNewWallet('rl_wallet', {
                  rlType: 'user',
                  host: host
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createUserWallet() {
        return _createUserWallet.apply(this, arguments);
      }

      return createUserWallet;
    }()
  }, {
    key: "setUserInfo",
    value: function () {
      var _setUserInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(walletId, interval, limit, origin, adminPubkey) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.command('rl_set_user_info', {
                  walletId: walletId,
                  interval: interval,
                  limit: limit,
                  origin: origin,
                  adminPubkey: adminPubkey
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setUserInfo(_x5, _x6, _x7, _x8, _x9) {
        return _setUserInfo.apply(this, arguments);
      }

      return setUserInfo;
    }()
  }, {
    key: "clawbackCoin",
    value: function () {
      var _clawbackCoin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                throw new Error('RL Clawback is not implemented');

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function clawbackCoin() {
        return _clawbackCoin.apply(this, arguments);
      }

      return clawbackCoin;
    }()
  }]);

  return RLWallet;
}(Wallet);

var PlotterName;

(function (PlotterName) {
  PlotterName["BLADEBIT"] = "bladebit";
  PlotterName["CHIAPOS"] = "chiapos";
  PlotterName["MADMAX"] = "madmax";
})(PlotterName || (PlotterName = {}));

var PlotterName$1 = PlotterName;

var bladebitOptions = {
  kSizes: [32],
  haveNumBuckets: false,
  haveMadmaxNumBucketsPhase3: false,
  haveMadmaxThreadMultiplier: false,
  haveMadmaxTempToggle: false,
  haveBladebitWarmStart: true,
  haveBladebitDisableNUMA: true,
  haveBladebitOutputDir: true,
  canDisableBitfieldPlotting: false,
  canPlotInParallel: false,
  canDelayParallelPlots: false,
  canSetBufferSize: false
};
var bladebitDefaults = {
  plotterName: PlotterName$1.BLADEBIT,
  plotSize: 32,
  numThreads: 0,
  numBuckets: undefined,
  madmaxNumBucketsPhase3: undefined,
  madmaxThreadMultiplier: undefined,
  madmaxWaitForCopy: undefined,
  madmaxTempToggle: undefined,
  bladebitWarmStart: false,
  bladebitDisableNUMA: false,
  disableBitfieldPlotting: undefined,
  parallel: false,
  delay: 0
};
var chiaposOptions = {
  kSizes: [25, 32, 33, 34, 35],
  haveNumBuckets: true,
  haveMadmaxNumBucketsPhase3: false,
  haveMadmaxThreadMultiplier: false,
  haveMadmaxTempToggle: false,
  haveBladebitWarmStart: false,
  haveBladebitDisableNUMA: false,
  haveBladebitOutputDir: false,
  canDisableBitfieldPlotting: true,
  canPlotInParallel: true,
  canDelayParallelPlots: true,
  canSetBufferSize: true
};
var chiaposDefaults = {
  plotterName: PlotterName$1.CHIAPOS,
  plotSize: 32,
  numThreads: 2,
  numBuckets: 128,
  madmaxNumBucketsPhase3: undefined,
  madmaxThreadMultiplier: undefined,
  madmaxWaitForCopy: undefined,
  madmaxTempToggle: undefined,
  bladebitWarmStart: undefined,
  bladebitDisableNUMA: undefined,
  disableBitfieldPlotting: false,
  parallel: false,
  delay: 0
};
var madmaxOptions = {
  kSizes: [25, 32, 33, 34],
  haveNumBuckets: true,
  haveMadmaxNumBucketsPhase3: true,
  haveMadmaxThreadMultiplier: true,
  haveMadmaxTempToggle: true,
  haveBladebitWarmStart: false,
  haveBladebitDisableNUMA: false,
  haveBladebitOutputDir: false,
  canDisableBitfieldPlotting: false,
  canPlotInParallel: false,
  canDelayParallelPlots: false,
  canSetBufferSize: false
};
var madmaxDefaults = {
  plotterName: PlotterName$1.MADMAX,
  plotSize: 32,
  numThreads: 4,
  numBuckets: 256,
  madmaxNumBucketsPhase3: 256,
  madmaxThreadMultiplier: 1,
  madmaxWaitForCopy: true,
  madmaxTempToggle: false,
  bladebitWarmStart: undefined,
  bladebitDisableNUMA: undefined,
  disableBitfieldPlotting: undefined,
  parallel: false,
  delay: 0
};

function optionsForPlotter(plotterName) {
  switch (plotterName) {
    case PlotterName$1.BLADEBIT:
      return bladebitOptions;

    case PlotterName$1.MADMAX:
      return madmaxOptions;

    case PlotterName$1.CHIAPOS: // fallthrough

    default:
      return chiaposOptions;
  }
}

function defaultsForPlotter(plotterName) {
  switch (plotterName) {
    case PlotterName$1.BLADEBIT:
      return bladebitDefaults;

    case PlotterName$1.MADMAX:
      return madmaxDefaults;

    case PlotterName$1.CHIAPOS: // fallthrough

    default:
      return chiaposDefaults;
  }
}

var defaultPlotter = {
  displayName: 'Chia Proof of Space',
  options: optionsForPlotter(PlotterName$1.CHIAPOS),
  defaults: defaultsForPlotter(PlotterName$1.CHIAPOS),
  installInfo: {
    installed: true
  }
};

var PassphrasePromptReason;

(function (PassphrasePromptReason) {
  PassphrasePromptReason["KEYRING_LOCKED"] = "KEYRING_LOCKED";
  PassphrasePromptReason["DELETING_KEY"] = "DELETING_KEY";
})(PassphrasePromptReason || (PassphrasePromptReason = {}));

var PassphrasePromptReason$1 = PassphrasePromptReason;

var _ServiceName$WALLET$S;
var ServiceHumanName = (_ServiceName$WALLET$S = {}, _defineProperty(_ServiceName$WALLET$S, ServiceName$1.WALLET, 'Wallet'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.FULL_NODE, 'Full Node'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.FARMER, 'Farmer'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.HARVESTER, 'Harvester'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.SIMULATOR, 'Full Node Simulator'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.DAEMON, 'Daemon'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.PLOTTER, 'Plotter'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.TIMELORD, 'Timelord'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.INTRODUCER, 'Introducer'), _defineProperty(_ServiceName$WALLET$S, ServiceName$1.EVENTS, 'Events'), _ServiceName$WALLET$S);

var ServiceConnectionName = {
  1: ServiceHumanName[ServiceName$1.FULL_NODE],
  2: ServiceHumanName[ServiceName$1.HARVESTER],
  3: ServiceHumanName[ServiceName$1.FARMER],
  4: ServiceHumanName[ServiceName$1.TIMELORD],
  5: ServiceHumanName[ServiceName$1.INTRODUCER],
  6: ServiceHumanName[ServiceName$1.WALLET],
  7: ServiceHumanName[ServiceName$1.PLOTTER]
};

// eslint-disable-next-line
var SyncingStatus;

(function (SyncingStatus) {
  SyncingStatus["SYNCING"] = "SYNCING";
  SyncingStatus["SYNCED"] = "SYNCED";
  SyncingStatus["NOT_SYNCED"] = "NOT_SYNCED";
})(SyncingStatus || (SyncingStatus = {}));
var SyncingStatus$1 = SyncingStatus;

var TransactionType;

(function (TransactionType) {
  TransactionType[TransactionType["INCOMING"] = 0] = "INCOMING";
  TransactionType[TransactionType["OUTGOING"] = 1] = "OUTGOING";
  TransactionType[TransactionType["COINBASE_REWARD"] = 2] = "COINBASE_REWARD";
  TransactionType[TransactionType["FEE_REWARD"] = 3] = "FEE_REWARD";
  TransactionType[TransactionType["INCOMING_TRADE"] = 4] = "INCOMING_TRADE";
  TransactionType[TransactionType["OUTGOING_TRADE"] = 5] = "OUTGOING_TRADE";
})(TransactionType || (TransactionType = {}));
var TransactionType$1 = TransactionType;

// eslint-disable-next-line
var WalletType;

(function (WalletType) {
  WalletType[WalletType["STANDARD_WALLET"] = 0] = "STANDARD_WALLET";
  WalletType[WalletType["RATE_LIMITED"] = 1] = "RATE_LIMITED";
  WalletType[WalletType["ATOMIC_SWAP"] = 2] = "ATOMIC_SWAP";
  WalletType[WalletType["AUTHORIZED_PAYEE"] = 3] = "AUTHORIZED_PAYEE";
  WalletType[WalletType["MULTI_SIG"] = 4] = "MULTI_SIG";
  WalletType[WalletType["CUSTODY"] = 5] = "CUSTODY";
  WalletType[WalletType["CAT"] = 6] = "CAT";
  WalletType[WalletType["RECOVERABLE"] = 7] = "RECOVERABLE";
  WalletType[WalletType["DECENTRALIZED_ID"] = 8] = "DECENTRALIZED_ID";
  WalletType[WalletType["POOLING_WALLET"] = 9] = "POOLING_WALLET";
  WalletType[WalletType["NFT"] = 10] = "NFT";
})(WalletType || (WalletType = {}));

var WalletType$1 = WalletType;

var english = [{
  word: 'abandon',
  value: 0
}, {
  word: 'ability',
  value: 1
}, {
  word: 'able',
  value: 2
}, {
  word: 'about',
  value: 3
}, {
  word: 'above',
  value: 4
}, {
  word: 'absent',
  value: 5
}, {
  word: 'absorb',
  value: 6
}, {
  word: 'abstract',
  value: 7
}, {
  word: 'absurd',
  value: 8
}, {
  word: 'abuse',
  value: 9
}, {
  word: 'access',
  value: 10
}, {
  word: 'accident',
  value: 11
}, {
  word: 'account',
  value: 12
}, {
  word: 'accuse',
  value: 13
}, {
  word: 'achieve',
  value: 14
}, {
  word: 'acid',
  value: 15
}, {
  word: 'acoustic',
  value: 16
}, {
  word: 'acquire',
  value: 17
}, {
  word: 'across',
  value: 18
}, {
  word: 'act',
  value: 19
}, {
  word: 'action',
  value: 20
}, {
  word: 'actor',
  value: 21
}, {
  word: 'actress',
  value: 22
}, {
  word: 'actual',
  value: 23
}, {
  word: 'adapt',
  value: 24
}, {
  word: 'add',
  value: 25
}, {
  word: 'addict',
  value: 26
}, {
  word: 'address',
  value: 27
}, {
  word: 'adjust',
  value: 28
}, {
  word: 'admit',
  value: 29
}, {
  word: 'adult',
  value: 30
}, {
  word: 'advance',
  value: 31
}, {
  word: 'advice',
  value: 32
}, {
  word: 'aerobic',
  value: 33
}, {
  word: 'affair',
  value: 34
}, {
  word: 'afford',
  value: 35
}, {
  word: 'afraid',
  value: 36
}, {
  word: 'again',
  value: 37
}, {
  word: 'age',
  value: 38
}, {
  word: 'agent',
  value: 39
}, {
  word: 'agree',
  value: 40
}, {
  word: 'ahead',
  value: 41
}, {
  word: 'aim',
  value: 42
}, {
  word: 'air',
  value: 43
}, {
  word: 'airport',
  value: 44
}, {
  word: 'aisle',
  value: 45
}, {
  word: 'alarm',
  value: 46
}, {
  word: 'album',
  value: 47
}, {
  word: 'alcohol',
  value: 48
}, {
  word: 'alert',
  value: 49
}, {
  word: 'alien',
  value: 50
}, {
  word: 'all',
  value: 51
}, {
  word: 'alley',
  value: 52
}, {
  word: 'allow',
  value: 53
}, {
  word: 'almost',
  value: 54
}, {
  word: 'alone',
  value: 55
}, {
  word: 'alpha',
  value: 56
}, {
  word: 'already',
  value: 57
}, {
  word: 'also',
  value: 58
}, {
  word: 'alter',
  value: 59
}, {
  word: 'always',
  value: 60
}, {
  word: 'amateur',
  value: 61
}, {
  word: 'amazing',
  value: 62
}, {
  word: 'among',
  value: 63
}, {
  word: 'amount',
  value: 64
}, {
  word: 'amused',
  value: 65
}, {
  word: 'analyst',
  value: 66
}, {
  word: 'anchor',
  value: 67
}, {
  word: 'ancient',
  value: 68
}, {
  word: 'anger',
  value: 69
}, {
  word: 'angle',
  value: 70
}, {
  word: 'angry',
  value: 71
}, {
  word: 'animal',
  value: 72
}, {
  word: 'ankle',
  value: 73
}, {
  word: 'announce',
  value: 74
}, {
  word: 'annual',
  value: 75
}, {
  word: 'another',
  value: 76
}, {
  word: 'answer',
  value: 77
}, {
  word: 'antenna',
  value: 78
}, {
  word: 'antique',
  value: 79
}, {
  word: 'anxiety',
  value: 80
}, {
  word: 'any',
  value: 81
}, {
  word: 'apart',
  value: 82
}, {
  word: 'apology',
  value: 83
}, {
  word: 'appear',
  value: 84
}, {
  word: 'apple',
  value: 85
}, {
  word: 'approve',
  value: 86
}, {
  word: 'april',
  value: 87
}, {
  word: 'arch',
  value: 88
}, {
  word: 'arctic',
  value: 89
}, {
  word: 'area',
  value: 90
}, {
  word: 'arena',
  value: 91
}, {
  word: 'argue',
  value: 92
}, {
  word: 'arm',
  value: 93
}, {
  word: 'armed',
  value: 94
}, {
  word: 'armor',
  value: 95
}, {
  word: 'army',
  value: 96
}, {
  word: 'around',
  value: 97
}, {
  word: 'arrange',
  value: 98
}, {
  word: 'arrest',
  value: 99
}, {
  word: 'arrive',
  value: 100
}, {
  word: 'arrow',
  value: 101
}, {
  word: 'art',
  value: 102
}, {
  word: 'artefact',
  value: 103
}, {
  word: 'artist',
  value: 104
}, {
  word: 'artwork',
  value: 105
}, {
  word: 'ask',
  value: 106
}, {
  word: 'aspect',
  value: 107
}, {
  word: 'assault',
  value: 108
}, {
  word: 'asset',
  value: 109
}, {
  word: 'assist',
  value: 110
}, {
  word: 'assume',
  value: 111
}, {
  word: 'asthma',
  value: 112
}, {
  word: 'athlete',
  value: 113
}, {
  word: 'atom',
  value: 114
}, {
  word: 'attack',
  value: 115
}, {
  word: 'attend',
  value: 116
}, {
  word: 'attitude',
  value: 117
}, {
  word: 'attract',
  value: 118
}, {
  word: 'auction',
  value: 119
}, {
  word: 'audit',
  value: 120
}, {
  word: 'august',
  value: 121
}, {
  word: 'aunt',
  value: 122
}, {
  word: 'author',
  value: 123
}, {
  word: 'auto',
  value: 124
}, {
  word: 'autumn',
  value: 125
}, {
  word: 'average',
  value: 126
}, {
  word: 'avocado',
  value: 127
}, {
  word: 'avoid',
  value: 128
}, {
  word: 'awake',
  value: 129
}, {
  word: 'aware',
  value: 130
}, {
  word: 'away',
  value: 131
}, {
  word: 'awesome',
  value: 132
}, {
  word: 'awful',
  value: 133
}, {
  word: 'awkward',
  value: 134
}, {
  word: 'axis',
  value: 135
}, {
  word: 'baby',
  value: 136
}, {
  word: 'bachelor',
  value: 137
}, {
  word: 'bacon',
  value: 138
}, {
  word: 'badge',
  value: 139
}, {
  word: 'bag',
  value: 140
}, {
  word: 'balance',
  value: 141
}, {
  word: 'balcony',
  value: 142
}, {
  word: 'ball',
  value: 143
}, {
  word: 'bamboo',
  value: 144
}, {
  word: 'banana',
  value: 145
}, {
  word: 'banner',
  value: 146
}, {
  word: 'bar',
  value: 147
}, {
  word: 'barely',
  value: 148
}, {
  word: 'bargain',
  value: 149
}, {
  word: 'barrel',
  value: 150
}, {
  word: 'base',
  value: 151
}, {
  word: 'basic',
  value: 152
}, {
  word: 'basket',
  value: 153
}, {
  word: 'battle',
  value: 154
}, {
  word: 'beach',
  value: 155
}, {
  word: 'bean',
  value: 156
}, {
  word: 'beauty',
  value: 157
}, {
  word: 'because',
  value: 158
}, {
  word: 'become',
  value: 159
}, {
  word: 'beef',
  value: 160
}, {
  word: 'before',
  value: 161
}, {
  word: 'begin',
  value: 162
}, {
  word: 'behave',
  value: 163
}, {
  word: 'behind',
  value: 164
}, {
  word: 'believe',
  value: 165
}, {
  word: 'below',
  value: 166
}, {
  word: 'belt',
  value: 167
}, {
  word: 'bench',
  value: 168
}, {
  word: 'benefit',
  value: 169
}, {
  word: 'best',
  value: 170
}, {
  word: 'betray',
  value: 171
}, {
  word: 'better',
  value: 172
}, {
  word: 'between',
  value: 173
}, {
  word: 'beyond',
  value: 174
}, {
  word: 'bicycle',
  value: 175
}, {
  word: 'bid',
  value: 176
}, {
  word: 'bike',
  value: 177
}, {
  word: 'bind',
  value: 178
}, {
  word: 'biology',
  value: 179
}, {
  word: 'bird',
  value: 180
}, {
  word: 'birth',
  value: 181
}, {
  word: 'bitter',
  value: 182
}, {
  word: 'black',
  value: 183
}, {
  word: 'blade',
  value: 184
}, {
  word: 'blame',
  value: 185
}, {
  word: 'blanket',
  value: 186
}, {
  word: 'blast',
  value: 187
}, {
  word: 'bleak',
  value: 188
}, {
  word: 'bless',
  value: 189
}, {
  word: 'blind',
  value: 190
}, {
  word: 'blood',
  value: 191
}, {
  word: 'blossom',
  value: 192
}, {
  word: 'blouse',
  value: 193
}, {
  word: 'blue',
  value: 194
}, {
  word: 'blur',
  value: 195
}, {
  word: 'blush',
  value: 196
}, {
  word: 'board',
  value: 197
}, {
  word: 'boat',
  value: 198
}, {
  word: 'body',
  value: 199
}, {
  word: 'boil',
  value: 200
}, {
  word: 'bomb',
  value: 201
}, {
  word: 'bone',
  value: 202
}, {
  word: 'bonus',
  value: 203
}, {
  word: 'book',
  value: 204
}, {
  word: 'boost',
  value: 205
}, {
  word: 'border',
  value: 206
}, {
  word: 'boring',
  value: 207
}, {
  word: 'borrow',
  value: 208
}, {
  word: 'boss',
  value: 209
}, {
  word: 'bottom',
  value: 210
}, {
  word: 'bounce',
  value: 211
}, {
  word: 'box',
  value: 212
}, {
  word: 'boy',
  value: 213
}, {
  word: 'bracket',
  value: 214
}, {
  word: 'brain',
  value: 215
}, {
  word: 'brand',
  value: 216
}, {
  word: 'brass',
  value: 217
}, {
  word: 'brave',
  value: 218
}, {
  word: 'bread',
  value: 219
}, {
  word: 'breeze',
  value: 220
}, {
  word: 'brick',
  value: 221
}, {
  word: 'bridge',
  value: 222
}, {
  word: 'brief',
  value: 223
}, {
  word: 'bright',
  value: 224
}, {
  word: 'bring',
  value: 225
}, {
  word: 'brisk',
  value: 226
}, {
  word: 'broccoli',
  value: 227
}, {
  word: 'broken',
  value: 228
}, {
  word: 'bronze',
  value: 229
}, {
  word: 'broom',
  value: 230
}, {
  word: 'brother',
  value: 231
}, {
  word: 'brown',
  value: 232
}, {
  word: 'brush',
  value: 233
}, {
  word: 'bubble',
  value: 234
}, {
  word: 'buddy',
  value: 235
}, {
  word: 'budget',
  value: 236
}, {
  word: 'buffalo',
  value: 237
}, {
  word: 'build',
  value: 238
}, {
  word: 'bulb',
  value: 239
}, {
  word: 'bulk',
  value: 240
}, {
  word: 'bullet',
  value: 241
}, {
  word: 'bundle',
  value: 242
}, {
  word: 'bunker',
  value: 243
}, {
  word: 'burden',
  value: 244
}, {
  word: 'burger',
  value: 245
}, {
  word: 'burst',
  value: 246
}, {
  word: 'bus',
  value: 247
}, {
  word: 'business',
  value: 248
}, {
  word: 'busy',
  value: 249
}, {
  word: 'butter',
  value: 250
}, {
  word: 'buyer',
  value: 251
}, {
  word: 'buzz',
  value: 252
}, {
  word: 'cabbage',
  value: 253
}, {
  word: 'cabin',
  value: 254
}, {
  word: 'cable',
  value: 255
}, {
  word: 'cactus',
  value: 256
}, {
  word: 'cage',
  value: 257
}, {
  word: 'cake',
  value: 258
}, {
  word: 'call',
  value: 259
}, {
  word: 'calm',
  value: 260
}, {
  word: 'camera',
  value: 261
}, {
  word: 'camp',
  value: 262
}, {
  word: 'can',
  value: 263
}, {
  word: 'canal',
  value: 264
}, {
  word: 'cancel',
  value: 265
}, {
  word: 'candy',
  value: 266
}, {
  word: 'cannon',
  value: 267
}, {
  word: 'canoe',
  value: 268
}, {
  word: 'canvas',
  value: 269
}, {
  word: 'canyon',
  value: 270
}, {
  word: 'capable',
  value: 271
}, {
  word: 'capital',
  value: 272
}, {
  word: 'captain',
  value: 273
}, {
  word: 'car',
  value: 274
}, {
  word: 'carbon',
  value: 275
}, {
  word: 'card',
  value: 276
}, {
  word: 'cargo',
  value: 277
}, {
  word: 'carpet',
  value: 278
}, {
  word: 'carry',
  value: 279
}, {
  word: 'cart',
  value: 280
}, {
  word: 'case',
  value: 281
}, {
  word: 'cash',
  value: 282
}, {
  word: 'casino',
  value: 283
}, {
  word: 'castle',
  value: 284
}, {
  word: 'casual',
  value: 285
}, {
  word: 'cat',
  value: 286
}, {
  word: 'catalog',
  value: 287
}, {
  word: 'catch',
  value: 288
}, {
  word: 'category',
  value: 289
}, {
  word: 'cattle',
  value: 290
}, {
  word: 'caught',
  value: 291
}, {
  word: 'cause',
  value: 292
}, {
  word: 'caution',
  value: 293
}, {
  word: 'cave',
  value: 294
}, {
  word: 'ceiling',
  value: 295
}, {
  word: 'celery',
  value: 296
}, {
  word: 'cement',
  value: 297
}, {
  word: 'census',
  value: 298
}, {
  word: 'century',
  value: 299
}, {
  word: 'cereal',
  value: 300
}, {
  word: 'certain',
  value: 301
}, {
  word: 'chair',
  value: 302
}, {
  word: 'chalk',
  value: 303
}, {
  word: 'champion',
  value: 304
}, {
  word: 'change',
  value: 305
}, {
  word: 'chaos',
  value: 306
}, {
  word: 'chapter',
  value: 307
}, {
  word: 'charge',
  value: 308
}, {
  word: 'chase',
  value: 309
}, {
  word: 'chat',
  value: 310
}, {
  word: 'cheap',
  value: 311
}, {
  word: 'check',
  value: 312
}, {
  word: 'cheese',
  value: 313
}, {
  word: 'chef',
  value: 314
}, {
  word: 'cherry',
  value: 315
}, {
  word: 'chest',
  value: 316
}, {
  word: 'chicken',
  value: 317
}, {
  word: 'chief',
  value: 318
}, {
  word: 'child',
  value: 319
}, {
  word: 'chimney',
  value: 320
}, {
  word: 'choice',
  value: 321
}, {
  word: 'choose',
  value: 322
}, {
  word: 'chronic',
  value: 323
}, {
  word: 'chuckle',
  value: 324
}, {
  word: 'chunk',
  value: 325
}, {
  word: 'churn',
  value: 326
}, {
  word: 'cigar',
  value: 327
}, {
  word: 'cinnamon',
  value: 328
}, {
  word: 'circle',
  value: 329
}, {
  word: 'citizen',
  value: 330
}, {
  word: 'city',
  value: 331
}, {
  word: 'civil',
  value: 332
}, {
  word: 'claim',
  value: 333
}, {
  word: 'clap',
  value: 334
}, {
  word: 'clarify',
  value: 335
}, {
  word: 'claw',
  value: 336
}, {
  word: 'clay',
  value: 337
}, {
  word: 'clean',
  value: 338
}, {
  word: 'clerk',
  value: 339
}, {
  word: 'clever',
  value: 340
}, {
  word: 'click',
  value: 341
}, {
  word: 'client',
  value: 342
}, {
  word: 'cliff',
  value: 343
}, {
  word: 'climb',
  value: 344
}, {
  word: 'clinic',
  value: 345
}, {
  word: 'clip',
  value: 346
}, {
  word: 'clock',
  value: 347
}, {
  word: 'clog',
  value: 348
}, {
  word: 'close',
  value: 349
}, {
  word: 'cloth',
  value: 350
}, {
  word: 'cloud',
  value: 351
}, {
  word: 'clown',
  value: 352
}, {
  word: 'club',
  value: 353
}, {
  word: 'clump',
  value: 354
}, {
  word: 'cluster',
  value: 355
}, {
  word: 'clutch',
  value: 356
}, {
  word: 'coach',
  value: 357
}, {
  word: 'coast',
  value: 358
}, {
  word: 'coconut',
  value: 359
}, {
  word: 'code',
  value: 360
}, {
  word: 'coffee',
  value: 361
}, {
  word: 'coil',
  value: 362
}, {
  word: 'coin',
  value: 363
}, {
  word: 'collect',
  value: 364
}, {
  word: 'color',
  value: 365
}, {
  word: 'column',
  value: 366
}, {
  word: 'combine',
  value: 367
}, {
  word: 'come',
  value: 368
}, {
  word: 'comfort',
  value: 369
}, {
  word: 'comic',
  value: 370
}, {
  word: 'common',
  value: 371
}, {
  word: 'company',
  value: 372
}, {
  word: 'concert',
  value: 373
}, {
  word: 'conduct',
  value: 374
}, {
  word: 'confirm',
  value: 375
}, {
  word: 'congress',
  value: 376
}, {
  word: 'connect',
  value: 377
}, {
  word: 'consider',
  value: 378
}, {
  word: 'control',
  value: 379
}, {
  word: 'convince',
  value: 380
}, {
  word: 'cook',
  value: 381
}, {
  word: 'cool',
  value: 382
}, {
  word: 'copper',
  value: 383
}, {
  word: 'copy',
  value: 384
}, {
  word: 'coral',
  value: 385
}, {
  word: 'core',
  value: 386
}, {
  word: 'corn',
  value: 387
}, {
  word: 'correct',
  value: 388
}, {
  word: 'cost',
  value: 389
}, {
  word: 'cotton',
  value: 390
}, {
  word: 'couch',
  value: 391
}, {
  word: 'country',
  value: 392
}, {
  word: 'couple',
  value: 393
}, {
  word: 'course',
  value: 394
}, {
  word: 'cousin',
  value: 395
}, {
  word: 'cover',
  value: 396
}, {
  word: 'coyote',
  value: 397
}, {
  word: 'crack',
  value: 398
}, {
  word: 'cradle',
  value: 399
}, {
  word: 'craft',
  value: 400
}, {
  word: 'cram',
  value: 401
}, {
  word: 'crane',
  value: 402
}, {
  word: 'crash',
  value: 403
}, {
  word: 'crater',
  value: 404
}, {
  word: 'crawl',
  value: 405
}, {
  word: 'crazy',
  value: 406
}, {
  word: 'cream',
  value: 407
}, {
  word: 'credit',
  value: 408
}, {
  word: 'creek',
  value: 409
}, {
  word: 'crew',
  value: 410
}, {
  word: 'cricket',
  value: 411
}, {
  word: 'crime',
  value: 412
}, {
  word: 'crisp',
  value: 413
}, {
  word: 'critic',
  value: 414
}, {
  word: 'crop',
  value: 415
}, {
  word: 'cross',
  value: 416
}, {
  word: 'crouch',
  value: 417
}, {
  word: 'crowd',
  value: 418
}, {
  word: 'crucial',
  value: 419
}, {
  word: 'cruel',
  value: 420
}, {
  word: 'cruise',
  value: 421
}, {
  word: 'crumble',
  value: 422
}, {
  word: 'crunch',
  value: 423
}, {
  word: 'crush',
  value: 424
}, {
  word: 'cry',
  value: 425
}, {
  word: 'crystal',
  value: 426
}, {
  word: 'cube',
  value: 427
}, {
  word: 'culture',
  value: 428
}, {
  word: 'cup',
  value: 429
}, {
  word: 'cupboard',
  value: 430
}, {
  word: 'curious',
  value: 431
}, {
  word: 'current',
  value: 432
}, {
  word: 'curtain',
  value: 433
}, {
  word: 'curve',
  value: 434
}, {
  word: 'cushion',
  value: 435
}, {
  word: 'custom',
  value: 436
}, {
  word: 'cute',
  value: 437
}, {
  word: 'cycle',
  value: 438
}, {
  word: 'dad',
  value: 439
}, {
  word: 'damage',
  value: 440
}, {
  word: 'damp',
  value: 441
}, {
  word: 'dance',
  value: 442
}, {
  word: 'danger',
  value: 443
}, {
  word: 'daring',
  value: 444
}, {
  word: 'dash',
  value: 445
}, {
  word: 'daughter',
  value: 446
}, {
  word: 'dawn',
  value: 447
}, {
  word: 'day',
  value: 448
}, {
  word: 'deal',
  value: 449
}, {
  word: 'debate',
  value: 450
}, {
  word: 'debris',
  value: 451
}, {
  word: 'decade',
  value: 452
}, {
  word: 'december',
  value: 453
}, {
  word: 'decide',
  value: 454
}, {
  word: 'decline',
  value: 455
}, {
  word: 'decorate',
  value: 456
}, {
  word: 'decrease',
  value: 457
}, {
  word: 'deer',
  value: 458
}, {
  word: 'defense',
  value: 459
}, {
  word: 'define',
  value: 460
}, {
  word: 'defy',
  value: 461
}, {
  word: 'degree',
  value: 462
}, {
  word: 'delay',
  value: 463
}, {
  word: 'deliver',
  value: 464
}, {
  word: 'demand',
  value: 465
}, {
  word: 'demise',
  value: 466
}, {
  word: 'denial',
  value: 467
}, {
  word: 'dentist',
  value: 468
}, {
  word: 'deny',
  value: 469
}, {
  word: 'depart',
  value: 470
}, {
  word: 'depend',
  value: 471
}, {
  word: 'deposit',
  value: 472
}, {
  word: 'depth',
  value: 473
}, {
  word: 'deputy',
  value: 474
}, {
  word: 'derive',
  value: 475
}, {
  word: 'describe',
  value: 476
}, {
  word: 'desert',
  value: 477
}, {
  word: 'design',
  value: 478
}, {
  word: 'desk',
  value: 479
}, {
  word: 'despair',
  value: 480
}, {
  word: 'destroy',
  value: 481
}, {
  word: 'detail',
  value: 482
}, {
  word: 'detect',
  value: 483
}, {
  word: 'develop',
  value: 484
}, {
  word: 'device',
  value: 485
}, {
  word: 'devote',
  value: 486
}, {
  word: 'diagram',
  value: 487
}, {
  word: 'dial',
  value: 488
}, {
  word: 'diamond',
  value: 489
}, {
  word: 'diary',
  value: 490
}, {
  word: 'dice',
  value: 491
}, {
  word: 'diesel',
  value: 492
}, {
  word: 'diet',
  value: 493
}, {
  word: 'differ',
  value: 494
}, {
  word: 'digital',
  value: 495
}, {
  word: 'dignity',
  value: 496
}, {
  word: 'dilemma',
  value: 497
}, {
  word: 'dinner',
  value: 498
}, {
  word: 'dinosaur',
  value: 499
}, {
  word: 'direct',
  value: 500
}, {
  word: 'dirt',
  value: 501
}, {
  word: 'disagree',
  value: 502
}, {
  word: 'discover',
  value: 503
}, {
  word: 'disease',
  value: 504
}, {
  word: 'dish',
  value: 505
}, {
  word: 'dismiss',
  value: 506
}, {
  word: 'disorder',
  value: 507
}, {
  word: 'display',
  value: 508
}, {
  word: 'distance',
  value: 509
}, {
  word: 'divert',
  value: 510
}, {
  word: 'divide',
  value: 511
}, {
  word: 'divorce',
  value: 512
}, {
  word: 'dizzy',
  value: 513
}, {
  word: 'doctor',
  value: 514
}, {
  word: 'document',
  value: 515
}, {
  word: 'dog',
  value: 516
}, {
  word: 'doll',
  value: 517
}, {
  word: 'dolphin',
  value: 518
}, {
  word: 'domain',
  value: 519
}, {
  word: 'donate',
  value: 520
}, {
  word: 'donkey',
  value: 521
}, {
  word: 'donor',
  value: 522
}, {
  word: 'door',
  value: 523
}, {
  word: 'dose',
  value: 524
}, {
  word: 'double',
  value: 525
}, {
  word: 'dove',
  value: 526
}, {
  word: 'draft',
  value: 527
}, {
  word: 'dragon',
  value: 528
}, {
  word: 'drama',
  value: 529
}, {
  word: 'drastic',
  value: 530
}, {
  word: 'draw',
  value: 531
}, {
  word: 'dream',
  value: 532
}, {
  word: 'dress',
  value: 533
}, {
  word: 'drift',
  value: 534
}, {
  word: 'drill',
  value: 535
}, {
  word: 'drink',
  value: 536
}, {
  word: 'drip',
  value: 537
}, {
  word: 'drive',
  value: 538
}, {
  word: 'drop',
  value: 539
}, {
  word: 'drum',
  value: 540
}, {
  word: 'dry',
  value: 541
}, {
  word: 'duck',
  value: 542
}, {
  word: 'dumb',
  value: 543
}, {
  word: 'dune',
  value: 544
}, {
  word: 'during',
  value: 545
}, {
  word: 'dust',
  value: 546
}, {
  word: 'dutch',
  value: 547
}, {
  word: 'duty',
  value: 548
}, {
  word: 'dwarf',
  value: 549
}, {
  word: 'dynamic',
  value: 550
}, {
  word: 'eager',
  value: 551
}, {
  word: 'eagle',
  value: 552
}, {
  word: 'early',
  value: 553
}, {
  word: 'earn',
  value: 554
}, {
  word: 'earth',
  value: 555
}, {
  word: 'easily',
  value: 556
}, {
  word: 'east',
  value: 557
}, {
  word: 'easy',
  value: 558
}, {
  word: 'echo',
  value: 559
}, {
  word: 'ecology',
  value: 560
}, {
  word: 'economy',
  value: 561
}, {
  word: 'edge',
  value: 562
}, {
  word: 'edit',
  value: 563
}, {
  word: 'educate',
  value: 564
}, {
  word: 'effort',
  value: 565
}, {
  word: 'egg',
  value: 566
}, {
  word: 'eight',
  value: 567
}, {
  word: 'either',
  value: 568
}, {
  word: 'elbow',
  value: 569
}, {
  word: 'elder',
  value: 570
}, {
  word: 'electric',
  value: 571
}, {
  word: 'elegant',
  value: 572
}, {
  word: 'element',
  value: 573
}, {
  word: 'elephant',
  value: 574
}, {
  word: 'elevator',
  value: 575
}, {
  word: 'elite',
  value: 576
}, {
  word: 'else',
  value: 577
}, {
  word: 'embark',
  value: 578
}, {
  word: 'embody',
  value: 579
}, {
  word: 'embrace',
  value: 580
}, {
  word: 'emerge',
  value: 581
}, {
  word: 'emotion',
  value: 582
}, {
  word: 'employ',
  value: 583
}, {
  word: 'empower',
  value: 584
}, {
  word: 'empty',
  value: 585
}, {
  word: 'enable',
  value: 586
}, {
  word: 'enact',
  value: 587
}, {
  word: 'end',
  value: 588
}, {
  word: 'endless',
  value: 589
}, {
  word: 'endorse',
  value: 590
}, {
  word: 'enemy',
  value: 591
}, {
  word: 'energy',
  value: 592
}, {
  word: 'enforce',
  value: 593
}, {
  word: 'engage',
  value: 594
}, {
  word: 'engine',
  value: 595
}, {
  word: 'enhance',
  value: 596
}, {
  word: 'enjoy',
  value: 597
}, {
  word: 'enlist',
  value: 598
}, {
  word: 'enough',
  value: 599
}, {
  word: 'enrich',
  value: 600
}, {
  word: 'enroll',
  value: 601
}, {
  word: 'ensure',
  value: 602
}, {
  word: 'enter',
  value: 603
}, {
  word: 'entire',
  value: 604
}, {
  word: 'entry',
  value: 605
}, {
  word: 'envelope',
  value: 606
}, {
  word: 'episode',
  value: 607
}, {
  word: 'equal',
  value: 608
}, {
  word: 'equip',
  value: 609
}, {
  word: 'era',
  value: 610
}, {
  word: 'erase',
  value: 611
}, {
  word: 'erode',
  value: 612
}, {
  word: 'erosion',
  value: 613
}, {
  word: 'error',
  value: 614
}, {
  word: 'erupt',
  value: 615
}, {
  word: 'escape',
  value: 616
}, {
  word: 'essay',
  value: 617
}, {
  word: 'essence',
  value: 618
}, {
  word: 'estate',
  value: 619
}, {
  word: 'eternal',
  value: 620
}, {
  word: 'ethics',
  value: 621
}, {
  word: 'evidence',
  value: 622
}, {
  word: 'evil',
  value: 623
}, {
  word: 'evoke',
  value: 624
}, {
  word: 'evolve',
  value: 625
}, {
  word: 'exact',
  value: 626
}, {
  word: 'example',
  value: 627
}, {
  word: 'excess',
  value: 628
}, {
  word: 'exchange',
  value: 629
}, {
  word: 'excite',
  value: 630
}, {
  word: 'exclude',
  value: 631
}, {
  word: 'excuse',
  value: 632
}, {
  word: 'execute',
  value: 633
}, {
  word: 'exercise',
  value: 634
}, {
  word: 'exhaust',
  value: 635
}, {
  word: 'exhibit',
  value: 636
}, {
  word: 'exile',
  value: 637
}, {
  word: 'exist',
  value: 638
}, {
  word: 'exit',
  value: 639
}, {
  word: 'exotic',
  value: 640
}, {
  word: 'expand',
  value: 641
}, {
  word: 'expect',
  value: 642
}, {
  word: 'expire',
  value: 643
}, {
  word: 'explain',
  value: 644
}, {
  word: 'expose',
  value: 645
}, {
  word: 'express',
  value: 646
}, {
  word: 'extend',
  value: 647
}, {
  word: 'extra',
  value: 648
}, {
  word: 'eye',
  value: 649
}, {
  word: 'eyebrow',
  value: 650
}, {
  word: 'fabric',
  value: 651
}, {
  word: 'face',
  value: 652
}, {
  word: 'faculty',
  value: 653
}, {
  word: 'fade',
  value: 654
}, {
  word: 'faint',
  value: 655
}, {
  word: 'faith',
  value: 656
}, {
  word: 'fall',
  value: 657
}, {
  word: 'false',
  value: 658
}, {
  word: 'fame',
  value: 659
}, {
  word: 'family',
  value: 660
}, {
  word: 'famous',
  value: 661
}, {
  word: 'fan',
  value: 662
}, {
  word: 'fancy',
  value: 663
}, {
  word: 'fantasy',
  value: 664
}, {
  word: 'farm',
  value: 665
}, {
  word: 'fashion',
  value: 666
}, {
  word: 'fat',
  value: 667
}, {
  word: 'fatal',
  value: 668
}, {
  word: 'father',
  value: 669
}, {
  word: 'fatigue',
  value: 670
}, {
  word: 'fault',
  value: 671
}, {
  word: 'favorite',
  value: 672
}, {
  word: 'feature',
  value: 673
}, {
  word: 'february',
  value: 674
}, {
  word: 'federal',
  value: 675
}, {
  word: 'fee',
  value: 676
}, {
  word: 'feed',
  value: 677
}, {
  word: 'feel',
  value: 678
}, {
  word: 'female',
  value: 679
}, {
  word: 'fence',
  value: 680
}, {
  word: 'festival',
  value: 681
}, {
  word: 'fetch',
  value: 682
}, {
  word: 'fever',
  value: 683
}, {
  word: 'few',
  value: 684
}, {
  word: 'fiber',
  value: 685
}, {
  word: 'fiction',
  value: 686
}, {
  word: 'field',
  value: 687
}, {
  word: 'figure',
  value: 688
}, {
  word: 'file',
  value: 689
}, {
  word: 'film',
  value: 690
}, {
  word: 'filter',
  value: 691
}, {
  word: 'final',
  value: 692
}, {
  word: 'find',
  value: 693
}, {
  word: 'fine',
  value: 694
}, {
  word: 'finger',
  value: 695
}, {
  word: 'finish',
  value: 696
}, {
  word: 'fire',
  value: 697
}, {
  word: 'firm',
  value: 698
}, {
  word: 'first',
  value: 699
}, {
  word: 'fiscal',
  value: 700
}, {
  word: 'fish',
  value: 701
}, {
  word: 'fit',
  value: 702
}, {
  word: 'fitness',
  value: 703
}, {
  word: 'fix',
  value: 704
}, {
  word: 'flag',
  value: 705
}, {
  word: 'flame',
  value: 706
}, {
  word: 'flash',
  value: 707
}, {
  word: 'flat',
  value: 708
}, {
  word: 'flavor',
  value: 709
}, {
  word: 'flee',
  value: 710
}, {
  word: 'flight',
  value: 711
}, {
  word: 'flip',
  value: 712
}, {
  word: 'float',
  value: 713
}, {
  word: 'flock',
  value: 714
}, {
  word: 'floor',
  value: 715
}, {
  word: 'flower',
  value: 716
}, {
  word: 'fluid',
  value: 717
}, {
  word: 'flush',
  value: 718
}, {
  word: 'fly',
  value: 719
}, {
  word: 'foam',
  value: 720
}, {
  word: 'focus',
  value: 721
}, {
  word: 'fog',
  value: 722
}, {
  word: 'foil',
  value: 723
}, {
  word: 'fold',
  value: 724
}, {
  word: 'follow',
  value: 725
}, {
  word: 'food',
  value: 726
}, {
  word: 'foot',
  value: 727
}, {
  word: 'force',
  value: 728
}, {
  word: 'forest',
  value: 729
}, {
  word: 'forget',
  value: 730
}, {
  word: 'fork',
  value: 731
}, {
  word: 'fortune',
  value: 732
}, {
  word: 'forum',
  value: 733
}, {
  word: 'forward',
  value: 734
}, {
  word: 'fossil',
  value: 735
}, {
  word: 'foster',
  value: 736
}, {
  word: 'found',
  value: 737
}, {
  word: 'fox',
  value: 738
}, {
  word: 'fragile',
  value: 739
}, {
  word: 'frame',
  value: 740
}, {
  word: 'frequent',
  value: 741
}, {
  word: 'fresh',
  value: 742
}, {
  word: 'friend',
  value: 743
}, {
  word: 'fringe',
  value: 744
}, {
  word: 'frog',
  value: 745
}, {
  word: 'front',
  value: 746
}, {
  word: 'frost',
  value: 747
}, {
  word: 'frown',
  value: 748
}, {
  word: 'frozen',
  value: 749
}, {
  word: 'fruit',
  value: 750
}, {
  word: 'fuel',
  value: 751
}, {
  word: 'fun',
  value: 752
}, {
  word: 'funny',
  value: 753
}, {
  word: 'furnace',
  value: 754
}, {
  word: 'fury',
  value: 755
}, {
  word: 'future',
  value: 756
}, {
  word: 'gadget',
  value: 757
}, {
  word: 'gain',
  value: 758
}, {
  word: 'galaxy',
  value: 759
}, {
  word: 'gallery',
  value: 760
}, {
  word: 'game',
  value: 761
}, {
  word: 'gap',
  value: 762
}, {
  word: 'garage',
  value: 763
}, {
  word: 'garbage',
  value: 764
}, {
  word: 'garden',
  value: 765
}, {
  word: 'garlic',
  value: 766
}, {
  word: 'garment',
  value: 767
}, {
  word: 'gas',
  value: 768
}, {
  word: 'gasp',
  value: 769
}, {
  word: 'gate',
  value: 770
}, {
  word: 'gather',
  value: 771
}, {
  word: 'gauge',
  value: 772
}, {
  word: 'gaze',
  value: 773
}, {
  word: 'general',
  value: 774
}, {
  word: 'genius',
  value: 775
}, {
  word: 'genre',
  value: 776
}, {
  word: 'gentle',
  value: 777
}, {
  word: 'genuine',
  value: 778
}, {
  word: 'gesture',
  value: 779
}, {
  word: 'ghost',
  value: 780
}, {
  word: 'giant',
  value: 781
}, {
  word: 'gift',
  value: 782
}, {
  word: 'giggle',
  value: 783
}, {
  word: 'ginger',
  value: 784
}, {
  word: 'giraffe',
  value: 785
}, {
  word: 'girl',
  value: 786
}, {
  word: 'give',
  value: 787
}, {
  word: 'glad',
  value: 788
}, {
  word: 'glance',
  value: 789
}, {
  word: 'glare',
  value: 790
}, {
  word: 'glass',
  value: 791
}, {
  word: 'glide',
  value: 792
}, {
  word: 'glimpse',
  value: 793
}, {
  word: 'globe',
  value: 794
}, {
  word: 'gloom',
  value: 795
}, {
  word: 'glory',
  value: 796
}, {
  word: 'glove',
  value: 797
}, {
  word: 'glow',
  value: 798
}, {
  word: 'glue',
  value: 799
}, {
  word: 'goat',
  value: 800
}, {
  word: 'goddess',
  value: 801
}, {
  word: 'gold',
  value: 802
}, {
  word: 'good',
  value: 803
}, {
  word: 'goose',
  value: 804
}, {
  word: 'gorilla',
  value: 805
}, {
  word: 'gospel',
  value: 806
}, {
  word: 'gossip',
  value: 807
}, {
  word: 'govern',
  value: 808
}, {
  word: 'gown',
  value: 809
}, {
  word: 'grab',
  value: 810
}, {
  word: 'grace',
  value: 811
}, {
  word: 'grain',
  value: 812
}, {
  word: 'grant',
  value: 813
}, {
  word: 'grape',
  value: 814
}, {
  word: 'grass',
  value: 815
}, {
  word: 'gravity',
  value: 816
}, {
  word: 'great',
  value: 817
}, {
  word: 'green',
  value: 818
}, {
  word: 'grid',
  value: 819
}, {
  word: 'grief',
  value: 820
}, {
  word: 'grit',
  value: 821
}, {
  word: 'grocery',
  value: 822
}, {
  word: 'group',
  value: 823
}, {
  word: 'grow',
  value: 824
}, {
  word: 'grunt',
  value: 825
}, {
  word: 'guard',
  value: 826
}, {
  word: 'guess',
  value: 827
}, {
  word: 'guide',
  value: 828
}, {
  word: 'guilt',
  value: 829
}, {
  word: 'guitar',
  value: 830
}, {
  word: 'gun',
  value: 831
}, {
  word: 'gym',
  value: 832
}, {
  word: 'habit',
  value: 833
}, {
  word: 'hair',
  value: 834
}, {
  word: 'half',
  value: 835
}, {
  word: 'hammer',
  value: 836
}, {
  word: 'hamster',
  value: 837
}, {
  word: 'hand',
  value: 838
}, {
  word: 'happy',
  value: 839
}, {
  word: 'harbor',
  value: 840
}, {
  word: 'hard',
  value: 841
}, {
  word: 'harsh',
  value: 842
}, {
  word: 'harvest',
  value: 843
}, {
  word: 'hat',
  value: 844
}, {
  word: 'have',
  value: 845
}, {
  word: 'hawk',
  value: 846
}, {
  word: 'hazard',
  value: 847
}, {
  word: 'head',
  value: 848
}, {
  word: 'health',
  value: 849
}, {
  word: 'heart',
  value: 850
}, {
  word: 'heavy',
  value: 851
}, {
  word: 'hedgehog',
  value: 852
}, {
  word: 'height',
  value: 853
}, {
  word: 'hello',
  value: 854
}, {
  word: 'helmet',
  value: 855
}, {
  word: 'help',
  value: 856
}, {
  word: 'hen',
  value: 857
}, {
  word: 'hero',
  value: 858
}, {
  word: 'hidden',
  value: 859
}, {
  word: 'high',
  value: 860
}, {
  word: 'hill',
  value: 861
}, {
  word: 'hint',
  value: 862
}, {
  word: 'hip',
  value: 863
}, {
  word: 'hire',
  value: 864
}, {
  word: 'history',
  value: 865
}, {
  word: 'hobby',
  value: 866
}, {
  word: 'hockey',
  value: 867
}, {
  word: 'hold',
  value: 868
}, {
  word: 'hole',
  value: 869
}, {
  word: 'holiday',
  value: 870
}, {
  word: 'hollow',
  value: 871
}, {
  word: 'home',
  value: 872
}, {
  word: 'honey',
  value: 873
}, {
  word: 'hood',
  value: 874
}, {
  word: 'hope',
  value: 875
}, {
  word: 'horn',
  value: 876
}, {
  word: 'horror',
  value: 877
}, {
  word: 'horse',
  value: 878
}, {
  word: 'hospital',
  value: 879
}, {
  word: 'host',
  value: 880
}, {
  word: 'hotel',
  value: 881
}, {
  word: 'hour',
  value: 882
}, {
  word: 'hover',
  value: 883
}, {
  word: 'hub',
  value: 884
}, {
  word: 'huge',
  value: 885
}, {
  word: 'human',
  value: 886
}, {
  word: 'humble',
  value: 887
}, {
  word: 'humor',
  value: 888
}, {
  word: 'hundred',
  value: 889
}, {
  word: 'hungry',
  value: 890
}, {
  word: 'hunt',
  value: 891
}, {
  word: 'hurdle',
  value: 892
}, {
  word: 'hurry',
  value: 893
}, {
  word: 'hurt',
  value: 894
}, {
  word: 'husband',
  value: 895
}, {
  word: 'hybrid',
  value: 896
}, {
  word: 'ice',
  value: 897
}, {
  word: 'icon',
  value: 898
}, {
  word: 'idea',
  value: 899
}, {
  word: 'identify',
  value: 900
}, {
  word: 'idle',
  value: 901
}, {
  word: 'ignore',
  value: 902
}, {
  word: 'ill',
  value: 903
}, {
  word: 'illegal',
  value: 904
}, {
  word: 'illness',
  value: 905
}, {
  word: 'image',
  value: 906
}, {
  word: 'imitate',
  value: 907
}, {
  word: 'immense',
  value: 908
}, {
  word: 'immune',
  value: 909
}, {
  word: 'impact',
  value: 910
}, {
  word: 'impose',
  value: 911
}, {
  word: 'improve',
  value: 912
}, {
  word: 'impulse',
  value: 913
}, {
  word: 'inch',
  value: 914
}, {
  word: 'include',
  value: 915
}, {
  word: 'income',
  value: 916
}, {
  word: 'increase',
  value: 917
}, {
  word: 'index',
  value: 918
}, {
  word: 'indicate',
  value: 919
}, {
  word: 'indoor',
  value: 920
}, {
  word: 'industry',
  value: 921
}, {
  word: 'infant',
  value: 922
}, {
  word: 'inflict',
  value: 923
}, {
  word: 'inform',
  value: 924
}, {
  word: 'inhale',
  value: 925
}, {
  word: 'inherit',
  value: 926
}, {
  word: 'initial',
  value: 927
}, {
  word: 'inject',
  value: 928
}, {
  word: 'injury',
  value: 929
}, {
  word: 'inmate',
  value: 930
}, {
  word: 'inner',
  value: 931
}, {
  word: 'innocent',
  value: 932
}, {
  word: 'input',
  value: 933
}, {
  word: 'inquiry',
  value: 934
}, {
  word: 'insane',
  value: 935
}, {
  word: 'insect',
  value: 936
}, {
  word: 'inside',
  value: 937
}, {
  word: 'inspire',
  value: 938
}, {
  word: 'install',
  value: 939
}, {
  word: 'intact',
  value: 940
}, {
  word: 'interest',
  value: 941
}, {
  word: 'into',
  value: 942
}, {
  word: 'invest',
  value: 943
}, {
  word: 'invite',
  value: 944
}, {
  word: 'involve',
  value: 945
}, {
  word: 'iron',
  value: 946
}, {
  word: 'island',
  value: 947
}, {
  word: 'isolate',
  value: 948
}, {
  word: 'issue',
  value: 949
}, {
  word: 'item',
  value: 950
}, {
  word: 'ivory',
  value: 951
}, {
  word: 'jacket',
  value: 952
}, {
  word: 'jaguar',
  value: 953
}, {
  word: 'jar',
  value: 954
}, {
  word: 'jazz',
  value: 955
}, {
  word: 'jealous',
  value: 956
}, {
  word: 'jeans',
  value: 957
}, {
  word: 'jelly',
  value: 958
}, {
  word: 'jewel',
  value: 959
}, {
  word: 'job',
  value: 960
}, {
  word: 'join',
  value: 961
}, {
  word: 'joke',
  value: 962
}, {
  word: 'journey',
  value: 963
}, {
  word: 'joy',
  value: 964
}, {
  word: 'judge',
  value: 965
}, {
  word: 'juice',
  value: 966
}, {
  word: 'jump',
  value: 967
}, {
  word: 'jungle',
  value: 968
}, {
  word: 'junior',
  value: 969
}, {
  word: 'junk',
  value: 970
}, {
  word: 'just',
  value: 971
}, {
  word: 'kangaroo',
  value: 972
}, {
  word: 'keen',
  value: 973
}, {
  word: 'keep',
  value: 974
}, {
  word: 'ketchup',
  value: 975
}, {
  word: 'key',
  value: 976
}, {
  word: 'kick',
  value: 977
}, {
  word: 'kid',
  value: 978
}, {
  word: 'kidney',
  value: 979
}, {
  word: 'kind',
  value: 980
}, {
  word: 'kingdom',
  value: 981
}, {
  word: 'kiss',
  value: 982
}, {
  word: 'kit',
  value: 983
}, {
  word: 'kitchen',
  value: 984
}, {
  word: 'kite',
  value: 985
}, {
  word: 'kitten',
  value: 986
}, {
  word: 'kiwi',
  value: 987
}, {
  word: 'knee',
  value: 988
}, {
  word: 'knife',
  value: 989
}, {
  word: 'knock',
  value: 990
}, {
  word: 'know',
  value: 991
}, {
  word: 'lab',
  value: 992
}, {
  word: 'label',
  value: 993
}, {
  word: 'labor',
  value: 994
}, {
  word: 'ladder',
  value: 995
}, {
  word: 'lady',
  value: 996
}, {
  word: 'lake',
  value: 997
}, {
  word: 'lamp',
  value: 998
}, {
  word: 'language',
  value: 999
}, {
  word: 'laptop',
  value: 1000
}, {
  word: 'large',
  value: 1001
}, {
  word: 'later',
  value: 1002
}, {
  word: 'latin',
  value: 1003
}, {
  word: 'laugh',
  value: 1004
}, {
  word: 'laundry',
  value: 1005
}, {
  word: 'lava',
  value: 1006
}, {
  word: 'law',
  value: 1007
}, {
  word: 'lawn',
  value: 1008
}, {
  word: 'lawsuit',
  value: 1009
}, {
  word: 'layer',
  value: 1010
}, {
  word: 'lazy',
  value: 1011
}, {
  word: 'leader',
  value: 1012
}, {
  word: 'leaf',
  value: 1013
}, {
  word: 'learn',
  value: 1014
}, {
  word: 'leave',
  value: 1015
}, {
  word: 'lecture',
  value: 1016
}, {
  word: 'left',
  value: 1017
}, {
  word: 'leg',
  value: 1018
}, {
  word: 'legal',
  value: 1019
}, {
  word: 'legend',
  value: 1020
}, {
  word: 'leisure',
  value: 1021
}, {
  word: 'lemon',
  value: 1022
}, {
  word: 'lend',
  value: 1023
}, {
  word: 'length',
  value: 1024
}, {
  word: 'lens',
  value: 1025
}, {
  word: 'leopard',
  value: 1026
}, {
  word: 'lesson',
  value: 1027
}, {
  word: 'letter',
  value: 1028
}, {
  word: 'level',
  value: 1029
}, {
  word: 'liar',
  value: 1030
}, {
  word: 'liberty',
  value: 1031
}, {
  word: 'library',
  value: 1032
}, {
  word: 'license',
  value: 1033
}, {
  word: 'life',
  value: 1034
}, {
  word: 'lift',
  value: 1035
}, {
  word: 'light',
  value: 1036
}, {
  word: 'like',
  value: 1037
}, {
  word: 'limb',
  value: 1038
}, {
  word: 'limit',
  value: 1039
}, {
  word: 'link',
  value: 1040
}, {
  word: 'lion',
  value: 1041
}, {
  word: 'liquid',
  value: 1042
}, {
  word: 'list',
  value: 1043
}, {
  word: 'little',
  value: 1044
}, {
  word: 'live',
  value: 1045
}, {
  word: 'lizard',
  value: 1046
}, {
  word: 'load',
  value: 1047
}, {
  word: 'loan',
  value: 1048
}, {
  word: 'lobster',
  value: 1049
}, {
  word: 'local',
  value: 1050
}, {
  word: 'lock',
  value: 1051
}, {
  word: 'logic',
  value: 1052
}, {
  word: 'lonely',
  value: 1053
}, {
  word: 'long',
  value: 1054
}, {
  word: 'loop',
  value: 1055
}, {
  word: 'lottery',
  value: 1056
}, {
  word: 'loud',
  value: 1057
}, {
  word: 'lounge',
  value: 1058
}, {
  word: 'love',
  value: 1059
}, {
  word: 'loyal',
  value: 1060
}, {
  word: 'lucky',
  value: 1061
}, {
  word: 'luggage',
  value: 1062
}, {
  word: 'lumber',
  value: 1063
}, {
  word: 'lunar',
  value: 1064
}, {
  word: 'lunch',
  value: 1065
}, {
  word: 'luxury',
  value: 1066
}, {
  word: 'lyrics',
  value: 1067
}, {
  word: 'machine',
  value: 1068
}, {
  word: 'mad',
  value: 1069
}, {
  word: 'magic',
  value: 1070
}, {
  word: 'magnet',
  value: 1071
}, {
  word: 'maid',
  value: 1072
}, {
  word: 'mail',
  value: 1073
}, {
  word: 'main',
  value: 1074
}, {
  word: 'major',
  value: 1075
}, {
  word: 'make',
  value: 1076
}, {
  word: 'mammal',
  value: 1077
}, {
  word: 'man',
  value: 1078
}, {
  word: 'manage',
  value: 1079
}, {
  word: 'mandate',
  value: 1080
}, {
  word: 'mango',
  value: 1081
}, {
  word: 'mansion',
  value: 1082
}, {
  word: 'manual',
  value: 1083
}, {
  word: 'maple',
  value: 1084
}, {
  word: 'marble',
  value: 1085
}, {
  word: 'march',
  value: 1086
}, {
  word: 'margin',
  value: 1087
}, {
  word: 'marine',
  value: 1088
}, {
  word: 'market',
  value: 1089
}, {
  word: 'marriage',
  value: 1090
}, {
  word: 'mask',
  value: 1091
}, {
  word: 'mass',
  value: 1092
}, {
  word: 'master',
  value: 1093
}, {
  word: 'match',
  value: 1094
}, {
  word: 'material',
  value: 1095
}, {
  word: 'math',
  value: 1096
}, {
  word: 'matrix',
  value: 1097
}, {
  word: 'matter',
  value: 1098
}, {
  word: 'maximum',
  value: 1099
}, {
  word: 'maze',
  value: 1100
}, {
  word: 'meadow',
  value: 1101
}, {
  word: 'mean',
  value: 1102
}, {
  word: 'measure',
  value: 1103
}, {
  word: 'meat',
  value: 1104
}, {
  word: 'mechanic',
  value: 1105
}, {
  word: 'medal',
  value: 1106
}, {
  word: 'media',
  value: 1107
}, {
  word: 'melody',
  value: 1108
}, {
  word: 'melt',
  value: 1109
}, {
  word: 'member',
  value: 1110
}, {
  word: 'memory',
  value: 1111
}, {
  word: 'mention',
  value: 1112
}, {
  word: 'menu',
  value: 1113
}, {
  word: 'mercy',
  value: 1114
}, {
  word: 'merge',
  value: 1115
}, {
  word: 'merit',
  value: 1116
}, {
  word: 'merry',
  value: 1117
}, {
  word: 'mesh',
  value: 1118
}, {
  word: 'message',
  value: 1119
}, {
  word: 'metal',
  value: 1120
}, {
  word: 'method',
  value: 1121
}, {
  word: 'middle',
  value: 1122
}, {
  word: 'midnight',
  value: 1123
}, {
  word: 'milk',
  value: 1124
}, {
  word: 'million',
  value: 1125
}, {
  word: 'mimic',
  value: 1126
}, {
  word: 'mind',
  value: 1127
}, {
  word: 'minimum',
  value: 1128
}, {
  word: 'minor',
  value: 1129
}, {
  word: 'minute',
  value: 1130
}, {
  word: 'miracle',
  value: 1131
}, {
  word: 'mirror',
  value: 1132
}, {
  word: 'misery',
  value: 1133
}, {
  word: 'miss',
  value: 1134
}, {
  word: 'mistake',
  value: 1135
}, {
  word: 'mix',
  value: 1136
}, {
  word: 'mixed',
  value: 1137
}, {
  word: 'mixture',
  value: 1138
}, {
  word: 'mobile',
  value: 1139
}, {
  word: 'model',
  value: 1140
}, {
  word: 'modify',
  value: 1141
}, {
  word: 'mom',
  value: 1142
}, {
  word: 'moment',
  value: 1143
}, {
  word: 'monitor',
  value: 1144
}, {
  word: 'monkey',
  value: 1145
}, {
  word: 'monster',
  value: 1146
}, {
  word: 'month',
  value: 1147
}, {
  word: 'moon',
  value: 1148
}, {
  word: 'moral',
  value: 1149
}, {
  word: 'more',
  value: 1150
}, {
  word: 'morning',
  value: 1151
}, {
  word: 'mosquito',
  value: 1152
}, {
  word: 'mother',
  value: 1153
}, {
  word: 'motion',
  value: 1154
}, {
  word: 'motor',
  value: 1155
}, {
  word: 'mountain',
  value: 1156
}, {
  word: 'mouse',
  value: 1157
}, {
  word: 'move',
  value: 1158
}, {
  word: 'movie',
  value: 1159
}, {
  word: 'much',
  value: 1160
}, {
  word: 'muffin',
  value: 1161
}, {
  word: 'mule',
  value: 1162
}, {
  word: 'multiply',
  value: 1163
}, {
  word: 'muscle',
  value: 1164
}, {
  word: 'museum',
  value: 1165
}, {
  word: 'mushroom',
  value: 1166
}, {
  word: 'music',
  value: 1167
}, {
  word: 'must',
  value: 1168
}, {
  word: 'mutual',
  value: 1169
}, {
  word: 'myself',
  value: 1170
}, {
  word: 'mystery',
  value: 1171
}, {
  word: 'myth',
  value: 1172
}, {
  word: 'naive',
  value: 1173
}, {
  word: 'name',
  value: 1174
}, {
  word: 'napkin',
  value: 1175
}, {
  word: 'narrow',
  value: 1176
}, {
  word: 'nasty',
  value: 1177
}, {
  word: 'nation',
  value: 1178
}, {
  word: 'nature',
  value: 1179
}, {
  word: 'near',
  value: 1180
}, {
  word: 'neck',
  value: 1181
}, {
  word: 'need',
  value: 1182
}, {
  word: 'negative',
  value: 1183
}, {
  word: 'neglect',
  value: 1184
}, {
  word: 'neither',
  value: 1185
}, {
  word: 'nephew',
  value: 1186
}, {
  word: 'nerve',
  value: 1187
}, {
  word: 'nest',
  value: 1188
}, {
  word: 'net',
  value: 1189
}, {
  word: 'network',
  value: 1190
}, {
  word: 'neutral',
  value: 1191
}, {
  word: 'never',
  value: 1192
}, {
  word: 'news',
  value: 1193
}, {
  word: 'next',
  value: 1194
}, {
  word: 'nice',
  value: 1195
}, {
  word: 'night',
  value: 1196
}, {
  word: 'noble',
  value: 1197
}, {
  word: 'noise',
  value: 1198
}, {
  word: 'nominee',
  value: 1199
}, {
  word: 'noodle',
  value: 1200
}, {
  word: 'normal',
  value: 1201
}, {
  word: 'north',
  value: 1202
}, {
  word: 'nose',
  value: 1203
}, {
  word: 'notable',
  value: 1204
}, {
  word: 'note',
  value: 1205
}, {
  word: 'nothing',
  value: 1206
}, {
  word: 'notice',
  value: 1207
}, {
  word: 'novel',
  value: 1208
}, {
  word: 'now',
  value: 1209
}, {
  word: 'nuclear',
  value: 1210
}, {
  word: 'number',
  value: 1211
}, {
  word: 'nurse',
  value: 1212
}, {
  word: 'nut',
  value: 1213
}, {
  word: 'oak',
  value: 1214
}, {
  word: 'obey',
  value: 1215
}, {
  word: 'object',
  value: 1216
}, {
  word: 'oblige',
  value: 1217
}, {
  word: 'obscure',
  value: 1218
}, {
  word: 'observe',
  value: 1219
}, {
  word: 'obtain',
  value: 1220
}, {
  word: 'obvious',
  value: 1221
}, {
  word: 'occur',
  value: 1222
}, {
  word: 'ocean',
  value: 1223
}, {
  word: 'october',
  value: 1224
}, {
  word: 'odor',
  value: 1225
}, {
  word: 'off',
  value: 1226
}, {
  word: 'offer',
  value: 1227
}, {
  word: 'office',
  value: 1228
}, {
  word: 'often',
  value: 1229
}, {
  word: 'oil',
  value: 1230
}, {
  word: 'okay',
  value: 1231
}, {
  word: 'old',
  value: 1232
}, {
  word: 'olive',
  value: 1233
}, {
  word: 'olympic',
  value: 1234
}, {
  word: 'omit',
  value: 1235
}, {
  word: 'once',
  value: 1236
}, {
  word: 'one',
  value: 1237
}, {
  word: 'onion',
  value: 1238
}, {
  word: 'online',
  value: 1239
}, {
  word: 'only',
  value: 1240
}, {
  word: 'open',
  value: 1241
}, {
  word: 'opera',
  value: 1242
}, {
  word: 'opinion',
  value: 1243
}, {
  word: 'oppose',
  value: 1244
}, {
  word: 'option',
  value: 1245
}, {
  word: 'orange',
  value: 1246
}, {
  word: 'orbit',
  value: 1247
}, {
  word: 'orchard',
  value: 1248
}, {
  word: 'order',
  value: 1249
}, {
  word: 'ordinary',
  value: 1250
}, {
  word: 'organ',
  value: 1251
}, {
  word: 'orient',
  value: 1252
}, {
  word: 'original',
  value: 1253
}, {
  word: 'orphan',
  value: 1254
}, {
  word: 'ostrich',
  value: 1255
}, {
  word: 'other',
  value: 1256
}, {
  word: 'outdoor',
  value: 1257
}, {
  word: 'outer',
  value: 1258
}, {
  word: 'output',
  value: 1259
}, {
  word: 'outside',
  value: 1260
}, {
  word: 'oval',
  value: 1261
}, {
  word: 'oven',
  value: 1262
}, {
  word: 'over',
  value: 1263
}, {
  word: 'own',
  value: 1264
}, {
  word: 'owner',
  value: 1265
}, {
  word: 'oxygen',
  value: 1266
}, {
  word: 'oyster',
  value: 1267
}, {
  word: 'ozone',
  value: 1268
}, {
  word: 'pact',
  value: 1269
}, {
  word: 'paddle',
  value: 1270
}, {
  word: 'page',
  value: 1271
}, {
  word: 'pair',
  value: 1272
}, {
  word: 'palace',
  value: 1273
}, {
  word: 'palm',
  value: 1274
}, {
  word: 'panda',
  value: 1275
}, {
  word: 'panel',
  value: 1276
}, {
  word: 'panic',
  value: 1277
}, {
  word: 'panther',
  value: 1278
}, {
  word: 'paper',
  value: 1279
}, {
  word: 'parade',
  value: 1280
}, {
  word: 'parent',
  value: 1281
}, {
  word: 'park',
  value: 1282
}, {
  word: 'parrot',
  value: 1283
}, {
  word: 'party',
  value: 1284
}, {
  word: 'pass',
  value: 1285
}, {
  word: 'patch',
  value: 1286
}, {
  word: 'path',
  value: 1287
}, {
  word: 'patient',
  value: 1288
}, {
  word: 'patrol',
  value: 1289
}, {
  word: 'pattern',
  value: 1290
}, {
  word: 'pause',
  value: 1291
}, {
  word: 'pave',
  value: 1292
}, {
  word: 'payment',
  value: 1293
}, {
  word: 'peace',
  value: 1294
}, {
  word: 'peanut',
  value: 1295
}, {
  word: 'pear',
  value: 1296
}, {
  word: 'peasant',
  value: 1297
}, {
  word: 'pelican',
  value: 1298
}, {
  word: 'pen',
  value: 1299
}, {
  word: 'penalty',
  value: 1300
}, {
  word: 'pencil',
  value: 1301
}, {
  word: 'people',
  value: 1302
}, {
  word: 'pepper',
  value: 1303
}, {
  word: 'perfect',
  value: 1304
}, {
  word: 'permit',
  value: 1305
}, {
  word: 'person',
  value: 1306
}, {
  word: 'pet',
  value: 1307
}, {
  word: 'phone',
  value: 1308
}, {
  word: 'photo',
  value: 1309
}, {
  word: 'phrase',
  value: 1310
}, {
  word: 'physical',
  value: 1311
}, {
  word: 'piano',
  value: 1312
}, {
  word: 'picnic',
  value: 1313
}, {
  word: 'picture',
  value: 1314
}, {
  word: 'piece',
  value: 1315
}, {
  word: 'pig',
  value: 1316
}, {
  word: 'pigeon',
  value: 1317
}, {
  word: 'pill',
  value: 1318
}, {
  word: 'pilot',
  value: 1319
}, {
  word: 'pink',
  value: 1320
}, {
  word: 'pioneer',
  value: 1321
}, {
  word: 'pipe',
  value: 1322
}, {
  word: 'pistol',
  value: 1323
}, {
  word: 'pitch',
  value: 1324
}, {
  word: 'pizza',
  value: 1325
}, {
  word: 'place',
  value: 1326
}, {
  word: 'planet',
  value: 1327
}, {
  word: 'plastic',
  value: 1328
}, {
  word: 'plate',
  value: 1329
}, {
  word: 'play',
  value: 1330
}, {
  word: 'please',
  value: 1331
}, {
  word: 'pledge',
  value: 1332
}, {
  word: 'pluck',
  value: 1333
}, {
  word: 'plug',
  value: 1334
}, {
  word: 'plunge',
  value: 1335
}, {
  word: 'poem',
  value: 1336
}, {
  word: 'poet',
  value: 1337
}, {
  word: 'point',
  value: 1338
}, {
  word: 'polar',
  value: 1339
}, {
  word: 'pole',
  value: 1340
}, {
  word: 'police',
  value: 1341
}, {
  word: 'pond',
  value: 1342
}, {
  word: 'pony',
  value: 1343
}, {
  word: 'pool',
  value: 1344
}, {
  word: 'popular',
  value: 1345
}, {
  word: 'portion',
  value: 1346
}, {
  word: 'position',
  value: 1347
}, {
  word: 'possible',
  value: 1348
}, {
  word: 'post',
  value: 1349
}, {
  word: 'potato',
  value: 1350
}, {
  word: 'pottery',
  value: 1351
}, {
  word: 'poverty',
  value: 1352
}, {
  word: 'powder',
  value: 1353
}, {
  word: 'power',
  value: 1354
}, {
  word: 'practice',
  value: 1355
}, {
  word: 'praise',
  value: 1356
}, {
  word: 'predict',
  value: 1357
}, {
  word: 'prefer',
  value: 1358
}, {
  word: 'prepare',
  value: 1359
}, {
  word: 'present',
  value: 1360
}, {
  word: 'pretty',
  value: 1361
}, {
  word: 'prevent',
  value: 1362
}, {
  word: 'price',
  value: 1363
}, {
  word: 'pride',
  value: 1364
}, {
  word: 'primary',
  value: 1365
}, {
  word: 'print',
  value: 1366
}, {
  word: 'priority',
  value: 1367
}, {
  word: 'prison',
  value: 1368
}, {
  word: 'private',
  value: 1369
}, {
  word: 'prize',
  value: 1370
}, {
  word: 'problem',
  value: 1371
}, {
  word: 'process',
  value: 1372
}, {
  word: 'produce',
  value: 1373
}, {
  word: 'profit',
  value: 1374
}, {
  word: 'program',
  value: 1375
}, {
  word: 'project',
  value: 1376
}, {
  word: 'promote',
  value: 1377
}, {
  word: 'proof',
  value: 1378
}, {
  word: 'property',
  value: 1379
}, {
  word: 'prosper',
  value: 1380
}, {
  word: 'protect',
  value: 1381
}, {
  word: 'proud',
  value: 1382
}, {
  word: 'provide',
  value: 1383
}, {
  word: 'public',
  value: 1384
}, {
  word: 'pudding',
  value: 1385
}, {
  word: 'pull',
  value: 1386
}, {
  word: 'pulp',
  value: 1387
}, {
  word: 'pulse',
  value: 1388
}, {
  word: 'pumpkin',
  value: 1389
}, {
  word: 'punch',
  value: 1390
}, {
  word: 'pupil',
  value: 1391
}, {
  word: 'puppy',
  value: 1392
}, {
  word: 'purchase',
  value: 1393
}, {
  word: 'purity',
  value: 1394
}, {
  word: 'purpose',
  value: 1395
}, {
  word: 'purse',
  value: 1396
}, {
  word: 'push',
  value: 1397
}, {
  word: 'put',
  value: 1398
}, {
  word: 'puzzle',
  value: 1399
}, {
  word: 'pyramid',
  value: 1400
}, {
  word: 'quality',
  value: 1401
}, {
  word: 'quantum',
  value: 1402
}, {
  word: 'quarter',
  value: 1403
}, {
  word: 'question',
  value: 1404
}, {
  word: 'quick',
  value: 1405
}, {
  word: 'quit',
  value: 1406
}, {
  word: 'quiz',
  value: 1407
}, {
  word: 'quote',
  value: 1408
}, {
  word: 'rabbit',
  value: 1409
}, {
  word: 'raccoon',
  value: 1410
}, {
  word: 'race',
  value: 1411
}, {
  word: 'rack',
  value: 1412
}, {
  word: 'radar',
  value: 1413
}, {
  word: 'radio',
  value: 1414
}, {
  word: 'rail',
  value: 1415
}, {
  word: 'rain',
  value: 1416
}, {
  word: 'raise',
  value: 1417
}, {
  word: 'rally',
  value: 1418
}, {
  word: 'ramp',
  value: 1419
}, {
  word: 'ranch',
  value: 1420
}, {
  word: 'random',
  value: 1421
}, {
  word: 'range',
  value: 1422
}, {
  word: 'rapid',
  value: 1423
}, {
  word: 'rare',
  value: 1424
}, {
  word: 'rate',
  value: 1425
}, {
  word: 'rather',
  value: 1426
}, {
  word: 'raven',
  value: 1427
}, {
  word: 'raw',
  value: 1428
}, {
  word: 'razor',
  value: 1429
}, {
  word: 'ready',
  value: 1430
}, {
  word: 'real',
  value: 1431
}, {
  word: 'reason',
  value: 1432
}, {
  word: 'rebel',
  value: 1433
}, {
  word: 'rebuild',
  value: 1434
}, {
  word: 'recall',
  value: 1435
}, {
  word: 'receive',
  value: 1436
}, {
  word: 'recipe',
  value: 1437
}, {
  word: 'record',
  value: 1438
}, {
  word: 'recycle',
  value: 1439
}, {
  word: 'reduce',
  value: 1440
}, {
  word: 'reflect',
  value: 1441
}, {
  word: 'reform',
  value: 1442
}, {
  word: 'refuse',
  value: 1443
}, {
  word: 'region',
  value: 1444
}, {
  word: 'regret',
  value: 1445
}, {
  word: 'regular',
  value: 1446
}, {
  word: 'reject',
  value: 1447
}, {
  word: 'relax',
  value: 1448
}, {
  word: 'release',
  value: 1449
}, {
  word: 'relief',
  value: 1450
}, {
  word: 'rely',
  value: 1451
}, {
  word: 'remain',
  value: 1452
}, {
  word: 'remember',
  value: 1453
}, {
  word: 'remind',
  value: 1454
}, {
  word: 'remove',
  value: 1455
}, {
  word: 'render',
  value: 1456
}, {
  word: 'renew',
  value: 1457
}, {
  word: 'rent',
  value: 1458
}, {
  word: 'reopen',
  value: 1459
}, {
  word: 'repair',
  value: 1460
}, {
  word: 'repeat',
  value: 1461
}, {
  word: 'replace',
  value: 1462
}, {
  word: 'report',
  value: 1463
}, {
  word: 'require',
  value: 1464
}, {
  word: 'rescue',
  value: 1465
}, {
  word: 'resemble',
  value: 1466
}, {
  word: 'resist',
  value: 1467
}, {
  word: 'resource',
  value: 1468
}, {
  word: 'response',
  value: 1469
}, {
  word: 'result',
  value: 1470
}, {
  word: 'retire',
  value: 1471
}, {
  word: 'retreat',
  value: 1472
}, {
  word: 'return',
  value: 1473
}, {
  word: 'reunion',
  value: 1474
}, {
  word: 'reveal',
  value: 1475
}, {
  word: 'review',
  value: 1476
}, {
  word: 'reward',
  value: 1477
}, {
  word: 'rhythm',
  value: 1478
}, {
  word: 'rib',
  value: 1479
}, {
  word: 'ribbon',
  value: 1480
}, {
  word: 'rice',
  value: 1481
}, {
  word: 'rich',
  value: 1482
}, {
  word: 'ride',
  value: 1483
}, {
  word: 'ridge',
  value: 1484
}, {
  word: 'rifle',
  value: 1485
}, {
  word: 'right',
  value: 1486
}, {
  word: 'rigid',
  value: 1487
}, {
  word: 'ring',
  value: 1488
}, {
  word: 'riot',
  value: 1489
}, {
  word: 'ripple',
  value: 1490
}, {
  word: 'risk',
  value: 1491
}, {
  word: 'ritual',
  value: 1492
}, {
  word: 'rival',
  value: 1493
}, {
  word: 'river',
  value: 1494
}, {
  word: 'road',
  value: 1495
}, {
  word: 'roast',
  value: 1496
}, {
  word: 'robot',
  value: 1497
}, {
  word: 'robust',
  value: 1498
}, {
  word: 'rocket',
  value: 1499
}, {
  word: 'romance',
  value: 1500
}, {
  word: 'roof',
  value: 1501
}, {
  word: 'rookie',
  value: 1502
}, {
  word: 'room',
  value: 1503
}, {
  word: 'rose',
  value: 1504
}, {
  word: 'rotate',
  value: 1505
}, {
  word: 'rough',
  value: 1506
}, {
  word: 'round',
  value: 1507
}, {
  word: 'route',
  value: 1508
}, {
  word: 'royal',
  value: 1509
}, {
  word: 'rubber',
  value: 1510
}, {
  word: 'rude',
  value: 1511
}, {
  word: 'rug',
  value: 1512
}, {
  word: 'rule',
  value: 1513
}, {
  word: 'run',
  value: 1514
}, {
  word: 'runway',
  value: 1515
}, {
  word: 'rural',
  value: 1516
}, {
  word: 'sad',
  value: 1517
}, {
  word: 'saddle',
  value: 1518
}, {
  word: 'sadness',
  value: 1519
}, {
  word: 'safe',
  value: 1520
}, {
  word: 'sail',
  value: 1521
}, {
  word: 'salad',
  value: 1522
}, {
  word: 'salmon',
  value: 1523
}, {
  word: 'salon',
  value: 1524
}, {
  word: 'salt',
  value: 1525
}, {
  word: 'salute',
  value: 1526
}, {
  word: 'same',
  value: 1527
}, {
  word: 'sample',
  value: 1528
}, {
  word: 'sand',
  value: 1529
}, {
  word: 'satisfy',
  value: 1530
}, {
  word: 'satoshi',
  value: 1531
}, {
  word: 'sauce',
  value: 1532
}, {
  word: 'sausage',
  value: 1533
}, {
  word: 'save',
  value: 1534
}, {
  word: 'say',
  value: 1535
}, {
  word: 'scale',
  value: 1536
}, {
  word: 'scan',
  value: 1537
}, {
  word: 'scare',
  value: 1538
}, {
  word: 'scatter',
  value: 1539
}, {
  word: 'scene',
  value: 1540
}, {
  word: 'scheme',
  value: 1541
}, {
  word: 'school',
  value: 1542
}, {
  word: 'science',
  value: 1543
}, {
  word: 'scissors',
  value: 1544
}, {
  word: 'scorpion',
  value: 1545
}, {
  word: 'scout',
  value: 1546
}, {
  word: 'scrap',
  value: 1547
}, {
  word: 'screen',
  value: 1548
}, {
  word: 'script',
  value: 1549
}, {
  word: 'scrub',
  value: 1550
}, {
  word: 'sea',
  value: 1551
}, {
  word: 'search',
  value: 1552
}, {
  word: 'season',
  value: 1553
}, {
  word: 'seat',
  value: 1554
}, {
  word: 'second',
  value: 1555
}, {
  word: 'secret',
  value: 1556
}, {
  word: 'section',
  value: 1557
}, {
  word: 'security',
  value: 1558
}, {
  word: 'seed',
  value: 1559
}, {
  word: 'seek',
  value: 1560
}, {
  word: 'segment',
  value: 1561
}, {
  word: 'select',
  value: 1562
}, {
  word: 'sell',
  value: 1563
}, {
  word: 'seminar',
  value: 1564
}, {
  word: 'senior',
  value: 1565
}, {
  word: 'sense',
  value: 1566
}, {
  word: 'sentence',
  value: 1567
}, {
  word: 'series',
  value: 1568
}, {
  word: 'service',
  value: 1569
}, {
  word: 'session',
  value: 1570
}, {
  word: 'settle',
  value: 1571
}, {
  word: 'setup',
  value: 1572
}, {
  word: 'seven',
  value: 1573
}, {
  word: 'shadow',
  value: 1574
}, {
  word: 'shaft',
  value: 1575
}, {
  word: 'shallow',
  value: 1576
}, {
  word: 'share',
  value: 1577
}, {
  word: 'shed',
  value: 1578
}, {
  word: 'shell',
  value: 1579
}, {
  word: 'sheriff',
  value: 1580
}, {
  word: 'shield',
  value: 1581
}, {
  word: 'shift',
  value: 1582
}, {
  word: 'shine',
  value: 1583
}, {
  word: 'ship',
  value: 1584
}, {
  word: 'shiver',
  value: 1585
}, {
  word: 'shock',
  value: 1586
}, {
  word: 'shoe',
  value: 1587
}, {
  word: 'shoot',
  value: 1588
}, {
  word: 'shop',
  value: 1589
}, {
  word: 'short',
  value: 1590
}, {
  word: 'shoulder',
  value: 1591
}, {
  word: 'shove',
  value: 1592
}, {
  word: 'shrimp',
  value: 1593
}, {
  word: 'shrug',
  value: 1594
}, {
  word: 'shuffle',
  value: 1595
}, {
  word: 'shy',
  value: 1596
}, {
  word: 'sibling',
  value: 1597
}, {
  word: 'sick',
  value: 1598
}, {
  word: 'side',
  value: 1599
}, {
  word: 'siege',
  value: 1600
}, {
  word: 'sight',
  value: 1601
}, {
  word: 'sign',
  value: 1602
}, {
  word: 'silent',
  value: 1603
}, {
  word: 'silk',
  value: 1604
}, {
  word: 'silly',
  value: 1605
}, {
  word: 'silver',
  value: 1606
}, {
  word: 'similar',
  value: 1607
}, {
  word: 'simple',
  value: 1608
}, {
  word: 'since',
  value: 1609
}, {
  word: 'sing',
  value: 1610
}, {
  word: 'siren',
  value: 1611
}, {
  word: 'sister',
  value: 1612
}, {
  word: 'situate',
  value: 1613
}, {
  word: 'six',
  value: 1614
}, {
  word: 'size',
  value: 1615
}, {
  word: 'skate',
  value: 1616
}, {
  word: 'sketch',
  value: 1617
}, {
  word: 'ski',
  value: 1618
}, {
  word: 'skill',
  value: 1619
}, {
  word: 'skin',
  value: 1620
}, {
  word: 'skirt',
  value: 1621
}, {
  word: 'skull',
  value: 1622
}, {
  word: 'slab',
  value: 1623
}, {
  word: 'slam',
  value: 1624
}, {
  word: 'sleep',
  value: 1625
}, {
  word: 'slender',
  value: 1626
}, {
  word: 'slice',
  value: 1627
}, {
  word: 'slide',
  value: 1628
}, {
  word: 'slight',
  value: 1629
}, {
  word: 'slim',
  value: 1630
}, {
  word: 'slogan',
  value: 1631
}, {
  word: 'slot',
  value: 1632
}, {
  word: 'slow',
  value: 1633
}, {
  word: 'slush',
  value: 1634
}, {
  word: 'small',
  value: 1635
}, {
  word: 'smart',
  value: 1636
}, {
  word: 'smile',
  value: 1637
}, {
  word: 'smoke',
  value: 1638
}, {
  word: 'smooth',
  value: 1639
}, {
  word: 'snack',
  value: 1640
}, {
  word: 'snake',
  value: 1641
}, {
  word: 'snap',
  value: 1642
}, {
  word: 'sniff',
  value: 1643
}, {
  word: 'snow',
  value: 1644
}, {
  word: 'soap',
  value: 1645
}, {
  word: 'soccer',
  value: 1646
}, {
  word: 'social',
  value: 1647
}, {
  word: 'sock',
  value: 1648
}, {
  word: 'soda',
  value: 1649
}, {
  word: 'soft',
  value: 1650
}, {
  word: 'solar',
  value: 1651
}, {
  word: 'soldier',
  value: 1652
}, {
  word: 'solid',
  value: 1653
}, {
  word: 'solution',
  value: 1654
}, {
  word: 'solve',
  value: 1655
}, {
  word: 'someone',
  value: 1656
}, {
  word: 'song',
  value: 1657
}, {
  word: 'soon',
  value: 1658
}, {
  word: 'sorry',
  value: 1659
}, {
  word: 'sort',
  value: 1660
}, {
  word: 'soul',
  value: 1661
}, {
  word: 'sound',
  value: 1662
}, {
  word: 'soup',
  value: 1663
}, {
  word: 'source',
  value: 1664
}, {
  word: 'south',
  value: 1665
}, {
  word: 'space',
  value: 1666
}, {
  word: 'spare',
  value: 1667
}, {
  word: 'spatial',
  value: 1668
}, {
  word: 'spawn',
  value: 1669
}, {
  word: 'speak',
  value: 1670
}, {
  word: 'special',
  value: 1671
}, {
  word: 'speed',
  value: 1672
}, {
  word: 'spell',
  value: 1673
}, {
  word: 'spend',
  value: 1674
}, {
  word: 'sphere',
  value: 1675
}, {
  word: 'spice',
  value: 1676
}, {
  word: 'spider',
  value: 1677
}, {
  word: 'spike',
  value: 1678
}, {
  word: 'spin',
  value: 1679
}, {
  word: 'spirit',
  value: 1680
}, {
  word: 'split',
  value: 1681
}, {
  word: 'spoil',
  value: 1682
}, {
  word: 'sponsor',
  value: 1683
}, {
  word: 'spoon',
  value: 1684
}, {
  word: 'sport',
  value: 1685
}, {
  word: 'spot',
  value: 1686
}, {
  word: 'spray',
  value: 1687
}, {
  word: 'spread',
  value: 1688
}, {
  word: 'spring',
  value: 1689
}, {
  word: 'spy',
  value: 1690
}, {
  word: 'square',
  value: 1691
}, {
  word: 'squeeze',
  value: 1692
}, {
  word: 'squirrel',
  value: 1693
}, {
  word: 'stable',
  value: 1694
}, {
  word: 'stadium',
  value: 1695
}, {
  word: 'staff',
  value: 1696
}, {
  word: 'stage',
  value: 1697
}, {
  word: 'stairs',
  value: 1698
}, {
  word: 'stamp',
  value: 1699
}, {
  word: 'stand',
  value: 1700
}, {
  word: 'start',
  value: 1701
}, {
  word: 'state',
  value: 1702
}, {
  word: 'stay',
  value: 1703
}, {
  word: 'steak',
  value: 1704
}, {
  word: 'steel',
  value: 1705
}, {
  word: 'stem',
  value: 1706
}, {
  word: 'step',
  value: 1707
}, {
  word: 'stereo',
  value: 1708
}, {
  word: 'stick',
  value: 1709
}, {
  word: 'still',
  value: 1710
}, {
  word: 'sting',
  value: 1711
}, {
  word: 'stock',
  value: 1712
}, {
  word: 'stomach',
  value: 1713
}, {
  word: 'stone',
  value: 1714
}, {
  word: 'stool',
  value: 1715
}, {
  word: 'story',
  value: 1716
}, {
  word: 'stove',
  value: 1717
}, {
  word: 'strategy',
  value: 1718
}, {
  word: 'street',
  value: 1719
}, {
  word: 'strike',
  value: 1720
}, {
  word: 'strong',
  value: 1721
}, {
  word: 'struggle',
  value: 1722
}, {
  word: 'student',
  value: 1723
}, {
  word: 'stuff',
  value: 1724
}, {
  word: 'stumble',
  value: 1725
}, {
  word: 'style',
  value: 1726
}, {
  word: 'subject',
  value: 1727
}, {
  word: 'submit',
  value: 1728
}, {
  word: 'subway',
  value: 1729
}, {
  word: 'success',
  value: 1730
}, {
  word: 'such',
  value: 1731
}, {
  word: 'sudden',
  value: 1732
}, {
  word: 'suffer',
  value: 1733
}, {
  word: 'sugar',
  value: 1734
}, {
  word: 'suggest',
  value: 1735
}, {
  word: 'suit',
  value: 1736
}, {
  word: 'summer',
  value: 1737
}, {
  word: 'sun',
  value: 1738
}, {
  word: 'sunny',
  value: 1739
}, {
  word: 'sunset',
  value: 1740
}, {
  word: 'super',
  value: 1741
}, {
  word: 'supply',
  value: 1742
}, {
  word: 'supreme',
  value: 1743
}, {
  word: 'sure',
  value: 1744
}, {
  word: 'surface',
  value: 1745
}, {
  word: 'surge',
  value: 1746
}, {
  word: 'surprise',
  value: 1747
}, {
  word: 'surround',
  value: 1748
}, {
  word: 'survey',
  value: 1749
}, {
  word: 'suspect',
  value: 1750
}, {
  word: 'sustain',
  value: 1751
}, {
  word: 'swallow',
  value: 1752
}, {
  word: 'swamp',
  value: 1753
}, {
  word: 'swap',
  value: 1754
}, {
  word: 'swarm',
  value: 1755
}, {
  word: 'swear',
  value: 1756
}, {
  word: 'sweet',
  value: 1757
}, {
  word: 'swift',
  value: 1758
}, {
  word: 'swim',
  value: 1759
}, {
  word: 'swing',
  value: 1760
}, {
  word: 'switch',
  value: 1761
}, {
  word: 'sword',
  value: 1762
}, {
  word: 'symbol',
  value: 1763
}, {
  word: 'symptom',
  value: 1764
}, {
  word: 'syrup',
  value: 1765
}, {
  word: 'system',
  value: 1766
}, {
  word: 'table',
  value: 1767
}, {
  word: 'tackle',
  value: 1768
}, {
  word: 'tag',
  value: 1769
}, {
  word: 'tail',
  value: 1770
}, {
  word: 'talent',
  value: 1771
}, {
  word: 'talk',
  value: 1772
}, {
  word: 'tank',
  value: 1773
}, {
  word: 'tape',
  value: 1774
}, {
  word: 'target',
  value: 1775
}, {
  word: 'task',
  value: 1776
}, {
  word: 'taste',
  value: 1777
}, {
  word: 'tattoo',
  value: 1778
}, {
  word: 'taxi',
  value: 1779
}, {
  word: 'teach',
  value: 1780
}, {
  word: 'team',
  value: 1781
}, {
  word: 'tell',
  value: 1782
}, {
  word: 'ten',
  value: 1783
}, {
  word: 'tenant',
  value: 1784
}, {
  word: 'tennis',
  value: 1785
}, {
  word: 'tent',
  value: 1786
}, {
  word: 'term',
  value: 1787
}, {
  word: 'test',
  value: 1788
}, {
  word: 'text',
  value: 1789
}, {
  word: 'thank',
  value: 1790
}, {
  word: 'that',
  value: 1791
}, {
  word: 'theme',
  value: 1792
}, {
  word: 'then',
  value: 1793
}, {
  word: 'theory',
  value: 1794
}, {
  word: 'there',
  value: 1795
}, {
  word: 'they',
  value: 1796
}, {
  word: 'thing',
  value: 1797
}, {
  word: 'this',
  value: 1798
}, {
  word: 'thought',
  value: 1799
}, {
  word: 'three',
  value: 1800
}, {
  word: 'thrive',
  value: 1801
}, {
  word: 'throw',
  value: 1802
}, {
  word: 'thumb',
  value: 1803
}, {
  word: 'thunder',
  value: 1804
}, {
  word: 'ticket',
  value: 1805
}, {
  word: 'tide',
  value: 1806
}, {
  word: 'tiger',
  value: 1807
}, {
  word: 'tilt',
  value: 1808
}, {
  word: 'timber',
  value: 1809
}, {
  word: 'time',
  value: 1810
}, {
  word: 'tiny',
  value: 1811
}, {
  word: 'tip',
  value: 1812
}, {
  word: 'tired',
  value: 1813
}, {
  word: 'tissue',
  value: 1814
}, {
  word: 'title',
  value: 1815
}, {
  word: 'toast',
  value: 1816
}, {
  word: 'tobacco',
  value: 1817
}, {
  word: 'today',
  value: 1818
}, {
  word: 'toddler',
  value: 1819
}, {
  word: 'toe',
  value: 1820
}, {
  word: 'together',
  value: 1821
}, {
  word: 'toilet',
  value: 1822
}, {
  word: 'token',
  value: 1823
}, {
  word: 'tomato',
  value: 1824
}, {
  word: 'tomorrow',
  value: 1825
}, {
  word: 'tone',
  value: 1826
}, {
  word: 'tongue',
  value: 1827
}, {
  word: 'tonight',
  value: 1828
}, {
  word: 'tool',
  value: 1829
}, {
  word: 'tooth',
  value: 1830
}, {
  word: 'top',
  value: 1831
}, {
  word: 'topic',
  value: 1832
}, {
  word: 'topple',
  value: 1833
}, {
  word: 'torch',
  value: 1834
}, {
  word: 'tornado',
  value: 1835
}, {
  word: 'tortoise',
  value: 1836
}, {
  word: 'toss',
  value: 1837
}, {
  word: 'total',
  value: 1838
}, {
  word: 'tourist',
  value: 1839
}, {
  word: 'toward',
  value: 1840
}, {
  word: 'tower',
  value: 1841
}, {
  word: 'town',
  value: 1842
}, {
  word: 'toy',
  value: 1843
}, {
  word: 'track',
  value: 1844
}, {
  word: 'trade',
  value: 1845
}, {
  word: 'traffic',
  value: 1846
}, {
  word: 'tragic',
  value: 1847
}, {
  word: 'train',
  value: 1848
}, {
  word: 'transfer',
  value: 1849
}, {
  word: 'trap',
  value: 1850
}, {
  word: 'trash',
  value: 1851
}, {
  word: 'travel',
  value: 1852
}, {
  word: 'tray',
  value: 1853
}, {
  word: 'treat',
  value: 1854
}, {
  word: 'tree',
  value: 1855
}, {
  word: 'trend',
  value: 1856
}, {
  word: 'trial',
  value: 1857
}, {
  word: 'tribe',
  value: 1858
}, {
  word: 'trick',
  value: 1859
}, {
  word: 'trigger',
  value: 1860
}, {
  word: 'trim',
  value: 1861
}, {
  word: 'trip',
  value: 1862
}, {
  word: 'trophy',
  value: 1863
}, {
  word: 'trouble',
  value: 1864
}, {
  word: 'truck',
  value: 1865
}, {
  word: 'true',
  value: 1866
}, {
  word: 'truly',
  value: 1867
}, {
  word: 'trumpet',
  value: 1868
}, {
  word: 'trust',
  value: 1869
}, {
  word: 'truth',
  value: 1870
}, {
  word: 'try',
  value: 1871
}, {
  word: 'tube',
  value: 1872
}, {
  word: 'tuition',
  value: 1873
}, {
  word: 'tumble',
  value: 1874
}, {
  word: 'tuna',
  value: 1875
}, {
  word: 'tunnel',
  value: 1876
}, {
  word: 'turkey',
  value: 1877
}, {
  word: 'turn',
  value: 1878
}, {
  word: 'turtle',
  value: 1879
}, {
  word: 'twelve',
  value: 1880
}, {
  word: 'twenty',
  value: 1881
}, {
  word: 'twice',
  value: 1882
}, {
  word: 'twin',
  value: 1883
}, {
  word: 'twist',
  value: 1884
}, {
  word: 'two',
  value: 1885
}, {
  word: 'type',
  value: 1886
}, {
  word: 'typical',
  value: 1887
}, {
  word: 'ugly',
  value: 1888
}, {
  word: 'umbrella',
  value: 1889
}, {
  word: 'unable',
  value: 1890
}, {
  word: 'unaware',
  value: 1891
}, {
  word: 'uncle',
  value: 1892
}, {
  word: 'uncover',
  value: 1893
}, {
  word: 'under',
  value: 1894
}, {
  word: 'undo',
  value: 1895
}, {
  word: 'unfair',
  value: 1896
}, {
  word: 'unfold',
  value: 1897
}, {
  word: 'unhappy',
  value: 1898
}, {
  word: 'uniform',
  value: 1899
}, {
  word: 'unique',
  value: 1900
}, {
  word: 'unit',
  value: 1901
}, {
  word: 'universe',
  value: 1902
}, {
  word: 'unknown',
  value: 1903
}, {
  word: 'unlock',
  value: 1904
}, {
  word: 'until',
  value: 1905
}, {
  word: 'unusual',
  value: 1906
}, {
  word: 'unveil',
  value: 1907
}, {
  word: 'update',
  value: 1908
}, {
  word: 'upgrade',
  value: 1909
}, {
  word: 'uphold',
  value: 1910
}, {
  word: 'upon',
  value: 1911
}, {
  word: 'upper',
  value: 1912
}, {
  word: 'upset',
  value: 1913
}, {
  word: 'urban',
  value: 1914
}, {
  word: 'urge',
  value: 1915
}, {
  word: 'usage',
  value: 1916
}, {
  word: 'use',
  value: 1917
}, {
  word: 'used',
  value: 1918
}, {
  word: 'useful',
  value: 1919
}, {
  word: 'useless',
  value: 1920
}, {
  word: 'usual',
  value: 1921
}, {
  word: 'utility',
  value: 1922
}, {
  word: 'vacant',
  value: 1923
}, {
  word: 'vacuum',
  value: 1924
}, {
  word: 'vague',
  value: 1925
}, {
  word: 'valid',
  value: 1926
}, {
  word: 'valley',
  value: 1927
}, {
  word: 'valve',
  value: 1928
}, {
  word: 'van',
  value: 1929
}, {
  word: 'vanish',
  value: 1930
}, {
  word: 'vapor',
  value: 1931
}, {
  word: 'various',
  value: 1932
}, {
  word: 'vast',
  value: 1933
}, {
  word: 'vault',
  value: 1934
}, {
  word: 'vehicle',
  value: 1935
}, {
  word: 'velvet',
  value: 1936
}, {
  word: 'vendor',
  value: 1937
}, {
  word: 'venture',
  value: 1938
}, {
  word: 'venue',
  value: 1939
}, {
  word: 'verb',
  value: 1940
}, {
  word: 'verify',
  value: 1941
}, {
  word: 'version',
  value: 1942
}, {
  word: 'very',
  value: 1943
}, {
  word: 'vessel',
  value: 1944
}, {
  word: 'veteran',
  value: 1945
}, {
  word: 'viable',
  value: 1946
}, {
  word: 'vibrant',
  value: 1947
}, {
  word: 'vicious',
  value: 1948
}, {
  word: 'victory',
  value: 1949
}, {
  word: 'video',
  value: 1950
}, {
  word: 'view',
  value: 1951
}, {
  word: 'village',
  value: 1952
}, {
  word: 'vintage',
  value: 1953
}, {
  word: 'violin',
  value: 1954
}, {
  word: 'virtual',
  value: 1955
}, {
  word: 'virus',
  value: 1956
}, {
  word: 'visa',
  value: 1957
}, {
  word: 'visit',
  value: 1958
}, {
  word: 'visual',
  value: 1959
}, {
  word: 'vital',
  value: 1960
}, {
  word: 'vivid',
  value: 1961
}, {
  word: 'vocal',
  value: 1962
}, {
  word: 'voice',
  value: 1963
}, {
  word: 'void',
  value: 1964
}, {
  word: 'volcano',
  value: 1965
}, {
  word: 'volume',
  value: 1966
}, {
  word: 'vote',
  value: 1967
}, {
  word: 'voyage',
  value: 1968
}, {
  word: 'wage',
  value: 1969
}, {
  word: 'wagon',
  value: 1970
}, {
  word: 'wait',
  value: 1971
}, {
  word: 'walk',
  value: 1972
}, {
  word: 'wall',
  value: 1973
}, {
  word: 'walnut',
  value: 1974
}, {
  word: 'want',
  value: 1975
}, {
  word: 'warfare',
  value: 1976
}, {
  word: 'warm',
  value: 1977
}, {
  word: 'warrior',
  value: 1978
}, {
  word: 'wash',
  value: 1979
}, {
  word: 'wasp',
  value: 1980
}, {
  word: 'waste',
  value: 1981
}, {
  word: 'water',
  value: 1982
}, {
  word: 'wave',
  value: 1983
}, {
  word: 'way',
  value: 1984
}, {
  word: 'wealth',
  value: 1985
}, {
  word: 'weapon',
  value: 1986
}, {
  word: 'wear',
  value: 1987
}, {
  word: 'weasel',
  value: 1988
}, {
  word: 'weather',
  value: 1989
}, {
  word: 'web',
  value: 1990
}, {
  word: 'wedding',
  value: 1991
}, {
  word: 'weekend',
  value: 1992
}, {
  word: 'weird',
  value: 1993
}, {
  word: 'welcome',
  value: 1994
}, {
  word: 'west',
  value: 1995
}, {
  word: 'wet',
  value: 1996
}, {
  word: 'whale',
  value: 1997
}, {
  word: 'what',
  value: 1998
}, {
  word: 'wheat',
  value: 1999
}, {
  word: 'wheel',
  value: 2000
}, {
  word: 'when',
  value: 2001
}, {
  word: 'where',
  value: 2002
}, {
  word: 'whip',
  value: 2003
}, {
  word: 'whisper',
  value: 2004
}, {
  word: 'wide',
  value: 2005
}, {
  word: 'width',
  value: 2006
}, {
  word: 'wife',
  value: 2007
}, {
  word: 'wild',
  value: 2008
}, {
  word: 'will',
  value: 2009
}, {
  word: 'win',
  value: 2010
}, {
  word: 'window',
  value: 2011
}, {
  word: 'wine',
  value: 2012
}, {
  word: 'wing',
  value: 2013
}, {
  word: 'wink',
  value: 2014
}, {
  word: 'winner',
  value: 2015
}, {
  word: 'winter',
  value: 2016
}, {
  word: 'wire',
  value: 2017
}, {
  word: 'wisdom',
  value: 2018
}, {
  word: 'wise',
  value: 2019
}, {
  word: 'wish',
  value: 2020
}, {
  word: 'witness',
  value: 2021
}, {
  word: 'wolf',
  value: 2022
}, {
  word: 'woman',
  value: 2023
}, {
  word: 'wonder',
  value: 2024
}, {
  word: 'wood',
  value: 2025
}, {
  word: 'wool',
  value: 2026
}, {
  word: 'word',
  value: 2027
}, {
  word: 'work',
  value: 2028
}, {
  word: 'world',
  value: 2029
}, {
  word: 'worry',
  value: 2030
}, {
  word: 'worth',
  value: 2031
}, {
  word: 'wrap',
  value: 2032
}, {
  word: 'wreck',
  value: 2033
}, {
  word: 'wrestle',
  value: 2034
}, {
  word: 'wrist',
  value: 2035
}, {
  word: 'write',
  value: 2036
}, {
  word: 'wrong',
  value: 2037
}, {
  word: 'yard',
  value: 2038
}, {
  word: 'year',
  value: 2039
}, {
  word: 'yellow',
  value: 2040
}, {
  word: 'you',
  value: 2041
}, {
  word: 'young',
  value: 2042
}, {
  word: 'youth',
  value: 2043
}, {
  word: 'zebra',
  value: 2044
}, {
  word: 'zero',
  value: 2045
}, {
  word: 'zone',
  value: 2046
}, {
  word: 'zoo',
  value: 2047
}];

function removePrefix(value, prefix) {
  if (value.startsWith(prefix)) {
    return value.slice(prefix.length);
  }

  return value;
}
function toBech32m(value, prefix) {
  if (value.startsWith(prefix)) {
    return value;
  }

  var pureHash = removePrefix(value, '0x');
  var words = bech32m.toWords(Buffer.from(pureHash, 'hex'));
  return bech32m.encode(prefix, words);
}
function fromBech32m(value) {
  var data = bech32m.decode(value);
  return Buffer.from(bech32m.fromWords(data.words)).toString('hex');
}
function decodeBech32m(value) {
  var _bech32m$decode = bech32m.decode(value),
      words = _bech32m$decode.words,
      prefix = _bech32m$decode.prefix;

  var data = Buffer.from(bech32m.fromWords(words)).toString('hex');
  return {
    prefix: prefix,
    data: data
  };
}

export { CATWallet as CAT, ConnectionState$1 as ConnectionState, DIDWallet as DID, Daemon, Events, Farmer, FullNode, Harvester, NFTWallet as NFT, PassphrasePromptReason$1 as PassphrasePromptReason, Plotter, PlotterName$1 as PlotterName, PoolWallet as Pool, RLWallet as RL, Service, ServiceConnectionName, ServiceHumanName, ServiceName$1 as ServiceName, SyncingStatus$1 as SyncingStatus, TransactionType$1 as TransactionType, Wallet, WalletType$1 as WalletType, decodeBech32m, Client as default, defaultPlotter, defaultsForPlotter, english, fromBech32m, optionsForPlotter, toBech32m, toCamelCase };
//# sourceMappingURL=esm.js.map
