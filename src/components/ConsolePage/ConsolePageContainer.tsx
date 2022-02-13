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

import {
  getAuthResult,
  getCredentials,
} from 'store/selectors/loginPage/selector'
import { AuthResult, Credentials } from 'store/reducers/loginReducer'
import { RootState } from 'store/store'
import { loginActions } from 'store/actions/login/loginActions'
import { consoleActions } from 'store/actions/console/consoleActions'
import { runRequest } from 'store/thunks/consoleThunks'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

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
  credentials,
  clearRequestHistory,
  setCredentials,
}: Props) => {
  const navigate = useNavigate()
  const handle = useFullScreenHandle()
  useEffect(() => {
    if (localStorage.getItem('sendsay_session')) {
      const login = localStorage.getItem('login')
      const sublogin = localStorage.getItem('sublogin')
      authWithSession().then((res) => {
        setAuthResult(res)
        setCredentials({ login, sublogin })
      })
    } else {
      navigate('/')
    }
  }, [])
  const onFullScreen = () => {
    handle.active ? handle.exit() : handle.enter()
  }
  const onLogout = () => {
    localStorage.removeItem('sendsay_session')
    localStorage.removeItem('login')
    localStorage.removeItem('sublogin')
    logout().then((res) => {
      navigate('/')
    })
  }
  const onFormatting = (body: string) => {
    changeRequestBody(JSON.stringify(JSON.parse(body), null, '\t'))
  }

  const onSubmitRequest = async (body: string) => {
    await runRequest(body)
  }

  return (
    <FullScreen handle={handle}>
      <ConsolePage
        onSubmitRequest={onSubmitRequest}
        currentRequest={currentRequest}
        changeRequestBody={changeRequestBody}
        requestHistory={requestHistory}
        isRequestError={isRequestError}
        isResponseError={isResponseError}
        clearRequestHistory={clearRequestHistory}
        auth={auth}
        onLogout={onLogout}
        credentials={credentials}
        onFullScreen={onFullScreen}
        onFormatting={onFormatting}
      />
    </FullScreen>
  )
}

const connector = connect(
  (state: RootState) => {
    return {
      currentRequest: getCurrentRequest(state),
      requestHistory: getRequestHistory(state),
      isRequestError: getIsRequestError(state),
      isResponseError: getIsResponseError(state),
      credentials: getCredentials(state),
      auth: getAuthResult(state),
    }
  },
  {
    changeRequestBody: (body: string) => consoleActions.changeRequestText(body),
    changeCurrentRequest: (request: Request) =>
      consoleActions.changeCurrentRequest(request),
    setAuthResult: (authResult: AuthResult) =>
      loginActions.setAuthResultAction(authResult),
    clearRequestHistory: () => consoleActions.clearRequestHistory(),
    setCredentials: (credentials: Credentials) =>
      loginActions.setCredentials(credentials),
    runRequest,
  }
)
type ReduxProps = ConnectedProps<typeof connector>
export default connector(ConsolePageContainer)
