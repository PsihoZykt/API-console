import { createAction } from 'store/helpers/helper'
import { Request } from 'store/reducers/consoleReducer'
import { InferActionTypes } from 'store/store'

export const consoleActions = {
  changeRequestText: (body: string) =>
    createAction('CHANGE_REQUEST_BODY', body),
  deleteRequest: (request: Request) => createAction('DELETE_REQUEST', request),

  changeCurrentRequest: (request: Request) =>
    createAction('CHANGE_CURRENT_REQUEST', request),

  addRequestToHistory: (request: Request) =>
    createAction('ADD_REQUEST_TO_HISTORY', request),

  setIsRequestError: (isError: boolean) =>
    createAction('SET_IS_REQUEST_ERROR', isError),

  setIsResponseError: (isError: boolean) =>
    createAction('SET_IS_RESPONSE_ERROR', isError),
}
export type ChangeRequestBodyActionType = ReturnType<
  typeof consoleActions.changeRequestText
>
export type DeleteRequestActionType = ReturnType<
  typeof consoleActions.deleteRequest
>
export type ChangeCurrentRequestActionType = ReturnType<
  typeof consoleActions.changeCurrentRequest
>
export type AddRequestToHistoryType = ReturnType<
  typeof consoleActions.addRequestToHistory
>
export type IsRequestErrorType = ReturnType<
  typeof consoleActions.setIsRequestError
>
export type IsResponseErrorType = ReturnType<
  typeof consoleActions.setIsResponseError
>
export type ConsoleActionsType = InferActionTypes<typeof consoleActions>
