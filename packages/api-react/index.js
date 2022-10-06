'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('@reduxjs/toolkit/query/react');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var Client = require('@chia/api');
var toolkit = require('@reduxjs/toolkit');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var lodash = require('lodash');
var react$1 = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var BigNumber = require('bignumber.js');
var reactRedux = require('react-redux');
var crypto = require('crypto');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var Client__default = /*#__PURE__*/_interopDefaultLegacy(Client);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);

var initialState = {};
var apiSlice = toolkit.createSlice({
  name: 'api',
  initialState: initialState,
  reducers: {
    initializeConfig: function initializeConfig(state, action) {
      state.config = action.payload;
    }
  }
});
var initializeConfig = apiSlice.actions.initializeConfig;
var selectApiConfig = function selectApiConfig(state) {
  return state.api.config;
};
var apiReducer = apiSlice.reducer;

var api$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  initializeConfig: initializeConfig,
  selectApiConfig: selectApiConfig,
  'default': apiReducer
});

var clientInstance;

function getClientInstance(_x) {
  return _getClientInstance.apply(this, arguments);
}

function _getClientInstance() {
  _getClientInstance = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(api) {
    var config;
    return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (clientInstance) {
              _context2.next = 5;
              break;
            }

            config = selectApiConfig(api.getState());

            if (config) {
              _context2.next = 4;
              break;
            }

            throw new Error('Client API config is not defined. Dispatch initializeConfig first');

          case 4:
            clientInstance = new Client__default["default"](config);

          case 5:
            return _context2.abrupt("return", clientInstance);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getClientInstance.apply(this, arguments);
}

var services = new Map();

function getServiceInstance(_x2, _x3) {
  return _getServiceInstance.apply(this, arguments);
}

function _getServiceInstance() {
  _getServiceInstance = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(api, ServiceClass) {
    var client, serviceInstance;
    return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (services.has(ServiceClass)) {
              _context3.next = 6;
              break;
            }

            _context3.next = 3;
            return getClientInstance(api);

          case 3:
            client = _context3.sent;
            serviceInstance = new ServiceClass(client);
            services.set(ServiceClass, serviceInstance);

          case 6:
            return _context3.abrupt("return", services.get(ServiceClass));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getServiceInstance.apply(this, arguments);
}

function chiaLazyBaseQuery() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var DefaultService = options.service;
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_ref, api) {
      var command, ServiceClass, _ref$client, client, _ref$args, args, mockResponse, instance, meta;

      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              command = _ref.command, ServiceClass = _ref.service, _ref$client = _ref.client, client = _ref$client === void 0 ? false : _ref$client, _ref$args = _ref.args, args = _ref$args === void 0 ? [] : _ref$args, mockResponse = _ref.mockResponse;

              if (!client) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return getClientInstance(api);

            case 4:
              _context.t0 = _context.sent;
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return getServiceInstance(api, ServiceClass || DefaultService);

            case 9:
              _context.t0 = _context.sent;

            case 10:
              instance = _context.t0;
              meta = {
                timestamp: Date.now(),
                command: command,
                client: client,
                args: args
              };
              _context.prev = 12;

              if (!(mockResponse !== null && mockResponse !== void 0)) {
                _context.next = 17;
                break;
              }

              _context.t1 = mockResponse;
              _context.next = 20;
              break;

            case 17:
              _context.next = 19;
              return instance[command].apply(instance, _toConsumableArray__default["default"](args));

            case 19:
              _context.t1 = _context.sent;

            case 20:
              _context.t2 = _context.t1;
              _context.t3 = meta;
              return _context.abrupt("return", {
                data: _context.t2,
                meta: _context.t3
              });

            case 25:
              _context.prev = 25;
              _context.t4 = _context["catch"](12);
              return _context.abrupt("return", {
                error: _context.t4,
                meta: meta
              });

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[12, 25]]);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
}

var baseQuery = chiaLazyBaseQuery({});
var api = react.createApi({
  reducerPath: 'chiaApi',
  baseQuery: baseQuery,
  endpoints: function endpoints() {
    return {};
  }
});

function onCacheEntryAddedInvalidate(rtkQuery, invalidates) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(args, api) {
      var cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch, unsubscribes;
      return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cacheDataLoaded = api.cacheDataLoaded, cacheEntryRemoved = api.cacheEntryRemoved, updateCachedData = api.updateCachedData, dispatch = api.dispatch;
              unsubscribes = [];
              _context3.prev = 2;
              _context3.next = 5;
              return cacheDataLoaded;

            case 5:
              _context3.next = 7;
              return Promise.all(invalidates.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(invalidate) {
                  var command, service, endpoint, onUpdate, skip, response;
                  return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          command = invalidate.command, service = invalidate.service, endpoint = invalidate.endpoint, onUpdate = invalidate.onUpdate, skip = invalidate.skip;
                          _context2.next = 3;
                          return rtkQuery({
                            command: command,
                            service: service,
                            args: [/*#__PURE__*/function () {
                              var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(data) {
                                return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        updateCachedData(function (draft) {
                                          if (skip !== null && skip !== void 0 && skip(draft, data, args)) {
                                            return;
                                          }

                                          if (onUpdate) {
                                            onUpdate(draft, data, args);
                                          }

                                          if (endpoint) {
                                            var currentEndpoint = endpoint();
                                            dispatch(currentEndpoint.initiate(args, {
                                              subscribe: false,
                                              forceRefetch: true
                                            }));
                                          }
                                        });

                                      case 1:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));

                              return function (_x4) {
                                return _ref3.apply(this, arguments);
                              };
                            }()]
                          }, api, {});

                        case 3:
                          response = _context2.sent;

                          if (response.data) {
                            unsubscribes.push(response.data);
                          }

                        case 5:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 7:
              _context3.prev = 7;
              _context3.next = 10;
              return cacheEntryRemoved;

            case 10:
              unsubscribes.forEach(function (unsubscribe) {
                return unsubscribe();
              });
              return _context3.finish(7);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2,, 7, 12]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var apiWithTag$5 = api.enhanceEndpoints({
  addTagTypes: ['BlockchainState', 'FullNodeConnections']
});
var fullNodeApi$1 = apiWithTag$5.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      fullNodePing: build.query({
        query: function query() {
          return {
            command: 'ping',
            service: Client.FullNode
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      getBlockRecords: build.query({
        query: function query(_ref) {
          var start = _ref.start,
              end = _ref.end;
          return {
            command: 'getBlockRecords',
            service: Client.FullNode,
            args: [start, end]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.blockRecords;
        }
      }),
      getUnfinishedBlockHeaders: build.query({
        query: function query() {
          return {
            command: 'getUnfinishedBlockHeaders',
            service: Client.FullNode
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.headers;
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onBlockchainState',
          service: Client.FullNode,
          endpoint: function endpoint() {
            return fullNodeApi$1.endpoints.getUnfinishedBlockHeaders;
          }
        }])
      }),
      getBlockchainState: build.query({
        query: function query() {
          return {
            command: 'getBlockchainState',
            service: Client.FullNode
          };
        },
        providesTags: ['BlockchainState'],
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.blockchainState;
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onBlockchainState',
          service: Client.FullNode,
          onUpdate: function onUpdate(draft, data) {
            return Object.assign(draft, _objectSpread$a({}, data.blockchainState));
          }
        }])
      }),
      getFullNodeConnections: build.query({
        query: function query() {
          return {
            command: 'getConnections',
            service: Client.FullNode
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.connections;
        },
        providesTags: function providesTags(connections) {
          return connections ? [].concat(_toConsumableArray__default["default"](connections.map(function (_ref2) {
            var nodeId = _ref2.nodeId;
            return {
              type: 'FullNodeConnections',
              id: nodeId
            };
          })), [{
            type: 'FullNodeConnections',
            id: 'LIST'
          }]) : [{
            type: 'FullNodeConnections',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onConnections',
          service: Client.FullNode,
          onUpdate: function onUpdate(draft, data) {
            // empty base array
            draft.splice(0); // assign new items

            Object.assign(draft, data.connections);
          }
        }])
      }),
      openFullNodeConnection: build.mutation({
        query: function query(_ref3) {
          var host = _ref3.host,
              port = _ref3.port;
          return {
            command: 'openConnection',
            service: Client.FullNode,
            args: [host, port]
          };
        },
        invalidatesTags: [{
          type: 'FullNodeConnections',
          id: 'LIST'
        }]
      }),
      closeFullNodeConnection: build.mutation({
        query: function query(_ref4) {
          var nodeId = _ref4.nodeId;
          return {
            command: 'closeConnection',
            service: Client.FullNode,
            args: [nodeId]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref5) {
          var nodeId = _ref5.nodeId;
          return [{
            type: 'FullNodeConnections',
            id: 'LIST'
          }, {
            type: 'FullNodeConnections',
            id: nodeId
          }];
        }
      }),
      getBlock: build.query({
        query: function query(_ref6) {
          var headerHash = _ref6.headerHash;
          return {
            command: 'getBlock',
            service: Client.FullNode,
            args: [headerHash]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.block;
        }
      }),
      getBlockRecord: build.query({
        query: function query(_ref7) {
          var headerHash = _ref7.headerHash;
          return {
            command: 'getBlockRecord',
            service: Client.FullNode,
            args: [headerHash]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.blockRecord;
        }
      })
    };
  }
});
var useFullNodePingQuery$1 = fullNodeApi$1.useFullNodePingQuery,
    useGetBlockRecordsQuery$1 = fullNodeApi$1.useGetBlockRecordsQuery,
    useGetUnfinishedBlockHeadersQuery$1 = fullNodeApi$1.useGetUnfinishedBlockHeadersQuery,
    useGetBlockchainStateQuery$1 = fullNodeApi$1.useGetBlockchainStateQuery,
    useGetFullNodeConnectionsQuery$1 = fullNodeApi$1.useGetFullNodeConnectionsQuery,
    useOpenFullNodeConnectionMutation$1 = fullNodeApi$1.useOpenFullNodeConnectionMutation,
    useCloseFullNodeConnectionMutation$1 = fullNodeApi$1.useCloseFullNodeConnectionMutation,
    useGetBlockQuery$1 = fullNodeApi$1.useGetBlockQuery,
    useGetBlockRecordQuery$1 = fullNodeApi$1.useGetBlockRecordQuery;

var _excluded$5 = ["data", "isLoading"];

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useGetLatestBlocksQuery() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

  var _useGetBlockchainStat = useGetBlockchainStateQuery$1(),
      state = _useGetBlockchainStat.data,
      isLoadingBlockchainState = _useGetBlockchainStat.isLoading,
      rest = _objectWithoutProperties__default["default"](_useGetBlockchainStat, _excluded$5);

  var peakHeight = lodash.get(state, 'peak.height');
  var end = peakHeight ? peakHeight + 1 : 1;
  var start = Math.max(0, end - count);

  var _useGetBlockRecordsQu = useGetBlockRecordsQuery$1({
    start: start,
    end: end
  }, {
    skip: !peakHeight
  }),
      blocks = _useGetBlockRecordsQu.data,
      isLoadingBlocks = _useGetBlockRecordsQu.isLoading;

  var isLoading = isLoadingBlockchainState || isLoadingBlocks;
  return _objectSpread$9({
    isLoading: isLoading,
    data: blocks ? _toConsumableArray__default["default"](blocks).reverse() : blocks
  }, rest);
}

var _excluded$4 = ["data", "isLoading"];

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getLatestTimestamp(blocks, lastPeekTimestamp) {
  var timestamps = [];

  if (lastPeekTimestamp) {
    timestamps.push(lastPeekTimestamp);
  }

  if (blocks) {
    blocks.forEach(function (block) {
      if (block.timestamp) {
        timestamps.push(block.timestamp);
      }
    });
  }

  var timestampNumbers = timestamps.map(function (value) {
    if (typeof value === 'string') {
      return Number.parseInt(value, 10);
    }

    return value;
  });
  return timestampNumbers.length ? Math.max.apply(Math, _toConsumableArray__default["default"](timestampNumbers)) : undefined;
}

function useGetLatestPeakTimestampQuery() {
  var latestPeakTimestamp = react$1.useRef();

  var _useGetLatestBlocksQu = useGetLatestBlocksQuery(10),
      blocks = _useGetLatestBlocksQu.data,
      isLoading = _useGetLatestBlocksQu.isLoading,
      rest = _objectWithoutProperties__default["default"](_useGetLatestBlocksQu, _excluded$4);

  var newPeakTimestamp = react$1.useMemo(function () {
    return getLatestTimestamp(blocks, latestPeakTimestamp.current);
  }, [blocks, latestPeakTimestamp]);
  latestPeakTimestamp.current = newPeakTimestamp;
  return _objectSpread$8({
    isLoading: isLoading,
    data: newPeakTimestamp
  }, rest);
}

var MAX_SIGNAGE_POINTS = 500;
var apiWithTag$4 = api.enhanceEndpoints({
  addTagTypes: ['Harvesters', 'RewardTargets', 'FarmerConnections', 'SignagePoints', 'PoolLoginLink', 'Pools', 'PayoutInstructions', 'HarvesterPlots', 'HarvesterPlotsInvalid', 'HarvestersSummary', 'HarvesterPlotsKeysMissing', 'HarvesterPlotsDuplicates']
});
var farmerApi$1 = apiWithTag$4.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      farmerPing: build.query({
        query: function query() {
          return {
            command: 'ping',
            service: Client.Farmer
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      getHarvesters: build.query({
        query: function query() {
          return {
            command: 'getHarvesters',
            service: Client.Farmer
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.harvesters;
        },
        providesTags: function providesTags(harvesters) {
          return harvesters ? [].concat(_toConsumableArray__default["default"](harvesters.map(function (_ref) {
            var id = _ref.id;
            return {
              type: 'Harvesters',
              id: id
            };
          })), [{
            type: 'Harvesters',
            id: 'LIST'
          }]) : [{
            type: 'Harvesters',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onHarvesterChanged',
          service: Client.Farmer,
          endpoint: function endpoint() {
            return farmerApi$1.endpoints.getHarvesters;
          }
        }])
      }),
      getHarvestersSummary: build.query({
        query: function query() {
          return {
            command: 'getHarvestersSummary',
            service: Client.Farmer
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.harvesters;
        },
        providesTags: function providesTags(harvesters) {
          return harvesters ? [].concat(_toConsumableArray__default["default"](harvesters.map(function (_ref2) {
            var id = _ref2.id;
            return {
              type: 'HarvestersSummary',
              id: id
            };
          })), [{
            type: 'HarvestersSummary',
            id: 'LIST'
          }]) : [{
            type: 'HarvestersSummary',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onHarvesterUpdated',
          service: Client.Farmer,
          onUpdate: function onUpdate(draft, data) {
            var nodeId = data.connection.nodeId;
            var index = draft.findIndex(function (harvester) {
              return harvester.connection.nodeId === nodeId;
            });

            if (index !== -1) {
              draft[index] = data;
            } else {
              draft.push(data);
            }
          }
        }, {
          command: 'onHarvesterRemoved',
          service: Client.Farmer,
          onUpdate: function onUpdate(draft, data) {
            var nodeId = data.nodeId;
            var index = draft.findIndex(function (harvester) {
              return harvester.connection.nodeId === nodeId;
            });

            if (index !== -1) {
              draft.splice(index, 1);
            }
          }
        }])
      }),
      getHarvesterPlotsValid: build.query({
        query: function query(_ref3) {
          var nodeId = _ref3.nodeId,
              page = _ref3.page,
              pageSize = _ref3.pageSize;
          return {
            command: 'getHarvesterPlotsValid',
            service: Client.Farmer,
            args: [nodeId, page, pageSize]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.plots;
        },
        providesTags: function providesTags(plots) {
          return plots ? [].concat(_toConsumableArray__default["default"](plots.map(function (_ref4) {
            var plotId = _ref4.plotId;
            return {
              type: 'HarvesterPlots',
              plotId: plotId
            };
          })), [{
            type: 'HarvesterPlots',
            id: 'LIST'
          }]) : [{
            type: 'HarvesterPlots',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onHarvesterUpdated',
          service: Client.Farmer,
          endpoint: function endpoint() {
            return farmerApi$1.endpoints.getHarvesterPlotsValid;
          },
          skip: function skip(_draft, data, args) {
            var _data$connection;

            return args.nodeId !== (data === null || data === void 0 ? void 0 : (_data$connection = data.connection) === null || _data$connection === void 0 ? void 0 : _data$connection.nodeId);
          }
        }])
      }),
      getHarvesterPlotsInvalid: build.query({
        query: function query(_ref5) {
          var nodeId = _ref5.nodeId,
              page = _ref5.page,
              pageSize = _ref5.pageSize;
          return {
            command: 'getHarvesterPlotsInvalid',
            service: Client.Farmer,
            args: [nodeId, page, pageSize]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.plots;
        },
        providesTags: function providesTags(plots) {
          return plots ? [].concat(_toConsumableArray__default["default"](plots.map(function (filename) {
            return {
              type: 'HarvesterPlotsInvalid',
              filename: filename
            };
          })), [{
            type: 'HarvesterPlotsInvalid',
            id: 'LIST'
          }]) : [{
            type: 'HarvesterPlotsInvalid',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onHarvesterUpdated',
          service: Client.Farmer,
          endpoint: function endpoint() {
            return farmerApi$1.endpoints.getHarvesterPlotsInvalid;
          },
          skip: function skip(_draft, data, args) {
            var _data$connection2;

            return args.nodeId !== (data === null || data === void 0 ? void 0 : (_data$connection2 = data.connection) === null || _data$connection2 === void 0 ? void 0 : _data$connection2.nodeId);
          }
        }])
      }),
      getHarvesterPlotsKeysMissing: build.query({
        query: function query(_ref6) {
          var nodeId = _ref6.nodeId,
              page = _ref6.page,
              pageSize = _ref6.pageSize;
          return {
            command: 'getHarvesterPlotsKeysMissing',
            service: Client.Farmer,
            args: [nodeId, page, pageSize]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.plots;
        },
        providesTags: function providesTags(plots) {
          return plots ? [].concat(_toConsumableArray__default["default"](plots.map(function (filename) {
            return {
              type: 'HarvesterPlotsKeysMissing',
              filename: filename
            };
          })), [{
            type: 'HarvesterPlotsKeysMissing',
            id: 'LIST'
          }]) : [{
            type: 'HarvesterPlotsKeysMissing',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onHarvesterUpdated',
          service: Client.Farmer,
          endpoint: function endpoint() {
            return farmerApi$1.endpoints.getHarvesterPlotsKeysMissing;
          },
          skip: function skip(_draft, data, args) {
            var _data$connection3;

            return args.nodeId !== (data === null || data === void 0 ? void 0 : (_data$connection3 = data.connection) === null || _data$connection3 === void 0 ? void 0 : _data$connection3.nodeId);
          }
        }])
      }),
      getHarvesterPlotsDuplicates: build.query({
        query: function query(_ref7) {
          var nodeId = _ref7.nodeId,
              page = _ref7.page,
              pageSize = _ref7.pageSize;
          return {
            command: 'getHarvesterPlotsDuplicates',
            service: Client.Farmer,
            args: [nodeId, page, pageSize]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.plots;
        },
        providesTags: function providesTags(plots) {
          return plots ? [].concat(_toConsumableArray__default["default"](plots.map(function (filename) {
            return {
              type: 'HarvesterPlotsDuplicates',
              filename: filename
            };
          })), [{
            type: 'HarvesterPlotsDuplicates',
            id: 'LIST'
          }]) : [{
            type: 'HarvesterPlotsDuplicates',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onHarvesterUpdated',
          service: Client.Farmer,
          endpoint: function endpoint() {
            return farmerApi$1.endpoints.getHarvesterPlotsDuplicates;
          },
          skip: function skip(_draft, data, args) {
            var _data$connection4;

            return args.nodeId !== (data === null || data === void 0 ? void 0 : (_data$connection4 = data.connection) === null || _data$connection4 === void 0 ? void 0 : _data$connection4.nodeId);
          }
        }])
      }),
      getRewardTargets: build.query({
        query: function query() {
          var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              searchForPrivateKey = _ref8.searchForPrivateKey;

          return {
            command: 'getRewardTargets',
            service: Client.Farmer,
            args: [searchForPrivateKey]
          };
        },
        // transformResponse: (response: any) => response,
        providesTags: ['RewardTargets']
      }),
      setRewardTargets: build.mutation({
        query: function query(_ref9) {
          var farmerTarget = _ref9.farmerTarget,
              poolTarget = _ref9.poolTarget;
          return {
            command: 'setRewardTargets',
            service: Client.Farmer,
            args: [farmerTarget, poolTarget]
          };
        },
        invalidatesTags: ['RewardTargets']
      }),
      getFarmerConnections: build.query({
        query: function query() {
          return {
            command: 'getConnections',
            service: Client.Farmer
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.connections;
        },
        providesTags: function providesTags(connections) {
          return connections ? [].concat(_toConsumableArray__default["default"](connections.map(function (_ref10) {
            var nodeId = _ref10.nodeId;
            return {
              type: 'FarmerConnections',
              id: nodeId
            };
          })), [{
            type: 'FarmerConnections',
            id: 'LIST'
          }]) : [{
            type: 'FarmerConnections',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onConnections',
          service: Client.Farmer,
          onUpdate: function onUpdate(draft, data) {
            // empty base array
            draft.splice(0); // assign new items

            Object.assign(draft, data.connections);
          }
        }])
      }),
      openFarmerConnection: build.mutation({
        query: function query(_ref11) {
          var host = _ref11.host,
              port = _ref11.port;
          return {
            command: 'openConnection',
            service: Client.Farmer,
            args: [host, port]
          };
        },
        invalidatesTags: [{
          type: 'FarmerConnections',
          id: 'LIST'
        }]
      }),
      closeFarmerConnection: build.mutation({
        query: function query(_ref12) {
          var nodeId = _ref12.nodeId;
          return {
            command: 'closeConnection',
            service: Client.Farmer,
            args: [nodeId]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref13) {
          var nodeId = _ref13.nodeId;
          return [{
            type: 'FarmerConnections',
            id: 'LIST'
          }, {
            type: 'FarmerConnections',
            id: nodeId
          }];
        }
      }),
      getPoolLoginLink: build.query({
        query: function query(_ref14) {
          var launcherId = _ref14.launcherId;
          return {
            command: 'getPoolLoginLink',
            service: Client.Farmer,
            args: [launcherId]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.loginLink;
        },
        providesTags: function providesTags(launcherId) {
          return [{
            type: 'PoolLoginLink',
            id: launcherId
          }];
        } // TODO invalidate when join pool/change pool

      }),
      getSignagePoints: build.query({
        query: function query() {
          return {
            command: 'getSignagePoints',
            service: Client.Farmer
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.signagePoints;
        },
        providesTags: function providesTags(signagePoints) {
          return signagePoints ? [].concat(_toConsumableArray__default["default"](signagePoints.map(function (_ref15) {
            var signagePoint = _ref15.signagePoint;
            return {
              type: 'SignagePoints',
              id: signagePoint === null || signagePoint === void 0 ? void 0 : signagePoint.challengeHash
            };
          })), [{
            type: 'SignagePoints',
            id: 'LIST'
          }]) : [{
            type: 'SignagePoints',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onNewSignagePoint',
          service: Client.Farmer,
          onUpdate: function onUpdate(draft, data) {
            draft.unshift(data);

            if (draft.length > MAX_SIGNAGE_POINTS) {
              draft.splice(MAX_SIGNAGE_POINTS, draft.length - MAX_SIGNAGE_POINTS);
            }
          }
        }])
      }),
      getPoolState: build.query({
        query: function query() {
          return {
            command: 'getPoolState',
            service: Client.Farmer
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.poolState;
        },
        providesTags: function providesTags(poolsList) {
          return poolsList ? [].concat(_toConsumableArray__default["default"](poolsList.map(function (_ref16) {
            var p2SingletonPuzzleHash = _ref16.p2SingletonPuzzleHash;
            return {
              type: 'Pools',
              id: p2SingletonPuzzleHash
            };
          })), [{
            type: 'Pools',
            id: 'LIST'
          }]) : [{
            type: 'Pools',
            id: 'LIST'
          }];
        }
      }),
      setPayoutInstructions: build.mutation({
        query: function query(_ref17) {
          var launcherId = _ref17.launcherId,
              payoutInstructions = _ref17.payoutInstructions;
          return {
            command: 'setPayoutInstructions',
            service: Client.Farmer,
            args: [launcherId, payoutInstructions]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref18) {
          var launcherId = _ref18.launcherId;
          return [{
            type: 'PayoutInstructions',
            id: launcherId
          }];
        }
      }),
      getFarmingInfo: build.query({
        query: function query() {
          return {
            command: 'getFarmingInfo',
            service: Client.Farmer
          };
        },
        // transformResponse: (response: any) => response,
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onFarmingInfoChanged',
          service: Client.Farmer,
          endpoint: function endpoint() {
            return farmerApi$1.endpoints.getFarmingInfo;
          }
        }])
      })
    };
  }
}); // TODO add new farming info query and event for last_attepmtp_proofs

var useFarmerPingQuery$1 = farmerApi$1.useFarmerPingQuery,
    useGetHarvestersQuery$1 = farmerApi$1.useGetHarvestersQuery,
    useGetHarvestersSummaryQuery$1 = farmerApi$1.useGetHarvestersSummaryQuery,
    useGetHarvesterPlotsValidQuery$1 = farmerApi$1.useGetHarvesterPlotsValidQuery,
    useGetHarvesterPlotsDuplicatesQuery$1 = farmerApi$1.useGetHarvesterPlotsDuplicatesQuery,
    useGetHarvesterPlotsInvalidQuery$1 = farmerApi$1.useGetHarvesterPlotsInvalidQuery,
    useGetHarvesterPlotsKeysMissingQuery$1 = farmerApi$1.useGetHarvesterPlotsKeysMissingQuery,
    useGetRewardTargetsQuery$1 = farmerApi$1.useGetRewardTargetsQuery,
    useSetRewardTargetsMutation$1 = farmerApi$1.useSetRewardTargetsMutation,
    useGetFarmerConnectionsQuery$1 = farmerApi$1.useGetFarmerConnectionsQuery,
    useOpenFarmerConnectionMutation$1 = farmerApi$1.useOpenFarmerConnectionMutation,
    useCloseFarmerConnectionMutation$1 = farmerApi$1.useCloseFarmerConnectionMutation,
    useGetPoolLoginLinkQuery$1 = farmerApi$1.useGetPoolLoginLinkQuery,
    useGetSignagePointsQuery$1 = farmerApi$1.useGetSignagePointsQuery,
    useGetPoolStateQuery$1 = farmerApi$1.useGetPoolStateQuery,
    useSetPayoutInstructionsMutation$1 = farmerApi$1.useSetPayoutInstructionsMutation,
    useGetFarmingInfoQuery$1 = farmerApi$1.useGetFarmingInfoQuery;

var _excluded$3 = ["data"];

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useGetFarmerFullNodeConnectionsQuery() {
  var _useGetFarmerConnecti = useGetFarmerConnectionsQuery$1({}, {
    pollingInterval: 10000
  }),
      connections = _useGetFarmerConnecti.data,
      rest = _objectWithoutProperties__default["default"](_useGetFarmerConnecti, _excluded$3);

  var data = react$1.useMemo(function () {
    return connections === null || connections === void 0 ? void 0 : connections.filter(function (connection) {
      return connection.type === 1;
    });
  }, [connections]);
  return _objectSpread$7({
    data: data
  }, rest);
}

var _excluded$2 = ["data"];

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useGetHarvesterConnectionsQuery() {
  var _useGetFarmerConnecti = useGetFarmerConnectionsQuery$1({}, {
    pollingInterval: 10000
  }),
      connections = _useGetFarmerConnecti.data,
      rest = _objectWithoutProperties__default["default"](_useGetFarmerConnecti, _excluded$2);

  var data = react$1.useMemo(function () {
    return connections === null || connections === void 0 ? void 0 : connections.filter(function (connection) {
      return connection.type === 2;
    });
  }, [connections]);
  return _objectSpread$6({
    data: data
  }, rest);
}

function useGetHarvesterQuery(_ref) {
  var _harvester$syncing;

  var nodeId = _ref.nodeId;

  var _useGetHarvestersSumm = useGetHarvestersSummaryQuery$1(),
      data = _useGetHarvestersSumm.data,
      isLoadingHarvesterSummary = _useGetHarvestersSumm.isLoading,
      error = _useGetHarvestersSumm.error;

  var harvester = react$1.useMemo(function () {
    return data === null || data === void 0 ? void 0 : data.find(function (harvester) {
      return harvester.connection.nodeId === nodeId;
    });
  }, [data, nodeId]);
  var isLoading = isLoadingHarvesterSummary;
  return {
    isLoading: isLoading,
    error: error,
    connection: harvester === null || harvester === void 0 ? void 0 : harvester.connection,
    plots: harvester === null || harvester === void 0 ? void 0 : harvester.plots,
    noKeyFilenames: harvester === null || harvester === void 0 ? void 0 : harvester.noKeyFilenames,
    failedToOpenFilenames: harvester === null || harvester === void 0 ? void 0 : harvester.failedToOpenFilenames,
    duplicates: harvester === null || harvester === void 0 ? void 0 : harvester.duplicates,
    totalPlotSize: harvester === null || harvester === void 0 ? void 0 : harvester.totalPlotSize,
    initialized: (harvester === null || harvester === void 0 ? void 0 : (_harvester$syncing = harvester.syncing) === null || _harvester$syncing === void 0 ? void 0 : _harvester$syncing.initial) !== true
  };
}

function useGetHarvesterStats(nodeId) {
  var _useGetHarvestersSumm = useGetHarvestersSummaryQuery$1(),
      data = _useGetHarvestersSumm.data,
      isLoading = _useGetHarvestersSumm.isLoading,
      error = _useGetHarvestersSumm.error;

  var harvester = react$1.useMemo(function () {
    return data === null || data === void 0 ? void 0 : data.find(function (harvester) {
      return harvester.connection.nodeId === nodeId;
    });
  }, [data, nodeId]);
  return {
    isLoading: isLoading,
    error: error,
    harvester: harvester
  };
}

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var apiWithTag$3 = api.enhanceEndpoints({
  addTagTypes: []
});
var clientApi$1 = apiWithTag$3.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      close: build.mutation({
        query: function query(_ref) {
          var force = _ref.force;
          return {
            command: 'close',
            client: true,
            args: [force]
          };
        }
      }),
      getState: build.query({
        query: function query() {
          return {
            command: 'getState',
            client: true
          };
        },
        onCacheEntryAdded: function onCacheEntryAdded(_arg, api) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
            var updateCachedData, cacheDataLoaded, cacheEntryRemoved, unsubscribe, response;
            return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    updateCachedData = api.updateCachedData, cacheDataLoaded = api.cacheDataLoaded, cacheEntryRemoved = api.cacheEntryRemoved;
                    _context.prev = 1;
                    _context.next = 4;
                    return cacheDataLoaded;

                  case 4:
                    _context.next = 6;
                    return baseQuery({
                      command: 'onStateChange',
                      client: true,
                      args: [function (data) {
                        updateCachedData(function (draft) {
                          Object.assign(draft, _objectSpread$5({}, data));
                        });
                      }]
                    }, api, {});

                  case 6:
                    response = _context.sent;
                    unsubscribe = response.data;

                  case 8:
                    _context.prev = 8;
                    _context.next = 11;
                    return cacheEntryRemoved;

                  case 11:
                    if (unsubscribe) {
                      unsubscribe();
                    }

                    return _context.finish(8);

                  case 13:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[1,, 8, 13]]);
          }))();
        }
      }),
      clientStartService: build.mutation({
        query: function query(_ref2) {
          var service = _ref2.service,
              disableWait = _ref2.disableWait;
          return {
            command: 'startService',
            args: [service, disableWait],
            client: true
          };
        }
      })
    };
  }
});
var useCloseMutation$1 = clientApi$1.useCloseMutation,
    useGetStateQuery$1 = clientApi$1.useGetStateQuery,
    useClientStartServiceMutation$1 = clientApi$1.useClientStartServiceMutation;

