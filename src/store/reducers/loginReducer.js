const initialState = {
  authResult: {
    isError: false,
    res: { id: '', explain: '', request: {} },
  },
  isLoading: false,
}
const SET_AUTH_RESULT = 'SET_AUTH_RESULT'
const SET_IS_LOADING = 'SET_IS_LOADING'

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_RESULT: {
      return {
        ...state,
        authResult: action.authResult,
      }
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }
    default:
      return state
  }
}

export const setIsLoading = (isLoading) => {
  return {
    type: SET_IS_LOADING,
    isLoading: isLoading,
  }
}
export const setAuthResult = (authResult) => {
  return {
    type: SET_AUTH_RESULT,
    authResult: authResult,
  }
}
