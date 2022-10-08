import { Trans } from '@lingui/macro'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Button, styled, useTheme } from '@mui/material'
import { useRef } from 'react'
import { CSVLink } from 'react-csv'

interface IExportButtonProps {
  fileName: string
  data: any[]
}

const StyledExportIcon = styled(FileDownloadOutlinedIcon)({
  width: '18px',
  height: '18px',
  marginRight: '6px',
})

const ExportButton = ({ fileName, data }: IExportButtonProps) => {
  const csvLink = useRef()

  const handleExportClick = () => {
    console.log(csvLink)
    csvLink?.current?.link.click()
  }

  return (
    <Button
      variant="outlined"
      sx={{ textTransform: 'uppercase', px: 1, py: '4px' }}
      onClick={handleExportClick}
    >
      <StyledExportIcon />
      <Trans>Export</Trans>
      <CSVLink
        style={{ display: 'hide' }}
        data={data}
        filename={fileName}
        ref={csvLink}
      />
    </Button>
  )
}

export default ExportButton
