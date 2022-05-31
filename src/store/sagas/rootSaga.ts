import {
  auth,
  AuthType,
  authWithSession,
  makeRequest,
  RequestType,
} from 'api/sendsay'
import {
  LOGIN,
  LOGIN_WITH_SESSION,
  loginActions,
  LoginType,
} from '../actions/login/loginActions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { consoleActions, RUN_REQUEST } from '../actions/console/consoleActions'
import { RequestStatus } from '../reducers/consoleReducer'

import { v4 as randomID } from 'uuid'
import { AnyAction } from 'redux'

export default function* rootSaga() {
  yield takeEvery(LOGIN, loginSaga)
  yield takeEvery(LOGIN_WITH_SESSION, loginWithSessionSaga)
  yield takeEvery(RUN_REQUEST, runRequestSaga)
}

function* loginSaga(action: AnyAction): Generator<any, void | null, LoginType> {
  try {
    yield put(loginActions.setIsLoadingAction(true))
    const response: any = yield call(
      auth,
      action.payload.login,
      action.payload.sublogin,
      action.payload.password
    )

    if (!response.isError) {
      yield put(
        loginActions.setCredentials({
          login: action.payload.login,
          sublogin: action.payload.sublogin,
        })
      )
    }
    yield put(loginActions.setAuthResultAction(response))
    yield put(loginActions.setIsLoadingAction(false))
  } catch (e) {
    return null
  }
}

function* loginWithSessionSaga(): Generator<any, void, AuthType & RequestType> {
  const response: AuthType & RequestType = yield call(authWithSession)
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

function* runRequestSaga(action: AnyAction): Generator<any, void, RequestType> {
  let request
  try {
    request = yield call(JSON.parse, action.payload)
    console.log(request)
    yield put(consoleActions.setIsRequestError(false))
  } catch (e) {
    yield put(consoleActions.setIsRequestError(true))
  }
  if (request) {
    const response = yield call(makeRequest, action.payload)
    const isSuccessful = !!(response.res._ehid ?? false)
    const status = isSuccessful
      ? RequestStatus.Successful
      : RequestStatus.Unsuccessful
    const id = randomID()
    const requestText = action.payload

    const requestResponse = JSON.stringify(response, null, 4)
    const newRequest = { status, id, requestText, requestResponse }
    yield put(consoleActions.setIsRequestError(!isSuccessful))
    yield put(consoleActions.changeCurrentRequest(newRequest))
    yield put(consoleActions.addRequestToHistory(newRequest))
  }
}
