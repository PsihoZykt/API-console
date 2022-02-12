import { createAction } from 'store/helpers/helper'
import { Request } from 'store/reducers/consoleReducer'
import { InferActionTypes } from 'store/store'

export const consoleActions = {
  changeRequestText: (body: string) =>
    createAction('CHANGE_REQUEST_BODY', body),
  deleteRequest: (request: Request) => createAction('DELETE_REQUEST', request),
  changeRequestResponse: (body: string) =>
    createAction('CHANGE_REQUEST_RESPONSE', body),
  changeCurrentRequest: (request: Request) =>
    createAction('CHANGE_CURRENT_REQUEST', request),

  addRequestToHistory: (request: Request) =>
    createAction('ADD_REQUEST_TO_HISTORY', request),

  setIsRequestError: (isError: boolean) =>
    createAction('SET_IS_REQUEST_ERROR', isError),

  setIsResponseError: (isError: boolean) =>
    createAction('SET_IS_RESPONSE_ERROR', isError),
  clearRequestHistory: () => createAction('CLEAR_REQUEST_HISTORY', null),
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
export type ChangeRequestResponseType = ReturnType<
  typeof consoleActions.changeRequestResponse
>
export type ClearRequestHistoryType = ReturnType<
  typeof consoleActions.clearRequestHistory
>
export type ConsoleActionsType = InferActionTypes<typeof consoleActions>
