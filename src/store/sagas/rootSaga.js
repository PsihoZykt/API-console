import { auth, authWithSession } from '../../api/sendsay'
import { loginActions } from '../actions/login/loginActions'
import { call, put, takeEvery } from 'redux-saga/effects'

export default function* rootSaga() {
  yield takeEvery('SIGN_IN', loginSaga)
  yield takeEvery('SIGN_IN_WITH_SESSION', loginWithSessionSaga)
}

function* loginSaga(action) {
  try {
    yield put(loginActions.setIsLoadingAction(true))
    const response = yield call(
      auth,
      action.payload.login,
      action.payload.sublogin,
      action.payload.password
    )
    console.log('RESPONSE')
    console.log(response)
    if (!response.hasError) {
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

function* loginWithSessionSaga() {
  const response = yield call(authWithSession)
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
