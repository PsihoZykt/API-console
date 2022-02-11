import {
  AddRequestToHistoryType,
  ChangeCurrentRequestActionType,
  ChangeRequestBodyActionType,
  ConsoleActionsType,
  DeleteRequestActionType,
  IsRequestErrorType,
  IsResponseErrorType,
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
  isRequestError: boolean,
  isResponseError: boolean
  requestHistory: Request[];
  currentRequest: Request;
}

const initialState: ConsoleState = {
  login: '',
  sublogin: '',
  isRequestError: false,
  isResponseError: false,
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
): ConsoleState => ({
  ...state,
  requestHistory: [...state.requestHistory, action.payload],
})
const deleteRequest = (
    state: ConsoleState,
    action: DeleteRequestActionType
): ConsoleState => ({
  ...state,
  requestHistory: state.requestHistory.filter((request) => {
    return request.id !== action.payload.id
  }),
})
const setIsRequestError = (state: ConsoleState, action: IsRequestErrorType): ConsoleState => ({
  ...state,
  isRequestError: action.payload
})
const setIsResponseError = (state: ConsoleState, action: IsResponseErrorType): ConsoleState => ({
  ...state,
  isResponseError: action.payload
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
    case "ADD_REQUEST_TO_HISTORY":
      return addRequestToHistory(state, action)
    case 'DELETE_REQUEST':
      return deleteRequest(state, action)
    case "SET_IS_REQUEST_ERROR":
      return setIsRequestError(state, action)
    case "SET_IS_RESPONSE_ERROR":
      return setIsResponseError(state, action)
    default:
      return state
  }
}
