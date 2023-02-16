import React from 'react'
import './App.css'

import SiteWrapper from './components/SiteWrapper'
import Site from './site/Site'

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <SiteWrapper>
        <Site />
      </SiteWrapper>
    </div>
  )
}

export default App
