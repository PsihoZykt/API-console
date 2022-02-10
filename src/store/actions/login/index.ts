import { Action } from 'store/helpers/helper'
import { AuthResult } from 'store/reducers/loginReducer'

export const SET_AUTH_RESULT = 'SET_AUTH_RESULT'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export type SetAuthResultAction = Action<typeof SET_AUTH_RESULT, AuthResult>
export type SetIsLoadingAction = Action<typeof SET_IS_LOADING, boolean>
