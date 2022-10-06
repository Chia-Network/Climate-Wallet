import { Stack, styled } from '@mui/material'
import React, { PropsWithChildren, type ReactNode } from 'react'

const StyledFullRoot = styled(Stack)({
  width: '100%',
  height: '100%',
})

const StyledSidebar = styled(Stack)({
  height: '100%',
  position: 'relative',
})

const StyledContent = styled(Stack)({
  height: '100%',
  flexGrow: 1,
  overflowY: 'scroll',
  position: 'relative',
})

export type LayoutDashboardSubProps = {
  sidebar: ReactNode
}

export default function LayoutDashboardSub({
  sidebar,
  children,
}: PropsWithChildren<LayoutDashboardSubProps>) {
  return (
    <StyledFullRoot direction="row">
      <StyledSidebar>{sidebar}</StyledSidebar>
      <StyledContent>{children}</StyledContent>
    </StyledFullRoot>
  )
}