var _excluded$1 = ["status"],
    _excluded2$1 = ["status"];

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var apiWithTag$2 = api.enhanceEndpoints({
  addTagTypes: ['KeyringStatus', 'ServiceRunning']
});
var daemonApi$1 = apiWithTag$2.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      daemonPing: build.query({
        query: function query() {
          return {
            command: 'ping',
            service: Client.Daemon
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      getKeyringStatus: build.query({
        query: function query() {
          return {
            command: 'keyringStatus',
            service: Client.Daemon
          };
        },
        transformResponse: function transformResponse(response) {
          response.status;
              var rest = _objectWithoutProperties__default["default"](response, _excluded$1);

          return _objectSpread$4({}, rest);
        },
        providesTags: ['KeyringStatus'],
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onKeyringStatusChanged',
          service: Client.Daemon,
          onUpdate: function onUpdate(draft, data) {
            // empty base array
            draft.splice(0);

            data.status;
                var rest = _objectWithoutProperties__default["default"](data, _excluded2$1); // assign new items


            Object.assign(draft, rest);
          }
        }])
      }),
      startService: build.mutation({
        query: function query(_ref) {
          var service = _ref.service,
              testing = _ref.testing;
          return {
            command: 'startService',
            service: Client.Daemon,
            args: [service, testing]
          };
        }
      }),
      stopService: build.mutation({
        query: function query(_ref2) {
          var service = _ref2.service;
          return {
            command: 'stopService',
            service: Client.Daemon,
            args: [service]
          };
        }
      }),
      isServiceRunning: build.query({
        query: function query(_ref3) {
          var service = _ref3.service;
          return {
            command: 'isRunning',
            service: Client.Daemon,
            args: [service]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.isRunning;
        },
        providesTags: function providesTags(_result, _err, _ref4) {
          var service = _ref4.service;
          return [{
            type: 'ServiceRunning',
            id: service
          }];
        }
      }),
      setKeyringPassphrase: build.mutation({
        query: function query(_ref5) {
          var currentPassphrase = _ref5.currentPassphrase,
              newPassphrase = _ref5.newPassphrase,
              passphraseHint = _ref5.passphraseHint,
              savePassphrase = _ref5.savePassphrase;
          return {
            command: 'setKeyringPassphrase',
            service: Client.Daemon,
            args: [currentPassphrase, newPassphrase, passphraseHint, savePassphrase]
          };
        },
        invalidatesTags: function invalidatesTags() {
          return ['KeyringStatus'];
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      removeKeyringPassphrase: build.mutation({
        query: function query(_ref6) {
          var currentPassphrase = _ref6.currentPassphrase;
          return {
            command: 'removeKeyringPassphrase',
            service: Client.Daemon,
            args: [currentPassphrase]
          };
        },
        invalidatesTags: function invalidatesTags() {
          return ['KeyringStatus'];
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      migrateKeyring: build.mutation({
        query: function query(_ref7) {
          var passphrase = _ref7.passphrase,
              passphraseHint = _ref7.passphraseHint,
              savePassphrase = _ref7.savePassphrase,
              cleanupLegacyKeyring = _ref7.cleanupLegacyKeyring;
          return {
            command: 'migrateKeyring',
            service: Client.Daemon,
            args: [passphrase, passphraseHint, savePassphrase, cleanupLegacyKeyring]
          };
        },
        invalidatesTags: function invalidatesTags() {
          return ['KeyringStatus'];
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      unlockKeyring: build.mutation({
        query: function query(_ref8) {
          var key = _ref8.key;
          return {
            command: 'unlockKeyring',
            service: Client.Daemon,
            args: [key]
          };
        },
        invalidatesTags: function invalidatesTags() {
          return ['KeyringStatus'];
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      getPlotters: build.query({
        query: function query() {
          return {
            command: 'getPlotters',
            service: Client.Daemon
          };
        },
        transformResponse: function transformResponse(response) {
          var plotters = response.plotters;
          var plotterNames = Object.keys(plotters);
          var availablePlotters = {};
          plotterNames.forEach(function (plotterName) {
            var _plotters$plotterName = plotters[plotterName],
                _plotters$plotterName2 = _plotters$plotterName.displayName,
                displayName = _plotters$plotterName2 === void 0 ? plotterName : _plotters$plotterName2,
                version = _plotters$plotterName.version,
                installed = _plotters$plotterName.installed,
                canInstall = _plotters$plotterName.canInstall,
                bladebitMemoryWarning = _plotters$plotterName.bladebitMemoryWarning;
            availablePlotters[plotterName] = {
              displayName: displayName,
              version: version,
              options: Client.optionsForPlotter(plotterName),
              defaults: Client.defaultsForPlotter(plotterName),
              installInfo: {
                installed: installed,
                canInstall: canInstall,
                bladebitMemoryWarning: bladebitMemoryWarning
              }
            };
          });
          return availablePlotters;
        } // providesTags: (_result, _err, { service }) => [{ type: 'ServiceRunning', id: service }],

      }),
      stopPlotting: build.mutation({
        query: function query(_ref9) {
          var id = _ref9.id;
          return {
            command: 'stopPlotting',
            service: Client.Daemon,
            args: [id]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        } // providesTags: (_result, _err, { service }) => [{ type: 'ServiceRunning', id: service }],

      }),
      startPlotting: build.mutation({
        query: function query(_ref10) {
          var bladebitDisableNUMA = _ref10.bladebitDisableNUMA,
              bladebitWarmStart = _ref10.bladebitWarmStart,
              c = _ref10.c,
              delay = _ref10.delay,
              disableBitfieldPlotting = _ref10.disableBitfieldPlotting,
              excludeFinalDir = _ref10.excludeFinalDir,
              farmerPublicKey = _ref10.farmerPublicKey,
              finalLocation = _ref10.finalLocation,
              fingerprint = _ref10.fingerprint,
              madmaxNumBucketsPhase3 = _ref10.madmaxNumBucketsPhase3,
              madmaxTempToggle = _ref10.madmaxTempToggle,
              madmaxThreadMultiplier = _ref10.madmaxThreadMultiplier,
              maxRam = _ref10.maxRam,
              numBuckets = _ref10.numBuckets,
              numThreads = _ref10.numThreads,
              overrideK = _ref10.overrideK,
              parallel = _ref10.parallel,
              plotCount = _ref10.plotCount,
              plotSize = _ref10.plotSize,
              plotterName = _ref10.plotterName,
              poolPublicKey = _ref10.poolPublicKey,
              queue = _ref10.queue,
              workspaceLocation = _ref10.workspaceLocation,
              workspaceLocation2 = _ref10.workspaceLocation2;
          return {
            command: 'startPlotting',
            service: Client.Daemon,
            args: [plotterName, plotSize, plotCount, workspaceLocation, workspaceLocation2 || workspaceLocation, finalLocation, maxRam, numBuckets, numThreads, queue, fingerprint, parallel, delay, disableBitfieldPlotting, excludeFinalDir, overrideK, farmerPublicKey, poolPublicKey, c, bladebitDisableNUMA, bladebitWarmStart, madmaxNumBucketsPhase3, madmaxTempToggle, madmaxThreadMultiplier]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        } // providesTags: (_result, _err, { service }) => [{ type: 'ServiceRunning', id: service }],

      })
    };
  }
});
var useDaemonPingQuery$1 = daemonApi$1.useDaemonPingQuery,
    useGetKeyringStatusQuery$1 = daemonApi$1.useGetKeyringStatusQuery,
    useStartServiceMutation$1 = daemonApi$1.useStartServiceMutation,
    useStopServiceMutation$1 = daemonApi$1.useStopServiceMutation,
    useIsServiceRunningQuery$1 = daemonApi$1.useIsServiceRunningQuery,
    useSetKeyringPassphraseMutation$1 = daemonApi$1.useSetKeyringPassphraseMutation,
    useRemoveKeyringPassphraseMutation$1 = daemonApi$1.useRemoveKeyringPassphraseMutation,
    useMigrateKeyringMutation$1 = daemonApi$1.useMigrateKeyringMutation,
    useUnlockKeyringMutation$1 = daemonApi$1.useUnlockKeyringMutation,
    useGetPlottersQuery$1 = daemonApi$1.useGetPlottersQuery,
    useStopPlottingMutation$1 = daemonApi$1.useStopPlottingMutation,
    useStartPlottingMutation$1 = daemonApi$1.useStartPlottingMutation;

var apiWithTag2 = apiWithTag$4.enhanceEndpoints({
  addTagTypes: ['Plots', 'PlotDirectories']
});
var harvesterApi$1 = apiWithTag2.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      harvesterPing: build.query({
        query: function query() {
          return {
            command: 'ping',
            service: Client.Harvester
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      getPlots: build.query({
        query: function query() {
          return {
            command: 'getPlots',
            service: Client.Harvester
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.plots;
        },
        providesTags: function providesTags(plots) {
          return plots ? [].concat(_toConsumableArray__default["default"](plots.map(function (_ref) {
            var filename = _ref.filename;
            return {
              type: 'Plots',
              id: filename
            };
          })), [{
            type: 'Plots',
            id: 'LIST'
          }]) : [{
            type: 'Plots',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onRefreshPlots',
          service: Client.Harvester,
          endpoint: function endpoint() {
            return harvesterApi$1.endpoints.getPlots;
          }
        }])
      }),
      refreshPlots: build.mutation({
        query: function query() {
          return {
            command: 'refreshPlots',
            service: Client.Harvester
          };
        },
        invalidatesTags: [{
          type: 'Harvesters',
          id: 'LIST'
        }]
      }),
      deletePlot: build.mutation({
        /*
        query: ({ filename }) => ({
          command: 'deletePlot',
          service: Harvester,
          args: [filename],
        }),
        */
        queryFn: function queryFn(_ref2, _queryApi, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
            var filename, _yield$fetchWithBQ, data, error, refreshResponse;

            return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    filename = _ref2.filename;
                    _context.prev = 1;
                    _context.next = 4;
                    return fetchWithBQ({
                      command: 'deletePlot',
                      service: Client.Harvester,
                      args: [filename]
                    });

                  case 4:
                    _yield$fetchWithBQ = _context.sent;
                    data = _yield$fetchWithBQ.data;
                    error = _yield$fetchWithBQ.error;

                    if (!error) {
                      _context.next = 9;
                      break;
                    }

                    throw error;

                  case 9:
                    _context.next = 11;
                    return fetchWithBQ({
                      command: 'refreshPlots',
                      service: Client.Harvester
                    });

                  case 11:
                    refreshResponse = _context.sent;

                    if (!refreshResponse.error) {
                      _context.next = 14;
                      break;
                    }

                    throw error;

                  case 14:
                    return _context.abrupt("return", {
                      data: data
                    });

                  case 17:
                    _context.prev = 17;
                    _context.t0 = _context["catch"](1);
                    return _context.abrupt("return", {
                      error: _context.t0
                    });

                  case 20:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[1, 17]]);
          }))();
        },
        transformResponse: function transformResponse(response) {
          console.log('restponse deletePlot', response);
          return response === null || response === void 0 ? void 0 : response.success;
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref3) {
          var filename = _ref3.filename;
          return [{
            type: 'HarvestersSummary',
            id: 'LIST'
          }, {
            type: 'HarvesterPlots',
            id: 'LIST'
          }, {
            type: 'HarvesterPlotsInvalid',
            id: 'LIST'
          }, {
            type: 'HarvesterPlotsKeysMissing',
            id: 'LIST'
          }, {
            type: 'HarvesterPlotsDuplicates',
            id: 'LIST'
          }, // TODO all next are deprecated and removed in long run
          {
            type: 'Plots',
            id: 'LIST'
          }, {
            type: 'Plots',
            id: filename
          }, {
            type: 'Harvesters',
            id: 'LIST'
          }];
        }
      }),
      getPlotDirectories: build.query({
        query: function query() {
          return {
            command: 'getPlotDirectories',
            service: Client.Harvester
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.directories;
        },
        providesTags: function providesTags(directories) {
          return directories ? [].concat(_toConsumableArray__default["default"](directories.map(function (directory) {
            return {
              type: 'PlotDirectories',
              id: directory
            };
          })), [{
            type: 'PlotDirectories',
            id: 'LIST'
          }]) : [{
            type: 'PlotDirectories',
            id: 'LIST'
          }];
        }
      }),
      addPlotDirectory: build.mutation({
        query: function query(_ref4) {
          var dirname = _ref4.dirname;
          return {
            command: 'addPlotDirectory',
            service: Client.Harvester,
            args: [dirname]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref5) {
          var dirname = _ref5.dirname;
          return [{
            type: 'PlotDirectories',
            id: 'LIST'
          }, {
            type: 'PlotDirectories',
            id: dirname
          }];
        }
      }),
      removePlotDirectory: build.mutation({
        query: function query(_ref6) {
          var dirname = _ref6.dirname;
          return {
            command: 'removePlotDirectory',
            service: Client.Harvester,
            args: [dirname]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref7) {
          var dirname = _ref7.dirname;
          return [{
            type: 'PlotDirectories',
            id: 'LIST'
          }, {
            type: 'PlotDirectories',
            id: dirname
          }];
        }
      })
    };
  }
});
var useHarvesterPingQuery$1 = harvesterApi$1.useHarvesterPingQuery,
    useGetPlotsQuery$1 = harvesterApi$1.useGetPlotsQuery,
    useRefreshPlotsMutation$1 = harvesterApi$1.useRefreshPlotsMutation,
    useDeletePlotMutation$1 = harvesterApi$1.useDeletePlotMutation,
    useGetPlotDirectoriesQuery$1 = harvesterApi$1.useGetPlotDirectoriesQuery,
    useAddPlotDirectoryMutation$1 = harvesterApi$1.useAddPlotDirectoryMutation,
    useRemovePlotDirectoryMutation$1 = harvesterApi$1.useRemovePlotDirectoryMutation;

var apiWithTag$1 = api.enhanceEndpoints({
  addTagTypes: ['PlotQueue']
});
var plotterApi$1 = apiWithTag$1.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      getPlotQueue: build.query({
        query: function query() {
          return {
            command: 'getQueue',
            service: Client.Plotter
          };
        },
        // transformResponse: (response: any) => response,
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onQueueChanged',
          service: Client.Plotter,
          endpoint: function endpoint() {
            return plotterApi$1.endpoints.getPlotQueue;
          }
        }])
      })
      /*
          stopPlotting: build.mutation<boolean, {
            id: string;
          }>({
            query: ({ id }) => ({
              command: 'stopPlotting',
              service: Plotter,
              args: [id],
            }),
            transformResponse: (response: any) => response?.success,
            // providesTags: (_result, _err, { service }) => [{ type: 'ServiceRunning', id: service }],
          }),
          */

      /*
          startPlotting: build.mutation<boolean, PlotAdd>({
            query: ({ 
              bladebitDisableNUMA,
              bladebitWarmStart,
              c,
              delay,
              disableBitfieldPlotting,
              excludeFinalDir,
              farmerPublicKey,
              finalLocation,
              fingerprint,
              madmaxNumBucketsPhase3,
              madmaxTempToggle,
              madmaxThreadMultiplier,
              maxRam,
              numBuckets,
              numThreads,
              overrideK,
              parallel,
              plotCount,
              plotSize,
              plotterName,
              poolPublicKey,
              queue,
              workspaceLocation,
              workspaceLocation2,
             }) => ({
              command: 'startPlotting',
              service: Plotter,
              args: [
                plotterName,
                plotSize,
                plotCount,
                workspaceLocation,
                workspaceLocation2 || workspaceLocation,
                finalLocation,
                maxRam,
                numBuckets,
                numThreads,
                queue,
                fingerprint,
                parallel,
                delay,
                disableBitfieldPlotting,
                excludeFinalDir,
                overrideK,
                farmerPublicKey,
                poolPublicKey,
                c,
                bladebitDisableNUMA,
                bladebitWarmStart,
                madmaxNumBucketsPhase3,
                madmaxTempToggle,
                madmaxThreadMultiplier,
              ],
            }),
            transformResponse: (response: any) => response?.success,
            // providesTags: (_result, _err, { service }) => [{ type: 'ServiceRunning', id: service }],
          }),
          */

    };
  }
});
var useGetPlotQueueQuery$1 = plotterApi$1.useGetPlotQueueQuery;

var DAY_SECONDS = 60 * 60 * 24;
function removeOldPoints(points) {
  var second = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DAY_SECONDS;
  var current = Date.now() / 1000;
  var dayBefore = current - second;
  return points === null || points === void 0 ? void 0 : points.filter(function (point) {
    var _point = _slicedToArray__default["default"](point, 1),
        timestamp = _point[0];

    return timestamp >= dayBefore;
  });
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function normalizePoolState(poolState) {
  return _objectSpread$3(_objectSpread$3({}, poolState), {}, {
    pointsAcknowledged24h: removeOldPoints(poolState.pointsAcknowledged24h),
    pointsFound24h: removeOldPoints(poolState.pointsFound24h)
  });
}

var _excluded = ["data", "error"],
    _excluded2 = ["data", "error"];

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var apiWithTag = api.enhanceEndpoints({
  addTagTypes: ['Address', 'DID', 'DIDCoinInfo', 'DIDName', 'DIDPubKey', 'DIDRecoveryInfo', 'DIDRecoveryList', 'DIDWallet', 'Keys', 'LoggedInFingerprint', 'NFTInfo', 'NFTWalletWithDID', 'OfferCounts', 'OfferTradeRecord', 'PlotNFT', 'PoolWalletStatus', 'TransactionCount', 'Transactions', 'WalletBalance', 'WalletConnections', 'Wallets', 'DerivationIndex']
});
var walletApi$1 = apiWithTag.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      walletPing: build.query({
        query: function query() {
          return {
            command: 'ping',
            service: Client.Wallet
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.success;
        }
      }),
      getLoggedInFingerprint: build.query({
        query: function query() {
          return {
            command: 'getLoggedInFingerprint',
            service: Client.Wallet
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.fingerprint;
        },
        providesTags: [{
          type: 'LoggedInFingerprint'
        }]
      }),
      getWallets: build.query({
        /*
        query: () => ({
          command: 'getWallets',
        }),
        */
        queryFn: function queryFn(_args, _queryApi, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
            var _yield$fetchWithBQ, data, error, wallets;

            return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return fetchWithBQ({
                      command: 'getWallets',
                      service: Client.Wallet
                    });

                  case 3:
                    _yield$fetchWithBQ = _context2.sent;
                    data = _yield$fetchWithBQ.data;
                    error = _yield$fetchWithBQ.error;

                    if (!error) {
                      _context2.next = 8;
                      break;
                    }

                    throw error;

                  case 8:
                    wallets = data === null || data === void 0 ? void 0 : data.wallets;

                    if (wallets) {
                      _context2.next = 11;
                      break;
                    }

                    throw new Error('List of the wallets is not defined');

                  case 11:
                    _context2.next = 13;
                    return Promise.all(wallets.map( /*#__PURE__*/function () {
                      var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(wallet) {
                        var type, meta, _yield$fetchWithBQ2, assetData, assetError, _yield$fetchWithBQ3, nameData, nameError;

                        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                type = wallet.type;
                                meta = {};

                                if (!(type === Client.WalletType.CAT)) {
                                  _context.next = 19;
                                  break;
                                }

                                _context.next = 5;
                                return fetchWithBQ({
                                  command: 'getAssetId',
                                  service: Client.CAT,
                                  args: [wallet.id]
                                });

                              case 5:
                                _yield$fetchWithBQ2 = _context.sent;
                                assetData = _yield$fetchWithBQ2.data;
                                assetError = _yield$fetchWithBQ2.error;

                                if (!assetError) {
                                  _context.next = 10;
                                  break;
                                }

                                throw assetError;

                              case 10:
                                meta.assetId = assetData.assetId; // get CAT name

                                _context.next = 13;
                                return fetchWithBQ({
                                  command: 'getName',
                                  service: Client.CAT,
                                  args: [wallet.id]
                                });

                              case 13:
                                _yield$fetchWithBQ3 = _context.sent;
                                nameData = _yield$fetchWithBQ3.data;
                                nameError = _yield$fetchWithBQ3.error;

                                if (!nameError) {
                                  _context.next = 18;
                                  break;
                                }

                                throw nameError;

                              case 18:
                                meta.name = nameData.name;

                              case 19:
                                return _context.abrupt("return", _objectSpread$2(_objectSpread$2({}, wallet), {}, {
                                  meta: meta
                                }));

                              case 20:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      return function (_x) {
                        return _ref.apply(this, arguments);
                      };
                    }()));

                  case 13:
                    _context2.t0 = _context2.sent;
                    return _context2.abrupt("return", {
                      data: _context2.t0
                    });

                  case 17:
                    _context2.prev = 17;
                    _context2.t1 = _context2["catch"](0);
                    return _context2.abrupt("return", {
                      error: _context2.t1
                    });

                  case 20:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, null, [[0, 17]]);
          }))();
        },
        // transformResponse: (response: any) => response?.wallets,
        providesTags: function providesTags(result) {
          return result ? [].concat(_toConsumableArray__default["default"](result.map(function (_ref2) {
            var id = _ref2.id;
            return {
              type: 'Wallets',
              id: id
            };
          })), [{
            type: 'Wallets',
            id: 'LIST'
          }]) : [{
            type: 'Wallets',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onWalletCreated',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getWallets;
          }
        }])
      }),
      getTransaction: build.query({
        query: function query(_ref3) {
          var transactionId = _ref3.transactionId;
          return {
            command: 'getTransaction',
            service: Client.Wallet,
            args: [transactionId]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.transaction;
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onTransactionUpdate',
          service: Client.Wallet,
          onUpdate: function onUpdate(draft, data, _ref4) {
            var transactionId = _ref4.transactionId;
            var transaction = data.additionalData.transaction;

            if (transaction.name === transactionId) {
              Object.assign(draft, transaction);
            }
          }
        }])
      }),
      getPwStatus: build.query({
        query: function query(_ref5) {
          var walletId = _ref5.walletId;
          return {
            command: 'getPwStatus',
            service: Client.Wallet,
            args: [walletId]
          };
        },

        /*
        transformResponse: (response: any, _error, { walletId }) => ({
          ...response,
          walletId,
        }),
        */
        providesTags: function providesTags(result, _error, _ref6) {
          var walletId = _ref6.walletId;
          return result ? [{
            type: 'PoolWalletStatus',
            id: walletId
          }] : [];
        }
      }),
      pwAbsorbRewards: build.mutation({
        query: function query(_ref7) {
          var walletId = _ref7.walletId,
              fee = _ref7.fee;
          return {
            command: 'pwAbsorbRewards',
            service: Client.Wallet,
            args: [walletId, fee]
          };
        },
        invalidatesTags: [{
          type: 'Transactions',
          id: 'LIST'
        }, {
          type: 'PlotNFT',
          id: 'LIST'
        }]
      }),
      pwJoinPool: build.mutation({
        query: function query(_ref8) {
          var walletId = _ref8.walletId,
              poolUrl = _ref8.poolUrl,
              relativeLockHeight = _ref8.relativeLockHeight,
              targetPuzzleHash = _ref8.targetPuzzleHash,
              fee = _ref8.fee;
          return {
            command: 'pwJoinPool',
            service: Client.Wallet,
            args: [walletId, poolUrl, relativeLockHeight, targetPuzzleHash, fee]
          };
        },
        invalidatesTags: [{
          type: 'Transactions',
          id: 'LIST'
        }, {
          type: 'PlotNFT',
          id: 'LIST'
        }]
      }),
      pwSelfPool: build.mutation({
        query: function query(_ref9) {
          var walletId = _ref9.walletId,
              fee = _ref9.fee;
          return {
            command: 'pwSelfPool',
            service: Client.Wallet,
            args: [walletId, fee]
          };
        },
        invalidatesTags: [{
          type: 'Transactions',
          id: 'LIST'
        }, {
          type: 'PlotNFT',
          id: 'LIST'
        }]
      }),
      createNewWallet: build.mutation({
        query: function query(_ref10) {
          var walletType = _ref10.walletType,
              options = _ref10.options;
          return {
            command: 'createNewWallet',
            service: Client.Wallet,
            args: [walletType, options]
          };
        },
        invalidatesTags: [{
          type: 'Wallets',
          id: 'LIST'
        }, {
          type: 'DIDWallet',
          id: 'LIST'
        }]
      }),
      deleteUnconfirmedTransactions: build.mutation({
        query: function query(_ref11) {
          var walletId = _ref11.walletId;
          return {
            command: 'deleteUnconfirmedTransactions',
            service: Client.Wallet,
            args: [walletId]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref12) {
          var walletId = _ref12.walletId;
          return [{
            type: 'Transactions',
            id: 'LIST'
          }, {
            type: 'TransactionCount',
            id: walletId
          }];
        }
      }),
      getWalletBalance: build.query({
        query: function query(_ref13) {
          var walletId = _ref13.walletId;
          return {
            command: 'getWalletBalance',
            service: Client.Wallet,
            args: [walletId]
          };
        },
        transformResponse: function transformResponse(response) {
          var walletBalance = response.walletBalance,
              _response$walletBalan = response.walletBalance,
              confirmedWalletBalance = _response$walletBalan.confirmedWalletBalance,
              unconfirmedWalletBalance = _response$walletBalan.unconfirmedWalletBalance;
          var pendingBalance = new BigNumber__default["default"](unconfirmedWalletBalance).minus(confirmedWalletBalance);
          var pendingTotalBalance = new BigNumber__default["default"](confirmedWalletBalance).plus(pendingBalance);
          return _objectSpread$2(_objectSpread$2({}, walletBalance), {}, {
            pendingBalance: pendingBalance,
            pendingTotalBalance: pendingTotalBalance
          });
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onCoinAdded',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getWalletBalance;
          }
        }, {
          command: 'onCoinRemoved',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getWalletBalance;
          }
        }, {
          command: 'onPendingTransaction',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getWalletBalance;
          }
        }, {
          command: 'onOfferAdded',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getWalletBalance;
          }
        }, {
          command: 'onOfferUpdated',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getWalletBalance;
          }
        }])
      }),
      getFarmedAmount: build.query({
        query: function query() {
          return {
            command: 'getFarmedAmount',
            service: Client.Wallet
          };
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onCoinAdded',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getFarmedAmount;
          }
        }, {
          command: 'onCoinRemoved',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getFarmedAmount;
          }
        }])
      }),
      sendTransaction: build.mutation({
        queryFn: function queryFn(args, queryApi, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4() {
            var subscribeResponse, unsubscribe, _walletId2, amount, fee, address, waitForConfirmation;

            return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    unsubscribe = function _unsubscribe() {
                      if (subscribeResponse) {
                        subscribeResponse.data();
                        subscribeResponse = undefined;
                      }
                    };

                    _context4.prev = 1;
                    _walletId2 = args.walletId, amount = args.amount, fee = args.fee, address = args.address, waitForConfirmation = args.waitForConfirmation;
                    _context4.next = 5;
                    return new Promise( /*#__PURE__*/function () {
                      var _ref14 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(resolve, reject) {
                        var updatedTransactions, transactionName, processUpdates, _yield$fetchWithBQ4, sendTransactionData, error, transaction;

                        return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                processUpdates = function _processUpdates() {
                                  if (!transactionName) {
                                    return;
                                  }

                                  var transaction = updatedTransactions.find(function (trx) {
                                    var _trx$sentTo;

                                    return trx.name === transactionName && !!(trx !== null && trx !== void 0 && (_trx$sentTo = trx.sentTo) !== null && _trx$sentTo !== void 0 && _trx$sentTo.length);
                                  });

                                  if (transaction) {
                                    resolve({
                                      transaction: transaction,
                                      transactionId: transaction.name
                                    });
                                  }
                                };

                                updatedTransactions = [];

                                if (!waitForConfirmation) {
                                  _context3.next = 6;
                                  break;
                                }

                                _context3.next = 5;
                                return baseQuery({
                                  command: 'onTransactionUpdate',
                                  service: Client.Wallet,
                                  args: [function (data) {
                                    var transaction = data.additionalData.transaction;
                                    updatedTransactions.push(transaction);
                                    processUpdates();
                                  }]
                                }, queryApi, {});

                              case 5:
                                subscribeResponse = _context3.sent;

                              case 6:
                                _context3.next = 8;
                                return fetchWithBQ({
                                  command: 'sendTransaction',
                                  service: Client.Wallet,
                                  args: [_walletId2, amount, fee, address]
                                });

                              case 8:
                                _yield$fetchWithBQ4 = _context3.sent;
                                sendTransactionData = _yield$fetchWithBQ4.data;
                                error = _yield$fetchWithBQ4.error;
                                _objectWithoutProperties__default["default"](_yield$fetchWithBQ4, _excluded);

                                if (!error) {
                                  _context3.next = 15;
                                  break;
                                }

                                reject(error);
                                return _context3.abrupt("return");

                              case 15:
                                if (waitForConfirmation) {
                                  _context3.next = 18;
                                  break;
                                }

                                resolve(sendTransactionData);
                                return _context3.abrupt("return");

                              case 18:
                                transaction = sendTransactionData.transaction;

                                if (transaction) {
                                  _context3.next = 22;
                                  break;
                                }

                                reject(new Error('Transaction is not present in response'));
                                return _context3.abrupt("return");

                              case 22:
                                transactionName = transaction.name;
                                updatedTransactions.push(transaction);
                                processUpdates();

                              case 25:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3);
                      }));

                      return function (_x2, _x3) {
                        return _ref14.apply(this, arguments);
                      };
                    }());

                  case 5:
                    _context4.t0 = _context4.sent;
                    return _context4.abrupt("return", {
                      data: _context4.t0
                    });

                  case 9:
                    _context4.prev = 9;
                    _context4.t1 = _context4["catch"](1);
                    return _context4.abrupt("return", {
                      error: _context4.t1
                    });

                  case 12:
                    _context4.prev = 12;
                    unsubscribe();
                    return _context4.finish(12);

                  case 15:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, null, [[1, 9, 12, 15]]);
          }))();
        },
        invalidatesTags: [{
          type: 'Transactions',
          id: 'LIST'
        }]
      }),
      generateMnemonic: build.mutation({
        query: function query() {
          return {
            command: 'generateMnemonic',
            service: Client.Wallet
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.mnemonic;
        }
      }),
      getPublicKeys: build.query({
        query: function query() {
          return {
            command: 'getPublicKeys',
            service: Client.Wallet
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.publicKeyFingerprints;
        },
        providesTags: function providesTags(keys) {
          return keys ? [].concat(_toConsumableArray__default["default"](keys.map(function (key) {
            return {
              type: 'Keys',
              id: key
            };
          })), [{
            type: 'Keys',
            id: 'LIST'
          }]) : [{
            type: 'Keys',
            id: 'LIST'
          }];
        }
      }),
      addKey: build.mutation({
        query: function query(_ref15) {
          var mnemonic = _ref15.mnemonic,
              type = _ref15.type,
              filePath = _ref15.filePath;
          return {
            command: 'addKey',
            service: Client.Wallet,
            args: [mnemonic, type, filePath]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.fingerprint;
        },
        invalidatesTags: [{
          type: 'Keys',
          id: 'LIST'
        }]
      }),
      deleteKey: build.mutation({
        query: function query(_ref16) {
          var fingerprint = _ref16.fingerprint;
          return {
            command: 'deleteKey',
            service: Client.Wallet,
            args: [fingerprint]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref17) {
          var fingerprint = _ref17.fingerprint;
          return [{
            type: 'Keys',
            id: fingerprint
          }];
        }
      }),
      checkDeleteKey: build.mutation({
        query: function query(_ref18) {
          var fingerprint = _ref18.fingerprint;
          return {
            command: 'checkDeleteKey',
            service: Client.Wallet,
            args: [fingerprint]
          };
        }
      }),
      deleteAllKeys: build.mutation({
        query: function query() {
          return {
            command: 'deleteAllKeys',
            service: Client.Wallet
          };
        },
        invalidatesTags: [{
          type: 'Keys',
          id: 'LIST'
        }]
      }),
      logIn: build.mutation({
        query: function query(_ref19) {
          var fingerprint = _ref19.fingerprint,
              type = _ref19.type,
              filePath = _ref19.filePath,
              host = _ref19.host;
          return {
            command: 'logIn',
            service: Client.Wallet,
            args: [fingerprint, type, filePath, host]
          };
        },
        invalidatesTags: [{
          type: 'LoggedInFingerprint'
        }]
      }),
      logInAndSkipImport: build.mutation({
        query: function query(_ref20) {
          var fingerprint = _ref20.fingerprint,
              host = _ref20.host;
          return {
            command: 'logInAndSkipImport',
            service: Client.Wallet,
            args: [fingerprint, host]
          };
        }
      }),
      logInAndImportBackup: build.mutation({
        query: function query(_ref21) {
          var fingerprint = _ref21.fingerprint,
              filePath = _ref21.filePath,
              host = _ref21.host;
          return {
            command: 'logInAndImportBackup',
            service: Client.Wallet,
            args: [fingerprint, filePath, host]
          };
        }
      }),
      getBackupInfo: build.query({
        query: function query(_ref22) {
          var filePath = _ref22.filePath,
              options = _ref22.options;
          return {
            command: 'getBackupInfo',
            service: Client.Wallet,
            args: [filePath, options]
          };
        }
      }),
      getBackupInfoByFingerprint: build.query({
        query: function query(_ref23) {
          var filePath = _ref23.filePath,
              fingerprint = _ref23.fingerprint;
          return {
            command: 'getBackupInfoByFingerprint',
            service: Client.Wallet,
            args: [filePath, fingerprint]
          };
        }
      }),
      getBackupInfoByWords: build.query({
        query: function query(_ref24) {
          var filePath = _ref24.filePath,
              words = _ref24.words;
          return {
            command: 'getBackupInfoByWords',
            service: Client.Wallet,
            args: [filePath, words]
          };
        }
      }),
      getPrivateKey: build.query({
        query: function query(_ref25) {
          var fingerprint = _ref25.fingerprint;
          return {
            command: 'getPrivateKey',
            service: Client.Wallet,
            args: [fingerprint]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.privateKey;
        }
      }),
      getTransactions: build.query({
        query: function query(_ref26) {
          var walletId = _ref26.walletId,
              start = _ref26.start,
              end = _ref26.end,
              sortKey = _ref26.sortKey,
              reverse = _ref26.reverse;
          return {
            command: 'getTransactions',
            service: Client.Wallet,
            args: [walletId, start, end, sortKey, reverse]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.transactions;
        },
        providesTags: function providesTags(result) {
          return result ? [].concat(_toConsumableArray__default["default"](result.map(function (_ref27) {
            var name = _ref27.name;
            return {
              type: 'Transactions',
              id: name
            };
          })), [{
            type: 'Transactions',
            id: 'LIST'
          }]) : [{
            type: 'Transactions',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onCoinAdded',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getTransactions;
          }
        }, {
          command: 'onCoinRemoved',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getTransactions;
          }
        }, {
          command: 'onPendingTransaction',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getTransactions;
          }
        }])
      }),
      getTransactionsCount: build.query({
        query: function query(_ref28) {
          var walletId = _ref28.walletId;
          return {
            command: 'getTransactionsCount',
            service: Client.Wallet,
            args: [walletId]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.count;
        },
        providesTags: function providesTags(result, _error, _ref29) {
          var walletId = _ref29.walletId;
          return result ? [{
            type: 'TransactionCount',
            id: walletId
          }] : [];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onCoinAdded',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getTransactionsCount;
          }
        }, {
          command: 'onCoinRemoved',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getTransactionsCount;
          }
        }, {
          command: 'onPendingTransaction',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getTransactionsCount;
          }
        }])
      }),
      getCurrentAddress: build.query({
        query: function query(_ref30) {
          var walletId = _ref30.walletId;
          return {
            command: 'getNextAddress',
            service: Client.Wallet,
            args: [walletId, false]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.address;
        },
        providesTags: function providesTags(result, _error, _ref31) {
          var walletId = _ref31.walletId;
          return result ? [{
            type: 'Address',
            id: walletId
          }] : [];
        }
      }),
      getNextAddress: build.mutation({
        query: function query(_ref32) {
          var walletId = _ref32.walletId,
              newAddress = _ref32.newAddress;
          return {
            command: 'getNextAddress',
            service: Client.Wallet,
            args: [walletId, newAddress]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.address;
        },
        invalidatesTags: function invalidatesTags(result, _error, _ref33) {
          var walletId = _ref33.walletId;
          return result ? [{
            type: 'Address',
            id: walletId
          }] : [];
        }
      }),
      farmBlock: build.mutation({
        query: function query(_ref34) {
          var address = _ref34.address;
          return {
            command: 'farmBlock',
            service: Client.Wallet,
            args: [address]
          };
        }
      }),
      getHeightInfo: build.query({
        query: function query() {
          return {
            command: 'getHeightInfo',
            service: Client.Wallet
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.height;
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onSyncChanged',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getHeightInfo;
          }
        }, {
          command: 'onNewBlock',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getHeightInfo;
          }
        }])
      }),
      getCurrentDerivationIndex: build.query({
        query: function query() {
          return {
            command: 'getCurrentDerivationIndex',
            service: Client.Wallet
          };
        },
        providesTags: function providesTags(result) {
          return result ? [{
            type: 'DerivationIndex'
          }] : [];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onNewDerivationIndex',
          service: Client.Wallet,
          onUpdate: function onUpdate(draft, data) {
            var _data$additionalData;

            draft.index = data === null || data === void 0 ? void 0 : (_data$additionalData = data.additionalData) === null || _data$additionalData === void 0 ? void 0 : _data$additionalData.index;
          }
        }])
      }),
      extendDerivationIndex: build.mutation({
        query: function query(_ref35) {
          var index = _ref35.index;
          return {
            command: 'extendDerivationIndex',
            service: Client.Wallet,
            args: [index]
          };
        },
        invalidatesTags: [{
          type: 'DerivationIndex'
        }]
      }),
      getNetworkInfo: build.query({
        query: function query() {
          return {
            command: 'getNetworkInfo',
            service: Client.Wallet
          };
        }
      }),
      getSyncStatus: build.query({
        query: function query() {
          return {
            command: 'getSyncStatus',
            service: Client.Wallet
          };
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onSyncChanged',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getSyncStatus;
          }
        }, {
          command: 'onNewBlock',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getSyncStatus;
          }
        }])
      }),
      getWalletConnections: build.query({
        query: function query() {
          return {
            command: 'getConnections',
            service: Client.Wallet
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.connections;
        },
        providesTags: function providesTags(connections) {
          return connections ? [].concat(_toConsumableArray__default["default"](connections.map(function (_ref36) {
            var nodeId = _ref36.nodeId;
            return {
              type: 'WalletConnections',
              id: nodeId
            };
          })), [{
            type: 'WalletConnections',
            id: 'LIST'
          }]) : [{
            type: 'WalletConnections',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onConnections',
          service: Client.Wallet,
          onUpdate: function onUpdate(draft, data) {
            // empty base array
            draft.splice(0); // assign new items

            Object.assign(draft, data.connections);
          }
        }])
      }),
      openWalletConnection: build.mutation({
        query: function query(_ref37) {
          var host = _ref37.host,
              port = _ref37.port;
          return {
            command: 'openConnection',
            service: Client.Wallet,
            args: [host, port]
          };
        },
        invalidatesTags: [{
          type: 'WalletConnections',
          id: 'LIST'
        }]
      }),
      closeWalletConnection: build.mutation({
        query: function query(_ref38) {
          var nodeId = _ref38.nodeId;
          return {
            command: 'closeConnection',
            service: Client.Wallet,
            args: [nodeId]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref39) {
          var nodeId = _ref39.nodeId;
          return [{
            type: 'WalletConnections',
            id: 'LIST'
          }, {
            type: 'WalletConnections',
            id: nodeId
          }];
        }
      }),
      createBackup: build.mutation({
        query: function query(_ref40) {
          var filePath = _ref40.filePath;
          return {
            command: 'createBackup',
            service: Client.Wallet,
            args: [filePath]
          };
        }
      }),
      // Offers
      getAllOffers: build.query({
        query: function query(_ref41) {
          var start = _ref41.start,
              end = _ref41.end,
              sortKey = _ref41.sortKey,
              reverse = _ref41.reverse,
              includeMyOffers = _ref41.includeMyOffers,
              includeTakenOffers = _ref41.includeTakenOffers;
          return {
            command: 'getAllOffers',
            service: Client.Wallet,
            args: [start, end, sortKey, reverse, includeMyOffers, includeTakenOffers]
          };
        },
        transformResponse: function transformResponse(response) {
          if (!(response !== null && response !== void 0 && response.offers)) {
            return response === null || response === void 0 ? void 0 : response.tradeRecords;
          }

          return response === null || response === void 0 ? void 0 : response.tradeRecords.map(function (tradeRecord, index) {
            var _response$offers;

            return _objectSpread$2(_objectSpread$2({}, tradeRecord), {}, {
              _offerData: response === null || response === void 0 ? void 0 : (_response$offers = response.offers) === null || _response$offers === void 0 ? void 0 : _response$offers[index]
            });
          });
        },
        providesTags: function providesTags(result) {
          return result ? [].concat(_toConsumableArray__default["default"](result.map(function (_ref42) {
            var tradeId = _ref42.tradeId;
            return {
              type: 'OfferTradeRecord',
              id: tradeId
            };
          })), [{
            type: 'OfferTradeRecord',
            id: 'LIST'
          }]) : [{
            type: 'OfferTradeRecord',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onCoinAdded',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getAllOffers;
          }
        }, {
          command: 'onCoinRemoved',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getAllOffers;
          }
        }, {
          command: 'onPendingTransaction',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getAllOffers;
          }
        }])
      }),
      getOffersCount: build.query({
        query: function query() {
          return {
            command: 'getOffersCount',
            service: Client.Wallet
          };
        },
        providesTags: ['OfferCounts']
      }),
      createOfferForIds: build.mutation({
        query: function query(_ref43) {
          var walletIdsAndAmounts = _ref43.walletIdsAndAmounts,
              feeInMojos = _ref43.feeInMojos,
              driverDict = _ref43.driverDict,
              validateOnly = _ref43.validateOnly,
              disableJSONFormatting = _ref43.disableJSONFormatting;
          return {
            command: 'createOfferForIds',
            service: Client.Wallet,
            args: [walletIdsAndAmounts, feeInMojos, driverDict, validateOnly, disableJSONFormatting]
          };
        },
        invalidatesTags: [{
          type: 'OfferTradeRecord',
          id: 'LIST'
        }, 'OfferCounts']
      }),
      cancelOffer: build.mutation({
        query: function query(_ref44) {
          var tradeId = _ref44.tradeId,
              secure = _ref44.secure,
              fee = _ref44.fee;
          return {
            command: 'cancelOffer',
            service: Client.Wallet,
            args: [tradeId, secure, fee]
          };
        },
        invalidatesTags: function invalidatesTags(result, error, _ref45) {
          var tradeId = _ref45.tradeId;
          return [{
            type: 'OfferTradeRecord',
            id: tradeId
          }];
        }
      }),
      checkOfferValidity: build.mutation({
        query: function query(offerData) {
          return {
            command: 'checkOfferValidity',
            service: Client.Wallet,
            args: [offerData]
          };
        }
      }),
      takeOffer: build.mutation({
        query: function query(_ref46) {
          var offer = _ref46.offer,
              fee = _ref46.fee;
          return {
            command: 'takeOffer',
            service: Client.Wallet,
            args: [offer, fee]
          };
        },
        invalidatesTags: [{
          type: 'OfferTradeRecord',
          id: 'LIST'
        }, 'OfferCounts']
      }),
      getOfferSummary: build.mutation({
        query: function query(offerData) {
          return {
            command: 'getOfferSummary',
            service: Client.Wallet,
            args: [offerData]
          };
        }
      }),
      getOfferData: build.mutation({
        query: function query(offerId) {
          return {
            command: 'getOfferData',
            service: Client.Wallet,
            args: [offerId]
          };
        }
      }),
      getOfferRecord: build.mutation({
        query: function query(offerId) {
          return {
            command: 'getOfferRecord',
            service: Client.Wallet,
            args: [offerId]
          };
        }
      }),
      // Pool
      createNewPoolWallet: build.mutation({
        query: function query(_ref47) {
          var initialTargetState = _ref47.initialTargetState,
              fee = _ref47.fee,
              host = _ref47.host;
          return {
            command: 'createNewWallet',
            service: Client.Pool,
            args: [initialTargetState, fee, host]
          };
        },
        invalidatesTags: [{
          type: 'Wallets',
          id: 'LIST'
        }, {
          type: 'Transactions',
          id: 'LIST'
        }]
      }),
      // CAT
      createNewCATWallet: build.mutation({
        query: function query(_ref48) {
          var amount = _ref48.amount,
              fee = _ref48.fee,
              host = _ref48.host;
          return {
            command: 'createNewWallet',
            service: Client.CAT,
            args: [amount, fee, host]
          };
        },
        invalidatesTags: [{
          type: 'Wallets',
          id: 'LIST'
        }, {
          type: 'Transactions',
          id: 'LIST'
        }]
      }),
      createCATWalletForExisting: build.mutation({
        query: function query(_ref49) {
          var assetId = _ref49.assetId,
              fee = _ref49.fee,
              host = _ref49.host;
          return {
            command: 'createWalletForExisting',
            service: Client.CAT,
            args: [assetId, fee, host]
          };
        },
        invalidatesTags: [{
          type: 'Wallets',
          id: 'LIST'
        }, {
          type: 'Transactions',
          id: 'LIST'
        }]
      }),
      getCATAssetId: build.query({
        query: function query(_ref50) {
          var walletId = _ref50.walletId;
          return {
            command: 'getAssetId',
            service: Client.CAT,
            args: [walletId]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.assetId;
        }
      }),
      getCatList: build.query({
        query: function query() {
          return {
            command: 'getCatList',
            service: Client.CAT
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.catList;
        }
      }),
      getCATName: build.query({
        query: function query(_ref51) {
          var walletId = _ref51.walletId;
          return {
            command: 'getName',
            service: Client.CAT,
            args: [walletId]
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.name;
        }
      }),
      setCATName: build.mutation({
        query: function query(_ref52) {
          var walletId = _ref52.walletId,
              name = _ref52.name;
          return {
            command: 'setName',
            service: Client.CAT,
            args: [walletId, name]
          };
        },
        invalidatesTags: [{
          type: 'Wallets',
          id: 'LIST'
        }]
      }),
      getStrayCats: build.query({
        query: function query() {
          return {
            command: 'getStrayCats',
            service: Client.CAT
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.strayCats;
        }
      }),
      spendCAT: build.mutation({
        queryFn: function queryFn(args, queryApi, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee6() {
            var subscribeResponse, unsubscribe, _walletId3, address, amount, fee, memos, waitForConfirmation;

            return _regeneratorRuntime__default["default"].wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    unsubscribe = function _unsubscribe2() {
                      if (subscribeResponse) {
                        // console.log('Unsubscribing from tx_updates');
                        subscribeResponse.data();
                        subscribeResponse = undefined;
                      }
                    };

                    _context6.prev = 1;
                    _walletId3 = args.walletId, address = args.address, amount = args.amount, fee = args.fee, memos = args.memos, waitForConfirmation = args.waitForConfirmation;
                    _context6.next = 5;
                    return new Promise( /*#__PURE__*/function () {
                      var _ref53 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee5(resolve, reject) {
                        var updatedTransactions, transactionName, processUpdates, _yield$fetchWithBQ5, sendTransactionData, error, transaction;

                        return _regeneratorRuntime__default["default"].wrap(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                processUpdates = function _processUpdates2() {
                                  if (!transactionName) {
                                    console.log("Transaction name is not defined", updatedTransactions);
                                    return;
                                  }

                                  var transaction = updatedTransactions.find(function (trx) {
                                    var _trx$sentTo2;

                                    return trx.name === transactionName && !!(trx !== null && trx !== void 0 && (_trx$sentTo2 = trx.sentTo) !== null && _trx$sentTo2 !== void 0 && _trx$sentTo2.length);
                                  });

                                  if (transaction) {
                                    // console.log('we found transaction with all data hurai');
                                    resolve({
                                      transaction: transaction,
                                      transactionId: transaction.name
                                    });
                                  }
                                };

                                updatedTransactions = [];

                                if (!waitForConfirmation) {
                                  _context5.next = 6;
                                  break;
                                }

                                _context5.next = 5;
                                return baseQuery({
                                  command: 'onTransactionUpdate',
                                  service: Client.Wallet,
                                  args: [function (data) {
                                    var transaction = data.additionalData.transaction; // console.log('update received');

                                    // console.log('update received');
                                    updatedTransactions.push(transaction);
                                    processUpdates();
                                  }]
                                }, queryApi, {});

                              case 5:
                                subscribeResponse = _context5.sent;

                              case 6:
                                _context5.next = 8;
                                return fetchWithBQ({
                                  command: 'spend',
                                  service: Client.CAT,
                                  args: [_walletId3, address, amount, fee, memos]
                                });

                              case 8:
                                _yield$fetchWithBQ5 = _context5.sent;
                                sendTransactionData = _yield$fetchWithBQ5.data;
                                error = _yield$fetchWithBQ5.error;
                                _objectWithoutProperties__default["default"](_yield$fetchWithBQ5, _excluded2);

                                if (!error) {
                                  _context5.next = 15;
                                  break;
                                }

                                reject(error);
                                return _context5.abrupt("return");

                              case 15:
                                if (waitForConfirmation) {
                                  _context5.next = 18;
                                  break;
                                }

                                resolve(sendTransactionData);
                                return _context5.abrupt("return");

                              case 18:
                                transaction = sendTransactionData.transaction;

                                if (!transaction) {
                                  reject(new Error('Transaction is not present in response'));
                                }

                                transactionName = transaction.name;
                                updatedTransactions.push(transaction);
                                processUpdates();

                              case 23:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, _callee5);
                      }));

                      return function (_x4, _x5) {
                        return _ref53.apply(this, arguments);
                      };
                    }());

                  case 5:
                    _context6.t0 = _context6.sent;
                    return _context6.abrupt("return", {
                      data: _context6.t0
                    });

                  case 9:
                    _context6.prev = 9;
                    _context6.t1 = _context6["catch"](1);
                    console.log('something went wrong', _context6.t1);
                    return _context6.abrupt("return", {
                      error: _context6.t1
                    });

                  case 13:
                    _context6.prev = 13;
                    console.log('unsubscribing');
                    unsubscribe();
                    return _context6.finish(13);

                  case 17:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, null, [[1, 9, 13, 17]]);
          }))();
        },
        invalidatesTags: [{
          type: 'Transactions',
          id: 'LIST'
        }]
      }),
      addCATToken: build.mutation({
        queryFn: function queryFn(_ref54, _queryApi, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee7() {
            var assetId, name, fee, host, _yield$fetchWithBQ6, data, error, _walletId4;

            return _regeneratorRuntime__default["default"].wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    assetId = _ref54.assetId, name = _ref54.name, fee = _ref54.fee, host = _ref54.host;
                    _context7.prev = 1;
                    _context7.next = 4;
                    return fetchWithBQ({
                      command: 'createWalletForExisting',
                      service: Client.CAT,
                      args: [assetId, fee, host]
                    });

                  case 4:
                    _yield$fetchWithBQ6 = _context7.sent;
                    data = _yield$fetchWithBQ6.data;
                    error = _yield$fetchWithBQ6.error;

                    if (!error) {
                      _context7.next = 9;
                      break;
                    }

                    throw error;

                  case 9:
                    _walletId4 = data === null || data === void 0 ? void 0 : data.walletId;

                    if (_walletId4) {
                      _context7.next = 12;
                      break;
                    }

                    throw new Error('Wallet id is not defined');

                  case 12:
                    _context7.next = 14;
                    return fetchWithBQ({
                      command: 'setName',
                      service: Client.CAT,
                      args: [_walletId4, name]
                    });

                  case 14:
                    return _context7.abrupt("return", {
                      data: _walletId4
                    });

                  case 17:
                    _context7.prev = 17;
                    _context7.t0 = _context7["catch"](1);
                    return _context7.abrupt("return", {
                      error: _context7.t0
                    });

                  case 20:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, null, [[1, 17]]);
          }))();
        },
        invalidatesTags: [{
          type: 'Wallets',
          id: 'LIST'
        }, {
          type: 'Transactions',
          id: 'LIST'
        }]
      }),
      // PlotNFTs
      getPlotNFTs: build.query({
        queryFn: function queryFn(_args, _ref55, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee12() {
            var signal, _wallets$filter, _yield$Promise$all, _yield$Promise$all2, wallets, poolStates, poolWallets, _yield$Promise$all3, _yield$Promise$all4, poolWalletStates, walletBalances, nfts, external;

            return _regeneratorRuntime__default["default"].wrap(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    signal = _ref55.signal;
                    _context12.prev = 1;
                    _context12.next = 4;
                    return Promise.all([_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee8() {
                      var _yield$fetchWithBQ7, data, error, wallets;

                      return _regeneratorRuntime__default["default"].wrap(function _callee8$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              _context8.next = 2;
                              return fetchWithBQ({
                                command: 'getWallets',
                                service: Client.Wallet
                              });

                            case 2:
                              _yield$fetchWithBQ7 = _context8.sent;
                              data = _yield$fetchWithBQ7.data;
                              error = _yield$fetchWithBQ7.error;

                              if (!error) {
                                _context8.next = 7;
                                break;
                              }

                              throw error;

                            case 7:
                              wallets = data === null || data === void 0 ? void 0 : data.wallets;

                              if (wallets) {
                                _context8.next = 10;
                                break;
                              }

                              throw new Error('List of the wallets is not defined');

                            case 10:
                              return _context8.abrupt("return", wallets);

                            case 11:
                            case "end":
                              return _context8.stop();
                          }
                        }
                      }, _callee8);
                    }))(), _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee9() {
                      var _yield$fetchWithBQ8, data, error, poolState;

                      return _regeneratorRuntime__default["default"].wrap(function _callee9$(_context9) {
                        while (1) {
                          switch (_context9.prev = _context9.next) {
                            case 0:
                              _context9.next = 2;
                              return fetchWithBQ({
                                command: 'getPoolState',
                                service: Client.Farmer
                              });

                            case 2:
                              _yield$fetchWithBQ8 = _context9.sent;
                              data = _yield$fetchWithBQ8.data;
                              error = _yield$fetchWithBQ8.error;

                              if (!error) {
                                _context9.next = 7;
                                break;
                              }

                              throw error;

                            case 7:
                              poolState = data === null || data === void 0 ? void 0 : data.poolState;

                              if (poolState) {
                                _context9.next = 10;
                                break;
                              }

                              throw new Error('Pool state is not defined');

                            case 10:
                              return _context9.abrupt("return", poolState);

                            case 11:
                            case "end":
                              return _context9.stop();
                          }
                        }
                      }, _callee9);
                    }))()]);

                  case 4:
                    _yield$Promise$all = _context12.sent;
                    _yield$Promise$all2 = _slicedToArray__default["default"](_yield$Promise$all, 2);
                    wallets = _yield$Promise$all2[0];
                    poolStates = _yield$Promise$all2[1];

                    if (!signal.aborted) {
                      _context12.next = 10;
                      break;
                    }

                    throw new Error('Query was aborted');

                  case 10:
                    // filter pool wallets
                    poolWallets = (_wallets$filter = wallets === null || wallets === void 0 ? void 0 : wallets.filter(function (wallet) {
                      return wallet.type === Client.WalletType.POOLING_WALLET;
                    })) !== null && _wallets$filter !== void 0 ? _wallets$filter : [];
                    _context12.t0 = Promise;
                    _context12.next = 14;
                    return Promise.all(poolWallets.map( /*#__PURE__*/function () {
                      var _ref58 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee10(wallet) {
                        var _yield$fetchWithBQ9, data, error;

                        return _regeneratorRuntime__default["default"].wrap(function _callee10$(_context10) {
                          while (1) {
                            switch (_context10.prev = _context10.next) {
                              case 0:
                                _context10.next = 2;
                                return fetchWithBQ({
                                  command: 'getPwStatus',
                                  service: Client.Wallet,
                                  args: [wallet.id]
                                });

                              case 2:
                                _yield$fetchWithBQ9 = _context10.sent;
                                data = _yield$fetchWithBQ9.data;
                                error = _yield$fetchWithBQ9.error;

                                if (!error) {
                                  _context10.next = 7;
                                  break;
                                }

                                throw error;

                              case 7:
                                return _context10.abrupt("return", _objectSpread$2(_objectSpread$2({}, data === null || data === void 0 ? void 0 : data.state), {}, {
                                  walletId: wallet.id
                                }));

                              case 8:
                              case "end":
                                return _context10.stop();
                            }
                          }
                        }, _callee10);
                      }));

                      return function (_x6) {
                        return _ref58.apply(this, arguments);
                      };
                    }()));

                  case 14:
                    _context12.t1 = _context12.sent;
                    _context12.next = 17;
                    return Promise.all(poolWallets.map( /*#__PURE__*/function () {
                      var _ref59 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee11(wallet) {
                        var _yield$fetchWithBQ10, data, error;

                        return _regeneratorRuntime__default["default"].wrap(function _callee11$(_context11) {
                          while (1) {
                            switch (_context11.prev = _context11.next) {
                              case 0:
                                _context11.next = 2;
                                return fetchWithBQ({
                                  command: 'getWalletBalance',
                                  service: Client.Wallet,
                                  args: [wallet.id]
                                });

                              case 2:
                                _yield$fetchWithBQ10 = _context11.sent;
                                data = _yield$fetchWithBQ10.data;
                                error = _yield$fetchWithBQ10.error;

                                if (!error) {
                                  _context11.next = 7;
                                  break;
                                }

                                throw error;

                              case 7:
                                return _context11.abrupt("return", data === null || data === void 0 ? void 0 : data.walletBalance);

                              case 8:
                              case "end":
                                return _context11.stop();
                            }
                          }
                        }, _callee11);
                      }));

                      return function (_x7) {
                        return _ref59.apply(this, arguments);
                      };
                    }()));

                  case 17:
                    _context12.t2 = _context12.sent;
                    _context12.t3 = [_context12.t1, _context12.t2];
                    _context12.next = 21;
                    return _context12.t0.all.call(_context12.t0, _context12.t3);

                  case 21:
                    _yield$Promise$all3 = _context12.sent;
                    _yield$Promise$all4 = _slicedToArray__default["default"](_yield$Promise$all3, 2);
                    poolWalletStates = _yield$Promise$all4[0];
                    walletBalances = _yield$Promise$all4[1];

                    if (!signal.aborted) {
                      _context12.next = 27;
                      break;
                    }

                    throw new Error('Query was aborted');

                  case 27:
                    // combine poolState and poolWalletState
                    nfts = [];
                    external = [];
                    poolStates.forEach(function (poolStateItem) {
                      var poolWalletStatus = poolWalletStates.find(function (item) {
                        return item.launcherId === poolStateItem.poolConfig.launcherId;
                      });

                      if (!poolWalletStatus) {
                        external.push({
                          poolState: normalizePoolState(poolStateItem)
                        });
                        return;
                      }

                      var walletBalance = walletBalances.find(function (item) {
                        return (item === null || item === void 0 ? void 0 : item.walletId) === poolWalletStatus.walletId;
                      });

                      if (!walletBalance) {
                        external.push({
                          poolState: normalizePoolState(poolStateItem)
                        });
                        return;
                      }

                      nfts.push({
                        poolState: normalizePoolState(poolStateItem),
                        poolWalletStatus: poolWalletStatus,
                        walletBalance: walletBalance
                      });
                    });
                    return _context12.abrupt("return", {
                      data: {
                        nfts: nfts,
                        external: external
                      }
                    });

                  case 33:
                    _context12.prev = 33;
                    _context12.t4 = _context12["catch"](1);
                    return _context12.abrupt("return", {
                      error: _context12.t4
                    });

                  case 36:
                  case "end":
                    return _context12.stop();
                }
              }
            }, _callee12, null, [[1, 33]]);
          }))();
        },
        providesTags: [{
          type: 'PlotNFT',
          id: 'LIST'
        }]
      }),
      // DID
      createNewDIDWallet: build.mutation({
        query: function query(_ref60) {
          var amount = _ref60.amount,
              fee = _ref60.fee,
              backupDids = _ref60.backupDids,
              numOfBackupIdsNeeded = _ref60.numOfBackupIdsNeeded,
              host = _ref60.host;
          return {
            command: 'createNewWallet',
            service: Client.DID,
            args: [amount, fee, backupDids, numOfBackupIdsNeeded, host]
          };
        },
        invalidatesTags: [{
          type: 'Wallets',
          id: 'LIST'
        }, {
          type: 'DIDWallet',
          id: 'LIST'
        }, {
          type: 'Transactions',
          id: 'LIST'
        }]
      }),
      getDIDName: build.query({
        query: function query(_ref61) {
          var walletId = _ref61.walletId;
          return {
            command: 'getDidName',
            service: Client.DID,
            args: [walletId]
          };
        },
        providesTags: function providesTags(result, _error, _ref62) {
          var walletId = _ref62.walletId;
          return result ? [{
            type: 'DIDName',
            id: walletId
          }] : [];
        }
      }),
      setDIDName: build.mutation({
        query: function query(_ref63) {
          var walletId = _ref63.walletId,
              name = _ref63.name;
          return {
            command: 'setDIDName',
            service: Client.DID,
            args: [walletId, name]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref64) {
          var walletId = _ref64.walletId;
          return [{
            type: 'Wallets',
            id: walletId
          }, {
            type: 'DIDWallet',
            id: walletId
          }, {
            type: 'DIDName',
            id: walletId
          }];
        }
      }),
      updateDIDRecoveryIds: build.mutation({
        query: function query(_ref65) {
          var walletId = _ref65.walletId,
              newList = _ref65.newList,
              numVerificationsRequired = _ref65.numVerificationsRequired;
          return {
            command: 'updateRecoveryIds',
            service: Client.DID,
            args: [walletId, newList, numVerificationsRequired]
          };
        },
        invalidatesTags: function invalidatesTags(_result, _error, _ref66) {
          var walletId = _ref66.walletId;
          return [{
            type: 'Wallets',
            id: walletId
          }, {
            type: 'DIDRecoveryList',
            id: walletId
          }];
        }
      }),
      getDIDPubKey: build.query({
        query: function query(_ref67) {
          var walletId = _ref67.walletId;
          return {
            command: 'getPubKey',
            service: Client.DID,
            args: [walletId]
          };
        },
        providesTags: function providesTags(result, _error, _ref68) {
          var walletId = _ref68.walletId;
          return result ? [{
            type: 'DIDPubKey',
            id: walletId
          }] : [];
        }
      }),
      getDID: build.query({
        query: function query(_ref69) {
          var walletId = _ref69.walletId;
          return {
            command: 'getDid',
            service: Client.DID,
            args: [walletId]
          };
        },
        providesTags: function providesTags(result, _error, _ref70) {
          var walletId = _ref70.walletId;
          return result ? [{
            type: 'DID',
            id: walletId
          }] : [];
        }
      }),
      getDIDs: build.query({
        queryFn: function queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee14() {
            var _yield$fetchWithBQ11, data, error, wallets, didWallets;

            return _regeneratorRuntime__default["default"].wrap(function _callee14$(_context14) {
              while (1) {
                switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.prev = 0;
                    _context14.next = 3;
                    return fetchWithBQ({
                      command: 'getWallets',
                      service: Client.Wallet
                    });

                  case 3:
                    _yield$fetchWithBQ11 = _context14.sent;
                    data = _yield$fetchWithBQ11.data;
                    error = _yield$fetchWithBQ11.error;

                    if (!error) {
                      _context14.next = 8;
                      break;
                    }

                    throw error;

                  case 8:
                    wallets = data === null || data === void 0 ? void 0 : data.wallets;

                    if (wallets) {
                      _context14.next = 11;
                      break;
                    }

                    throw new Error('Wallets are not defined');

                  case 11:
                    didWallets = wallets.filter(function (wallet) {
                      return wallet.type === Client.WalletType.DECENTRALIZED_ID;
                    });
                    _context14.next = 14;
                    return Promise.all(didWallets.map( /*#__PURE__*/function () {
                      var _ref71 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee13(wallet) {
                        var _yield$fetchWithBQ12, data, error, myDid;

                        return _regeneratorRuntime__default["default"].wrap(function _callee13$(_context13) {
                          while (1) {
                            switch (_context13.prev = _context13.next) {
                              case 0:
                                _context13.next = 2;
                                return fetchWithBQ({
                                  command: 'getDid',
                                  service: Client.DID,
                                  args: [wallet.id]
                                });

                              case 2:
                                _yield$fetchWithBQ12 = _context13.sent;
                                data = _yield$fetchWithBQ12.data;
                                error = _yield$fetchWithBQ12.error;

                                if (!error) {
                                  _context13.next = 7;
                                  break;
                                }

                                throw error;

                              case 7:
                                myDid = data.myDid;
                                return _context13.abrupt("return", _objectSpread$2(_objectSpread$2({}, wallet), {}, {
                                  myDid: myDid
                                }));

                              case 9:
                              case "end":
                                return _context13.stop();
                            }
                          }
                        }, _callee13);
                      }));

                      return function (_x8) {
                        return _ref71.apply(this, arguments);
                      };
                    }()));

                  case 14:
                    _context14.t0 = _context14.sent;
                    return _context14.abrupt("return", {
                      data: _context14.t0
                    });

                  case 18:
                    _context14.prev = 18;
                    _context14.t1 = _context14["catch"](0);
                    return _context14.abrupt("return", {
                      error: _context14.t1
                    });

                  case 21:
                  case "end":
                    return _context14.stop();
                }
              }
            }, _callee14, null, [[0, 18]]);
          }))();
        },
        providesTags: function providesTags(result) {
          return result ? [].concat(_toConsumableArray__default["default"](result.map(function (_ref72) {
            var id = _ref72.id;
            return {
              type: 'DIDWallet',
              id: id
            };
          })), [{
            type: 'DIDWallet',
            id: 'LIST'
          }]) : [{
            type: 'DIDWallet',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onWalletCreated',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getWallets;
          }
        }])
      }),
      // spendDIDRecovery: did_recovery_spend needs an RPC change (attest_filenames -> attest_file_contents)
      getDIDRecoveryList: build.query({
        query: function query(_ref73) {
          var walletId = _ref73.walletId;
          return {
            command: 'getRecoveryList',
            service: Client.DID,
            args: [walletId]
          };
        },
        providesTags: function providesTags(result, _error, _ref74) {
          var walletId = _ref74.walletId;
          return result ? [{
            type: 'DIDRecoveryList',
            id: walletId
          }] : [];
        }
      }),
      // createDIDAttest: did_create_attest needs an RPC change (remove filename param, return file contents)
      getDIDInformationNeededForRecovery: build.query({
        query: function query(_ref75) {
          var walletId = _ref75.walletId;
          return {
            command: 'getInformationNeededForRecovery',
            service: Client.DID,
            args: [walletId]
          };
        },
        providesTags: function providesTags(result, _error, _ref76) {
          var walletId = _ref76.walletId;
          return result ? [{
            type: 'DIDRecoveryInfo',
            id: walletId
          }] : [];
        }
      }),
      getDIDCurrentCoinInfo: build.query({
        query: function query(_ref77) {
          var walletId = _ref77.walletId;
          return {
            command: 'getCurrentCoinInfo',
            service: Client.DID,
            args: [walletId]
          };
        },
        providesTags: function providesTags(result, _error, _ref78) {
          var walletId = _ref78.walletId;
          return result ? [{
            type: 'DIDCoinInfo',
            id: walletId
          }] : [];
        }
      }),
      // createDIDBackup: did_create_backup_file needs an RPC change (remove filename param, return file contents)
      // NFTs
      getNFTs: build.query({
        queryFn: function queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee16() {
            var nftData, nftsByWalletId;
            return _regeneratorRuntime__default["default"].wrap(function _callee16$(_context16) {
              while (1) {
                switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.prev = 0;
                    _context16.next = 3;
                    return Promise.all(args.walletIds.map( /*#__PURE__*/function () {
                      var _ref79 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee15(walletId) {
                        var _yield$fetchWithBQ13, nftsData, nftsError, updatedNFTs;

                        return _regeneratorRuntime__default["default"].wrap(function _callee15$(_context15) {
                          while (1) {
                            switch (_context15.prev = _context15.next) {
                              case 0:
                                _context15.next = 2;
                                return fetchWithBQ({
                                  command: 'getNfts',
                                  service: Client.NFT,
                                  args: [walletId]
                                });

                              case 2:
                                _yield$fetchWithBQ13 = _context15.sent;
                                nftsData = _yield$fetchWithBQ13.data;
                                nftsError = _yield$fetchWithBQ13.error;

                                if (!nftsError) {
                                  _context15.next = 7;
                                  break;
                                }

                                throw nftsError;

                              case 7:
                                // Add bech32m-encoded NFT identifier
                                updatedNFTs = nftsData.nftList.map(function (nft) {
                                  return _objectSpread$2(_objectSpread$2({}, nft), {}, {
                                    walletId: walletId,
                                    $nftId: Client.toBech32m(nft.launcherId, 'nft')
                                  });
                                });
                                return _context15.abrupt("return", _defineProperty__default["default"]({}, walletId, updatedNFTs));

                              case 9:
                              case "end":
                                return _context15.stop();
                            }
                          }
                        }, _callee15);
                      }));

                      return function (_x9) {
                        return _ref79.apply(this, arguments);
                      };
                    }()));

                  case 3:
                    nftData = _context16.sent;
                    nftsByWalletId = {};
                    nftData.forEach(function (entry) {
                      Object.entries(entry).forEach(function (_ref81) {
                        var _ref82 = _slicedToArray__default["default"](_ref81, 2),
                            walletId = _ref82[0],
                            nfts = _ref82[1];

                        nftsByWalletId[walletId] = nfts;
                      });
                    });
                    return _context16.abrupt("return", {
                      data: nftsByWalletId
                    });

                  case 9:
                    _context16.prev = 9;
                    _context16.t0 = _context16["catch"](0);
                    return _context16.abrupt("return", {
                      error: _context16.t0
                    });

                  case 12:
                  case "end":
                    return _context16.stop();
                }
              }
            }, _callee16, null, [[0, 9]]);
          }))();
        },
        providesTags: function providesTags(nftsByWalletId, _error) {
          return nftsByWalletId ? [].concat(_toConsumableArray__default["default"](Object.entries(nftsByWalletId).flatMap(function (_ref83) {
            var _ref84 = _slicedToArray__default["default"](_ref83, 2);
                _ref84[0];
                var nfts = _ref84[1];

            return nfts.map(function (nft) {
              return {
                type: 'NFTInfo',
                id: nft.launcherId
              };
            });
          })), [{
            type: 'NFTInfo',
            id: 'LIST'
          }]) : [{
            type: 'NFTInfo',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onNFTCoinAdded',
          service: Client.NFT,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getNFTs;
          }
        }, {
          command: 'onNFTCoinRemoved',
          service: Client.NFT,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getNFTs;
          }
        }, {
          command: 'onNFTCoinTransferred',
          service: Client.NFT,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getNFTs;
          }
        }])
      }),
      getNFTWalletsWithDIDs: build.query({
        query: function query() {
          return {
            command: 'getNftWalletsWithDids',
            service: Client.NFT,
            args: []
          };
        },
        transformResponse: function transformResponse(response) {
          return response === null || response === void 0 ? void 0 : response.nftWallets;
        },
        providesTags: function providesTags(result, _error) {
          return result ? [].concat(_toConsumableArray__default["default"](result.map(function (_ref85) {
            var walletId = _ref85.walletId;
            return {
              NFTWalletWithDID: walletId
            };
          })), [{
            NFTWalletWithDID: 'LIST'
          }]) : [{
            type: 'NFTWalletWithDID',
            id: 'LIST'
          }];
        },
        onCacheEntryAdded: onCacheEntryAddedInvalidate(baseQuery, [{
          command: 'onWalletCreated',
          service: Client.Wallet,
          endpoint: function endpoint() {
            return walletApi$1.endpoints.getNFTWalletsWithDIDs;
          }
        }])
      }),
      getNFTInfo: build.query({
        queryFn: function queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee17() {
            var coinId, _yield$fetchWithBQ14, nftData, nftError, updatedNFT;

            return _regeneratorRuntime__default["default"].wrap(function _callee17$(_context17) {
              while (1) {
                switch (_context17.prev = _context17.next) {
                  case 0:
                    _context17.prev = 0;
                    // Slice off the '0x' prefix, if present
                    coinId = args.coinId.toLowerCase().startsWith('0x') ? args.coinId.slice(2) : args.coinId;

                    if (!(coinId.length !== 64)) {
                      _context17.next = 4;
                      break;
                    }

                    throw new Error('Invalid coinId');

                  case 4:
                    _context17.next = 6;
                    return fetchWithBQ({
                      command: 'getNftInfo',
                      service: Client.NFT,
                      args: [coinId]
                    });

                  case 6:
                    _yield$fetchWithBQ14 = _context17.sent;
                    nftData = _yield$fetchWithBQ14.data;
                    nftError = _yield$fetchWithBQ14.error;

                    if (!nftError) {
                      _context17.next = 11;
                      break;
                    }

                    throw nftError;

                  case 11:
                    // Add bech32m-encoded NFT identifier
                    updatedNFT = _objectSpread$2(_objectSpread$2({}, nftData.nftInfo), {}, {
                      $nftId: Client.toBech32m(nftData.nftInfo.launcherId, 'nft')
                    });
                    return _context17.abrupt("return", {
                      data: updatedNFT
                    });

                  case 15:
                    _context17.prev = 15;
                    _context17.t0 = _context17["catch"](0);
                    return _context17.abrupt("return", {
                      error: _context17.t0
                    });

                  case 18:
                  case "end":
                    return _context17.stop();
                }
              }
            }, _callee17, null, [[0, 15]]);
          }))();
        },
        providesTags: function providesTags(result, _error) {
          return result ? [{
            type: 'NFTInfo',
            id: result.launcherId
          }] : [];
        }
      }),
      transferNFT: build.mutation({
        query: function query(_ref86) {
          var walletId = _ref86.walletId,
              nftCoinId = _ref86.nftCoinId,
              targetAddress = _ref86.targetAddress,
              fee = _ref86.fee;
          return {
            command: 'transferNft',
            service: Client.NFT,
            args: [walletId, nftCoinId, targetAddress, fee]
          };
        },
        invalidatesTags: function invalidatesTags(result, _error, _ref87) {
          var launcherId = _ref87.launcherId;
          return result ? [{
            type: 'NFTInfo',
            id: launcherId
          }] : [];
        }
      }),
      setNFTDID: build.mutation({
        query: function query(_ref88) {
          var walletId = _ref88.walletId;
              _ref88.nftLauncherId;
              var nftCoinId = _ref88.nftCoinId,
              did = _ref88.did,
              fee = _ref88.fee;
          return {
            command: 'setNftDid',
            service: Client.NFT,
            args: [walletId, nftCoinId, did, fee]
          };
        },
        invalidatesTags: function invalidatesTags(result, _error, _ref89) {
          _ref89.nftLauncherId;
          return result ? [{
            type: 'NFTInfo',
            id: 'LIST'
          }, {
            type: 'NFTWalletWithDID',
            id: 'LIST'
          }, {
            type: 'DIDWallet',
            id: 'LIST'
          }] : [];
        }
      }),
      setNFTStatus: build.mutation({
        query: function query(_ref90) {
          var walletId = _ref90.walletId;
              _ref90.nftLauncherId;
              var nftCoinId = _ref90.nftCoinId,
              inTransaction = _ref90.inTransaction;
          return {
            command: 'setNftStatus',
            service: Client.NFT,
            args: [walletId, nftCoinId, inTransaction]
          };
        },
        invalidatesTags: function invalidatesTags(result, _error, _ref91) {
          _ref91.nftLauncherId;
          return result ? [{
            type: 'NFTInfo',
            id: 'LIST'
          }] : [];
        }
      }),
      receiveNFT: build.mutation({
        query: function query(_ref92) {
          var walletId = _ref92.walletId,
              spendBundle = _ref92.spendBundle,
              fee = _ref92.fee;
          return {
            command: 'receiveNft',
            service: Client.NFT,
            args: [walletId, spendBundle, fee]
          };
        },
        invalidatesTags: function invalidatesTags(result, _error, _ref93) {
          _ref93.walletId;
          return result ? [{
            type: 'NFTInfo',
            id: 'LIST'
          }] : [];
        }
      })
    };
  }
});
var useWalletPingQuery$1 = walletApi$1.useWalletPingQuery,
    useGetLoggedInFingerprintQuery$1 = walletApi$1.useGetLoggedInFingerprintQuery,
    useGetWalletsQuery$1 = walletApi$1.useGetWalletsQuery,
    useGetTransactionQuery$1 = walletApi$1.useGetTransactionQuery,
    useGetPwStatusQuery$1 = walletApi$1.useGetPwStatusQuery,
    usePwAbsorbRewardsMutation$1 = walletApi$1.usePwAbsorbRewardsMutation,
    usePwJoinPoolMutation$1 = walletApi$1.usePwJoinPoolMutation,
    usePwSelfPoolMutation$1 = walletApi$1.usePwSelfPoolMutation,
    useCreateNewWalletMutation$1 = walletApi$1.useCreateNewWalletMutation,
    useDeleteUnconfirmedTransactionsMutation$1 = walletApi$1.useDeleteUnconfirmedTransactionsMutation,
    useGetWalletBalanceQuery$1 = walletApi$1.useGetWalletBalanceQuery,
    useGetFarmedAmountQuery$1 = walletApi$1.useGetFarmedAmountQuery,
    useSendTransactionMutation$1 = walletApi$1.useSendTransactionMutation,
    useGenerateMnemonicMutation$1 = walletApi$1.useGenerateMnemonicMutation,
    useGetPublicKeysQuery$1 = walletApi$1.useGetPublicKeysQuery,
    useAddKeyMutation$1 = walletApi$1.useAddKeyMutation,
    useDeleteKeyMutation$1 = walletApi$1.useDeleteKeyMutation,
    useCheckDeleteKeyMutation$1 = walletApi$1.useCheckDeleteKeyMutation,
    useDeleteAllKeysMutation$1 = walletApi$1.useDeleteAllKeysMutation,
    useLogInMutation$1 = walletApi$1.useLogInMutation,
    useLogInAndSkipImportMutation$1 = walletApi$1.useLogInAndSkipImportMutation,
    useLogInAndImportBackupMutation$1 = walletApi$1.useLogInAndImportBackupMutation,
    useGetBackupInfoQuery$1 = walletApi$1.useGetBackupInfoQuery,
    useGetBackupInfoByFingerprintQuery$1 = walletApi$1.useGetBackupInfoByFingerprintQuery,
    useGetBackupInfoByWordsQuery$1 = walletApi$1.useGetBackupInfoByWordsQuery,
    useGetPrivateKeyQuery$1 = walletApi$1.useGetPrivateKeyQuery,
    useGetTransactionsQuery$1 = walletApi$1.useGetTransactionsQuery,
    useGetTransactionsCountQuery$1 = walletApi$1.useGetTransactionsCountQuery,
    useGetCurrentAddressQuery$1 = walletApi$1.useGetCurrentAddressQuery,
    useGetNextAddressMutation$1 = walletApi$1.useGetNextAddressMutation,
    useFarmBlockMutation$1 = walletApi$1.useFarmBlockMutation,
    useGetHeightInfoQuery$1 = walletApi$1.useGetHeightInfoQuery,
    useGetNetworkInfoQuery$1 = walletApi$1.useGetNetworkInfoQuery,
    useGetSyncStatusQuery$1 = walletApi$1.useGetSyncStatusQuery,
    useGetWalletConnectionsQuery$1 = walletApi$1.useGetWalletConnectionsQuery,
    useOpenWalletConnectionMutation$1 = walletApi$1.useOpenWalletConnectionMutation,
    useCloseWalletConnectionMutation$1 = walletApi$1.useCloseWalletConnectionMutation,
    useCreateBackupMutation$1 = walletApi$1.useCreateBackupMutation,
    useGetAllOffersQuery$1 = walletApi$1.useGetAllOffersQuery,
    useGetOffersCountQuery$1 = walletApi$1.useGetOffersCountQuery,
    useCreateOfferForIdsMutation$1 = walletApi$1.useCreateOfferForIdsMutation,
    useCancelOfferMutation$1 = walletApi$1.useCancelOfferMutation,
    useCheckOfferValidityMutation$1 = walletApi$1.useCheckOfferValidityMutation,
    useTakeOfferMutation$1 = walletApi$1.useTakeOfferMutation,
    useGetOfferSummaryMutation$1 = walletApi$1.useGetOfferSummaryMutation,
    useGetOfferDataMutation$1 = walletApi$1.useGetOfferDataMutation,
    useGetOfferRecordMutation$1 = walletApi$1.useGetOfferRecordMutation,
    useGetCurrentDerivationIndexQuery$1 = walletApi$1.useGetCurrentDerivationIndexQuery,
    useExtendDerivationIndexMutation$1 = walletApi$1.useExtendDerivationIndexMutation,
    useCreateNewPoolWalletMutation$1 = walletApi$1.useCreateNewPoolWalletMutation,
    useCreateNewCATWalletMutation$1 = walletApi$1.useCreateNewCATWalletMutation,
    useCreateCATWalletForExistingMutation$1 = walletApi$1.useCreateCATWalletForExistingMutation,
    useGetCATAssetIdQuery$1 = walletApi$1.useGetCATAssetIdQuery,
    useGetCatListQuery$1 = walletApi$1.useGetCatListQuery,
    useGetCATNameQuery$1 = walletApi$1.useGetCATNameQuery,
    useSetCATNameMutation$1 = walletApi$1.useSetCATNameMutation,
    useSpendCATMutation$1 = walletApi$1.useSpendCATMutation,
    useAddCATTokenMutation$1 = walletApi$1.useAddCATTokenMutation,
    useGetStrayCatsQuery$1 = walletApi$1.useGetStrayCatsQuery,
    useGetPlotNFTsQuery$1 = walletApi$1.useGetPlotNFTsQuery,
    useCreateNewDIDWalletMutation$1 = walletApi$1.useCreateNewDIDWalletMutation,
    useUpdateDIDRecoveryIdsQuery$1 = walletApi$1.useUpdateDIDRecoveryIdsQuery,
    useGetDIDPubKeyQuery$1 = walletApi$1.useGetDIDPubKeyQuery,
    useGetDIDQuery$1 = walletApi$1.useGetDIDQuery,
    useGetDIDsQuery$1 = walletApi$1.useGetDIDsQuery,
    useGetDIDNameQuery$1 = walletApi$1.useGetDIDNameQuery,
    useSetDIDNameMutation$1 = walletApi$1.useSetDIDNameMutation,
    useGetDIDRecoveryListQuery$1 = walletApi$1.useGetDIDRecoveryListQuery,
    useGetDIDInformationNeededForRecoveryQuery$1 = walletApi$1.useGetDIDInformationNeededForRecoveryQuery,
    useGetDIDCurrentCoinInfoQuery$1 = walletApi$1.useGetDIDCurrentCoinInfoQuery,
    useGetNFTsQuery$1 = walletApi$1.useGetNFTsQuery,
    useGetNFTWalletsWithDIDsQuery$1 = walletApi$1.useGetNFTWalletsWithDIDsQuery,
    useGetNFTInfoQuery$1 = walletApi$1.useGetNFTInfoQuery,
    useTransferNFTMutation$1 = walletApi$1.useTransferNFTMutation,
    useSetNFTDIDMutation$1 = walletApi$1.useSetNFTDIDMutation,
    useSetNFTStatusMutation$1 = walletApi$1.useSetNFTStatusMutation,
    useReceiveNFTMutation$1 = walletApi$1.useReceiveNFTMutation;

