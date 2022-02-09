const initialState = {
  authResult: {
    isError: false,
    res: { id: '', explain: '', request: {} },
  },
  isLoading: false,
}

export default function appReducer(state = [], action) {
  switch (action.type) {
    case 'SET_AUTH_RESULT': {
      return {
        ...state,
        authResult: action.authResult,
      }
    }
    case 'SET_IS_LOADING': {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }
    default:
      return state
  }
}
