import {
  SET_AUTH_RESULT,
  SET_IS_LOADING,
  SetAuthResultAction,
  SetIsLoadingAction,
} from 'store/actions/login'

export type AuthResult = {
  isError: boolean,
  res: any,
}
export type LoginState = {
  authResult: AuthResult,
  isLoading: boolean,
}

const initialState = {
  authResult: {
    isError: false,
    res: { id: '', explain: '', request: {} },
  },
  isLoading: false,
}

export function setAuthResult(
  state: LoginState,
  action: SetAuthResultAction
): LoginState {
  return {
    ...state,
    authResult: action.payload,
  }
}

export function setIsLoading(
  state: LoginState,
  action: SetIsLoadingAction
): LoginState {
  return {
    ...state,
    isLoading: action.payload,
  }
}

type Actions = SetIsLoadingAction | SetAuthResultAction
export default function loginReducer(
  state: LoginState = initialState,
  action: Actions
) {
  switch (action.type) {
    case SET_AUTH_RESULT:
      return setAuthResult(state, action)
    case SET_IS_LOADING:
      return setIsLoading(state, action)
    default:
      return state
  }
}