var clientApi = clientApi$1,
    useCloseMutation = useCloseMutation$1,
    useGetStateQuery = useGetStateQuery$1,
    useClientStartServiceMutation = useClientStartServiceMutation$1; // daemon hooks
var daemonApi = daemonApi$1,
    useDaemonPingQuery = useDaemonPingQuery$1,
    useGetKeyringStatusQuery = useGetKeyringStatusQuery$1,
    useStartServiceMutation = useStartServiceMutation$1,
    useStopServiceMutation = useStopServiceMutation$1,
    useIsServiceRunningQuery = useIsServiceRunningQuery$1,
    useSetKeyringPassphraseMutation = useSetKeyringPassphraseMutation$1,
    useRemoveKeyringPassphraseMutation = useRemoveKeyringPassphraseMutation$1,
    useMigrateKeyringMutation = useMigrateKeyringMutation$1,
    useUnlockKeyringMutation = useUnlockKeyringMutation$1,
    useGetPlottersQuery = useGetPlottersQuery$1,
    useStopPlottingMutation = useStopPlottingMutation$1,
    useStartPlottingMutation = useStartPlottingMutation$1; // farmer hooks
var farmerApi = farmerApi$1,
    useFarmerPingQuery = useFarmerPingQuery$1,
    useGetHarvestersQuery = useGetHarvestersQuery$1,
    useGetHarvestersSummaryQuery = useGetHarvestersSummaryQuery$1,
    useGetHarvesterPlotsValidQuery = useGetHarvesterPlotsValidQuery$1,
    useGetHarvesterPlotsDuplicatesQuery = useGetHarvesterPlotsDuplicatesQuery$1,
    useGetHarvesterPlotsInvalidQuery = useGetHarvesterPlotsInvalidQuery$1,
    useGetHarvesterPlotsKeysMissingQuery = useGetHarvesterPlotsKeysMissingQuery$1,
    useGetRewardTargetsQuery = useGetRewardTargetsQuery$1,
    useSetRewardTargetsMutation = useSetRewardTargetsMutation$1,
    useGetFarmerConnectionsQuery = useGetFarmerConnectionsQuery$1,
    useOpenFarmerConnectionMutation = useOpenFarmerConnectionMutation$1,
    useCloseFarmerConnectionMutation = useCloseFarmerConnectionMutation$1,
    useGetPoolLoginLinkQuery = useGetPoolLoginLinkQuery$1,
    useGetSignagePointsQuery = useGetSignagePointsQuery$1,
    useGetPoolStateQuery = useGetPoolStateQuery$1,
    useSetPayoutInstructionsMutation = useSetPayoutInstructionsMutation$1,
    useGetFarmingInfoQuery = useGetFarmingInfoQuery$1; // full node hooks
