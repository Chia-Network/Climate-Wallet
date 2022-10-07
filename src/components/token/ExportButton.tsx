import { Trans } from '@lingui/macro'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import { Box, styled, useTheme } from '@mui/material'
import { CSVLink } from 'react-csv'

interface IExportButtonProps {
  fileName: string
  data: any[]
}

const StyledExportIcon = styled(VerticalAlignBottomIcon)({
  width: '18px',
  height: '18px',
  marginRight: '10px',
})

const ExportButton = ({ fileName, data }: IExportButtonProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '4px',
        '&:hover': {
          borderColor: '#528E52',
          backgroundColor: theme.palette['other'].lightBackground,
        },
      }}
    >
      <CSVLink
        style={{
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: theme.palette['other'].buttonTextGreen,
          display: 'flex',
          alignItems: 'center',
          fontSize: '13px',
          fontWeight: '500',
          padding: '4px 13px',
          width: '100%',
          height: '100%',
        }}
        data={data}
        filename={fileName}
      >
        <StyledExportIcon />
        <Trans>Export</Trans>
      </CSVLink>
    </Box>
  )
}

export default ExportButton
