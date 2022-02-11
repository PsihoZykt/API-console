import React, { ChangeEvent } from 'react'
import { Request } from 'store/reducers/consoleReducer'
import './ConsolePage.css'
import { AuthResult } from 'store/reducers/loginReducer'
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
}
const ConsolePage = ({
  currentRequest,
  onSubmitRequest,
  changeRequestBody,
  requestHistory,
  isRequestError,
  isResponseError,
  auth,
  onLogout,
}: PropsType) => {
  const onCurrentRequestTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeRequestBody(e.target.value)
  }

  return (
    <div>
      <Header auth={auth} onLogout={onLogout} />
      <RequestHistory requestHistory={requestHistory} />
      <Console
        currentRequest={currentRequest}
        onCurrentRequestTextChange={onCurrentRequestTextChange}
        isRequestError={isRequestError}
        isResponseError={isResponseError}
      />
      <Footer
        onSubmitRequest={onSubmitRequest}
        currentRequest={currentRequest}
      />
    </div>
  )
}

export default ConsolePage
