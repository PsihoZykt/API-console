import {
  CHANGE_CURRENT_REQUEST,
  CHANGE_REQUEST_BODY,
  ChangeCurrentRequestAction,
  ChangeRequestBodyAction,
  DELETE_REQUEST,
  DeleteRequestAction,
  SUBMIT_REQUEST,
  SubmitRequestAction,
} from 'store/actions/console'

export enum RequestStatus {
  Successful,
  Unsuccessful,
  NotSubmitted,
}

export interface Request {
  id: number;
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

function changeRequestBody(
  state: ConsoleState,
  action: ChangeRequestBodyAction
): ConsoleState {
  return {
    ...state,
    currentRequest: { ...state.currentRequest, requestText: action.payload },
  }
}

function deleteRequest(
  state: ConsoleState,
  action: DeleteRequestAction
): ConsoleState {
  return {
    ...state,
    requestHistory: state.requestHistory.filter((request) => {
      return request.id !== action.payload.id
    }),
  }
}

function changeCurrentRequest(
  state: ConsoleState,
  action: ChangeCurrentRequestAction
): ConsoleState {
  return { ...state, currentRequest: action.payload }
}

function submitRequest(
  state: ConsoleState,
  action: SubmitRequestAction
): ConsoleState {
  return { ...state, requestHistory: [...state.requestHistory, action.payload] }
}

type Actions =
  | SubmitRequestAction
  | ChangeCurrentRequestAction
  | DeleteRequestAction
  | ChangeRequestBodyAction

const initialState: ConsoleState = {
  login: '',
  sublogin: '',
  requestHistory: [],
  currentRequest: {
    id: 1,
    status: RequestStatus.NotSubmitted,
    requestText: '{"action": "pong"}',
    requestResponse: '{}',
  },
}
export default function consoleReducer(state = initialState, action: Actions) {
  switch (action.type) {
    case CHANGE_REQUEST_BODY:
      return changeRequestBody(state, action)
    case CHANGE_CURRENT_REQUEST:
      return changeCurrentRequest(state, action)
    case SUBMIT_REQUEST:
      return submitRequest(state, action)
    case DELETE_REQUEST:
      return deleteRequest(state, action)
    default:
      return state
  }
}