var fullNodeApi = fullNodeApi$1,
    useFullNodePingQuery = useFullNodePingQuery$1,
    useGetBlockRecordsQuery = useGetBlockRecordsQuery$1,
    useGetUnfinishedBlockHeadersQuery = useGetUnfinishedBlockHeadersQuery$1,
    useGetBlockchainStateQuery = useGetBlockchainStateQuery$1,
    useGetFullNodeConnectionsQuery = useGetFullNodeConnectionsQuery$1,
    useOpenFullNodeConnectionMutation = useOpenFullNodeConnectionMutation$1,
    useCloseFullNodeConnectionMutation = useCloseFullNodeConnectionMutation$1,
    useGetBlockQuery = useGetBlockQuery$1,
    useGetBlockRecordQuery = useGetBlockRecordQuery$1; // wallet hooks
var walletApi = walletApi$1,
    useWalletPingQuery = useWalletPingQuery$1,
    useGetLoggedInFingerprintQuery = useGetLoggedInFingerprintQuery$1,
    useGetWalletsQuery = useGetWalletsQuery$1,
    useGetTransactionQuery = useGetTransactionQuery$1,
    useGetPwStatusQuery = useGetPwStatusQuery$1,
    usePwAbsorbRewardsMutation = usePwAbsorbRewardsMutation$1,
    usePwJoinPoolMutation = usePwJoinPoolMutation$1,
    usePwSelfPoolMutation = usePwSelfPoolMutation$1,
    useCreateNewWalletMutation = useCreateNewWalletMutation$1,
    useDeleteUnconfirmedTransactionsMutation = useDeleteUnconfirmedTransactionsMutation$1,
    useGetWalletBalanceQuery = useGetWalletBalanceQuery$1,
    useGetFarmedAmountQuery = useGetFarmedAmountQuery$1,
    useSendTransactionMutation = useSendTransactionMutation$1,
    useGenerateMnemonicMutation = useGenerateMnemonicMutation$1,
    useGetPublicKeysQuery = useGetPublicKeysQuery$1,
    useAddKeyMutation = useAddKeyMutation$1,
    useDeleteKeyMutation = useDeleteKeyMutation$1,
    useCheckDeleteKeyMutation = useCheckDeleteKeyMutation$1,
    useDeleteAllKeysMutation = useDeleteAllKeysMutation$1,
    useLogInMutation = useLogInMutation$1,
    useLogInAndSkipImportMutation = useLogInAndSkipImportMutation$1,
    useLogInAndImportBackupMutation = useLogInAndImportBackupMutation$1,
    useGetBackupInfoQuery = useGetBackupInfoQuery$1,
    useGetBackupInfoByFingerprintQuery = useGetBackupInfoByFingerprintQuery$1,
    useGetBackupInfoByWordsQuery = useGetBackupInfoByWordsQuery$1,
    useGetPrivateKeyQuery = useGetPrivateKeyQuery$1,
    useGetTransactionsQuery = useGetTransactionsQuery$1,
    useGetTransactionsCountQuery = useGetTransactionsCountQuery$1,
    useGetCurrentAddressQuery = useGetCurrentAddressQuery$1,
    useGetNextAddressMutation = useGetNextAddressMutation$1,
    useFarmBlockMutation = useFarmBlockMutation$1,
    useGetHeightInfoQuery = useGetHeightInfoQuery$1,
    useGetNetworkInfoQuery = useGetNetworkInfoQuery$1,
    useGetSyncStatusQuery = useGetSyncStatusQuery$1,
    useGetWalletConnectionsQuery = useGetWalletConnectionsQuery$1,
    useOpenWalletConnectionMutation = useOpenWalletConnectionMutation$1,
    useCloseWalletConnectionMutation = useCloseWalletConnectionMutation$1,
    useCreateBackupMutation = useCreateBackupMutation$1,
    useGetAllOffersQuery = useGetAllOffersQuery$1,
    useGetOffersCountQuery = useGetOffersCountQuery$1,
    useCreateOfferForIdsMutation = useCreateOfferForIdsMutation$1,
    useCancelOfferMutation = useCancelOfferMutation$1,
    useCheckOfferValidityMutation = useCheckOfferValidityMutation$1,
    useTakeOfferMutation = useTakeOfferMutation$1,
    useGetOfferSummaryMutation = useGetOfferSummaryMutation$1,
    useGetOfferDataMutation = useGetOfferDataMutation$1,
    useGetOfferRecordMutation = useGetOfferRecordMutation$1,
    useGetCurrentDerivationIndexQuery = useGetCurrentDerivationIndexQuery$1,
    useExtendDerivationIndexMutation = useExtendDerivationIndexMutation$1,
    useCreateNewPoolWalletMutation = useCreateNewPoolWalletMutation$1,
    useCreateNewCATWalletMutation = useCreateNewCATWalletMutation$1,
    useCreateCATWalletForExistingMutation = useCreateCATWalletForExistingMutation$1,
    useGetCATAssetIdQuery = useGetCATAssetIdQuery$1,
    useGetCatListQuery = useGetCatListQuery$1,
    useGetCATNameQuery = useGetCATNameQuery$1,
    useSetCATNameMutation = useSetCATNameMutation$1,
    useSpendCATMutation = useSpendCATMutation$1,
    useAddCATTokenMutation = useAddCATTokenMutation$1,
    useGetStrayCatsQuery = useGetStrayCatsQuery$1,
    useGetPlotNFTsQuery = useGetPlotNFTsQuery$1,
    useCreateNewDIDWalletMutation = useCreateNewDIDWalletMutation$1,
    useUpdateDIDRecoveryIdsQuery = useUpdateDIDRecoveryIdsQuery$1,
    useGetDIDPubKeyQuery = useGetDIDPubKeyQuery$1,
    useGetDIDQuery = useGetDIDQuery$1,
    useGetDIDsQuery = useGetDIDsQuery$1,
    useGetDIDNameQuery = useGetDIDNameQuery$1,
    useSetDIDNameMutation = useSetDIDNameMutation$1,
    useGetDIDRecoveryListQuery = useGetDIDRecoveryListQuery$1,
    useGetDIDInformationNeededForRecoveryQuery = useGetDIDInformationNeededForRecoveryQuery$1,
    useGetDIDCurrentCoinInfoQuery = useGetDIDCurrentCoinInfoQuery$1,
    useGetNFTsQuery = useGetNFTsQuery$1,
    useGetNFTWalletsWithDIDsQuery = useGetNFTWalletsWithDIDsQuery$1,
    useGetNFTInfoQuery = useGetNFTInfoQuery$1,
    useTransferNFTMutation = useTransferNFTMutation$1,
    useSetNFTDIDMutation = useSetNFTDIDMutation$1,
    useSetNFTStatusMutation = useSetNFTStatusMutation$1,
    useReceiveNFTMutation = useReceiveNFTMutation$1; // harvester hooks
