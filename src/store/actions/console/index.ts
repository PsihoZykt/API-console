import { Action } from '../../helpers/helper'
import { Request } from '../../reducers/consoleReducer'

export const CHANGE_REQUEST_BODY = 'CHANGE_REQUEST_BODY'
export const GET_REQUEST_HISTORY = 'GET_REQUEST_HISTORY'
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST'
export const CHANGE_CURRENT_REQUEST = 'CHANGE_CURRENT_REQUEST'
export const DELETE_REQUEST = 'DELETE_REQUEST'

export type GetRequestHistoryAction = Action<typeof GET_REQUEST_HISTORY, void>
export type SubmitRequestAction = Action<typeof SUBMIT_REQUEST, Request>
export type ChangeCurrentRequestAction = Action<
  typeof CHANGE_CURRENT_REQUEST,
  Request
>
export type DeleteRequestAction = Action<typeof DELETE_REQUEST, Request>
export type ChangeRequestBodyAction = Action<typeof CHANGE_REQUEST_BODY, string>
