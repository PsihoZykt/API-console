import { LoginActionsType } from 'store/actions/login/loginActions'

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

export default function loginReducer(
  state: LoginState = initialState,
  action: LoginActionsType
) {
  switch (action.type) {
    case 'SET_AUTH_RESULT':
      return {
        ...state,
        authResult: action.payload,
      }
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}