var harvesterApi = harvesterApi$1,
    useHarvesterPingQuery = useHarvesterPingQuery$1,
    useGetPlotsQuery = useGetPlotsQuery$1,
    useRefreshPlotsMutation = useRefreshPlotsMutation$1,
    useDeletePlotMutation = useDeletePlotMutation$1,
    useGetPlotDirectoriesQuery = useGetPlotDirectoriesQuery$1,
    useAddPlotDirectoryMutation = useAddPlotDirectoryMutation$1,
    useRemovePlotDirectoryMutation = useRemovePlotDirectoryMutation$1; // plotter hooks
var plotterApi = plotterApi$1,
    useGetPlotQueueQuery = useGetPlotQueueQuery$1;

function useGetNFTWallets() {
  var _useGetWalletsQuery = useGetWalletsQuery(),
      data = _useGetWalletsQuery.data,
      isLoading = _useGetWalletsQuery.isLoading;

  var nftWallets = react$1.useMemo(function () {
    if (!data || isLoading) {
      return [];
    }

    return data.filter(function (wallet) {
      return wallet.type === Client.WalletType.NFT;
    });
  }, [data]);
  return {
    wallets: nftWallets,
    isLoading: isLoading
  };
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function createStore(options) {
  var _reducer;

  return toolkit.configureStore(_objectSpread$1({
    reducer: (_reducer = {}, _defineProperty__default["default"](_reducer, api.reducerPath, api.reducer), _defineProperty__default["default"](_reducer, "api", apiReducer), _reducer),
    middleware: function middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: false
      }).concat(api.middleware);
    }
  }, options));
}
var store = createStore();
var useAppDispatch = function useAppDispatch() {
  return reactRedux.useDispatch();
};
var useTypedSelector = reactRedux.useSelector;

