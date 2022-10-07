import { ExportButton } from '@/components/token'
import { useSelectedWallet, useWalletTransactions } from '@/hooks/wallet'
import { useGetTransactionsQuery } from '@/services/climateService'
import { toBech32m } from '@chia/api'
import { useCurrencyCode, useSerializedNavigationState } from '@chia/core'
import { Trans } from '@lingui/macro'
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { tr } from 'make-plural'
import React, { useMemo } from 'react'
import TokenHistoryRow from './TokenHistoryRow'

const defaultRowsPerPageOptions = [5, 10, 25, 50, 100]
const historyTableHeads = [
  { key: 'Type', node: <Trans>Type</Trans> },
  { key: 'Status', node: <Trans>Status</Trans> },
  { key: 'Date', node: <Trans>Date</Trans> },
  { key: 'Unit Count', node: <Trans>Unit Count</Trans> },
  { key: 'Fee', node: <Trans>Fee</Trans> },
]

const TokenHistory = () => {
  const { walletId, wallet, unit, loading } = useSelectedWallet()

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
    transactions,
    isLoading: isWalletTransactionsLoading,
    page,
    rowsPerPage,
    count,
    pageChange,
  } = useWalletTransactions(Number(walletId), 10, 0, 'RELEVANCE')
  const feeUnit = useCurrencyCode()
  const { navigate } = useSerializedNavigationState()

  // const isLoading = isWalletTransactionsLoading || isWalletLoading
  // TODO : update the retire address
  const metaData = useMemo(() => {
    // TODO : refactor retire address
    const retireAddress =
      feeUnit &&
      toBech32m(
        '0000000000000000000000000000000000000000000000000000000000000000',
        feeUnit
      )

    return {
      unit,
      feeUnit,
      retireAddress,
    }
  }, [unit, feeUnit])

  const handleExport = () => {
    // TODO : implement export
  }

  // if there is transaction, then show the pagination
  const pages = useMemo<boolean>(
    () => (transactions ? transactions.length > 0 : false),
    [transactions]
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
    if (!transactions) return []
    return transactions.map((transaction) => {
      // TODO : check data
      return { type: transaction.type }
    })
  }, [transactions])

  return (
    <Stack spacing={2} sx={{ paddingBottom: '30px' }}>
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
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="transactions history table">
            <TableHead>
              <TableRow>
                {/* shift one head for collapse icon */}
                <TableCell />
                {historyTableHeads.map((head) => (
                  <TableCell key={head.key}>{head.node}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* NOTE : if there is no transitions, then show the empty text */}
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TokenHistoryRow transaction={transaction} />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      height: '120px',
                      textAlign: 'center',
                    }}
                    colSpan={6}
                  >
                    <Trans>No transaction history</Trans>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Stack>
    </Stack>
  )
}

export default TokenHistory
