import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import ConsolePage from './ConsolePage'

import {
  getCurrentRequest,
  getIsRequestError,
  getIsResponseError,
  getRequestHistory,
} from 'store/selectors/consolePage/selector'
import { Request } from 'store/reducers/consoleReducer'
import { authWithSession, logout } from 'api/sendsay'
import { useNavigate } from 'react-router-dom'

import { getAuthResult } from 'store/selectors/loginPage/selector'
import { AuthResult } from 'store/reducers/loginReducer'
import { RootState } from 'store/store'
import { loginActions } from 'store/actions/login/loginActions'
import { consoleActions } from 'store/actions/console/consoleActions'
import { runRequest } from 'store/thunks/consoleThunks'

// type MapState = {
//     currentRequest: Request,
//     requestHistory: Array<Request>,
//     isRequestError: boolean,
//     isResponseError: boolean
//     auth: AuthResult,
// }
// type DispatchState = {
//     changeRequestBody: (body: string) => ChangeRequestBodyActionType
//     changeCurrentRequest: (request: Request) =>
//         ChangeCurrentRequestActionType
//     setAuthResult: (authResult: AuthResult) =>
//         SetAuthResultActionType
//     runRequest: (body: string) => void
// }
type Props = ReduxProps

const ConsolePageContainer = ({
  currentRequest,
  isResponseError,
  isRequestError,
  changeRequestBody,
  requestHistory,
  auth,
  runRequest,
  setAuthResult,
}: Props) => {
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

  const onSubmitRequest = async (body: string) => {
    console.log(body)
    await runRequest(body)
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

const connector = connect(
  (state: RootState) => {
    return {
      currentRequest: getCurrentRequest(state),
      requestHistory: getRequestHistory(state),
      isRequestError: getIsRequestError(state),
      isResponseError: getIsResponseError(state),
      auth: getAuthResult(state),
    }
  },
  {
    changeRequestBody: (body: string) => consoleActions.changeRequestText(body),
    changeCurrentRequest: (request: Request) =>
      consoleActions.changeCurrentRequest(request),
    setAuthResult: (authResult: AuthResult) =>
      loginActions.setAuthResultAction(authResult),
    runRequest,
  }
)
type ReduxProps = ConnectedProps<typeof connector>
export default connector(ConsolePageContainer)