function useLogout() {
  var dispatch = useAppDispatch();

  function handleLogout() {
    return _handleLogout.apply(this, arguments);
  }

  function _handleLogout() {
    _handleLogout = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", dispatch(walletApi$1.util.resetApiState()));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleLogout.apply(this, arguments);
  }

  return handleLogout;
}

function useNFTMetadata(_ref) {
  var id = _ref.id;
  return {
    id: id,
    metadata: {
      owner: '@DrSpaceman',
      name: 'Mocked NFT title ' + crypto.randomBytes(1).toString('hex'),
      description: 'Mocked NFT description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      image: "https://picsum.photos/800/800?random=".concat(id),
      price: Math.floor(Math.random() * 100) * Math.pow(10, 12),
      total: Math.floor(Math.random() * 10000),
      marketplace: 'NFT Marketplace',
      hash: crypto.randomBytes(32).toString('hex'),
      contractAddress: "xch".concat(crypto.randomBytes(20).toString('hex')),
      urls: ['https://www.nftmarketplace.com/'],
      standard: 'NFT1',
      activity: [{
        date: new Date() - Math.floor(Math.random() * 100) * 24 * 60 * 60 * 1000,
        type: 'transfer',
        from: '@Anderson',
        to: '@DrSpaceman',
        amount: Math.floor(Math.random() * 100) * Math.pow(10, 12)
      }, {
        date: new Date() - Math.floor(Math.random() * 100) * 24 * 60 * 60 * 1000,
        type: 'transfer',
        from: '@Smith',
        to: '@Anderson',
        amount: Math.floor(Math.random() * 100) * Math.pow(10, 12)
      }, {
        date: new Date() - Math.floor(Math.random() * 100) * 24 * 60 * 60 * 1000,
        type: 'transfer',
        from: '@PeterParker',
        to: '@Smith',
        amount: Math.floor(Math.random() * 100) * Math.pow(10, 12)
      }]
    },
    isLoading: false
  };
}

