import styled from 'styled-components'

import { DesignToken } from '../../design-tokens'

const Main = styled.main`
  width: calc(100% - ${DesignToken.defaultPadding} * 2);
  align-self: center;
  padding: ${DesignToken.defaultPadding};
  max-width: calc(${DesignToken.maxWidth} / 3);
  line-height: 1.6;
`

export default Main
