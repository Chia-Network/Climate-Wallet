import LanguageIcon from '@mui/icons-material/Language'
import {
  Button,
  ButtonProps,
  Fade,
  Menu,
  MenuItem,
  Stack,
  SxProps,
  Theme,
} from '@mui/material'
import React, { PropsWithChildren, useRef, useState } from 'react'

const borderStyle: SxProps<Theme> = {
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
}

const BorderButton = ({
  children,
  sx,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{ ...borderStyle, ...sx }}
      {...props}
    >
      {children}
    </Button>
  )
}

const LanguageSelect = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Stack>
      <BorderButton
        onClick={handleClick}
        sx={{
          width: '36px',
          height: '36px',
          minWidth: 'unset',
          color: 'black', // TODO : use theme color like icon color
        }}
      >
        <LanguageIcon
          sx={{
            width: '20px',
          }}
        />
      </BorderButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          mt: 1,
        }}
      >
        <MenuItem onClick={handleClose}>English</MenuItem>
      </Menu>
    </Stack>
  )
}

export default LanguageSelect
