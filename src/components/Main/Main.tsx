import styled from 'styled-components'

import { DesignToken } from '../../design-tokens'

const Main = styled.main`
  width: calc(100% - ${DesignToken.defaultPadding} * 2);
  align-self: center;
  padding: ${DesignToken.defaultPadding};
  max-width: ${DesignToken.maxWidth};
`

export default Main
