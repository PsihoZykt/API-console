import {
  LoginActionsType,
  SetAuthResultType,
  SetCredentialsType,
  SetIsLoadingType,
} from 'store/actions/login/loginActions'

export type AuthResult = {
  isError: boolean,
  credentials: Credentials | null,
  res: any,
}
export type LoginState = {
  authResult: AuthResult,
  isLoading: boolean,
  credentials: Credentials,
}
export type Credentials = {
  login: string | null,
  sublogin: string | null,
  password?: string | null,
}
const initialState = {
  authResult: {
    isError: false,
    res: { id: '', explain: '', request: {} },
    credentials: null,
  },
  isLoading: false,
  credentials: {
    login: '',
    sublogin: '',
  },
}
const setAuthResult = (
  state: LoginState,
  action: SetAuthResultType
): LoginState => ({
  ...state,
  authResult: action.payload,
})
const setIsLoading = (
  state: LoginState,
  action: SetIsLoadingType
): LoginState => ({
  ...state,
  isLoading: action.payload,
})
const setCredentials = (
  state: LoginState,
  action: SetCredentialsType
): LoginState => ({
  ...state,
  credentials: action.payload,
})

export default function loginReducer(
  state: LoginState = initialState,
  action: LoginActionsType
) {
  switch (action.type) {
    case 'SET_AUTH_RESULT':
      return setAuthResult(state, action)
    case 'SET_IS_LOADING':
      return setIsLoading(state, action)
    case 'SET_CREDENTIALS':
      return setCredentials(state, action)
    default:
      return state
  }
}
