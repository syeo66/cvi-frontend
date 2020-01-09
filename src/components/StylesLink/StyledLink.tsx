import styled from 'styled-components'
import { Link, LinkProps } from 'react-router-dom'

import { DesignToken } from '../../design-tokens'

interface StyledLinkProps extends LinkProps {
  disabled?: boolean
}

const StyledLink = styled(Link)`
  color: ${DesignToken.linkColor};
  ${(props: StyledLinkProps) =>
    props.disabled
      ? `
        pointer-events: none;
        text-decoration: none;
        `
      : ''}
`

export default StyledLink
