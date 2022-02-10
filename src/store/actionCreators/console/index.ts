import { createAction } from 'store/helpers/helper'
import { Request } from 'store/reducers/consoleReducer'
import {
  CHANGE_CURRENT_REQUEST,
  CHANGE_REQUEST_BODY,
  ChangeCurrentRequestAction,
  ChangeRequestBodyAction,
  DELETE_REQUEST,
  DeleteRequestAction,
  SUBMIT_REQUEST,
  SubmitRequestAction,
} from '../../actions/console'

export function createChangeRequestBodyAction(
  body: string
): ChangeRequestBodyAction {
  return createAction(CHANGE_REQUEST_BODY, body)
}

export function createDeleteRequestAction(
  request: Request
): DeleteRequestAction {
  return createAction(DELETE_REQUEST, request)
}

export function createChangeCurrentRequestAction(
  request: Request
): ChangeCurrentRequestAction {
  return createAction(CHANGE_CURRENT_REQUEST, request)
}

export function createSubmitRequestAction(
  request: Request
): SubmitRequestAction {
  return createAction(SUBMIT_REQUEST, request)
}
