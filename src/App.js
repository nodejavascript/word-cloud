import React from 'react'
import ReactGA from 'react-ga4'

import './App.css'

import SiteWrapper from './layout/SiteWrapper'
import GraphqlClient from './GraphqlClient'
import Site from './site/Site'

const { REACT_APP_MEASUREMENT_ID } = process.env

const App = () => {
  ReactGA.initialize(REACT_APP_MEASUREMENT_ID)
  return (
    <GraphqlClient>
      <SiteWrapper>
        <Site />
      </SiteWrapper>
    </GraphqlClient>
  )
}

export default App
