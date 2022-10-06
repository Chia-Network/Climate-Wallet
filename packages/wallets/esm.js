import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { Trans } from '@lingui/react';
import React, { useMemo, useState, useCallback } from 'react';
import { useNavigate as useNavigate$1, useHistory as useHistory$1, useRouteMatch as useRouteMatch$1, Routes, Route, useParams as useParams$1, Navigate } from 'react-router-dom';
import { useCurrencyCode, StateColor, useSerializedNavigationState, Flex, CopyToClipboard, FormatLargeNumber, mojoToCAT, mojoToChia, Card, TableControlled, TooltipIcon, ButtonLoading, Loading, blockHeightToTimestamp, useLocale, mojoToCATLocaleString, mojoToChiaLocaleString, CardSimple, AlertDialog, useOpenDialog, useIsSimulator, Form, TextField as TextField$1, TextFieldNumber, Fee, AdvancedOptions, Button, getTransactionResult, catToMojo, chiaToMojo, DropdownActions, ConfirmDialog, DialogActions, Link, Amount, Back, useShowError, Logo, useTrans, Autocomplete, useLocalStorage, CardListItem, Tooltip as Tooltip$1, useColorModeValue, Spinner, useOpenExternal, Suspender, LayoutDashboardSub, StateIndicator, State, Table as Table$1, FormatBytes } from '@chia/core';
import { TableCell, Box, Tooltip, Chip, Typography, IconButton, Table, TableBody, TableRow, Grid, TextField, InputAdornment, Paper, Tabs, Tab, MenuItem, ListItemIcon, Dialog, DialogTitle, DialogContent, Button as Button$1, Alert, Container, DialogActions as DialogActions$1, CircularProgress, Switch, InputBase } from '@mui/material';
import { CallMade, CallReceived, ExpandLess, ExpandMore, Delete, Edit, Fingerprint, HomeWork, Share, Speed, Add, Restore, KeyboardArrowDown, KeyboardArrowUp, Autorenew } from '@mui/icons-material';
import { WalletType, toBech32m, TransactionType, SyncingStatus, english, ServiceConnectionName } from '@chia/api';
import { useGetWalletsQuery, useGetCatListQuery, useGetTransactionsCountQuery, useGetTransactionsQuery, useGetSyncStatusQuery, useGetOfferRecordMutation, useGetCurrentAddressQuery, useGetNextAddressMutation, useGetWalletBalanceQuery, useGetCurrentDerivationIndexQuery, useFarmBlockMutation, useSpendCATMutation, useDeleteUnconfirmedTransactionsMutation, useSetCATNameMutation, useSendTransactionMutation, useAddCATTokenMutation as useAddCATTokenMutation$1, useGenerateMnemonicMutation, useAddKeyMutation, useLogInMutation, useGetLoggedInFingerprintQuery, useGetStrayCatsQuery, useGetPrivateKeyQuery, useGetHeightInfoQuery, useGetWalletConnectionsQuery } from '@chia/api-react';
import { Offers } from '@chia/icons';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import moment from 'moment';
import styled from 'styled-components';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { linearGradientDef } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line';
import BigNumber from 'bignumber.js';
import { groupBy, map, orderBy } from 'lodash';
import { useNavigate, useHistory, useRouteMatch, useParams } from 'react-router';
import { i18n } from '@lingui/core';
import isNumeric from 'validator/es/lib/isNumeric';
import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import { useEffectOnce, useToggle } from 'react-use';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function useWallet(walletId) {
  var currencyCode = useCurrencyCode();

  var _useGetWalletsQuery = useGetWalletsQuery(),
      wallets = _useGetWalletsQuery.data,
      isLoading = _useGetWalletsQuery.isLoading;

  var _useGetCatListQuery = useGetCatListQuery(),
      _useGetCatListQuery$d = _useGetCatListQuery.data,
      catList = _useGetCatListQuery$d === void 0 ? [] : _useGetCatListQuery$d,
      isCatListLoading = _useGetCatListQuery.isLoading;

  var wallet = useMemo(function () {
    return wallets === null || wallets === void 0 ? void 0 : wallets.find(function (item) {
      return item.id.toString() === (walletId === null || walletId === void 0 ? void 0 : walletId.toString());
    });
  }, [wallets, walletId]);
  var unit = useMemo(function () {
    if (wallet) {
      if (!isCatListLoading && wallet.type === WalletType.CAT) {
        var token = catList.find(function (item) {
          var _wallet$meta;

          return item.assetId === ((_wallet$meta = wallet.meta) === null || _wallet$meta === void 0 ? void 0 : _wallet$meta.assetId);
        });

        if (token) {
          return token.symbol;
        }

        return undefined;
      }

      return currencyCode;
    }
  }, [wallet, currencyCode, isCatListLoading]);
  return {
    wallet: wallet,
    loading: isLoading,
    unit: unit
  };
}

function useWalletTransactions(walletId) {
  var defaultRowsPerPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var defaultPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var sortKey = arguments.length > 3 ? arguments[3] : undefined;
  var reverse = arguments.length > 4 ? arguments[4] : undefined;

  var _useState = useState(defaultRowsPerPage),
      _useState2 = _slicedToArray(_useState, 2),
      rowsPerPage = _useState2[0],
      setRowsPerPage = _useState2[1];

  var _useState3 = useState(defaultPage),
      _useState4 = _slicedToArray(_useState3, 2),
      page = _useState4[0],
      setPage = _useState4[1];

  var _useGetTransactionsCo = useGetTransactionsCountQuery({
    walletId: walletId
  }),
      count = _useGetTransactionsCo.data,
      isTransactionsCountLoading = _useGetTransactionsCo.isLoading,
      transactionsCountError = _useGetTransactionsCo.error;

  var all = rowsPerPage === -1;
  var start = all ? 0 : page * rowsPerPage;
  var end = all ? count !== null && count !== void 0 ? count : 0 : start + rowsPerPage;

  var _useGetTransactionsQu = useGetTransactionsQuery({
    walletId: walletId,
    start: start,
    end: end,
    sortKey: sortKey,
    reverse: reverse
  }, {
    skipToken: count === undefined
  }),
      transactions = _useGetTransactionsQu.data,
      isTransactionsLoading = _useGetTransactionsQu.isLoading,
      transactionsError = _useGetTransactionsQu.error;

  var isLoading = isTransactionsLoading || isTransactionsCountLoading;
  var error = transactionsError || transactionsCountError; // TODO move sorting to the backend

  var transactionsOrdered = transactions;

  function handlePageChange(rowsPerPage, page) {
    setRowsPerPage(rowsPerPage);
    setPage(page);
  }

  return {
    transactions: transactionsOrdered,
    count: count,
    page: page,
    rowsPerPage: rowsPerPage,
    isLoading: isLoading,
    error: error,
    pageChange: handlePageChange
  };
}

var StyledTableCellSmall = styled(TableCell).withConfig({
  displayName: "WalletHistory__StyledTableCellSmall",
  componentId: "sc-36rozk-0"
})(["border-bottom:0;padding-left:0;padding-right:0 !important;vertical-align:top;"]);
var StyledTableCellSmallRight = styled(StyledTableCellSmall).withConfig({
  displayName: "WalletHistory__StyledTableCellSmallRight",
  componentId: "sc-36rozk-1"
})(["width:100%;padding-left:1rem;"]);
var StyledWarning = styled(Box).withConfig({
  displayName: "WalletHistory__StyledWarning",
  componentId: "sc-36rozk-2"
})(["color:", ";"], StateColor.WARNING);

function handleRowClick(_x, _x2, _x3, _x4) {
  return _handleRowClick.apply(this, arguments);
}

function _handleRowClick() {
  _handleRowClick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(event, row, getOfferRecord, navigate) {
    var _yield$getOfferRecord, response, tradeRecord, success;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!row.tradeId) {
              _context.next = 13;
              break;
            }

            _context.prev = 1;
            _context.next = 4;
            return getOfferRecord(row.tradeId);

          case 4:
            _yield$getOfferRecord = _context.sent;
            response = _yield$getOfferRecord.data;
            tradeRecord = response.tradeRecord, success = response.success;

            if (success === true && tradeRecord) {
              navigate('/dashboard/offers/view', {
                state: {
                  tradeRecord: tradeRecord
                }
              });
            }

            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _handleRowClick.apply(this, arguments);
}

var getCols = function getCols(type, isSyncing, getOfferRecord, navigate) {
  return [{
    field: function field(row) {
      var isOutgoing = [TransactionType.OUTGOING, TransactionType.OUTGOING_TRADE].includes(row.type);
      return /*#__PURE__*/jsx(Flex, {
        gap: 1,
        children: /*#__PURE__*/jsx(Tooltip, {
          title: isOutgoing ? /*#__PURE__*/jsx(Trans, {
            id: "Outgoing"
          }) : /*#__PURE__*/jsx(Trans, {
            id: "Incoming"
          }),
          children: isOutgoing ? /*#__PURE__*/jsx(CallMade, {
            color: "secondary"
          }) : /*#__PURE__*/jsx(CallReceived, {
            color: "primary"
          })
        })
      });
    }
  }, {
    width: '100%',
    field: function field(row, metadata) {
      var isConfirmed = row.confirmed,
          memos = row.memos;
      var hasMemos = !!memos && !!Object.values(memos).length;
      var isRetire = row.toAddress === metadata.retireAddress;
      var isOffer = row.toAddress === metadata.offerTakerAddress;
      var shouldObscureAddress = isRetire || isOffer;
      return /*#__PURE__*/jsxs(Flex, {
        flexDirection: "column",
        gap: 1,
        onClick: function onClick(event) {
          if (!isSyncing) {
            handleRowClick(event, row, getOfferRecord, navigate);
          }
        },
        children: [/*#__PURE__*/jsx(Tooltip, {
          title: /*#__PURE__*/jsxs(Flex, {
            flexDirection: "column",
            gap: 1,
            children: [shouldObscureAddress && /*#__PURE__*/jsx(StyledWarning, {
              children: /*#__PURE__*/jsx(Trans, {
                id: "This is not a valid address for sending funds to"
              })
            }), /*#__PURE__*/jsxs(Flex, {
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              children: [/*#__PURE__*/jsx(Box, {
                maxWidth: 200,
                children: row.toAddress
              }), !shouldObscureAddress && /*#__PURE__*/jsx(CopyToClipboard, {
                value: row.toAddress,
                fontSize: "small"
              })]
            })]
          }),
          interactive: true,
          children: /*#__PURE__*/jsx("span", {
            children: shouldObscureAddress ? row.toAddress.slice(0, 20) + '...' : row.toAddress
          })
        }), /*#__PURE__*/jsxs(Flex, {
          gap: 0.5,
          children: [isConfirmed ? /*#__PURE__*/jsx(Chip, {
            size: "small",
            variant: "outlined",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Confirmed"
            })
          }) : /*#__PURE__*/jsx(Chip, {
            size: "small",
            color: "primary",
            variant: "outlined",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Pending"
            })
          }), hasMemos && /*#__PURE__*/jsx(Chip, {
            size: "small",
            variant: "outlined",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Memo"
            })
          }), isRetire && /*#__PURE__*/jsx(Chip, {
            size: "small",
            variant: "outlined",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Retire"
            })
          }), isOffer && /*#__PURE__*/jsx(Chip, {
            size: "small",
            variant: "outlined",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Offer Accepted"
            })
          })]
        })]
      });
    },
    title: /*#__PURE__*/jsx(Trans, {
      id: "To"
    })
  }, {
    field: function field(row) {
      return /*#__PURE__*/jsx(Typography, {
        color: "textSecondary",
        variant: "body2",
        children: moment(row.createdAtTime * 1000).format('LLL')
      });
    },
    title: /*#__PURE__*/jsx(Trans, {
      id: "Date"
    })
  }, {
    field: function field(row, metadata) {
      var isOutgoing = [TransactionType.OUTGOING, TransactionType.OUTGOING_TRADE].includes(row.type);
      return /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("strong", {
          children: isOutgoing ? /*#__PURE__*/jsx(Trans, {
            id: "-"
          }) : /*#__PURE__*/jsx(Trans, {
            id: "+"
          })
        }), "\xA0", /*#__PURE__*/jsx("strong", {
          children: /*#__PURE__*/jsx(FormatLargeNumber, {
            value: type === WalletType.CAT ? mojoToCAT(row.amount) : mojoToChia(row.amount)
          })
        }), "\xA0", metadata.unit]
      });
    },
    title: /*#__PURE__*/jsx(Trans, {
      id: "Amount"
    })
  }, {
    field: function field(row, metadata) {
      return /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("strong", {
          children: /*#__PURE__*/jsx(FormatLargeNumber, {
            value: mojoToChia(row.feeAmount)
          })
        }), "\xA0", metadata.feeUnit]
      });
    },
    title: /*#__PURE__*/jsx(Trans, {
      id: "Fee"
    })
  }, {
    field: function field(row, _metadata, isExpanded, toggleExpand) {
      return /*#__PURE__*/jsx(IconButton, {
        "aria-label": "expand row",
        size: "small",
        onClick: toggleExpand,
        children: isExpanded ? /*#__PURE__*/jsx(ExpandLess, {}) : /*#__PURE__*/jsx(ExpandMore, {})
      });
    }
  }];
};

function WalletHistory(props) {
  var walletId = props.walletId;

  var _useGetSyncStatusQuer = useGetSyncStatusQuery({}, {
    pollingInterval: 10000
  }),
      walletState = _useGetSyncStatusQuer.data,
      isWalletSyncLoading = _useGetSyncStatusQuer.isLoading;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      isWalletLoading = _useWallet.loading,
      unit = _useWallet.unit;

  var _useWalletTransaction = useWalletTransactions(walletId, 10, 0, 'RELEVANCE'),
      transactions = _useWalletTransaction.transactions,
      isWalletTransactionsLoading = _useWalletTransaction.isLoading,
      page = _useWalletTransaction.page,
      rowsPerPage = _useWalletTransaction.rowsPerPage,
      count = _useWalletTransaction.count,
      pageChange = _useWalletTransaction.pageChange;

  var feeUnit = useCurrencyCode();

  var _useGetOfferRecordMut = useGetOfferRecordMutation(),
      _useGetOfferRecordMut2 = _slicedToArray(_useGetOfferRecordMut, 1),
      getOfferRecord = _useGetOfferRecordMut2[0];

  var _useSerializedNavigat = useSerializedNavigationState(),
      navigate = _useSerializedNavigat.navigate;

  var isLoading = isWalletTransactionsLoading || isWalletLoading;
  var isSyncing = isWalletSyncLoading || !walletState || !!(walletState !== null && walletState !== void 0 && walletState.syncing);
  var metadata = useMemo(function () {
    var retireAddress = feeUnit && toBech32m('0000000000000000000000000000000000000000000000000000000000000000', feeUnit);
    var offerTakerAddress = feeUnit && toBech32m('0101010101010101010101010101010101010101010101010101010101010101', feeUnit);
    return {
      unit: unit,
      feeUnit: feeUnit,
      retireAddress: retireAddress,
      offerTakerAddress: offerTakerAddress
    };
  }, [unit, feeUnit]);
  var cols = useMemo(function () {
    if (!wallet) {
      return [];
    }

    return getCols(wallet.type, isSyncing, getOfferRecord, navigate);
  }, [wallet === null || wallet === void 0 ? void 0 : wallet.type]);
  return /*#__PURE__*/jsx(Card, {
    title: /*#__PURE__*/jsx(Trans, {
      id: "Transactions"
    }),
    titleVariant: "h6",
    transparent: true,
    children: /*#__PURE__*/jsx(TableControlled, {
      cols: cols,
      rows: transactions !== null && transactions !== void 0 ? transactions : [],
      rowsPerPageOptions: [5, 10, 25, 50, 100],
      page: page,
      rowsPerPage: rowsPerPage,
      count: count,
      onPageChange: pageChange,
      isLoading: isLoading,
      metadata: metadata,
      expandedCellShift: 1,
      uniqueField: "name",
      expandedField: function expandedField(row) {
        var confirmedAtHeight = row.confirmedAtHeight,
            memos = row.memos;
        var memoValues = memos ? Object.values(memos) : [];
        var memoValuesDecoded = memoValues.map(function (memoHex) {
          try {
            var buf = new Buffer(memoHex, 'hex');
            var decodedValue = buf.toString('utf8');
            var bufCheck = Buffer.from(decodedValue, 'utf8');

            if (bufCheck.toString('hex') !== memoHex) {
              throw new Error('Memo is not valid utf8 string');
            }

            return decodedValue;
          } catch (error) {
            return memoHex;
          }
        });
        var memosDescription = memoValuesDecoded && memoValuesDecoded.length ? /*#__PURE__*/jsx(Flex, {
          flexDirection: "column",
          children: memoValuesDecoded.map(function (memo, index) {
            return /*#__PURE__*/jsx(Typography, {
              variant: "inherit",
              children: memo !== null && memo !== void 0 ? memo : ''
            }, index);
          })
        }) : /*#__PURE__*/jsx(Trans, {
          id: "Not Available"
        });
        var rows = [confirmedAtHeight && {
          key: 'confirmedAtHeight',
          label: /*#__PURE__*/jsx(Trans, {
            id: "Confirmed at Height"
          }),
          value: confirmedAtHeight ? confirmedAtHeight : /*#__PURE__*/jsx(Trans, {
            id: "Not Available"
          })
        }, {
          key: 'memos',
          label: /*#__PURE__*/jsx(Trans, {
            id: "Memos"
          }),
          value: memosDescription
        }].filter(function (item) {
          return !!item;
        });
        return /*#__PURE__*/jsx(Table, {
          size: "small",
          children: /*#__PURE__*/jsx(TableBody, {
            children: rows.map(function (row) {
              return /*#__PURE__*/jsxs(TableRow, {
                children: [/*#__PURE__*/jsx(StyledTableCellSmall, {
                  children: /*#__PURE__*/jsx(Typography, {
                    component: "div",
                    variant: "body2",
                    color: "textSecondary",
                    noWrap: true,
                    children: row.label
                  })
                }), /*#__PURE__*/jsx(StyledTableCellSmallRight, {
                  children: /*#__PURE__*/jsx(Box, {
                    maxWidth: "100%",
                    children: /*#__PURE__*/jsx(Typography, {
                      component: "div",
                      variant: "body2",
                      noWrap: true,
                      children: row.value
                    })
                  })
                })]
              }, row.key);
            })
          })
        });
      },
      caption: !(transactions !== null && transactions !== void 0 && transactions.length) && /*#__PURE__*/jsx(Typography, {
        variant: "body2",
        align: "center",
        children: /*#__PURE__*/jsx(Trans, {
          id: "No previous transactions"
        })
      }),
      pages: !!(transactions !== null && transactions !== void 0 && transactions.length)
    })
  });
}

function WalletReceiveAddress(props) {
  var walletId = props.walletId;

  var _useGetCurrentAddress = useGetCurrentAddressQuery({
    walletId: walletId
  }),
      address = _useGetCurrentAddress.data,
      isLoading = _useGetCurrentAddress.isLoading;

  var _useGetNextAddressMut = useGetNextAddressMutation(),
      _useGetNextAddressMut2 = _slicedToArray(_useGetNextAddressMut, 2),
      newAddress = _useGetNextAddressMut2[0],
      isLoadingNewAddress = _useGetNextAddressMut2[1].isLoading;

  function handleNewAddress() {
    return _handleNewAddress.apply(this, arguments);
  }

  function _handleNewAddress() {
    _handleNewAddress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return newAddress({
                walletId: walletId,
                newAddress: true
              }).unwrap();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleNewAddress.apply(this, arguments);
  }

  return /*#__PURE__*/jsxs(Flex, {
    gap: 2,
    flexDirection: "column",
    children: [/*#__PURE__*/jsxs(Flex, {
      gap: 1,
      flexGrow: 1,
      justifyContent: "space-between",
      children: [/*#__PURE__*/jsxs(Typography, {
        variant: "h6",
        children: [/*#__PURE__*/jsx(Trans, {
          id: "Receive Address"
        }), "\xA0", /*#__PURE__*/jsx(TooltipIcon, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key."
          })
        })]
      }), /*#__PURE__*/jsx(ButtonLoading, {
        onClick: handleNewAddress,
        loading: isLoadingNewAddress,
        variant: "outlined",
        "data-testid": "WalletReceiveAddress-new-address",
        children: /*#__PURE__*/jsx(Trans, {
          id: "New Address"
        })
      })]
    }), /*#__PURE__*/jsx(Card, {
      children: /*#__PURE__*/jsx(Grid, {
        item: true,
        xs: 12,
        children: /*#__PURE__*/jsx(Box, {
          display: "flex",
          children: /*#__PURE__*/jsx(Box, {
            flexGrow: 1,
            children: isLoading ? /*#__PURE__*/jsx(Loading, {
              center: true
            }) : /*#__PURE__*/jsx(TextField, {
              label: /*#__PURE__*/jsx(Trans, {
                id: "Address"
              }),
              value: address,
              variant: "filled",
              inputProps: {
                'data-testid': 'WalletReceiveAddress-address',
                readOnly: true
              },
              InputProps: {
                endAdornment: /*#__PURE__*/jsx(InputAdornment, {
                  position: "end",
                  children: /*#__PURE__*/jsx(CopyToClipboard, {
                    value: address,
                    "data-testid": "WalletReceiveAddress-address-copy"
                  })
                })
              },
              fullWidth: true
            })
          })
        })
      })
    })]
  });
}

var StyledGraphContainer$1 = styled.div.withConfig({
  displayName: "WalletGraph__StyledGraphContainer",
  componentId: "sc-bhfizo-0"
})(["position:relative;min-height:80px;height:", ";"], function (_ref) {
  var height = _ref.height;
  return typeof height === 'string' ? height : "".concat(height, "px");
});
var StyledTooltip = styled(Paper).withConfig({
  displayName: "WalletGraph__StyledTooltip",
  componentId: "sc-bhfizo-1"
})(["padding:0.25rem 0.5rem;display:none;"]);
/*
const StyledMaxTypography = styled(Typography)`
  position: absolute;
  left: 0;
  top: 0.1rem;
  font-size: 0.625rem;
`;

const StyledMinTypography = styled(Typography)`
  position: absolute;
  left: 0;
  bottom: 0.1rem;
  font-size: 0.625rem;
`;

const StyledMiddleTypography = styled(Typography)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 0.625rem;
`;
*/
// https://github.com/plouc/nivo/issues/308#issuecomment-451280930

var theme = {
  tooltip: {
    container: {
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  axis: {
    ticks: {
      text: {
        fill: 'rgba(255,255,255,0.5)'
      }
    }
  }
};

/*
type Point = {
  value: number;
  timestamp: number;
};

function aggregatePoints(
  points: Point[],
  interval: number, // interval second
  count: number, // number of intervals
  offset: number = 0,
) {
  let current = Date.now() / 1000;

  const items = [];

  for (let i = -count; i < 0; i += 1) {
    const start = current + i * interval - offset;
    const end = current + (i + 1) * interval - offset;

    const item = {
      start,
      end,
      timestamp: start,
      value: 0,
    };

    points.forEach((pointItem) => {
      const { timestamp, value } = pointItem;

      if (timestamp > start && timestamp <= end) {
        item.value += value;
      }
    });

    items.push(item);
  }

  return items;
}
*/
function generateTransactionGraphData(transactions) {
  // use only confirmed transactions
  var confirmedTransactions = transactions.filter(function (transaction) {
    return transaction.confirmed;
  });

  var _confirmedTransaction = _slicedToArray(confirmedTransactions, 1),
      peakTransaction = _confirmedTransaction[0]; // extract and compute values


  var results = confirmedTransactions.map(function (transaction) {
    var type = transaction.type,
        confirmedAtHeight = transaction.confirmedAtHeight,
        amount = transaction.amount,
        feeAmount = transaction.feeAmount;
    var isOutgoing = [TransactionType.OUTGOING, TransactionType.OUTGOING_TRADE].includes(type);
    var total = BigNumber(amount).plus(BigNumber(feeAmount));
    var value = isOutgoing ? total.negated() : total;
    return {
      value: value,
      timestamp: blockHeightToTimestamp(confirmedAtHeight, peakTransaction)
    };
  }); // group transactions by confirmed_at_height

  var groupedResults = groupBy(results, 'timestamp'); // sum grouped transaction and extract just valuable information

  results = map(groupedResults, function (items, timestamp) {
    var values = items.map(function (item) {
      return item.value;
    });
    return {
      timestamp: Number(timestamp),
      value: BigNumber.sum.apply(BigNumber, _toConsumableArray(values))
    };
  }); // order by timestamp

  results = orderBy(results, ['timestamp'], ['desc']);
  return results;
}

function prepareGraphPoints(balance, transactions, aggregate) {
  if (!transactions || !transactions.length) {
    return [];
  }

  var start = balance;
  var data = generateTransactionGraphData(transactions);

  var _transactions = _slicedToArray(transactions, 1),
      peakTransaction = _transactions[0];
  /*
  if (aggregate) {
    const { interval, count, offset } = aggregate;
    data = aggregatePoints(data, interval, count, offset);
  }
  */


  var points = [{
    x: peakTransaction.confirmedAtHeight,
    y: BigNumber.max(0, mojoToChia(start)).toNumber(),
    // max 21,000,000 safe to number
    tooltip: mojoToChia(balance).toString() // bignumber is not supported by react

  }];
  data.forEach(function (item) {
    var timestamp = item.timestamp,
        value = item.value;
    start = start - value;
    points.push({
      x: timestamp,
      y: BigNumber.max(0, mojoToChia(start)).toNumber(),
      // max 21,000,000 safe to number
      tooltip: mojoToChia(start).toString // bignumber is not supported by react

    });
  });
  return points.reverse();
}

function WalletGraph(props) {
  var walletId = props.walletId,
      height = props.height;

  var _useWalletTransaction = useWalletTransactions(walletId, 50, 0, 'RELEVANCE'),
      transactions = _useWalletTransaction.transactions,
      isWalletTransactionsLoading = _useWalletTransaction.isLoading;

  var _useGetWalletBalanceQ = useGetWalletBalanceQuery({
    walletId: walletId
  }),
      walletBalance = _useGetWalletBalanceQ.data,
      isWalletBalanceLoading = _useGetWalletBalanceQ.isLoading;

  var isLoading = isWalletTransactionsLoading || isWalletBalanceLoading || !transactions;

  if (isLoading || !walletBalance) {
    return null;
  }

  var confirmedTransactions = transactions.filter(function (transaction) {
    return transaction.confirmed;
  });

  if (!confirmedTransactions.length) {
    return null;
  }

  var balance = walletBalance.confirmedWalletBalance;
  var points = prepareGraphPoints(balance, confirmedTransactions);
  var data = [{
    id: 'Points',
    data: points
  }];
  var min = points.length ? Math.min.apply(Math, _toConsumableArray(points.map(function (item) {
    return item.y;
  }))) : 0;
  var max = Math.max.apply(Math, [min].concat(_toConsumableArray(points.map(function (item) {
    return item.y;
  })))); // const middle = max / 2;

  return /*#__PURE__*/jsx(StyledGraphContainer$1, {
    height: height,
    children: /*#__PURE__*/jsx(ResponsiveLine, {
      margin: {
        left: 0,
        top: 2,
        bottom: 2,
        right: 0
      },
      data: data,
      theme: theme,
      yScale: {
        type: 'linear',
        stacked: true,
        min: 0,
        max: max
      },
      tooltip: function tooltip(_ref2) {
        var _point$data;

        var point = _ref2.point;
        return /*#__PURE__*/jsx(StyledTooltip, {
          children: point === null || point === void 0 ? void 0 : (_point$data = point.data) === null || _point$data === void 0 ? void 0 : _point$data.tooltip
        });
      },
      xScale: {
        type: 'point'
      },
      colors: {
        scheme: 'accent'
      },
      axisTop: null,
      axisRight: null,
      axisBottom: null
      /* {
      tickValues: "every 1 second",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: "%S.%L",
      legend: "Time",
      legendOffset: 36,
      legendPosition: "middle"
      } */
      ,
      axisLeft: null,
      pointSize: 0,
      pointBorderWidth: 0,
      useMesh: true,
      curve: "monotoneX",
      defs: [linearGradientDef('gradientA', [{
        offset: 0,
        color: 'inherit'
      }, {
        offset: 100,
        color: 'inherit',
        opacity: 0
      }])],
      fill: [{
        match: '*',
        id: 'gradientA'
      }],
      areaOpacity: 0.3,
      enableGridX: false,
      enableGridY: false,
      enableArea: true
    })
  });
}
WalletGraph.defaultProps = {
  height: 150
};

function useWalletHumanValue(wallet, value, unit) {
  var _useLocale = useLocale(),
      _useLocale2 = _slicedToArray(_useLocale, 1),
      locale = _useLocale2[0];

  return useMemo(function () {
    if (wallet && value !== undefined) {
      var localisedValue = wallet.type === WalletType.CAT ? mojoToCATLocaleString(value, locale) : mojoToChiaLocaleString(value, locale);
      return "".concat(localisedValue, " ").concat(unit);
    }

    return '';
  }, [wallet, value, unit, locale]);
}

var StyledGraphContainer = styled.div.withConfig({
  displayName: "WalletCardTotalBalance__StyledGraphContainer",
  componentId: "sc-1qbdc7v-0"
})(["margin-left:-1rem;margin-right:-1rem;margin-top:1rem;margin-bottom:-1rem;position:relative;"]);
function WalletCardTotalBalance(props) {
  var walletId = props.walletId,
      tooltip = props.tooltip;
  var navigate = useNavigate();

  var _useGetCurrentDerivat = useGetCurrentDerivationIndexQuery(),
      data = _useGetCurrentDerivat.data;

  var _useGetWalletBalanceQ = useGetWalletBalanceQuery({
    walletId: walletId
  }, {
    pollingInterval: 10000
  }),
      walletBalance = _useGetWalletBalanceQ.data,
      isLoadingWalletBalance = _useGetWalletBalanceQ.isLoading,
      error = _useGetWalletBalanceQ.error;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      _useWallet$unit = _useWallet.unit,
      unit = _useWallet$unit === void 0 ? '' : _useWallet$unit,
      loading = _useWallet.loading;

  var isLoading = loading || isLoadingWalletBalance;
  var value = walletBalance === null || walletBalance === void 0 ? void 0 : walletBalance.confirmedWalletBalance;
  var humanValue = useWalletHumanValue(wallet, value, unit);
  var hasDerivationIndex = data !== null && data !== undefined;

  function handleDerivationIndex() {
    navigate('/dashboard/settings');
  }

  return /*#__PURE__*/jsxs(CardSimple, {
    loading: isLoading,
    title: /*#__PURE__*/jsx(Trans, {
      id: "Total Balance"
    }),
    tooltip: tooltip,
    value: humanValue,
    error: error,
    actions: hasDerivationIndex && /*#__PURE__*/jsx(Typography, {
      variant: "body2",
      color: "textSecondary",
      onClick: handleDerivationIndex,
      children: /*#__PURE__*/jsxs(Flex, {
        alignItems: "center",
        gap: 1,
        children: [/*#__PURE__*/jsx(Trans, {
          id: "Derivation Index: {0}",
          values: {
            "0": data === null || data === void 0 ? void 0 : data.index
          }
        }), /*#__PURE__*/jsx(TooltipIcon, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it\u2019s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total."
          })
        })]
      })
    }),
    children: [/*#__PURE__*/jsx(Flex, {
      flexGrow: 1
    }), /*#__PURE__*/jsx(StyledGraphContainer, {
      children: /*#__PURE__*/jsx(WalletGraph, {
        walletId: walletId,
        height: 80
      })
    })]
  });
}

function WalletCardSpendableBalance(props) {
  var walletId = props.walletId,
      tooltip = props.tooltip;

  var _useGetWalletBalanceQ = useGetWalletBalanceQuery({
    walletId: walletId
  }, {
    pollingInterval: 10000
  }),
      walletBalance = _useGetWalletBalanceQ.data,
      isLoadingWalletBalance = _useGetWalletBalanceQ.isLoading,
      error = _useGetWalletBalanceQ.error;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      _useWallet$unit = _useWallet.unit,
      unit = _useWallet$unit === void 0 ? '' : _useWallet$unit,
      loading = _useWallet.loading;

  var isLoading = loading || isLoadingWalletBalance;
  var value = walletBalance === null || walletBalance === void 0 ? void 0 : walletBalance.spendableBalance;
  var humanValue = useWalletHumanValue(wallet, value, unit);
  return /*#__PURE__*/jsx(CardSimple, {
    loading: isLoading,
    valueColor: "secondary",
    title: /*#__PURE__*/jsx(Trans, {
      id: "Spendable Balance"
    }),
    tooltip: tooltip,
    value: humanValue,
    error: error
  });
}

function WalletCardPendingTotalBalance(props) {
  var walletId = props.walletId,
      tooltip = props.tooltip;

  var _useGetWalletBalanceQ = useGetWalletBalanceQuery({
    walletId: walletId
  }, {
    pollingInterval: 10000
  }),
      walletBalance = _useGetWalletBalanceQ.data,
      isLoadingWalletBalance = _useGetWalletBalanceQ.isLoading,
      error = _useGetWalletBalanceQ.error;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      _useWallet$unit = _useWallet.unit,
      unit = _useWallet$unit === void 0 ? '' : _useWallet$unit,
      loading = _useWallet.loading;

  var isLoading = loading || isLoadingWalletBalance;
  var value = walletBalance === null || walletBalance === void 0 ? void 0 : walletBalance.pendingTotalBalance;
  var humanValue = useWalletHumanValue(wallet, value, unit);
  return /*#__PURE__*/jsx(CardSimple, {
    loading: isLoading,
    valueColor: "secondary",
    title: /*#__PURE__*/jsx(Trans, {
      id: "Pending Total Balance"
    }),
    tooltip: tooltip,
    value: humanValue,
    error: error
  });
}

function WalletCardPendingBalance(props) {
  var walletId = props.walletId,
      tooltip = props.tooltip;

  var _useGetWalletBalanceQ = useGetWalletBalanceQuery({
    walletId: walletId
  }, {
    pollingInterval: 10000
  }),
      walletBalance = _useGetWalletBalanceQ.data,
      isLoadingWalletBalance = _useGetWalletBalanceQ.isLoading,
      error = _useGetWalletBalanceQ.error;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      _useWallet$unit = _useWallet.unit,
      unit = _useWallet$unit === void 0 ? '' : _useWallet$unit,
      loading = _useWallet.loading;

  var isLoading = loading || isLoadingWalletBalance;
  var value = walletBalance === null || walletBalance === void 0 ? void 0 : walletBalance.pendingBalance;
  var humanValue = useWalletHumanValue(wallet, value, unit);
  return /*#__PURE__*/jsx(CardSimple, {
    loading: isLoading,
    valueColor: "secondary",
    title: /*#__PURE__*/jsx(Trans, {
      id: "Pending Balance"
    }),
    tooltip: tooltip,
    value: humanValue,
    error: error
  });
}

function WalletCardPendingChange(props) {
  var walletId = props.walletId,
      tooltip = props.tooltip;

  var _useGetWalletBalanceQ = useGetWalletBalanceQuery({
    walletId: walletId
  }, {
    pollingInterval: 10000
  }),
      walletBalance = _useGetWalletBalanceQ.data,
      isLoadingWalletBalance = _useGetWalletBalanceQ.isLoading,
      error = _useGetWalletBalanceQ.error;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      _useWallet$unit = _useWallet.unit,
      unit = _useWallet$unit === void 0 ? '' : _useWallet$unit,
      loading = _useWallet.loading;

  var isLoading = loading || isLoadingWalletBalance;
  var value = walletBalance === null || walletBalance === void 0 ? void 0 : walletBalance.pendingChange;
  var humanValue = useWalletHumanValue(wallet, value, unit);
  return /*#__PURE__*/jsx(CardSimple, {
    loading: isLoading,
    valueColor: "secondary",
    title: /*#__PURE__*/jsx(Trans, {
      id: "Pending Change"
    }),
    tooltip: tooltip,
    value: humanValue,
    error: error
  });
}

function WalletCards(props) {
  var walletId = props.walletId,
      totalBalanceTooltip = props.totalBalanceTooltip,
      spendableBalanceTooltip = props.spendableBalanceTooltip,
      pendingTotalBalanceTooltip = props.pendingTotalBalanceTooltip,
      pendingBalanceTooltip = props.pendingBalanceTooltip,
      pendingChangeTooltip = props.pendingChangeTooltip;
  return /*#__PURE__*/jsx("div", {
    children: /*#__PURE__*/jsxs(Grid, {
      spacing: 2,
      alignItems: "stretch",
      container: true,
      children: [/*#__PURE__*/jsx(Grid, {
        xs: 12,
        lg: 4,
        item: true,
        children: /*#__PURE__*/jsx(WalletCardTotalBalance, {
          walletId: walletId,
          tooltip: totalBalanceTooltip
        })
      }), /*#__PURE__*/jsx(Grid, {
        xs: 12,
        lg: 8,
        item: true,
        children: /*#__PURE__*/jsxs(Grid, {
          spacing: 2,
          alignItems: "stretch",
          container: true,
          children: [/*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(WalletCardSpendableBalance, {
              walletId: walletId,
              tooltip: spendableBalanceTooltip
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(WalletCardPendingTotalBalance, {
              walletId: walletId,
              tooltip: pendingTotalBalanceTooltip
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(WalletCardPendingBalance, {
              walletId: walletId,
              tooltip: pendingBalanceTooltip
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(WalletCardPendingChange, {
              walletId: walletId,
              tooltip: pendingChangeTooltip
            })
          })]
        })
      })]
    })
  });
}
WalletCards.defaultProps = {
  totalBalanceTooltip: undefined,
  spendableBalanceTooltip: undefined,
  pendingTotalBalanceTooltip: undefined,
  pendingBalanceTooltip: undefined,
  pendingChangeTooltip: undefined
};

function getWalletSyncingStatus(walletState) {
  var syncing = walletState.syncing,
      synced = walletState.synced;

  if (syncing) {
    return SyncingStatus.SYNCING;
  } else if (synced) {
    return SyncingStatus.SYNCED;
  }

  return SyncingStatus.NOT_SYNCED;
}

function useWalletState() {
  var _useGetSyncStatusQuer = useGetSyncStatusQuery({}, {
    pollingInterval: 10000
  }),
      walletState = _useGetSyncStatusQuer.data,
      isLoading = _useGetSyncStatusQuer.isLoading;

  return {
    isLoading: isLoading,
    state: walletState && getWalletSyncingStatus(walletState)
  };
}

var _excluded$3 = ["success", "message"];

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function WalletSendTransactionResultDialogTitle(success, message) {
  if (success) {
    return /*#__PURE__*/jsx(Trans, {
      id: "Success"
    });
  } else {
    if (message === "INVALID_FEE_TOO_CLOSE_TO_ZERO" || message === "INVALID_FEE_LOW_FEE") {
      return /*#__PURE__*/jsx(Trans, {
        id: "Mempool Full"
      });
    }
  }

  return undefined;
}

function WalletSendTransactionResultDialogContent(success, message) {
  if (success) {
    return message !== null && message !== void 0 ? message : /*#__PURE__*/jsx(Trans, {
      id: "Transaction has successfully been sent to a full node and included in the mempool."
    });
  } else {
    if (message === "INVALID_FEE_TOO_CLOSE_TO_ZERO" || message === "INVALID_FEE_LOW_FEE") {
      return /*#__PURE__*/jsxs(Flex, {
        flexDirection: "column",
        gap: 3,
        children: [/*#__PURE__*/jsx(Flex, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available."
          })
        }), /*#__PURE__*/jsx(Flex, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee."
          })
        })]
      });
    }
  }

  return undefined;
}

function CreateWalletSendTransactionResultDialog(props) {
  var success = props.success,
      message = props.message,
      rest = _objectWithoutProperties(props, _excluded$3);

  var title = WalletSendTransactionResultDialogTitle(success, message);
  var content = WalletSendTransactionResultDialogContent(success, message);

  if (title && content) {
    return /*#__PURE__*/jsx(AlertDialog, _objectSpread$4(_objectSpread$4({
      title: title
    }, rest), {}, {
      children: content
    }));
  }

  return undefined;
}

function WalletCATSend(props) {
  var walletId = props.walletId;
  var openDialog = useOpenDialog();

  var _useFarmBlockMutation = useFarmBlockMutation(),
      _useFarmBlockMutation2 = _slicedToArray(_useFarmBlockMutation, 1),
      farmBlock = _useFarmBlockMutation2[0];

  var _useSpendCATMutation = useSpendCATMutation(),
      _useSpendCATMutation2 = _slicedToArray(_useSpendCATMutation, 2),
      spendCAT = _useSpendCATMutation2[0],
      isSpendCatLoading = _useSpendCATMutation2[1].isLoading;

  var _useWalletState = useWalletState(),
      state = _useWalletState.state;

  var currencyCode = useCurrencyCode();
  var isSimulator = useIsSimulator();
  var retireAddress = useMemo(function () {
    if (!currencyCode) {
      return undefined;
    }

    return toBech32m('0000000000000000000000000000000000000000000000000000000000000000', currencyCode);
  }, [currencyCode]);
  var methods = useForm({
    defaultValues: {
      address: '',
      amount: '',
      fee: '',
      memo: ''
    }
  });
  var isSubmitting = methods.formState.isSubmitting;
  var addressValue = useWatch({
    control: methods.control,
    name: 'address'
  });

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      unit = _useWallet.unit,
      loading = _useWallet.loading;

  function farm() {
    return _farm.apply(this, arguments);
  }

  function _farm() {
    _farm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!addressValue) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return farmBlock({
                address: addressValue
              }).unwrap();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _farm.apply(this, arguments);
  }

  var canSubmit = wallet && !isSpendCatLoading && !loading;

  function handleSubmit(_x) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(data) {
      var _wallet$meta;

      var assetId, amount, fee, address, colour_id, amountValue, feeValue, memo, memos, queryData, response, result, resultDialog, _result$message;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              assetId = wallet === null || wallet === void 0 ? void 0 : (_wallet$meta = wallet.meta) === null || _wallet$meta === void 0 ? void 0 : _wallet$meta.assetId;

              if (!(state !== SyncingStatus.SYNCED)) {
                _context2.next = 3;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please finish syncing before making a transaction"));

            case 3:
              if (canSubmit) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              amount = data.amount.trim();

              if (isNumeric(amount)) {
                _context2.next = 8;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please enter a valid numeric amount"));

            case 8:
              fee = data.fee.trim() || '0';

              if (isNumeric(fee)) {
                _context2.next = 11;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please enter a valid numeric fee"));

            case 11:
              address = data.address;

              if (address === 'retire' && retireAddress) {
                address = retireAddress;
              }

              if (!address.includes('colour')) {
                _context2.next = 15;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Cannot send chia to coloured address. Please enter a chia address."));

            case 15:
              if (!(address.includes('chia_addr') || address.includes('colour_desc'))) {
                _context2.next = 17;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Recipient address is not a coloured wallet address. Please enter a coloured wallet address"));

            case 17:
              if (!(address.slice(0, 14) === 'colour_addr://')) {
                _context2.next = 22;
                break;
              }

              colour_id = address.slice(14, 78);
              address = address.slice(79);

              if (!(colour_id !== assetId)) {
                _context2.next = 22;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Error the entered address appears to be for a different colour."));

            case 22:
              if (address.slice(0, 12) === 'chia_addr://') {
                address = address.slice(12);
              }

              if (address.startsWith('0x') || address.startsWith('0X')) {
                address = address.slice(2);
              }

              amountValue = catToMojo(amount);
              feeValue = chiaToMojo(fee);
              memo = data.memo.trim();
              memos = memo ? [memo] : undefined;
              queryData = {
                walletId: walletId,
                address: address,
                amount: amountValue,
                fee: feeValue,
                waitForConfirmation: true
              };

              if (memos) {
                queryData.memos = memos;
              }

              _context2.next = 32;
              return spendCAT(queryData).unwrap();

            case 32:
              response = _context2.sent;
              result = getTransactionResult(response.transaction);
              resultDialog = CreateWalletSendTransactionResultDialog({
                success: result.success,
                message: result.message
              });

              if (!resultDialog) {
                _context2.next = 40;
                break;
              }

              _context2.next = 38;
              return openDialog(resultDialog);

            case 38:
              _context2.next = 41;
              break;

            case 40:
              throw new Error((_result$message = result.message) !== null && _result$message !== void 0 ? _result$message : 'Something went wrong');

            case 41:
              methods.reset();

            case 42:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  return /*#__PURE__*/jsx(Form, {
    methods: methods,
    onSubmit: handleSubmit,
    children: /*#__PURE__*/jsxs(Flex, {
      gap: 2,
      flexDirection: "column",
      children: [/*#__PURE__*/jsxs(Typography, {
        variant: "h6",
        children: [/*#__PURE__*/jsx(Trans, {
          id: "Create Transaction"
        }), "\xA0", /*#__PURE__*/jsx(TooltipIcon, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute."
          })
        })]
      }), /*#__PURE__*/jsx(Card, {
        children: /*#__PURE__*/jsxs(Grid, {
          spacing: 2,
          container: true,
          children: [/*#__PURE__*/jsx(Grid, {
            xs: 12,
            item: true,
            children: /*#__PURE__*/jsx(TextField$1, {
              name: "address",
              variant: "filled",
              color: "secondary",
              fullWidth: true,
              disabled: isSubmitting,
              label: /*#__PURE__*/jsx(Trans, {
                id: "Address / Puzzle hash"
              }),
              "data-testid": "WalletCATSend-address",
              required: true
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(TextFieldNumber, {
              id: "filled-secondary",
              variant: "filled",
              color: "secondary",
              name: "amount",
              disabled: isSubmitting,
              label: /*#__PURE__*/jsx(Trans, {
                id: "Amount"
              }),
              currency: unit,
              "data-testid": "WalletCATSend-amount",
              fullWidth: true,
              required: true
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(Fee, {
              id: "filled-secondary",
              variant: "filled",
              name: "fee",
              color: "secondary",
              disabled: isSubmitting,
              label: /*#__PURE__*/jsx(Trans, {
                id: "Fee"
              }),
              "data-testid": "WalletCATSend-fee",
              fullWidth: true
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            item: true,
            children: /*#__PURE__*/jsx(AdvancedOptions, {
              children: /*#__PURE__*/jsx(TextField$1, {
                name: "memo",
                variant: "filled",
                color: "secondary",
                fullWidth: true,
                disabled: isSubmitting,
                label: /*#__PURE__*/jsx(Trans, {
                  id: "Memo"
                }),
                "data-testid": "WalletCATSend-memo"
              })
            })
          })]
        })
      }), /*#__PURE__*/jsxs(Flex, {
        justifyContent: "flex-end",
        gap: 1,
        children: [isSimulator && /*#__PURE__*/jsx(Button, {
          onClick: farm,
          variant: "outlined",
          "data-testid": "WalletCATSend-farm",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Farm"
          })
        }), /*#__PURE__*/jsx(ButtonLoading, {
          variant: "contained",
          color: "primary",
          type: "submit",
          disabled: !canSubmit,
          loading: isSpendCatLoading,
          "data-testid": "WalletCATSend-send",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Send"
          })
        })]
      })]
    })
  });
}

function getWalletPrimaryTitle(wallet) {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'Chia';

    default:
      return wallet.name;
  }
}

var _excluded$2 = ["walletId"];

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function WalletName$1(props) {
  var walletId = props.walletId,
      rest = _objectWithoutProperties(props, _excluded$2);

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      loading = _useWallet.loading;

  if (loading || !wallet) {
    return null;
  }

  var primaryTitle = getWalletPrimaryTitle(wallet);
  return /*#__PURE__*/jsx(Typography, _objectSpread$3(_objectSpread$3({}, rest), {}, {
    children: primaryTitle
  }));
}

function WalletHeader(props) {
  var walletId = props.walletId,
      actions = props.actions,
      tab = props.tab,
      onTabChange = props.onTabChange;
  var openDialog = useOpenDialog();

  var _useDeleteUnconfirmed = useDeleteUnconfirmedTransactionsMutation(),
      _useDeleteUnconfirmed2 = _slicedToArray(_useDeleteUnconfirmed, 1),
      deleteUnconfirmedTransactions = _useDeleteUnconfirmed2[0];

  function handleDeleteUnconfirmedTransactions() {
    return _handleDeleteUnconfirmedTransactions.apply(this, arguments);
  }

  function _handleDeleteUnconfirmedTransactions() {
    _handleDeleteUnconfirmedTransactions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return openDialog( /*#__PURE__*/jsx(ConfirmDialog, {
                title: /*#__PURE__*/jsx(Trans, {
                  id: "Confirmation"
                }),
                confirmTitle: /*#__PURE__*/jsx(Trans, {
                  id: "Delete"
                }),
                confirmColor: "danger",
                onConfirm: function onConfirm() {
                  return deleteUnconfirmedTransactions({
                    walletId: walletId
                  }).unwrap();
                },
                children: /*#__PURE__*/jsx(Trans, {
                  id: "Are you sure you want to delete unconfirmed transactions?"
                })
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleDeleteUnconfirmedTransactions.apply(this, arguments);
  }

  return /*#__PURE__*/jsxs(Flex, {
    flexDirection: "column",
    gap: 2,
    children: [/*#__PURE__*/jsx(WalletName$1, {
      walletId: walletId,
      variant: "h5"
    }), /*#__PURE__*/jsxs(Flex, {
      gap: 1,
      alignItems: "center",
      children: [/*#__PURE__*/jsx(Flex, {
        flexGrow: 1,
        gap: 1,
        children: /*#__PURE__*/jsxs(Tabs, {
          value: tab,
          onChange: function onChange(_event, newValue) {
            return onTabChange(newValue);
          },
          textColor: "primary",
          indicatorColor: "primary",
          children: [/*#__PURE__*/jsx(Tab, {
            value: "summary",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Summary"
            }),
            "data-testid": "WalletHeader-tab-summary"
          }), /*#__PURE__*/jsx(Tab, {
            value: "send",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Send"
            }),
            "data-testid": "WalletHeader-tab-send"
          }), /*#__PURE__*/jsx(Tab, {
            value: "receive",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Receive"
            }),
            "data-testid": "WalletHeader-tab-receive"
          })]
        })
      }), /*#__PURE__*/jsx(Flex, {
        gap: 1,
        alignItems: "center",
        children: /*#__PURE__*/jsx(DropdownActions, {
          label: /*#__PURE__*/jsx(Trans, {
            id: "Actions"
          }),
          variant: "outlined",
          children: function children(_ref) {
            var onClose = _ref.onClose;
            return /*#__PURE__*/jsxs(Fragment, {
              children: [/*#__PURE__*/jsxs(MenuItem, {
                onClick: function onClick() {
                  onClose();
                  handleDeleteUnconfirmedTransactions();
                },
                children: [/*#__PURE__*/jsx(ListItemIcon, {
                  children: /*#__PURE__*/jsx(Delete, {})
                }), /*#__PURE__*/jsx(Typography, {
                  variant: "inherit",
                  noWrap: true,
                  children: /*#__PURE__*/jsx(Trans, {
                    id: "Delete Unconfirmed Transactions"
                  })
                })]
              }), actions === null || actions === void 0 ? void 0 : actions({
                onClose: onClose
              })]
            });
          }
        })
      })]
    })]
  });
}

function WalletRenameDialog(props) {
  var onClose = props.onClose,
      open = props.open,
      name = props.name,
      onSave = props.onSave;
  var openDialog = useOpenDialog();
  var methods = useForm({
    defaultValues: {
      name: name
    }
  });
  var isSubmitting = methods.formState.isSubmitting;

  function handleCancel() {
    onClose(false);
  }

  function handleSubmit(_x) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(values) {
      var newName;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newName = values.name;

              if (newName) {
                _context.next = 4;
                break;
              }

              openDialog( /*#__PURE__*/jsx(AlertDialog, {
                children: /*#__PURE__*/jsx(Trans, {
                  id: "Please enter valid wallet name"
                })
              }));
              return _context.abrupt("return");

            case 4:
              _context.next = 6;
              return onSave(newName);

            case 6:
              onClose(true);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  return /*#__PURE__*/jsxs(Dialog, {
    onClose: handleCancel,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    maxWidth: "md",
    open: open,
    children: [/*#__PURE__*/jsx(DialogTitle, {
      id: "alert-dialog-title",
      children: /*#__PURE__*/jsx(Trans, {
        id: "Rename Wallet"
      })
    }), /*#__PURE__*/jsxs(Form, {
      methods: methods,
      onSubmit: handleSubmit,
      children: [/*#__PURE__*/jsx(DialogContent, {
        dividers: true,
        children: /*#__PURE__*/jsx(Flex, {
          flexDirection: "column",
          gap: 2,
          children: /*#__PURE__*/jsx(TextField$1, {
            name: "name",
            variant: "outlined",
            label: /*#__PURE__*/jsx(Trans, {
              id: "Nickname"
            }),
            fullWidth: true
          })
        })
      }), /*#__PURE__*/jsxs(DialogActions, {
        children: [/*#__PURE__*/jsx(Button$1, {
          onClick: handleCancel,
          color: "secondary",
          variant: "outlined",
          autoFocus: true,
          children: /*#__PURE__*/jsx(Trans, {
            id: "Cancel"
          })
        }), /*#__PURE__*/jsx(ButtonLoading, {
          type: "submit",
          color: "primary",
          variant: "contained",
          loading: isSubmitting,
          children: /*#__PURE__*/jsx(Trans, {
            id: "Save"
          })
        })]
      })]
    })]
  });
}
WalletRenameDialog.defaultProps = {
  open: false,
  onClose: function onClose() {}
};

function WalletCATTAILDialog(props) {
  var _wallet$meta, _wallet$meta2, _wallet$meta3;

  var onClose = props.onClose,
      open = props.open,
      walletId = props.walletId;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      loading = _useWallet.loading;

  function handleClose() {
    onClose(false);
  }

  return /*#__PURE__*/jsxs(Dialog, {
    onClose: handleClose,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    maxWidth: "md",
    open: open,
    fullWidth: true,
    children: [/*#__PURE__*/jsx(DialogTitle, {
      id: "alert-dialog-title",
      children: /*#__PURE__*/jsx(Trans, {
        id: "Asset Id"
      })
    }), /*#__PURE__*/jsxs(DialogContent, {
      dividers: true,
      children: [loading && /*#__PURE__*/jsx(Loading, {
        center: true
      }), !!wallet && /*#__PURE__*/jsxs(Flex, {
        flexDirection: "column",
        gap: 1,
        children: [/*#__PURE__*/jsx(Box, {
          flexGrow: 1,
          children: /*#__PURE__*/jsx(TextField, {
            label: /*#__PURE__*/jsx(Trans, {
              id: "Asset Id"
            }),
            value: (_wallet$meta = wallet.meta) === null || _wallet$meta === void 0 ? void 0 : _wallet$meta.assetId,
            variant: "filled",
            InputProps: {
              readOnly: true,
              endAdornment: /*#__PURE__*/jsx(InputAdornment, {
                position: "end",
                children: /*#__PURE__*/jsx(CopyToClipboard, {
                  value: (_wallet$meta2 = wallet.meta) === null || _wallet$meta2 === void 0 ? void 0 : _wallet$meta2.assetId
                })
              })
            },
            fullWidth: true,
            multiline: true
          })
        }), /*#__PURE__*/jsx(Link, {
          href: "https://www.taildatabase.com/tail/".concat((_wallet$meta3 = wallet.meta) === null || _wallet$meta3 === void 0 ? void 0 : _wallet$meta3.assetId),
          target: "_blank",
          variant: "body2",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Search on Tail Database"
          })
        })]
      })]
    }), /*#__PURE__*/jsx(DialogActions, {
      children: /*#__PURE__*/jsx(Button, {
        onClick: handleClose,
        color: "primary",
        variant: "contained",
        children: /*#__PURE__*/jsx(Trans, {
          id: "OK"
        })
      })
    })]
  });
}
WalletCATTAILDialog.defaultProps = {
  open: false,
  onClose: function onClose() {}
};

function WalletCAT(props) {
  var walletId = props.walletId;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      loading = _useWallet.loading;

  var _useGetCatListQuery = useGetCatListQuery(),
      _useGetCatListQuery$d = _useGetCatListQuery.data,
      catList = _useGetCatListQuery$d === void 0 ? [] : _useGetCatListQuery$d,
      isCatListLoading = _useGetCatListQuery.isLoading;

  var navigate = useNavigate$1();
  var openDialog = useOpenDialog();

  var _useSetCATNameMutatio = useSetCATNameMutation(),
      _useSetCATNameMutatio2 = _slicedToArray(_useSetCATNameMutatio, 1),
      setCATName = _useSetCATNameMutatio2[0];

  var _useState = useState('summary'),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTab = _useState2[0],
      setSelectedTab = _useState2[1];

  function handleRename() {
    if (!wallet) {
      return;
    }

    var name = wallet.name;
    openDialog( /*#__PURE__*/jsx(WalletRenameDialog, {
      name: name,
      onSave: function onSave(newName) {
        return setCATName({
          walletId: walletId,
          name: newName
        }).unwrap();
      }
    }));
  }

  function handleShowTAIL() {
    openDialog( /*#__PURE__*/jsx(WalletCATTAILDialog, {
      walletId: walletId
    }));
  }

  function handleCreateOffer() {
    navigate('/dashboard/offers/create', {
      state: {
        walletId: walletId,
        walletType: WalletType.CAT,
        referrerPath: location.hash.split('#').slice(-1)[0]
      }
    });
  }

  if (loading || isCatListLoading) {
    return /*#__PURE__*/jsx(Loading, {
      center: true
    });
  }

  if (!wallet) {
    return /*#__PURE__*/jsx(Alert, {
      severity: "error",
      children: /*#__PURE__*/jsx(Trans, {
        id: "Wallet does not exists"
      })
    });
  }

  var token = catList.find(function (item) {
    var _wallet$meta;

    return item.assetId === ((_wallet$meta = wallet.meta) === null || _wallet$meta === void 0 ? void 0 : _wallet$meta.assetId);
  });
  var canRename = !token;
  return /*#__PURE__*/jsxs(Flex, {
    flexDirection: "column",
    gap: 2.5,
    children: [/*#__PURE__*/jsx(WalletHeader, {
      walletId: walletId,
      tab: selectedTab,
      onTabChange: setSelectedTab,
      actions: function actions(_ref) {
        var onClose = _ref.onClose;
        return /*#__PURE__*/jsxs(Fragment, {
          children: [canRename && /*#__PURE__*/jsxs(MenuItem, {
            onClick: function onClick() {
              onClose();
              handleRename();
            },
            children: [/*#__PURE__*/jsx(ListItemIcon, {
              children: /*#__PURE__*/jsx(Edit, {})
            }), /*#__PURE__*/jsx(Typography, {
              variant: "inherit",
              noWrap: true,
              children: /*#__PURE__*/jsx(Trans, {
                id: "Rename Wallet"
              })
            })]
          }), /*#__PURE__*/jsxs(MenuItem, {
            onClick: function onClick() {
              onClose();
              handleShowTAIL();
            },
            children: [/*#__PURE__*/jsx(ListItemIcon, {
              children: /*#__PURE__*/jsx(Fingerprint, {})
            }), /*#__PURE__*/jsx(Typography, {
              variant: "inherit",
              noWrap: true,
              children: /*#__PURE__*/jsx(Trans, {
                id: "Show Asset Id"
              })
            })]
          }), /*#__PURE__*/jsxs(MenuItem, {
            onClick: function onClick() {
              onClose();
              handleCreateOffer();
            },
            children: [/*#__PURE__*/jsx(ListItemIcon, {
              children: /*#__PURE__*/jsx(Offers, {})
            }), /*#__PURE__*/jsx(Typography, {
              variant: "inherit",
              noWrap: true,
              children: /*#__PURE__*/jsx(Trans, {
                id: "Create Offer"
              })
            })]
          })]
        });
      }
    }), /*#__PURE__*/jsx(Box, {
      display: selectedTab === 'summary' ? 'block' : 'none',
      children: /*#__PURE__*/jsxs(Flex, {
        flexDirection: "column",
        gap: 4,
        children: [/*#__PURE__*/jsx(WalletCards, {
          walletId: walletId
        }), /*#__PURE__*/jsx(WalletHistory, {
          walletId: walletId
        })]
      })
    }), /*#__PURE__*/jsx(Box, {
      display: selectedTab === 'send' ? 'block' : 'none',
      children: /*#__PURE__*/jsx(WalletCATSend, {
        walletId: walletId
      })
    }), /*#__PURE__*/jsx(Box, {
      display: selectedTab === 'receive' ? 'block' : 'none',
      children: /*#__PURE__*/jsx(WalletReceiveAddress, {
        walletId: walletId
      })
    })]
  });
}

function WalletStandardCards(props) {
  var walletId = props.walletId;
  return /*#__PURE__*/jsx(WalletCards, {
    walletId: walletId,
    totalBalanceTooltip: /*#__PURE__*/jsx(Trans, {
      id: "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions."
    }),
    spendableBalanceTooltip: /*#__PURE__*/jsx(Trans, {
      id: "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain."
    }),
    pendingTotalBalanceTooltip: /*#__PURE__*/jsx(Trans, {
      id: "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed."
    }),
    pendingBalanceTooltip: /*#__PURE__*/jsx(Trans, {
      id: "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards."
    }),
    pendingChangeTooltip: /*#__PURE__*/jsx(Trans, {
      id: "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet."
    })
  });
}

function WalletSend(props) {
  var walletId = props.walletId;
  var isSimulator = useIsSimulator();
  var openDialog = useOpenDialog();

  var _useSendTransactionMu = useSendTransactionMutation(),
      _useSendTransactionMu2 = _slicedToArray(_useSendTransactionMu, 2),
      sendTransaction = _useSendTransactionMu2[0],
      isSendTransactionLoading = _useSendTransactionMu2[1].isLoading;

  var _useFarmBlockMutation = useFarmBlockMutation(),
      _useFarmBlockMutation2 = _slicedToArray(_useFarmBlockMutation, 1),
      farmBlock = _useFarmBlockMutation2[0];

  var methods = useForm({
    defaultValues: {
      address: '',
      amount: '',
      fee: ''
    }
  });
  var addressValue = useWatch({
    control: methods.control,
    name: 'address'
  });

  var _useGetSyncStatusQuer = useGetSyncStatusQuery({}, {
    pollingInterval: 10000
  }),
      walletState = _useGetSyncStatusQuer.data,
      isWalletSyncLoading = _useGetSyncStatusQuer.isLoading;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet;

  if (!wallet || isWalletSyncLoading) {
    return null;
  }

  var syncing = !!(walletState !== null && walletState !== void 0 && walletState.syncing);

  function farm() {
    return _farm.apply(this, arguments);
  }

  function _farm() {
    _farm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!addressValue) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return farmBlock({
                address: addressValue
              }).unwrap();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _farm.apply(this, arguments);
  }

  function handleSubmit(_x) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(data) {
      var amount, fee, address, response, result, resultDialog, _result$message;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!isSendTransactionLoading) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (!syncing) {
                _context2.next = 4;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please finish syncing before making a transaction"));

            case 4:
              amount = data.amount.trim();

              if (isNumeric(amount)) {
                _context2.next = 7;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please enter a valid numeric amount"));

            case 7:
              fee = data.fee.trim() || '0';

              if (isNumeric(fee)) {
                _context2.next = 10;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please enter a valid numeric fee"));

            case 10:
              address = data.address;

              if (!address.includes('colour')) {
                _context2.next = 13;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Cannot send chia to coloured address. Please enter a chia address."));

            case 13:
              if (address.slice(0, 12) === 'chia_addr://') {
                address = address.slice(12);
              }

              if (address.startsWith('0x') || address.startsWith('0X')) {
                address = address.slice(2);
              }

              _context2.next = 17;
              return sendTransaction({
                walletId: walletId,
                address: address,
                amount: chiaToMojo(amount),
                fee: chiaToMojo(fee),
                waitForConfirmation: true
              }).unwrap();

            case 17:
              response = _context2.sent;
              result = getTransactionResult(response.transaction);
              resultDialog = CreateWalletSendTransactionResultDialog({
                success: result.success,
                message: result.message
              });

              if (!resultDialog) {
                _context2.next = 25;
                break;
              }

              _context2.next = 23;
              return openDialog(resultDialog);

            case 23:
              _context2.next = 26;
              break;

            case 25:
              throw new Error((_result$message = result.message) !== null && _result$message !== void 0 ? _result$message : 'Something went wrong');

            case 26:
              methods.reset();

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  return /*#__PURE__*/jsx(Form, {
    methods: methods,
    onSubmit: handleSubmit,
    children: /*#__PURE__*/jsxs(Flex, {
      gap: 2,
      flexDirection: "column",
      children: [/*#__PURE__*/jsxs(Typography, {
        variant: "h6",
        children: [/*#__PURE__*/jsx(Trans, {
          id: "Create Transaction"
        }), "\xA0", /*#__PURE__*/jsx(TooltipIcon, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute."
          })
        })]
      }), /*#__PURE__*/jsx(Card, {
        children: /*#__PURE__*/jsxs(Grid, {
          spacing: 2,
          container: true,
          children: [/*#__PURE__*/jsx(Grid, {
            xs: 12,
            item: true,
            children: /*#__PURE__*/jsx(TextField$1, {
              name: "address",
              variant: "filled",
              color: "secondary",
              fullWidth: true,
              label: /*#__PURE__*/jsx(Trans, {
                id: "Address / Puzzle hash"
              }),
              "data-testid": "WalletSend-address",
              required: true
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(Amount, {
              id: "filled-secondary",
              variant: "filled",
              color: "secondary",
              name: "amount",
              label: /*#__PURE__*/jsx(Trans, {
                id: "Amount"
              }),
              "data-testid": "WalletSend-amount",
              required: true,
              fullWidth: true
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(Fee, {
              id: "filled-secondary",
              variant: "filled",
              name: "fee",
              color: "secondary",
              label: /*#__PURE__*/jsx(Trans, {
                id: "Fee"
              }),
              "data-testid": "WalletSend-fee",
              fullWidth: true
            })
          })]
        })
      }), /*#__PURE__*/jsxs(Flex, {
        justifyContent: "flex-end",
        gap: 1,
        children: [isSimulator && /*#__PURE__*/jsx(Button$1, {
          onClick: farm,
          variant: "outlined",
          "data-testid": "WalletSend-farm",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Farm"
          })
        }), /*#__PURE__*/jsx(ButtonLoading, {
          variant: "contained",
          color: "primary",
          type: "submit",
          loading: isSendTransactionLoading,
          "data-testid": "WalletSend-send",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Send"
          })
        })]
      })]
    })
  });
}

function StandardWallet(props) {
  var walletId = props.walletId; // const showDebugInformation = useShowDebugInformation();

  var navigate = useNavigate$1();

  var _useState = useState('summary'),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTab = _useState2[0],
      setSelectedTab = _useState2[1];

  function handleCreateOffer() {
    navigate('/dashboard/offers/create', {
      state: {
        walletId: walletId,
        walletType: WalletType.STANDARD_WALLET,
        referrerPath: location.hash.split('#').slice(-1)[0]
      }
    });
  }

  return /*#__PURE__*/jsxs(Flex, {
    flexDirection: "column",
    gap: 2.5,
    children: [/*#__PURE__*/jsx(WalletHeader, {
      walletId: walletId,
      tab: selectedTab,
      onTabChange: setSelectedTab,
      actions: function actions(_ref) {
        var onClose = _ref.onClose;
        return /*#__PURE__*/jsx(Fragment, {
          children: /*#__PURE__*/jsxs(MenuItem, {
            onClick: function onClick() {
              onClose();
              handleCreateOffer();
            },
            children: [/*#__PURE__*/jsx(ListItemIcon, {
              children: /*#__PURE__*/jsx(Offers, {})
            }), /*#__PURE__*/jsx(Typography, {
              variant: "inherit",
              noWrap: true,
              children: /*#__PURE__*/jsx(Trans, {
                id: "Create Offer"
              })
            })]
          })
        });
      }
    }), /*#__PURE__*/jsx(Box, {
      display: selectedTab === 'summary' ? 'block' : 'none',
      children: /*#__PURE__*/jsxs(Flex, {
        flexDirection: "column",
        gap: 4,
        children: [/*#__PURE__*/jsx(WalletStandardCards, {
          walletId: walletId
        }), /*#__PURE__*/jsx(WalletHistory, {
          walletId: walletId
        })]
      })
    }), /*#__PURE__*/jsx(Box, {
      display: selectedTab === 'send' ? 'block' : 'none',
      children: /*#__PURE__*/jsx(WalletSend, {
        walletId: walletId
      })
    }), /*#__PURE__*/jsx(Box, {
      display: selectedTab === 'receive' ? 'block' : 'none',
      children: /*#__PURE__*/jsx(WalletReceiveAddress, {
        walletId: walletId
      })
    })]
  });
}

var StyledCardBody = styled(Flex).withConfig({
  displayName: "WalletCreateCard__StyledCardBody",
  componentId: "sc-avz7t5-0"
})(["min-height:200px;"]);
function WalletCreateCard(props) {
  var title = props.title,
      children = props.children,
      icon = props.icon,
      onSelect = props.onSelect,
      disabled = props.disabled,
      description = props.description,
      symbol = props.symbol,
      loadingDescription = props.loadingDescription;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  function handleSelect() {
    return _handleSelect.apply(this, arguments);
  }

  function _handleSelect() {
    _handleSelect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!onSelect || loading)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;
              setLoading(true);
              _context.next = 6;
              return onSelect();

            case 6:
              _context.prev = 6;
              setLoading(false);
              return _context.finish(6);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2,, 6, 9]]);
    }));
    return _handleSelect.apply(this, arguments);
  }

  return /*#__PURE__*/jsxs(Card, {
    onSelect: handleSelect,
    disabled: disabled,
    fullHeight: true,
    children: [/*#__PURE__*/jsxs(StyledCardBody, {
      flexDirection: "column",
      gap: 3,
      children: [/*#__PURE__*/jsxs(Flex, {
        flexDirection: "column",
        gap: 1,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        children: [icon, loading ? /*#__PURE__*/jsx(Loading, {
          center: true,
          children: loadingDescription
        }) : /*#__PURE__*/jsxs(Fragment, {
          children: [symbol && /*#__PURE__*/jsx(Typography, {
            variant: "h5",
            color: "primary",
            children: symbol
          }), /*#__PURE__*/jsx(Typography, {
            variant: "h6",
            children: title
          })]
        })]
      }), /*#__PURE__*/jsx(Typography, {
        variant: "body2",
        color: "textSecondary",
        children: children
      })]
    }), /*#__PURE__*/jsx(Typography, {
      variant: "caption",
      align: "center",
      children: description
    })]
  });
}

function WalletCreateList() {
  var history = useHistory();

  var _useRouteMatch = useRouteMatch(),
      url = _useRouteMatch.url;

  function handleCreateDistributedIdentity() {
    history.push("".concat(url, "/did"));
  }

  function handleCreateCAT() {
    history.push("".concat(url, "/cat"));
  }

  return /*#__PURE__*/jsxs(Flex, {
    flexDirection: "column",
    gap: 3,
    children: [/*#__PURE__*/jsx(Flex, {
      flexGrow: 1,
      children: /*#__PURE__*/jsx(Typography, {
        variant: "h5",
        children: /*#__PURE__*/jsx(Trans, {
          id: "Select Wallet Type"
        })
      })
    }), /*#__PURE__*/jsxs(Grid, {
      spacing: 3,
      alignItems: "stretch",
      container: true,
      children: [/*#__PURE__*/jsx(Grid, {
        xs: 12,
        sm: 6,
        md: 4,
        item: true,
        children: /*#__PURE__*/jsx(WalletCreateCard, {
          onSelect: handleCreateCAT,
          title: /*#__PURE__*/jsx(Trans, {
            id: "Chia Asset Token"
          }),
          icon: /*#__PURE__*/jsx(HomeWork, {
            fontSize: "large",
            color: "primary"
          })
        })
      }), /*#__PURE__*/jsx(Grid, {
        xs: 12,
        sm: 6,
        md: 4,
        item: true,
        children: /*#__PURE__*/jsx(WalletCreateCard, {
          onSelect: handleCreateDistributedIdentity,
          title: /*#__PURE__*/jsx(Trans, {
            id: "Distributed Identity"
          }),
          icon: /*#__PURE__*/jsx(Share, {
            fontSize: "large",
            color: "primary"
          })
        })
      }), /*#__PURE__*/jsx(Grid, {
        xs: 12,
        sm: 6,
        md: 4,
        item: true,
        children: /*#__PURE__*/jsx(WalletCreateCard, {
          title: /*#__PURE__*/jsx(Trans, {
            id: "Rate Limited"
          }),
          icon: /*#__PURE__*/jsx(Speed, {
            fontSize: "large",
            color: "primary"
          }),
          disabled: true
        })
      })]
    })]
  });
  /*
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <div className={classes.cardTitle}>
          <Box display="flex">
            <Box flexGrow={1} className={classes.title}>
              <Typography component="h6" variant="h6">
                <Trans>Select Wallet Type</Trans>
              </Typography>
            </Box>
          </Box>
        </div>
        <List>
          <ListItem button onClick={select_option_cc}>
            <ListItemIcon>
              <InvertColorsIcon />
            </ListItemIcon>
            <ListItemText primary={<Trans>Coloured Coin</Trans>} />
          </ListItem>
          <ListItem button onClick={select_option_rl}>
            <ListItemIcon>
              <InvertColorsIcon />
            </ListItemIcon>
            <ListItemText primary={<Trans>Rate Limited</Trans>} />
          </ListItem>
          <ListItem button onClick={select_option_did}>
            <ListItemIcon>
              <InvertColorsIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Trans>Distributed Identity</Trans>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
  */
}

function WalletCATSelect() {
  var history = useHistory$1();

  var _useRouteMatch = useRouteMatch$1(),
      url = _useRouteMatch.url;

  function handleCreateNew() {
    history.push("".concat(url, "/create"));
  }

  function handleCreateExisting() {
    history.push("".concat(url, "/existing"));
  }

  return /*#__PURE__*/jsxs(Flex, {
    flexDirection: "column",
    gap: 3,
    children: [/*#__PURE__*/jsx(Flex, {
      flexGrow: 1,
      children: /*#__PURE__*/jsx(Back, {
        variant: "h5",
        to: "/dashboard/wallets/create",
        children: /*#__PURE__*/jsx(Trans, {
          id: "Chia Asset Token"
        })
      })
    }), /*#__PURE__*/jsxs(Grid, {
      spacing: 3,
      alignItems: "stretch",
      container: true,
      children: [/*#__PURE__*/jsx(Grid, {
        xs: 12,
        sm: 6,
        md: 4,
        item: true,
        children: /*#__PURE__*/jsx(WalletCreateCard, {
          onSelect: handleCreateNew,
          title: /*#__PURE__*/jsx(Trans, {
            id: "Create New Wallet"
          }),
          icon: /*#__PURE__*/jsx(Add, {
            fontSize: "large",
            color: "primary"
          })
        })
      }), /*#__PURE__*/jsx(Grid, {
        xs: 12,
        sm: 6,
        md: 4,
        item: true,
        children: /*#__PURE__*/jsx(WalletCreateCard, {
          onSelect: handleCreateExisting,
          title: /*#__PURE__*/jsx(Trans, {
            id: "Recovery Wallet"
          }),
          icon: /*#__PURE__*/jsx(Restore, {
            fontSize: "large",
            color: "primary"
          })
        })
      })]
    })]
  });
}

function WalletCATCreateNew() {
  useNavigate();
  var methods = useForm({
    defaultValues: {
      amount: '',
      fee: ''
    }
  });

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useAddCATTokenMutati = useAddCATTokenMutation(),
      _useAddCATTokenMutati2 = _slicedToArray(_useAddCATTokenMutati, 2);
      _useAddCATTokenMutati2[0];
      _useAddCATTokenMutati2[1].isLoading;

  function handleSubmit(_x) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(values) {
      var amount, fee, amountMojos, feeMojos;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                amount = values.amount, fee = values.fee;
                setLoading(true);
                /* fee and amount is optional
                if (//!amount ||
                  // Number(amount) === 0 ||
                  // !Number(amount) ||
                  isNaN(Number(amount))
                ) {
                  dispatch(
                    openDialog(
                      <AlertDialog>
                        <Trans>Please enter a valid numeric amount</Trans>
                      </AlertDialog>,
                    ),
                  );
                  return;
                }
                
                if (fee === '' || isNaN(Number(fee))) {
                  dispatch(
                    openDialog(
                      <AlertDialog>
                        <Trans>Please enter a valid numeric fee</Trans>
                      </AlertDialog>,
                    ),
                  );
                  return;
                }
                */

                amountMojos = chiaToMojo(amount || '0');
                feeMojos = chiaToMojo(fee || '0');
                /*
                const response = await dispatch(create_cc_action(amountMojos, feeMojos));
                if (response && response.data && response.data.success === true) {
                  history.push(`/dashboard/wallets/${response.data.wallet_id}`);
                }
                */
              } finally {
                setLoading(false);
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  return /*#__PURE__*/jsx(Form, {
    methods: methods,
    onSubmit: handleSubmit,
    children: /*#__PURE__*/jsxs(Flex, {
      flexDirection: "column",
      gap: 3,
      children: [/*#__PURE__*/jsx(Back, {
        variant: "h5",
        children: /*#__PURE__*/jsx(Trans, {
          id: "Create New Chia Asset Token Wallet"
        })
      }), /*#__PURE__*/jsx(Card, {
        children: /*#__PURE__*/jsxs(Grid, {
          spacing: 2,
          container: true,
          children: [/*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(Amount, {
              name: "amount",
              variant: "outlined",
              fullWidth: true
            })
          }), /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 6,
            item: true,
            children: /*#__PURE__*/jsx(Fee, {
              variant: "outlined",
              fullWidth: true
            })
          })]
        })
      }), /*#__PURE__*/jsx(Box, {
        children: /*#__PURE__*/jsx(ButtonLoading, {
          type: "submit",
          variant: "contained",
          color: "primary",
          loading: loading,
          children: /*#__PURE__*/jsx(Trans, {
            id: "Create"
          })
        })
      })]
    })
  });
}

function WalletCATCreateExisting() {
  var methods = useForm({
    defaultValues: {
      assetId: '',
      name: '',
      symbol: ''
    }
  });
  var navigate = useNavigate();

  var _useAddCATTokenMutati = useAddCATTokenMutation$1(),
      _useAddCATTokenMutati2 = _slicedToArray(_useAddCATTokenMutati, 2),
      addCATToken = _useAddCATTokenMutati2[0],
      isAddCATTokenLoading = _useAddCATTokenMutati2[1].isLoading;

  var _useWalletState = useWalletState(),
      state = _useWalletState.state;

  function handleSubmit(_x) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(values) {
      var name, assetId, walletId;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name = values.name, assetId = values.assetId;

              if (!isAddCATTokenLoading) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              if (!(state !== SyncingStatus.SYNCED)) {
                _context.next = 5;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please wait for wallet synchronization"));

            case 5:
              if (assetId) {
                _context.next = 7;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please enter a valid asset id"));

            case 7:
              if (name) {
                _context.next = 9;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please enter a valid token name"));

            case 9:
              _context.next = 11;
              return addCATToken({
                name: name,
                assetId: assetId,
                fee: '0'
              }).unwrap();

            case 11:
              walletId = _context.sent;
              navigate("/dashboard/wallets/".concat(walletId));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  return /*#__PURE__*/jsx(Form, {
    methods: methods,
    onSubmit: handleSubmit,
    children: /*#__PURE__*/jsxs(Flex, {
      flexDirection: "column",
      gap: 3,
      children: [/*#__PURE__*/jsx(Back, {
        variant: "h5",
        children: /*#__PURE__*/jsx(Trans, {
          id: "Add Token"
        })
      }), /*#__PURE__*/jsx(Card, {
        children: /*#__PURE__*/jsx(Grid, {
          spacing: 2,
          direction: "column",
          container: true,
          children: /*#__PURE__*/jsx(Grid, {
            xs: 12,
            md: 8,
            lg: 6,
            item: true,
            children: /*#__PURE__*/jsxs(Grid, {
              spacing: 2,
              container: true,
              children: [/*#__PURE__*/jsx(Grid, {
                xs: 12,
                item: true,
                children: /*#__PURE__*/jsx(TextField$1, {
                  name: "name",
                  variant: "outlined",
                  label: /*#__PURE__*/jsx(Trans, {
                    id: "Name"
                  }),
                  fullWidth: true,
                  autoFocus: true
                })
              }), /*#__PURE__*/jsx(Grid, {
                xs: 12,
                item: true,
                children: /*#__PURE__*/jsx(TextField$1, {
                  name: "assetId",
                  variant: "outlined",
                  label: /*#__PURE__*/jsx(Trans, {
                    id: "Asset Id"
                  }),
                  multiline: true,
                  fullWidth: true
                })
              })]
            })
          })
        })
      }), /*#__PURE__*/jsx(Flex, {
        justifyContent: "flex-end",
        children: /*#__PURE__*/jsx(ButtonLoading, {
          type: "submit",
          variant: "contained",
          color: "primary",
          loading: isAddCATTokenLoading,
          children: /*#__PURE__*/jsx(Trans, {
            id: "Add"
          })
        })
      })]
    })
  });
}

function WalletCATList() {
  return /*#__PURE__*/jsxs(Routes, {
    children: [/*#__PURE__*/jsx(Route, {
      element: /*#__PURE__*/jsx(WalletCATSelect, {}),
      index: true
    }), /*#__PURE__*/jsx(Route, {
      path: "create",
      element: /*#__PURE__*/jsx(WalletCATCreateNew, {})
    }), /*#__PURE__*/jsx(Route, {
      path: "existing",
      element: /*#__PURE__*/jsx(WalletCATCreateExisting, {})
    })]
  });
}

function isCATWalletPresent(wallets, token) {
  return !!(wallets !== null && wallets !== void 0 && wallets.find(function (wallet) {
    var _wallet$meta;

    if (wallet.type === WalletType.CAT && ((_wallet$meta = wallet.meta) === null || _wallet$meta === void 0 ? void 0 : _wallet$meta.assetId) === token.assetId) {
      return true;
    }

    return false;
  }));
}

function WalletCATCreateSimple() {
  var navigate = useNavigate$1();
  var showError = useShowError();

  var _useGetWalletsQuery = useGetWalletsQuery(),
      wallets = _useGetWalletsQuery.data,
      isWalletsLoading = _useGetWalletsQuery.isWalletsLoading;

  var _useAddCATTokenMutati = useAddCATTokenMutation$1(),
      _useAddCATTokenMutati2 = _slicedToArray(_useAddCATTokenMutati, 2),
      addCATToken = _useAddCATTokenMutati2[0],
      isAddCATTokenLoading = _useAddCATTokenMutati2[1].isLoading;

  var _useGetCatListQuery = useGetCatListQuery(),
      catList = _useGetCatListQuery.data,
      isCatListLoading = _useGetCatListQuery.isCatListLoading;

  var _useWalletState = useWalletState(),
      state = _useWalletState.state;

  var isLoading = isWalletsLoading || isCatListLoading;

  function handleCreateExisting() {
    navigate("/dashboard/wallets/create/cat/existing");
  }

  function handleCreateNewToken(_x) {
    return _handleCreateNewToken.apply(this, arguments);
  }

  function _handleCreateNewToken() {
    _handleCreateNewToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(token) {
      var name, assetId, walletId;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              name = token.name, assetId = token.assetId;

              if (!isAddCATTokenLoading) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return");

            case 4:
              if (!(state !== SyncingStatus.SYNCED)) {
                _context2.next = 6;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Please wait for wallet synchronization"));

            case 6:
              if (name) {
                _context2.next = 8;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Token has empty name"));

            case 8:
              if (assetId) {
                _context2.next = 10;
                break;
              }

              throw new Error(
              /*i18n*/
              i18n._("Token has empty asset id"));

            case 10:
              _context2.next = 12;
              return addCATToken({
                assetId: assetId,
                name: name,
                fee: '0'
              }).unwrap();

            case 12:
              walletId = _context2.sent;
              navigate("/dashboard/wallets/".concat(walletId));
              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              showError(_context2.t0);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 16]]);
    }));
    return _handleCreateNewToken.apply(this, arguments);
  }

  if (isLoading) {
    return /*#__PURE__*/jsx(Loading, {
      center: true
    });
  }

  return /*#__PURE__*/jsxs(Flex, {
    flexDirection: "column",
    gap: 3,
    children: [/*#__PURE__*/jsx(Flex, {
      flexGrow: 1,
      children: /*#__PURE__*/jsx(Back, {
        variant: "h5",
        to: "/dashboard/wallets",
        children: /*#__PURE__*/jsx(Trans, {
          id: "Add Token"
        })
      })
    }), isLoading ? /*#__PURE__*/jsx(Loading, {
      center: true
    }) : /*#__PURE__*/jsxs(Grid, {
      spacing: 3,
      alignItems: "stretch",
      container: true,
      children: [catList === null || catList === void 0 ? void 0 : catList.map(function (token) {
        var isPresent = isCATWalletPresent(wallets, token);

        function handleSelect() {
          return _handleSelect.apply(this, arguments);
        }

        function _handleSelect() {
          _handleSelect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (isPresent) {
                      _context.next = 3;
                      break;
                    }

                    _context.next = 3;
                    return handleCreateNewToken(token);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          return _handleSelect.apply(this, arguments);
        }

        return /*#__PURE__*/jsx(Grid, {
          xs: 12,
          sm: 6,
          md: 4,
          item: true,
          children: /*#__PURE__*/jsx(WalletCreateCard, {
            onSelect: handleSelect,
            title: token.name,
            symbol: token.symbol,
            disabled: isPresent,
            loadingDescription: /*#__PURE__*/jsx(Trans, {
              id: "Adding {0} token",
              values: {
                "0": token.symbol
              }
            })
          }, token.symbol)
        }, token.assetId);
      }), /*#__PURE__*/jsx(Grid, {
        xs: 12,
        sm: 6,
        md: 4,
        item: true,
        children: /*#__PURE__*/jsx(WalletCreateCard, {
          onSelect: function onSelect() {
            return handleCreateExisting();
          },
          title: /*#__PURE__*/jsx(Trans, {
            id: "Custom"
          }),
          icon: /*#__PURE__*/jsx(Add, {
            fontSize: "large",
            color: "primary"
          })
        })
      })]
    })]
  });
}

function WalletCreate() {
  return /*#__PURE__*/jsxs(Routes, {
    children: [/*#__PURE__*/jsx(Route, {
      element: /*#__PURE__*/jsx(WalletCreateList, {}),
      index: true
    }), /*#__PURE__*/jsx(Route, {
      path: "cat/*",
      element: /*#__PURE__*/jsx(WalletCATList, {})
    }), /*#__PURE__*/jsx(Route, {
      path: "simple",
      element: /*#__PURE__*/jsx(WalletCATCreateSimple, {})
    })]
  });
}

var MnemonicField = function MnemonicField(props) {
  return /*#__PURE__*/jsx(Grid, {
    item: true,
    xs: 2,
    children: /*#__PURE__*/jsx(TextField, {
      variant: "filled",
      margin: "normal",
      color: "primary",
      id: props.id,
      label: props.index,
      name: "email",
      autoComplete: "email",
      value: props.word,
      inputProps: {
        readOnly: true
      },
      fullWidth: true,
      autoFocus: true
    })
  });
};

function WalletAdd() {
  var navigate = useNavigate();

  var _useGenerateMnemonicM = useGenerateMnemonicMutation(),
      _useGenerateMnemonicM2 = _slicedToArray(_useGenerateMnemonicM, 2),
      generateMnemonic = _useGenerateMnemonicM2[0],
      _useGenerateMnemonicM3 = _useGenerateMnemonicM2[1],
      words = _useGenerateMnemonicM3.data,
      isLoading = _useGenerateMnemonicM3.isLoading;

  var _useAddKeyMutation = useAddKeyMutation(),
      _useAddKeyMutation2 = _slicedToArray(_useAddKeyMutation, 2),
      addKey = _useAddKeyMutation2[0],
      isAddKeyLoading = _useAddKeyMutation2[1].isLoading;

  var _useLogInMutation = useLogInMutation(),
      _useLogInMutation2 = _slicedToArray(_useLogInMutation, 2),
      logIn = _useLogInMutation2[0],
      isLogInLoading = _useLogInMutation2[1].isLoading;

  var showError = useShowError();
  useEffectOnce(function () {
    generateMnemonic();
  });
  var isProcessing = isAddKeyLoading || isLogInLoading;

  function handleNext() {
    return _handleNext.apply(this, arguments);
  }

  function _handleNext() {
    _handleNext = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var fingerprint;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!words || isProcessing)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;
              _context.next = 5;
              return addKey({
                mnemonic: words,
                type: 'new_wallet'
              }).unwrap();

            case 5:
              fingerprint = _context.sent;
              _context.next = 8;
              return logIn({
                fingerprint: fingerprint
              }).unwrap();

            case 8:
              navigate('/dashboard/wallets/1');
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              showError(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 11]]);
    }));
    return _handleNext.apply(this, arguments);
  }

  return /*#__PURE__*/jsx(Container, {
    maxWidth: "lg",
    children: /*#__PURE__*/jsxs(Flex, {
      flexDirection: "column",
      gap: 3,
      alignItems: "center",
      children: [/*#__PURE__*/jsx(Logo, {}), /*#__PURE__*/jsx(Typography, {
        variant: "h4",
        component: "h1",
        gutterBottom: true,
        children: /*#__PURE__*/jsx(Trans, {
          id: "New Wallet"
        })
      }), /*#__PURE__*/jsx(Typography, {
        variant: "subtitle1",
        align: "center",
        children: /*#__PURE__*/jsx(Trans, {
          id: "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)"
        })
      }), !isLoading && words ? /*#__PURE__*/jsx(Grid, {
        container: true,
        spacing: 2,
        children: words.map(function (word, index) {
          return /*#__PURE__*/jsx(MnemonicField, {
            word: word,
            id: "id_".concat(index + 1),
            index: index + 1
          }, index);
        })
      }) : /*#__PURE__*/jsx(Loading, {}), /*#__PURE__*/jsx(Container, {
        maxWidth: "xs",
        children: /*#__PURE__*/jsx(ButtonLoading, {
          onClick: handleNext,
          type: "submit",
          variant: "contained",
          color: "primary",
          disabled: !words,
          loading: isProcessing,
          fullWidth: true,
          children: /*#__PURE__*/jsx(Trans, {
            id: "Next"
          })
        })
      })]
    })
  });
}

function MnemonicPaste(props) {
  var onSuccess = props.onSuccess,
      onCancel = props.onCancel;
  var mnemonicListInput;

  function handleSubmit() {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _mnemonicListInput$va, _mnemonicListInput;

      var mnemonicList;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mnemonicList = (_mnemonicListInput$va = (_mnemonicListInput = mnemonicListInput) === null || _mnemonicListInput === void 0 ? void 0 : _mnemonicListInput.value) !== null && _mnemonicListInput$va !== void 0 ? _mnemonicListInput$va : "";
              onSuccess(mnemonicList);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  function handleCancel() {
    return _handleCancel.apply(this, arguments);
  }

  function _handleCancel() {
    _handleCancel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              onCancel();

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _handleCancel.apply(this, arguments);
  }

  function handleKeyDown(_x) {
    return _handleKeyDown.apply(this, arguments);
  }

  function _handleKeyDown() {
    _handleKeyDown = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(e) {
      var keyHandlerMapping, handler;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              keyHandlerMapping = {
                'Enter': handleSubmit,
                'Escape': handleCancel
              };
              handler = keyHandlerMapping[e.key];

              if (!handler) {
                _context3.next = 7;
                break;
              }

              // Disable default event handling to avoid navigation updates
              e.preventDefault();
              e.stopPropagation();
              _context3.next = 7;
              return handler();

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _handleKeyDown.apply(this, arguments);
  }

  return /*#__PURE__*/jsxs(Dialog, {
    open: true,
    "aria-labelledby": "form-dialog-title",
    fullWidth: true,
    maxWidth: 'md',
    onKeyDown: handleKeyDown,
    children: [/*#__PURE__*/jsx(DialogTitle, {
      id: "form-dialog-title",
      children: /*#__PURE__*/jsx(Trans, {
        id: "Paste Mnemonic (24 words)"
      })
    }), /*#__PURE__*/jsx(DialogContent, {
      children: /*#__PURE__*/jsx(TextField, {
        autoFocus: true,
        multiline: true,
        rows: 5,
        color: "secondary",
        margin: "dense",
        id: "mnemonicListInput",
        variant: "filled",
        inputRef: function inputRef(input) {
          return mnemonicListInput = input;
        },
        type: "password",
        fullWidth: true
      })
    }), /*#__PURE__*/jsxs(DialogActions$1, {
      children: [/*#__PURE__*/jsx(Button$1, {
        onClick: handleCancel,
        color: "secondary",
        variant: "contained",
        style: {
          marginBottom: '8px',
          marginRight: '8px'
        },
        children: /*#__PURE__*/jsx(Trans, {
          id: "Cancel"
        })
      }), /*#__PURE__*/jsx(Button$1, {
        onClick: handleSubmit,
        color: "primary",
        variant: "contained",
        style: {
          marginBottom: '8px',
          marginRight: '8px'
        },
        children: /*#__PURE__*/jsx(Trans, {
          id: "Import"
        })
      })]
    })]
  });
}

var emptyMnemonic = Array.from(Array(24).keys()).map(function (i) {
  return {
    word: ''
  };
});
var options = english.map(function (item) {
  return item.word;
});
function WalletImport() {
  var navigate = useNavigate();

  var _useAddKeyMutation = useAddKeyMutation(),
      _useAddKeyMutation2 = _slicedToArray(_useAddKeyMutation, 2),
      addKey = _useAddKeyMutation2[0],
      isAddKeyLoading = _useAddKeyMutation2[1].isLoading;

  var _useLogInMutation = useLogInMutation(),
      _useLogInMutation2 = _slicedToArray(_useLogInMutation, 2),
      logIn = _useLogInMutation2[0],
      isLogInLoading = _useLogInMutation2[1].isLoading;

  var trans = useTrans();
  var openDialog = useOpenDialog();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      mnemonicPasteOpen = _React$useState2[0],
      setMnemonicPasteOpen = _React$useState2[1];

  var isProcessing = isAddKeyLoading || isLogInLoading;
  var methods = useForm({
    defaultValues: {
      mnemonic: emptyMnemonic
    }
  });

  var _useFieldArray = useFieldArray({
    control: methods.control,
    name: 'mnemonic'
  }),
      fields = _useFieldArray.fields,
      replace = _useFieldArray.replace;

  var submitMnemonicPaste = function submitMnemonicPaste(mnemonicList) {
    var mList = mnemonicList.match(/\b(\w+)\b/g);
    var intersection = mList === null || mList === void 0 ? void 0 : mList.filter(function (element) {
      return options.includes(element);
    });

    if (!intersection || intersection.length !== 24) {
      openDialog( /*#__PURE__*/jsx(AlertDialog, {
        children: /*#__PURE__*/jsx(Trans, {
          id: "Your pasted list does not include 24 valid mnemonic words."
        })
      }));
      return;
    }

    var mnemonic = intersection.map(function (word) {
      return {
        word: word
      };
    });
    replace(mnemonic);
    closeMnemonicPaste();
  };

  function closeMnemonicPaste() {
    setMnemonicPasteOpen(false);
  }

  function ActionButtons() {
    return /*#__PURE__*/jsx(Button, {
      onClick: function onClick() {
        return setMnemonicPasteOpen(true);
      },
      variant: "contained",
      disableElevation: true,
      children: /*#__PURE__*/jsx(Trans, {
        id: "Paste Mnemonic"
      })
    });
  }

  function handleSubmit(_x) {
    return _handleSubmit.apply(this, arguments);
  }

  function _handleSubmit() {
    _handleSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(values) {
      var mnemonic, mnemonicWords, hasEmptyWord, fingerprint;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!isProcessing) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              mnemonic = values.mnemonic;
              mnemonicWords = mnemonic.map(function (item) {
                return item.word;
              });
              hasEmptyWord = !!mnemonicWords.filter(function (word) {
                return !word;
              }).length;

              if (!hasEmptyWord) {
                _context.next = 7;
                break;
              }

              throw new Error(trans('Please fill all words'));

            case 7:
              _context.next = 9;
              return addKey({
                mnemonic: mnemonicWords,
                type: 'new_wallet'
              }).unwrap();

            case 9:
              fingerprint = _context.sent;
              _context.next = 12;
              return logIn({
                fingerprint: fingerprint
              }).unwrap();

            case 12:
              navigate('/dashboard/wallets/1');

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _handleSubmit.apply(this, arguments);
  }

  return /*#__PURE__*/jsx(Form, {
    methods: methods,
    onSubmit: handleSubmit,
    children: /*#__PURE__*/jsx(Container, {
      maxWidth: "lg",
      children: /*#__PURE__*/jsxs(Flex, {
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
        children: [/*#__PURE__*/jsx(Logo, {}), /*#__PURE__*/jsx(Typography, {
          variant: "h4",
          component: "h1",
          gutterBottom: true,
          children: /*#__PURE__*/jsx(Trans, {
            id: "Import Wallet from Mnemonics"
          })
        }), /*#__PURE__*/jsx(Typography, {
          variant: "subtitle1",
          align: "center",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet."
          })
        }), /*#__PURE__*/jsx(Grid, {
          container: true,
          spacing: 2,
          children: fields.map(function (field, index) {
            return /*#__PURE__*/jsx(Grid, {
              xs: 2,
              item: true,
              children: /*#__PURE__*/jsx(Autocomplete, {
                options: options,
                name: "mnemonic.".concat(index, ".word"),
                label: index + 1,
                autoFocus: index === 0,
                variant: "filled",
                disableClearable: true
              })
            }, field.id);
          })
        }), /*#__PURE__*/jsx(Container, {
          maxWidth: "xs",
          children: /*#__PURE__*/jsxs(Flex, {
            flexDirection: "column",
            gap: 2,
            children: [/*#__PURE__*/jsx(ButtonLoading, {
              type: "submit",
              variant: "contained",
              color: "primary",
              loading: isProcessing,
              fullWidth: true,
              children: /*#__PURE__*/jsx(Trans, {
                id: "Next"
              })
            }), /*#__PURE__*/jsx(ActionButtons, {}), mnemonicPasteOpen && /*#__PURE__*/jsx(MnemonicPaste, {
              onSuccess: submitMnemonicPaste,
              onCancel: closeMnemonicPaste
            })]
          })
        })]
      })
    })
  });
}

var _excluded$1 = ["wallet", "color"];

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledSymbol = styled(Typography).withConfig({
  displayName: "WalletIcon__StyledSymbol",
  componentId: "sc-14ukpcm-0"
})(["font-size:1rem;"]);
function WalletIcon(props) {
  var wallet = props.wallet,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      rest = _objectWithoutProperties(props, _excluded$1);

  var _useGetCatListQuery = useGetCatListQuery(),
      _useGetCatListQuery$d = _useGetCatListQuery.data,
      catList = _useGetCatListQuery$d === void 0 ? [] : _useGetCatListQuery$d,
      isLoading = _useGetCatListQuery.isLoading;

  var currencyCode = useCurrencyCode();

  if (wallet.type === WalletType.STANDARD_WALLET) {
    return /*#__PURE__*/jsx(StyledSymbol, _objectSpread$2(_objectSpread$2({
      color: color
    }, rest), {}, {
      children: currencyCode
    }));
  }

  if (!isLoading && wallet.type === WalletType.CAT) {
    var token = catList.find(function (token) {
      var _wallet$meta;

      return token.assetId === ((_wallet$meta = wallet.meta) === null || _wallet$meta === void 0 ? void 0 : _wallet$meta.assetId);
    });

    if (token) {
      return /*#__PURE__*/jsx(StyledSymbol, _objectSpread$2(_objectSpread$2({
        color: color
      }, rest), {}, {
        children: token.symbol
      }));
    }
  }

  return null;
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useHiddenWallet() {
  var _useGetLoggedInFinger = useGetLoggedInFingerprintQuery(),
      fingerprint = _useGetLoggedInFinger.data,
      isLoading = _useGetLoggedInFinger.isLoading;

  var _useLocalStorage = useLocalStorage('hiddenWalletsItems', {}),
      _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
      hiddenWalletIds = _useLocalStorage2[0],
      setHiddenWalletIds = _useLocalStorage2[1];

  var hide = useCallback(function (walletId) {
    if (isLoading) {
      throw new Error('Cannot hide wallet while loading');
    }

    setHiddenWalletIds(function (items) {
      var _items$fingerprint;

      var listItems = (_items$fingerprint = items[fingerprint]) !== null && _items$fingerprint !== void 0 ? _items$fingerprint : [];
      return _objectSpread$1(_objectSpread$1({}, items), {}, _defineProperty({}, fingerprint, [].concat(_toConsumableArray(listItems), [walletId])));
    });
  }, [setHiddenWalletIds, fingerprint]);
  var show = useCallback(function (walletId) {
    if (isLoading) {
      throw new Error('Cannot hide wallet while loading');
    }

    setHiddenWalletIds(function (items) {
      var _items$fingerprint2;

      var listItems = (_items$fingerprint2 = items[fingerprint]) !== null && _items$fingerprint2 !== void 0 ? _items$fingerprint2 : [];
      return _objectSpread$1(_objectSpread$1({}, items), {}, _defineProperty({}, fingerprint, listItems.filter(function (id) {
        return id !== walletId;
      })));
    });
  }, [setHiddenWalletIds, fingerprint]);
  var isHidden = useCallback(function (walletId) {
    var _hiddenWalletIds$fing;

    if (isLoading) {
      return true;
    }

    var listItems = (_hiddenWalletIds$fing = hiddenWalletIds[fingerprint]) !== null && _hiddenWalletIds$fing !== void 0 ? _hiddenWalletIds$fing : [];
    return listItems.includes(walletId);
  }, [hiddenWalletIds, fingerprint]);
  return {
    hidden: hiddenWalletIds,
    hide: hide,
    show: show,
    isHidden: isHidden,
    isLoading: isLoading
  };
}

function getWalletTypeOrder(item) {
  switch (item.walletType) {
    case WalletType.STANDARD_WALLET:
      return 0;

    default:
      return 1;
  }
}

function getTypeOrder(item) {
  switch (item.type) {
    case 'WALLET':
      return 0;

    case 'CAT_LIST':
      return 1;

    case 'STRAY_CAT':
      return 2;

    default:
      return 3;
  }
}

function useWalletsList(search, walletTypes) {
  var _useGetWalletsQuery = useGetWalletsQuery(),
      wallets = _useGetWalletsQuery.data,
      isLoadingGetWallets = _useGetWalletsQuery.isLoading;

  var _useGetCatListQuery = useGetCatListQuery(),
      catList = _useGetCatListQuery.data,
      isLoadingGetCatList = _useGetCatListQuery.isLoading;

  var _useGetStrayCatsQuery = useGetStrayCatsQuery(undefined, {
    pollingInterval: 10000
  }),
      strayCats = _useGetStrayCatsQuery.data,
      isLoadingGetStrayCats = _useGetStrayCatsQuery.isLoading;

  var _useHiddenWallet = useHiddenWallet(),
      hidden = _useHiddenWallet.hidden,
      isHidden = _useHiddenWallet.isHidden,
      show = _useHiddenWallet.show,
      hide = _useHiddenWallet.hide,
      isLoadingHiddenWallet = _useHiddenWallet.isLoading;

  var _useAddCATTokenMutati = useAddCATTokenMutation$1(),
      _useAddCATTokenMutati2 = _slicedToArray(_useAddCATTokenMutati, 1),
      addCATToken = _useAddCATTokenMutati2[0];

  var showError = useShowError();
  var isLoading = isLoadingGetWallets || isLoadingGetStrayCats || isLoadingGetCatList || isLoadingHiddenWallet;
  var walletAssetIds = useMemo(function () {
    var ids = new Map();

    if (wallets) {
      wallets.forEach(function (wallet) {
        if (wallet.type === WalletType.CAT) {
          var _wallet$meta;

          ids.set((_wallet$meta = wallet.meta) === null || _wallet$meta === void 0 ? void 0 : _wallet$meta.assetId, wallet.id);
        }
      });
    }

    return ids;
  }, [wallets]);
  var knownCatAssetIds = useMemo(function () {
    var ids = new Set();

    if (catList) {
      catList.forEach(function (cat) {
        return ids.add(cat.assetId);
      });
    }

    return ids;
  }, [catList]);

  function hasCatAssignedWallet(assetId) {
    return walletAssetIds.has(assetId);
  }

  function isHiddenCAT(assetId) {
    if (!walletAssetIds.has(assetId)) {
      return true;
    }

    var walletId = walletAssetIds.get(assetId);
    return isHidden(walletId);
  }

  function getCATName(assetId) {
    var _ref, _catKnown$name;

    if (walletAssetIds.has(assetId)) {
      var _wallet$name;

      var _walletId = walletAssetIds.get(assetId);

      var wallet = wallets === null || wallets === void 0 ? void 0 : wallets.find(function (wallet) {
        return wallet.id === _walletId;
      });
      return (_wallet$name = wallet === null || wallet === void 0 ? void 0 : wallet.name) !== null && _wallet$name !== void 0 ? _wallet$name : assetId;
    }

    var catKnown = catList === null || catList === void 0 ? void 0 : catList.find(function (cat) {
      return cat.assetId === assetId;
    });
    var strayCAT = strayCats === null || strayCats === void 0 ? void 0 : strayCats.find(function (cat) {
      return cat.assetId === assetId;
    });
    return (_ref = (_catKnown$name = catKnown === null || catKnown === void 0 ? void 0 : catKnown.name) !== null && _catKnown$name !== void 0 ? _catKnown$name : strayCAT === null || strayCAT === void 0 ? void 0 : strayCAT.name) !== null && _ref !== void 0 ? _ref : assetId;
  }

  var list = useMemo(function () {
    var _wallets$filter, _wallets$filter2, _catList$filter, _strayCats$filter;

    if (isLoading) {
      return undefined;
    }

    var baseWallets = (_wallets$filter = wallets === null || wallets === void 0 ? void 0 : wallets.filter(function (wallet) {
      return ![WalletType.CAT, WalletType.POOLING_WALLET].includes(wallet.type);
    })) !== null && _wallets$filter !== void 0 ? _wallets$filter : [];
    var catBaseWallets = (_wallets$filter2 = wallets === null || wallets === void 0 ? void 0 : wallets.filter(function (wallet) {
      return wallet.type === WalletType.CAT;
    })) !== null && _wallets$filter2 !== void 0 ? _wallets$filter2 : []; // hidden by default because they are not known

    var nonAddedKnownCats = (_catList$filter = catList === null || catList === void 0 ? void 0 : catList.filter(function (cat) {
      return !hasCatAssignedWallet(cat.assetId);
    })) !== null && _catList$filter !== void 0 ? _catList$filter : []; // hidden by default

    var nonAddedStrayCats = (_strayCats$filter = strayCats === null || strayCats === void 0 ? void 0 : strayCats.filter(function (strayCat) {
      return !hasCatAssignedWallet(strayCat.assetId);
    })) !== null && _strayCats$filter !== void 0 ? _strayCats$filter : [];
    var tokens = [].concat(_toConsumableArray(baseWallets.map(function (wallet) {
      var _wallet$meta2;

      return {
        id: wallet.id,
        type: 'WALLET',
        walletType: wallet.type,
        hidden: isHidden(wallet.id),
        walletId: wallet.id,
        assetId: (_wallet$meta2 = wallet.meta) === null || _wallet$meta2 === void 0 ? void 0 : _wallet$meta2.assetId,
        name: wallet.type === WalletType.STANDARD_WALLET ? 'Chia' : wallet.name
      };
    })), _toConsumableArray(catBaseWallets.map(function (wallet) {
      var _wallet$meta3, _wallet$meta4;

      return {
        id: wallet.id,
        type: knownCatAssetIds.has((_wallet$meta3 = wallet.meta) === null || _wallet$meta3 === void 0 ? void 0 : _wallet$meta3.assetId) ? 'CAT_LIST' : 'STRAY_CAT',
        walletType: wallet.type,
        hidden: isHidden(wallet.id),
        walletId: wallet.id,
        assetId: (_wallet$meta4 = wallet.meta) === null || _wallet$meta4 === void 0 ? void 0 : _wallet$meta4.assetId,
        name: wallet.name
      };
    })), _toConsumableArray(nonAddedKnownCats.map(function (cat) {
      return {
        id: cat.assetId,
        type: 'CAT_LIST',
        walletType: WalletType.CAT,
        hidden: isHiddenCAT(cat.assetId),
        walletId: walletAssetIds.has(cat.assetId) ? walletAssetIds.get(cat.assetId) : undefined,
        assetId: cat.assetId,
        name: getCATName(cat.assetId)
      };
    })), _toConsumableArray(nonAddedStrayCats.map(function (strayCat) {
      return {
        id: strayCat.assetId,
        type: 'STRAY_CAT',
        walletType: WalletType.CAT,
        hidden: isHiddenCAT(strayCat.assetId),
        walletId: walletAssetIds.has(strayCat.assetId) ? walletAssetIds.get(strayCat.assetId) : undefined,
        assetId: strayCat.assetId,
        name: getCATName(strayCat.assetId)
      };
    }))); // Filter by requested wallet types

    tokens = tokens.filter(function (token) {
      return walletTypes.includes(token.walletType);
    });

    if (search) {
      tokens = tokens.filter(function (token) {
        return token.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    return orderBy(tokens, [getWalletTypeOrder, getTypeOrder, 'name'], ['asc', 'asc', 'asc']);
  }, [isLoading, wallets, catList, strayCats, hidden, search, walletAssetIds]);

  function handleShow(_x) {
    return _handleShow.apply(this, arguments);
  }

  function _handleShow() {
    _handleShow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(id) {
      var cat, strayCat;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(typeof id === 'number')) {
                _context.next = 4;
                break;
              }

              show(id);
              return _context.abrupt("return", id);

            case 4:
              if (!(typeof id === 'string')) {
                _context.next = 15;
                break;
              }

              // assign wallet for CAT
              cat = catList === null || catList === void 0 ? void 0 : catList.find(function (cat) {
                return cat.assetId === id;
              });

              if (!cat) {
                _context.next = 10;
                break;
              }

              _context.next = 9;
              return addCATToken({
                name: cat.name,
                assetId: cat.assetId,
                fee: '0'
              }).unwrap();

            case 9:
              return _context.abrupt("return", _context.sent);

            case 10:
              // assign stray cat
              strayCat = strayCats === null || strayCats === void 0 ? void 0 : strayCats.find(function (cat) {
                return cat.assetId === id;
              });

              if (!strayCat) {
                _context.next = 15;
                break;
              }

              _context.next = 14;
              return addCATToken({
                name: strayCat.name,
                assetId: strayCat.assetId,
                fee: '0'
              }).unwrap();

            case 14:
              return _context.abrupt("return", _context.sent);

            case 15:
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](0);
              showError(_context.t0);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 17]]);
    }));
    return _handleShow.apply(this, arguments);
  }

  return {
    list: list,
    hide: hide,
    show: handleShow,
    isLoading: isLoading
  };
}

function WalletTokenCard(props) {
  var _props$item = props.item,
      type = _props$item.type,
      walletType = _props$item.walletType,
      walletId = _props$item.walletId,
      assetId = _props$item.assetId,
      hidden = _props$item.hidden,
      name = _props$item.name,
      onHide = props.onHide,
      onShow = props.onShow;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useSetCATNameMutatio = useSetCATNameMutation(),
      _useSetCATNameMutatio2 = _slicedToArray(_useSetCATNameMutatio, 1),
      setCATName = _useSetCATNameMutatio2[0];

  var showError = useShowError();

  function handleRename(_x) {
    return _handleRename.apply(this, arguments);
  }

  function _handleRename() {
    _handleRename = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(newName) {
      var currentWalletId;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(!newName || newName === name)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              setIsLoading(true);
              currentWalletId = walletId;

              if (currentWalletId) {
                _context.next = 12;
                break;
              }

              if (assetId) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return");

            case 8:
              _context.next = 10;
              return onShow(assetId);

            case 10:
              currentWalletId = _context.sent;

              // hide wallet
              if (hidden) {
                onHide(currentWalletId);
              }

            case 12:
              if (!currentWalletId) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return setCATName({
                walletId: currentWalletId,
                name: newName
              }).unwrap();

            case 15:
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](0);
              showError(_context.t0);

            case 20:
              _context.prev = 20;
              setIsLoading(false);
              return _context.finish(20);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 17, 20, 23]]);
    }));
    return _handleRename.apply(this, arguments);
  }

  function handleVisibleChange(_x2) {
    return _handleVisibleChange.apply(this, arguments);
  }

  function _handleVisibleChange() {
    _handleVisibleChange = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(event) {
      var checked, _id;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              checked = event.target.checked;
              _id = walletId !== null && walletId !== void 0 ? walletId : assetId;

              if (!checked) {
                _context2.next = 9;
                break;
              }

              setIsLoading(true);
              _context2.next = 7;
              return onShow(_id);

            case 7:
              _context2.next = 10;
              break;

            case 9:
              onHide(_id);

            case 10:
              _context2.prev = 10;
              setIsLoading(false);
              return _context2.finish(10);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0,, 10, 13]]);
    }));
    return _handleVisibleChange.apply(this, arguments);
  }

  var subTitle = useMemo(function () {
    if (type === 'WALLET') {
      if (walletType === WalletType.CAT) {
        return assetId;
      }

      return '';
    }

    return assetId;
  }, [assetId, type, walletType]);
  var currentName = walletType === WalletType.STANDARD_WALLET ? 'Chia' : name;
  return /*#__PURE__*/jsx(CardListItem, {
    children: /*#__PURE__*/jsxs(Flex, {
      gap: 1,
      alignItems: "center",
      width: "100%",
      children: [/*#__PURE__*/jsxs(Flex, {
        flexDirection: "column",
        gap: 0.5,
        flexGrow: 1,
        flexBasis: 0,
        minWidth: 0,
        children: [walletType === WalletType.STANDARD_WALLET ? /*#__PURE__*/jsx(Typography, {
          noWrap: true,
          children: name
        }) : /*#__PURE__*/jsx(TextField, {
          label: "Name",
          defaultValue: currentName,
          onBlur: function onBlur(event) {
            return handleRename(event.target.value);
          },
          size: "small",
          fullWidth: true,
          hiddenLabel: true
        }), (!!subTitle || assetId) && /*#__PURE__*/jsxs(Flex, {
          flexDirection: "column",
          flexGrow: 1,
          flexBasis: 0,
          minWidth: 0,
          children: [!!subTitle && /*#__PURE__*/jsx(Tooltip$1, {
            title: subTitle,
            copyToClipboard: true,
            children: /*#__PURE__*/jsx(Typography, {
              color: "textSecondary",
              variant: "caption",
              noWrap: true,
              children: subTitle
            })
          }), assetId && /*#__PURE__*/jsx(Link, {
            href: "https://www.taildatabase.com/tail/".concat(assetId),
            target: "_blank",
            variant: "caption",
            children: /*#__PURE__*/jsx(Trans, {
              id: "Search on Tail Database"
            })
          })]
        })]
      }), walletType !== WalletType.STANDARD_WALLET && /*#__PURE__*/jsx(Box, {
        width: "60px",
        textAlign: "center",
        children: isLoading ? /*#__PURE__*/jsx(CircularProgress, {
          size: 32
        }) : /*#__PURE__*/jsx(Switch, {
          checked: !hidden,
          onChange: handleVisibleChange
        })
      })]
    })
  });
}

var Search = styled('div').withConfig({
  displayName: "WalletsManageTokens__Search",
  componentId: "sc-1s0no01-0"
})(function (_ref) {
  var theme = _ref.theme;
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  };
});
var SearchIconWrapper = styled('div').withConfig({
  displayName: "WalletsManageTokens__SearchIconWrapper",
  componentId: "sc-1s0no01-1"
})(function (_ref2) {
  var theme = _ref2.theme;
  return {
    padding: theme.spacing(0, 0),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
});
var StyledInputBase = styled(InputBase).withConfig({
  displayName: "WalletsManageTokens__StyledInputBase",
  componentId: "sc-1s0no01-2"
})(function (_ref3) {
  var theme = _ref3.theme;
  return {
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: "calc(1em + ".concat(theme.spacing(2), ")"),
      transition: theme.transitions.create('width'),
      width: '100%'
    }
  };
});
var StyledRoot$1 = styled(Box).withConfig({
  displayName: "WalletsManageTokens__StyledRoot",
  componentId: "sc-1s0no01-3"
})(["position:absolute;bottom:0;left:", ";right:", ";top:0;display:flex;flex-direction:column;justify-content:flex-end;z-index:1;pointer-events:none;"], function (_ref4) {
  var theme = _ref4.theme;
  return theme.spacing(1);
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.spacing(2);
});
var StyledButtonContainer = styled(Box).withConfig({
  displayName: "WalletsManageTokens__StyledButtonContainer",
  componentId: "sc-1s0no01-4"
})(["background-color:", ";"], function (_ref6) {
  var theme = _ref6.theme;
  return theme.palette.background["default"];
});
var StyledMainButton = styled(Button).withConfig({
  displayName: "WalletsManageTokens__StyledMainButton",
  componentId: "sc-1s0no01-5"
})(["border-radius:", ";border:", ";background-color:", ";height:", ";pointer-events:auto;&:hover{background-color:", ";border-color:", ";}"], function (_ref7) {
  var theme = _ref7.theme;
  return "".concat(theme.spacing(2), " ").concat(theme.spacing(2), " 0 0");
}, function (_ref8) {
  var theme = _ref8.theme;
  return "1px solid ".concat(useColorModeValue(theme, 'border'));
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.palette.action.hover;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.spacing(6);
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.palette.action.selected;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.palette.highlight.main;
});
var StyledBody$1 = styled(Box).withConfig({
  displayName: "WalletsManageTokens__StyledBody",
  componentId: "sc-1s0no01-6"
})(["pointer-events:auto;background-color:", ";transition:all 0.25s ease-out;overflow:hidden;height:", ";"], function (_ref13) {
  var theme = _ref13.theme;
  return theme.palette.background["default"];
}, function (_ref14) {
  var expanded = _ref14.expanded;
  return expanded ? '100%' : '0%';
});
var StyledContent$1 = styled(Box).withConfig({
  displayName: "WalletsManageTokens__StyledContent",
  componentId: "sc-1s0no01-7"
})(["height:100%;background-color:", ";padding-top:", ";border-left:1px solid ", ";border-right:1px solid ", ";display:flex;flex-direction:column;"], function (_ref15) {
  var theme = _ref15.theme;
  return theme.palette.action.hover;
}, function (_ref16) {
  var theme = _ref16.theme;
  return theme.spacing(2);
}, function (_ref17) {
  var theme = _ref17.theme;
  return useColorModeValue(theme, 'border');
}, function (_ref18) {
  var theme = _ref18.theme;
  return useColorModeValue(theme, 'border');
});
var StyledListBody = styled(Flex).withConfig({
  displayName: "WalletsManageTokens__StyledListBody",
  componentId: "sc-1s0no01-8"
})(["overflow-y:overlay;flex-direction:column;flex-grow:1;margin-top:", ";padding-left:", ";padding-right:", ";"], function (_ref19) {
  var theme = _ref19.theme;
  return theme.spacing(2);
}, function (_ref20) {
  var theme = _ref20.theme;
  return theme.spacing(2);
}, function (_ref21) {
  var theme = _ref21.theme;
  return theme.spacing(2);
});
var StyledButtonText = styled(Box).withConfig({
  displayName: "WalletsManageTokens__StyledButtonText",
  componentId: "sc-1s0no01-9"
})(["position:relative;"]);
var StyledExpandButtonContainer = styled(Box).withConfig({
  displayName: "WalletsManageTokens__StyledExpandButtonContainer",
  componentId: "sc-1s0no01-10"
})(["position:absolute;right:", ";top:", ";"], function (_ref22) {
  var theme = _ref22.theme;
  return theme.spacing(-4);
}, function (_ref23) {
  var theme = _ref23.theme;
  return theme.spacing(0);
});
function WalletsManageTokens(props) {
  var _useToggle = useToggle(false),
      _useToggle2 = _slicedToArray(_useToggle, 2),
      expanded = _useToggle2[0],
      toggle = _useToggle2[1];

  var t = useTrans();
  var navigate = useNavigate();

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      search = _useState2[0],
      setSearch = _useState2[1];

  var _useWalletsList = useWalletsList(search, [WalletType.STANDARD_WALLET, WalletType.CAT]),
      list = _useWalletsList.list,
      hide = _useWalletsList.hide,
      show = _useWalletsList.show,
      isLoading = _useWalletsList.isLoading;

  function handleAddToken(event) {
    event.preventDefault();
    event.stopPropagation();
    navigate('/dashboard/wallets/create/cat/existing');
  }

  return /*#__PURE__*/jsxs(StyledRoot$1, {
    children: [/*#__PURE__*/jsx(StyledButtonContainer, {
      children: /*#__PURE__*/jsx(StyledMainButton, {
        onClick: toggle,
        "data-testid": "WalletsManageTokens-manage-token-list",
        fullWidth: true,
        children: /*#__PURE__*/jsxs(StyledButtonText, {
          children: [/*#__PURE__*/jsx(Trans, {
            id: "Manage token list"
          }), /*#__PURE__*/jsx(StyledExpandButtonContainer, {
            children: expanded ? /*#__PURE__*/jsx(KeyboardArrowDown, {}) : /*#__PURE__*/jsx(KeyboardArrowUp, {})
          })]
        })
      })
    }), /*#__PURE__*/jsx(StyledBody$1, {
      expanded: expanded,
      children: /*#__PURE__*/jsxs(StyledContent$1, {
        children: [/*#__PURE__*/jsxs(Flex, {
          gap: 1,
          alignItems: "center",
          children: [/*#__PURE__*/jsx(Box, {
            flexGrow: 1,
            ml: 2,
            children: /*#__PURE__*/jsxs(Search, {
              children: [/*#__PURE__*/jsx(SearchIconWrapper, {
                children: /*#__PURE__*/jsx(SearchIcon, {})
              }), /*#__PURE__*/jsx(StyledInputBase, {
                value: search,
                onChange: function onChange(event) {
                  return setSearch(event.target.value);
                },
                placeholder: t('Search...')
              })]
            })
          }), /*#__PURE__*/jsx(Box, {
            mr: 2,
            children: /*#__PURE__*/jsx(Tooltip$1, {
              title: /*#__PURE__*/jsx(Trans, {
                id: "Add Token"
              }),
              children: /*#__PURE__*/jsx(IconButton, {
                onClick: handleAddToken,
                children: /*#__PURE__*/jsx(Add, {})
              })
            })
          })]
        }), /*#__PURE__*/jsx(StyledListBody, {
          children: isLoading ? /*#__PURE__*/jsx(Spinner, {
            center: true
          }) : /*#__PURE__*/jsx(Flex, {
            gap: 1,
            flexDirection: "column",
            width: "100%",
            children: list === null || list === void 0 ? void 0 : list.map(function (list) {
              return /*#__PURE__*/jsx(WalletTokenCard, {
                item: list,
                onHide: hide,
                onShow: show
              }, list.id);
            })
          })
        })]
      })
    })]
  });
}

function WalletEmptyDialog(props) {
  var onClose = props.onClose,
      children = props.children,
      open = props.open;

  function handleClose() {
    onClose();
  }

  return /*#__PURE__*/jsxs(Dialog, {
    onClose: handleClose,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    maxWidth: "md",
    open: open,
    children: [/*#__PURE__*/jsx(IconButton, {
      sx: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: function color(theme) {
          return theme.palette.grey[500];
        }
      },
      onClick: handleClose,
      children: /*#__PURE__*/jsx(CloseIcon, {})
    }), /*#__PURE__*/jsx(DialogContent, {
      children: children
    })]
  });
}
WalletEmptyDialog.defaultProps = {
  open: false,
  onClose: function onClose() {},
  children: undefined
};

var StyledRoot = styled(Box).withConfig({
  displayName: "WalletsSidebar__StyledRoot",
  componentId: "sc-qb8yez-0"
})(["min-width:390px;height:100%;display:flex;padding-top:", ";"], function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.spacing(3));
});
var StyledContent = styled(Box).withConfig({
  displayName: "WalletsSidebar__StyledContent",
  componentId: "sc-qb8yez-1"
})(["padding-left:", ";padding-right:", ";margin-right:", ";min-height:", ";overflow-y:overlay;"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.spacing(3);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.spacing(3);
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.spacing(2);
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.spacing(5);
});
var StyledBody = styled(Box).withConfig({
  displayName: "WalletsSidebar__StyledBody",
  componentId: "sc-qb8yez-2"
})(["flex-grow:1;position:relative;"]);
var TokensInfo = styled.div.withConfig({
  displayName: "WalletsSidebar__TokensInfo",
  componentId: "sc-qb8yez-3"
})(["float:right;border:", ";height:30px;padding:0px 5px;border-radius:5px;cursor:pointer;"], function (_ref6) {
  var theme = _ref6.theme;
  return "1px solid ".concat(useColorModeValue(theme, 'border'));
});
var StyledItemsContainer = styled(Flex).withConfig({
  displayName: "WalletsSidebar__StyledItemsContainer",
  componentId: "sc-qb8yez-4"
})(["flex-direction:column;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;padding-bottom:", ";"], function (_ref7) {
  var theme = _ref7.theme;
  return theme.spacing(6);
});
var ContentStyled = styled.div.withConfig({
  displayName: "WalletsSidebar__ContentStyled",
  componentId: "sc-qb8yez-5"
})(["max-width:500px;text-align:center;padding:5px 20px;"]);
var ActionsStyled = styled.div.withConfig({
  displayName: "WalletsSidebar__ActionsStyled",
  componentId: "sc-qb8yez-6"
})(["margin:25px;display:inline-block;"]);
function WalletsSidebar() {
  var navigate = useNavigate();

  var _useParams = useParams(),
      walletId = _useParams.walletId;

  var _useGetWalletsQuery = useGetWalletsQuery(),
      wallets = _useGetWalletsQuery.data,
      isLoading = _useGetWalletsQuery.isLoading;

  var _useHiddenWallet = useHiddenWallet(),
      isHidden = _useHiddenWallet.isHidden,
      hidden = _useHiddenWallet.hidden,
      isLoadingHiddenWallet = _useHiddenWallet.isLoading;

  var openDialog = useOpenDialog();
  var openExternal = useOpenExternal();

  var _useGetLoggedInFinger = useGetLoggedInFingerprintQuery(),
      fingerprint = _useGetLoggedInFinger.data,
      isLoadingFingerprint = _useGetLoggedInFinger.isLoading;

  var _useGetPrivateKeyQuer = useGetPrivateKeyQuery({
    fingerprint: fingerprint
  }, {
    skip: !fingerprint
  }),
      privateKey = _useGetPrivateKeyQuer.data,
      isLoadingPrivateKey = _useGetPrivateKeyQuer.isLoading;

  function handleOpenBlogPost() {
    openExternal('https://www.chia.net/cat2blog');
  }

  function openTokensInfoDialog() {
    openDialog( /*#__PURE__*/jsx(WalletEmptyDialog, {
      children: /*#__PURE__*/jsxs(ContentStyled, {
        children: [/*#__PURE__*/jsx(Typography, {
          variant: "h5",
          textAlign: "center",
          color: "grey",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Your CAT tokens have been upgraded!"
          })
        }), /*#__PURE__*/jsx("br", {}), /*#__PURE__*/jsx(Typography, {
          textAlign: "center",
          color: "grey",
          children: /*#__PURE__*/jsx(Trans, {
            id: "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
            components: {
              "0": /*#__PURE__*/jsx("br", {}),
              "1": /*#__PURE__*/jsx(FormatLargeNumber, {
                value: 2311760
              }),
              "2": /*#__PURE__*/jsx("br", {})
            }
          })
        }), /*#__PURE__*/jsx(ActionsStyled, {
          children: /*#__PURE__*/jsxs(Flex, {
            gap: 3,
            flexDirection: "column",
            width: "100%",
            children: [/*#__PURE__*/jsx(Button$1, {
              variant: "outlined",
              size: "large",
              onClick: function onClick() {
                return openExternal('https://cat1.chia.net/#publicKey=' + privateKey.pk + '&fingerprint=' + fingerprint);
              },
              disabled: isLoadingFingerprint || isLoadingPrivateKey,
              children: /*#__PURE__*/jsx(Trans, {
                id: "Check my snapshot balance"
              })
            }), /*#__PURE__*/jsx(Button$1, {
              variant: "outlined",
              size: "large",
              onClick: handleOpenBlogPost,
              children: /*#__PURE__*/jsx(Trans, {
                id: "Read the blog post for details"
              })
            })]
          })
        }), /*#__PURE__*/jsx("p", {
          children: /*#__PURE__*/jsx(Trans, {
            id: "Want to see your old balance for yourself?"
          })
        }), /*#__PURE__*/jsx(Link, {
          target: "_blank",
          href: "https://www.chia.net/download/",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Click here to download an older version of the wallet"
          })
        })]
      })
    }));
  }

  function handleSelectWallet(walletId) {
    navigate("/dashboard/wallets/".concat(walletId));
  }

  var items = useMemo(function () {
    if (isLoading || isLoadingHiddenWallet) {
      return [];
    }

    var orderedWallets = orderBy(wallets, ['type', 'name'], ['asc', 'asc']);
    return orderedWallets.filter(function (wallet) {
      return [WalletType.STANDARD_WALLET, WalletType.CAT].includes(wallet.type) && !isHidden(wallet.id);
    }).map(function (wallet) {
      var primaryTitle = getWalletPrimaryTitle(wallet);

      function handleSelect() {
        handleSelectWallet(wallet.id);
      }

      return /*#__PURE__*/jsx(CardListItem, {
        onSelect: handleSelect,
        selected: wallet.id === Number(walletId),
        "data-testid": "WalletsSidebar-wallet-".concat(wallet.id),
        children: /*#__PURE__*/jsxs(Flex, {
          flexDirection: "column",
          children: [/*#__PURE__*/jsx(Typography, {
            children: primaryTitle
          }), /*#__PURE__*/jsx(WalletIcon, {
            wallet: wallet,
            color: "textSecondary",
            variant: "caption"
          })]
        })
      }, wallet.id);
    });
  }, [wallets, walletId, isLoading, hidden, isLoadingHiddenWallet]);
  return /*#__PURE__*/jsx(StyledRoot, {
    children: /*#__PURE__*/jsxs(Flex, {
      gap: 3,
      flexDirection: "column",
      width: "100%",
      children: [/*#__PURE__*/jsx(StyledContent, {
        children: /*#__PURE__*/jsxs(Typography, {
          variant: "h5",
          children: [/*#__PURE__*/jsx(Trans, {
            id: "Tokens"
          }), /*#__PURE__*/jsx(TokensInfo, {
            onClick: function onClick() {
              return openTokensInfoDialog();
            },
            children: /*#__PURE__*/jsx("svg", {
              width: "20",
              height: "20",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /*#__PURE__*/jsx("path", {
                d: "M9 5h2v2H9V5Zm0 4h2v6H9V9Zm1-9C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z",
                fill: "currentColor",
                fillOpacity: 0.54,
                stroke: "transparent"
              })
            })
          })]
        })
      }), /*#__PURE__*/jsxs(StyledBody, {
        children: [/*#__PURE__*/jsx(StyledItemsContainer, {
          children: /*#__PURE__*/jsx(StyledContent, {
            children: /*#__PURE__*/jsx(Flex, {
              gap: 1,
              flexDirection: "column",
              children: items
            })
          })
        }), /*#__PURE__*/jsx(WalletsManageTokens, {})]
      })]
    })
  });
}

function Wallet() {
  var _useParams = useParams$1(),
      walletId = _useParams.walletId;

  var _useWallet = useWallet(walletId),
      wallet = _useWallet.wallet,
      loading = _useWallet.loading;

  if (loading) {
    return /*#__PURE__*/jsx(Suspender, {});
  }

  if (!wallet) {
    return /*#__PURE__*/jsx(Alert, {
      severity: "warning",
      children: /*#__PURE__*/jsx(Trans, {
        id: "Wallet {walletId} not found",
        values: {
          walletId: walletId
        }
      })
    });
  }

  if (wallet.type === WalletType.STANDARD_WALLET) {
    return /*#__PURE__*/jsx(StandardWallet, {
      walletId: Number(walletId)
    });
  }

  if (wallet.type === WalletType.CAT) {
    return /*#__PURE__*/jsx(WalletCAT, {
      walletId: Number(walletId)
    });
  }
  return /*#__PURE__*/jsx(Alert, {
    severity: "warning",
    children: /*#__PURE__*/jsx(Trans, {
      id: "Wallet with type {0} not supported",
      values: {
        "0": wallet.type
      }
    })
  });
}

function Wallets() {
  return /*#__PURE__*/jsxs(Routes, {
    children: [/*#__PURE__*/jsx(Route, {
      element: /*#__PURE__*/jsx(LayoutDashboardSub, {
        outlet: true
      }),
      children: /*#__PURE__*/jsx(Route, {
        path: "create/*",
        element: /*#__PURE__*/jsx(WalletCreate, {})
      })
    }), /*#__PURE__*/jsxs(Route, {
      element: /*#__PURE__*/jsx(LayoutDashboardSub, {
        sidebar: /*#__PURE__*/jsx(WalletsSidebar, {}),
        outlet: true
      }),
      children: [/*#__PURE__*/jsx(Route, {
        path: ":walletId",
        element: /*#__PURE__*/jsx(Wallet, {})
      }), /*#__PURE__*/jsx(Route, {
        path: "*",
        element: /*#__PURE__*/jsx(Navigate, {
          to: "1"
        })
      })]
    })]
  });
}

function WalletStatusHeight() {
  var _useGetHeightInfoQuer = useGetHeightInfoQuery({}, {
    pollingInterval: 10000
  }),
      height = _useGetHeightInfoQuer.data,
      isLoading = _useGetHeightInfoQuer.isLoading;

  if (isLoading) {
    return null;
  }

  if (height === undefined || height === null) {
    return null;
  }

  return /*#__PURE__*/jsxs(Fragment, {
    children: ['(', /*#__PURE__*/jsx(FormatLargeNumber, {
      value: height
    }), ')']
  });
}

function WalletStatus(props) {
  var _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'body1' : _props$variant,
      _props$height = props.height,
      height = _props$height === void 0 ? false : _props$height,
      _props$indicator = props.indicator,
      indicator = _props$indicator === void 0 ? false : _props$indicator,
      _props$reversed = props.reversed,
      reversed = _props$reversed === void 0 ? false : _props$reversed,
      color = props.color,
      gap = props.gap,
      _props$justChildren = props.justChildren,
      justChildren = _props$justChildren === void 0 ? false : _props$justChildren;

  var _useGetSyncStatusQuer = useGetSyncStatusQuery({}, {
    pollingInterval: 10000
  }),
      walletState = _useGetSyncStatusQuer.data,
      isLoading = _useGetSyncStatusQuer.isLoading;

  if (isLoading || !walletState) {
    return /*#__PURE__*/jsx(Loading, {
      size: 32
    });
  }

  var syncingStatus = getWalletSyncingStatus(walletState);
  var Tag = justChildren ? Box : Typography;
  return /*#__PURE__*/jsxs(Tag, {
    component: "div",
    variant: variant,
    children: [syncingStatus === SyncingStatus.NOT_SYNCED && /*#__PURE__*/jsxs(StateIndicator, {
      state: State.WARNING,
      indicator: indicator,
      reversed: reversed,
      color: color,
      gap: gap,
      children: [/*#__PURE__*/jsx(Trans, {
        id: "Not Synced"
      }), " ", height && /*#__PURE__*/jsx(WalletStatusHeight, {})]
    }), syncingStatus === SyncingStatus.SYNCED && /*#__PURE__*/jsxs(StateIndicator, {
      state: State.SUCCESS,
      indicator: indicator,
      reversed: reversed,
      color: color,
      gap: gap,
      children: [/*#__PURE__*/jsx(Trans, {
        id: "Synced"
      }), " ", height && /*#__PURE__*/jsx(WalletStatusHeight, {})]
    }), syncingStatus === SyncingStatus.SYNCING && /*#__PURE__*/jsxs(StateIndicator, {
      state: State.WARNING,
      indicator: indicator,
      reversed: reversed,
      color: color,
      gap: gap,
      children: [/*#__PURE__*/jsx(Trans, {
        id: "Syncing"
      }), " ", height && /*#__PURE__*/jsx(WalletStatusHeight, {})]
    })]
  });
}

var _excluded = ["walletId"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function WalletReceiveAddressField(props) {
  var _props$walletId = props.walletId,
      walletId = _props$walletId === void 0 ? 1 : _props$walletId,
      rest = _objectWithoutProperties(props, _excluded);

  var _useGetCurrentAddress = useGetCurrentAddressQuery({
    walletId: walletId
  }),
      _useGetCurrentAddress2 = _useGetCurrentAddress.data,
      address = _useGetCurrentAddress2 === void 0 ? '' : _useGetCurrentAddress2;

  var _useGetNextAddressMut = useGetNextAddressMutation(),
      _useGetNextAddressMut2 = _slicedToArray(_useGetNextAddressMut, 1),
      newAddress = _useGetNextAddressMut2[0];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  function handleNewAddress() {
    return _handleNewAddress.apply(this, arguments);
  }

  function _handleNewAddress() {
    _handleNewAddress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setIsLoading(true);
              _context.next = 4;
              return newAddress({
                walletId: walletId,
                newAddress: true
              }).unwrap();

            case 4:
              _context.prev = 4;
              setIsLoading(false);
              return _context.finish(4);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0,, 4, 7]]);
    }));
    return _handleNewAddress.apply(this, arguments);
  }

  return /*#__PURE__*/jsx(TextField, _objectSpread({
    label: /*#__PURE__*/jsx(Trans, {
      id: "Receive Address"
    }),
    value: address,
    placeholder:
    /*i18n*/
    i18n._("Loading..."),
    variant: "filled",
    InputProps: {
      readOnly: true,
      startAdornment: /*#__PURE__*/jsx(InputAdornment, {
        position: "start",
        children: /*#__PURE__*/jsx(Flex, {
          justifyContent: "center",
          minWidth: 35,
          children: isLoading ? /*#__PURE__*/jsx(Loading, {
            size: "1em"
          }) : /*#__PURE__*/jsx(IconButton, {
            onClick: handleNewAddress,
            size: "small",
            children: /*#__PURE__*/jsx(Autorenew, {})
          })
        })
      }),
      endAdornment: /*#__PURE__*/jsx(InputAdornment, {
        position: "end",
        children: /*#__PURE__*/jsx(CopyToClipboard, {
          value: address
        })
      })
    }
  }, rest));
}

var cols = [{
  minWidth: '200px',
  field: function field(row) {
    return /*#__PURE__*/jsx(Tooltip, {
      title: row.nodeId,
      children: /*#__PURE__*/jsx("span", {
        children: row.nodeId
      })
    });
  },
  title: /*#__PURE__*/jsx(Trans, {
    id: "Node ID"
  })
}, {
  field: 'peerHost',
  title: /*#__PURE__*/jsx(Trans, {
    id: "IP address"
  })
}, {
  field: function field(row) {
    return "".concat(row.peerPort, "/").concat(row.peerServerPort);
  },
  title: /*#__PURE__*/jsx(Trans, {
    id: "Port"
  })
}, {
  field: function field(row) {
    return /*#__PURE__*/jsxs(Fragment, {
      children: [/*#__PURE__*/jsx(FormatBytes, {
        value: row.bytesWritten,
        unit: "MiB",
        removeUnit: true,
        fixedDecimals: true
      }), "/", /*#__PURE__*/jsx(FormatBytes, {
        value: row.bytesRead,
        unit: "MiB",
        removeUnit: true,
        fixedDecimals: true
      })]
    });
  },
  title: /*#__PURE__*/jsx(Trans, {
    id: "MiB Up/Down"
  })
}, {
  field: function field(row) {
    // @ts-ignore
    return ServiceConnectionName[row.type];
  },
  title: /*#__PURE__*/jsx(Trans, {
    id: "Connection type"
  })
}];
function WalletConnections(props) {
  var walletId = props.walletId;

  var _useGetWalletConnecti = useGetWalletConnectionsQuery({
    walletId: walletId
  }, {
    pollingInterval: 10000
  }),
      connections = _useGetWalletConnecti.data,
      isLoading = _useGetWalletConnecti.isLoading;

  return /*#__PURE__*/jsx(Card, {
    title: /*#__PURE__*/jsx(Trans, {
      id: "Wallet Connections"
    }),
    children: isLoading ? /*#__PURE__*/jsx(Loading, {
      center: true
    }) : !(connections !== null && connections !== void 0 && connections.length) ? /*#__PURE__*/jsx(Trans, {
      id: "List of connections is empty"
    }) : /*#__PURE__*/jsx(Table$1, {
      cols: cols,
      rows: connections
    })
  });
}

var _WalletName;
var WalletName = (_WalletName = {}, _defineProperty(_WalletName, WalletType.STANDARD_WALLET,
/*i18n*/
{
  id: 'Standard Wallet'
}), _defineProperty(_WalletName, WalletType.RATE_LIMITED,
/*i18n*/
{
  id: 'RL Wallet'
}), _defineProperty(_WalletName, WalletType.ATOMIC_SWAP,
/*i18n*/
{
  id: 'Atomic Swap Wallet'
}), _defineProperty(_WalletName, WalletType.AUTHORIZED_PAYEE,
/*i18n*/
{
  id: 'Authorized Payee Wallet'
}), _defineProperty(_WalletName, WalletType.MULTI_SIG,
/*i18n*/
{
  id: 'Multi Sig Wallet'
}), _defineProperty(_WalletName, WalletType.CUSTODY,
/*i18n*/
{
  id: 'Custody Wallet'
}), _defineProperty(_WalletName, WalletType.CAT,
/*i18n*/
{
  id: 'Chia Asset Token'
}), _defineProperty(_WalletName, WalletType.RECOVERABLE,
/*i18n*/
{
  id: 'Recoverable Wallet'
}), _defineProperty(_WalletName, WalletType.DECENTRALIZED_ID,
/*i18n*/
{
  id: 'DID Wallet'
}), _defineProperty(_WalletName, WalletType.POOLING_WALLET,
/*i18n*/
{
  id: 'Pooling Wallet'
}), _defineProperty(_WalletName, WalletType.NFT,
/*i18n*/
{
  id: 'NFT Wallet'
}), _WalletName);

function useIsWalletSynced() {
  var _useWalletState = useWalletState(),
      state = _useWalletState.state,
      isLoading = _useWalletState.isLoading;

  var isWalletSynced = !isLoading && state === SyncingStatus.SYNCED;
  return isWalletSynced;
}

/*eslint-disable*/
var messages$C = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "الإجراءات",
    "Add": "إضافة",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "العنوان",
    "Address / Puzzle hash": "العنوان / العنوان المشفر",
    "Amount": "المبلغ",
    "Amount For Initial Coin": "مبلغ العملات الأولية",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "الرصيد",
    "Cancel": "إلغاء",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "نوع الاتصال",
    "Connections": "الإتصالات",
    "Copy": "إنسخ",
    "Create": "إنشاء",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "إنشاء محفظة من النوع Rate Limited Admin Wallet",
    "Create Rate Limited User Wallet": "إنشاء محفظة من النوع Rate Limited Admin Wallet",
    "Create Transaction": "إنشاء معاملة",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "التاريخ",
    "Delete": "حذف",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "أدخل الـ 24 كلمة التي قمت بحفظها من أجل استعادة محفظة Chia الخاصة بك.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "المزرعة",
    "Fee": "الرسوم",
    "Filename": "اسم الملف",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "عنوان الـ IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "إستيراد المحفظة من Mnemonics",
    "Incoming": "الوارد",
    "Info Packet": "حزمة المعلومات",
    "Initial Amount": "المبلغ الأولي",
    "Initialize a Rate Limited User Wallet:": "\":\"تهيئة محفظة المستخدم ذات السعر المحدود\":\"",
    "Interval": "فترة",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "ميجابيت تنزيل\\رفع",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "المفتاح العام الخاص بى",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "عنوان جديد",
    "New Wallet": "محفظة جديدة",
    "Next": "التالي",
    "Nickname": "الإسم المستعار",
    "No previous transactions": "لا توجد معاملات سابقة",
    "Node ID": "الرمز التعريفي للشبكة",
    "Not Available": "غير متاح",
    "Not Connected": "Not Connected",
    "Not Synced": "لم تتم المزامنة",
    "OK": "موافق",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "في المتوسط هناك دقيقة واحدة بين كل كتلة معاملة. ما لم يكن هناك اكتظاظ يمكنك أن تتوقع إدراج معاملتك في أقل من دقيقة.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "الصادرة",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "في إنتظار المُراجعة",
    "Pending Balance": "الرصيد المعلّق",
    "Pending Change": "في إنتظار التأكيد",
    "Pending Total Balance": "الرصيد الإجمالي المعلق",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "الرجاء إدخال 0 رسوم. الرسوم غير مدعومة حتى الآن لـ RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "الرجاء إدخال مبلغ صحيح",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "الرجاء إدخال مبلغ صحيح",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "الرجاء إدخال مبلغ رسوم صحيح",
    "Please enter a valid numeric interval length": "يُـرجى ادخال فترة زمنيّة صحيحة",
    "Please enter a valid numeric spendable amount": "الرجاء إدخال مبلغ رقمي صحيح قابل للإنفاق",
    "Please enter a valid pubkey": "الرجاء إدخال المفتاح العام الصحيح",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "الرجاء إنهاء المزامنة قبل إجراء معاملة",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "منفذ",
    "Pubkey": "المفتاح العمومي",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "معدل محدود",
    "Rate Limited Info": "معدل معلومات محدودة",
    "Rate Limited User Wallet Setup": "معدل إعداد محفظة المستخدم المحدود",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "تلقي العنوان",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "حفظ",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "أختر نوع المحفظة",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "إرسال",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "أرسل حزمة المعلومات هذه إلى مستخدم المحفظة المحدودة المعدل الذي يجب استخدامه لإكمال إعداد محفظتهم:",
    "Send your pubkey to your Rate Limited Wallet admin:": "أرسل المحفظة الخاصة بك إلى مدير المحفظة المحدودة المعدل:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "المبلغ القابل للإنفاق",
    "Spendable Amount Per Interval": "المبلغ القابل للإنفاق لكل فاصل زمني",
    "Spendable Balance": "الرصيد المستهلك",
    "Spending Interval (number of blocks): {interval}": ["الفاصل الزمني للإنفاق (عدد الكتل) ", ["interval"]],
    "Spending Interval Length (number of blocks)": "طول الفاصل الزمني للإنفاق (عدد الكتل)",
    "Spending Limit (chia per interval): {0}": ["حد الإنفاق (chia لكل فاصلة): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "إرسال",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "تمت المزامنة",
    "Syncing": "جاري المزامنة",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "هذه هي كمية تشيا التي يمكنك استخدامها حاليا لإجراء المعاملات. لا تشمل مكافآت الزراعة المعلقة، والمعاملات الواردة بانتظار، وشيا التي أنفقتها للتو ولكنها ليست بعد في سلسلة الكتل.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "هذا هو التغيير المعلق، الذي هو تغيير العملات التي أرسلتها لنفسك، ولكن لم يتم تأكيدها بعد.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "هذا هو مجموع المعاملات المعلقة الواردة والصادرة (غير مدرجة بعد في سلسلة الكتل). هذا لا يشمل مكافآت الزراعة.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "هذا هو الرصيد الإجمالي + الرصيد المعلق: هذا هو ما سيكون عليه رصيدك بعد تأكيد جميع المعاملات المعلقة.",
    "To": "إلى",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "الرصيد الإجمالي",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "المفتاح العام للمستخدم",
    "View pending balances": "عرض الأرصدة المعلقة",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "مرحبًا! تستخدم الكلمات التالية للنسخ الاحتياطي لمحفظتك. بدونهم، سوف تفقد الوصول إلى محفظتك، ابقائهم آمنين! اكتب كل كلمة مع رقم الطلب بجوارهم. (الطلب مهم)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "عندما تتلقى حزمة معلومات الإعداد من المشرف الخاص بك، قم بإدخالها أدناه لإكمال إعداد المحفظة المحدودة المعدل:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$B = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Дзеянні",
    "Add": "Дадаць",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Адрас",
    "Address / Puzzle hash": "Адрас / Хэш-галаваломка",
    "Amount": "Сума",
    "Amount For Initial Coin": "Сума першапачатковых манет",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Баланс",
    "Cancel": "Скасаваць",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Тып падлучэння",
    "Connections": "Падлучэнні",
    "Copy": "Скапіраваць",
    "Create": "Стварыць",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Стварыць кашалёк адміністратара з абмежаваннямі вываду",
    "Create Rate Limited User Wallet": "Стварыць кашалёк карыстальніка з абмежаваннямі вываду",
    "Create Transaction": "Стварыць трансакцыю",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Дата",
    "Delete": "Выдаліць",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Каб аднавіць свой кашалёк Chia, увядзіце раней захаваную вамі мнеманічную фразу з 24 слоў у правільным парадку.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Ферма",
    "Fee": "Камісійныя",
    "Filename": "Назва файла",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP-адрас",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Імпартаваць кашалёк з мнеманічнай фразы",
    "Incoming": "Уваходныя",
    "Info Packet": "Інфармацыйны пакет",
    "Initial Amount": "Першапачатковая сума",
    "Initialize a Rate Limited User Wallet:": "Ініцыялізуйце кашалёк карыстальніка з абмежаваннямі вываду:",
    "Interval": "Інтэрвал",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "Увах./вых. МіБ",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Мой адкрыты ключ",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Новы адрас",
    "New Wallet": "Новы кашалёк",
    "Next": "Наступны",
    "Nickname": "Псеўданім",
    "No previous transactions": "Папярэдніх трансакцый няма",
    "Node ID": "Ідэнтыфікатар вузла",
    "Not Available": "Недаступны",
    "Not Connected": "Not Connected",
    "Not Synced": "Не сінхранізаваны",
    "OK": "ОК",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "У сярэднім паміж кожным блокам трансакцый мінае адна хвіліна. Калі сетка не перагружана, чакаецца, што ваша трансакцыя будзе занесена ў блокчэйн менш чым за хвіліну.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Выходныя",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Чаканыя",
    "Pending Balance": "Чаканы баланс",
    "Pending Change": "Чаканы размен",
    "Pending Total Balance": "Чаканы агульны баланс",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Укажыце нулявыя камісійныя. Камісійны выплаты для кашалькоў з абмежаваннямі вываду пакуль не падтрымліваюцца.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Укажыце дапушчальную суму першапачатковых манет",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Укажыце дапушчальнае лічбавае значэнне",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Укажыце дапушчальнае лічбавае значэнне камісійных",
    "Please enter a valid numeric interval length": "Укажыце дапушчальнае лічбавае значэнне працягласці інтэрвалу",
    "Please enter a valid numeric spendable amount": "Укажыце дапушчальнае лічбавае значэнне",
    "Please enter a valid pubkey": "Укажыце сапраўдны адкрыты ключ",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Завяршыце сінхранізацыю перад выкананнем трансакцыі",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Порт",
    "Pubkey": "Адкрыты ключ",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "З абмежаваннямі вываду",
    "Rate Limited Info": "Інфармацыя аб абмежаваннях вываду",
    "Rate Limited User Wallet Setup": "Наладжванне кашалька карыстальніка з абмежаваннямі вываду",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Адрас атрымання",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Захаваць",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Выберыце тып кашалька",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Адправіць",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Адпраўце гэты інфармацыйны пакет карыстальніку кашалька з абмежаваннямі вываду, каб той мог завяршыць наладжванне свайго кашалька:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Адпраўце гэты адкрыты ключ адміністратару вашага кашалька з абмежаваннямі вываду:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Даступная сума",
    "Spendable Amount Per Interval": "Даступная сума на інтэрвал",
    "Spendable Balance": "Даступны баланс",
    "Spending Interval (number of blocks): {interval}": ["Інтэрвал расходаў (колькасць блокаў): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Працягласць інтэрвалу расходаў (колькасць блокаў)",
    "Spending Limit (chia per interval): {0}": ["Ліміт расходаў (манет chia на інтэрвал): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Адправіць",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Сінхранізаваны",
    "Syncing": "Ідзе сінхранізацыя",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Сума манет Chia, якія вы зараз можаце выкарыстаць для выканання трансакцый. Не ўключае ў сябе чаканыя ўзнагароды за фермерства, чаканыя ўваходныя трансакцыі, а таксама вашы расходы, даныя пра якія яшчэ не былі занесены ў блокчэйн.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Чаканы размен, то-бок разменныя манеты, адпраўленыя вамі самому сабе, але якія яшчэ не былі пацверджаны.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Сума ўваходных і выходных чаканых (яшчэ не ўключаных у блокчэйн) трансакцый. Не ўключае ў сябе ўзнагароды за фермерства.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Агульны баланс + чаканы баланс: гэта тое, якім будзе ваш баланс пасля пацвярджэння ўсіх чаканых трансакцый.",
    "To": "Каму",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Агульны баланс",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Адкрыты ключ карыстальніка",
    "View pending balances": "Праглядзець чаканы баланс",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Вітаем! Ніжэйпададзеныя словы выкарыстоўваюцца для рэзервовага капіраванне вашага кашалька. Без іх вы страціце доступ да свайго кашалька — а таму надзейна захоўвайце іх! Запішыце кожнае слова разам з яго парадкавым нумарам (парадак слоў важны).",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Атрымаўшы ад свайго адміністратара інфармацыйны пакет, увядзіце яго ніжэй, каб завяршыць наладжванне кашалька з абмежаваннямі вываду:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$A = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Действие",
    "Add": "Добави",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Адрес",
    "Address / Puzzle hash": "Адрес / Пъзел Хеш",
    "Amount": "Количество",
    "Amount For Initial Coin": "Сума за първоначална монета",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Баланс",
    "Cancel": "Отмяна",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Тип на връзка",
    "Connections": "Връзки",
    "Copy": "Копиране",
    "Create": "Създаване",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Създайте портфейл с ограничени администраторски права",
    "Create Rate Limited User Wallet": "Създайте портфейл с ограничен потребителски достъп",
    "Create Transaction": "Създай транзакция",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Дата",
    "Delete": "Изтриване",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Въведи 24 думения ключ който сте запазили за да възстановите вашият Chia портфейл.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Ферма",
    "Fee": "Такса",
    "Filename": "Име на файл",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP адрес",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Внеси портфейл от мнемоники",
    "Incoming": "Входящи",
    "Info Packet": "Информационен пакет",
    "Initial Amount": "Първоначална сума",
    "Initialize a Rate Limited User Wallet:": "Създайте портфейл с ограничен потребителски достъп:",
    "Interval": "Интервал",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Up/Down",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Моят публичен ключ",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Нов адрес",
    "New Wallet": "Добави портфейл",
    "Next": "Следващ",
    "Nickname": "Псевдоним",
    "No previous transactions": "Няма предишни транзакции",
    "Node ID": "ID на възел",
    "Not Available": "Недостъпно",
    "Not Connected": "Not Connected",
    "Not Synced": "Не е синхронизирано",
    "OK": "Ок",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Обикновенно има една минута между всеки блок с транзакции. Те могат да се осъществяват за по- малко от минута, в случай че няма натоварване.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Изходящи",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Изчакващо",
    "Pending Balance": "Изчакващ баланс",
    "Pending Change": "Изчакващи промени",
    "Pending Total Balance": "Изчакващ общ баланс",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Моля, въведете 0 такса. Все още не се поддържат положителни такси за RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Моля, въведете валидна първоначална сума на монетата",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "35 / 5000\nМоля, въведете валидна числова сума",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Моля, въведете валидна числова такса",
    "Please enter a valid numeric interval length": "Моля, въведете валидна продължителност на числовия интервал",
    "Please enter a valid numeric spendable amount": "Моля въведете валидна числова сума, която може да бъде изразходвана",
    "Please enter a valid pubkey": "Моля въведете валиден публичен ключ",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Моля завършете синхронизирането преди правене на транзакции",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "~Порт",
    "Pubkey": "Публичен ключ",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Скоростта е ограничена",
    "Rate Limited Info": "Информация за ограничена скорост",
    "Rate Limited User Wallet Setup": "Rate Limited User Wallet Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Адрес за получаване",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Запази",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Избери тип на портфейла",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Изпрати",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send your pubkey to your Rate Limited Wallet admin:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Сума за харчене",
    "Spendable Amount Per Interval": "Сума за харчене на интервал",
    "Spendable Balance": "Баланс за харчене",
    "Spending Interval (number of blocks): {interval}": ["Spending Interval (number of blocks): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Spending Interval Length (number of blocks)",
    "Spending Limit (chia per interval): {0}": ["Spending Limit (chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Изпрати",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Синхронизиран",
    "Syncing": "Синхронизиране",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Това е количеството Chia, което в момента можете да използвате за извършване на транзакции. То не включва чакащи фармерски награди, чакащи входящи транзакции и Chia, които току-що сте похарчили, но все още не са в блокчейна.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Това е сумата от входящите и изходящите чакащи транзакции (които все още не са включени в блокчейна). Това не включва награди от фармене.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.",
    "To": "Към",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Общ баланс",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Публичен ключ на потребител",
    "View pending balances": "Виж изчакващи баланси",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Добре дошли! Следващите думи се използват за точка за възстановяване на вашият портфейл. Без тях, вие ще изгубите достъп до портфейла си, пазете ги в безопасност! Запишете ги в последователност с номерата до тях. (Реда е важен)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$z = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Accions",
    "Add": "Afegeix",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adreça",
    "Address / Puzzle hash": "Adreça / Hash de trencaclosques",
    "Amount": "Quantitat",
    "Amount For Initial Coin": "Quantitat per moneda inicial",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Saldo",
    "Cancel": "Cancel·lar",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tipus de connexió",
    "Connections": "Connexions",
    "Copy": "Copiar",
    "Create": "Crear",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Crear moneder d'administrador amb tarifa limitada",
    "Create Rate Limited User Wallet": "Crear moneder d'usuari amb tarifa limitada",
    "Create Transaction": "Crear transacció",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Data",
    "Delete": "Eliminar",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Introdueix les 24 paraules mnemotècniques que has guardat per restaurar el moneder de Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Cultiu",
    "Fee": "Taxa",
    "Filename": "Nom del fitxer",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Adreça IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importar el moneder des de mnemotècnics",
    "Incoming": "Entrant",
    "Info Packet": "Paquet d'informació",
    "Initial Amount": "Quantitat inicial",
    "Initialize a Rate Limited User Wallet:": "Crear moneder d'usuari amb tarifa limitada:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "Kilobytes de pujada/baixada",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "La meva clau pública",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Nova adreça",
    "New Wallet": "Nou moneder",
    "Next": "Següent",
    "Nickname": "Pseudònim",
    "No previous transactions": "No hi ha transaccions prèvies",
    "Node ID": "ID del node",
    "Not Available": "No disponible",
    "Not Connected": "Not Connected",
    "Not Synced": "No sincronitzat",
    "OK": "D'acord",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "De mitjana passa un minut entre cada transacció de block. A no ser que hi hagi saturació, la teva transacció hauria de ser inclosa en menys d'un minut.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Sortint",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pendent",
    "Pending Balance": "Saldo pendent",
    "Pending Change": "Canvi pendent",
    "Pending Total Balance": "Saldo total pendent",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Si us plau, afegeix 0 de comissió. Encara no es poden enviar comissions positives per RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Si us plau, introdueix una quantitat de moneda inicial vàlida",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Si us plau, introdueix una quantitat numèrica vàlida",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Si us plau, introdueix una comissió numèrica vàlida",
    "Please enter a valid numeric interval length": "Si us plau, introdueix una llargària d'interval numèric vàlida",
    "Please enter a valid numeric spendable amount": "Si us plau, introdueix una quantitat de despesa numèrica vàlida",
    "Please enter a valid pubkey": "Si us plau introdueix una clau pública vàlida",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Si us plau, espera que acabi la sincronització abans de fer una transacció",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Clau pública",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Límit de freqüència",
    "Rate Limited Info": "Informació de la limitació de la tarifa",
    "Rate Limited User Wallet Setup": "Configuració del moneder de tarifa limitada",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Adreça per rebre",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Guardar",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Escollir el tipus de moneder",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Enviar",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Envia aquest paquet d'informació a l'usuari del moneder amb tarifa limitada, que l'ha de fer servir per completar la configuració del seu moneder:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Enviar la seva clau pública al teu administrador de moneder de tarifa limitada:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Quantitat disponible per gastar",
    "Spendable Amount Per Interval": "Quantitat gastable per interval",
    "Spendable Balance": "Saldo gastable",
    "Spending Interval (number of blocks): {interval}": ["Interval gastable (en nombre de blocs): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Longitud de l'interval gastable (en nombre de blocs)",
    "Spending Limit (chia per interval): {0}": ["Límit de despesa (Chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Enviar",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sincronitzat",
    "Syncing": "Sincronitzant",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Aquesta és la quantitat de Chia que pots fer servir per fer transaccions. No inclou les recompenses agrícoles pendents, transaccions entrants pendents ni Chia que acabis de gastar, però que encara no es troba a la cadena de blocs.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Aquest és el canvi pendent, que són monedes que t'has enviat a tu mateix, però que encara no han estat confirmades.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Aquesta és la suma de les transaccions pendents entrants i sortints (encara no incloses a la cadena de blocs). Això no inclou les recompenses per cultivar.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Aquest és el saldo total + saldo pendent: serà el teu saldo quan totes les transaccions pendents hagin estat confirmades.",
    "To": "Per a",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Saldo total",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Clau pública de l'usuari",
    "View pending balances": "Veure els saldos pendents",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Benvingut/da! Les paraules següents són necessàries per a la còpia de seguretat de la cartera. Sense elles, perdràs l'accés a la teva cartera, guarda-les a un lloc segur. Guarda cada paraula juntament amb el número d’ordre al costat. (L'ordre és important)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Quan rebis el paquet d'informació sobre la configuració del teu administrador, introdueix-lo aquí per completar la configuració de la cartera de tarifa limitada:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$y = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Akce",
    "Add": "Přidat",
    "Add Backup ID": "Přidat ID zálohy",
    "Add Custom Token": "Přidat vlastní Token",
    "Add Token": "Přidat token",
    "Adding {0} token": ["Přidávání ", ["0"], " tokenů"],
    "Address": "Adresa",
    "Address / Puzzle hash": "Adresa / Hash šifry",
    "Amount": "Částka",
    "Amount For Initial Coin": "Částka pro počáteční minci",
    "Amount must be an even amount.": "Částka musí být sudá částka.",
    "Are you sure you want to delete unconfirmed transactions?": "Opravdu chcete odstranit nepotvrzenou transakci?",
    "Asset Id": "ID aktiva",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Zůstatek",
    "Cancel": "Zrušit",
    "Cannot send chia to coloured address. Please enter a chia address.": "Chia nelze odeslat na barevnou adresu. Zadejte prosím běžnou Chia adresu.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Název mince",
    "Confirmation": "Potvrzení",
    "Confirmed": "Potvrzeno",
    "Confirmed at Height": "Potvrzeno ve výšce",
    "Connected ({0})": ["Připojeno (", ["0"], ")"],
    "Connection type": "Typ připojení",
    "Connections": "Připojení",
    "Copy": "Kopírovat",
    "Create": "Vytvořit",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Vytvořit Chia Asset Token Peněženku z existující TAIL",
    "Create Distributed Identity Wallet": "Vytvořit peněženku distribuované identity",
    "Create New Chia Asset Token Wallet": "Vytvořit novou Chia Asset Token peněženku",
    "Create New Wallet": "Vytvořit novou peněženku",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Vytvořit limitovanou administrátorskou peněženku",
    "Create Rate Limited User Wallet": "Vytvořit limitovanou uživatelskou peněženku",
    "Create Transaction": "Vytvořit transakci",
    "Create custom CAT Wallet": "Vytvořit vlastní CAT peněženku",
    "Custody Wallet": "Správcovská (custody) peněženka",
    "Custom": "Vlastní",
    "DID Wallet": "DID Peněženka",
    "Date": "Datum",
    "Delete": "Odstranit",
    "Delete Unconfirmed Transactions": "Odstranit nepotvrzené transakce",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distribuovaná identita",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Přetáhněte záložní soubor obnovy",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Zadejte 24 slov, které jste si poznamenali při zakládání vaší Chia peněženky.",
    "Error the entered address appears to be for a different colour.": "Chyba zadaná adresa se zdá být pro jinou barvu.",
    "Farm": "Farma",
    "Fee": "Poplatek",
    "Filename": "Název souboru",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD nebo Hierarchické Deterministické klíče jsou typy veřejného/soukromého klíče, kde jeden soukromý klíč může mít téměř nekonečný počet různých veřejných klíčů (a tedy i příchozích adres peněženky), které se váží k jedinému soukromému klíči a mohou tak být utráceny.",
    "IP address": "IP adresa",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "Pokud chcete urychlit transakci, odstraňte prosím nepotvrzené transakce a zkuste to znovu s vyšším poplatkem.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importovat peněženku",
    "Incoming": "Příchozí",
    "Info Packet": "Informační Paket",
    "Initial Amount": "Počáteční částka",
    "Initialize a Rate Limited User Wallet:": "Inicializovat uživatelskou peněženku s omezenou sazbou:",
    "Interval": "Interval",
    "List of connections is empty": "Seznam připojení je prázdný",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Správa DID obnovení",
    "Manage token list": "Spravovat seznam tokenů",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool plný",
    "MiB Up/Down": "MiB odesláno/přijato",
    "Multi Sig Wallet": "Více podpisová peněženka",
    "My DID Wallet": "Má DID peněženka",
    "My Pubkey": "Můj Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Název",
    "New Address": "Nová adresa",
    "New Wallet": "Nová peněženka",
    "Next": "Další",
    "Nickname": "Uživatelské jméno",
    "No previous transactions": "Žádné předchozí transakce",
    "Node ID": "ID uzlu",
    "Not Available": "Nedostupný",
    "Not Connected": "Nepřipojeno",
    "Not Synced": " Není synchronizováno",
    "OK": "OK",
    "Offer Accepted": "Nabídka přijata",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Mezi každým transakčním blokem je v průměru jedna minuta. Pokud nedojde ke zdržení z důvodu přetížení, zpracování vaší transakce proběhne zhruba do minuty.",
    "Only one backup file is allowed.": "Povolen pouze jeden záložní soubor.",
    "Outgoing": "Odchozí",
    "Paste Mnemonic": "Vložit Mnemonic",
    "Paste Mnemonic (24 words)": "Vložit Mnemonic (24 slov)",
    "Pending": "Čeká na vyřízení",
    "Pending Balance": "Nevyřízený zůstatek",
    "Pending Change": "Nevyřízená změna",
    "Pending Total Balance": "Nevyřízený celkový zůstatek",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Zadejte 0 poplatek. Kladné poplatky ještě nejsou pro RL podporovány.",
    "Please enter a coin": "Prosím zadejte minci",
    "Please enter a filename": "Prosím zadejte název souboru",
    "Please enter a pubkey": "Prosím zadejte pubkey",
    "Please enter a puzzlehash": "Prosím zadejte puzzlehash",
    "Please enter a valid CAT name": "Zadejte prosím platný CAT název",
    "Please enter a valid asset id": "Zadejte prosím platné ID aktiva",
    "Please enter a valid initial coin amount": "Prosím, zadejte platné množství",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Zadejte prosím platné celé číslo 0 a více pro počet záložních ID potřebných pro obnovení.",
    "Please enter a valid numeric amount": "Prosím, zadejte platné množství",
    "Please enter a valid numeric amount.": "Prosím zadejte platnou číselnou hodnotu.",
    "Please enter a valid numeric fee": "Prosím, zadejte platnou číselnou hodnotu",
    "Please enter a valid numeric interval length": "Prosím, zadejte platnou číselnou hodnotu",
    "Please enter a valid numeric spendable amount": "Zadejte prosím platnou číselnou částku, která je k dispozici",
    "Please enter a valid pubkey": "Zadejte prosím platný pubkey",
    "Please enter a valid token name": "Zadejte prosím platný název tokenu",
    "Please enter valid wallet name": "Zadejte prosím platný název peněženky",
    "Please finish syncing before making a transaction": "Prosím dokončete synchronizaci před provedením transakce",
    "Please select backup file first": "Nejprve prosím zvolte záložní soubor",
    "Please wait for wallet synchronization": "Počkejte prosím na synchronizaci peněženky",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Veřejný klíč",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rychlost omezena",
    "Rate Limited Info": "Info o omezení rychlosti",
    "Rate Limited User Wallet Setup": "Nastavení uživatelské peněženky s omezenou rychlostí",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Přijmout",
    "Receive Address": "Adresa příjemce",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Adresa příjemce není barevná adresa peněženky. Zadejte prosím adresu barevné peněženky",
    "Recover": "Obnovit",
    "Recover DID Wallet": "Obnovit DID peněženku",
    "Recover Distributed Identity Wallet": "Obnovit peněženku distribuované identity",
    "Recover Wallet": "Obnovit peněženku",
    "Recoverable Wallet": "Obnovitelná peněženka",
    "Recovery Wallet": "Obnovit peněženku",
    "Rename Wallet": "Přejmenovat peněženku",
    "Retire": "Retire",
    "Save": "Uložit",
    "Search on Tail Database": "Hledat v Tail databázi",
    "Select Wallet": "Vybrat peněženku",
    "Select Wallet Type": "Zvolte typ peněženky",
    "Selected recovery file:": "Vybraný soubor pro obnovení:",
    "Send": "Odeslat",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Poslat tento informační paket uživateli Rate Limited peněženky. Ten jej musí použít k dokončení nastavení své peněženky:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Pošlete svůj veřejný klíč vašemu správci Rate Limited peněženky:",
    "Show Asset Id": "Ukázat ID aktiva",
    "Spendable Amount": "Disponibilní částka",
    "Spendable Amount Per Interval": "Disponibilní částka za interval",
    "Spendable Balance": "Dostupný zůstatek",
    "Spending Interval (number of blocks): {interval}": ["Interval výdajů (počet bloků): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Délka intervalu výdajů (počet bloků)",
    "Spending Limit (chia per interval): {0}": ["Limit výdajů (chia na interval): ", ["0"]],
    "Standard Wallet": "Standardní peněženka",
    "Submit": "Odeslat",
    "Success": "Úspěch",
    "Summary": "Shrnutí",
    "Synced": "Synchronizováno",
    "Syncing": "Synchronizace",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Počet záložních ID potřebných pro obnovení nesmí překročit počet přidaných záložních ID.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "Transakci nelze okamžitě zahrnout do mempoolu, protože zadaný poplatek je příliš nízký. Transakce bude pravidelně opakována a může být zahrnuta do mempoolu, jakmile budou poplatky nižší nebo bude k dispozici prostor.",
    "This access token is verified": "Tento přístupový token je ověřen",
    "This is not a valid address for sending funds to": "Toto není platná adresa pro odesílání prostředků",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Chia zůstatek využitelný pro transakce. Neobsahuje nezpracované odměny za farmaření, nezpracované příchozí transakce a ani převody, které ještě nebyly zaneseny do blockchainu.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Dosud nezpracovaná změna vlastního převodu, která ještě nebyla potvrzena.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Souhrn příchozích a odchozích nezpracovaných změn (zatím nejsou obsaženy v blockchainu). Neobsahuje odměny za farmaření.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "Toto je celkový počet Chia v blockchainu na aktuálním bloku kontrolovaných vaším privátním klíčem. Zahrnuje zmrazené odměny z farmaření ale nezahrnuje čekající příchozí ani odchozí transakce.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Celkový zůstatek plus čekající transakce. Jinými slovy: celkový zůstatek po schválení čekajících transakcí.",
    "To": "Komu",
    "Token and Asset Issuance Limitations": "Omezení vydávání tokenu a aktiv",
    "Token has empty asset id": "Token má prázdné ID aktiva",
    "Token has empty name": "Token má prázdný název",
    "Tokens": "Tokeny",
    "Total Balance": "Celkový zůstatek",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transakce byla úspěšně odeslána do plného uzlu a zahrnuta do mempoolu.",
    "Transactions": "Transakce",
    "User Pubkey": "Uživatelský veřejný klíč",
    "View pending balances": "Zobrazit nevyřízené zůstatky",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Peněženka neexistuje",
    "Wallet with type {0} not supported": ["Peněženka s typem ", ["0"], " není podporována"],
    "Wallet {walletId} not found": ["Peněženka ", ["walletId"], " nenalezena"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Vítejte! Následující slova použijte pro zazálohování své peněženky. Bez těchto slov si nebudete schopni v budoucnu peněženku znovu připojit (např. při přeinstalování počítače). Zapište si každé slovo (spolu s pořadím) a udržujte je v bezpečí!",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Pro dokončení registrace Rate Limited peněženky potřebujete instalační paket. Ten obdržíte od svého správce a vyplníte ho zde:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Váš DID vyžaduje alespoň ", ["dids_num_req"], " soubor atestace", ["0"], " k obnově. Nahrajte prosím další soubory."],
    "Your pasted list does not include 24 valid mnemonic words.": "Váš vkládaný seznam neobsahuje 24 platných mnemotických slov."
  }
};

/*eslint-disable*/
var messages$x = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Fjern",
    "Add": "Tilføj",
    "Add Backup ID": "Tilføj Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Addresse",
    "Address / Puzzle hash": "Addresse / Puzzle hash",
    "Amount": "Beløb",
    "Amount For Initial Coin": "Beløb for Start Coin",
    "Amount must be an even amount.": "Beløbet skal være et lige beløb.",
    "Are you sure you want to delete unconfirmed transactions?": "Er du sikker på, at du vil slette ubekræftede transaktioner?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Saldo",
    "Cancel": "Annuller",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Mønt Navn",
    "Confirmation": "Bekræftelse",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Forbindelses Type",
    "Connections": "Forbindelser",
    "Copy": "Kopier",
    "Create": "Opret",
    "Create An Attestation Packet": "Opret En Attestation Pakke",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Opret Distribueret Identitetspung",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Opret Ny Pung",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Opret Rate Begrænset Admin Pung",
    "Create Rate Limited User Wallet": "Opret Rate Begrænset Bruger Pung",
    "Create Transaction": "Opret Transaktion",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Dato",
    "Delete": "Slet",
    "Delete Unconfirmed Transactions": "Slet Ubekræftede Transaktioner",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distribueret Identitet",
    "Drag and drop attestation packet(s)": "Træk og slip attesteringspakke(r)",
    "Drag and drop your recovery backup file": "Træk og slip din genoprettelsesbackup fil",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Indtast dine 24 mnemoniske ord fra din backup for at gendanne din Chia pung.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Gebyr",
    "Filename": "Filnavn",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP addresse",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importer Pung fra mnemonik",
    "Incoming": "Indgående",
    "Info Packet": "Info Pakke",
    "Initial Amount": "Start Beløb",
    "Initialize a Rate Limited User Wallet:": "Initialiser en Takst Begrænset Bruger Pung:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Administrer Gendannelses-DID'er",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Up/Down",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "Min DID pung",
    "My Pubkey": "Min Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Ny Addresse",
    "New Wallet": "Ny Pung",
    "Next": "Næste",
    "Nickname": "Øgenavn",
    "No previous transactions": "Ingen tidligere transaktioner",
    "Node ID": "Node ID",
    "Not Available": "Ikke Tilgængelig",
    "Not Connected": "Not Connected",
    "Not Synced": "Ikke Synkroniseret",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "I gennemsnit er der et minut mellem hver transaktionsblok. Medmindre der er overbelastning, kan du forvente, at din transaktion bliver inkluderet på mindre end et minut.",
    "Only one backup file is allowed.": "Kun én backup fil er tilladt.",
    "Outgoing": "Udgående",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Afventende",
    "Pending Balance": "Afventende Saldo",
    "Pending Change": "Afventende Ændring",
    "Pending Total Balance": "Afventende Total Saldo",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Venligst indtast 0 gebyr. Positive gebyr ikke understøttet endnu for RL.",
    "Please enter a coin": "Angiv en mønt",
    "Please enter a filename": "Angiv et filnavn",
    "Please enter a pubkey": "Angiv en pubkey",
    "Please enter a puzzlehash": "Angiv et puslehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Indtast venligst et gyldigt indledende mønt beløb",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Angiv et gyldigt antal af 0 eller højrer for antallet af Backup ID nødvendig for gendannelse.",
    "Please enter a valid numeric amount": "Venligst indtast et gyldigt numerisk beløb",
    "Please enter a valid numeric amount.": "Angiv et gyldigt numerisk beløb.",
    "Please enter a valid numeric fee": "Venligst indtast et gyldigt numerisk gebyr",
    "Please enter a valid numeric interval length": "Venligst indtast et gyldigt numerisk interval længde",
    "Please enter a valid numeric spendable amount": "Venligst indtast et gyldigt brugbart beløb",
    "Please enter a valid pubkey": "Venligst indtast en gyldig pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Venligst udfør synkronisering før du opretter en transaktion",
    "Please select backup file first": "Vælg først backupfil",
    "Please wait for wallet synchronization": "Vent venligst på synkronisering af tegnebogen",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubnøgle",
    "Puzzlehash": "Puslehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rate Begrænset",
    "Rate Limited Info": "Takst Begrænset Info",
    "Rate Limited User Wallet Setup": "Takst Begrænset Bruger Pung Opsætning",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Modtager Addresse",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Gendan",
    "Recover DID Wallet": "Gendan DID Pung",
    "Recover Distributed Identity Wallet": "Gendan Distribuerede Identitetspung",
    "Recover Wallet": "Gendan Pung",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Gem",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Vælg Pung Type",
    "Selected recovery file:": "Valgt gendannelsesfil:",
    "Send": "Send",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send denne info pakke til din Takst Begrænset Pung bruger som skal bruge det til at sætte deres pung op:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send din pubnøgle til din Takst Begrænset Pund adminstrator:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Brugbart Beløb",
    "Spendable Amount Per Interval": "Brugbart Beløb Per Interval",
    "Spendable Balance": "Disponibel Saldo",
    "Spending Interval (number of blocks): {interval}": ["Forbrugsinterval (nummer af blokke): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Forbrugsinterval Længde (nummer af blokke)",
    "Spending Limit (chia per interval): {0}": ["Forbrugsgrænse (chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Indsend",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Synkroniseret",
    "Syncing": "Synkroniserer",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Antallet af Backup ID'er, der er nødvendige for genoprettelse, kan ikke overstige antallet af Backup ID'er tilføjet.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Dette er beløbet af Chia du kan bruge på transaktioner nu. Dette eksluderer afventende belønninger fra farmede gevinster, afventende indkomne transaktioner, og Chia du lige har brugt, men ikke er skrevet til blokkæden endnu.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Dette er den afventende ændring, som er vekslet til dig selv, men ikke er bekræftet endnu.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Dette er summen af indkommende og udgående afventende transaktioner (ikke skrevet ind i blokkæden endnu). Dette er ekslusivt farmede gevinster.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Dette er den totalle + afventende saldo: det er hvad din balance vil være når alle afventende transaktioner er bekræftet.",
    "To": "Til",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Total Saldo",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Bruger Pubkey",
    "View pending balances": "Vis afventende saldo",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Pung findes ikke",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Velkommen! De følgende ord bruges som backup til din pung. Uden disse, vil du miste adgang til din pung, opbevar dem sikkert! Skriv alle ordene sammen med deres nummer ned. (Rækkefølgen er vigtig)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Når du modtager din opsætningspakke fra din admin, indtast den herunder for at gennemfører din Rate Begrænset Pung opsætning:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Din DID kræver mindst ", ["dids_num_req"], " attesteringsfil", ["0"], " for gendannelse. Upload venligst yderligere filer."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$w = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Aktionen",
    "Add": "Hinzufügen",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adresse",
    "Address / Puzzle hash": "Adresse / Puzzle hash",
    "Amount": "Betrag",
    "Amount For Initial Coin": "Anzahl für initialen Coin",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Sind Sie sicher, dass Sie unbestätigte Transaktionen löschen möchten?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Guthaben",
    "Cancel": "Abbrechen",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Bestätigung",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Verbindungstyp",
    "Connections": "Verbindungen",
    "Copy": "Kopieren",
    "Create": "Erstellen",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Erstelle beschränktes Admin-Wallet",
    "Create Rate Limited User Wallet": "Beschränktes Benutzer-Wallet erstellen",
    "Create Transaction": "Erstelle Transaktion",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Datum",
    "Delete": "Löschen",
    "Delete Unconfirmed Transactions": "Unbestätigte Transaktionen löschen",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Gib dein gespeichertes 24 Worte langes Mnemonic ein um dein Chia Wallet wiederherzustellen.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Gebühr",
    "Filename": "Dateiname",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP Adresse",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Wallet aus Mnemonics importieren",
    "Incoming": "Eingehend",
    "Info Packet": "Info Paket",
    "Initial Amount": "Anfänglicher Betrag",
    "Initialize a Rate Limited User Wallet:": "Initialisiere ein beschränktes Benutzer-Wallet:",
    "Interval": "Intervall",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Up/Down",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Mein öffentlicher Schlüssel",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Neue Adresse",
    "New Wallet": "Neues Wallet",
    "Next": "Weiter",
    "Nickname": "Spitzname",
    "No previous transactions": "Bisher keine Transaktionen",
    "Node ID": "Node ID",
    "Not Available": "Nicht verfübar",
    "Not Connected": "Not Connected",
    "Not Synced": "Nicht synchronisiert",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Zwischen den einzelnen Transaktionsblöcken gibt es durchschnittlich eine Minute. Wenn es keine Überlastung gibt, kannst du davon ausgehen, dass deine Transaktion in weniger als einer Minute aufgenommen wird.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Ausgehend",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Ausstehend",
    "Pending Balance": "Ausstehendes Guthaben",
    "Pending Change": "Ausstehende Änderung",
    "Pending Total Balance": "Ausstehendes Gesamtguthaben",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Bitte Gebühr von 0 eintragen. Positive Gebühren werden derzeit nicht im RL unterstützt.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Bitte einen gültigen Anfangsbetrag an Coins eingeben",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Bitte einen gültigen numerischen Betrag eingeben",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Bitte eine gültige numerische Gebühr eintragen",
    "Please enter a valid numeric interval length": "Bitte eine gültige numerische interval Länge eintragen",
    "Please enter a valid numeric spendable amount": "Bitte einen gültigen numerischen Ausgabenbetrag eintragen",
    "Please enter a valid pubkey": "Bitte einen gültigen pubkey eintragen",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Bitte beende die Synchronisierung, bevor du eine neue Transaktion durchführst",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Bitte auf Abschluss der Wallet-Synchronisierung warten",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rate Limited",
    "Rate Limited Info": "Rate Limited Info",
    "Rate Limited User Wallet Setup": "Rate Limited Benutzer Wallet Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Empfangsadresse",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Speichern",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Wähle Wallet Typ",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Senden",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Sende dieses Informationspaket an deinen Rate Limited Wallet Benutzer, der es verwenden muss, um die Einrichtung seiner Wallet abzuschließen:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Sende deinen Pubkey an deinen Rate Limited Wallet Administrator:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Verfügbarer Betrag",
    "Spendable Amount Per Interval": "Verfügbarer Betrag pro Intervall",
    "Spendable Balance": "Verfügbares Guthaben",
    "Spending Interval (number of blocks): {interval}": ["Ausgabenintervall (Anzahl der Blöcke): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Länge des Ausgabenintervalls (Anzahl der Blöcke)",
    "Spending Limit (chia per interval): {0}": ["Ausgabenlimit (Chia pro Intervall): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Einreichen",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Synchronisiert",
    "Syncing": "Synchronisieren",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Dies ist die Menge an Chia, mit der du derzeit Transaktionen durchführen kannst. Sie enthält keine ausstehenden Farmbelohnungen, ausstehende eingehende Transaktionen und Chia, die du gerade ausgegeben hast, aber die noch nicht in der Blockchain sind.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Dies ist die ausstehende Änderung. Hierbei handelt es sich um Wechselcoins, die du an dich selbst gesendet hast, aber noch nicht bestätigt wurden.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Dies ist die Summe der eingehenden und ausgehenden ausstehenden Transaktionen (noch nicht in der Blockchain enthalten). Dies beinhaltet keine Farming Belohnungen.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Dies ist das Gesamtguthaben + ausstehende Guthaben: Das ist dein Guthaben nachdem alle ausstehenden Transaktionen bestätigt wurden.",
    "To": "Nach",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Gesamtes Guthaben",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Benutzer Pubkey",
    "View pending balances": "Zeige ausstehendes Guthaben",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Willkommen! Die folgenden Wörter werden zum Wiederherstellen deines Wallets benötigt. Ohne diese wirst du deinen Zugang zum Wallet verlieren, verwahre diese daher sicher auf! Schreibe jedes einzelne Wort mit der dazugehörigen Zahl auf. (Die Reihenfolge ist wichtig)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Wenn du das Setup-Informationspaket von deinem Administrator erhalten hast, gebe Ihn unten ein, um das Setup für das Rate Limited Wallet abzuschließen:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$v = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Ενέργειες",
    "Add": "Προσθήκη",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Διεύθυνση",
    "Address / Puzzle hash": "Διεύθυνση / Puzzle hash",
    "Amount": "Ποσό",
    "Amount For Initial Coin": "Ποσό για Αρχικό Νομίσμα",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Υπόλοιπο",
    "Cancel": "Ακύρωση",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Τύπος σύνδεσης",
    "Connections": "Συνδέσεις",
    "Copy": "Αντιγραφή",
    "Create": "Δημιουργία",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Δημιουργία Πορτοφολιού Διαχειριστή με Περιορισμένο Ρυθμό",
    "Create Rate Limited User Wallet": "Δημιουργία Πορτοφολιού χρήστη με Περιορισμένο Ρυθμό",
    "Create Transaction": "Δημιουργία Συναλλαγής",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Ημερομηνία",
    "Delete": "Διαγραφή",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Εισάγετε το μνημονικό 24ων λέξεων που έχετε αποθηκεύσει για να επαναφέρετε το Chia πορτοφόλι σας.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Προμήθεια",
    "Filename": "Όνομα αρχείου",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Διεύθυνση IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Εισαγωγή πορτοφολιού από Mnemonics",
    "Incoming": "Εισερχόμενες",
    "Info Packet": "Πακέτο Πληροφοριών",
    "Initial Amount": "Αρχικό ποσό",
    "Initialize a Rate Limited User Wallet:": "Δημιουργία Περιορισμένου Ρυθμού του Χρήστη του Πορτοφολιού:",
    "Interval": "Μεσοδιάστημα",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Up/Down",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Αντιγραφή Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Νέα διεύθυνση",
    "New Wallet": "Νέο Πορτοφόλι",
    "Next": "Επόμενο",
    "Nickname": "Ψευδώνυμο",
    "No previous transactions": "Δεν υπάρχουν προηγούμενες συναλλαγές",
    "Node ID": "ID κόμβου",
    "Not Available": "Δεν είναι διαθέσιμο",
    "Not Connected": "Not Connected",
    "Not Synced": "Δεν Είναι Συγχρονισμένο",
    "OK": "Εντάξει",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Κατά μέσο όρο υπάρχει ένα λεπτό μεταξύ κάθε μπλοκ συναλλαγών. Αν δεν υπάρχει συμφόρηση, μπορείτε να περιμένετε ότι η συναλλαγή σας θα συμπεριληφθεί σε λιγότερο από ένα λεπτό.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Εξερχόμενες",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Εκκρεμεί",
    "Pending Balance": "Εκκρεμεί Υπόλοιπο",
    "Pending Change": "Εκκρεμής Αλλαγή",
    "Pending Total Balance": "Συνολικό Υπόλοιπο Σε Εκκρεμότητα",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Παρακαλώ εισάγετε 0 χρέωση. Oι θετικές χρεώσεις δεν υποστηρίζονται ακόμα για RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Παρακαλώ εισάγετε ένα έγκυρο αρχικό ποσό νομίσματος",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Παρακαλώ εισάγετε ένα έγκυρο αριθμητικό ποσό",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Παρακαλώ εισάγετε μια έγκυρη αριθμητική χρέωση",
    "Please enter a valid numeric interval length": "Παρακαλώ εισάγετε ένα έγκυρο αριθμητικό μήκος διαστήματος",
    "Please enter a valid numeric spendable amount": "Παρακαλώ δώστε ένα έγκυρο αριθμητικό δαπανήσιμο ποσό",
    "Please enter a valid pubkey": "Παρακαλώ δώστε ένα έγκυρο pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Παρακαλώ ολοκληρώστε το συγχρονισμό πριν πραγματοποιήσετε μια συναλλαγή",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Περιορισμός συχνότητας",
    "Rate Limited Info": "Rate Limited Info",
    "Rate Limited User Wallet Setup": "Rate Limited User Wallet Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Διεύθυνση Λήψης",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Αποθήκευση",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Επιλέξτε Τύπο Πορτοφολιού",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Αποστολή",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Στείλτε αυτό το πακέτο πληροφοριών στο χρήστη Rate Limited Wallet που πρέπει να το χρησιμοποιήσει για να ολοκληρώσει την εγκατάσταση του πορτοφολιού του:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Στείλτε το δημόσιο κλειδί σας στον διαχειριστή του Rate Limited Wallet:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Spendable Amount",
    "Spendable Amount Per Interval": "Spendable Amount per Interval",
    "Spendable Balance": "Spendable Balance",
    "Spending Interval (number of blocks): {interval}": ["Spending Interval (number of blocks): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Spending Interval Length (number of blocks)",
    "Spending Limit (chia per interval): {0}": ["Όριο δαπανών (chia ανά διάστημα): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Υποβολή",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Συγχρονίστηκε",
    "Syncing": "Συγχρονισμός...",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Αυτό είναι το ποσό των Chia που μπορείτε να χρησιμοποιήσετε επί του παρόντος για να πραγματοποιήσετε συναλλαγές. Δεν περιλαμβάνει εκκρεμείς ανταμοιβές για τη συγκομιδή, εκκρεμείς εισερχόμενες συναλλαγές, και Chia που έχετε μόλις ξοδέψει αλλά δεν είναι ακόμη στο blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Αυτή είναι η αλλαγή που εκκρεμεί, η οποία είναι η αλλαγή νομισμάτων που έχετε στείλει στον εαυτό σας, αλλά δεν έχουν επιβεβαιωθεί ακόμη.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Αυτό είναι το άθροισμα των εισερχόμενων και εξερχόμενων συναλλαγών (που δεν περιλαμβάνονται ακόμη στο blockchain). Αυτό δεν περιλαμβάνει τις farming ανταμοιβές.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Αυτό είναι το συνολικό υπόλοιπο + το εκκρεμές υπόλοιπο: αυτό είναι που θα είναι το υπόλοιπό σας μετά από όλες τις εκκρεμείς συναλλαγές που θα επιβεβαιωθούν.",
    "To": "Προς",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Συνολικό Υπόλοιπο",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Pubkey Χρήστη",
    "View pending balances": "Προβολή εκκρεμών υπολοίπων",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Καλώς ορίσατε! Οι ακόλουθες λέξεις χρησιμοποιούνται για το αντίγραφο ασφαλείας του πορτοφολιού σας. Χωρίς αυτές, θα χάσετε την πρόσβαση στο πορτοφόλι σας. Σημειώστε κάθε λέξη μαζί με τον αριθμό σειράς δίπλα τους. (Η σειρά είναι σημαντική)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Όταν λαμβάνετε το πακέτο πληροφοριών εγκατάστασης από τον διαχειριστή σας, πληκτρολογήστε το παρακάτω για να ολοκληρώσετε την εγκατάσταση του Rate Limited Wallet:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$u = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Actions",
    "Add": "Add",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Address",
    "Address / Puzzle hash": "Address / Puzzle hash",
    "Amount": "How much beer money",
    "Amount For Initial Coin": "Amount For Initial Coin",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorised Payee Wallet",
    "Balance": "Alcohol Balance",
    "Cancel": "Yeh Nah",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Connection type",
    "Connections": "Connections",
    "Copy": "Copy",
    "Create": "Create",
    "Create An Attestation Packet": "Create An Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Create Rate Limited Admin Wallet",
    "Create Rate Limited User Wallet": "Create Rate Limited User Wallet",
    "Create Transaction": "Create Transaction",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Date",
    "Delete": "Delete",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Fee",
    "Filename": "Filename",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP address",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Import Wallet from from your 24 words you wrote down",
    "Incoming": "Beer money into your wallet",
    "Info Packet": "Info Packet",
    "Initial Amount": "Initial Amount",
    "Initialize a Rate Limited User Wallet:": "Initialise a Rate Limited User Wallet:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Up/Down",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "My Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "New Address",
    "New Wallet": "New Wallet",
    "Next": "Next",
    "Nickname": "Nickname",
    "No previous transactions": "No previous transactions",
    "Node ID": "Node ID",
    "Not Available": "Not Available",
    "Not Connected": "Not Connected",
    "Not Synced": "Not Synced, no beer money for you",
    "OK": "You ripper",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute, so sit back, relax, and have another drink.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Beer money out of your wallet",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pending",
    "Pending Balance": "Pending Beer Balance",
    "Pending Change": "Pending Change in Beer money",
    "Pending Total Balance": "Pending Total Beer Balance",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Please enter 0 fee. Positive fees not supported yet for RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Please enter a valid initial coin amount",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Please enter a valid numeric amount",
    "Please enter a valid numeric amount.": "Please enter a valid numeric amount.",
    "Please enter a valid numeric fee": "Please enter a valid numeric fee",
    "Please enter a valid numeric interval length": "Please enter a valid numeric interval length",
    "Please enter a valid numeric spendable amount": "Please enter a valid numeric spendable amount",
    "Please enter a valid pubkey": "Please enter a valid pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Please finish syncing before making a transaction",
    "Please select backup file first": "Please select backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronisation",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rate Limited",
    "Rate Limited Info": "Rate Limited Info",
    "Rate Limited User Wallet Setup": "Rate Limited User Wallet Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Receive Address",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Save",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Select Wallet Type",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Send",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send your pubkey to your Rate Limited Wallet admin:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Spendable Amount for beer money",
    "Spendable Amount Per Interval": "Spendable Amount Per Interval",
    "Spendable Balance": "Spendable Balance for beer money",
    "Spending Interval (number of blocks): {interval}": ["Spending Interval (number of blocks): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Spending Interval Length (number of blocks)",
    "Spending Limit (chia per interval): {0}": ["Spending Limit (chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Submit",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Synced, earning beer money",
    "Syncing": "Syncing, not yet getting beer money",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.",
    "To": "To",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Total Beer Balance",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "User Pubkey",
    "View pending balances": "View pending beer balances",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exists",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$t = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Actions",
    "Add": "Add",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Address",
    "Address / Puzzle hash": "Address / Puzzle hash",
    "Amount": "Amount",
    "Amount For Initial Coin": "Amount For Initial Coin",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Balance",
    "Cancel": "Cancel",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Connection type",
    "Connections": "Connections",
    "Copy": "Copy",
    "Create": "Create",
    "Create An Attestation Packet": "Create An Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Create Rate Limited Admin Wallet",
    "Create Rate Limited User Wallet": "Create Rate Limited User Wallet",
    "Create Transaction": "Create Transaction",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Date",
    "Delete": "Delete",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Fee",
    "Filename": "Filename",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP address",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Import Wallet from Mnemonics",
    "Incoming": "Incoming",
    "Info Packet": "Info Packet",
    "Initial Amount": "Initial Amount",
    "Initialize a Rate Limited User Wallet:": "Initialise a Rate Limited User Wallet:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Create an Offer",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Up/Down",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "My Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "New Address",
    "New Wallet": "New Wallet",
    "Next": "Next",
    "Nickname": "Nickname",
    "No previous transactions": "No previous transactions",
    "Node ID": "Node ID",
    "Not Available": "Not available",
    "Not Connected": "Not Connected",
    "Not Synced": "Not Synced",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Outgoing",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pending",
    "Pending Balance": "Pending Balance",
    "Pending Change": "Pending Change",
    "Pending Total Balance": "Pending Total Balance",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Please enter 0 fee. Positive fees not supported yet for RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Please enter a valid initial coin amount",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Please enter a valid numeric amount",
    "Please enter a valid numeric amount.": "Please enter a valid numeric amount.",
    "Please enter a valid numeric fee": "Please enter a valid numeric fee",
    "Please enter a valid numeric interval length": "Please enter a valid numeric interval length",
    "Please enter a valid numeric spendable amount": "Please enter a valid numeric spendable amount",
    "Please enter a valid pubkey": "Please enter a valid pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Please finish syncing before making a transaction",
    "Please select backup file first": "Please select backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronisation",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rate Limited",
    "Rate Limited Info": "Rate Limited Info",
    "Rate Limited User Wallet Setup": "Rate Limited User Wallet Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Receive Address",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Save",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Select Wallet Type",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Send",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send your pubkey to your Rate Limited Wallet admin:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Spendable Amount",
    "Spendable Amount Per Interval": "Spendable Amount Per Interval",
    "Spendable Balance": "Spendable Balance",
    "Spending Interval (number of blocks): {interval}": ["Spending Interval (number of blocks): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Spending Interval Length (number of blocks)",
    "Spending Limit (chia per interval): {0}": ["Spending Limit (chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Submit",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Synced",
    "Syncing": "Syncing",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.",
    "To": "To",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Total Balance",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "User Pubkey",
    "View pending balances": "View pending balances",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$s = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Orders",
    "Add": "Add",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Coordinates",
    "Address / Puzzle hash": "Coordinates / Puzzle hash",
    "Amount": "Amount",
    "Amount For Initial Coin": "Amount Fer First Dubloon",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Ye Treasure",
    "Cancel": "Abandon",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Contact type",
    "Connections": "Contacts",
    "Copy": "Duplicate",
    "Create": "Make",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Make Rate Limited Pirate Lord Treasure Chest",
    "Create Rate Limited User Wallet": "Make Rate Limited Scallywag Treasure Chest",
    "Create Transaction": "Make Transaction",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Date",
    "Delete": "Maroon",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Give the 24 word mnemonic that ye scribbled down in order t' restore yer Chia treasure chest.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Lootin'",
    "Fee": "Fee",
    "Filename": "Filename",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Moorin' spot",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Get Treasure Chest from Mnemonics",
    "Incoming": "Goin' In",
    "Info Packet": "Note Packet",
    "Initial Amount": "First Amount",
    "Initialize a Rate Limited User Wallet:": "Get a Rate Limited Scallywag Treasure Chest Goin':",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Out/In",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "My Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "New Coordinates",
    "New Wallet": "New Treasure Chest",
    "Next": "Further",
    "Nickname": "Nickname",
    "No previous transactions": "No previous transactions",
    "Node ID": "Node ID",
    "Not Available": "Nothin' 'ere",
    "Not Connected": "Not Connected",
    "Not Synced": "Not Over the Horizon Yet",
    "OK": "YARR",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "On average we got a transaction booty every minute. If pirates aren't movin' loot like crazy, ye can expect yer transaction t' be included in less than a minute.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Goin' Out",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Workin' on it",
    "Pending Balance": "Ye Treasure Under Way",
    "Pending Change": "Change Under Way",
    "Pending Total Balance": "All Yer Under Way Treasure",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Give 0 fee. Positive fees are nah good yet fer RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Give a good first dubloon amount",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Give a good number fer amount",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Give a good number fer a fee",
    "Please enter a valid numeric interval length": "Give a good number fer interval length",
    "Please enter a valid numeric spendable amount": "Give a good number fer squanderable amount",
    "Please enter a valid pubkey": "Give a good pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Get yer syncin' done afore makin' a transaction",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rate Limited",
    "Rate Limited Info": "Rate Limited Info",
    "Rate Limited User Wallet Setup": "Rate Limited Scallywag Treasure Chest Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Yer Treasure's Coordinates (give t'is to scallywags who owe you)",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Save",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Choose type o' treasure chest",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Send",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send this packet t' yer Rate Limited Treasure Chest scallywag who must use it t' complete makin' o' thar treasure chest:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send yer pubkey t' yer Rate Limited Treasure Chest pirate lord:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Squanderable Amount",
    "Spendable Amount Per Interval": "Squanderable Amount Per Interval",
    "Spendable Balance": "Yer Treasure t' Squander",
    "Spending Interval (number of blocks): {interval}": ["Spendin' Interval (number o' booties): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Spendin' Interval Length (number o' booties)",
    "Spending Limit (chia per interval): {0}": ["Squanderin' Limit (chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Go Ahead",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Everythin' jolly",
    "Syncing": "Catchin' up wit' other Capt'ns",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "'tis the amount o' Chia that ye can currently use t' make transactions. It does nah include pendin' lootin' rewards, pendin' incomin' transactions, 'n Chia that ye 'ave jus' spent but ain't yet in the blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "'tis the pendin' change, which are change doubloons which ye 'ave sent t' yourself, but be nah proofed yet.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "'tis the sum o' the incomin' 'n outgoin' pendin' transactions (nah yet included into the blockchain). This be nah includin' lootin' rewards.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "'tis ye whole treasure + ye under way treasure: 'tis wha' yer trasure will be aft all under way treasure be let through.",
    "To": "To",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Ye Whole Treasure",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Scallywag Pubkey",
    "View pending balances": "Look at under way treasures",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Ahoy! Make sure t' scribble down the followin' secret code. Then ye can find yer booty even when ye lost yer ship. Keep 'em safe, or other pirates may take all yer doubloons first! Write down each word along wit' the order number next t' 'em. (Order be important)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "When ye 'ave the setup info packet from yer pirate lord, enter it below t' complete yer Rate Limited Treasure Chest:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$r = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Actions",
    "Add": "Add",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Address",
    "Address / Puzzle hash": "Address / Puzzle hash",
    "Amount": "Amount",
    "Amount For Initial Coin": "Amount for Initial Coin",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Balance",
    "Cancel": "Cancel",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Connection type",
    "Connections": "Connections",
    "Copy": "Copy",
    "Create": "Create",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Create Rate Limited Admin Wallet",
    "Create Rate Limited User Wallet": "Create Rate Limited User Wallet",
    "Create Transaction": "Create Transaction",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Date",
    "Delete": "Delete",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Fee",
    "Filename": "Filename",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP address",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Import Wallet from Mnemonics",
    "Incoming": "Incoming",
    "Info Packet": "Info Packet",
    "Initial Amount": "Initial Amount",
    "Initialize a Rate Limited User Wallet:": "Initialize a Rate Limited User Wallet:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Up/Down",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "My Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "New Address",
    "New Wallet": "New Wallet",
    "Next": "Next",
    "Nickname": "Nickname",
    "No previous transactions": "No previous transactions",
    "Node ID": "Node ID",
    "Not Available": "Not Available",
    "Not Connected": "Not Connected",
    "Not Synced": "Not Synced",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Outgoing",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pending",
    "Pending Balance": "Pending Balance",
    "Pending Change": "Pending Change",
    "Pending Total Balance": "Pending Total Balance",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Please enter 0 fee. Positive fees not supported yet for RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Please enter a valid initial coin amount",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Please enter a valid numeric amount",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Please enter a valid numeric fee",
    "Please enter a valid numeric interval length": "Please enter a valid numeric interval length",
    "Please enter a valid numeric spendable amount": "Please enter a valid numeric spendable amount",
    "Please enter a valid pubkey": "Please enter a valid pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Please finish syncing before making a transaction",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rate Limited",
    "Rate Limited Info": "Rate Limited Info",
    "Rate Limited User Wallet Setup": "Rate Limited User Wallet Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Receive Address",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Save",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Select Wallet Type",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Send",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send your pubkey to your Rate Limited Wallet admin:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Spendable Amount",
    "Spendable Amount Per Interval": "Spendable Amount per Interval",
    "Spendable Balance": "Spendable Balance",
    "Spending Interval (number of blocks): {interval}": ["Spending Interval (number of blocks): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Spending Interval Length (number of blocks)",
    "Spending Limit (chia per interval): {0}": ["Spending Limit (chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Submit",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Synced",
    "Syncing": "Syncing",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.",
    "To": "To",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Total Balance",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "User Pubkey",
    "View pending balances": "View pending balances",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$q = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Acciones",
    "Add": "Añadir",
    "Add Backup ID": "Añadir ID de Respaldo",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Dirección",
    "Address / Puzzle hash": "Dirección / Enigma hash",
    "Amount": "Cantidad",
    "Amount For Initial Coin": "Cantidad Para Moneda Inicial",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "¿Estás seguro de querer eliminar estas transacciones no confirmadas?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Balance",
    "Cancel": "Cancelar",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Nombre de la moneda",
    "Confirmation": "Confirmación",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tipo de Conexión",
    "Connections": "Conexiones",
    "Copy": "Copiar",
    "Create": "Crear",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Crear nueva cartera",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Crear Cartera de Admin con Tarifa Limitada",
    "Create Rate Limited User Wallet": "Crear Cartera de Usuario con Tarifa Limitada",
    "Create Transaction": "Crear Transacción",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Fecha",
    "Delete": "Eliminar",
    "Delete Unconfirmed Transactions": "Eliminar transacciones no confirmadas",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Identidad Distribuida",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Introduzca las 24 palabras mnemotécnicas que has guardado en orden para restaurar su cartera Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Granja",
    "Fee": "Tarifa",
    "Filename": "Nombre del Archivo",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Dirección IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importar Cartera desde Mnemotécnica",
    "Incoming": "Entrante",
    "Info Packet": "Paquete de Información",
    "Initial Amount": "Monto Inicial",
    "Initialize a Rate Limited User Wallet:": "Inicializar un Cartera de Usuario con Tarifa Limitada:",
    "Interval": "Intervalo",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Carga/Descarga",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Mi Llave Pública",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Nueva dirección",
    "New Wallet": "Nueva Cartera",
    "Next": "Siguiente",
    "Nickname": "Apodo",
    "No previous transactions": "No hay transacciones previas",
    "Node ID": "ID de Nodo",
    "Not Available": "No Disponible",
    "Not Connected": "Not Connected",
    "Not Synced": "No sincronizado",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Por término medio, hay un minuto entre cada bloque de transacción. A menos que haya congestión, puede esperar que su transacción sea incluida en menos de un minuto.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Enviado",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pendiente",
    "Pending Balance": "Saldo Pendiente",
    "Pending Change": "Cambio Pendiente",
    "Pending Total Balance": "Saldo Pendiente Total",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Por favor, introduzca una tarifa 0. No están soportadas tarifas positivas todavía para RL.",
    "Please enter a coin": "Por favor ingresa una moneda",
    "Please enter a filename": "Por favor introduzca un nombre de archivo",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Por favor, introduzca una cantidad inicial de monedas válida",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Por favor, introduzca una cantidad numérica válida",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Por favor, introduzca una tarifa numérica válida",
    "Please enter a valid numeric interval length": "Por favor, introduzca un intervalo de longitud numérico válido",
    "Please enter a valid numeric spendable amount": "Por favor, introduzca una cantidad para gastar numérica válida",
    "Please enter a valid pubkey": "Por favor, introduzca una llave pública válida",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Por favor, termine de sincronizar antes de hacer una transacción",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Por favor espere a sincronización de cartera",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Puerto",
    "Pubkey": "Llave Pública",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Tarifa Limitada",
    "Rate Limited Info": "Información de Tarifa Limitada",
    "Rate Limited User Wallet Setup": "Configuración de Cartera de Usuario con Tarifa Limitada",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Dirección de Recibir",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recuperar",
    "Recover DID Wallet": "Recuperar Cartera DID",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recuperar Cartera",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Guardar",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Seleccione Tipo de Cartera",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Enviar",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Envíe este paquete de información al usuario de su Cartera con Tarifa Limitada, que debe usarlo para completar la configuración de su monedero:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Enviar su llave pública a su administrador de Cartera de Tarifa Limitada:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Monto Gastable",
    "Spendable Amount Per Interval": "Monto Gastable por Intervalo",
    "Spendable Balance": "Saldo Gastable",
    "Spending Interval (number of blocks): {interval}": ["Intervalo de Gasto (cantidad de bloques): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Duración del Intervalo de Gasto (cantidad de bloques)",
    "Spending Limit (chia per interval): {0}": ["Limite de gasto (chia por intervalo): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Enviar",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sincronizado",
    "Syncing": "Sincronizando",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Esta es la cantidad de chía que puede utilizar actualmente para realizar transacciones. No incluye recompensas de cultivo pendientes, transacciones entrantes pendientes y Chia que acaba de gastar pero que aún no está en la cadena de bloques.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Esto es un cambio pendiente, los cuales son cambios de monedas que usted se ha enviado a si mismo, pero todavía no han sido confirmados.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Esta es la suma de las transacciones pendientes entrantes y salientes (aún no incluidas en la cadena de bloques). Esto no incluye las recompensas de cultivo.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Este es el saldo total + saldo pendiente: es lo que será su saldo después de que se confirmen todas las transacciones pendientes.",
    "To": "A",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Saldo Total",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Llave Pública de Usuario",
    "View pending balances": "Ver Saldos Pendientes",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "La cartera no existe",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "¡Bienvenido! Las siguientes palabras se utilizan para la copia de seguridad de su cartera. Sin ellas, perderá el acceso a su cartera, ¡manténgalas a salvo! Escriba cada palabra junto con el número de orden junto a ellas. (El orden es importante)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Cuando reciba el paquete de información de configuración de su administrador, ingréselo a continuación para completar la configuración de su Cartera con Tarifa Limitada:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$p = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Acciones",
    "Add": "Agregar",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Dirección",
    "Address / Puzzle hash": "Direccion / Hash",
    "Amount": "Cantidad",
    "Amount For Initial Coin": "Cantidad Para Moneda Inicial",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Balance",
    "Cancel": "Cancelar",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmar",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tipo de Conexión",
    "Connections": "Conexiones",
    "Copy": "Copiar",
    "Create": "Crear",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Crear Monedero de Administrador con Tarifa Limitada",
    "Create Rate Limited User Wallet": "Crear Monedero de Usuario con Tarifa Limitada",
    "Create Transaction": "Crear Transacción",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Fecha",
    "Delete": "Eliminar",
    "Delete Unconfirmed Transactions": "Eliminar transacciones no confirmadas",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Ingresa las 24 palabras mnemotécnicas que guardaste para restaurar tu billetera de Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Granja",
    "Fee": "Comisión",
    "Filename": "Nombre del Archivo",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Dirección IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importar Cartera desde Mnemonics",
    "Incoming": "Entrante",
    "Info Packet": "Paquete de Información",
    "Initial Amount": "Monto Inicial",
    "Initialize a Rate Limited User Wallet:": "Inicializar un Monedero de Usuario con Tarifa Limitada:",
    "Interval": "Intervalo",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Carga/Descarga",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Mi Llave Pública",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Nueva dirección",
    "New Wallet": "Nueva billetera",
    "Next": "Sigiente",
    "Nickname": "Apodo",
    "No previous transactions": "No hay transacciones previas",
    "Node ID": "ID de Nodo",
    "Not Available": "No Disponible",
    "Not Connected": "Not Connected",
    "Not Synced": "No sincronizado",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Por término medio, hay un minuto entre cada bloque de transacción. A menos que haya congestión, puede esperar que su transacción sea incluida en menos de un minuto.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Enviado",
    "Paste Mnemonic": "Pegar mnemotécnico",
    "Paste Mnemonic (24 words)": "Pegar Mnemotécnico",
    "Pending": "Pendiente",
    "Pending Balance": "Balance pendiente",
    "Pending Change": "Cambio Pendiente",
    "Pending Total Balance": "Saldo Pendiente Total",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Por favor, introduzca una tarifa 0. No están soportadas tarifas positivas todavía para RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Por favor, introduzca una cantidad numérica válida",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Por favor, introduzca una cantidad numérica válida",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Por favor, introduzca una tarifa numérica válida",
    "Please enter a valid numeric interval length": "Por favor, introduzca un intervalo de longitud numérico válido",
    "Please enter a valid numeric spendable amount": "Por favor, introduzca una cantidad para gastar numérica válida",
    "Please enter a valid pubkey": "Por favor, introduzca una llave pública válida",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Por favor, termine de sincronizar antes de hacer una transacción",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Puerto",
    "Pubkey": "Llave Pública",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Tasa limitada",
    "Rate Limited Info": "Info de tasa limitada",
    "Rate Limited User Wallet Setup": "Configuración de Monedero de Usuario con Tarifa Limitada",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Dirección Receptora",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Guardar",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Seleccione Tipo de Monedero",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Enviar",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Envíe este paquete de información al usuario de su Cartera con Tarifa Limitada, que debe usarlo para completar la configuración de su monedero:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Enviar su llave pública a su administrador de Cartera de Tarifa Limitada:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Monto Gastable",
    "Spendable Amount Per Interval": "Cantidad gastable por intervalo",
    "Spendable Balance": "Saldo disponible",
    "Spending Interval (number of blocks): {interval}": ["Intervalo de Gasto (cantidad de bloques): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Duración del Intervalo de Gasto (cantidad de bloques)",
    "Spending Limit (chia per interval): {0}": ["Limite de gasto (chia por intervalo): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Enviar",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sincronizado",
    "Syncing": "Sincronizando",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Esta es la cantidad de chía que puede utilizar actualmente para realizar transacciones. No incluye recompensas de cultivo pendientes, transacciones entrantes pendientes y Chia que acaba de gastar pero que aún no está en la cadena de bloques.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Esto es un cambio pendiente, los cuales son cambios de monedas que usted se ha enviado a si mismo, pero todavía no han sido confirmados.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Esta es la suma de las transacciones pendientes entrantes y salientes (aún no incluidas en la cadena de bloques). Esto no incluye las recompensas de cultivo.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "Esta es la cantidad total de chía en la cadena de bloques en el bloque máximo actual que está controlado por sus claves privadas. Incluye recompensas de cultivo congeladas, pero no transacciones entrantes y salientes pendientes.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Este es el saldo total + saldo pendiente: es lo que será su saldo después de que se confirmen todas las transacciones pendientes.",
    "To": "A",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Balance Total",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Llave Pública de Usuario",
    "View pending balances": "Ver saldos pendientes",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "¡Bienvenido! Las siguientes palabras se utilizan para la copia de seguridad de su monedero. Sin ellas, perderá el acceso a su monedero, ¡manténgalas a salvo! Escriba cada palabra junto con el número de orden junto a ellas. (El orden es importante)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Cuando reciba el paquete de información de configuración de su administrador, ingréselo a continuación para completar la configuración de su Monedero con Tarifa Limitada:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Su lista pegada no incluye 24 palabras mnemotécnicas válidas."
  }
};

/*eslint-disable*/
var messages$o = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Acciones",
    "Add": "Añadir",
    "Add Backup ID": "Añadir ID de respaldo",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Dirección",
    "Address / Puzzle hash": "Dirección / Enigma hash",
    "Amount": "Cantidad",
    "Amount For Initial Coin": "Cantidad Para Moneda Inicial",
    "Amount must be an even amount.": "El monto debe ser entero.",
    "Are you sure you want to delete unconfirmed transactions?": "¿Estás seguro de querer eliminar estas transacciones no confirmadas?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Balance",
    "Cancel": "Cancelar",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Nombre de la moneda",
    "Confirmation": "Confirmación",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tipo de Conexión",
    "Connections": "Conexiones",
    "Copy": "Copiar",
    "Create": "Crear",
    "Create An Attestation Packet": "Crear un paquete de Attestation",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Crear Cartera de identidad distribuida",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Crear una nueva cartera",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Crear Cartera de Administrador con Tarifa Limitada",
    "Create Rate Limited User Wallet": "Crear Cartera de Usuario con Tarifa Limitada",
    "Create Transaction": "Crear Transacción",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Fecha",
    "Delete": "Eliminar",
    "Delete Unconfirmed Transactions": "Borrar Transacciones sin Confirmar",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Identidad Distribuida",
    "Drag and drop attestation packet(s)": "Arrastre y suelte paquetes de certificación(es)",
    "Drag and drop your recovery backup file": "Arrastra y suelta tu archivo de respaldo",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Introduzca las 24 palabras mnemotécnicas que has guardado en orden para restaurar su cartera Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Granja",
    "Fee": "Tarifa",
    "Filename": "Nombre del Archivo",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Dirección IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importar cartera desde Mnemotécnica",
    "Incoming": "Entrante",
    "Info Packet": "Paquete de Información",
    "Initial Amount": "Cantidad inicial",
    "Initialize a Rate Limited User Wallet:": "Crear cartera de Usuario con Tarifa Limitada:",
    "Interval": "Intervalo",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Administrar DIDs de Recuperación",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Carga/Descarga",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "Mi cartera DID",
    "My Pubkey": "Mi Llave Pública",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Nueva dirección",
    "New Wallet": "Nueva cartera",
    "Next": "Siguiente",
    "Nickname": "Nickname",
    "No previous transactions": "No hay transacciones previas",
    "Node ID": "ID del nodo",
    "Not Available": "No Disponible",
    "Not Connected": "Not Connected",
    "Not Synced": "No sincronizado",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "En promedio hay un minuto de procesamiento entre cada transaccion de bloques, durante alta congestacion en la red la transaccion puede tomar mas de un minuto.",
    "Only one backup file is allowed.": "Solo un archivo de respaldo es permitido.",
    "Outgoing": "Enviado",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pendiente",
    "Pending Balance": "Balance Pendiente",
    "Pending Change": "Cambio Pendiente",
    "Pending Total Balance": "Saldo Pendiente Total",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Por favor, introduzca una tarifa 0. Las tarifas positivas aún no están soportadas para RL.",
    "Please enter a coin": "Porfavor ingrese una moneda",
    "Please enter a filename": "Porfavor ingrese un nombre de archivo",
    "Please enter a pubkey": "Porfavor ingrese un pubkey",
    "Please enter a puzzlehash": "Porfavor ingrese un puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Por favor, introduzca un monto válido inicial de monedas",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Por favor, introduzca un entero válido de 0 o superior para el número de IDs de copia de seguridad necesarios para la recuperación.",
    "Please enter a valid numeric amount": "Por favor, introduzca un monto numérico válido",
    "Please enter a valid numeric amount.": "Por favor, introduzca un monto numérico válido.",
    "Please enter a valid numeric fee": "Por favor, introduzca una tarifa numérica válida",
    "Please enter a valid numeric interval length": "Por favor, introduzca una longitud de intervalo numérico válida",
    "Please enter a valid numeric spendable amount": "Por favor, introduzca una cantidad para gastar numérica válida",
    "Please enter a valid pubkey": "Por favor, introduzca una llave pública válida",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Por favor, termine de sincronizar antes de hacer una transacción",
    "Please select backup file first": "Por favor, seleccione primero el archivo de copia de seguridad",
    "Please wait for wallet synchronization": "Por favor, espere a la sincronización de cartera",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Puerto",
    "Pubkey": "Llave Pública",
    "Puzzlehash": "Rompecabezas",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Tarifa Limitada",
    "Rate Limited Info": "Información de Tarifa Limitada",
    "Rate Limited User Wallet Setup": "Configuración de Cartera de Usuario con Tarifa Limitada",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Dirección de recepción",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recuperar",
    "Recover DID Wallet": "Recuperar Cartera DID",
    "Recover Distributed Identity Wallet": "Recuperar Cartera de identidad distribuida",
    "Recover Wallet": "Recuperar cartera",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Guardar",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Seleccione Tipo de Cartera",
    "Selected recovery file:": "Archivo de recuperación seleccionado:",
    "Send": "Enviar",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Envíe este paquete de información al usuario de su Cartera con Tarifa Limitada, que debe usarlo para completar la configuración de su cartera:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Enviar si llave pública a su administrador de Cartera de Tarifa Limitada:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Monto Gastable",
    "Spendable Amount Per Interval": "Monto Gastable por Intervalo",
    "Spendable Balance": "Saldo Gastable",
    "Spending Interval (number of blocks): {interval}": ["Intervalo de Gasto (cantidad de bloques): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Duración del Intervalo de Gasto (cantidad de bloques)",
    "Spending Limit (chia per interval): {0}": ["Limite de gasto (chia por intervalo): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Enviar",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sincronizado",
    "Syncing": "Sincronizando",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "El número de IDs de copia de seguridad necesarios para la recuperación no puede exceder el número de IDs de copia de seguridad añadidos.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Esta es la cantidad de chía que puede utilizar actualmente para realizar transacciones. No incluye recompensas de cultivo pendientes, transacciones entrantes pendientes y Chia que acaba de gastar pero que aún no está en la cadena de bloques.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Esto es un cambio pendiente, los cuales son cambios de monedas que usted se ha enviado a si mismo, pero todavía no han sido confirmados.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Esta es la suma de las transacciones pendientes entrantes y salientes (aún no incluidas en la cadena de bloques). Esto no incluye las recompensas de cultivo.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Este es el saldo total + saldo pendiente: es lo que será su saldo después de que se confirmen todas las transacciones pendientes.",
    "To": "A",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Saldo Total",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Llave Pública de Usuario",
    "View pending balances": "Ver Saldos Pendientes",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "El monedero no existe",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "¡Bienvenido! Las siguientes palabras se utilizan para la copia de seguridad de su cartera. Sin ellas, perderá el acceso a su cartera, ¡manténgalas a salvo! Escriba cada palabra junto con el número de orden junto a ellas. (El orden es importante)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Cuando reciba el paquete de información de configuración de su administrador, ingréselo a continuación para completar la configuración de su Cartera con Tarifa Limitada:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Su DID requiere al menos ", ["dids_num_req"], " archivo de verificación", ["0"], " para la recuperación. Por favor, suba archivos adicionales."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$n = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "عملیات",
    "Add": "افزودن",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "آدرس",
    "Address / Puzzle hash": "آدرس/ جورچین هش(در هم ریزی)",
    "Amount": "مقدار",
    "Amount For Initial Coin": "مقدار سکه اولیه",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "موجودی حساب",
    "Cancel": "انصراف",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "نوع اتصال",
    "Connections": "اتصال ها",
    "Copy": "رونوشت",
    "Create": "ایجاد",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "ساخت کیف پول دارای محدودیت نرخ مخصوص مدیر",
    "Create Rate Limited User Wallet": "ساخت کیف پول دارای محدودیت نرخ مخصوص کاربر",
    "Create Transaction": "Create Transaction",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "تاریخ",
    "Delete": "حذف",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "برای بازگردانی کیف پول چیـای خود 24 کلمه یادآور خود را وارد کنید.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "مزرعه",
    "Fee": "Fee",
    "Filename": "Filename",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP address",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Import Wallet from Mnemonics",
    "Incoming": "Incoming",
    "Info Packet": "Info Packet",
    "Initial Amount": "مقدار اولیه",
    "Initialize a Rate Limited User Wallet:": "راه اندازی کیف پول کاربر با نرخ محدود:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB آپلود/دانلود",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "My Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "New Address",
    "New Wallet": "New Wallet",
    "Next": "Next",
    "Nickname": "Nickname",
    "No previous transactions": "No previous transactions",
    "Node ID": "شناسه گره",
    "Not Available": "در دسترس نیست",
    "Not Connected": "Not Connected",
    "Not Synced": "Not Synced",
    "OK": "تأیید",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "در حال خروج",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pending",
    "Pending Balance": "Pending Balance",
    "Pending Change": "Pending Change",
    "Pending Total Balance": "Pending Total Balance",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Please enter 0 fee. Positive fees not supported yet for RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Please enter a valid initial coin amount",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Please enter a valid numeric amount",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Please enter a valid numeric fee",
    "Please enter a valid numeric interval length": "Please enter a valid numeric interval length",
    "Please enter a valid numeric spendable amount": "Please enter a valid numeric spendable amount",
    "Please enter a valid pubkey": "Please enter a valid pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Please finish syncing before making a transaction",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "نرخ محدود شده است",
    "Rate Limited Info": "اطلاعاتِ نرخ محدود",
    "Rate Limited User Wallet Setup": "پیکره بندی کیف پولِ با نرخ(سرعت) محدود",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "آدرس گیرنده",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Save",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Select Wallet Type",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Send",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send your pubkey to your Rate Limited Wallet admin:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "مبلغ قابل خرج کردن",
    "Spendable Amount Per Interval": "مبلغ قابل هزینه در هر فاصله",
    "Spendable Balance": "موجودی قابل برداشت",
    "Spending Interval (number of blocks): {interval}": ["فاصله خرج کردن (تعداد بلوک ها): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "مدت فاصله خرج کردن (تعداد بلوک ها)",
    "Spending Limit (chia per interval): {0}": ["محدودیت خرج کردن (چیـا بر فاصله): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "ثبت و ارسال",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "همگام سازی شده",
    "Syncing": "Syncing",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "این مقدار چیـایی است که در حال حاضر می‌توانید برای انجام تراکنش ها استفاده کنید. این مقدار شامل پاداش معوق مزرعه ، معاملات ورودی معلق و مقدار چیـایی اخیراً هزینه کرده‌اید اما هنوز در زنجیره بلوکی نیستند نمی‌باشد.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "این مقدار موجودی کل + موجودی در حال انتظار است: یعنی موجودی شما در زمانی که تمام تراکنش های در انتظار انجام به تایید برسند.",
    "To": "To",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Total Balance",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "User Pubkey",
    "View pending balances": "مشاهده موجودی های در حال انتظار",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "خوش آمدید! واژه هایی که در ادامه می‌بینید برای پشتیبانی از کیف پول شما هستند. بدون آنها شما دسترسی به کیف پولتان را از دست می‌دهید، آنها را امن و مطمئن نگه دارید.\nهر واژه را به ترتیب اعداد کنارش بنویسید(ترتیب واژه ها مهم است)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "هنگامی که بسته اطلاعات راه‌اندازی را از ادمین خود دریافت می‌کنید، آن را در زیر وارد کنید تا تنظیمات «کیف پول با نرخ محدود» خود را تکمیل کنید:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$m = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Toiminnot",
    "Add": "Lisää",
    "Add Backup ID": "Lisää Varmuuskopion ID",
    "Add Custom Token": "Lisää Kustomoitu Token",
    "Add Token": "Lisää Token",
    "Adding {0} token": ["Lisätään ", ["0"], " token"],
    "Address": "Osoite",
    "Address / Puzzle hash": "Osoite / Puzzle-tiiviste",
    "Amount": "Määrä",
    "Amount For Initial Coin": "Alkumäärä",
    "Amount must be an even amount.": "Anna tasamäärä.",
    "Are you sure you want to delete unconfirmed transactions?": "Haluatko varmasti poistaa nämä vahvistamattomat tapahtumat?",
    "Asset Id": "Assetin Tunniste",
    "Atomic Swap Wallet": "Atomic Swap Lompakko",
    "Authorized Payee Wallet": "Valtuutettu Lompakko",
    "Balance": "Saldo",
    "Cancel": "Peru",
    "Cannot send chia to coloured address. Please enter a chia address.": "Chiaa (XCH) ei voi lähettää CAT-osoitteeseen. Anna chia-osoite.",
    "Check my snapshot balance": "Tarkista snapshot-saldo",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Napsauta tästä ladataksesi vanhan version lompakosta",
    "Coin Name": "Kolikon Nimi",
    "Confirmation": "Vahvista",
    "Confirmed": "Vahvistettu",
    "Confirmed at Height": "Vahvistettu korkeudessa",
    "Connected ({0})": ["Yhdistetty (", ["0"], ")"],
    "Connection type": "Yhteystyyppi",
    "Connections": "Yhteydet",
    "Copy": "Kopioi",
    "Create": "Luo",
    "Create An Attestation Packet": "Luo todistuspaketti",
    "Create Chia Asset Token Wallet from Existing TAIL": "Luo Chia Asset Token -lompakko olemassa olevasta TAIL tunnisteesta",
    "Create Distributed Identity Wallet": "Luo Hajautettu DID-Identiteettilompakko",
    "Create New Chia Asset Token Wallet": "Luo Uusi Chia Asset Token -lompakko",
    "Create New Wallet": "Luo uusi lompakko",
    "Create Offer": "Luo Tarjous",
    "Create Rate Limited Admin Wallet": "Luo Siirtorajoitettu Pääkäyttäjälompakko",
    "Create Rate Limited User Wallet": "Luo Siirtorajoitettu Käyttäjälompakko",
    "Create Transaction": "Luo Transaktio",
    "Create custom CAT Wallet": "Luo kustomi CAT-lompakko",
    "Custody Wallet": "Hallintalompakko (custody)",
    "Custom": "Kustomi",
    "DID Wallet": "DID-lompakko",
    "Date": "Päiväys",
    "Delete": "Poista",
    "Delete Unconfirmed Transactions": "Poista Vahvistamattomat Transaktiot",
    "Derivation Index: {0}": ["Derivaatioindeksi: ", ["0"]],
    "Distributed Identity": "Hajautettu Identiteetti",
    "Drag and drop attestation packet(s)": "Raahaa ja pudota todistuspaketti",
    "Drag and drop your recovery backup file": "Raahaa ja pudota palautuksen varmuuskopiotiedosto",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Anna tallentamasi 24 muistisanaa palauttaaksesi Chia-lompakon.",
    "Error the entered address appears to be for a different colour.": "Virhe, annettu osoite näyttää olevan eri tokenille.",
    "Farm": "Farmi",
    "Fee": "Veloitus",
    "Filename": "Tiedoston nimi",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD- eli hierarkis-deterministiset avaimet ovat julkisen ja salaisen avaimen toteutus, jossa yhtä salaista avainta kohti voi olla lähes loputon määrä julkisia avaimia (ja lompakon osoitteita). Kaikki nämä osoitteet/avaimet osoittavat samaan salaiseen avaimeen.",
    "IP address": "IP-osoite",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "Jos haluat nopeuttaa transaktiota, poista vahvistamattomat transaktiot ja yritä uudelleen korkeammalla maksulla.",
    "Import": "Tuo",
    "Import Wallet from Mnemonics": "Tuo Lompakko Muistisanoista",
    "Incoming": "Saapuva",
    "Info Packet": "Infopaketti",
    "Initial Amount": "Alkusumma",
    "Initialize a Rate Limited User Wallet:": "Alusta Rajoitetun Käytön Käyttäjälompakko:",
    "Interval": "Aikaväli",
    "List of connections is empty": "Yhteyksien luettelo on tyhjä",
    "Loading...": "Ladataan...",
    "Manage Recovery DIDs": "Hallitse Palautus-DID:jä",
    "Manage token list": "Hallitse tokenilistaa",
    "Memo": "Muistio",
    "Memos": "Muistiot",
    "Mempool Full": "Muistipooli Täynnä",
    "MiB Up/Down": "MiB Lähetys/Lataus",
    "Multi Sig Wallet": "Multi Sig -lompakko",
    "My DID Wallet": "Oma hajautettu DID-lompakko",
    "My Pubkey": "Julkinen Avaimeni",
    "NFT Wallet": "NFT-Lompakko",
    "Name": "Nimi",
    "New Address": "Uusi Osoite",
    "New Wallet": "Uusi Lompakko",
    "Next": "Seuraava",
    "Nickname": "Alias",
    "No previous transactions": "Ei aiempia transaktioita",
    "Node ID": "Noodin tunnus",
    "Not Available": "Ei Saatavilla",
    "Not Connected": "Ei yhdistetty",
    "Not Synced": "Ei Synkronoitu",
    "OK": "OK",
    "Offer Accepted": "Tarjous Hyväksytty",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Transaktiolohkon väli on keskimäärin minuutti. Ruuhkattomana aikana transaktiosi voidaan lisätä alle minuutissa lohkoketjuun.",
    "Only one backup file is allowed.": "Vain yksi varmuuskopiotiedosto on sallittu.",
    "Outgoing": "Lähtevä",
    "Paste Mnemonic": "Liitä Muistisanat",
    "Paste Mnemonic (24 words)": "Liitä Muistisanat (24)",
    "Pending": "Odottaa",
    "Pending Balance": "Avoin Saldo",
    "Pending Change": "Avoimet Vaihtorahat",
    "Pending Total Balance": "Avoin Kokonaissumma",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Anna nollaveloitus. Positiivisia veloituksia ei vielä tueta.",
    "Please enter a coin": "Syötä kolikko",
    "Please enter a filename": "Anna tiedostonimi",
    "Please enter a pubkey": "Syötä julkinen pubkey",
    "Please enter a puzzlehash": "Syötä puzzlehash osoitetiiviste",
    "Please enter a valid CAT name": "Anna kelvollinen CAT-nimi",
    "Please enter a valid asset id": "Anna kelvollinen asset ID",
    "Please enter a valid initial coin amount": "Anna käypä kolikoiden määrä",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Syötä kelvollinen 0 tai suurempi kokonaisluku varmuuskopion tunnusten lukumäärälle, jota tarvitaan palauttamiseen.",
    "Please enter a valid numeric amount": "Anna käypä numeerinen arvo",
    "Please enter a valid numeric amount.": "Anna kelvollinen numeerinen summa.",
    "Please enter a valid numeric fee": "Anna käypä numeerinen veloitus",
    "Please enter a valid numeric interval length": "Anna käypä numeerinen intervallin pituus",
    "Please enter a valid numeric spendable amount": "Anna käypä käytettävä määrä",
    "Please enter a valid pubkey": "Anna käypä julkinen avain",
    "Please enter a valid token name": "Anna kelvollinen tokenin nimi",
    "Please enter valid wallet name": "Anna kelvollinen lompakon nimi",
    "Please finish syncing before making a transaction": "Synkronoi loppuun ennen transaktion tekemistä",
    "Please select backup file first": "Valitse varmuuskopiotiedosto ensin",
    "Please wait for wallet synchronization": "Ole hyvä ja odota lompakon synkronointia",
    "Pooling Wallet": "Poolilompakko",
    "Port": "Portti",
    "Pubkey": "Julkinen avain",
    "Puzzlehash": "Puzzlehash-osoitetiiviste",
    "RL Wallet": "Rajoitettu Lompakko",
    "Rate Limited": "Siirtorajoitettu",
    "Rate Limited Info": "Siirtorajoitetetun Tiedot",
    "Rate Limited User Wallet Setup": "Siirtorajoitetun Lompakon Asennus",
    "Read the blog post for details": "Lue blogikirjoitus lisätietoja varten",
    "Receive": "Vastaanota",
    "Receive Address": "Vastaanottajan Osoite",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Vastaanottajan osoite ei ole CAT-osoite. Syötä CAT-osoite",
    "Recover": "Palauta",
    "Recover DID Wallet": "Palauta hajautettu DID-lompakko",
    "Recover Distributed Identity Wallet": "Palauta Hajautettu DID-Identiteettilompakko",
    "Recover Wallet": "Palauta Lompakko",
    "Recoverable Wallet": "Palautettavissa Oleva Lompakko",
    "Recovery Wallet": "Recovery-lompakko",
    "Rename Wallet": "Uudelleennimeä Lompakko",
    "Retire": "Poista vanhentunut",
    "Save": "Tallenna",
    "Search on Tail Database": "Etsi Tail-tietokannasta",
    "Select Wallet": "Valitse Lompakko",
    "Select Wallet Type": "Valitse Lompakkotyyppi",
    "Selected recovery file:": "Valittu palautustiedosto:",
    "Send": "Lähetä",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Lähetä tämä infopaketti Siirtorajoitetun Lompakon käyttäjälle, joka voi käyttää sitä oman lompakkonsa perustamiseen:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Lähetä julkinen avaimesi Siirtorajoitetun Lompakon pääkäyttäjälle:",
    "Show Asset Id": "Näytä Assetin tunniste",
    "Spendable Amount": "Käytettävissä",
    "Spendable Amount Per Interval": "Käytettävissä Ajanjaksoa Kohti",
    "Spendable Balance": "Saldo Käytettävissä",
    "Spending Interval (number of blocks): {interval}": ["Käyttöajanjakso (lohkojen lukum.): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Käyttöajanjakson pituus (lohkojen määrä)",
    "Spending Limit (chia per interval): {0}": ["Käyttöraja (Chiaa/ajanjakso):", ["0"]],
    "Standard Wallet": "Vakiolompakko",
    "Submit": "Lähetä",
    "Success": "Onnistui",
    "Summary": "Yhteenveto",
    "Synced": "Synkronissa",
    "Syncing": "Synkronoi",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "Derivaatioindeksi asettaa lompakon osoitteiden määrän, jota lompakko skannaa lohkoketjusta. Tämä luku on yleensä suurempi, jos sinulla on paljon tapahtumia tai peruutettuja tarjouksia XCH-, CAT- tai NFT-kolikoille. Jos uskot, että saldo on väärä, nosta derivaatioindeksiä, mikä auttaa lompakkoa sisällyttämään puuttuvat kolikot saldoon.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Varmuuskopiotunnusten määrä ei voi ylittää lisättyjen varmuuskopioitunnusten määrää.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "Tapahtumaa ei voitu välittömästi sisällyttää mempooliin, koska määritetty transaktiomaksu on liian alhainen. Transaktiota yritetään uudelleen säännöllisesti, ja se voidaan sisällyttää mempooliin sen jälkeen, kun maksut ovat pienemmät tai kun tilaa tulee saataville.",
    "This access token is verified": "Tämä käyttöoikeustoken on vahvistettu",
    "This is not a valid address for sending funds to": "Tämä ei ole kelvollinen osoite varojen lähettämiseen",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Transaktioihin käytettävissä oleva Chiojen määrä. Ei sisällä avoimia farmarin palkkioita, avoimia saapuvia transaktioita eikä lähetettyjä, mutta vahvistamattomia transaktioita.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Avoimet vaihtorahat ovat kolikoita, jotka olet siirtänyt, mutta joiden siirtoa ei ole vielä vahvistettu loppuun.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Lähtevien ja saapuvien avointen transaktioiden summa (ei vielä lohkoketjussa). Ei sisällä farmarin palkkioita.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "Yksityisten avaimiesi hallinoimien Chiojen kokonaissumma lohkoketjussa. Sisälytää jäädytetyt palkkiot, mutta ei keskeneräisiä tulevia tai lähteviä transaktioita.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Nykyinen saldo + avoin saldo, eli tuleva saldo avointen transaktioiden jälkeen.",
    "To": "Osoitteeseen",
    "Token and Asset Issuance Limitations": "Tokenin ja assettien liikkeeseenlaskun rajoitukset",
    "Token has empty asset id": "Tokenilla on tyhjä assettitunnus",
    "Token has empty name": "Tokenilla on tyhjä nimi",
    "Tokens": "Tokenit",
    "Total Balance": "Kokonaissaldo",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaktio on onnistuneesti lähetetty noodille ja sisällytetty mempooliin.",
    "Transactions": "Transaktiot",
    "User Pubkey": "Käyttäjän julkinen avain",
    "View pending balances": "Näytä avoimet saldot",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Lompakkoa ei löydy",
    "Wallet with type {0} not supported": ["Lompakkotyyppiä ", ["0"], " ei tueta"],
    "Wallet {walletId} not found": ["Lompakkoa ", ["walletId"], " ei löydy"],
    "Want to see your old balance for yourself?": "Haluatko nähdä vanhan saldosi?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "Olemme tehneet päivityksen CAT-standardiin, joka edellyttää, että kaikki CAT:t annetaan uudelleen. Sinulle airdropataan uudet tokenit, koska ne ovat uudelleen liikkeeseenlaskettuja. Airdropatut tokenit perustuvat saldoon lohkokorkeudessa:<0/><1/><2/>(likimääräinen aika: 26 heinäkuu, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Tervetuloa! Seuraavia muistisanoja käytetään lompakon varmuuskopiointiin. Ilman niitä sinulla ei ole pääsyä lompakkoosi. Pidä ne tallessa! Kirjoita ylös sanat ja niiden järjestysnumerot. (Oikea järjestys on tärkeää)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Kun saat infopaketin pääkäyttäjältä, lisää se alle viimeistelläksesi Siirtorajoitetun Lompakon asennuksen:",
    "Your CAT tokens have been upgraded!": "CAT-tokenisi ovat päivitetty.",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["DID vaatii vähintään ", ["dids_num_req"], " todistustiedosto", ["0"], " palautusta varten. Lataa lisää tiedostoja."],
    "Your pasted list does not include 24 valid mnemonic words.": "Liittämäsi lista ei sisällä 24 kelvollista muistisanaa."
  }
};

/*eslint-disable*/
var messages$l = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Actions",
    "Add": "Ajouter",
    "Add Backup ID": "Ajouter un identifiant de secours",
    "Add Custom Token": "Ajouter un Jeton Personnalisé",
    "Add Token": "Ajouter un Type de Jetons",
    "Adding {0} token": ["Ajout du jeton ", ["0"]],
    "Address": "Adresse",
    "Address / Puzzle hash": "Hash de l'adresse / du puzzle",
    "Amount": "Montant",
    "Amount For Initial Coin": "Montant du coin initial",
    "Amount must be an even amount.": "Le montant doit être identique.",
    "Are you sure you want to delete unconfirmed transactions?": "Êtes-vous sûr de vouloir supprimer les transactions non confirmées ?",
    "Asset Id": "Id de l'actif",
    "Atomic Swap Wallet": "Portefeuilles Atomic Swap",
    "Authorized Payee Wallet": "Portefeuille des bénéficiaires autorisés",
    "Balance": "Solde",
    "Cancel": "Annuler",
    "Cannot send chia to coloured address. Please enter a chia address.": "Impossible d'envoyer des chias à une adresse colorée. Merci d'entrer une adresse chia valide.",
    "Check my snapshot balance": "Vérifier le solde du snapshot",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Cliquez ici pour télécharger une ancienne version du portefeuille",
    "Coin Name": "Nom de la monnaie",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmé",
    "Confirmed at Height": "Confirmé à la Hauteur",
    "Connected ({0})": ["Connectés (", ["0"], ")"],
    "Connection type": "Type de connexion",
    "Connections": "Connexions",
    "Copy": "Copier",
    "Create": "Créer",
    "Create An Attestation Packet": "Créer un Paquet d’Attestation",
    "Create Chia Asset Token Wallet from Existing TAIL": "Créer un portefeuille de jetons CAT à partir d'une TAIL existante",
    "Create Distributed Identity Wallet": "Créer un portefeuille d'Identité Décentralisée",
    "Create New Chia Asset Token Wallet": "Créer un Nouveau Portefeuille de Jetons CAT",
    "Create New Wallet": "Créer un nouveau portefeuille",
    "Create Offer": "Créer une offre",
    "Create Rate Limited Admin Wallet": "Créer un Portefeuille Admin à taux limité",
    "Create Rate Limited User Wallet": "Créer un Portefeuille Utilisateur à taux limité",
    "Create Transaction": "Créer une transaction",
    "Create custom CAT Wallet": "Créer un portefeuille CAT personnalisé",
    "Custody Wallet": "Portefeuille coffre-fort",
    "Custom": "Personnaliser",
    "DID Wallet": "Portefeuille DID",
    "Date": "Date",
    "Delete": "Supprimer",
    "Delete Unconfirmed Transactions": "Supprimer les transactions non confirmées",
    "Derivation Index: {0}": ["Indice de dérivation : ", ["0"]],
    "Distributed Identity": "Identité Décentralisée",
    "Drag and drop attestation packet(s)": "Glisser-déposer le(s) paquet(s) d'attestation",
    "Drag and drop your recovery backup file": "Glisser-déposer votre fichier de sauvegarde de récupération",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Entrez les 24 mots mnémotechniques que vous avez sauvegardé afin de restaurer votre portefeuille Chia.",
    "Error the entered address appears to be for a different colour.": "Erreur : l'adresse saisie semble avoir une couleur différente.",
    "Farm": "Ferme",
    "Fee": "Frais",
    "Filename": "Nom du fichier",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD ou clés déterministes hiérachiques sont un type de schéma de clé publique/clé privée dans lequel une clé privée peut avoir un nombre presque infini de clés publiques différentes (et donc autant d'adresses de réception de portefeuille), toutes liées et dépensables par une seule clé privée.",
    "IP address": "Adresse IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "Si vous souhaitez accélérer la transaction, veuillez supprimer les transactions non confirmées et réessayer avec des frais plus élevés.",
    "Import": "Importer",
    "Import Wallet from Mnemonics": "Importer un portefeuille depuis une phrase mnémonique",
    "Incoming": "Entrant",
    "Info Packet": "Information sur le paquet",
    "Initial Amount": "Montant initial",
    "Initialize a Rate Limited User Wallet:": "Initialiser un portefeuille utilisateur à débit limité :",
    "Interval": "Intervalle",
    "List of connections is empty": "La liste des connexions est vide",
    "Loading...": "Chargement...",
    "Manage Recovery DIDs": "Gérer les identités décentralisées de récupération",
    "Manage token list": "Gérer les types de jetons",
    "Memo": "Note",
    "Memos": "Notes",
    "Mempool Full": "Mempool pleine",
    "MiB Up/Down": "Mio envoyés/reçus",
    "Multi Sig Wallet": "Portefeuille multi-signature",
    "My DID Wallet": "Mon portefeuille à identité décentralisée",
    "My Pubkey": "Ma clé publique",
    "NFT Wallet": "Portefeuille NFT",
    "Name": "Nom",
    "New Address": "Nouvelle Adresse",
    "New Wallet": "Nouveau portefeuille",
    "Next": "Suivant",
    "Nickname": "Surnom",
    "No previous transactions": "Aucune transaction précédente",
    "Node ID": "ID du nœud",
    "Not Available": "Non Disponible",
    "Not Connected": "Non connecté",
    "Not Synced": "Non Synchronisé",
    "OK": "D'accord",
    "Offer Accepted": "Offre Acceptée",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "En moyenne, il y a une minute entre chaque bloc de transaction. À moins qu'il n'y ait de congestion, vous pouvez vous attendre à ce que votre transaction soit incluse dans moins d'une minute.",
    "Only one backup file is allowed.": "Seul un fichier de sauvegarde est autorisé.",
    "Outgoing": "Sortant",
    "Paste Mnemonic": "Coller la phrase mnémonique",
    "Paste Mnemonic (24 words)": "Coller la phrase mnémonique (24 mots)",
    "Pending": "En attente",
    "Pending Balance": "Solde en attente",
    "Pending Change": "Monnaie personnelle en attente",
    "Pending Total Balance": "Solde total en attente",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Veuillez entrer 0 taxe. Les taxes positives ne sont pas encore supportées pour les portes-monnaies à vitesse limitée.",
    "Please enter a coin": "Veuillez indiquer une monnaie",
    "Please enter a filename": "Veuillez indiquer un nom de fichier",
    "Please enter a pubkey": "Veuillez indiquer une clé publique",
    "Please enter a puzzlehash": "Veuillez indiquer un hash de puzzle",
    "Please enter a valid CAT name": "Veuillez saisir un nom de jeton valide",
    "Please enter a valid asset id": "Veuillez entrer un identifiant (Asset ID) valide",
    "Please enter a valid initial coin amount": "Veuillez entrer un montant initial valide",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Veuillez saisir un nombre entier valide plus grand ou égal à 0 pour le nombre d'identifiants de sauvegarde nécessaires à la récupération.",
    "Please enter a valid numeric amount": "Veuillez entrer une valeur numérique valide dans le montant",
    "Please enter a valid numeric amount.": "Veuillez saisir un montant numérique valide.",
    "Please enter a valid numeric fee": "Veuillez entrer une valeur numérique valide dans les frais",
    "Please enter a valid numeric interval length": "Merci d'entrer une valeur numérique valide pour la longueur de l'intervalle",
    "Please enter a valid numeric spendable amount": "Veuillez entrer une valeur numérique valide pour le montant dépensable",
    "Please enter a valid pubkey": "Merci d'entrer une clé publique valide",
    "Please enter a valid token name": "Veuillez saisir un nom de jeton valide",
    "Please enter valid wallet name": "Veuillez saisir un nom de portefeuille valide",
    "Please finish syncing before making a transaction": "Merci de terminer la synchronisation avant de faire une transaction",
    "Please select backup file first": "Veuillez d'abord sélectionner le fichier de sauvegarde",
    "Please wait for wallet synchronization": "Veuillez attendre la synchronisation du portefeuille",
    "Pooling Wallet": "Portefeuille de pool",
    "Port": "Port",
    "Pubkey": "Clé publique",
    "Puzzlehash": "Hash du puzzle",
    "RL Wallet": "Portefeuille RL",
    "Rate Limited": "Débit limité",
    "Rate Limited Info": "Info Taux limité",
    "Rate Limited User Wallet Setup": "Configuration Portefeuille Utilisateur à Taux Limité",
    "Read the blog post for details": "Lire le billet de blog pour plus de détails",
    "Receive": "Recevoir",
    "Receive Address": "Adresse de réception",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "L'adresse du destinataire n'est pas une adresse de portefeuille colorée. Veuillez entrer une adresse de portefeuille colorée",
    "Recover": "Récupérer",
    "Recover DID Wallet": "Récupérer le portefeuille à identité décentralisée",
    "Recover Distributed Identity Wallet": "Récupérer le portefeuille d'Identité Décentralisée",
    "Recover Wallet": "Récupérer le portefeuille",
    "Recoverable Wallet": "Portefeuille récupérable",
    "Recovery Wallet": "Portefeuille de récupération",
    "Rename Wallet": "Renommer le portefeuille",
    "Retire": "Enlever",
    "Save": "Définir",
    "Search on Tail Database": "Rechercher sur Tail Database",
    "Select Wallet": "Sélection du portefeuille",
    "Select Wallet Type": "Sélectionner un type de portefeuille",
    "Selected recovery file:": "Fichier de récupération sélectionné :",
    "Send": "Envoyer",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Envoyer ce paquet informatif à vos utilisateurs de portefeuille à débit limité qui doivent l'utiliser pour initialiser leur portefeuille :",
    "Send your pubkey to your Rate Limited Wallet admin:": "Envoyer votre clé publique à vos administrateur de portefeuille à débit limité :",
    "Show Asset Id": "Afficher l'ID de l'Actif",
    "Spendable Amount": "Montant Dépensable",
    "Spendable Amount Per Interval": "Montant dépensable par Intervalle",
    "Spendable Balance": "Solde dépensable",
    "Spending Interval (number of blocks): {interval}": ["Intervalle de dépense (nombre de blocs): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Intervalle de dépense (nombre de blocs)",
    "Spending Limit (chia per interval): {0}": ["Limite de dépense (chia par intervalle): ", ["0"]],
    "Standard Wallet": "Portefeuille standard",
    "Submit": "Envoyer",
    "Success": "Succès",
    "Summary": "Résumé",
    "Synced": "Synchronisé",
    "Syncing": "Synchronisation",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "L'indice de dérivation définit le nombre d'adresses que le portefeuille va scanner sur la blockchain. Ce nombre est généralement plus élevé si vous avez beaucoup de transactions ou d'offres annulées pour XCH, CATs ou NFTs. Si vous pensez que votre solde est incorrect car il manque des pièces, alors augmenter l'indice de dérivation pourrait aider le portefeuille à inclure les pièces manquantes dans le total du solde.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Le nombre d'identifiants de sauvegarde nécessaires à la récupération ne peut pas excéder le nombre d'identifiants de sauvegarde ajoutés.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "La transaction ne peut pas être incluse dans la mempool pour le moment, car les frais définis sont trop faibles. La transaction sera relancée régulièrement, et pourra être incluse une fois que les frais minimum seront moins élevés, ou si la mempool se libère.",
    "This access token is verified": "Ce jeton est vérifié",
    "This is not a valid address for sending funds to": "Cette adresse de destination n'est pas valide",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Il s'agit du montant de Chia que vous pouvez actuellement utiliser pour effectuer des transactions. Cela n'inclut pas les récompenses de culture et les transactions en attente ainsi que les Chia que vous venez de dépenser et qui ne sont pas encore dans la blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Il s'agit des échanges en attente, ce sont des pièces de monnaies d'échange que vous vous êtes envoyé, mais qui n'ont pas encore été confirmées.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Il s'agit de la somme des transactions entrantes et sortantes en attente (pas encore incluses dans la blockchain). Cela n'inclut pas les récompenses de culture.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "Il s'agit du nombre de chias contrôlés par vos clés privées, en date du dernier bloc de la blockchain. Il comprend les récompenses de culture, mais exclus les transactions en cours.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Ceci est le solde total + solde en attente : c'est ce que votre solde sera après que toutes les transactions en attente seront confirmées.",
    "To": "À",
    "Token and Asset Issuance Limitations": "Limites de l'Émission de Jetons et d'Actifs",
    "Token has empty asset id": "Le jeton n'a pas d'identifiant (Asset ID)",
    "Token has empty name": "Le nom du jeton est vide",
    "Tokens": "Jetons",
    "Total Balance": "Solde total",
    "Transaction has successfully been sent to a full node and included in the mempool.": "La transaction a été envoyée avec succès à un nœud complet et est incluse dans la mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Clé publique utilisateur",
    "View pending balances": "Voir le solde en attente",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Le portefeuille n’existe pas",
    "Wallet with type {0} not supported": ["Portefeuille de type ", ["0"], " non pris en charge"],
    "Wallet {walletId} not found": ["Portefeuille ", ["walletId"], " introuvable"],
    "Want to see your old balance for yourself?": "Vous voulez voir votre ancien solde par vous-même ?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "Nous avons fait une mise à jour de la norme CAT qui exige que tous les CAT soient réémis. Vous recevrez vos nouveaux jetons une fois réémis par les créateurs initiaux. Le montant sera basé sur le solde au bloc :<0/><1/><2/>(Date approximative : 26 juillet 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Bienvenue ! Les mots suivants sont utilisés pour la sauvegarde de votre portefeuille. Sans eux, vous perdrez l'accès à votre portefeuille, gardez-les en sécurité ! Notez chaque mot avec le numéro de commande à côté d'eux. (L'ordre est important)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Lorsque vous recevez le paquet d'informations de configuration de votre administrateur, saisissez-le ci-dessous pour terminer la configuration de votre portefeuille à débit limité :",
    "Your CAT tokens have been upgraded!": "Vos jetons CAT ont été mis à jour !",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Votre identité décentralisée nécessite au moins ", ["dids_num_req"], " fichier d'attestation", ["0"], " pour être récupéré. Veuillez importer des fichiers supplémentaires."],
    "Your pasted list does not include 24 valid mnemonic words.": "Votre liste collée ne contient pas 24 mots mnémoniques valides."
  }
};

/*eslint-disable*/
var messages$k = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Radnje",
    "Add": "Dodaj",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adresa",
    "Address / Puzzle hash": "Adresa / Zagonetni hash",
    "Amount": "Iznos",
    "Amount For Initial Coin": "Iznos za Inicijalni novčić",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Stanje",
    "Cancel": "Otkaži",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Vrsta veze",
    "Connections": "Veze",
    "Copy": "Kopiraj",
    "Create": "Kreiraj",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Kreiraj ograničeni Administratorski novčanik",
    "Create Rate Limited User Wallet": "Kreiraj ograničeni Korisnički novčanik",
    "Create Transaction": "Kreiraj Transakciju",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Datum",
    "Delete": "Ukloni",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Unesi 24 mnemonic riječi koje su kreirane prilikom kreiranja novčanika kako bi mogao vratiti postojeći Chia novčanik.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farma",
    "Fee": "Naknada",
    "Filename": "Ime datoteke",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP adresa",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Uvezi Novčanik sa Mnemonics",
    "Incoming": "Dolazni",
    "Info Packet": "Informacijski Paket",
    "Initial Amount": "Početni iznos",
    "Initialize a Rate Limited User Wallet:": "Inicijaliziraj ograničeni Korisnički novčanik:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Odlaz/Dolaz",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Moj Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Nova Adresa",
    "New Wallet": "Novi novčanik",
    "Next": "Dalje",
    "Nickname": "Nadimak",
    "No previous transactions": "Nema prethodnih transakcija",
    "Node ID": "ID Čvora",
    "Not Available": "Nije dostupno",
    "Not Connected": "Not Connected",
    "Not Synced": "Nije sinkronizirano",
    "OK": "U redu",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "U prosjeku je potrebna jedna minuta između svakog transakcijskog bloka. Ukoliko nema zastoja, možeš očekivati uključenje svoje transakcije u manje od minute.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Odlazni",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Na čekanju",
    "Pending Balance": "Iznos na čekanju",
    "Pending Change": "Promjena na čekanju",
    "Pending Total Balance": "Ukupan iznos na čekanju",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Unesi 0 za naknadu. Pozitivne naknade još nisu podržane za RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Unesi ispravan iznos za početni novčić",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Unesi ispravan numerički iznos",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Unesi ispravnu numerički naknadu",
    "Please enter a valid numeric interval length": "Unesi ispravnu numeričku duljinu intervala",
    "Please enter a valid numeric spendable amount": "Unesi ispravan numerički iznos za potrošnju",
    "Please enter a valid pubkey": "Unesi ispravan pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Završi sinkroniziranje prije kreiranja transakcije",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Ulaz",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Ograničeno",
    "Rate Limited Info": "Informacije ograničenja",
    "Rate Limited User Wallet Setup": "Podešavanje ograničenog korisničkog novčanika",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Prijemna adresa",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Spremi",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Odaberi vrstu Novčanika",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Pošalji",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Pošalji ovaj informacijski paket svome korisniku ograničenog novčanika koji ga mora iskoristiti za završetak postavljanja njegovog novčanika:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Pošalji svoj pubkey svome administratoru ograničenog novčanika:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Potrošni iznos",
    "Spendable Amount Per Interval": "Potrošni iznos po intervalu",
    "Spendable Balance": "Potrošni saldo",
    "Spending Interval (number of blocks): {interval}": ["Interval potrošnje (broj blokova): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Duljina intervala potrošnje (broj blokova)",
    "Spending Limit (chia per interval): {0}": ["Limit potrošnje (chia po intervalu): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Poslano",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sinkronizirano",
    "Syncing": "Sinkroniziram",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Ovo je iznos Chia koji trenutno možeš koristiti za transakcije. Ne uključuje nagrade na čekanju, transakcije na čekanju i Chia koje si potrošio, ali još nisu u blockchainu.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Ovo je promjena na čekanju, što su novčići koje si poslao sam sebi, ali još nisu potvrđeni.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Ovo je ukupan zbroj ulaznih i izlaznih transakcija na čekanju (koje još nisu uključene u blockchain). Ovo ne uključuje nagrade uzgoja.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Ovo je ukupan saldo + saldo na čekanju: ono što će tvoj saldo biti nakon što sve transakcije na čekanju budu potvrđene.",
    "To": "Za",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Ukupno stanje",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Korisnički Pubkey",
    "View pending balances": "Pregledaj stanja na čekanju",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Dobrodošao! Navedene riječi se koriste kao sigurnosna kopija tvog Novćanika. Bez njih, nemas pristup svome novčaniku, drži ih sigurno! Zapiši svaku riječ točnim redoslijedom. (Redoslijed je bitan)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Kada zaprimiš informacijski paket od administratora, unesi ga ispod za završetak postavljanja svoj ograničenog novčanika:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$j = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Műveletek",
    "Add": "Hozzáadás",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Cím",
    "Address / Puzzle hash": "Cím / Kirakós hash",
    "Amount": "Összeg",
    "Amount For Initial Coin": "Az aktuális érme mennyiség",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Biztosan törölni szeretné a meg nem erősített tranzakciókat?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Egyenleg",
    "Cancel": "Mégsem",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Megerősítés",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["(", ["0"], ") csatlakoztatva"],
    "Connection type": "A kapcsolat típusa",
    "Connections": "Kapcsolatok",
    "Copy": "Másol",
    "Create": "Létrehoz",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Új tárca létrehozása",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Korlátozott Arányú Admin Tárca létrehozása",
    "Create Rate Limited User Wallet": "Korlátozott Arányú Felhasználó Tárca létrehozása",
    "Create Transaction": "Tranzakció létrehozása",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Dátum",
    "Delete": "Törlés",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Elosztott identitás",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Húzza ide a biztonsági mentés fájlt",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "A Chia pénztárca visszaállításához írja be az elmentett 24 szóból álló mnemonikát.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Díj",
    "Filename": "Fájlnév",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "A HD vagy hierarchikus determinisztikus kulcs egyfajta nyilvános kulcs / privát kulcs séma, ahol egy privát kulcsnak csaknem végtelen számú különféle nyilvános kulcsa lehet (és ezért a tárcának fogadó címei is), amely címek mindegyike egy privát kulcshoz kapcsolódik, amivel az így beérkezett összegek elköthetők.",
    "IP address": "IP-cím",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "A Wallet importálása a Mnemonicsból",
    "Incoming": "Bejövő",
    "Info Packet": "Információs csomag",
    "Initial Amount": "Kezdeti összeg",
    "Initialize a Rate Limited User Wallet:": "Korlátozott Arányú Felhasználó Tárca létrehozása:",
    "Interval": "Intervallum",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Feltöltés/Letöltés",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Publikus kulcsom",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Új cím",
    "New Wallet": "Új tárca hozzáadása",
    "Next": "Következő",
    "Nickname": "Becenév",
    "No previous transactions": "Nincs korábbi tranzakció",
    "Node ID": "Node azonosító",
    "Not Available": "Nem elérhető",
    "Not Connected": "Nincs kapcsolat",
    "Not Synced": "Nem szinkronizált",
    "OK": "Rendben",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Az egyes tranzakciós blokkok között átlagosan egy perc van. Hacsak nincs torlódás, akkor számíthat arra, hogy a tranzakciót kevesebb, mint egy perc alatt bekapcsolja.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Kimenő",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Függőben",
    "Pending Balance": "Függôben lévô egyenleg",
    "Pending Change": "Függőben lévő módosítások",
    "Pending Total Balance": "Függôben lévô egyenleg",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Kérlek ne adj meg fee-t, Pozitív fee nem támogatott egyelőre az RL-hez.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Adjon meg egy fájlnevet",
    "Please enter a pubkey": "Adjon meg egy publikus kulcsot",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Kérjük, adjon meg egy érvényes kezdeti coin összeget",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Kérjük, adjon meg egy érvényes adózás előtti összeget",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Kérjük, adjon meg egy érvényes adózás előtti összeget",
    "Please enter a valid numeric interval length": "Kérjük, érvényes számtartományt adjon meg",
    "Please enter a valid numeric spendable amount": "Kérjük, érvényes számformátumban adja meg a ráfordítható mennyiséget",
    "Please enter a valid pubkey": "Kérem adjon meg érvényes számot",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Kérjük, fejezze be a szinkronizálást mielőtt új tranzakciót indít",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Nyilvános kulcs",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Forgalomkorlátozás",
    "Rate Limited Info": "Forgalomkorlátozási információ",
    "Rate Limited User Wallet Setup": "Forgalomkorlátozott felhasználói pénztárca beállítások",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Fogadó cím",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Visszaállítás",
    "Recover DID Wallet": "DID pénztárca visszaállítása",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Pénztárca visszaállítása",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Mentés",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Válasz pénztárca típust",
    "Selected recovery file:": "Válassza ki a visszaállítási fájlt:",
    "Send": "Küldés",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Küldje el ezt az információs csomagot a \"Forgalomkorlátozott pénztárca\" felhasználójának, akinek a pénztárca beállításának befejezéséhez ezt kell felhasználnia:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Küldje el a publikus címét a Rate Limited Wallet rendszergazdájának:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Elérhetô összeg",
    "Spendable Amount Per Interval": "Idôszakonként elérhetô összeg",
    "Spendable Balance": "Elérhető egyenleg",
    "Spending Interval (number of blocks): {interval}": ["Költési időszak (blokkok száma): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Költési időszak hossza (blokkok száma)",
    "Spending Limit (chia per interval): {0}": ["Költési limit (chia / intervallum): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Elküldés",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Szinkronizálva",
    "Syncing": "Szinkronizálás folyamatban",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Ez az összeg Chia, amelyet jelenleg felhasználhat tranzakciók lebonyolítására. Nem tartalmazza a függőben lévő gazdálkodási jutalmakat, a függőben lévő bejövő tranzakciókat és Chiát, amelyet most költött, de még nem tartozik a blokkláncba.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Ez a függőben lévő változás, amely olyan pénzérme, amelyet Ön küldött magának, de még nem erősítették meg.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Ez a függőben lévő, bejövő és kimenő ügyletek összesítése. (Még nem a blokklánc részei)\nNem tartalmazza a termesztési díjakat.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Ez a teljes egyenleg + függőben lévő egyenleg: ez lesz az egyenleged az összes függőben lévő tranzakció megerősítése után.",
    "To": "Címzett",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Teljes egyenleg",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Felhasználó publikus kulcsa",
    "View pending balances": "Függőben lévő egyenleg megtekintése",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "A tárca nem létezik",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Üdvözöljük! A pénztárca biztonsági mentéséhez a következő szavakat használják. Nélkülük elveszíti hozzáférését pénztárcájához, biztonságban tartsa őket! Írja le az egyes szavakat a mellettük lévő sorszámmal együtt. (A sorrend fontos)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Amikor az admin-tól megkapod a beállításokhoz szükséges információs csomagot, írd be alább, hogy befejezd a korlátozott arányú tárcád beállítását:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$i = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Tindakan",
    "Add": "Tambah",
    "Add Backup ID": "Tambah ID sampingan",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Alamat",
    "Address / Puzzle hash": "Alamat / Hash teka-teki",
    "Amount": "Jumlah",
    "Amount For Initial Coin": "Jumlah Untuk Koin Inisial",
    "Amount must be an even amount.": "Jumlah mesti genap, bukan ganjil.",
    "Are you sure you want to delete unconfirmed transactions?": "Yakin ingin menghapus transaksi yang belum ter konfirmasi ini?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Saldo",
    "Cancel": "Batal",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Nama Wang",
    "Confirmation": "Konfirmasi",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Jenis koneksi",
    "Connections": "Koneksi",
    "Copy": "Salin",
    "Create": "Buat",
    "Create An Attestation Packet": "Buat Paket Pengesahan",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Buat Dompet Distribusi Identiti",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Buat Dompet Baru",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Buat Wallet Admin dengan Batasan Koneksi",
    "Create Rate Limited User Wallet": "Buat User Wallet dengan Batasan Koneksi",
    "Create Transaction": "Buat Transaksi",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Tanggal",
    "Delete": "Hapus",
    "Delete Unconfirmed Transactions": "Hapus transaksi yang belum di konfirmasi",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Pilihan Identitas Terdistribusi",
    "Drag and drop attestation packet(s)": "Seret dan letak paket(paket-paket) pengesahan",
    "Drag and drop your recovery backup file": "Seret dan lepas berkas cadangan anda",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Masukkan 24 kata mnemonik yang telah anda simpan untuk mengembalikan dompet Chia anda.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Biaya",
    "Filename": "Nama file",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Alamat IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Impor Dompet elektronik dari Mnemonik",
    "Incoming": "Masuk",
    "Info Packet": "Paket Info",
    "Initial Amount": "Jumlah Awal",
    "Initialize a Rate Limited User Wallet:": "Mulai Wallet Pengguna dengan Batasan Koneksi:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Mengelola Pemulihan DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Naik/Turun",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "Wallet DID",
    "My Pubkey": "Pubkey saya",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Alamat Baru",
    "New Wallet": "Dompet elektronik Baru",
    "Next": "Selanjutnya",
    "Nickname": "Nama Panggilan",
    "No previous transactions": "Tiada transaksi sebelum ini",
    "Node ID": "Nod ID",
    "Not Available": "Tidak Tersedia",
    "Not Connected": "Not Connected",
    "Not Synced": "Tidak Disinkronkan",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Rata rata ada jarak 1 menit antara masing masing blok transaksi. Kecuali ada kebanyakan transaksi, transaksi biasanya akan di ikutkan dalam waktu kurang dari 1 menit.",
    "Only one backup file is allowed.": "Hanya satu fail backup dibenarkan.",
    "Outgoing": "Keluar",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Dalam proses",
    "Pending Balance": "Dalam Proses Mengira Saldo",
    "Pending Change": "Perubahan Tertunda",
    "Pending Total Balance": "Proses Mengira Jumlah Saldo",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Silahkan memasukkan 0 untuk biaya. Biaya tambahan belum didukung sementara ini untuk RL.",
    "Please enter a coin": "Sila masukkan wang",
    "Please enter a filename": "Silakan masukkan nama fail",
    "Please enter a pubkey": "Silakan masukkan public key yang sah",
    "Please enter a puzzlehash": "Silakan masukkan kata hash yang sah",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Silakan masukkan jumlah Sebelum pajak yang valid",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Silakan masukkan integer valid 0 atau lebih besar untuk jumlah ID Backup yang diperlukan untuk pemulihan.",
    "Please enter a valid numeric amount": "Sila masukkan nombor yang valid",
    "Please enter a valid numeric amount.": "Silahkan memasukkan angka biaya yang sah.",
    "Please enter a valid numeric fee": "Silahkan memasukkan angka biaya yang sah",
    "Please enter a valid numeric interval length": "Silahkan memasukkan panjang interval angka yang sah",
    "Please enter a valid numeric spendable amount": "Sila masukkan nombor perbelanjaan yang valid",
    "Please enter a valid pubkey": "Silakan masukkan public key yang valid",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Silahkan menyelesaikan sinkronisasi sebelum melakukan sebuah transaksi",
    "Please select backup file first": "Pilih berkas dahulu",
    "Please wait for wallet synchronization": "Harap tunggu sampai sinkronisasi dompet selesai",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Kata hash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Batas Kelajuan",
    "Rate Limited Info": "Info Batas Kelajuan",
    "Rate Limited User Wallet Setup": "Dompet Pengguna Hak Terbatas Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Alamat Penerima",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Pulihkan",
    "Recover DID Wallet": "Mendapatkan kembali dompet DID",
    "Recover Distributed Identity Wallet": "Pulih Kembali Dompet Distribusi Identiti",
    "Recover Wallet": "Dapatkan kembali dompet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Simpan",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Pilih Jenis Dompet elektronik",
    "Selected recovery file:": "Pilih fail pulihan:",
    "Send": "Kirim",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Kirim info paket ke Dompet Pengguna Hak Terbatas yang harus digunakan untuk menyelesaikan setup dompet mereka:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Kirim pubkey anda ke admin Dompet Hak Terbatas:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Jumlah boleh dibelanja",
    "Spendable Amount Per Interval": "Jumlah Yang Dapat Dikeluarkan Per Jarak Waktu",
    "Spendable Balance": "Saldo yang Tersedia",
    "Spending Interval (number of blocks): {interval}": ["Pengeluaran Jarak Waktu (jumlah blok): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Durasi Interval Pengeluaran (jumlah blok)",
    "Spending Limit (chia per interval): {0}": ["Batas Pengeluaran (chia per jarak waktu): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Kirim",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sinkron",
    "Syncing": "Sinkronisasi",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Jumlah nombor Backup ID yang diperlukan tidak boleh lebih dari Backup ID yang sedia ada.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Ini adalah jumlah Chia yang ada yang bisa anda gunakan untuk transaksi. Ini tidak berikut penghasilan farming yang masih tertahan, transaksi masuk yang masih tertahan, dan Chia yang sudah anda pakai tapi belum terdaftar di blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Ini adalah perubahan yang tertahan, perubahan koin yang anda kirim ke diri anda sendiri, tetapi belum ter konfirmasi.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Ini ada jumlah dari transaksi masuk dan keluar yang masih dalam antrian (belum terdaftar ke dalam blockchain). Tidak berikut penghasilan dari farming.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Ini adalah total saldo + saldo tertahan: total saldo yang akan ada pegang apabila semua transaksi tertahan sudah di konfirmasi.",
    "To": "Ke",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Jumlah Saldo",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Pubkey User",
    "View pending balances": "Lihat saldo pending",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Berkas tidak ada",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Selamat datang! kata-kata frasa ini akan diguna untuk simpanan dompet elektronik anda. Jika hilang, anda tidak boleh mengeluar data anda. Simpan dalam tempat selamat! Tuliskan setiap ayat dalam tuturan asal. (Pastikan susunan perkataan betul)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Ketika anda menerima paket informasi setup dari administrator, masukan di bawah untuk menyelesaikan setup dompet rate terbatas anda:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["DID anda perlu ", ["dids_num_req"], " berkas pengesahan untuk pemulihan fail", ["0"], ". Silakan masuk file tambahan."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$h = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Azioni",
    "Add": "Aggiungi",
    "Add Backup ID": "Aggiungi Backup Id",
    "Add Custom Token": "Aggiungi un nodo personalizzato",
    "Add Token": "Aggiungi token",
    "Adding {0} token": ["Aggiunta del token ", ["0"]],
    "Address": "Indirizzo",
    "Address / Puzzle hash": "Indirizzo / Puzzle hash",
    "Amount": "Totale",
    "Amount For Initial Coin": "Importo Per Moneta Iniziale",
    "Amount must be an even amount.": "L'importo deve essere coerente",
    "Are you sure you want to delete unconfirmed transactions?": "Sei sicuro di voler eliminare queste transazioni non confermate?",
    "Asset Id": "Id Asset",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Portafoglio Beneficiario Autorizzato",
    "Balance": "Bilancio",
    "Cancel": "Annulla",
    "Cannot send chia to coloured address. Please enter a chia address.": "Errore: impossibile inviare chia ad un indirizzo colorato. Perfavore inserisci un indirizzo chia.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Nome Della Moneta",
    "Confirmation": "Conferma",
    "Confirmed": "Confermato",
    "Confirmed at Height": "Confermato all'altezza",
    "Connected ({0})": ["Connesso a ", ["0"]],
    "Connection type": "Tipo di connessione",
    "Connections": "Connessioni",
    "Copy": "Copia",
    "Create": "Crea",
    "Create An Attestation Packet": "Crea un Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Crea Portafoglio Chia Asset Token dal TAIL esistente",
    "Create Distributed Identity Wallet": "Crea un Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Crea Un Nuovo Portafoglio per Chia Asset Token",
    "Create New Wallet": "Crea un nuovo portafoglio",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Crea un portafoglio di tipo amministratore con tariffa limitata",
    "Create Rate Limited User Wallet": "Crea un portafoglio di tipo utente con tariffa limitata",
    "Create Transaction": "Crea una transazione",
    "Create custom CAT Wallet": "Crea portafoglio CAT personalizzato",
    "Custody Wallet": "Portafoglio di custodia",
    "Custom": "Personalizzato",
    "DID Wallet": "Portafoglio DID",
    "Date": "Data",
    "Delete": "Elimina",
    "Delete Unconfirmed Transactions": "Elimina Transazioni non Confermate",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Trascina e rilascia Attestation Packet",
    "Drag and drop your recovery backup file": "Trascina e rilascia il tuo file di backup per il recovery",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Inserisci le 24 parole mnemoniche che hai salvato per poter ripristinare il tuo wallet Chia.",
    "Error the entered address appears to be for a different colour.": "Errore l'indirizzo inserito sembra essere di un colore diverso.",
    "Farm": "Coltiva",
    "Fee": "Costo della commissione",
    "Filename": "Nome del file",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "Le chiavi HD (Hierarchical Deterministic) sono un tipo di schema a chiave pubblica/privata dove una chiave privata può avere un numero quasi infinito di chiavi pubbliche diverse (e quindi indirizzi di ricezione del wallet) che sono utilizzabili da una singola chiave privata.",
    "IP address": "Indirizzo IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "Se si desidera accelerare la transazione, si prega di eliminare le transazioni non confermate e riprovare con una commissione più alta.",
    "Import": "Importa",
    "Import Wallet from Mnemonics": "Importa Wallet dalle Mnemonic",
    "Incoming": "In arrivo",
    "Info Packet": "Informazioni sul Pacchetto",
    "Initial Amount": "Quantità Iniziale",
    "Initialize a Rate Limited User Wallet:": "Inizializza un Wallet Utente a tariffa Limitata:",
    "Interval": "Intervallo",
    "List of connections is empty": "La lista delle connessioni è vuoto",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Gestisci DID di Recupero",
    "Manage token list": "Gestisci l'elenco dei token",
    "Memo": "Memo",
    "Memos": "Memo",
    "Mempool Full": "Mempool Completa",
    "MiB Up/Down": "MiB Up/Down",
    "Multi Sig Wallet": "Wallet Multi-sig",
    "My DID Wallet": "Il mio Portafoglio DID",
    "My Pubkey": "La mia Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Nome",
    "New Address": "Nuovo Indirizzo",
    "New Wallet": "Nuovo Wallet",
    "Next": "Prossimo",
    "Nickname": "Nickname",
    "No previous transactions": "Nessuna transazione precedente",
    "Node ID": "ID nodo",
    "Not Available": "Non Disponibile",
    "Not Connected": "Disconnesso",
    "Not Synced": "Non Sincronizzato",
    "OK": "OK",
    "Offer Accepted": "Offerta accettata",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Il tempo medio che passa tra un blocco di transazioni e l'altro è di un minuto. Pertanto, salvo casi di congestione, è possibile aspettarsi che una transazione appena effettuata sarà inclusa nel primo blocco utile, quindi validata, in meno di un minuto.",
    "Only one backup file is allowed.": "È consentito un solo file di backup.",
    "Outgoing": "In uscita",
    "Paste Mnemonic": "Incolla il Mnemonico",
    "Paste Mnemonic (24 words)": "Incolla il Mnemonico (24 parole)",
    "Pending": "In attesa",
    "Pending Balance": "Bilancio in attesa",
    "Pending Change": "Cambiamento in attesa",
    "Pending Total Balance": "Bilancio Totale in attesa",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Per favore inserisci tasse 0. Le tasse positive non sono ancora supportate per RL.",
    "Please enter a coin": "Per favore inserisci una moneta",
    "Please enter a filename": "Inserire il Nome File",
    "Please enter a pubkey": "Si prega di inserire una chiave pubblica",
    "Please enter a puzzlehash": "Per favore, inserisci un Puzzlehash",
    "Please enter a valid CAT name": "Si prega di inserire il nome di un CAT valido",
    "Please enter a valid asset id": "Inserisci un Asset ID valido.",
    "Please enter a valid initial coin amount": "Per favore inserisci un ammontare di moneta iniziale valido",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Inserisci un numero intero valido pari o superiore a 0 per il numero di Backup ID che intendi recuperare.",
    "Please enter a valid numeric amount": "Per favore inserisci una ammontare numerico valido",
    "Please enter a valid numeric amount.": "Per favore inserisci una ammontare numerico valido.",
    "Please enter a valid numeric fee": "Per favore inserisci un valore numerico valido per la tassa",
    "Please enter a valid numeric interval length": "Per favore inserisci un intervallo di lunghezza numerico valido",
    "Please enter a valid numeric spendable amount": "Per favore inserisci un ammontare numerico spendibili valido",
    "Please enter a valid pubkey": "Per favore inserisci una pubkey valida",
    "Please enter a valid token name": "Per favore inserisci un nome del Token valido",
    "Please enter valid wallet name": "Per favore inserisci un nome valido per il portafoglio",
    "Please finish syncing before making a transaction": "Per favore completa la sincronizzazione prima di fare una transazione",
    "Please select backup file first": "Cortesemente seleziona il file di backup prima di procedere",
    "Please wait for wallet synchronization": "Attendi la fine della sincronizzazione del wallet",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Porta",
    "Pubkey": "Chiave pubblica",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "Wallet RL",
    "Rate Limited": "Velocità Limitata",
    "Rate Limited Info": "Informazioni Velocità Limitata",
    "Rate Limited User Wallet Setup": "Setup Utente Wallet a Velocità Limitata",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Ricevi",
    "Receive Address": "Indirizzo per Ricevere",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "L'indirizzo del destinatario non è un indirizzo coloured. Inserisci un indirizzo coloured al portafoglio",
    "Recover": "Recupera",
    "Recover DID Wallet": "Recupera wallet DID",
    "Recover Distributed Identity Wallet": "Recupera il Distributed Identity Wallet",
    "Recover Wallet": "Ripristina Wallet",
    "Recoverable Wallet": "Wallet ripristinabile",
    "Recovery Wallet": "Ripristina Wallet",
    "Rename Wallet": "Rinomina Portafoglio",
    "Retire": "Ritira",
    "Save": "Salva",
    "Search on Tail Database": "Cerca nel Tail Database",
    "Select Wallet": "Scegli il portafoglio",
    "Select Wallet Type": "Seleziona Tipo di Wallet",
    "Selected recovery file:": "Seleziona file di recupero:",
    "Send": "Invia",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Invia questo pacchetto di informazioni al tuo utente Wallet a Velocità Limitata che deve usarlo per completare il setup del suo wallet:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Invia la tua pubkey all'amministratore del tuo Wallet a Velocità Limitata:",
    "Show Asset Id": "Mostra Asset Id",
    "Spendable Amount": "Ammontare Spendibile",
    "Spendable Amount Per Interval": "Ammontare Spendibile Per Intervallo",
    "Spendable Balance": "Bilancio Spendibile",
    "Spending Interval (number of blocks): {interval}": ["Intervallo di Spesa (numero di blocchi): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Lunghezza Intervallo di Spesa (numero di blocchi)",
    "Spending Limit (chia per interval): {0}": ["Limite di Spesa (chia per intervallo): ", ["0"]],
    "Standard Wallet": "Portafoglio Standard",
    "Submit": "Invia",
    "Success": "Operazione riuscita",
    "Summary": "Sommario",
    "Synced": "Sincronizzato",
    "Syncing": "Sincronizzando",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Il numero degli ID di backup necessari per il ripristino non può superare il numero degli ID di backup aggiunti.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "La transazione non può essere immediatamente inclusa nella mempool perché la fee specificata è troppo bassa. La transazione verrà riprovata periodicamente, e potrà essere inclusa nella mempool una volta che le commissioni diverranno più basse o se ci sarà spazio per l'ingresso.",
    "This access token is verified": "Questo token di accesso è stato verificato",
    "This is not a valid address for sending funds to": "Questo indirizzo non è valido per l'invio di fondi",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Questo è l'ammontare di Chia che puoi utilizzare attualmente per fare transazioni. Non include le ricompense coltivate in sospeso, transazioni in entrata in sospeso, e Chia che tua hai appena speso ma non sono ancora nella blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Questa è la modifica in sospeso, ovvero le monete di cambio che hai inviato a te stesso, ma che non sono state ancora confermate.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Questa è la somma delle transazioni in sospeso in entrata e in uscita (non ancora incluse nella blockchain). Questo non include le ricompense coltivate.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "Questo è l'ammontare totale di chia all'attuale blocco di picco nella blockchain che è controllato dalle tue chiavi private. Ciò include le ricompense da farming congelate, ma non le transazioni pendenti in ingresso e in uscita.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Questo è il bilancio totale + il bilancio in attesa: questo è il bilancio che apparirà dopo che tutte le transazioni in attesa saranno confermate.",
    "To": "A",
    "Token and Asset Issuance Limitations": "Token e Limitazioni nell'emissioni di beni",
    "Token has empty asset id": "Il token ha un id asset vuoto",
    "Token has empty name": "Il token ha un nome vuoto",
    "Tokens": "Tokens",
    "Total Balance": "Bilancio Totale",
    "Transaction has successfully been sent to a full node and included in the mempool.": "La transazione é stata inviata con successo ad un nodo completo ed inclusa nella mempol.",
    "Transactions": "Transazioni",
    "User Pubkey": "Pubkey utente",
    "View pending balances": "Vedi bilanci in attesa",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Il portafoglio non esiste.",
    "Wallet with type {0} not supported": ["Portafoglio con tipo ", ["0"], " non supportato"],
    "Wallet {walletId} not found": ["Portafoglio ", ["walletId"], " non trovato"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Benvenuto! Le parole seguenti sono utilizzate per il backup del tuo wallet. Senza di queste, perderai l'accesso al tuo wallet, tienile al sicuro! Scrivi ogni parola insieme al suo vicino numero d'ordine. (L'ordine è importate)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Quando ricevi il tuo pacchetto di informazioni di setup dal tuo amministratore, inseriscile sotto per completare il setup del tuo Wallet a Velocità Limitata (RL):",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Il tuo DID richiede almeno ", ["dids_num_req"], " file di attestazione", ["0"], " per il recupero. Carica file aggiuntivi."],
    "Your pasted list does not include 24 valid mnemonic words.": "La lista incollata non include 24 parole mnemoniche valide."
  }
};

/*eslint-disable*/
var messages$g = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "操作",
    "Add": "追加",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "アドレス",
    "Address / Puzzle hash": "アドレス・パズルハッシュ値",
    "Amount": "金額",
    "Amount For Initial Coin": "最初にコインに充てる金額",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "未確認の取引を削除してもよろしいですか?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "残高",
    "Cancel": "キャンセル",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "接続の種類",
    "Connections": "接続数",
    "Copy": "コピー",
    "Create": "作成",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "支払い制限付き管理者ウォレットを作成",
    "Create Rate Limited User Wallet": "支払い制限付きユーザーウォレットを作成",
    "Create Transaction": "取引を作成",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "日時",
    "Delete": "削除",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "チアウォレットを復元するには、24語の合言葉を入力してください。",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "農家",
    "Fee": "手数料",
    "Filename": "ファイル名",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP アドレス",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "合言葉でウォレットをインポート",
    "Incoming": "入金",
    "Info Packet": "情報パケット",
    "Initial Amount": "初期金額",
    "Initialize a Rate Limited User Wallet:": "支払い制限付きユーザーウォレットを初期化:",
    "Interval": "インターバル",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "アップロード・ダウンロード [MiB]",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "私の公開鍵",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "新規アドレス",
    "New Wallet": "新規ウォレット作成",
    "Next": "次へ",
    "Nickname": "ニックネーム",
    "No previous transactions": "履歴無し",
    "Node ID": "ノード ID",
    "Not Available": "該当なし",
    "Not Connected": "Not Connected",
    "Not Synced": "同期されていません",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "取引ブロックは約1分間隔で作成されます。混雑時を除き、1分以内にあなたの送金も取り込まれるはずです。",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "出金",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "保留中",
    "Pending Balance": "保留中の残高",
    "Pending Change": "保留中の増減",
    "Pending Total Balance": "保留中の全残高",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "手数料は 0 を入力してください。 RL ではまだ正の手数料が未実装です。",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "有効な初期金額を入力してください",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "数字を入力してください",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "数字の手数料を入力してください",
    "Please enter a valid numeric interval length": "数字のインターバル長を入力してください",
    "Please enter a valid numeric spendable amount": "支払い可能額を数字で入力してください",
    "Please enter a valid pubkey": "有効な公開鍵を入力してください",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "取引を行う前に同期を完了してください",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "ポート",
    "Pubkey": "公開鍵",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "レート制限付き",
    "Rate Limited Info": "レート制限付きの情報",
    "Rate Limited User Wallet Setup": "レート制限付きユーザーウォレットのセットアップ",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "受取アドレス",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "保存",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "ウォレットの種類を選択してください:",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "送る",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "レート制限ウォレットのユーザーに、セットアップを完了するために必要な情報パケットを送ってください:",
    "Send your pubkey to your Rate Limited Wallet admin:": "レート制限付きウォレットの管理者にあなたの公開鍵を送ってください:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "支払い可能額",
    "Spendable Amount Per Interval": "インターバル毎支払い可能額",
    "Spendable Balance": "支払い可能額",
    "Spending Interval (number of blocks): {interval}": ["支払いインターバル (ブロック数): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "支払いインターバル長 (ブロック数)",
    "Spending Limit (chia per interval): {0}": ["支払い額上限 (チア毎インターバル): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "提出",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "同期完了",
    "Syncing": "同期中",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "取引に使用できるチアの額です。承認待ちの耕作報酬、承認待ちの入金取引、及びブロックチェーンにまだ含まれていない消費チアはいずれも含まれていません。",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "保留中のお釣り、つまり自分自身に送金したが、まだ承認されていないお釣りのコインの額です。",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "これが (まだブロックチェーンに含まれていない) 保留中の入出金の合計です。耕作報酬は含まれていません。",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "これが全残高 + 保留中残高です: 全ての保留中の取引が承認されたら、残高はこの額になります。",
    "To": "宛先",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "全残高",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "ユーザー公開鍵",
    "View pending balances": "保留中残高を表示",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "ご利用ありがとうございます！以下の合言葉はあなたのウォレットのバックアップに使用します。紛失するとウォレットへのアクセスを失いますので、必ず安全な場所に保管してください！各単語を番号と共に書き記してください。 (復元の際は順番通りに入力する必要があります。)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "管理者からセットアップ用の情報パケットを受け取ったら、以下に入力してレート制限付きウォレットのセットアップを完了してください:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$f = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "행동들",
    "Add": "추가하기",
    "Add Backup ID": "백업 ID 추가",
    "Add Custom Token": "사용자 지정 토큰 추가",
    "Add Token": "토큰 추가",
    "Adding {0} token": [["0"], " 토큰 추가중"],
    "Address": "주소",
    "Address / Puzzle hash": "주소 / 퍼즐 해시",
    "Amount": "금액",
    "Amount For Initial Coin": "초기 코인의 양",
    "Amount must be an even amount.": "합계 금액이 균등 해야 합니다.",
    "Are you sure you want to delete unconfirmed transactions?": "확인되지 않은 거래를 삭제하시겠습니까?",
    "Asset Id": "자산 Id",
    "Atomic Swap Wallet": "아토믹 교환 지갑",
    "Authorized Payee Wallet": "승인된 수취인 지갑",
    "Balance": "잔고",
    "Cancel": "취소",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "치아 자산 토큰",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "코인명",
    "Confirmation": "승인",
    "Confirmed": "승인됨",
    "Confirmed at Height": "높이에서 승인",
    "Connected ({0})": ["연결됨 (", ["0"], ")"],
    "Connection type": "연결 유형",
    "Connections": "연결",
    "Copy": "복사",
    "Create": "생성",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "비율 제한 관리자 지갑 생성",
    "Create Rate Limited User Wallet": "비율 제한 사용자 지갑 생성",
    "Create Transaction": "거래 생성하기",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "날짜",
    "Delete": "삭제",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "치아 지갑을 복구하기 위해서 24자로 된 니모닉 단어를 입력하세요.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "농장",
    "Fee": "수수료",
    "Filename": "파일 이름",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP 주소",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "니모닉으로부터 지갑 가져오기",
    "Incoming": "수입",
    "Info Packet": "정보 패킷",
    "Initial Amount": "초기 수량",
    "Initialize a Rate Limited User Wallet:": "비율 제한 사용자 지갑을 초기화합니다.",
    "Interval": "간격",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB 업로드/다운로드",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "나의 공개 키",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "새 주소",
    "New Wallet": "새 지갑",
    "Next": "다음",
    "Nickname": "닉네임",
    "No previous transactions": "거래 내역이 없습니다",
    "Node ID": "노드 ID",
    "Not Available": "사용할 수 없음",
    "Not Connected": "Not Connected",
    "Not Synced": "동기화 되지 않음",
    "OK": "확인",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "당신이 보낸 트랜잭션(이체) 주문이 1분 이내로 처리된다고 느끼겠지만, 평균적으로는 각 트랜잭션 블록은 1분 정도의 차이를 두고 있습니다.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "내보내는 중",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "대기중",
    "Pending Balance": "보류중인 잔고",
    "Pending Change": "잔고 변화",
    "Pending Total Balance": "전체 보류중인 잔고",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "수수료 0을 입력하세요. RL에는 아직 양수 수수료가 지원되지 않습니다.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "유효한 초기 코인의 양을 입럭하십시오",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "유효한 수의 양을 입력하십시오",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "유효한 수의 수수료를 입력하십시오",
    "Please enter a valid numeric interval length": "유효한 길이의 수를 입력하십시오",
    "Please enter a valid numeric spendable amount": "지급 가능한 액수를 정확하게 입력하여 주십시오.",
    "Please enter a valid pubkey": "유효한 공개 키를 입력하십시오",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "거래 주문을 하기 위해서는 동기화가 완료되어야 합니다.",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "포트",
    "Pubkey": "퍼블릭 키",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "비율 제한",
    "Rate Limited Info": "비율 제한 정보",
    "Rate Limited User Wallet Setup": "비율 제한 사용자 지갑 설정",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "입금 주소",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "저장",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "지갑 종류 선택",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "전송",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "이 정보 패킷을 Rate Limited Wallet 사용자에게 보냅니다. 이 사용자는 이를 사용하여 지갑 설정을 완료해야합니다.",
    "Send your pubkey to your Rate Limited Wallet admin:": "이 정보 패킷을 비율 제한 지갑 사용자에게 보냅니다. 이 사용자는 이를 사용하여 지갑 설정을 완료해야합니다.",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "사용 가능한 양",
    "Spendable Amount Per Interval": "간격 당 지출 가능 금액",
    "Spendable Balance": "사용 가능 잔고",
    "Spending Interval (number of blocks): {interval}": ["지출 간격 (블록 수): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "지출 간격 길이 (블록 수)",
    "Spending Limit (chia per interval): {0}": ["지출 한도 (간격 당 chia): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "제출",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "동기화됨",
    "Syncing": "동기화 중",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "이것은 거래를하기 위해 현재 사용할 수있는 Chia의 양입니다. 여기에는 보류중인 농업 보상, 보류중인 수신 거래 및 방금 지출했지만 아직 블록 체인에 포함되지 않은 Chia는 포함되지 않습니다.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "이것은 귀하가 자신에게 보냈지만 아직 확인되지 않은 변경 코인 인 보류중인 변경 사항입니다.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "이것은 들어오고 나가는 보류 트랜잭션의 합계입니다 (아직 블록 체인에 포함되지 않음). 여기에는 농업 보상이 포함되지 않습니다.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "이것은 총 잔액 + 보류 잔액입니다. 모든 보류중인 거래가 확인 된 후 잔액이 됩니다.",
    "To": "수신",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "총 잔고",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "사용자 공개 키",
    "View pending balances": "미결제 잔액보기",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "환영합니다. 다음의 단어들은 당신의 지갑 백업에 사용됩니다. 단어를 잊는다면, 지갑 접근 권한을 잃게 될 것이기 때문에 꼭 저장하세요. 각각의 단어를 순서에 맞게 적어두세요. (순서가 매우 중요합니다)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "관리자로부터 설정 정보 패킷을 받으면 아래에 입력하여 비율 제한 지갑 설정을 완료하세요.",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$e = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Acties",
    "Add": "Toevoegen",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adres",
    "Address / Puzzle hash": "Adres / Puzzel hash",
    "Amount": "Hoeveelheid",
    "Amount For Initial Coin": "Bedrag Voor Initiële Munt",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Saldo",
    "Cancel": "Annuleer",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Verbindingstype",
    "Connections": "Verbindingen",
    "Copy": "Kopieer",
    "Create": "Creëer",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Maak gelimiteerde beheerders portemonnee",
    "Create Rate Limited User Wallet": "Maak gelimiteerde gebruikers portemonnee",
    "Create Transaction": "Maak een transactie",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Datum",
    "Delete": "Verwijder",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Vul de 24 mnemonic woorden in dat die je bewaard hebt om je Chia portemonnee te herstellen.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Vergoeding",
    "Filename": "Bestandsnaam",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP adres",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importeer portemonnee via Mnemonics",
    "Incoming": "Inkomend",
    "Info Packet": "Info pakket",
    "Initial Amount": "Initiële hoeveelheid",
    "Initialize a Rate Limited User Wallet:": "Initialiseer een gebruikersportemonnee met gebruikslimiet:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB uit/in",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Mijn publieke sleutel",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Nieuw adres",
    "New Wallet": "Voeg een wallet toe",
    "Next": "Volgende",
    "Nickname": "Bijnaam",
    "No previous transactions": "Geen vorige transacties",
    "Node ID": "Node ID",
    "Not Available": "Niet beschikbaar",
    "Not Connected": "Not Connected",
    "Not Synced": "Niet gesynchroniseerd",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Gemiddeld is er één minuut tussen elk transactie blok. Tenzij er congestie is, kunt u verwachten dat uw transactie in minder dan een minuut wordt opgenomen.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Uitgaand",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "In afwachting",
    "Pending Balance": "Niet verwerkt saldo",
    "Pending Change": "In afwachting van wijziging",
    "Pending Total Balance": "Niet verwerkt totaal saldo",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Voer 0 toeslag in. Positieve kosten nog niet ondersteund voor RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Vul een geldige aantal initiële coins in",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Vul een geldig numeriek getal in",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Vul een geldige numerieke vergoeding in",
    "Please enter a valid numeric interval length": "Vul een geldige numerieke intervallengte in",
    "Please enter a valid numeric spendable amount": "Vul een geldig numeriek getal in",
    "Please enter a valid pubkey": "Voer een geldige pubkey in",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Synchroniseren voordat u een transactie uitvoert",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Poort",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rate Limited",
    "Rate Limited Info": "Rate Limited Info",
    "Rate Limited User Wallet Setup": "Rate Limited User Wallet Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Ontvangst adres",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Bewaar",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Selecteer wallet type",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Verzend",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send your pubkey to your Rate Limited Wallet admin:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Besteedbaar bedrag",
    "Spendable Amount Per Interval": "Besteedbaar bedrag per interval",
    "Spendable Balance": "Besteedbaar Saldo",
    "Spending Interval (number of blocks): {interval}": ["Bestedingsinterval (aantal Blocks): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Bestedingsinterval Lengte (aantal Blocks)",
    "Spending Limit (chia per interval): {0}": ["Bestedingslimiet (Chia per Interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Verzend",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Gesynchroniseerd",
    "Syncing": "Aan het synchroniseren",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.",
    "To": "Aan",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Totaal saldo",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Pubkey gebruiker",
    "View pending balances": "Bekijk niet verwerkt saldo",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$d = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Handlinger",
    "Add": "Legg til",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adresse",
    "Address / Puzzle hash": "Adresse / Oppgave hash",
    "Amount": "Beløp",
    "Amount For Initial Coin": "Beløp for initiell mynt",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Balanse",
    "Cancel": "Avbryt",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tilkoblingstype",
    "Connections": "Tilkoblinger",
    "Copy": "Kopier",
    "Create": "Opprett",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Opprette ratebegrenset adminstratorlommebok",
    "Create Rate Limited User Wallet": "Opprette ratebegrenset brukerlommebok",
    "Create Transaction": "Opprett Transaksjon",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Dato",
    "Delete": "Slett",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Skriv inn det 24 ordene du har lagret for å gjenopprette din Chia lommebok.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Gård",
    "Fee": "Avgift",
    "Filename": "Filnavn",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP adresse",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importer lommebok fra Mnemonics",
    "Incoming": "Innkommende",
    "Info Packet": "Info Pakke",
    "Initial Amount": "Opprinnelig beløp",
    "Initialize a Rate Limited User Wallet:": "Opprette ratebegrenset bruker lommebok:",
    "Interval": "Intervall",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MB Opp/Ned",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Min Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Ny adresse",
    "New Wallet": "New Wallet",
    "Next": "Neste",
    "Nickname": "Kallenavn",
    "No previous transactions": "No previous transactions",
    "Node ID": "Node ID",
    "Not Available": "Ikke tilgjengelig",
    "Not Connected": "Not Connected",
    "Not Synced": "Ikke synkronisert",
    "OK": "Ok",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Utgående",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pending",
    "Pending Balance": "Pending Balance",
    "Pending Change": "Pending Change",
    "Pending Total Balance": "Pending Total Balance",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Please enter 0 fee. Positive fees not supported yet for RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Please enter a valid initial coin amount",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Please enter a valid numeric amount",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Please enter a valid numeric fee",
    "Please enter a valid numeric interval length": "Please enter a valid numeric interval length",
    "Please enter a valid numeric spendable amount": "Please enter a valid numeric spendable amount",
    "Please enter a valid pubkey": "Please enter a valid pubkey",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Please finish syncing before making a transaction",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Rate Limited",
    "Rate Limited Info": "Rate Limited Info",
    "Rate Limited User Wallet Setup": "Rate Limited User Wallet Setup",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Receive Address",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Save",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Select Wallet Type",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Send",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Send your pubkey to your Rate Limited Wallet admin:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Spendable Amount",
    "Spendable Amount Per Interval": "Spendable Amount per Interval",
    "Spendable Balance": "Spendable Balance",
    "Spending Interval (number of blocks): {interval}": ["Spending Interval (number of blocks): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Spending Interval Length (number of blocks)",
    "Spending Limit (chia per interval): {0}": ["Spending Limit (chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Send",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Synkronisert",
    "Syncing": "Synkroniserer",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.",
    "To": "Til",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Total saldo",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Bruker Pubkey",
    "View pending balances": "Vis ventende saldo",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Velkommen! Følgende ord er brukt for din lommebok. Uten disse vil du miste tilgang til din lommebok, så oppbevar disse trygt! Skriv ned hvert enkelt ord sammen med rekkefølge nummeret ved de. (Rekkefølgen er viktig!)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Når du mottar oppsettspakken fra din admin, skriv den inn nedenfor for å fullføre Rate Limited Wallet oppsett:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$c = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Działania",
    "Add": "Dodaj",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adres",
    "Address / Puzzle hash": "Adres / puzzle hash",
    "Amount": "Ilość",
    "Amount For Initial Coin": "Kwota Na Monetę Początkową",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Saldo",
    "Cancel": "Anuluj",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Typ połączenia",
    "Connections": "Połączenia",
    "Copy": "Kopiuj",
    "Create": "Utwórz",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Utwórz Portfel z limitowaną stawką administratora",
    "Create Rate Limited User Wallet": "Stwórz portfel użytkownika ograniczony czasowo",
    "Create Transaction": "Stwórz transakcję",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Data",
    "Delete": "Usuń",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Podaj ziarno mnemoniczne składające się z 24 słów, aby odzyskać portfel Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farma",
    "Fee": "Opłata",
    "Filename": "Nazwa pliku",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Adres IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importuj portfel z ziarna mnemonicznego",
    "Incoming": "Przychodzące",
    "Info Packet": "Pakiet informacyjny",
    "Initial Amount": "Kwota początkowa",
    "Initialize a Rate Limited User Wallet:": "Zainicjuj limitowany portfel użytkownika:",
    "Interval": "Interwał",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Wysyłanie/Pobieranie",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Mój publiczny klucz",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Nowy adres",
    "New Wallet": "Nowy portfel",
    "Next": "Dalej",
    "Nickname": "Pseudonim",
    "No previous transactions": "Brak wcześniejszych transakcji",
    "Node ID": "ID węzła",
    "Not Available": "Nie dostępne",
    "Not Connected": "Not Connected",
    "Not Synced": "Nie zsynchronizowane",
    "OK": "W porządku",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Średnio pomiędzy każdym blokiem transakcji jest minuta. Jeśli nie ma zatoru, możesz oczekiwać, że Twoja transakcja zostanie zawarta w mniej niż minutę.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Wychodzące",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Oczekujące",
    "Pending Balance": "Oczekujące saldo",
    "Pending Change": "Oczekujące saldo",
    "Pending Total Balance": "Oczekujące saldo",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Wprowadź prowizję 0. Dodatnie prowizje nieobsługiwane jeszcze dla RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Wprowadź prawidłową wartość monet",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Wprowadź prawidłową wartość numeryczną",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Wprowadź prawidłową wartość numeryczną",
    "Please enter a valid numeric interval length": "Wprowadź poprawną wartość numeryczną długości interwału",
    "Please enter a valid numeric spendable amount": "Wprowadź prawidłową wartość numeryczną",
    "Please enter a valid pubkey": "Wprowadź prawidłowy klucz publiczny",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Proszę zakończyć synchronizację przez dokonaniem transakcji",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Klucz publiczny",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Ograniczenie czasowe",
    "Rate Limited Info": "Informacje o ograniczeniu czasowym",
    "Rate Limited User Wallet Setup": "Oceń ograniczoną konfigurację portfela użytkownika",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Odbierz",
    "Receive Address": "Adres odbioru",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Zapisz",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Wybierz typ portfela",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Wyślij",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Wyślij ten pakiet informacji do użytkownika portfela z ograniczoną opcją, który musi go użyć do ukończenia konfiguracji swojego portfela:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Wyślij swój klucz publiczny do administratora portfela z ograniczeniami dotyczącymi stawek:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Dostępna kwota",
    "Spendable Amount Per Interval": "Kwota do wydania na przedział",
    "Spendable Balance": "Dostępne saldo",
    "Spending Interval (number of blocks): {interval}": ["Ograniczenie wydawania (liczba bloków): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Długość ograniczenia wydawania (number bloków)",
    "Spending Limit (chia per interval): {0}": ["Limit wydawania (chia/interwał): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Zatwierdź",
    "Success": "Success",
    "Summary": "Podsumowanie",
    "Synced": "Zsynchronizowano",
    "Syncing": "Synchronizowanie",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "To jest ilość Chia, której możesz obecnie użyć do dokonywania transakcji. Nie obejmuje oczekujących nagród z farmienia, oczekujących transakcji przychodzących i Chia, które właśnie wydałeś, ale nie zostały potwierdzone w łańcuchu bloków.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "To oczekująca zmiana, czyli monety reszty, które wysłałeś do siebie, ale nie zostały jeszcze potwierdzone.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Jest to suma przychodzących i wychodzących transakcji oczekujących (jeszcze nie uwzględnionych w łańcuchu bloków). Nie obejmuje to nagród za farmę.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "To jest całkowite saldo + oczekujące saldo: taki będzie twój stan konta po potwierdzeniu oczekujących transakcji.",
    "To": "Do",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Aktualne saldo",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transakcje",
    "User Pubkey": "Publiczny Klucz Użytkownika",
    "View pending balances": "Zobacz oczekujące saldo",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Witamy! Poniższe słowa służą do tworzenia kopii zapasowej portfela. Bez nich stracisz dostęp do swojego portfela, chroń je! Zapisz każde słowo wraz z numerem zamówienia obok nich. (Kolejność jest ważna)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Gdy otrzymasz pakiet informacji konfiguracyjnych od administratora, wprowadź go poniżej, aby zakończyć konfigurację portfela z ograniczeniami dotyczącymi stawek:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$b = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Ações",
    "Add": "Adicionar",
    "Add Backup ID": "Adicionar ID de Backup",
    "Add Custom Token": "Adicionar um token personalizado",
    "Add Token": "Adicionar token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Endereço",
    "Address / Puzzle hash": "Endereço/Puzzle hash",
    "Amount": "Quantidade",
    "Amount For Initial Coin": "Quantidade Para Moeda Inicial",
    "Amount must be an even amount.": "O montante deve ser um valor par.",
    "Are you sure you want to delete unconfirmed transactions?": "Tem certeza que deseja excluir as transações não confirmadas?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Saldo",
    "Cancel": "Cancelar",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Nome da Moeda",
    "Confirmation": "Confirmação",
    "Confirmed": "Confirmado",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tipo de conexão",
    "Connections": "Conexões",
    "Copy": "Copiar",
    "Create": "Criar",
    "Create An Attestation Packet": "Criar um Pacote de Atestado",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Criar carteira de identidade distribuída",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Criar nova carteira",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Criar carteira de administrador com taxa limitada",
    "Create Rate Limited User Wallet": "Criar carteira de usuário com taxa limitada",
    "Create Transaction": "Criar transação",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Personalizar",
    "DID Wallet": "DID Wallet",
    "Date": "Data",
    "Delete": "Apagar",
    "Delete Unconfirmed Transactions": "Apagar transações não confirmadas",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Identidade Distribuída",
    "Drag and drop attestation packet(s)": "Arraste e solte pacotes de atestado(s)",
    "Drag and drop your recovery backup file": "Arraste e solte seu arquivo de backup",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Digite o mnemônico de 24 palavras que você salvou para restaurar sua carteira Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Fazenda",
    "Fee": "Taxa",
    "Filename": "Nome do arquivo",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Endereço de IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Importar",
    "Import Wallet from Mnemonics": "Importar carteira de Mnemônicos",
    "Incoming": "Entrada",
    "Info Packet": "Pacote de Informações",
    "Initial Amount": "Quantidade inicial",
    "Initialize a Rate Limited User Wallet:": "Inicializar uma carteira de usuário com taxa limitada:",
    "Interval": "Intervalo",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Gerenciar Recuperação DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Enviados/Recebidos",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "Minha carteira DID",
    "My Pubkey": "Minha Pubkey",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Novo endereço",
    "New Wallet": "Nova Carteira",
    "Next": "Próximo",
    "Nickname": "Apelido",
    "No previous transactions": "Sem transações anteriores",
    "Node ID": "ID do nó",
    "Not Available": "Não disponível",
    "Not Connected": "Not Connected",
    "Not Synced": "Não sincronizado",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Em média, há um minuto entre cada bloco de transação. Não ocorrendo congestionamento, você pode esperar que sua transação seja incluída em menos de um minuto.",
    "Only one backup file is allowed.": "Somente um arquivo de backup é permitido.",
    "Outgoing": "Enviado",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pendente",
    "Pending Balance": "Balanço Pendente",
    "Pending Change": "Mudança Pendente",
    "Pending Total Balance": "Saldo Total Pendente",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Por favor insira 0 taxa. Taxas positivas ainda não são suportadas para RL.",
    "Please enter a coin": "Por favor, insira uma moeda",
    "Please enter a filename": "Por favor, insira um nome de arquivo",
    "Please enter a pubkey": "Por favor, insira um pubkey válido",
    "Please enter a puzzlehash": "Digite uma frase de segurança",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Insira um valor de moeda válido",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Insira um valor numérico válido",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Insira uma taxa numérica válida",
    "Please enter a valid numeric interval length": "Insira um comprimento de intervalo numérico válido",
    "Please enter a valid numeric spendable amount": "Insira um valor numérico válido para gastar",
    "Please enter a valid pubkey": "Por favor, insira um pubkey válido",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Conclua a sincronização antes de fazer uma transação",
    "Please select backup file first": "Por favor, selecione o arquivo de backup primeiro",
    "Please wait for wallet synchronization": "Por favor, aguarde a sincronização da carteira",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Porta",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Taxa limitada",
    "Rate Limited Info": "Taxa de informação limitada",
    "Rate Limited User Wallet Setup": "Taxa de configuração da carteira de usuário limitada",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Endereço de recebimento",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recuperar",
    "Recover DID Wallet": "Recuperar carteira DID",
    "Recover Distributed Identity Wallet": "Recuperar Carteira de Identidade Distribuída",
    "Recover Wallet": "Recuperar a carteira",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Salvar",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Selecione o tipo de carteira",
    "Selected recovery file:": "Selecione o arquivo de recuperação:",
    "Send": "Enviar",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Enviar este pacote de informações para sua Carteira de Taxa Limitada que deverá ser usada para completar a configuração da sua carteira:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Envie sua pubkey para a sua Carteira de Taxa Limitada:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Quantidade disponível",
    "Spendable Amount Per Interval": "Quantidade disponível por intervalo",
    "Spendable Balance": "Saldo disponível",
    "Spending Interval (number of blocks): {interval}": ["Intervalo de gastos (número de blocos): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Intervalo de gastos (número de blocos)",
    "Spending Limit (chia per interval): {0}": ["Limite de gastos (chia por intervalo): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Enviar",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sincronizado",
    "Syncing": "Sincronizando",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Esta é a quantidade de Chia que você pode usar atualmente para fazer transações. Não inclui recompensas agrícolas pendentes, transações recebidas pendentes e Chia que você acabou de gastar, mas ainda não está no blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Esta é a mudança pendente, que são moedas de troca que você enviou para si mesmo, mas ainda não foram confirmadas.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Esta é a soma das transações pendentes de entrada e saída (ainda não incluídas no blockchain). Isto não inclui as recompensas dos fazendeiros.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Este é o saldo total + saldo pendente: é isso que o seu saldo será depois que todas as transações pendentes forem confirmadas.",
    "To": "Para",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Balanço Total",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Pubkey do Usuário",
    "View pending balances": "Ver saldos pendentes",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "A carteira não existe",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Bem-vinda! As palavras a seguir são usadas para o backup da carteira. Sem eles, você perderá o acesso à sua carteira, mantenha-os seguros! Escreva cada palavra junto com o número do pedido ao lado delas. (A ordem é importante)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Quando você receber o pacote de informações de configuração de seu administrador, digite-o abaixo para concluir a configuração de sua carteira limitada:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$a = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Ações",
    "Add": "Adicionar",
    "Add Backup ID": "Adicionar ID de Backup",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Adicionar Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Endereço",
    "Address / Puzzle hash": "Endereço/Puzzle hash",
    "Amount": "Quantidade",
    "Amount For Initial Coin": "Quantidade Para Moeda Inicial",
    "Amount must be an even amount.": "O montante deve ser um valor igual.",
    "Are you sure you want to delete unconfirmed transactions?": "Tem certeza que deseja excluir as transações não confirmadas?",
    "Asset Id": "ID do Activo",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Balanço",
    "Cancel": "Cancelar",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Nome da moeda",
    "Confirmation": "Confirmação",
    "Confirmed": "Confirmado",
    "Confirmed at Height": "Confirmado na Altura",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tipo de conexão",
    "Connections": "Conexões",
    "Copy": "Copiar",
    "Create": "Criar",
    "Create An Attestation Packet": "Criar um Pacote de Atestado",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Criar carteira de identidade distribuída",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Criar uma nova carteira",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Criar carteira de administrador com taxa limitada",
    "Create Rate Limited User Wallet": "Criar carteira de utilizador com taxa limitada",
    "Create Transaction": "Criar transação",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Data",
    "Delete": "Eliminar",
    "Delete Unconfirmed Transactions": "Excluir transações não confirmadas",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Identidade distribuída",
    "Drag and drop attestation packet(s)": "Arraste e solte pacotes de atestado",
    "Drag and drop your recovery backup file": "Arraste e solte o seu arquivo de backup de recuperação",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Digite o mnemônico de 24 palavras que você salvou para restaurar sua carteira Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Farm",
    "Fee": "Taxa",
    "Filename": "Nome do ficheiro",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Endereço de IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importar carteira de Mnemônicos",
    "Incoming": "Entrada",
    "Info Packet": "Pacote de Informações",
    "Initial Amount": "Quantidade inicial",
    "Initialize a Rate Limited User Wallet:": "Inicializar uma carteira de usuário com taxa limitada:",
    "Interval": "Intervalo",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Gerenciar Recuperação DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Enviados/Recebidos",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "Minha carteira DID",
    "My Pubkey": "A minha chave pública",
    "NFT Wallet": "NFT Wallet",
    "Name": "Nome",
    "New Address": "Novo endereço",
    "New Wallet": "Nova Carteira",
    "Next": "Próximo",
    "Nickname": "Apelido",
    "No previous transactions": "Sem transações anteriores",
    "Node ID": "ID do Nó",
    "Not Available": "Não disponível",
    "Not Connected": "Not Connected",
    "Not Synced": "Não sincronizado",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Em média, há um minuto entre cada bloco de transação. Não ocorrendo congestionamento, você pode esperar que a sua transação seja incluída em menos de um minuto.",
    "Only one backup file is allowed.": "Somente um arquivo de backup é permitido.",
    "Outgoing": "Enviado",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Pendente",
    "Pending Balance": "Balanço Pendente",
    "Pending Change": "Mudança Pendente",
    "Pending Total Balance": "Saldo Total Pendente",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Por favor insira 0 taxa. Taxas positivas ainda não suportadas para RL.",
    "Please enter a coin": "Por favor insira uma moeda",
    "Please enter a filename": "Por favor, insira um nome de arquivo",
    "Please enter a pubkey": "Por favor, insira uma pubkey",
    "Please enter a puzzlehash": "Por favor, insira um quebra-cabeça",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Por favor, insira um valor de moeda inicial válido",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Por favor, insira um inteiro válido de 0 ou maior para o número de IDs de Backup necessários para a recuperação.",
    "Please enter a valid numeric amount": "Insira um valor numérico válido",
    "Please enter a valid numeric amount.": "Insira um valor numérico válido.",
    "Please enter a valid numeric fee": "Insira uma taxa numérica válida",
    "Please enter a valid numeric interval length": "Insira um comprimento de intervalo numérico válido",
    "Please enter a valid numeric spendable amount": "Insira um valor numérico válido para gastar",
    "Please enter a valid pubkey": "Por favor, insira um pubkey válido",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Conclua a sincronização antes de fazer uma transação",
    "Please select backup file first": "Por favor, selecione o arquivo de backup primeiro",
    "Please wait for wallet synchronization": "Por favor, aguarde a sincronização da carteira",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Porta",
    "Pubkey": "Chave pública",
    "Puzzlehash": "Quebra-cabeça",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Taxa limitada",
    "Rate Limited Info": "Informação de Taxa limitada",
    "Rate Limited User Wallet Setup": "Configuração da carteira do utilizador com taxa limitada",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Endereço de recebimento",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recuperar",
    "Recover DID Wallet": "Recuperar carteira DID",
    "Recover Distributed Identity Wallet": "Recuperar Carteira de Identidade Distribuída",
    "Recover Wallet": "Recuperar Carteira",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Salvar",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Selecione o tipo de carteira",
    "Selected recovery file:": "Arquivo de recuperação selecionado:",
    "Send": "Enviar",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Envie este pacote de informações para o utilizador com carteira de limite de taxa, que deve usá-lo para concluir a configuração de sua carteira:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Envie sua pubkey para o administrador da Carteira de Taxa Limitada:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Quantia para gastar",
    "Spendable Amount Per Interval": "Quantidade de gasto por intervalo",
    "Spendable Balance": "Balanço para Despesas",
    "Spending Interval (number of blocks): {interval}": ["Intervalo de gastos (número de blocos): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Comprimento do intervalo de gasto (número de blocos)",
    "Spending Limit (chia per interval): {0}": ["Limite de gastos (chia por intervalo): ", ["0"]],
    "Standard Wallet": "Carteira Padrão",
    "Submit": "Enviar",
    "Success": "Sucesso",
    "Summary": "Resumo",
    "Synced": "Sincronizado",
    "Syncing": "Sincronizando",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "O número de IDs de Backup necessários para recuperação não pode exceder o número de IDs de Backup adicionados.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Esta é a quantidade de Chia que você pode usar atualmente para fazer transações. Não inclui recompensas agrícolas pendentes, transações recebidas pendentes e Chia que você acabou de gastar, mas ainda não está no blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Esta é a alteração pendente, que são moedas de alteração que você enviou para si mesmo, mas ainda não foram confirmadas.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Esta é a soma das transações pendentes de entrada e saída (ainda não incluídas no blockchain). Isso não inclui recompensas agrícolas.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Este é o saldo total + saldo pendente: é o seu saldo após a confirmação de todas as transações pendentes.",
    "To": "Para",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Balanço Total",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Pubkey do Utilizador",
    "View pending balances": "Ver saldos pendentes",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Carteira não existe",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Bemvindo! As palavras aseguintes são usadas para o backup da carteira. Sem eles, você perderá o acesso à sua carteira, mantenha-os seguros! Escreva cada palavra junto com o número do pedido ao lado delas. (A ordem é importante)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Quando você receber o pacote de informações de configuração de seu administrador, digite-o abaixo para concluir a configuração de sua carteira limitada:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Seu DID requer pelo menos ", ["dids_num_req"], " arquivo de atestado", ["0"], " para recuperação. Faça o upload de arquivos adicionais."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$9 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Acțiuni",
    "Add": "Adaugă",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adresă",
    "Address / Puzzle hash": "Adresă / Hash enigmă",
    "Amount": "Sumă",
    "Amount For Initial Coin": "Suma pentru moneda inițială",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Sold",
    "Cancel": "Anulare",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tipul conexiunii",
    "Connections": "Conexiuni",
    "Copy": "Copiază",
    "Create": "Creează",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Creează un portofel administrativ cu tarif limitat",
    "Create Rate Limited User Wallet": "Creează un portofel de utilizator cu tarif limitat",
    "Create Transaction": "Creează tranzacție",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Data",
    "Delete": "Ștergere",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Introduceti cele 24 de cuvinte din mnemmonic seed pe care le-ati salvat pentru a restaura portofelul dvs. Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Ferma",
    "Fee": "Taxe",
    "Filename": "Nume fisier",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Adresă IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importă portofelul din Mnemonice",
    "Incoming": "Intrări",
    "Info Packet": "Pachet info",
    "Initial Amount": "Sumă inițială",
    "Initialize a Rate Limited User Wallet:": "Inițializează un portofel utilizator cu tarif limitat:",
    "Interval": "Interval",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Sus/Jos",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Cheia mea publică",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Adresă nouă",
    "New Wallet": "Portofel nou",
    "Next": "Următor",
    "Nickname": "Apelativ",
    "No previous transactions": "Nicio tranzacție anterioară",
    "Node ID": "ID-ul Nodului",
    "Not Available": "Indisponibil",
    "Not Connected": "Not Connected",
    "Not Synced": "Nesincronizat",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Expedieri",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "În Așteptare",
    "Pending Balance": "Sold în Așteptare",
    "Pending Change": "Schimb în Așteptare",
    "Pending Total Balance": "Sold Total în Așteptare",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Te rog folosește comision 0. Comisioanele nu sunt suportate în acest moment pentru TL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Te rog să introduci o valoare monetară inițială validă",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Te rog să introduci o valoare numerică validă",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Te rog să introduci un comision valid",
    "Please enter a valid numeric interval length": "Te rog să introduci o valoare numerică validă",
    "Please enter a valid numeric spendable amount": "Te rog să introduci o valoare cheltuibilă validă",
    "Please enter a valid pubkey": "Te rog să introduci o cheie publică validă",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Te rog să finalizezi sincronizarea înainte de a crea o tranzacție",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Tarif Limitat (TL)",
    "Rate Limited Info": "Info Tarif Limitat",
    "Rate Limited User Wallet Setup": "Setare portofel limitat pentru utilizatori",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Adresă de primire",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Salvează",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Selectează tipul portofelului",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Trimite",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Trimit acest pachet de informații utilizatorului tău cu Portofel Tarif Limitat, care trebuie să îl utilizeze pentru a finaliza configurarea portofelului:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Trimite-ți pubkey-ul personal către administratorul de portofel Tarif Limitat:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Sumă cheltuibilă",
    "Spendable Amount Per Interval": "Sumă cheltuibilă per interval",
    "Spendable Balance": "Sold cheltuibil",
    "Spending Interval (number of blocks): {interval}": ["Interval de cheltuieli (număr de blocuri): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Lungimea intervalului pentru cheltuieli (număr de blocuri)",
    "Spending Limit (chia per interval): {0}": ["Limită de cheltuieli (Chia per interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Trimite",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sincronizat",
    "Syncing": "Se sincronizează",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Aceasta este suma de Chia pe care o puteți utiliza în prezent pentru a efectua tranzacții. Nu include recompense în așteptare, tranzacții în așteptare și Chia pe care tocmai le-ați cheltuit, dar care nu se află încă în blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Aceasta este schimbarea în așteptare, care sunt monede de schimb pe care vi le-ați trimis catre dvs, dar care nu au fost încă confirmate.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Aceasta este suma tranzacțiilor în așteptare primite și expediate (neincluse încă în blockchain). Aceasta nu include recompensele.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Acesta este soldul total + soldul în așteptare: acesta va fi soldul dvs. după confirmarea tuturor tranzacțiilor în așteptare.",
    "To": "Catre",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Sold Total",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Pubkey Utilizator",
    "View pending balances": "Vizualizeaza balanta in asteptare",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Bine ati venit! Urmatoarele cuvinte sunt folosite pentru backupul portofelului. Fara ele, veti pierde accesul la portofel, pastrati-le în siguranța! Notati fiecare cuvant impreuna cu numarul de ordine de langa ele. (Ordinea este importanta)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Cand primiti pachetul de informatii despre configurare de la administratorul dvs., introduceti-l mai jos pentru a finaliza configurarea portofelului dvs. limitat:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$8 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Действия",
    "Add": "Добавить",
    "Add Backup ID": "Добавить ID резервной копии",
    "Add Custom Token": "Добавить пользовательский токен",
    "Add Token": "Добавить токен",
    "Adding {0} token": ["Добавление ", ["0"], " токенов"],
    "Address": "Адрес",
    "Address / Puzzle hash": "Адрес / Хэш-головоломка",
    "Amount": "Количество",
    "Amount For Initial Coin": "Начальное количество монет",
    "Amount must be an even amount.": ["Сумма должна быть не менее %", ["count"]],
    "Are you sure you want to delete unconfirmed transactions?": "Вы действительно хотите удалить неподтвержденные транзакции?",
    "Asset Id": "ID Актива",
    "Atomic Swap Wallet": "Кошелек для атомарного обмена",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Баланс",
    "Cancel": "Отмена",
    "Cannot send chia to coloured address. Please enter a chia address.": "Не удается отправить Chia по цветному адресу. Пожалуйста, введите обычный адрес Chia.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Название токена",
    "Confirmation": "Подтверждение",
    "Confirmed": "Подтверждено",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Подключено (", ["0"], ")"],
    "Connection type": "Тип подключения",
    "Connections": "Подключения",
    "Copy": "Копировать",
    "Create": "Создать",
    "Create An Attestation Packet": "Создать пакет аттестации",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Создать распределенный идентификационный кошелек",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Создать новый кошелек",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Создать кошелек администратора с ограниченнием скорости",
    "Create Rate Limited User Wallet": "Создать кошелек пользователя с ограниченнием скорости вывода",
    "Create Transaction": "Создать транзакцию",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Дата",
    "Delete": "Удалить",
    "Delete Unconfirmed Transactions": "Удалить неподтвержденные транзакции",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Введите мнемонику из 24 слов, которую вы сохранили, чтобы восстановить свой кошелек Chia.",
    "Error the entered address appears to be for a different colour.": "Ошибка введенный адрес, кажется, для другого цвета.",
    "Farm": "Ферма",
    "Fee": "Комиссия",
    "Filename": "Имя файла",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD или иерархические детерминированные ключи - это тип открытой схемы ключ/закрытого ключа, в которой один закрытый ключ может иметь почти бесконечное количество различных открытых ключей (и поэтому прием адресов), которые в конечном итоге будут возвращаться и расходоваться одним приватным ключом.",
    "IP address": "IP адрес",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Импорт",
    "Import Wallet from Mnemonics": "Импортировать кошелек из мнемоники",
    "Incoming": "Входящие",
    "Info Packet": "Информационный пакет",
    "Initial Amount": "Начальное количество монет",
    "Initialize a Rate Limited User Wallet:": "Инициализируйте кошелек пользователя с ограничением скорости вывода монет:",
    "Interval": "Интервал",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Управление списком токенов",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "МиБ Исх./Вх.",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Мой публичный ключ",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Новый адрес",
    "New Wallet": "Новый кошелек",
    "Next": "Далее",
    "Nickname": "Псевдоним",
    "No previous transactions": "Нет предыдущих транзакций",
    "Node ID": "Идентификатор узла",
    "Not Available": "Не определено",
    "Not Connected": "Нет Соединения",
    "Not Synced": "Не синхронизирован",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "В среднем между каждым блоком транзакций проходит одна минута. Если нет перегрузки, вы можете ожидать что ваша транзакция будет включена менее чем за минуту.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Исходящие",
    "Paste Mnemonic": "Вставить мнемонику",
    "Paste Mnemonic (24 words)": "Вставить Мнемонику (24 слова)",
    "Pending": "Ожидающие",
    "Pending Balance": "Баланс в ожидании",
    "Pending Change": "Сдача в ожидании",
    "Pending Total Balance": "Ожидаемый итоговый баланс",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Пожалуйста, введите комиссию 0. Положительные комиссии для кошельков с ограничением скорости пока не поддерживаются.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Пожалуйста, укажите имя файла",
    "Please enter a pubkey": "Пожалуйста, введите публичный ключ",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Пожалуйста, укажите корректное численное начальное значение баланса кошелька",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Пожалуйста, укажите корректное численное значение",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Пожалуйста, укажите корректное численное значение комиссии",
    "Please enter a valid numeric interval length": "Пожалуйста, укажите корректное целочисленное значение интервала в блоках",
    "Please enter a valid numeric spendable amount": "Пожалуйста, укажите корректное числовое значение количества монет, которое можно будет потратить за указанный интервал",
    "Please enter a valid pubkey": "Пожалуйста, введите действующий публичный ключ",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Пожалуйста, введите корректное имя кошелька",
    "Please finish syncing before making a transaction": "Пожалуйста, завершите синхронизацию перед совершением транзакции",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Дождитесь окончания синхронизации кошелька",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Порт",
    "Pubkey": "Публичный ключ",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Ограниченной Скорости",
    "Rate Limited Info": "Информация об ограничении скорости",
    "Rate Limited User Wallet Setup": "Настройка кошелька пользователя с ограничением скорости",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Адрес для получения платежа",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Адрес получателя не является адресом цветного кошелька. Пожалуйста, введите адрес цветного кошелька",
    "Recover": "Recover",
    "Recover DID Wallet": "Восстановить DID кошелек",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Восстановить кошелек",
    "Recoverable Wallet": "Восстановляемый кошелек",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Переименовать кошелек",
    "Retire": "Retire",
    "Save": "Сохранить",
    "Search on Tail Database": "Искать в Tail Database",
    "Select Wallet": "Выбрать кошелек",
    "Select Wallet Type": "Выберите Тип Кошелька",
    "Selected recovery file:": "Выбранный файл восстановления:",
    "Send": "Отправить",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Отправьте этот информационный пакет пользователям вашего кошелька с ограниченной скоростью вывода. Эта информация потребуется пользователям для завершения настройки своего кошелька:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Отправьте этот публичный ключ администратору вашего кошелька с ограниченной скоростью вывода средств:",
    "Show Asset Id": "Показать ID актива",
    "Spendable Amount": "Расходуемое количество",
    "Spendable Amount Per Interval": "Расходуемое количество монет за интервал",
    "Spendable Balance": "Доступный баланс",
    "Spending Interval (number of blocks): {interval}": ["Интервал расходования (количество блоков): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Длина интервала расходования (количество блоков)",
    "Spending Limit (chia per interval): {0}": ["Лимит расходования (chia за интервал): ", ["0"]],
    "Standard Wallet": "Стандартный кошелек",
    "Submit": "Подтвердить",
    "Success": "Успешно",
    "Summary": "Сводка",
    "Synced": "Синхронизован",
    "Syncing": "Синхронизация",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Количество идентификаторов резервных копий, необходимых для восстановления, не может превышать количество добавленных идентификаторов резервной копии.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "Транзакция не может быть сразу включена в мемпул, так как указанная комиссия слишком мала. Транзакция будет периодически повторяться и может быть включена в мемпул, как только комиссия снизится или освободится место.",
    "This access token is verified": "Этот токен доступа проверен",
    "This is not a valid address for sending funds to": "Этот адрес невалидный для отправки на него средств",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Это количество монет Чиа, которое в настоящее время вы можете использовать для совершения транзакций. Баланс не включает ожидающие вознаграждения за фармиг, ожидающие входящие транзакции и монеты, которые вы только что потратили, но они еще не попали в блокчейн.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Здесь рассчитан размер ожидаемой сдачи, которая осталась в качестве размена после отправки монет. Размен вы отправили себе, но транзакция еще не была подтверждена.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Здесь рассчитана сумма входящих и исходящих ожидающих транзакций (еще не включенных в цепь блоков). Награды за фарминг не включены в сумму.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "Это общее количество монет чиа в блокчейне в текущем пиковом блоке, который контролируется вашими закрытыми ключами. Он включает в себя замороженные вознаграждения за фарминг, но не ожидающие входящие и исходящие транзакции.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Это общий баланс + отложенный баланс: это то, каким будет ваш баланс после подтверждения всех ожидающих транзакций.",
    "To": "Кому",
    "Token and Asset Issuance Limitations": "Ограничения на выпуск токена и актива",
    "Token has empty asset id": "Токен имеет пустой id актива",
    "Token has empty name": "Токен имеет пустое имя",
    "Tokens": "Токены",
    "Total Balance": "Итоговый баланс",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Транзакция успешно отправлена на полный узел и включена в мемпул.",
    "Transactions": "Транзакции",
    "User Pubkey": "Пользовательский публичный ключ",
    "View pending balances": "Просмотр ожидаемого баланса",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Кошелек не существует",
    "Wallet with type {0} not supported": ["Кошелек с типом ", ["0"], " не поддерживается"],
    "Wallet {walletId} not found": ["Кошелек ", ["walletId"], " не найден"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Добро пожаловать! Перечисленные слова используются для резервного копирования вашего кошелька. Без них вы потеряете доступ к своему кошельку, берегите их! Запишите каждое слово вместе с порядковым номером рядом с ним. (Порядок важен)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Когда вы получите пакет информации о настройке от администратора, введите его ниже, чтобы завершить настройку кошелька с ограниченнием скорости вывода:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Ваш DID требует как минимум ", ["dids_num_req"], " аттестационного файла", ["0"], " для восстановления. Пожалуйста, загрузите дополнительные файлы."],
    "Your pasted list does not include 24 valid mnemonic words.": "Вставленный список не содержит 24 валидных мнемонических слова."
  }
};

/*eslint-disable*/
var messages$7 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Akcie",
    "Add": "Pridať",
    "Add Backup ID": "Pridať záložné ID",
    "Add Custom Token": "Pridať vlastný token",
    "Add Token": "Pridať token",
    "Adding {0} token": ["Pridávanie tokenu ", ["0"]],
    "Address": "Adresa",
    "Address / Puzzle hash": "Adresa",
    "Amount": "Suma",
    "Amount For Initial Coin": "Počiatočná suma",
    "Amount must be an even amount.": "Suma musí byť párna.",
    "Are you sure you want to delete unconfirmed transactions?": "Naozaj chcete odstrániť nepotvrdené transakcie?",
    "Asset Id": "ID aktíva",
    "Atomic Swap Wallet": "Peňaženka Atomic Swap",
    "Authorized Payee Wallet": "Autorizovaná peňaženka príjemcu platby",
    "Balance": "Zostatok",
    "Cancel": "Zrušiť",
    "Cannot send chia to coloured address. Please enter a chia address.": "Chia nie je možné odoslať na farebnú adresu. Zadajte prosím Chia adresu.",
    "Check my snapshot balance": "Skontrolovať môj zostatok na snímke",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Kliknutím sem stiahnete staršiu verziu peňaženky",
    "Coin Name": "Názov mince",
    "Confirmation": "Potvrdenie",
    "Confirmed": "Potvrdené",
    "Confirmed at Height": "Potvrdené na pozícii",
    "Connected ({0})": ["Pripojené (", ["0"], ")"],
    "Connection type": "Typ pripojenia",
    "Connections": "Pripojenia",
    "Copy": "Kopírovať",
    "Create": "Vytvoriť",
    "Create An Attestation Packet": "Vytvoriť atestačný paket",
    "Create Chia Asset Token Wallet from Existing TAIL": "Vytvorte peňaženku Chia Asset Token z existujúcej TAIL",
    "Create Distributed Identity Wallet": "Vytvoriť peňaženku s distribuovanou identitou",
    "Create New Chia Asset Token Wallet": "Vytvoriť novú Chia Asset Token peňaženku",
    "Create New Wallet": "Vytvoriť novú peňaženku",
    "Create Offer": "Vytvoriť ponuku",
    "Create Rate Limited Admin Wallet": "Vytvoriť administrátorskú peňaženku s obmedzenou sadzbou",
    "Create Rate Limited User Wallet": "Vytvoriť Používateľskú Peňaženku s Obmedzenou Sadzbou",
    "Create Transaction": "Vytvoriť transakciu",
    "Create custom CAT Wallet": "Vytvoriť vlastnú CAT peňaženku",
    "Custody Wallet": "Peňaženka Custody",
    "Custom": "Vlastný",
    "DID Wallet": "DID peňaženka",
    "Date": "Dátum",
    "Delete": "Zmazať",
    "Delete Unconfirmed Transactions": "Odstrániť nepotvrdené transakcie",
    "Derivation Index: {0}": ["Derivačný index: ", ["0"]],
    "Distributed Identity": "Distribuovaná identita",
    "Drag and drop attestation packet(s)": "Pretiahnite myšou atestačné pakety",
    "Drag and drop your recovery backup file": "Pretiahnite myšou obnovovací záložný súbor",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Zadajte 24 slov, ktoré ste si uložili pre účely obnovenia vašej peňaženky Chia.",
    "Error the entered address appears to be for a different colour.": "Chyba Zdá sa, že zadaná adresa je pre inú farbu.",
    "Farm": "Farma",
    "Fee": "Poplatok",
    "Filename": "Meno súboru",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD alebo Hierarchické Deterministické kľúče sú typ schémy verejného kľúča/súkromného kľúča, kde jeden súkromný kľúč môže mať takmer nekonečný počet rôznych verejných kľúčov (a tým pádom adries pre príjem do peňaženky), ktoré sa nakoniec vrátia k jedinému súkromnému kľúču a budú z neho utratiteľné.",
    "IP address": "IP Adresa",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "Ak chcete transakciu urýchliť, vymažte nepotvrdené transakcie a skúste to znova s vyšším poplatkom.",
    "Import": "Importovať",
    "Import Wallet from Mnemonics": "Obnoviť peňaženku pomocou mnemotechnickej pomôcky",
    "Incoming": "Prichádzajúce",
    "Info Packet": "Informačný paket",
    "Initial Amount": "Počiatočná suma",
    "Initialize a Rate Limited User Wallet:": "Inicializovať používateľskú peňaženku s obmedzenou sazbou:",
    "Interval": "Interval",
    "List of connections is empty": "Zoznam pripojení je prázdny",
    "Loading...": "Načítava sa...",
    "Manage Recovery DIDs": "Spravovať obnovovacie DID",
    "Manage token list": "Spravovať zoznam tokenov",
    "Memo": "Poznámka",
    "Memos": "Poznámky",
    "Mempool Full": "Pamäťový fond je plný",
    "MiB Up/Down": "MiB Odoslané/Stiahnuté",
    "Multi Sig Wallet": "Peňaženka Multi Sig",
    "My DID Wallet": "Moja DID peňaženka",
    "My Pubkey": "Môj verejný kľúč",
    "NFT Wallet": "NFT peňaženka",
    "Name": "Názov",
    "New Address": "Nová adresa",
    "New Wallet": "Nová peňaženka",
    "Next": "Ďalej",
    "Nickname": "Prezývka",
    "No previous transactions": "Žiadne predchádzajúce transakcie",
    "Node ID": "ID uzla",
    "Not Available": "Nie je k dispozícií",
    "Not Connected": "Nepripojené",
    "Not Synced": "Nesynchronizované",
    "OK": "OK",
    "Offer Accepted": "Ponuka prijatá",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Priemerný čas medzi jednotlivými blokmi transakcií je jedna minúta. Ak nedôjde k preťaženiu, môžete očakávať, že vaša transakcia bude zahrnutá za menej ako minútu.",
    "Only one backup file is allowed.": "Je povolený iba jeden záložný súbor.",
    "Outgoing": "Odchádzajúce",
    "Paste Mnemonic": "Vložiť mnemotechnické slová",
    "Paste Mnemonic (24 words)": "Vložiť mnemotechniku (24 slov)",
    "Pending": "Spracúva sa",
    "Pending Balance": "Nespracovaný zostatok",
    "Pending Change": "Nespracované zmeny",
    "Pending Total Balance": "Celkový nespracovaný zostatok",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Prosím zadajte nulový poplatok. Kladné nenulové poplatky ešte nie sú pre RL podporované.",
    "Please enter a coin": "Zadajte prosím mincu",
    "Please enter a filename": "Zadajte prosím názov súboru",
    "Please enter a pubkey": "Prosím zadajte verejný kľúč",
    "Please enter a puzzlehash": "Zadajte prosím hash hádaniek",
    "Please enter a valid CAT name": "Prosím zadajte platný CAT názov",
    "Please enter a valid asset id": "Prosím zadajte platné ID aktíva",
    "Please enter a valid initial coin amount": "Prosím zadajte platnú počiatočnú sumu",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Zadajte prosím platné celé číslo od 0 alebo vyššie pre počet záložných ID potrebných na obnovu.",
    "Please enter a valid numeric amount": "Prosím zadajte platnú číselnú sumu",
    "Please enter a valid numeric amount.": "Zadajte prosím platnú číselnú sumu.",
    "Please enter a valid numeric fee": "Prosím zadajte platný číselný poplatok",
    "Please enter a valid numeric interval length": "Prosím zadajte platnú číselnú dĺžku intervalu",
    "Please enter a valid numeric spendable amount": "Prosím zadajte platný číselný disponibilný zostatok",
    "Please enter a valid pubkey": "Prosím zadajte platný verejný kľúč",
    "Please enter a valid token name": "Prosím zadajte platný názov tokenu",
    "Please enter valid wallet name": "Prosím zadajte platný názov peňaženky",
    "Please finish syncing before making a transaction": "Pred uskutočnením transakcie dokončite synchronizáciu",
    "Please select backup file first": "Najprv vyberte záložný súbor",
    "Please wait for wallet synchronization": "Počkajte prosím na synchronizáciu peňaženky",
    "Pooling Wallet": "Peňaženka združovania",
    "Port": "Port",
    "Pubkey": "Verejný kľúč",
    "Puzzlehash": "Hash hádaniek",
    "RL Wallet": "RL peňaženka",
    "Rate Limited": "S obmedzenou sadzbou",
    "Rate Limited Info": "Informácie o obmedzenej sadzbe",
    "Rate Limited User Wallet Setup": "Nastavenia používateľskej peňaženky s obmedzenou sadzbou",
    "Read the blog post for details": "Podrobnosti nájdete v blogovom príspevku",
    "Receive": "Prijať",
    "Receive Address": "Adresa príjemcu",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Adresa príjemcu nie je adresa farebnej peňaženky. Prosím zadajte adresu farebnej peňaženky",
    "Recover": "Obnoviť",
    "Recover DID Wallet": "Obnoviť DID peňaženku",
    "Recover Distributed Identity Wallet": "Obnoviť peňaženku s distribuovanou identitou",
    "Recover Wallet": "Obnoviť peňaženku",
    "Recoverable Wallet": "Obnoviteľná peněženka",
    "Recovery Wallet": "Obnoviteľná peněženka",
    "Rename Wallet": "Premenovať peňaženku",
    "Retire": "Vyradiť",
    "Save": "Uložiť",
    "Search on Tail Database": "Hľadať v Tail databáze",
    "Select Wallet": "Vybrať peňaženku",
    "Select Wallet Type": "Vyberte typ peňaženky",
    "Selected recovery file:": "Vybratý obnovovací súbor:",
    "Send": "Odoslať",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Poslať tento informačný paket používateľovi peňaženky s obmedzenou sadzbou, ktorý ho ho musí použiť na dokončenie nastavenia svojej peňaženky:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Pošlite svoj verejný kľúč vášmu správcovi peňaženky s obmedzenou sadzbou:",
    "Show Asset Id": "Zobraziť ID aktíva",
    "Spendable Amount": "Disponibilný zostatok",
    "Spendable Amount Per Interval": "Disponibilná suma na interval",
    "Spendable Balance": "Disponibilný zostatok",
    "Spending Interval (number of blocks): {interval}": ["Interval výdavkov (počet blokov): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Dĺžka disponibilného intervalu (počet blokov)",
    "Spending Limit (chia per interval): {0}": ["Limit výdavkov (chia na interval): ", ["0"]],
    "Standard Wallet": "Štandardná peňaženka",
    "Submit": "Odoslať",
    "Success": "Úspech",
    "Summary": "Zhrnutie",
    "Synced": "Synchronizované",
    "Syncing": "Synchronizácia",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "Derivačný index nastavuje rozsah adries peňaženky, ktoré peňaženka vyhľadáva v blockchaine. Toto číslo je vo všeobecnosti vyššie, ak máte veľa transakcií alebo zrušených ponúk pre XCH, CAT alebo NFT. Ak sa domnievate, že váš zostatok je nesprávny, pretože v ňom chýbajú mince, potom zvýšenie derivačného indexu môže pomôcť peňaženke zahrnúť chýbajúce mince do celkového zostatku.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Počet zálohovacích ID potrebných na obnovu nemôže prekročiť počet pridaných zálohovacích ID.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "Transakcia nemohla byť okamžite zahrnutá do pamäťového fondu, pretože zadaný poplatok je príliš nízky. Transakcia sa zopakuje v pravidelných intervaloch, a môže byť zahrnutá do pamäťového fondu, keď budú poplatky nižšie, alebo ak sa uvoľní miesto.",
    "This access token is verified": "Tento prístupový token je overený",
    "This is not a valid address for sending funds to": "Toto nie je platná adresa na posielanie prostriedkov",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Toto je množstvo Chia, ktoré môžete v súčasnosti použiť na uskutočnenie transakcií. Nezahŕňa nespracované odmeny za ťažbu, nespracované prichádzajúce transakcie a Chia, ktorú ste práve minuli, ale ešte nie je v blockchaine.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Toto je nespracovaná zmena. Sú to mince, ktoré ste si poslali, ale zatiaľ neboli spracované.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Toto je súčet prichádzajúcich a odchádzajúcich nespracovaných transakcií (ešte nezahrnutých do blockchainu). To nezahŕňa odmeny za ťažbu.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "Toto je celkové množstvo Chia v blockchaine v aktuálne najnovšom bloku, ktorý je kontrolovaný vašimi súkromnými kľúčmi. Zahŕňa zmrazené odmeny za ťaženie, ale nie nespracované prichádzajúce a odchádzajúce transakcie.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Toto je celkový zostatok + nespracovaný zostatok alebo to, aký bude váš zostatok po potvrdení všetkých nespracovaných transakcií.",
    "To": "Príjemca",
    "Token and Asset Issuance Limitations": "Obmedzenia vydávania tokenov a aktív",
    "Token has empty asset id": "Token má prázdne ID aktíva",
    "Token has empty name": "Token má prázdny názov",
    "Tokens": "Tokeny",
    "Total Balance": "Celkový zostatok",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transakcia bola úspešne odoslaná úplnému uzlu a zahrnutá do pamäťového fondu.",
    "Transactions": "Transakcie",
    "User Pubkey": "Používateľov verejný kľúč",
    "View pending balances": "Zobraziť nespracované zostatky",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Peňaženka neexistuje",
    "Wallet with type {0} not supported": ["Peňaženka typu ", ["0"], " nie je podporovaná"],
    "Wallet {walletId} not found": ["Peňaženka ", ["walletId"], " nebola nájdená"],
    "Want to see your old balance for yourself?": "Chcete si sami prezrieť svoju starú bilanciu?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "Vykonali sme upgrade na štandard CAT, ktorý vyžaduje opätovné vydanie všetkých CAT. Vaše nové tokeny vám zhodia zo vzduchu (anglicky: airdrop), keď ich znovu vydajú pôvodní emitenti. Zo vzduchu zhodené tokeny budú založené na zostatku podľa výšky bloku:<0/><1/><2/>(Približný čas: 26. júla 2022 o 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Vitajte! Pre zálohovanie vašej peňaženky sa používajú nasledujúce slová. Bez nich stratíte prístup k svojej peňaženke, chráňte ich! Zapíšte si každé slovo spolu s číslom poradia vedľa nich. (Poradie je dôležité)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Keď obdržíte informačný paket od svojho administrátora, vložte ho nižšie na dokončenie nastavenia vašej peňaženky s obmedzenou sadzbou:",
    "Your CAT tokens have been upgraded!": "Vaše tokeny CAT boli inovované!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Vaše DID vyžaduje na obnovu aspoň ", ["dids_num_req"], " atestačný súbor ", ["0"], ". Prosím nahrajte ďalšie súbory."],
    "Your pasted list does not include 24 valid mnemonic words.": "Vložený zoznam neobsahuje 24 platných mnemotechnických slov."
  }
};

/*eslint-disable*/
var messages$6 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Veprimet",
    "Add": "Shto",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adresa",
    "Address / Puzzle hash": "Adresa / Kodimi numerik",
    "Amount": "Sasia",
    "Amount For Initial Coin": "Sasia për monedhën fillestare",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Je i sigurt që dëshiron të fshish transaksione të pakonfirmuara?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Shuma",
    "Cancel": "Anuloje",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Konfirmimi",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Tipi i Lidhjes",
    "Connections": "Lidhjet",
    "Copy": "Kopjo",
    "Create": "Krijo",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Krijo vlerso portofolin e adminit",
    "Create Rate Limited User Wallet": "Krijo vlerso portofolin e perdoruesit",
    "Create Transaction": "Të krijohet transaksion",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Datë",
    "Delete": "Fshij",
    "Delete Unconfirmed Transactions": "Fshi transaksionet e pakonfirmuara",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Shkruaj 24 fjalët mnemonic që ke ruajtur pëer të rikthyer Kuletën tende Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Ferma",
    "Fee": "Tarifa",
    "Filename": "Emri i skedarit",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "Adresa IP",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Importo Portofolin nga Mnemonics",
    "Incoming": "Hyrës",
    "Info Packet": "Paketa e informacionit",
    "Initial Amount": "Shuma fillestare",
    "Initialize a Rate Limited User Wallet:": "Inicializoni një Portofol me Përdorues të Kufizuar të Vlerësimit:",
    "Interval": "Intervali",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Lart / Poshtë",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Pubkey im",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Adresë e re",
    "New Wallet": "Kuletë e re",
    "Next": "Tjetër",
    "Nickname": "Pseudonimi",
    "No previous transactions": "Nuk ka transaksione të mëparshme",
    "Node ID": "ID e nyjes",
    "Not Available": "Jo i disponueshëm",
    "Not Connected": "Not Connected",
    "Not Synced": "Jo i sinkronizuar",
    "OK": "Ok",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Mesatarisht ka një minutë midis çdo transaksion blloku. Nëse nuk ka bllokim, ju mund të prisni që transaksioni juaj të përfshihet në më pak se një minutë.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Dalëse",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Në pritje",
    "Pending Balance": "Bilanci në pritje",
    "Pending Change": "Bilanci në pritje të ndryshimit",
    "Pending Total Balance": "Në pritje të balancit total",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Ju lutemi vendosni 0 tarifë. Tarifat pozitive nuk mbështeten ende për RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Ju lutemi shkruani një shumë fillestare të vlefshme",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Ju lutemi shkruani një numer të vlefshem",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Ju lutemi vendosni një tarifë të vlefshme numerike",
    "Please enter a valid numeric interval length": "Ju lutemi shkruani një gjatësi të vlefshme të intervalit numerik",
    "Please enter a valid numeric spendable amount": "Ju lutemi shkruani një shumë të vlefshme të harxhueshme numerike",
    "Please enter a valid pubkey": "Ju lutemi shkruani një pubkey të vlefshëm",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Ju lutemi mbaroni sinkronizimin përpara se të bëni një transaksion",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Ju lutemi të prisni për sinkronizimin e portofolit",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Porta",
    "Pubkey": "Pubkey",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Shpejtësi e kufizuar",
    "Rate Limited Info": "Vlerësoni informacionin e kufizuar",
    "Rate Limited User Wallet Setup": "Vlerësoni Konfigurimin e Kuletë të Përdoruesit të Kufizuar",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Adresë për Marrje",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Ruaj",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Zgjidhni Llojin e Portofolit",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Dërgo",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Dërgoni këtë paketë informacioni përdoruesit tuaj të Vlerësimit të Kufizuar të Portofolit, i cili duhet ta përdorë atë për të përfunduar konfigurimin e portofolit të tyre:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Dërgoni pubkey-in tuaj tek administratori juaj qe te vlerësojë Kuletën e Kufizuar:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Shuma e shpenzueshme",
    "Spendable Amount Per Interval": "Shuma e shpenzueshme për interval",
    "Spendable Balance": "Bilanci i harxhueshëm",
    "Spending Interval (number of blocks): {interval}": ["Intervali i shpenzimeve (numri i blloqeve): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Gjatësia e intervalit të shpenzimeve (numri i blloqeve)",
    "Spending Limit (chia per interval): {0}": ["Kufiri i shpenzimeve (chia për interval): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Paraqit",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Sinkronizuar",
    "Syncing": "Sinkronizimi",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Kjo është shuma e Chia që mund të përdorni aktualisht për të bërë transaksione. Nuk përfshin shpërblime në pritje të, transaksione në hyrje dhe Chia që sapo keni shpenzuar, por që nuk është ende në blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Ky është ndryshimi në pritje, të cilat janë monedha ndryshimi që i keni dërguar vetes, por nuk janë konfirmuar ende.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Kjo është shuma e transaksioneve hyrëse dhe dalëse në pritje (nuk janë përfshirë ende në blockchain). Kjo nuk përfshin shpërblimet fermerit.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Ky është bilanci i përgjithshëm + bilanci në pritje: është ai që do të jetë bilanci juaj pasi të jenë konfirmuar të gjitha transaksionet në pritje.",
    "To": "Për",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Totali i balances",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Përdoruesi Pubkey",
    "View pending balances": "Shikoni bilancet në pritje",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Mirëseardhje! Fjalët e mëposhtme përdoren për rezervimin e portofolit tuaj. Pa to, ju do të humbni hyrjen në portofolin tuaj, mbajini të sigurta! Shkruani secilën fjalë së bashku me numrin e rendit pranë tyre. (Renditja është e rëndësishme)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Kur të merrni paketën e informacionit të konfigurimit nga administratori juaj, futeni atë më poshtë për të përfunduar konfigurimin e Portofolit të Kufizuar të Vlerësimit:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$5 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Акције",
    "Add": "Додај",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Адреса",
    "Address / Puzzle hash": "Адреса / Хеш слагалица",
    "Amount": "Количина",
    "Amount For Initial Coin": "Вредност иницијалног новчића",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Стање",
    "Cancel": "Откажи",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Тип везе",
    "Connections": "Везе",
    "Copy": "Копирај",
    "Create": "Креирај",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Креирај ограничену стопу админ новчаника",
    "Create Rate Limited User Wallet": "Креирај ограничену стопу корисничког новчаника",
    "Create Transaction": "Креирај трансакцију",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Датум",
    "Delete": "Обриши",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Унесите мнемонику од 24 речи коју сте сачували да бисте вратили Чија новчаник.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Фарма",
    "Fee": "Накнада",
    "Filename": "Ime datoteke",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP адреса",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Увези новчаник уз помоћ мнемотехнике",
    "Incoming": "Долазни",
    "Info Packet": "Информациони пакет",
    "Initial Amount": "Почетни износ",
    "Initialize a Rate Limited User Wallet:": "Стартуј лимитиран кориснички новчаник:",
    "Interval": "Интервал",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB горе/доле",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Мој јавни кључ",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Нова адреса",
    "New Wallet": "Нови новчаник",
    "Next": "Даље",
    "Nickname": "Надимак",
    "No previous transactions": "Нема претходних трансакција",
    "Node ID": "ID чвора",
    "Not Available": "Недоступно",
    "Not Connected": "Not Connected",
    "Not Synced": "Није синхронизовано",
    "OK": "ОК",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "У просеку је потребан један минут између сваког блока трансакције. Ако нема загушења, можеш очекивати да ће трансакција бити укључена за мање од једног минута.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Одлазни",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "На чекању",
    "Pending Balance": "Стање на чекању",
    "Pending Change": "Промена на чекању",
    "Pending Total Balance": "Укупно стање на чекању",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Унеси 0 накнаде. Позитивне накнаде још нису подржане за ограничене стопе.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Унеси важећи почетни износ новчића",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Унеси важећи нумерички износ",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Унеси важећи нумерички износ накнаде",
    "Please enter a valid numeric interval length": "Унеси важећу дужину нумеричког интервала",
    "Please enter a valid numeric spendable amount": "Унеси важећи нумерички потрошени износ",
    "Please enter a valid pubkey": "Унеси важећи јавни кључ",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Заврши синхронизацију пре него што извршиш трансакцију",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Порт",
    "Pubkey": "Јавни кључ",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Ограничена стопа",
    "Rate Limited Info": "Инфо о стопи ограничења",
    "Rate Limited User Wallet Setup": "Подешавање ограниченог корисничког новчаника",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Адреса за пријем",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Сачувај",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Изабери тип новчаника",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Пошаљи",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Пошаљи овај пакет информација свом кориснику ограниченог новчаника који га мора користити да би довршио подешавање свог новчаника:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Пошаљи јавни кључ администратору твог ограниченог новчаника:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Износ који је могуће трошити",
    "Spendable Amount Per Interval": "Износ који је могуће трошити у интервалу",
    "Spendable Balance": "Стање које је могуће трошити",
    "Spending Interval (number of blocks): {interval}": ["Интервал трошења (број блокова): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Дужина интервала трошења (број блокова)",
    "Spending Limit (chia per interval): {0}": ["Ограничење потрошње (chia по интервалу): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Пошаљи",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Синхронизовано",
    "Syncing": "Синхронизација",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Ово је количина Chia коју тренутно можеш користити за обављање трансакција. Не укључује награде за фармање на чекању, долазне трансакције на чекању и Chia која је управо потрошена, али још увек није на блокчејну.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Ово је промена на чекању, а то су новчићи који су себи послати, али још нису потврђени.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Ово је збир долазних и одлазних трансакција на чекању (које још нису укључене у блокчејн). Ово не укључује награде за фарамање.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Ово је укупно стање + стање на чекању: то ће бити твоје стање након потврде свих трансакција на чекању.",
    "To": "За",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Укупно стање",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Кориснички јавни кључ",
    "View pending balances": "Погледај стања на чекању",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Добродошли! Следеће речи се користе за резервну копију новчаника. Без њих ћеш изгубити приступ новчанику, чувај их! Запиши сваку реч заједно са бројем налога поред њих. (Редослед је важан)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Када од админа добијеш пакет информација о подешавању, унеси га испод како би се завршило подешавање ограниченог новчаника:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$4 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Åtgärder",
    "Add": "Lägg till",
    "Add Backup ID": "Lägg till säkerhetskopierings-ID",
    "Add Custom Token": "Lägg till eget token",
    "Add Token": "Lägg till token",
    "Adding {0} token": ["Lägger till token ", ["0"]],
    "Address": "Adress",
    "Address / Puzzle hash": "Adress/pusselhash",
    "Amount": "Belopp",
    "Amount For Initial Coin": "Belopp för ursprungligt mynt",
    "Amount must be an even amount.": "Beloppet måste vara ett jämnt belopp.",
    "Are you sure you want to delete unconfirmed transactions?": "Är du säker på att du vill radera obekräftade transaktioner?",
    "Asset Id": "Tillgångs-ID",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Plånbok för auktoriserad betalningsmottagare",
    "Balance": "Saldo",
    "Cancel": "Avbryt",
    "Cannot send chia to coloured address. Please enter a chia address.": "Det går inte att skicka chia till färgad adress. Ange en chia-adress.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia tillgångstoken (CAT)",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Namn på mynt",
    "Confirmation": "Bekräfta",
    "Confirmed": "Bekräftad",
    "Confirmed at Height": "Bekräftad vid höjd",
    "Connected ({0})": ["Anslutna (", ["0"], ")"],
    "Connection type": "Anslutningstyp",
    "Connections": "Anslutningar",
    "Copy": "Kopiera",
    "Create": "Skapa",
    "Create An Attestation Packet": "Skapa ett attestpaket",
    "Create Chia Asset Token Wallet from Existing TAIL": "Skapa plånbok för Chia tillgångstoken (CAT) från existerande TAIL",
    "Create Distributed Identity Wallet": "Skapa distribuerad identitetsplånbok",
    "Create New Chia Asset Token Wallet": "Skapa ny plånbok för Chia tillgångstoken (CAT)",
    "Create New Wallet": "Skapa ny plånbok",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Skapa spenderbegränsad adminplånbok",
    "Create Rate Limited User Wallet": "Skapa spenderbegränsad användarplånbok",
    "Create Transaction": "Skapa transaktion",
    "Create custom CAT Wallet": "Skapa plånbok för eget CAT",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Eget",
    "DID Wallet": "DID-plånbok",
    "Date": "Datum",
    "Delete": "Ta bort",
    "Delete Unconfirmed Transactions": "Ta bort obekräftade transaktioner",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distribuerad identitet",
    "Drag and drop attestation packet(s)": "Dra och släpp attestpaket",
    "Drag and drop your recovery backup file": "Drag och släpp din säkerhetskopierade fil",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Skriv in din sparade minnesfras på 24 ord för att återställa din Chia-plånbok.",
    "Error the entered address appears to be for a different colour.": "Fel den angivna adressen verkar vara för en annan färg.",
    "Farm": "Odling",
    "Fee": "Avgift",
    "Filename": "Filnamn",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "\"HD\" eller Hierarkiska Deterministiska nycklar är en typ av schema med publik nyckel/privat nyckel där en privat nyckel kan ha ett nästan oändligt antal olika publika nycklar (och därigenom mottagaradresser i plånboken) som alla i slutänden kan härledas tillbaka till och är spenderbara med en och samma privata nyckel.",
    "IP address": "IP-adress",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "Om du vill påskynda transaktionen, ta bort obekräftade transaktioner och försök igen med en högre avgift.",
    "Import": "Importera",
    "Import Wallet from Mnemonics": "Importera plånbok från minnesfras",
    "Incoming": "Inkommande",
    "Info Packet": "Infopaket",
    "Initial Amount": "Ursprungligt belopp",
    "Initialize a Rate Limited User Wallet:": "Initiera spenderbegränsad användarplånbok:",
    "Interval": "Intervall",
    "List of connections is empty": "Lista över anslutningar är tom",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Hantera återställnings-DID",
    "Manage token list": "Hantera tokenlista",
    "Memo": "Anteckning",
    "Memos": "Anteckningar",
    "Mempool Full": "Mempoolen är full",
    "MiB Up/Down": "MiB upp/ner",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "Min DID plånbok",
    "My Pubkey": "Min publika nyckel",
    "NFT Wallet": "NFT Wallet",
    "Name": "Namn",
    "New Address": "Ny adress",
    "New Wallet": "Ny plånbok",
    "Next": "Nästa",
    "Nickname": "Smeknamn",
    "No previous transactions": "Inga tidigare transaktioner",
    "Node ID": "Node-ID",
    "Not Available": "Inte tillgänglig",
    "Not Connected": "Inte ansluten",
    "Not Synced": "Ej synkad",
    "OK": "OK",
    "Offer Accepted": "Erbjudandet accepterat",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "I genomsnitt är det en minut mellan varje transaktionsblock. Om det inte är någon form av köbildning kan du räkna med att en transaktion inkluderas i blockkedjan på under en minut.",
    "Only one backup file is allowed.": "Endast en säkerhetskopieringsfil är tillåten.",
    "Outgoing": "Utgående",
    "Paste Mnemonic": "Klistra in minnesfras",
    "Paste Mnemonic (24 words)": "Klistra in minnesfras (24 ord)",
    "Pending": "Väntande",
    "Pending Balance": "Väntande saldo",
    "Pending Change": "Väntande växel",
    "Pending Total Balance": "Väntande totalt saldo",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Ange 0 som avgift. Positiv avgift stöds ännu inte för RL.",
    "Please enter a coin": "Vänligen ange ett mynt",
    "Please enter a filename": "Vänligen ange ett filnamn",
    "Please enter a pubkey": "Ange en giltig publik nyckel",
    "Please enter a puzzlehash": "Ange en pusselhash",
    "Please enter a valid CAT name": "Skriv in ett giltigt CAT-namn",
    "Please enter a valid asset id": "Ange ett giltigt tillgångs-ID",
    "Please enter a valid initial coin amount": "Ange ett giltigt belopp för ursprungligt mynt",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Ange ett giltigt heltal på 0 eller fler för det säkerhetskopierings-ID som behövs för återställning.",
    "Please enter a valid numeric amount": "Ange ett giltigt numeriskt belopp",
    "Please enter a valid numeric amount.": "Ange ett giltigt numeriskt belopp.",
    "Please enter a valid numeric fee": "Ange en giltig numeriskt avgift",
    "Please enter a valid numeric interval length": "Ange en giltig numerisk intervallängd",
    "Please enter a valid numeric spendable amount": "Ange ett giltigt spenderbart belopp",
    "Please enter a valid pubkey": "Ange en giltig publik nyckel",
    "Please enter a valid token name": "Ange ett giltigt tokennamn",
    "Please enter valid wallet name": "Ange ett giltigt plånboksnamn",
    "Please finish syncing before making a transaction": "Vänta på synkronisering innan du gör en transaktion",
    "Please select backup file first": "Välj en säkerhetskopieringsfil först",
    "Please wait for wallet synchronization": "Vänta på synkronisering av plånboken",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Publik nyckel",
    "Puzzlehash": "Pusselhash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Spenderbegränsad (Rate limited)",
    "Rate Limited Info": "Info om spenderbegränsning",
    "Rate Limited User Wallet Setup": "Konfiguration av spenderbegränsad användarplånbok",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Ta emot",
    "Receive Address": "Mottagaradress",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Återställ",
    "Recover DID Wallet": "Återställ DID-plånbok",
    "Recover Distributed Identity Wallet": "Återskapa distribuerad Id-plånbok",
    "Recover Wallet": "Återställ plånbok",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Byt namn på plånboken",
    "Retire": "Dra tillbaka",
    "Save": "Spara",
    "Search on Tail Database": "Sök i Tail-databasen",
    "Select Wallet": "Välj plånbok",
    "Select Wallet Type": "Välj plånbokstyp",
    "Selected recovery file:": "Vald återställningsfil:",
    "Send": "Skicka",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Skicka detta infopaket till användaren av din spenderbegränsade plånbok, som måste använda det för att slutföra skapandet av deras plånbok:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Skicka din publika nyckel till admin för din spenderbegränsade plånbok:",
    "Show Asset Id": "Visa tillgångs-ID",
    "Spendable Amount": "Spenderbart belopp",
    "Spendable Amount Per Interval": "Spenderbart belopp per intervall",
    "Spendable Balance": "Spenderbart belopp",
    "Spending Interval (number of blocks): {interval}": ["Spenderintervall (antal block): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Längd på spenderintervall (antal block)",
    "Spending Limit (chia per interval): {0}": ["Spenderbegränsning (chia per intervall): ", ["0"]],
    "Standard Wallet": "Standardplånbok",
    "Submit": "Skicka",
    "Success": "Lyckades",
    "Summary": "Sammanfattning",
    "Synced": "Synkad",
    "Syncing": "Synkar",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "Antalet säkerhetskopierings-ID som behövs för återställning kan inte överstiga antalet säkerhetskopierings-ID som lagts till.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "Transaktionen kunde inte omedelbart läggas till i mempoolen eftersom den angivna avgiften är för låg. Transaktionen kommer att återställas med jämna mellanrum, och kan komma att inkluderas i mempoolen när avgifterna är lägre, eller om utrymme blir tillgängligt.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "Detta är inte en giltig adress för att skicka betalning till",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Detta är den mängd Chia du för tillfället kan använda för transaktioner. Det innefattar inte väntande odlingsbelöningar, väntande inkommande transaktioner eller Chia som du just spenderat men som ännu inte finns i blockkedjan.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Detta är väntande växel, det vill säga de växelmynt du har skickat till dig själv men som ännu inte har bekräftats.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Detta är summan av inkommande och utgående väntande transaktioner (som ännu inte inkluderats i blockkedjan). Den innefattar inte odlingsbelöningar.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "Detta är den sammanlagda mängden chia i blockkedjan vid det aktuella topp-blocket som kontrolleras av dina privata nycklar. Det innefattar frusna odlingsbelöningar, men inte väntande inkommande och utgående transaktioner.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Detta är totalt saldo + väntande saldo: det är vad ditt saldo kommer att vara när alla väntande transaktioner har bekräftats.",
    "To": "Till",
    "Token and Asset Issuance Limitations": "Begränsningar för utgivning av token och tillgång",
    "Token has empty asset id": "Token har ett tomt tillgångs-id",
    "Token has empty name": "Token har ett tomt namn",
    "Tokens": "Token",
    "Total Balance": "Totalt saldo",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaktionen har skickats till en fullständig nod och inkluderats i mempoolen.",
    "Transactions": "Transaktioner",
    "User Pubkey": "Publik nyckel för användare",
    "View pending balances": "Visa väntande saldon",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Plånboken finns inte",
    "Wallet with type {0} not supported": ["Plånbok av typ ", ["0"], " stöds inte"],
    "Wallet {walletId} not found": ["Plånbok ", ["walletId"], " kunde inte hittas"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Välkommen! Följande ord används för din plånboks säkerhetskopia. Utan dem förlorar du åtkomst till din plånbok, så spara dom säkert! Skriv ner varje ord tillsammans med ordningsnumret vid sidan om. (Ordningen är viktig)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "När du fått konfigurationsinfopaketet av din administratör anger du det nedan för att slutföra konfigurationen av din spenderbegränsade plånbok:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Ditt DID kräver minst ", ["dids_num_req"], " attesteringsfil", ["0"], " för återställning. Ladda upp ytterligare filer."],
    "Your pasted list does not include 24 valid mnemonic words.": "Den lista du klistrat in är inte en giltig minnesfras med 24 ord."
  }
};

/*eslint-disable*/
var messages$3 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "İşlemler",
    "Add": "Ekle",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Adres",
    "Address / Puzzle hash": "Adres / Puzzle hash",
    "Amount": "Miktar",
    "Amount For Initial Coin": "İlk Coin için Miktar",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Bakiye",
    "Cancel": "İptal Et",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Doğrulama",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Bağlantı tipi",
    "Connections": "Bağlantılar",
    "Copy": "Kopyala",
    "Create": "Oluştur",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Hız Limitli Yönetici Cüzdanı Yarat",
    "Create Rate Limited User Wallet": "Hız Limitli Kullanıcı Cüzdanı Yarat",
    "Create Transaction": "İşlem Oluşturun",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Tarih",
    "Delete": "Sil",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Chia cüzdanınıza ulaşmak için saklamış olduğunuz 24 kelimelik şifre öbeğini girin.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Çiftlik",
    "Fee": "Ücret",
    "Filename": "Dosya Adı",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "IP adresi",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Cüzdanı Mnemonics'ten içe aktar",
    "Incoming": "Gelen",
    "Info Packet": "Bilgi paketi",
    "Initial Amount": "Başlangıç ​​miktarı",
    "Initialize a Rate Limited User Wallet:": "Hız Limiti bulunan kullanıcı cüzdanını başlat:",
    "Interval": "Aralık",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Yukarı/Aşağı",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Herkese Açık Anahtarım",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Yeni Adres",
    "New Wallet": "Yeni Cüzdan",
    "Next": "Sonraki",
    "Nickname": "Kullanıcı adı",
    "No previous transactions": "Daha önce yapılmış bir işlem yok",
    "Node ID": "Node ID'si",
    "Not Available": "Uygun Değil",
    "Not Connected": "Not Connected",
    "Not Synced": "Senkronize değil",
    "OK": "OK",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "Ortalama olarak, her işlem bloğu arasında bir dakika vardır. Tıkanıklık olmadığı sürece işleminizin bir dakikadan daha kısa sürede gerçekleşmesini bekleyebilirsiniz.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Giden",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "Beklemede",
    "Pending Balance": "Bekleyen Bakiye",
    "Pending Change": "Bekleyen Değişiklik",
    "Pending Total Balance": "Bekleyen Toplam Bakiye",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Lütfen komisyonu 0 giriniz. Komisyonlara pozitif sayı girilmesi henüz RL için desteklenmiyor.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Lütfen geçerli bir başlangıç bakiyesi miktarı girin",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Lütfen geçerli bir sayısal miktar giriniz",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Lütfen geçerli bir sayısal komisyon giriniz",
    "Please enter a valid numeric interval length": "Lütfen geçerli bir sayısal aralık giriniz",
    "Please enter a valid numeric spendable amount": "Lütfen geçerli bir harcanabilir miktar giriniz",
    "Please enter a valid pubkey": "Lütfen geçerli bir herkese açık anahtar giriniz",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Lütfen transfer yapmadan önce senkronizasyonu bitirin",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Port",
    "Pubkey": "Herkese açık anahtar",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Hız Sınırı",
    "Rate Limited Info": "Hız Sınırı",
    "Rate Limited User Wallet Setup": "Hız Limitli Kullanıcı Cüzdanı Kurulumu",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Alıcının adresi",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Kaydet",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Cüzdan Türünü Seç",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Gönder",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Bu bilgi paketini, cüzdanlarının kurulumunu tamamlamak için kullanması gereken Rate Limited Wallet kullanıcınıza gönderin:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Yayın anahtarınızı Rate Limited Cüzdan yöneticinize gönderin:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Kullanilabilir Miktar",
    "Spendable Amount Per Interval": "Aralık Başına Kullanilabilir Tutar",
    "Spendable Balance": "Kullanilabilir Bakiye",
    "Spending Interval (number of blocks): {interval}": ["Harcama Aralığı (blokların sayısı): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Harcama Aralığı Uzunluğu (blokların sayısı)",
    "Spending Limit (chia per interval): {0}": ["Harcama Limiti (aralık başına chia): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Onayla",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Senkronize Edildi",
    "Syncing": "Senkronize ediliyor",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Bu, şu anda işlem yapmak için kullanabileceğiniz Chia miktarıdır. Bekleyen tarım ödüllerini, bekleyen işlemleri ve henüz harcadığınız ancak henüz blok zincirinde olmayan Chia'yı içermez.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Bu, kendinize gönderdiğiniz fakat henüz onaylanmayan değişim conilerinin onaylanmasını bekleyen değişim onaylamasıdır.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Bu toplam, gelen, giden ve bekleyen işlemlerin toplamıdır (henüz blok zincirine dahil edilmemiştir). Bu, çiftçilik ödüllerini içermez.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Bu, toplam bakiye + bekleyen bakiyedir: ki bu tüm bekleyen işlemler onaylandıktan sonra bakiyenizin oluşacak bakiyedir.",
    "To": "İçin",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Toplam Bakiye",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Herkese Açık Kullanıcı Anahtarı",
    "View pending balances": "Bekleyen bakiyeleri görüntüleyin",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Hoş geldiniz! Belirtilen kelimeler cüzdanınızın yedeği için kullanılacaktır. Onlar olmadan cüzdanınızın erişimini kaybedersiniz, onları güvende tutun! Her kelimeyi yanlarındaki sıra numarasıyla birlikte yazın. (Sıra numarası önemlidir)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Yöneticinizden kurulum bilgi paketini aldığınızda, Hızı Sınırlı Cüzdan kurulumunu tamamlamak için aşağıya girin:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$2 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "Дії",
    "Add": "Додати",
    "Add Backup ID": "Add Backup ID",
    "Add Custom Token": "Add Custom Token",
    "Add Token": "Add Token",
    "Adding {0} token": ["Adding ", ["0"], " token"],
    "Address": "Адреса",
    "Address / Puzzle hash": "Адреса / Хеш-головоломка",
    "Amount": "Кількість",
    "Amount For Initial Coin": "Початкова кількість монет",
    "Amount must be an even amount.": "Amount must be an even amount.",
    "Are you sure you want to delete unconfirmed transactions?": "Are you sure you want to delete unconfirmed transactions?",
    "Asset Id": "Asset Id",
    "Atomic Swap Wallet": "Atomic Swap Wallet",
    "Authorized Payee Wallet": "Authorized Payee Wallet",
    "Balance": "Баланс",
    "Cancel": "Відміна",
    "Cannot send chia to coloured address. Please enter a chia address.": "Cannot send chia to coloured address. Please enter a chia address.",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "Chia Asset Token",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "Coin Name",
    "Confirmation": "Confirmation",
    "Confirmed": "Confirmed",
    "Confirmed at Height": "Confirmed at Height",
    "Connected ({0})": ["Connected (", ["0"], ")"],
    "Connection type": "Тип підключення",
    "Connections": "Підключення",
    "Copy": "Копіювати",
    "Create": "Створити",
    "Create An Attestation Packet": "Create an Attestation Packet",
    "Create Chia Asset Token Wallet from Existing TAIL": "Create Chia Asset Token Wallet from Existing TAIL",
    "Create Distributed Identity Wallet": "Create Distributed Identity Wallet",
    "Create New Chia Asset Token Wallet": "Create New Chia Asset Token Wallet",
    "Create New Wallet": "Create New Wallet",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "Створити гаманець адміністратора з обмеженням частоти",
    "Create Rate Limited User Wallet": "Створити гаманець користувача з обмеженням частоти",
    "Create Transaction": "Створити транзакцію",
    "Create custom CAT Wallet": "Create custom CAT Wallet",
    "Custody Wallet": "Custody Wallet",
    "Custom": "Custom",
    "DID Wallet": "DID Wallet",
    "Date": "Дата",
    "Delete": "Видалити",
    "Delete Unconfirmed Transactions": "Delete Unconfirmed Transactions",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "Distributed Identity",
    "Drag and drop attestation packet(s)": "Drag and drop attestation packet(s)",
    "Drag and drop your recovery backup file": "Drag and drop your recovery backup file",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "Введіть мнемоніку з 24 слів, яку ви зберегли, для відновлення гаманця Chia.",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "Ферма",
    "Fee": "Комісія",
    "Filename": "Ім'я файлу",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.",
    "IP address": "ІР-адреса",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.",
    "Import": "Import",
    "Import Wallet from Mnemonics": "Імпортувати гаманець за допомогою мнемоніки",
    "Incoming": "Вхідні",
    "Info Packet": "Інформаційний Пакунок",
    "Initial Amount": "Початкова Кількість монет",
    "Initialize a Rate Limited User Wallet:": "Ініціалізувати кишеню користувача з обмеженням швидкості виведення монет:",
    "Interval": "Інтервал",
    "List of connections is empty": "List of connections is empty",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "Manage Recovery DIDs",
    "Manage token list": "Manage token list",
    "Memo": "Memo",
    "Memos": "Memos",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB Вивантаження/Завантаження",
    "Multi Sig Wallet": "Multi Sig Wallet",
    "My DID Wallet": "My DID Wallet",
    "My Pubkey": "Мій публічний ключ",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "Нова адреса",
    "New Wallet": "Новий гаманець",
    "Next": "Далі",
    "Nickname": "Прізвисько",
    "No previous transactions": "Немає попередніх транзакцій",
    "Node ID": "ID вузла",
    "Not Available": "Не доступно",
    "Not Connected": "Not Connected",
    "Not Synced": "Не синхронізовано",
    "OK": "ОК",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "У середньому між кожним блоком транзакції триває одна хвилина. За відсутністю заторів ви можете очікувати, що ваша транзакція буде включена менш ніж за хвилину.",
    "Only one backup file is allowed.": "Only one backup file is allowed.",
    "Outgoing": "Вихідні",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "В очікуванні",
    "Pending Balance": "Баланс в очікуванні",
    "Pending Change": "Зміни очікуються",
    "Pending Total Balance": "Загальний баланс очікується",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "Будь-ласка введіть нульову комісію. Додатні комісії не підтримуються для RL.",
    "Please enter a coin": "Please enter a coin",
    "Please enter a filename": "Please enter a filename",
    "Please enter a pubkey": "Please enter a pubkey",
    "Please enter a puzzlehash": "Please enter a puzzlehash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "Будь ласка, введіть припустиму початкову кількість монет",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "Будь ласка, введіть припустиму числову кількість",
    "Please enter a valid numeric amount.": "Please enter a numeric amount.",
    "Please enter a valid numeric fee": "Будь ласка, введіть припустиму числову комісію",
    "Please enter a valid numeric interval length": "Будь ласка, введіть припустиму числову довжину інтервалу",
    "Please enter a valid numeric spendable amount": "Будь ласка, введіть припустиму числову кількість витрат",
    "Please enter a valid pubkey": "Будь ласка, введіть коректний публічний ключ",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "Будь ласка, завершіть синхронізацію перед створенням транзакції",
    "Please select backup file first": "Please select the backup file first",
    "Please wait for wallet synchronization": "Please wait for wallet synchronization",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "Порт",
    "Pubkey": "Публічний ключ",
    "Puzzlehash": "Puzzlehash",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "Обмеження частоти",
    "Rate Limited Info": "Інформація обмеження частоти",
    "Rate Limited User Wallet Setup": "Налаштування гаманця з обмеженням частоти",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "Адреса отримання",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "Recover",
    "Recover DID Wallet": "Recover DID Wallet",
    "Recover Distributed Identity Wallet": "Recover Distributed Identity Wallet",
    "Recover Wallet": "Recover Wallet",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "Зберегти",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "Оберіть тип гаманця",
    "Selected recovery file:": "Selected recovery file:",
    "Send": "Надіслати",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "Надішліть цей пакет інформації до вашого обмеженого користувача Wallet, який повинен використовувати його, щоб завершити налаштування його гаманця:",
    "Send your pubkey to your Rate Limited Wallet admin:": "Надішліть свій публічний ключ адміністратору вашого гаманця з обмеженням частоти:",
    "Show Asset Id": "Show Asset Id",
    "Spendable Amount": "Витратна сума",
    "Spendable Amount Per Interval": "Витратна сума за інтервал",
    "Spendable Balance": "Витратний баланс",
    "Spending Interval (number of blocks): {interval}": ["Інтервал витрат (кількість блоків): ", ["interval"]],
    "Spending Interval Length (number of blocks)": "Інтервал витрат (кількість блоків)",
    "Spending Limit (chia per interval): {0}": ["Ліміт витрат (chia на інтервал): ", ["0"]],
    "Standard Wallet": "Standard Wallet",
    "Submit": "Надіслати",
    "Success": "Success",
    "Summary": "Summary",
    "Synced": "Синхронізовано",
    "Syncing": "Синхронізація",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "Це кількість Chia, яку можна використовувати для здійснення транзакцій. Не включає в себе очікувані винагороди за фермерство, очікувані вхідні транзакції і Chia, що ви щойно витратили, але які ще не потрапили в blockchain.",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "Це зміна, яка очікує очікування. Змінює монети, які ви відправили собі, але ще не підтверджені.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "Це сума вхідних та вихідних відкладених транзакцій (не включена в блокчейну). Це не включає винагороди фермерства.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "Це сукупний баланс + очікуваний баланс: це ваш майбутній баланс після підтвердження усіх очікуючих транзакцій.",
    "To": "До",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "Token has empty asset id",
    "Token has empty name": "Token has empty name",
    "Tokens": "Tokens",
    "Total Balance": "Загальний баланс",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "Transactions",
    "User Pubkey": "Публічний ключ користувача",
    "View pending balances": "Переглянути очікувані баланси",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "Wallet does not exist",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "Ласкаво просимо! Ці слова використовуються для резервної копії вашого гаманця. Без них Ви втратите доступ до свого гаманця, тримайте їх у безпеці! Запишіть кожне слово разом з порядковим номером поруч з ними. (Порядок важливий)",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "Коли ви отримаєте пакет інформації про налаштування від вашого адміністратора, введіть його нижче, щоб завершити налаштування кишені з обмеженням швидкості виведення:",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages$1 = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "動作",
    "Add": "新增",
    "Add Backup ID": "增加備份 ID",
    "Add Custom Token": "新增自訂義代幣",
    "Add Token": "新增代幣",
    "Adding {0} token": ["新增 ", ["0"], " 代幣"],
    "Address": "位址",
    "Address / Puzzle hash": "位址 / 拼圖雜湊值",
    "Amount": "數量",
    "Amount For Initial Coin": "初始代幣數量",
    "Amount must be an even amount.": "金額必須是偶數",
    "Are you sure you want to delete unconfirmed transactions?": "你確認要刪除未確認的交易?",
    "Asset Id": "資產 ID",
    "Atomic Swap Wallet": "Atomic交換錢包",
    "Authorized Payee Wallet": "授權收款人錢包",
    "Balance": "餘額",
    "Cancel": "取消",
    "Cannot send chia to coloured address. Please enter a chia address.": "不能寄送奇亞到有色地址。請輸入奇亞地址。",
    "Check my snapshot balance": "Check my snapshot balance",
    "Chia Asset Token": "奇亞資產代幣",
    "Click here to download an older version of the wallet": "Click here to download an older version of the wallet",
    "Coin Name": "幣種名稱",
    "Confirmation": "確認",
    "Confirmed": "確認",
    "Confirmed at Height": "已確認於高度",
    "Connected ({0})": ["連接 ", ["0"]],
    "Connection type": "連線類型",
    "Connections": "連線",
    "Copy": "複製",
    "Create": "建立",
    "Create An Attestation Packet": "建立一個證明封包",
    "Create Chia Asset Token Wallet from Existing TAIL": "從現有的TAIL建立奇亞資產代幣錢包",
    "Create Distributed Identity Wallet": "建立分散式識別的錢包",
    "Create New Chia Asset Token Wallet": "建立新的奇亞資產代幣錢包",
    "Create New Wallet": "建立新錢包",
    "Create Offer": "Create Offer",
    "Create Rate Limited Admin Wallet": "建立速率限制管理員錢包",
    "Create Rate Limited User Wallet": "建立速率限制使用者錢包",
    "Create Transaction": "建立交易",
    "Create custom CAT Wallet": "建立顧客CAT錢包",
    "Custody Wallet": "保留錢包",
    "Custom": "自訂義",
    "DID Wallet": "DID 錢包",
    "Date": "日期",
    "Delete": "刪除",
    "Delete Unconfirmed Transactions": "刪除未確認的交易",
    "Derivation Index: {0}": ["Derivation Index: ", ["0"]],
    "Distributed Identity": "分散式識別",
    "Drag and drop attestation packet(s)": "拖放證明封包",
    "Drag and drop your recovery backup file": "拖放您的備份檔案",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "輸入你已存的 24 字助記符號以復原您的 Chia 錢包。",
    "Error the entered address appears to be for a different colour.": "Error the entered address appears to be for a different colour.",
    "Farm": "耕種",
    "Fee": "費用",
    "Filename": "檔案名稱",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.\n一個私鑰可以分成幾乎無限數量的不同公鑰(指錢包地址)，這些不同的公鑰(指錢包地址)都將回歸到同一個私鑰。",
    "IP address": "IP位址",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "如果您想加快交易速度，請刪除未確認的交易並以更高的手續費重試。",
    "Import": "匯入",
    "Import Wallet from Mnemonics": "以助記符號匯入錢包",
    "Incoming": "轉入",
    "Info Packet": "資訊封包",
    "Initial Amount": "初始數量",
    "Initialize a Rate Limited User Wallet:": "初始化速率限制使用者錢包：",
    "Interval": "間隔",
    "List of connections is empty": "連接列表是空的",
    "Loading...": "Loading...",
    "Manage Recovery DIDs": "管理還原的 DID",
    "Manage token list": "管理代幣列表",
    "Memo": "備註（Memo）",
    "Memos": "備註（Memos）",
    "Mempool Full": "Mempool Full",
    "MiB Up/Down": "MiB 上傳/下傳",
    "Multi Sig Wallet": "多重簽名錢包(多簽錢包)",
    "My DID Wallet": "我的 DID 錢包",
    "My Pubkey": "我的公鑰",
    "NFT Wallet": "NFT Wallet",
    "Name": "Name",
    "New Address": "新位址",
    "New Wallet": "新錢包",
    "Next": "下一步",
    "Nickname": "暱稱",
    "No previous transactions": "沒有上一個交易",
    "Node ID": "節點 ID",
    "Not Available": "尚無",
    "Not Connected": "未連接",
    "Not Synced": "未同步",
    "OK": "好",
    "Offer Accepted": "Offer Accepted",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "平均每個交易區塊之間有 1 分鐘的時間。除非出現擁塞，否則你可以在不到 1 分鐘的時間內完成交易。",
    "Only one backup file is allowed.": "只允許一個備份檔案。",
    "Outgoing": "匯出",
    "Paste Mnemonic": "Paste Mnemonic",
    "Paste Mnemonic (24 words)": "Paste Mnemonic (24 words)",
    "Pending": "待確認中",
    "Pending Balance": "未結餘額",
    "Pending Change": "未結更動",
    "Pending Total Balance": "未結總餘額",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "請輸入 0 費用。 RL 尚未支援正向費用。",
    "Please enter a coin": "請輸入幣種",
    "Please enter a filename": "請輸入檔案名稱",
    "Please enter a pubkey": "請輸入公鑰",
    "Please enter a puzzlehash": "請輸入一個 PuzzleHash",
    "Please enter a valid CAT name": "Please enter a valid CAT name",
    "Please enter a valid asset id": "Please enter a valid asset id",
    "Please enter a valid initial coin amount": "請輸入有效的初始金額",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "Please enter an integer value of 0 or greater for the number of Backup IDs needed for recovery.",
    "Please enter a valid numeric amount": "請輸入有效的數字值",
    "Please enter a valid numeric amount.": "請輸入有效的數值。",
    "Please enter a valid numeric fee": "請輸入有效的數字費用值",
    "Please enter a valid numeric interval length": "請輸入有效的數字間隔長度值",
    "Please enter a valid numeric spendable amount": "請輸入有效的可花用數字量值",
    "Please enter a valid pubkey": "請輸入有效的公鑰",
    "Please enter a valid token name": "Please enter a valid token name",
    "Please enter valid wallet name": "Please enter valid wallet name",
    "Please finish syncing before making a transaction": "請在交易前先完成同步",
    "Please select backup file first": "請先選擇一個備份檔",
    "Please wait for wallet synchronization": "請等候錢包同步",
    "Pooling Wallet": "Pooling Wallet",
    "Port": "通訊埠",
    "Pubkey": "公鑰",
    "Puzzlehash": "拼圖哈希值",
    "RL Wallet": "RL Wallet",
    "Rate Limited": "已限速",
    "Rate Limited Info": "速率限制資訊",
    "Rate Limited User Wallet Setup": "速率限制使用者錢包設定",
    "Read the blog post for details": "Read the blog post for details",
    "Receive": "Receive",
    "Receive Address": "接收位址",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "Recipient address is not a coloured wallet address. Please enter a coloured wallet address",
    "Recover": "恢復",
    "Recover DID Wallet": "恢復 DID 錢包",
    "Recover Distributed Identity Wallet": "還原分散式識別的錢包",
    "Recover Wallet": "恢復錢包",
    "Recoverable Wallet": "Recoverable Wallet",
    "Recovery Wallet": "Recovery Wallet",
    "Rename Wallet": "Rename Wallet",
    "Retire": "Retire",
    "Save": "儲存",
    "Search on Tail Database": "Search on Tail Database",
    "Select Wallet": "Select Wallet",
    "Select Wallet Type": "選擇錢包類型",
    "Selected recovery file:": "選擇的還原檔案：",
    "Send": "發送",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "發送這個資訊封包給你必須需要完成設定他們錢包的速率限制錢包使用者：",
    "Send your pubkey to your Rate Limited Wallet admin:": "發送你的公鑰到你的速率限制錢包管理員：",
    "Show Asset Id": "顯示資產 ID",
    "Spendable Amount": "可花用數量",
    "Spendable Amount Per Interval": "每間隔可花用數量",
    "Spendable Balance": "可花用餘額",
    "Spending Interval (number of blocks): {interval}": ["花用間隔 (區塊數量)：", ["interval"]],
    "Spending Interval Length (number of blocks)": "花費間隔長度 (區塊數量)",
    "Spending Limit (chia per interval): {0}": ["花用限制（每間隔可用 Chia）：", ["0"]],
    "Standard Wallet": "標準錢包",
    "Submit": "確認",
    "Success": "成功",
    "Summary": "概要",
    "Synced": "已同步",
    "Syncing": "同步中",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "恢復備份 ID的數量不能超過添加的ID 數量。",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.",
    "This access token is verified": "This access token is verified",
    "This is not a valid address for sending funds to": "This is not a valid address for sending funds to",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "這是你目前可用來交易的 Chia 數量。他不包括未結的耕種獎勵，未結的匯入交易和你剛花用，但還沒在區塊鏈內的 Chia 。",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "這是待處理的改變，是你發送給自己的但還沒確認的改變。",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "這是匯入和匯出的未結交易的總和（還沒包含在區塊鏈中）。這不包括耕種獎勵。",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "這是總餘額 + 未結餘額：這是在全部未結交易結清後你的餘額。",
    "To": "到",
    "Token and Asset Issuance Limitations": "Token and Asset Issuance Limitations",
    "Token has empty asset id": "代幣的資產ID是空的",
    "Token has empty name": "代幣的名稱是空的",
    "Tokens": "代幣",
    "Total Balance": "總餘額",
    "Transaction has successfully been sent to a full node and included in the mempool.": "Transaction has successfully been sent to a full node and included in the mempool.",
    "Transactions": "交易",
    "User Pubkey": "使用者公鑰",
    "View pending balances": "檢視未結餘額",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "錢包不存在",
    "Wallet with type {0} not supported": ["Wallet with type ", ["0"], " not supported"],
    "Wallet {walletId} not found": ["Wallet ", ["walletId"], " not found"],
    "Want to see your old balance for yourself?": "Want to see your old balance for yourself?",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "歡迎！以下的字是用來為你的錢包備份。沒有這些你將會無法進入你的錢包。將這些安全保存好！寫下每個字，包括他們旁邊的順序數字。（順序很重要）",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "當你從你的管理員收到設定資訊封包時，在下面輸入以完成你的速率限制錢包設定：",
    "Your CAT tokens have been upgraded!": "Your CAT tokens have been upgraded!",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["Your DID requires at least ", ["dids_num_req"], " attestation file", ["0"], " for recovery. Please upload additional files."],
    "Your pasted list does not include 24 valid mnemonic words.": "Your pasted list does not include 24 valid mnemonic words."
  }
};

/*eslint-disable*/
var messages = {
  messages: {
    "+": "+",
    "-": "-",
    "Actions": "操作",
    "Add": "添加",
    "Add Backup ID": "添加备份 ID",
    "Add Custom Token": "添加自定义代币",
    "Add Token": "添加代币",
    "Adding {0} token": ["添加 ", ["0"], " 代币"],
    "Address": "地址",
    "Address / Puzzle hash": "地址 / 谜语哈希",
    "Amount": "数量",
    "Amount For Initial Coin": "初始币数量",
    "Amount must be an even amount.": "金额必须相同",
    "Are you sure you want to delete unconfirmed transactions?": "确定要删除未确认的交易吗？",
    "Asset Id": "资产 ID",
    "Atomic Swap Wallet": "原子交换钱包",
    "Authorized Payee Wallet": "授权的 Payee 钱包",
    "Balance": "余额",
    "Cancel": "取消",
    "Cannot send chia to coloured address. Please enter a chia address.": "错误: 无法发送奇亚到上色的地址. 请输入一个奇亚钱包地址.",
    "Check my snapshot balance": "检查我的快照余额",
    "Chia Asset Token": "奇亚资产代币",
    "Click here to download an older version of the wallet": "点击这里下载旧版本的钱包",
    "Coin Name": "代币名称",
    "Confirmation": "确认",
    "Confirmed": "已确认",
    "Confirmed at Height": "确认于区块高度",
    "Connected ({0})": ["已连接 (", ["0"], ")"],
    "Connection type": "连接类型",
    "Connections": "连接数",
    "Copy": "复制",
    "Create": "创建",
    "Create An Attestation Packet": "创建一个认证包",
    "Create Chia Asset Token Wallet from Existing TAIL": "从现有的TAIL创建Chia Asset Token 钱包",
    "Create Distributed Identity Wallet": "创建分布式身份钱包",
    "Create New Chia Asset Token Wallet": "创建新的Chia Asset Token 钱包",
    "Create New Wallet": "新建钱包",
    "Create Offer": "创建报价",
    "Create Rate Limited Admin Wallet": "创建费用限定型管理钱包",
    "Create Rate Limited User Wallet": "创建费用限定型用户钱包",
    "Create Transaction": "发起交易",
    "Create custom CAT Wallet": "创建自定义 CAT 钱包",
    "Custody Wallet": "Custody 钱包",
    "Custom": "自定义",
    "DID Wallet": "DID钱包",
    "Date": "日期",
    "Delete": "删除",
    "Delete Unconfirmed Transactions": "删除未确认的交易",
    "Derivation Index: {0}": ["派生索引: ", ["0"]],
    "Distributed Identity": "分布式身份认证",
    "Drag and drop attestation packet(s)": "拖放认证数据包",
    "Drag and drop your recovery backup file": "拖放您的恢复备份文件",
    "Enter the 24 word mnemonic that you have saved in order to restore your Chia wallet.": "请输入你保存的24个助记词来恢复奇亚钱包",
    "Error the entered address appears to be for a different colour.": "错误，输入的地址似乎有不同的颜色。",
    "Farm": "农场",
    "Fee": "费用",
    "Filename": "文件名",
    "HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefore wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.": "HD或等级确定钥匙是一种类型的公用钥匙/私人钥匙方案，其中一个私人钥匙可以拥有几乎无限数量的不同公用钥匙（因此钱包收到地址），所有这些都最终都会回来并可以用单个私人钥匙进行支出。",
    "IP address": "IP地址",
    "If you would like to speed up the transaction, please delete unconfirmed transactions and retry with a higher fee.": "如果您想要加快交易速度，请删除未经确认的交易并以更高的费用重试",
    "Import": "导入",
    "Import Wallet from Mnemonics": "使用助记词导入钱包",
    "Incoming": "收入",
    "Info Packet": "信息包",
    "Initial Amount": "初始金额",
    "Initialize a Rate Limited User Wallet:": "初始化费用限定型用户钱包：",
    "Interval": "间隔",
    "List of connections is empty": "连接列表为空",
    "Loading...": "正在载入……",
    "Manage Recovery DIDs": "管理恢复去中心化标识",
    "Manage token list": "管理代币列表",
    "Memo": "备注",
    "Memos": "备注",
    "Mempool Full": "内存已满",
    "MiB Up/Down": "MiB 上传/下载",
    "Multi Sig Wallet": "多个签名钱包",
    "My DID Wallet": "我的去中心化标识钱包",
    "My Pubkey": "我的公钥",
    "NFT Wallet": "NFT 钱包",
    "Name": "名称",
    "New Address": "新地址",
    "New Wallet": "新钱包",
    "Next": "下一步",
    "Nickname": "昵称",
    "No previous transactions": "无过往交易",
    "Node ID": "节点ID",
    "Not Available": "不可用",
    "Not Connected": "未连接",
    "Not Synced": "未同步",
    "OK": "确定",
    "Offer Accepted": "报价已接受",
    "On average there is one minute between each transaction block. Unless there is congestion you can expect your transaction to be included in less than a minute.": "每个交易区块平均打包时间为一分钟。通常您的交易将在一分钟内被确认，除非出现拥堵。",
    "Only one backup file is allowed.": "只允许一个备份文件。",
    "Outgoing": "支出",
    "Paste Mnemonic": "粘贴助记符",
    "Paste Mnemonic (24 words)": "粘贴助记符（24个词）",
    "Pending": "待处理",
    "Pending Balance": "待处理的余额",
    "Pending Change": "待处理的找回",
    "Pending Total Balance": "待处理总余额",
    "Please enter 0 fee. Positive fees not supported yet for RL.": "请输入费用数字0。正费用目前在RL上还不支持。",
    "Please enter a coin": "请输入货币",
    "Please enter a filename": "请输入文件名",
    "Please enter a pubkey": "请输入公钥",
    "Please enter a puzzlehash": "请输入谜题哈希",
    "Please enter a valid CAT name": "请输入有效的 CAT 名称",
    "Please enter a valid asset id": "请输入一个有效的资产ID。",
    "Please enter a valid initial coin amount": "请输入一个有效的初始币数量",
    "Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.": "请输入一个大于或者等于 0 的整数，用于恢复所需的备份ID。",
    "Please enter a valid numeric amount": "请输入一个正确的数目",
    "Please enter a valid numeric amount.": "请输入有效的数字金额。",
    "Please enter a valid numeric fee": "请输入一个正确的费用",
    "Please enter a valid numeric interval length": "请输入一个有效的长度数字",
    "Please enter a valid numeric spendable amount": "请输入一个有效的支出数目",
    "Please enter a valid pubkey": "请输入一个正确的公钥",
    "Please enter a valid token name": "请输入有效的令牌名称",
    "Please enter valid wallet name": "请输入有效的钱包名称",
    "Please finish syncing before making a transaction": "同步完成后才能发起交易。",
    "Please select backup file first": "请先选择备份文件",
    "Please wait for wallet synchronization": "请等待钱包同步",
    "Pooling Wallet": "矿池钱包",
    "Port": "端口",
    "Pubkey": "公钥",
    "Puzzlehash": "谜题哈希",
    "RL Wallet": "RL 钱包",
    "Rate Limited": "费用限定",
    "Rate Limited Info": "费用限制信息",
    "Rate Limited User Wallet Setup": "费用限定型用户钱包设置",
    "Read the blog post for details": "阅读博客文章了解详情",
    "Receive": "接收",
    "Receive Address": "接收地址",
    "Recipient address is not a coloured wallet address. Please enter a coloured wallet address": "收件人地址不是彩色钱包地址。请输入一个彩色钱包地址",
    "Recover": "恢复",
    "Recover DID Wallet": "恢复去中心化标识钱包",
    "Recover Distributed Identity Wallet": "恢复分布式身份钱包",
    "Recover Wallet": "恢复钱包",
    "Recoverable Wallet": "可恢复的钱包",
    "Recovery Wallet": "恢复钱包",
    "Rename Wallet": "重命名钱包",
    "Retire": "废弃",
    "Save": "保存",
    "Search on Tail Database": "在 Tail 数据库中搜索",
    "Select Wallet": "选择钱包",
    "Select Wallet Type": "选择钱包类别",
    "Selected recovery file:": "选择恢复文件：",
    "Send": "发送",
    "Send this info packet to your Rate Limited Wallet user who must use it to complete setup of their wallet:": "把这段信息发给你的费用限定型钱包用户, 以便他/她可以完成自己的钱包设置:",
    "Send your pubkey to your Rate Limited Wallet admin:": "将你的公钥发送到你的费用限定型管理者钱包:",
    "Show Asset Id": "显示资产ID",
    "Spendable Amount": "可用金额",
    "Spendable Amount Per Interval": "每次迭代的支出数目",
    "Spendable Balance": "可用余额",
    "Spending Interval (number of blocks): {interval}": ["支出迭代(区块数)", ["interval"]],
    "Spending Interval Length (number of blocks)": "支出迭代长度(区块数)",
    "Spending Limit (chia per interval): {0}": ["消费限额（单位时间可消费的奇亚币）：", ["0"]],
    "Standard Wallet": "标准钱包",
    "Submit": "提交",
    "Success": "成功",
    "Summary": "摘要",
    "Synced": "已同步",
    "Syncing": "正在同步",
    "The derivation index sets the range of wallet addresses that the wallet scans the blockchain for. This number is generally higher if you have a lot of transactions or canceled offers for XCH, CATs, or NFTs. If you believe your balance is incorrect because it’s missing coins, then increasing the derivation index could help the wallet include the missing coins in the balance total.": "衍生指数设置钱包链扫描钱包地址的范围。 如果您有大量交易或取消了 XCH、CATs 或 NFT 的报价，这个数字通常更高。 如果你认为你的余额是不正确的，因为它缺少硬币， 增加衍生指数可以帮助钱包在余额总额中包括缺失的硬币。",
    "The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.": "恢复所需的备份 ID 的数量不能超过添加的备份ID数量。",
    "The transaction could not be immediately included in the mempool because the specified fee is too low. The transaction will be retried periodically, and may be included in the mempool once fees are lower, or if space becomes available.": "由于指定的费用太低，无法立即将交易记录入内存池。 交易将定期重试，一旦费用降低，或有空位，交易将被纳入内存池。",
    "This access token is verified": "通行币已被验证",
    "This is not a valid address for sending funds to": "这不是一个有效的可发送资金进入的地址",
    "This is the amount of Chia that you can currently use to make transactions. It does not include pending farming rewards, pending incoming transactions, and Chia that you have just spent but is not yet in the blockchain.": "这是你目前可以交易的奇亚币数额。该数额不包含处理中的农场奖励、收入交易，以及未经区块链确认的支付交易。",
    "This is the pending change, which are change coins which you have sent to yourself, but have not been confirmed yet.": "处理中的找零钱, 是你发送支出的找回, 但是没有被链上确认.",
    "This is the sum of the incoming and outgoing pending transactions (not yet included into the blockchain). This does not include farming rewards.": "待处理的收入与支出总和(还未上链). 不包括农场耕种奖励.",
    "This is the total amount of chia in the blockchain at the current peak block that is controlled by your private keys. It includes frozen farming rewards, but not pending incoming and outgoing transactions.": "这里是你的私钥所控制的，到目前最新子块高度为止的全部奇亚数。包含被冻结的耕种奖励， 但不包含待处理的收入与支出。",
    "This is the total balance + pending balance: it is what your balance will be after all pending transactions are confirmed.": "目前结余+待处理的结余: 在链上确认完成后就是你的最终总结余.",
    "To": "目标地址",
    "Token and Asset Issuance Limitations": "代币和资产发行限制",
    "Token has empty asset id": "代币有空资产ID",
    "Token has empty name": "代币名称为空",
    "Tokens": "代币",
    "Total Balance": "总余额",
    "Transaction has successfully been sent to a full node and included in the mempool.": "交易已成功发送到一个完整的节点，并包含在备注库中。",
    "Transactions": "交易",
    "User Pubkey": "用户公钥",
    "View pending balances": "查看处理中的余额",
    "Wallet Connections": "Wallet Connections",
    "Wallet does not exists": "钱包不存在",
    "Wallet with type {0} not supported": ["不支持类型 ", ["0"], " 的钱包"],
    "Wallet {walletId} not found": ["未找到钱包 ", ["walletId"]],
    "Want to see your old balance for yourself?": "想看到你自己的旧余额吗？",
    "We've made an upgrade to the CAT standard which requires all CATs to be re-issued. You will be airdropped your new tokens as they are re-issued by the original issuers. The airdropped tokens will be based on the balance as of block height:<0/><1/><2/>(Approximate time: July 26th, 2022 @ 17:00 UTC)": "我们已经升级到CAT标准，该标准要求所有CAT代币必须重新发布。 您将被空投您的新代币，因为它们是由原始发行者重新发行的。 空投代币将基于块高度的余额：<0/><1/><2/>(大约时间：7月26日，2022@ 17:00 UTC)",
    "Welcome! The following words are used for your wallet backup. Without them, you will lose access to your wallet, keep them safe! Write down each word along with the order number next to them. (Order is important)": "欢迎使用奇亚! 下面的词语列表是你的钱包密语, 请务必严格完整的把它们记下来(保持顺序). 没有这段密语的话, 你就没办法找回钱包里的币. 千万也不要透露给别人.",
    "When you receive the setup info packet from your admin, enter it below to complete your Rate Limited Wallet setup:": "当你从管理员那收到这个设置信息后, 请把它输入到下面以便完成费用限定型钱包设置:",
    "Your CAT tokens have been upgraded!": "您的 CAT 代币已被升级！",
    "Your DID requires at least {dids_num_req} attestation file{0} for recovery. Please upload additional files.": ["您的DID需要至少 ", ["dids_num_req"], " 认证文件", ["0"], " 才能恢复。请上传其他文件。"],
    "Your pasted list does not include 24 valid mnemonic words.": "您粘贴的列表中未包含24个有效的助记词。"
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

export { WalletAdd, WalletCAT, WalletConnections, WalletCreate, WalletImport, WalletName, WalletReceiveAddressField, StandardWallet as WalletStandard, WalletStatus, Wallets, getWalletPrimaryTitle, getWalletSyncingStatus, isCATWalletPresent, index as locales, useIsWalletSynced, useWallet, useWalletHumanValue, useWalletState, useWalletTransactions };
