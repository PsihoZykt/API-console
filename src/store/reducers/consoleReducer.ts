import {
  AddRequestToHistoryType,
  ChangeCurrentRequestActionType,
  ChangeRequestBodyActionType,
  ChangeRequestResponseType,
  ConsoleActionsType,
  DeleteRequestActionType,
  IsRequestErrorType,
  IsResponseErrorType,
  SetRequestConsoleWidthType,
} from 'store/actions/console/consoleActions'

export enum RequestStatus {
  Successful,
  Unsuccessful,
  NotSubmitted,
}

export interface Request {
  id: string;
  status: RequestStatus;
  requestText: string;
  requestResponse: string;
}

export interface ConsoleState {
  login: string;
  sublogin: string;
  isRequestError: boolean;
  isResponseError: boolean;
  requestConsoleWidth: number;
  requestHistory: Request[];
  currentRequest: Request;
}

export const initialState: ConsoleState = {
  login: '',
  sublogin: '',
  isRequestError: false,
  isResponseError: false,
  requestConsoleWidth: 400,
  requestHistory: [],
  currentRequest: {
    id: '1',
    status: RequestStatus.NotSubmitted,
    requestText: '{"action": "pong"}',
    requestResponse: '{}',
  },
}
const changeRequestBody = (
  state: ConsoleState,
  action: ChangeRequestBodyActionType
): ConsoleState => ({
  ...state,
  currentRequest: {
    ...state.currentRequest,
    requestText: action.payload,
  },
})
const changeCurrentRequest = (
  state: ConsoleState,
  action: ChangeCurrentRequestActionType
): ConsoleState => ({
  ...state,
  currentRequest: action.payload,
})

const addRequestToHistory = (
  state: ConsoleState,
  action: AddRequestToHistoryType
): ConsoleState => {
  const newRequestHistory = [...state.requestHistory]

  let uniqRequestHistoryItemIndex = 0
  const parsedActionText = JSON.parse(action.payload.requestText)

  const uniqRequestHistoryItem = newRequestHistory.find((request, index) => {
    const parsedRequestText = JSON.parse(request.requestText)
    if (parsedRequestText.action === parsedActionText.action) {
      uniqRequestHistoryItemIndex = index
      return request
    }
  })
  if (uniqRequestHistoryItem) {
    newRequestHistory.splice(
      0,
      0,
      newRequestHistory.splice(uniqRequestHistoryItemIndex, 1)[0]
    )
  } else if (newRequestHistory.length < 15 && parsedActionText.action) {
    newRequestHistory.unshift(action.payload)
  }
  if (newRequestHistory.length >= 15 && parsedActionText.action) {
    newRequestHistory.pop()
  }

  return {
    ...state,
    requestHistory: newRequestHistory,
  }
}
const deleteRequest = (
  state: ConsoleState,
  action: DeleteRequestActionType
): ConsoleState => ({
  ...state,
  requestHistory: state.requestHistory.filter((request) => {
    return request.id !== action.payload.id
  }),
})
const clearRequestHistory = (state: ConsoleState): ConsoleState => ({
  ...state,
  requestHistory: [],
})
const setIsRequestError = (
  state: ConsoleState,
  action: IsRequestErrorType
): ConsoleState => ({
  ...state,
  isRequestError: action.payload,
})
const setIsResponseError = (
  state: ConsoleState,
  action: IsResponseErrorType
): ConsoleState => ({
  ...state,
  isResponseError: action.payload,
})
const changeRequestResponse = (
  state: ConsoleState,
  action: ChangeRequestResponseType
): ConsoleState => ({
  ...state,
  currentRequest: {
    ...state.currentRequest,
    requestResponse: action.payload,
  },
})
const setRequestConsoleWidth = (
  state: ConsoleState,
  action: SetRequestConsoleWidthType
): ConsoleState => ({
  ...state,
  requestConsoleWidth: action.payload,
})
export default function consoleReducer(
  state = initialState,
  action: ConsoleActionsType
) {
  switch (action.type) {
    case 'CHANGE_REQUEST_BODY':
      return changeRequestBody(state, action)
    case 'CHANGE_CURRENT_REQUEST':
      return changeCurrentRequest(state, action)
    case 'ADD_REQUEST_TO_HISTORY':
      return addRequestToHistory(state, action)
    case 'DELETE_REQUEST':
      return deleteRequest(state, action)
    case 'SET_IS_REQUEST_ERROR':
      return setIsRequestError(state, action)
    case 'SET_IS_RESPONSE_ERROR':
      return setIsResponseError(state, action)
    case 'CHANGE_REQUEST_RESPONSE':
      return changeRequestResponse(state, action)
    case 'CLEAR_REQUEST_HISTORY':
      return clearRequestHistory(state)
    case 'SET_REQUEST_CONSOLE_WIDTH':
      return setRequestConsoleWidth(state, action)
    default:
      return state
  }
}
