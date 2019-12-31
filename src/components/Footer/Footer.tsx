import styled from 'styled-components'
import { DesignToken as GlobalDesignToken } from '../../design-tokens'

const DesignToken = {
  ...GlobalDesignToken,

  footer: {
    ...GlobalDesignToken.footer,
    textAlign: 'center',
  },
}

const Footer = styled.footer`
  margin-top: auto;
  text-align: ${DesignToken.footer.textAlign};
  background-color: ${DesignToken.footer.backgroundColor};
  color: ${DesignToken.footer.textColor};
  font-size: ${DesignToken.footer.textSize};
  line-height: calc(${DesignToken.footer.textSize} * ${DesignToken.lineHeightFactor});
  padding: ${DesignToken.defaultPadding};
`

export default Footer
