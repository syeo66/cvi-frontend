import React from 'react'
import styled from 'styled-components'

import SiteTitle from '../SiteTitle'
import { DesignToken } from '../../design-tokens'

interface HeaderContainerProps {
  children: React.ReactNode
  className?: string
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ className, children }) => (
  <header className={className}>
    <SiteTitle>{children}</SiteTitle>
  </header>
)
const Header = styled(HeaderContainer)`
  background-color: ${DesignToken.header.backgroundColor};
  color: ${DesignToken.header.textColor};
  padding: ${DesignToken.defaultPadding};
`

export default Header