function useService(service, options) {
  var keepState = options.keepState,
      _options$disabled = options.disabled,
      disabled = _options$disabled === void 0 ? false : _options$disabled;

  var _useState = react$1.useState(false),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      isStarting = _useState2[0],
      setIsStarting = _useState2[1];

  var _useState3 = react$1.useState(false),
      _useState4 = _slicedToArray__default["default"](_useState3, 2),
      isStopping = _useState4[0],
      setIsStopping = _useState4[1];

  var _useClientStartServic = useClientStartServiceMutation$1(),
      _useClientStartServic2 = _slicedToArray__default["default"](_useClientStartServic, 1),
      startService = _useClientStartServic2[0];

  var _useStopServiceMutati = useStopServiceMutation$1(),
      _useStopServiceMutati2 = _slicedToArray__default["default"](_useStopServiceMutati, 1),
      stopService = _useStopServiceMutati2[0]; // isRunning is not working when stopService is called (backend issue)


  var _useIsServiceRunningQ = useIsServiceRunningQuery$1({
    service: service
  }, {
    pollingInterval: 1000,
    skip: disabled,
    selectFromResult: function selectFromResult(state) {
      return {
        data: state.data,
        refetch: state.refetch,
        error: state.error,
        isLoading: state.isLoading
      };
    }
  }),
      isRunning = _useIsServiceRunningQ.data,
      isLoading = _useIsServiceRunningQ.isLoading,
      refetch = _useIsServiceRunningQ.refetch,
      error = _useIsServiceRunningQ.error;

  var isProcessing = isStarting || isStopping;
  var state = 'stopped';

  if (isStarting) {
    state = 'starting';
  } else if (isStopping) {
    state = 'stopping';
  } else if (isRunning) {
    state = 'running';
  }

  function handleStart() {
    return _handleStart.apply(this, arguments);
  }

  function _handleStart() {
    _handleStart = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!isProcessing) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;
              setIsStarting(true);
              _context.next = 6;
              return startService({
                service: service
              }).unwrap();

            case 6:
              refetch();

            case 7:
              _context.prev = 7;
              setIsStarting(false);
              return _context.finish(7);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2,, 7, 10]]);
    }));
    return _handleStart.apply(this, arguments);
  }

  function handleStop() {
    return _handleStop.apply(this, arguments);
  }

  function _handleStop() {
    _handleStop = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!isProcessing) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _context2.prev = 2;
              setIsStopping(true);
              _context2.next = 6;
              return stopService({
                service: service
              }).unwrap();

            case 6:
              refetch();

            case 7:
              _context2.prev = 7;
              setIsStopping(false);
              return _context2.finish(7);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2,, 7, 10]]);
    }));
    return _handleStop.apply(this, arguments);
  }

  react$1.useEffect(function () {
    if (disabled) {
      return;
    }

    if (keepState === 'running' && keepState !== state && !isProcessing && isRunning === false) {
      handleStart();
    } else if (keepState === 'stopped' && keepState !== state && !isProcessing && isRunning === true) {
      handleStop();
    }
  }, [keepState, state, isProcessing, disabled, isRunning]);
  return {
    state: state,
    isLoading: isLoading,
    isProcessing: isProcessing,
    error: error,
    start: handleStart,
    stop: handleStop,
    service: service
  };
}

