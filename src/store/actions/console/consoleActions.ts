import { createAction } from 'store/helpers/helper'
import { Request } from 'store/reducers/consoleReducer'
import { InferActionTypes } from 'store/store'

export const consoleActions = {
  createChangeRequestBodyAction: (body: string) => {
    return createAction('CHANGE_REQUEST_BODY', body)
  },
  createDeleteRequestAction: (request: Request) =>
    createAction('DELETE_REQUEST', request),

  createChangeCurrentRequestAction: (request: Request) =>
    createAction('CHANGE_CURRENT_REQUEST', request),

  createSubmitRequestAction: (request: Request) =>
    createAction('SUBMIT_REQUEST', request),
}
export type ChangeRequestBodyActionType = ReturnType<
  typeof consoleActions.createChangeRequestBodyAction
>
export type DeleteRequestActionType = ReturnType<
  typeof consoleActions.createDeleteRequestAction
>
export type ChangeCurrentRequestActionType = ReturnType<
  typeof consoleActions.createChangeCurrentRequestAction
>
export type SubmitRequestActionType = ReturnType<
  typeof consoleActions.createSubmitRequestAction
>
export type ConsoleActionsType = InferActionTypes<typeof consoleActions>
