import { CARBON_TOKEN_UNIT as unit } from '@/constants/unit'
import { getMemosDescription } from '@/util/token'
import { Transaction, TransactionType } from '@chia/api'
import {
  FormatLargeNumber,
  mojoToCAT,
  mojoToChia,
  useCurrencyCode,
} from '@chia/core'
import { Trans } from '@lingui/macro'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Box,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import moment from 'moment'
import React, { Fragment, ReactNode, useMemo } from 'react'
import { tableAlignLeft } from './TokenHistory'
import { TokenType } from './TokenType'

interface TokenHistoryRowProps {
  transaction: Transaction
}

type RowType = {
  key: string
  value: ReactNode
}

const TokenHistoryRow = ({ transaction }: TokenHistoryRowProps) => {
  const [open, setOpen] = React.useState(false)
  const feeUnit = useCurrencyCode()

  const {
    isConfirmed,
    createdAtTime,
    type,
    amount,
    feeAmount,
    toAddress,
    memos: memoHexs,
  } = transaction

  const isOutgoing = [
    TransactionType.OUTGOING,
    TransactionType.OUTGOING_TRADE,
  ].includes(type)

  const historyType: TokenType =
    type === TokenType.Default
      ? isOutgoing
        ? TokenType.Send
        : TokenType.Receive
      : type

  const rows = useMemo<RowType[]>(
    () => [
      {
        key: 'expand',
        value: (
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        ),
      },
      {
        key: 'type',
        value: (
          <Typography variant="inherit">
            {TokenType[historyType].toString()}
          </Typography>
        ),
      },
      {
        key: 'status',
        value: isConfirmed ? <Trans>Confirmed</Trans> : <Trans>Pending</Trans>,
      },
      {
        key: 'date',
        value: <Box>{moment(createdAtTime * 1000).format('LLL')}</Box>,
      },
      {
        key: 'unit count',
        value: (
          <>
            {isOutgoing ? <Trans>-</Trans> : <Trans>+</Trans>}
            &nbsp;
            <FormatLargeNumber value={mojoToCAT(amount)} />
            &nbsp;
            {unit}
          </>
        ),
      },
      {
        key: 'fee',
        value: (
          <>
            <FormatLargeNumber value={mojoToChia(feeAmount)} />
            &nbsp;
            {feeUnit}
          </>
        ),
      },
    ],
    [transaction, open]
  )

  // TODO : refine
  const fakePublicKey = useMemo(() => 'XXXXXXXXXXXX', [transaction])
  const fakeBeneficiary = useMemo(
    () => 'Lorem ipsum dolor sit amet, eos susci',
    [transaction]
  )

  const memosNode = useMemo<RowType>(() => {
    const memos = getMemosDescription(memoHexs)
    return {
      key: 'Memos',
      value: memos.state ? (
        <Stack direction="row" spacing={1}>
          {memos.value.map((memo, index) => (
            <Typography variant="inherit" key={index}>
              {memo ?? ''}
            </Typography>
          ))}
        </Stack>
      ) : (
        <Typography variant="inherit">{memos.value[0]}</Typography>
      ),
    }
  }, [memoHexs])

  const collapseRows = useMemo<RowType[]>(() => {
    switch (historyType) {
      case TokenType.Send:
        return [
          {
            key: 'To',
            value: <Typography variant="inherit">{toAddress}</Typography>,
          },
          memosNode,
        ]
      case TokenType.Retire:
        return [
          {
            key: 'Beneficiary',
            value: <Typography variant="inherit">{fakeBeneficiary}</Typography>,
          },
          {
            key: 'Public Key',
            value: <Typography variant="inherit">{fakePublicKey}</Typography>,
          },
        ]
      case TokenType.Receive:
        return [
          {
            key: 'From',
            value: <Typography variant="inherit">{toAddress}</Typography>,
          },
          memosNode,
        ]
      case TokenType.Detokenize:
        return []
      default:
        return []
    }
  }, [transaction])

  return (
    <Fragment>
      <TableRow>
        {rows.map((row, index) => (
          <TableCell
            align={tableAlignLeft(index - 1)}
            key={row.key}
            component="th"
            scope="row"
          >
            <Typography component="div" variant="body2" noWrap>
              {row.value}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableBody>
                {collapseRows.map((row) => (
                  <TableRow key={row.key}>
                    <TableCell>
                      <Typography
                        component="div"
                        variant="body2"
                        color="textSecondary"
                        noWrap
                      >
                        <Trans>{row.key}</Trans>
                        {':'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box maxWidth="100%">
                        <Typography component="div" variant="body2" noWrap>
                          {row.value}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default TokenHistoryRow
