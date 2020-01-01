import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import SiteTitle from '../SiteTitle'
import { DesignToken } from '../../design-tokens'

interface HeaderContainerProps {
  children: React.ReactNode
  className?: string
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ className, children }) => (
  <header className={className}>
    <Link to="/">
      <SiteTitle>{children}</SiteTitle>
    </Link>
  </header>
)
const Header = styled(HeaderContainer)`
  background-color: ${DesignToken.header.backgroundColor};
  color: ${DesignToken.header.textColor};
  padding: ${DesignToken.defaultPadding};

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default Header
