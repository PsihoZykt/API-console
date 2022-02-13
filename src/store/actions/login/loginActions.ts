import { createAction } from 'store/helpers/helper'
import { AuthResult, Credentials } from 'store/reducers/loginReducer'
import { InferActionTypes } from 'store/store'

export const loginActions = {
  setIsLoadingAction: (isLoading: boolean) => {
    return createAction('SET_IS_LOADING', isLoading)
  },
  setAuthResultAction: (authResult: AuthResult) => {
    return createAction('SET_AUTH_RESULT', authResult)
  },
  setCredentials: (credentials: Credentials) => {
    return createAction('SET_CREDENTIALS', credentials)
  },
}
export type SetIsLoadingType = ReturnType<
  typeof loginActions.setIsLoadingAction
>
export type SetAuthResultType = ReturnType<
  typeof loginActions.setAuthResultAction
>
export type SetCredentialsType = ReturnType<typeof loginActions.setCredentials>

export type LoginActionsType = InferActionTypes<typeof loginActions>
