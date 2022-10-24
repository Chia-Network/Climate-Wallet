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
  styled,
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
  width?: string
  key: string
  title?: ReactNode
  value: ReactNode
}

const StyledTableCellWithoutBorder = styled(TableCell)({
  borderBottom: 'none',
  height: '24px',
  paddingBottom: 0,
  paddingTop: 0,
})

const StyledTableCell = styled(TableCell)({
  width: 'auto',
})

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
      value: isConfirmed ? (
        <Box
          sx={{
            border: '1px solid #BFBFBF',
            borderRadius: '30px',
            px: 1,
            textAlign: 'center',
            color: theme.palette.text.secondary,
            fontWeight: '500',
          }}
        >
          <Trans>Confirmed</Trans>
        </Box>
      ) : (
        <Box
          sx={{
            borderRadius: '30px',
            backgroundColor: '#FCE5D1',
            px: 1,
            textAlign: 'center',
            color: '#ED6C02',
            fontWeight: '500',
          }}
        >
          <Trans>Pending</Trans>{' '}
        </Box>
      ),
    },
    {
      width: '100%',
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

  const memosNode = useMemo<RowType>(() => {
    const memos = getMemosDescription(memoHexs)
    return {
      key: 'Memos',
      title: <Trans>{'Memos'}</Trans>,
      value:
        Object.values(memoHexs).length === 0 ? (
          <Typography variant="inherit">{''}</Typography>
        ) : memos.state ? (
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
      case TokenType.Retire:
        return [
          {
            key: 'To',
            title: <Trans>{'To'}</Trans>,
            value: <Typography variant="inherit">{toAddress}</Typography>,
          },
          memosNode,
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
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        {rows.map((row, index) => (
          <StyledTableCell
            align={tableAlignLeft(index)}
            key={row.key}
            component="th"
            scope="row"
            sx={{
              width: row.width ?? 'auto',
            }}
          >
            <Typography
              component="div"
              variant="body2"
              noWrap
              color="textPrimary"
            >
              {row.value}
            </Typography>
          </StyledTableCell>
        ))}
      </TableRow>
      <TableRow sx={{ py: 2 }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                py: '12px',
              }}
            >
              <Table>
                <TableBody>
                  {collapseRows.map((row) => (
                    <TableRow key={row.key}>
                      <StyledTableCellWithoutBorder
                        align="right"
                        sx={{ verticalAlign: 'top' }}
                      >
                        <Typography
                          component="div"
                          variant="body2"
                          color="textSecondary"
                          noWrap
                        >
                          {row.title}
                        </Typography>
                      </StyledTableCellWithoutBorder>
                      <StyledTableCellWithoutBorder
                        sx={{
                          width: '100%',
                        }}
                      >
                        <Typography
                          component="div"
                          variant="body2"
                          sx={{
                            wordBreak: 'break-all',
                          }}
                        >
                          {row.value}
                        </Typography>
                      </StyledTableCellWithoutBorder>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default TokenHistoryRow
