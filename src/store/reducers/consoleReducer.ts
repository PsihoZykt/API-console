export enum RequestStatus {
  Successful,
  Unseccussful,
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

const CHANGE_REQUEST_BODY = 'CHANGE_REQUEST_BODY'
const GET_REQUEST_HISTORY = 'GET_REQUEST_HISTORY'
const SUBMIT_REQUEST = 'SUBMIT_REQUEST'
const CHANGE_CURRENT_REQUEST = 'CHANGE_CURRENT_REQUEST'
const DELETE_REQUEST = 'DELETE_REQUEST'

export interface Action<T extends string, P> {
  readonly type: T;
  readonly payload: P;
}

export function createAction<T extends string, P>(type: T, payload: P): Action<T, P> {
  return {type, payload};
}

type GetRequestHistoryAction = Action<typeof GET_REQUEST_HISTORY, void>
type SubmitRequestAction = Action<typeof SUBMIT_REQUEST, Request>
type ChangeCurrentRequestAction = Action<typeof CHANGE_CURRENT_REQUEST, Request>
type DeleteRequestAction = Action<typeof DELETE_REQUEST, Request>
type ChangeRequestBodyAction = Action<typeof CHANGE_REQUEST_BODY, string>
export function createChangeRequestBodyAction(body: string): ChangeRequestBodyAction {
  return createAction(CHANGE_REQUEST_BODY, body);
}

export function createDeleteRequestAction(request: Request): DeleteRequestAction {
  return createAction(DELETE_REQUEST, request)
}

export function createChangeCurrentRequest(request: Request): ChangeCurrentRequestAction {
  return createAction(CHANGE_CURRENT_REQUEST, request)
}

export function createSubmitRequestAction(request: Request): SubmitRequestAction {
  return createAction(SUBMIT_REQUEST, request)
}
// function createGetRequestHistoryAction(): GetRequestHistoryAction {
//   return createAction(GET_REQUEST_HISTORY, void)
// }


function changeRequestBody(state: ConsoleState, action: ChangeRequestBodyAction): ConsoleState {
  return {...state, currentRequest: {...state.currentRequest, requestText: action.payload}}
}

function deleteRequest(state: ConsoleState, action: DeleteRequestAction): ConsoleState {
  return {
    ...state, requestHistory: state.requestHistory.filter((request) => {
      return request.id !== action.payload.id
    })
  }
}

function changeCurrentRequest(state: ConsoleState, action: ChangeCurrentRequestAction): ConsoleState {
  return {...state, currentRequest: action.payload}
}

function submitRequest(state: ConsoleState, action: SubmitRequestAction): ConsoleState {
  return {...state, requestHistory: [...state.requestHistory, action.payload]}
}

// function getRequestHistory(state: ConsoleState, action: GetRequestHistoryAction): ConsoleState {
//   return {...state}
// } // Am I need it?
type Actions =
    GetRequestHistoryAction
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
    requestText: "{\"action\": \"pong\"}",
    requestResponse: "{}"

  },
}
export default function consoleReducer(
    state = initialState,
    action: Actions
) {
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
