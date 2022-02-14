import React from 'react'
import './ConsolePage.css'
import Footer from 'components/ConsolePage/Footer/Footer'
import RequestHistory from 'components/ConsolePage/RequestHistory/RequestHistory'
import Console from 'components/ConsolePage/Console/Console'
import Header from 'components/ConsolePage/Header/Header'
import { FullScreenHandle } from 'react-full-screen'

type PropsType = {
  fullScreen: FullScreenHandle,
}
const ConsolePage = ({ fullScreen }: PropsType) => {
  return (
    <div className="console-page">
      <Header fullScreen={fullScreen} />
      <RequestHistory />
      <Console />
      <Footer />
    </div>
  )
}

export default ConsolePage
