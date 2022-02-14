import React, { ChangeEvent } from 'react'
import { Request } from 'store/reducers/consoleReducer'
import './ConsolePage.css'
import { AuthResult, Credentials } from 'store/reducers/loginReducer'
import Footer from 'components/ConsolePage/Footer/Footer'
import RequestHistory from 'components/ConsolePage/RequestHistory/RequestHistory'
import Console from 'components/ConsolePage/Console/Console'
import Header from 'components/ConsolePage/Header/Header'

type PropsType = {
  fullScreen: any,
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
