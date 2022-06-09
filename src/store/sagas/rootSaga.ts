import {auth, AuthType, authWithSession, makeRequest, RequestType,} from 'api/sendsay'
import {
  LOGIN,
  LOGIN_WITH_SESSION,
  loginActions,
  SetAuthResultType,
  SetCredentialsType,
  SetIsLoadingType,
} from '../actions/login/loginActions'
import {call, CallEffect, put, PutEffect, takeEvery} from 'redux-saga/effects'
import {
  AddRequestToHistoryType,
  ChangeCurrentRequestActionType,
  consoleActions,
  IsRequestErrorType,
  RUN_REQUEST
} from '../actions/console/consoleActions'
import {RequestStatus} from '../reducers/consoleReducer'

import {v4 as randomID} from 'uuid'

export default function* rootSaga() {
  yield takeEvery(LOGIN, loginSaga)
  yield takeEvery(LOGIN_WITH_SESSION, loginWithSessionSaga)
  yield takeEvery(RUN_REQUEST, runRequestSaga)
}

function* loginSaga(
  {
    payload: {login, sublogin, password}
  }: { type: typeof loginActions.login, payload: { login: string, sublogin: string, password: string } }
): Generator<| PutEffect<SetIsLoadingType | SetCredentialsType | SetAuthResultType>
  | CallEffect<AuthType>,
  void | null,
  AuthType> {
  try {
    yield put(loginActions.setIsLoadingAction(true))
    const response: AuthType = yield call(
      auth,
      login,
      sublogin,
      password
    )

    if (!response.isError) {
      yield put(
        loginActions.setCredentials({
          login,
          sublogin
        })
      )
    }
    yield put(loginActions.setAuthResultAction(response))
    yield put(loginActions.setIsLoadingAction(false))
  } catch (e) {
    return null
  }
}

function* loginWithSessionSaga(): Generator<CallEffect<AuthType> | PutEffect<SetAuthResultType | SetCredentialsType>,
  void,
  AuthType> {
  const response: AuthType = yield call(authWithSession)
  yield put(loginActions.setAuthResultAction(response))
  if (!response.isError && response.credentials) {
    yield put(
      loginActions.setCredentials({
        login: response.credentials.login,
        sublogin: response.credentials.sublogin,
      })
    )
  }
}

function* runRequestSaga({payload}: {
  type: typeof consoleActions.runRequest
  payload: string
}): Generator<CallEffect<string | unknown> | PutEffect<IsRequestErrorType | ChangeCurrentRequestActionType | AddRequestToHistoryType>, void, RequestType> {
  let request
  try {
    request = yield call(JSON.parse, payload)
    console.log(request)
    yield put(consoleActions.setIsRequestError(false))
  } catch (e) {
    yield put(consoleActions.setIsRequestError(true))
  }
  if (request) {
    const response = yield call(makeRequest, payload)
    const isSuccessful = !!(response.res._ehid ?? false)
    const status = isSuccessful
      ? RequestStatus.Successful
      : RequestStatus.Unsuccessful
    const id = randomID()
    const requestText = payload

    const requestResponse = JSON.stringify(response, null, 4)
    const newRequest = { status, id, requestText, requestResponse }
    yield put(consoleActions.setIsRequestError(!isSuccessful))
    yield put(consoleActions.changeCurrentRequest(newRequest))
    yield put(consoleActions.addRequestToHistory(newRequest))
  }
}
