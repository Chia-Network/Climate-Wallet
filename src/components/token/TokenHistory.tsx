import { useSelectedWallet, useWalletTransactionsHistory } from '@/hooks/wallet'
import { toBech32m } from '@chia/api'
import { useCurrencyCode, useSerializedNavigationState } from '@chia/core'
import { Trans } from '@lingui/macro'
import {
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useMemo } from 'react'
import ExportButton from './ExportButton'
import TokenHistoryRow from './TokenHistoryRow'

const defaultRowsPerPageOptions = [5, 10, 25, 50, 100]
const historyTableHeads = [
  { key: 'Type', node: <Trans>Type</Trans> },
  { key: 'Status', node: <Trans>Status</Trans> },
  { key: 'Date', node: <Trans>Date</Trans> },
  { key: 'Quantity', node: <Trans>Quantity</Trans> },
  { key: 'Fee', node: <Trans>Fee</Trans> },
]

export const tableAlignLeft = (index: number) =>
  [1, 2].includes(index) ? 'left' : 'right'

const StyledWhiteTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}))

const StyledHeaderTableCell = styled(StyledWhiteTableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.text.secondary} `,
}))

const TokenHistory = () => {
  const { walletId, wallet, unit, loading } = useSelectedWallet()
  const theme = useTheme()

  //TODO: replace old transactions endpoint
  /*
  const { data: transactions2 } = useGetTransactionsQuery({
    wallet_id: Number(walletId),
    start: 0,
    end: 50,
    reverse: false,
  })
  */

  const {
    transactionsHistory,
    isLoading,
    page,
    rowsPerPage,
    count,
    pageChange,
  } = useWalletTransactionsHistory(Number(walletId), 10, 0, 'RELEVANCE')
  const feeUnit = useCurrencyCode()

  // if there is transaction, then show the pagination
  const pages = useMemo<boolean>(
    () => (transactionsHistory ? transactionsHistory.length > 0 : false),
    [transactionsHistory]
  )

  // NOTE : copy from @chia/core/TableControlled
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    pageChange(rowsPerPage, newPage)
  }

  // NOTE : copy from @chia/core/TableControlled
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    pageChange(+event.target.value, 0)
  }

  const transactionsCSVData = useMemo(() => {
    if (!transactionsHistory) return []
    return transactionsHistory.map((history) => {
      return {
        Type: history.historyTypeString,
        Status: history.status,
        Date: history.date,
        Quantity: history.unitCount,
        Fee: history.fee,
      }
    })
  }, [transactionsHistory])

  return (
    <Stack spacing={2} sx={{ paddingBottom: '40px' }}>
      {/* NOTO : not sure why the TablePagination would out of the screen, so add the padding bottom for the extra space */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/*  header */}
        <Typography variant="h6">
          <Trans>Transactions History</Trans>
        </Typography>
        <ExportButton fileName="history.csv" data={transactionsCSVData} />
      </Stack>
      {/*  table */}
      <Stack>
        <TableContainer
          component={Paper}
          sx={{
            border: `1px solid ${theme.palette['other'].disabledBackground}`,
            borderRadius: '4px',
            boxShadow: 'none',
          }}
        >
          <Table stickyHeader aria-label="transactions history table">
            <TableHead>
              <TableRow>
                {/* shift one head for collapse icon */}
                <StyledHeaderTableCell />
                {historyTableHeads.map((head, index) => (
                  <StyledHeaderTableCell
                    align={tableAlignLeft(index)}
                    key={head.key}
                  >
                    {head.node}
                  </StyledHeaderTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* NOTE : if there is no transitions, then show the empty text */}
              {transactionsHistory && transactionsHistory.length > 0 ? (
                transactionsHistory.map((transaction) => (
                  <TokenHistoryRow transactionHistory={transaction} />
                ))
              ) : (
                <TableRow>
                  <StyledWhiteTableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      height: '120px',
                      textAlign: 'center',
                    }}
                    colSpan={6}
                  >
                    <Trans>No transaction history</Trans>
                  </StyledWhiteTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {pages && (
            <TablePagination
              rowsPerPageOptions={defaultRowsPerPageOptions}
              component="div"
              count={count ?? 0}
              rowsPerPage={rowsPerPage}
              page={page ?? 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </Stack>
    </Stack>
  )
}

export default TokenHistory
