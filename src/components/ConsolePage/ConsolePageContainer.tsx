import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import ConsolePage from './ConsolePage'

import {getCurrentRequest, getRequestHistory,} from 'store/selectors/consolePage/selector'
import {Request, RequestStatus} from 'store/reducers/consoleReducer'
import {authWithSession, logout, makeRequest} from 'api/sendsay'
import {useNavigate} from 'react-router-dom'

import {getAuthResult} from 'store/selectors/loginPage/selector'
import {AuthResult} from 'store/reducers/loginReducer'
import {RootState} from 'store/store'
import {loginActions, SetAuthResultActionType} from "store/actions/login/loginActions";
import {
  ChangeCurrentRequestActionType,
  ChangeRequestBodyActionType,
  consoleActions,
  SubmitRequestActionType
} from "store/actions/console/consoleActions";

type MapState = {
  currentRequest: Request,
  requestHistory: Array<Request>,
  auth: AuthResult,
}
type DispatchState = {
  changeRequestBody: (body: string) => ChangeRequestBodyActionType
  submitRequest: (request: Request) => SubmitRequestActionType
  changeCurrentRequest: (request: Request) =>
      ChangeCurrentRequestActionType
  setAuthResult: (authResult: AuthResult) =>
      SetAuthResultActionType
}
type Props = MapState & DispatchState

const ConsolePageContainer = ({
                                currentRequest,
                                changeRequestBody,
                                submitRequest,
                                requestHistory,
                                changeCurrentRequest,
                                auth,
                                setAuthResult,
                              }: Props) => {
  const [isRequestError, setIsRequestError] = useState(false)
  const [isResponseError, setIsResponseError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('sendsay_session')) {
      authWithSession().then((res) => {
        console.log(res)
        setAuthResult(res)
      })
    } else {
      navigate('/')
    }
  }, [])

  const onLogout = () => {
    localStorage.removeItem('sendsay_session')
    logout().then((res) => {
      navigate('/')
    })
  }

  const onSubmitRequest = (body: string) => {
    let request
    try {
      request = JSON.parse(body)
      console.log(request)

      setIsRequestError(false)
    } catch (e) {
      console.log('Parse error')
      setIsRequestError(true)
    }
    if (request) {
      makeRequest(body).then((res) => {
        // Sendsay returns _ehid only with successful request, so we can use it
        const isSuccessful = !!(res._ehid ?? false)
        const status = isSuccessful
          ? RequestStatus.Successful
          : RequestStatus.Unsuccessful

        const id = res['_ehid']
        const requestText = body
        const requestResponse = JSON.stringify(res)
        setIsResponseError(!isSuccessful)
        changeCurrentRequest({ status, id, requestText, requestResponse })
        submitRequest({ status, id, requestText, requestResponse })
      })
    }
  }
  return (
      <ConsolePage
          onSubmitRequest={onSubmitRequest}
          currentRequest={currentRequest}
          changeRequestBody={changeRequestBody}
          requestHistory={requestHistory}
          isRequestError={isRequestError}
          isResponseError={isResponseError}
          auth={auth}
          onLogout={onLogout}
      />
  )
}

const connector = connect<MapState, DispatchState, Record<string, never>, RootState>(
    (state: RootState) => {
      return {
        currentRequest: getCurrentRequest(state),
        requestHistory: getRequestHistory(state),
        auth: getAuthResult(state),
      }
    },
    {
      changeRequestBody: (body: string) => consoleActions.createChangeRequestBodyAction(body),
      submitRequest: (request: Request) => consoleActions.createSubmitRequestAction(request),
      changeCurrentRequest: (request: Request) =>
          consoleActions.createChangeCurrentRequestAction(request),
      setAuthResult: (authResult: AuthResult) =>
          loginActions.setAuthResultAction(authResult),

    }
)
export default connector(ConsolePageContainer)