function useForceUpdate() {
  var _useReducer = react$1.useReducer(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = _slicedToArray__default["default"](_useReducer, 2);
      _useReducer2[0];
      var forceUpdate = _useReducer2[1];

  return forceUpdate;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useThrottleQuery(queryHook, variables, options) {
  var throttleOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _throttleOptions$lead = throttleOptions.leading,
      leading = _throttleOptions$lead === void 0 ? true : _throttleOptions$lead,
      _throttleOptions$trai = throttleOptions.trailing,
      trailing = _throttleOptions$trai === void 0 ? true : _throttleOptions$trai,
      _throttleOptions$wait = throttleOptions.wait,
      wait = _throttleOptions$wait === void 0 ? 0 : _throttleOptions$wait;
  var forceUpdate = useForceUpdate();
  var refState = react$1.useRef();
  var processUpdate = react$1.useCallback(lodash.throttle(function () {
    return forceUpdate();
  }, wait, {
    leading: leading,
    trailing: trailing
  }), [wait, leading, trailing]);
  queryHook(variables, _objectSpread(_objectSpread({}, options), {}, {
    selectFromResult: function selectFromResult(state) {
      refState.current = state;
      processUpdate();
      return null;
    }
  }));
  return refState.current;
}

function useGetThrottlePlotQueueQuery() {
  var wait = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5000;

  var _useThrottleQuery = useThrottleQuery(useGetPlotQueueQuery$1, undefined, undefined, {
    wait: wait
  }),
      queue = _useThrottleQuery.data,
      isLoading = _useThrottleQuery.isLoading,
      error = _useThrottleQuery.error;

  return {
    queue: queue,
    isLoading: isLoading,
    hasQueue: !!(queue !== null && queue !== void 0 && queue.length),
    error: error
  };
}

function getServiceKeepState(service, options) {
  var keepRunning = options.keepRunning,
      keepStopped = options.keepStopped;

  if (keepRunning && keepRunning.includes(service)) {
    return 'running';
  } else if (keepStopped && keepStopped.includes(service)) {
    return 'stopped';
  }

  return undefined;
}

function getServiceDisabled(service, services, options) {
  var disabled = options.disabled;
  return disabled || !services.includes(service);
}

function getServiceOptions(service, services, options) {
  var keepState = getServiceKeepState(service, options);
  var disabled = getServiceDisabled(service, services, options);
  return {
    keepState: keepState,
    disabled: disabled
  };
}

function useMonitorServices(services) {
  var _states$find;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var walletState = useService(Client.ServiceName.WALLET, getServiceOptions(Client.ServiceName.WALLET, services, options));
  var fullNodeState = useService(Client.ServiceName.FULL_NODE, getServiceOptions(Client.ServiceName.FULL_NODE, services, options));
  var farmerState = useService(Client.ServiceName.FARMER, getServiceOptions(Client.ServiceName.FARMER, services, options));
  var harvesterState = useService(Client.ServiceName.HARVESTER, getServiceOptions(Client.ServiceName.HARVESTER, services, options));
  var simulatorState = useService(Client.ServiceName.SIMULATOR, getServiceOptions(Client.ServiceName.SIMULATOR, services, options));
  var plotterState = useService(Client.ServiceName.PLOTTER, getServiceOptions(Client.ServiceName.PLOTTER, services, options));
  var timelordState = useService(Client.ServiceName.TIMELORD, getServiceOptions(Client.ServiceName.TIMELORD, services, options));
  var introducerState = useService(Client.ServiceName.INTRODUCER, getServiceOptions(Client.ServiceName.INTRODUCER, services, options));
  var states = [walletState, fullNodeState, farmerState, harvesterState, simulatorState, plotterState, timelordState, introducerState];
  var isLoading = !!states.find(function (state) {
    return state.isLoading;
  });
  var error = (_states$find = states.find(function (state) {
    return state.error;
  })) === null || _states$find === void 0 ? void 0 : _states$find.error;
  var starting = states.filter(function (state) {
    return state.state === 'starting';
  });
  var stopping = states.filter(function (state) {
    return state.state === 'stopping';
  });
  var running = states.filter(function (state) {
    return state.state === 'running';
  });
  return {
    isLoading: isLoading,
    error: error,
    starting: starting,
    stopping: stopping,
    running: running
  };
}

function useGetTotalHarvestersSummaryQuery() {
  var _data$length;

  var _useGetHarvestersSumm = useGetHarvestersSummaryQuery$1(),
      data = _useGetHarvestersSumm.data,
      isLoading = _useGetHarvestersSumm.isLoading,
      error = _useGetHarvestersSumm.error;

  var _useMemo = react$1.useMemo(function () {
    var duplicates = new BigNumber__default["default"](0);
    var failedToOpenFilenames = new BigNumber__default["default"](0);
    var noKeyFilenames = new BigNumber__default["default"](0);
    var plots = new BigNumber__default["default"](0);
    var plotsProcessed = new BigNumber__default["default"](0);
    var totalPlotSize = new BigNumber__default["default"](0);
    var plotFilesTotal = new BigNumber__default["default"](0);
    var initialized = !!(data !== null && data !== void 0 && data.length);
    var initializedHarvesters = 0;
    data === null || data === void 0 ? void 0 : data.forEach(function (harvester) {
      var _harvester$syncing2;

      duplicates = duplicates.plus(harvester.duplicates);
      failedToOpenFilenames = failedToOpenFilenames.plus(harvester.failedToOpenFilenames);
      noKeyFilenames = noKeyFilenames.plus(harvester.noKeyFilenames);
      totalPlotSize = totalPlotSize.plus(harvester.totalPlotSize);
      plots = plots.plus(harvester.plots);

      if (harvester.syncing) {
        var _harvester$syncing;

        plotsProcessed = plotsProcessed.plus(harvester.syncing.plotFilesProcessed);
        plotFilesTotal = plotFilesTotal.plus(harvester.syncing.plotFilesTotal);

        if (((_harvester$syncing = harvester.syncing) === null || _harvester$syncing === void 0 ? void 0 : _harvester$syncing.initial) === true) {
          initialized = false;
        }
      }

      if ((harvester === null || harvester === void 0 ? void 0 : (_harvester$syncing2 = harvester.syncing) === null || _harvester$syncing2 === void 0 ? void 0 : _harvester$syncing2.initial) !== true) {
        initializedHarvesters += 1;
      }
    });
    return {
      duplicates: duplicates,
      failedToOpenFilenames: failedToOpenFilenames,
      noKeyFilenames: noKeyFilenames,
      plots: plots,
      plotsProcessed: plotsProcessed,
      totalPlotSize: totalPlotSize,
      plotFilesTotal: plotFilesTotal,
      initialized: initialized,
      initializedHarvesters: initializedHarvesters
    };
  }, [data]),
      plots = _useMemo.plots,
      duplicates = _useMemo.duplicates,
      noKeyFilenames = _useMemo.noKeyFilenames,
      failedToOpenFilenames = _useMemo.failedToOpenFilenames,
      plotsProcessed = _useMemo.plotsProcessed,
      totalPlotSize = _useMemo.totalPlotSize,
      plotFilesTotal = _useMemo.plotFilesTotal,
      initialized = _useMemo.initialized,
      initializedHarvesters = _useMemo.initializedHarvesters;

  return {
    isLoading: isLoading,
    initialized: initialized,
    error: error,
    hasPlots: plots.gt(0),
    plots: plots,
    noKeyFilenames: noKeyFilenames,
    failedToOpenFilenames: failedToOpenFilenames,
    duplicates: duplicates,
    harvesters: (_data$length = data === null || data === void 0 ? void 0 : data.length) !== null && _data$length !== void 0 ? _data$length : 0,
    plotsProcessed: plotsProcessed,
    totalPlotSize: totalPlotSize,
    plotFilesTotal: plotFilesTotal,
    initializedHarvesters: initializedHarvesters
  };
}

exports.api = api$1;
exports.chiaApi = api;
exports.clientApi = clientApi;
exports.createStore = createStore;
exports.daemonApi = daemonApi;
exports.farmerApi = farmerApi;
exports.fullNodeApi = fullNodeApi;
exports.harvesterApi = harvesterApi;
exports.plotterApi = plotterApi;
exports.store = store;
exports.useAddCATTokenMutation = useAddCATTokenMutation;
exports.useAddKeyMutation = useAddKeyMutation;
exports.useAddPlotDirectoryMutation = useAddPlotDirectoryMutation;
exports.useAppDispatch = useAppDispatch;
exports.useCancelOfferMutation = useCancelOfferMutation;
exports.useCheckDeleteKeyMutation = useCheckDeleteKeyMutation;
exports.useCheckOfferValidityMutation = useCheckOfferValidityMutation;
exports.useClientStartServiceMutation = useClientStartServiceMutation;
exports.useCloseFarmerConnectionMutation = useCloseFarmerConnectionMutation;
exports.useCloseFullNodeConnectionMutation = useCloseFullNodeConnectionMutation;
exports.useCloseMutation = useCloseMutation;
exports.useCloseWalletConnectionMutation = useCloseWalletConnectionMutation;
exports.useCreateBackupMutation = useCreateBackupMutation;
exports.useCreateCATWalletForExistingMutation = useCreateCATWalletForExistingMutation;
exports.useCreateNewCATWalletMutation = useCreateNewCATWalletMutation;
exports.useCreateNewDIDWalletMutation = useCreateNewDIDWalletMutation;
exports.useCreateNewPoolWalletMutation = useCreateNewPoolWalletMutation;
exports.useCreateNewWalletMutation = useCreateNewWalletMutation;
exports.useCreateOfferForIdsMutation = useCreateOfferForIdsMutation;
exports.useDaemonPingQuery = useDaemonPingQuery;
exports.useDeleteAllKeysMutation = useDeleteAllKeysMutation;
exports.useDeleteKeyMutation = useDeleteKeyMutation;
exports.useDeletePlotMutation = useDeletePlotMutation;
exports.useDeleteUnconfirmedTransactionsMutation = useDeleteUnconfirmedTransactionsMutation;
exports.useExtendDerivationIndexMutation = useExtendDerivationIndexMutation;
exports.useFarmBlockMutation = useFarmBlockMutation;
exports.useFarmerPingQuery = useFarmerPingQuery;
exports.useFullNodePingQuery = useFullNodePingQuery;
exports.useGenerateMnemonicMutation = useGenerateMnemonicMutation;
exports.useGetAllOffersQuery = useGetAllOffersQuery;
exports.useGetBackupInfoByFingerprintQuery = useGetBackupInfoByFingerprintQuery;
exports.useGetBackupInfoByWordsQuery = useGetBackupInfoByWordsQuery;
exports.useGetBackupInfoQuery = useGetBackupInfoQuery;
exports.useGetBlockQuery = useGetBlockQuery;
exports.useGetBlockRecordQuery = useGetBlockRecordQuery;
exports.useGetBlockRecordsQuery = useGetBlockRecordsQuery;
exports.useGetBlockchainStateQuery = useGetBlockchainStateQuery;
exports.useGetCATAssetIdQuery = useGetCATAssetIdQuery;
exports.useGetCATNameQuery = useGetCATNameQuery;
exports.useGetCatListQuery = useGetCatListQuery;
exports.useGetCurrentAddressQuery = useGetCurrentAddressQuery;
exports.useGetCurrentDerivationIndexQuery = useGetCurrentDerivationIndexQuery;
exports.useGetDIDCurrentCoinInfoQuery = useGetDIDCurrentCoinInfoQuery;
exports.useGetDIDInformationNeededForRecoveryQuery = useGetDIDInformationNeededForRecoveryQuery;
exports.useGetDIDNameQuery = useGetDIDNameQuery;
exports.useGetDIDPubKeyQuery = useGetDIDPubKeyQuery;
exports.useGetDIDQuery = useGetDIDQuery;
exports.useGetDIDRecoveryListQuery = useGetDIDRecoveryListQuery;
exports.useGetDIDsQuery = useGetDIDsQuery;
exports.useGetFarmedAmountQuery = useGetFarmedAmountQuery;
exports.useGetFarmerConnectionsQuery = useGetFarmerConnectionsQuery;
exports.useGetFarmerFullNodeConnectionsQuery = useGetFarmerFullNodeConnectionsQuery;
exports.useGetFarmingInfoQuery = useGetFarmingInfoQuery;
exports.useGetFullNodeConnectionsQuery = useGetFullNodeConnectionsQuery;
exports.useGetHarvesterConnectionsQuery = useGetHarvesterConnectionsQuery;
exports.useGetHarvesterPlotsDuplicatesQuery = useGetHarvesterPlotsDuplicatesQuery;
exports.useGetHarvesterPlotsInvalidQuery = useGetHarvesterPlotsInvalidQuery;
exports.useGetHarvesterPlotsKeysMissingQuery = useGetHarvesterPlotsKeysMissingQuery;
exports.useGetHarvesterPlotsValidQuery = useGetHarvesterPlotsValidQuery;
exports.useGetHarvesterQuery = useGetHarvesterQuery;
exports.useGetHarvesterStats = useGetHarvesterStats;
exports.useGetHarvestersQuery = useGetHarvestersQuery;
exports.useGetHarvestersSummaryQuery = useGetHarvestersSummaryQuery;
exports.useGetHeightInfoQuery = useGetHeightInfoQuery;
exports.useGetKeyringStatusQuery = useGetKeyringStatusQuery;
exports.useGetLatestBlocksQuery = useGetLatestBlocksQuery;
exports.useGetLatestPeakTimestampQuery = useGetLatestPeakTimestampQuery;
exports.useGetLoggedInFingerprintQuery = useGetLoggedInFingerprintQuery;
exports.useGetNFTInfoQuery = useGetNFTInfoQuery;
exports.useGetNFTWallets = useGetNFTWallets;
exports.useGetNFTWalletsWithDIDsQuery = useGetNFTWalletsWithDIDsQuery;
exports.useGetNFTsQuery = useGetNFTsQuery;
exports.useGetNetworkInfoQuery = useGetNetworkInfoQuery;
exports.useGetNextAddressMutation = useGetNextAddressMutation;
exports.useGetOfferDataMutation = useGetOfferDataMutation;
exports.useGetOfferRecordMutation = useGetOfferRecordMutation;
exports.useGetOfferSummaryMutation = useGetOfferSummaryMutation;
exports.useGetOffersCountQuery = useGetOffersCountQuery;
exports.useGetPlotDirectoriesQuery = useGetPlotDirectoriesQuery;
exports.useGetPlotNFTsQuery = useGetPlotNFTsQuery;
exports.useGetPlotQueueQuery = useGetPlotQueueQuery;
exports.useGetPlotsQuery = useGetPlotsQuery;
exports.useGetPlottersQuery = useGetPlottersQuery;
exports.useGetPoolLoginLinkQuery = useGetPoolLoginLinkQuery;
exports.useGetPoolStateQuery = useGetPoolStateQuery;
exports.useGetPrivateKeyQuery = useGetPrivateKeyQuery;
exports.useGetPublicKeysQuery = useGetPublicKeysQuery;
exports.useGetPwStatusQuery = useGetPwStatusQuery;
exports.useGetRewardTargetsQuery = useGetRewardTargetsQuery;
exports.useGetSignagePointsQuery = useGetSignagePointsQuery;
exports.useGetStateQuery = useGetStateQuery;
exports.useGetStrayCatsQuery = useGetStrayCatsQuery;
exports.useGetSyncStatusQuery = useGetSyncStatusQuery;
exports.useGetThrottlePlotQueueQuery = useGetThrottlePlotQueueQuery;
exports.useGetTotalHarvestersSummaryQuery = useGetTotalHarvestersSummaryQuery;
exports.useGetTransactionQuery = useGetTransactionQuery;
exports.useGetTransactionsCountQuery = useGetTransactionsCountQuery;
exports.useGetTransactionsQuery = useGetTransactionsQuery;
exports.useGetUnfinishedBlockHeadersQuery = useGetUnfinishedBlockHeadersQuery;
exports.useGetWalletBalanceQuery = useGetWalletBalanceQuery;
exports.useGetWalletConnectionsQuery = useGetWalletConnectionsQuery;
exports.useGetWalletsQuery = useGetWalletsQuery;
exports.useHarvesterPingQuery = useHarvesterPingQuery;
exports.useIsServiceRunningQuery = useIsServiceRunningQuery;
exports.useLogInAndImportBackupMutation = useLogInAndImportBackupMutation;
exports.useLogInAndSkipImportMutation = useLogInAndSkipImportMutation;
exports.useLogInMutation = useLogInMutation;
exports.useLogout = useLogout;
exports.useMigrateKeyringMutation = useMigrateKeyringMutation;
exports.useNFTMetadata = useNFTMetadata;
exports.useOpenFarmerConnectionMutation = useOpenFarmerConnectionMutation;
exports.useOpenFullNodeConnectionMutation = useOpenFullNodeConnectionMutation;
exports.useOpenWalletConnectionMutation = useOpenWalletConnectionMutation;
exports.usePwAbsorbRewardsMutation = usePwAbsorbRewardsMutation;
exports.usePwJoinPoolMutation = usePwJoinPoolMutation;
exports.usePwSelfPoolMutation = usePwSelfPoolMutation;
exports.useReceiveNFTMutation = useReceiveNFTMutation;
exports.useRefreshPlotsMutation = useRefreshPlotsMutation;
exports.useRemoveKeyringPassphraseMutation = useRemoveKeyringPassphraseMutation;
exports.useRemovePlotDirectoryMutation = useRemovePlotDirectoryMutation;
exports.useSendTransactionMutation = useSendTransactionMutation;
exports.useService = useService;
exports.useServices = useMonitorServices;
exports.useSetCATNameMutation = useSetCATNameMutation;
exports.useSetDIDNameMutation = useSetDIDNameMutation;
exports.useSetKeyringPassphraseMutation = useSetKeyringPassphraseMutation;
exports.useSetNFTDIDMutation = useSetNFTDIDMutation;
exports.useSetNFTStatusMutation = useSetNFTStatusMutation;
exports.useSetPayoutInstructionsMutation = useSetPayoutInstructionsMutation;
exports.useSetRewardTargetsMutation = useSetRewardTargetsMutation;
exports.useSpendCATMutation = useSpendCATMutation;
exports.useStartPlottingMutation = useStartPlottingMutation;
exports.useStartServiceMutation = useStartServiceMutation;
exports.useStopPlottingMutation = useStopPlottingMutation;
exports.useStopServiceMutation = useStopServiceMutation;
exports.useTakeOfferMutation = useTakeOfferMutation;
exports.useThrottleQuery = useThrottleQuery;
exports.useTransferNFTMutation = useTransferNFTMutation;
exports.useTypedSelector = useTypedSelector;
exports.useUnlockKeyringMutation = useUnlockKeyringMutation;
exports.useUpdateDIDRecoveryIdsQuery = useUpdateDIDRecoveryIdsQuery;
exports.useWalletPingQuery = useWalletPingQuery;
exports.walletApi = walletApi;
//# sourceMappingURL=index.js.map
