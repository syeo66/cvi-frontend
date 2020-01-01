import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { DesignToken } from '../../design-tokens'

const StyledLink = styled(Link)`
  color: ${DesignToken.linkColor};
`

export default StyledLink
