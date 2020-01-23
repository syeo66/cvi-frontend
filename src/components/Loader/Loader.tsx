import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

import { DesignToken } from '../../design-tokens'

interface LoaderComponentProps {
  className?: string
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({ className }) => (
  <div className={className}>
    <FontAwesomeIcon icon={faSync} size="1x" spin />
  </div>
)

const Loader = styled(LoaderComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${DesignToken.primaryColor};
  position: fixed;
  top: ${DesignToken.defaultPadding};
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  background-color: ${DesignToken.backgroundColor};
  padding: 0.5rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
`

export default Loader
