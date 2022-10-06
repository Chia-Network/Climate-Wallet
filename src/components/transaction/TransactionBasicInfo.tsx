import type { TransactionInfosType } from '@/types/TransactionType'
import { Typography } from '@mui/material'
import { memo } from 'react'
import { TransactionInfo } from './TransactionStyle'

interface Props {
  infos: TransactionInfosType
}

const TransactionBasicInfo = memo(({ infos }: Props) => {
  const carbonTokenInfo: TransactionInfosType = [...infos]

  return (
    <TransactionInfo spacing={1} sx={{ mb: 3 }}>
      {carbonTokenInfo.map((item, index) => (
        <Typography key={index}>
          <Typography color="gray" component="span" sx={{ mr: 1 }}>
            {item.subtitle}:
          </Typography>
          <Typography component="span">{item.value}</Typography>
        </Typography>
      ))}
    </TransactionInfo>
  )
})

export default TransactionBasicInfo
