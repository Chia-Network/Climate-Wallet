import { TransactionHistory } from '@/hooks/wallet'
import { getMemosDescription } from '@/util/token'
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
  useTheme,
} from '@mui/material'
import React, { Fragment, ReactNode, useMemo } from 'react'
import { tableAlignLeft } from './TokenHistory'
import { TokenType } from './TokenType'

interface TokenHistoryRowProps {
  transactionHistory: TransactionHistory
}

type RowType = {
  key: string
  title?: ReactNode
  value: ReactNode
}

const TokenHistoryRow = ({ transactionHistory }: TokenHistoryRowProps) => {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()

  const {
    confirmed: isConfirmed,
    toAddress,
    memos: memoHexs,
    historyType,
  } = transactionHistory

  const rows: RowType[] = [
    {
      key: 'type',
      value: (
        <Typography variant="inherit">
          {transactionHistory.historyTypeString}
        </Typography>
      ),
    },
    {
      key: 'status',
      value: (
        <Box
          sx={{
            border: '1px solid #BFBFBF',
            borderRadius: '30px',
            px: 1,
            textAlign: 'center',
            color: theme.palette.text.secondary,
          }}
        >
          {isConfirmed ? <Trans>Confirmed</Trans> : <Trans>Pending</Trans>}
        </Box>
      ),
    },
    {
      key: 'date',
      value: <Box>{transactionHistory.date}</Box>,
    },
    {
      key: 'unit count',
      value: <>{transactionHistory.unitCount}</>,
    },
    {
      key: 'fee',
      value: <>{transactionHistory.fee}</>,
    },
  ]

  // TODO : refine
  const fakePublicKey = useMemo(() => 'XXXXXXXXXXXX', [transactionHistory])
  const fakeBeneficiary = useMemo(
    () => 'Lorem ipsum dolor sit amet, eos susci',
    [transactionHistory]
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
            title: <Trans>{'To'}</Trans>,
            value: <Typography variant="inherit">{toAddress}</Typography>,
          },
          memosNode,
        ]
      case TokenType.Retire:
        return [
          {
            key: 'Beneficiary',
            title: <Trans>{'Beneficiary'}</Trans>,
            value: <Typography variant="inherit">{fakeBeneficiary}</Typography>,
          },
          {
            key: 'Public Key',
            title: <Trans>{'Public Key'}</Trans>,
            value: <Typography variant="inherit">{fakePublicKey}</Typography>,
          },
        ]
      case TokenType.Receive:
        return [
          {
            key: 'From',
            title: <Trans>{'From'}</Trans>,
            value: <Typography variant="inherit">{toAddress}</Typography>,
          },
          memosNode,
        ]
      case TokenType.Detokenize:
        return []
      default:
        return []
    }
  }, [transactionHistory])

  return (
    <Fragment>
      <TableRow>
        {/* first cell is arrow icon */}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {rows.map((row, index) => (
          <TableCell
            align={tableAlignLeft(index)}
            key={row.key}
            component="th"
            scope="row"
          >
            <Typography
              component="div"
              variant="body2"
              noWrap
              color="textPrimary"
            >
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
                        {row.title}
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
