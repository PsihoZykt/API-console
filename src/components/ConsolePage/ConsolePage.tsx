import React, { ChangeEvent } from 'react'
import { Request } from 'store/reducers/consoleReducer'
import './ConsolePage.css'
import { AuthResult, Credentials } from 'store/reducers/loginReducer'
import Footer from 'components/ConsolePage/Footer/Footer'
import RequestHistory from 'components/ConsolePage/RequestHistory/RequestHistory'
import Console from 'components/ConsolePage/Console/Console'
import Header from 'components/ConsolePage/Header/Header'

type PropsType = {
  currentRequest: Request,
  onSubmitRequest: (requestText: string) => void,
  changeRequestBody: (requestText: string) => void,
  requestHistory: Array<Request>,
  isRequestError: boolean,
  isResponseError: boolean,
  auth: AuthResult,
  onLogout: () => void,
  fullScreen: any,
  clearRequestHistory: () => void,
  credentials: Credentials,
  onFormatting: (body: string) => void,
  setRequestConsoleWidth : (width: number) => void
  requestConsoleWidth: number,
}
const ConsolePage = ({
  currentRequest,
  onSubmitRequest,
  changeRequestBody,
  requestHistory,
  isRequestError,
  isResponseError,
  clearRequestHistory,
  auth,
  credentials,
  fullScreen,
  onLogout,
  onFormatting,
  setRequestConsoleWidth,
  requestConsoleWidth
}: PropsType) => {
  const onCurrentRequestTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeRequestBody(e.target.value)
  }

  return (
    <div className="console-page">
      <Header
        auth={auth}
        onLogout={onLogout}
        fullScreen={fullScreen}
        credentials={credentials}
      />
      <RequestHistory
        clearRequestHistory={clearRequestHistory}
        requestHistory={requestHistory}
      />
      <Console
        currentRequest={currentRequest}
        onCurrentRequestTextChange={onCurrentRequestTextChange}
        isRequestError={isRequestError}
        isResponseError={isResponseError}
        setRequestConsoleWidth={setRequestConsoleWidth}
        requestConsoleWidth={requestConsoleWidth}
      />
      <Footer
        onSubmitRequest={onSubmitRequest}
        currentRequest={currentRequest}
        onFormatting={onFormatting}
      />
    </div>
  )
}

export default ConsolePage
