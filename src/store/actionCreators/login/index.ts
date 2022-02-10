import {
  SET_AUTH_RESULT,
  SET_IS_LOADING,
  SetAuthResultAction,
  SetIsLoadingAction,
} from 'store/actions/login'
import { createAction } from 'store/helpers/helper'
import { AuthResult } from 'store/reducers/loginReducer'

export function createSetIsLoadingAction(
  isLoading: boolean
): SetIsLoadingAction {
  return createAction(SET_IS_LOADING, isLoading)
}

export function createSetAuthResultAction(
  authResult: AuthResult
): SetAuthResultAction {
  return createAction(SET_AUTH_RESULT, authResult)
}
