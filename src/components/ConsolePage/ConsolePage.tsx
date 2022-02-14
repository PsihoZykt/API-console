import React from 'react'
import './ConsolePage.css'
import Footer from 'components/ConsolePage/Footer/Footer'
import RequestHistory from 'components/ConsolePage/RequestHistory/RequestHistory'
import Console from 'components/ConsolePage/Console/Console'
import Header from 'components/ConsolePage/Header/Header'
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from 'react-full-screen'

const ConsolePage = () => {
  const fullScreen = useFullScreenHandle()
  return (
    <FullScreen handle={fullScreen}>
      <div className="console-page">
        <Header fullScreen={fullScreen} />
        <RequestHistory />
        <Console />
        <Footer />
      </div>
    </FullScreen>
  )
}

export default ConsolePage
