import styled from 'styled-components'

import { DesignToken } from '../../design-tokens'

const SiteTitle = styled.h1`
  display: block;
  margin: 0 auto;
  max-width: ${DesignToken.maxWidth};
  font-size: ${DesignToken.header.textSize};
  line-height: ${DesignToken.header.textSize};
`

export default SiteTitle
