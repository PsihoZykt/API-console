import { createAction } from 'store/helpers/helper'
import { AuthResult } from 'store/reducers/loginReducer'
import { InferActionTypes } from 'store/store'

// export const SET_AUTH_RESULT = 'SET_AUTH_RESULT'
// export const SET_IS_LOADING = 'SET_IS_LOADING'
// export type SetAuthResultAction = Action<typeof SET_AUTH_RESULT, AuthResult>
// export type SetIsLoadingAction = Action<typeof SET_IS_LOADING, boolean>

export const loginActions = {
  setIsLoadingAction: (isLoading: boolean) => {
    return createAction('SET_IS_LOADING', isLoading)
  },
  setAuthResultAction: (authResult: AuthResult) => {
    return createAction('SET_AUTH_RESULT', authResult)
  },
}
export type SetIsLoadingActionType = ReturnType<
  typeof loginActions.setAuthResultAction
>
export type SetAuthResultActionType = ReturnType<
  typeof loginActions.setAuthResultAction
>

export type LoginActionsType = InferActionTypes<typeof loginActions>
