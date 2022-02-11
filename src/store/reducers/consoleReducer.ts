import {
  ChangeCurrentRequestActionType,
  ChangeRequestBodyActionType,
  ConsoleActionsType,
  DeleteRequestActionType,
  SubmitRequestActionType,
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
  requestHistory: Request[];
  currentRequest: Request;
}

const initialState: ConsoleState = {
  login: '',
  sublogin: '',
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

const submitRequest = (
  state: ConsoleState,
  action: SubmitRequestActionType
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

export default function consoleReducer(
  state = initialState,
  action: ConsoleActionsType
) {
  switch (action.type) {
    case 'CHANGE_REQUEST_BODY':
      return changeRequestBody(state, action)
    case 'CHANGE_CURRENT_REQUEST':
      return changeCurrentRequest(state, action)
    case 'SUBMIT_REQUEST':
      return submitRequest(state, action)
    case 'DELETE_REQUEST':
      return deleteRequest(state, action)
    default:
      return state
  }
}
