import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Anchor from './components/Anchor'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

import { DesignToken } from './design-tokens'

const DataFetcher = lazy(() => import('./containers/DataFetcher'))

interface AppContainerProps {
  className?: string
}

const AppContainer: React.FC<AppContainerProps> = ({ className }) => {
  return (
    <Router>
      <div className={className}>
        <Header>Crypto Value Index</Header>
        <Main>
          <Switch>
            <Route path="/:date?">
              <Suspense fallback={<>Loading...</>}>
                <DataFetcher />
              </Suspense>
            </Route>
          </Switch>
        </Main>
        <Footer>
          © 2017–{new Date().getFullYear()} Crypto Value Index / Red Ochsenbein, red@red0.ch
          <br />
          ETH: 0xe40A5B24f50263e31471adE468360f6F814ACB8a
          <br />
          Donations are very welcome
          <br />
          <Anchor href="https://redochsenbein.ch/contact">Imprint</Anchor> |{' '}
          <Anchor href="https://redochsenbein.ch/privacy">Privacy Policy</Anchor>
        </Footer>
      </div>
    </Router>
  )
}

const App = styled(AppContainer)`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  color: ${DesignToken.textColor};
`

export default App
