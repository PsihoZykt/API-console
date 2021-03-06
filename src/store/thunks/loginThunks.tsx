import { auth, authWithSession } from 'api/sendsay'
import { ThunkAction } from 'redux-thunk'
import { RootState } from 'store/store'
import {
  loginActions,
  LoginActionsType,
} from 'store/actions/login/loginActions'

export const signIn =
  (
    login: string,
    sublogin: string,
    password: string
  ): ThunkAction<Promise<void>, RootState, unknown, LoginActionsType> =>
  async (dispatch) => {
    dispatch(loginActions.setIsLoadingAction(true))
    const response = await auth(login, sublogin, password)
    if (!response.isError) {
      dispatch(loginActions.setCredentials({ login, sublogin }))
    }
    dispatch(loginActions.setAuthResultAction(response))
    dispatch(loginActions.setIsLoadingAction(false))
  }

export const signInWithSession =
  (): ThunkAction<Promise<void>, RootState, unknown, LoginActionsType> =>
  async (dispatch) => {
    const response = await authWithSession()
    dispatch(loginActions.setAuthResultAction(response))
    if (!response.isError && response.credentials) {
      dispatch(
        loginActions.setCredentials({
          login: response.credentials.login,
          sublogin: response.credentials.sublogin,
        })
      )
    }
  }
