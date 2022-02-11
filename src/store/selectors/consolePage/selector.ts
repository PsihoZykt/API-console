import { Request } from 'store/reducers/consoleReducer'
import { RootState } from 'store/store'

export const getCurrentRequest = (state: RootState): Request => {
  return state.consolePage.currentRequest
}
export const getRequestHistory = (state: RootState): Array<Request> => {
  return state.consolePage.requestHistory
}
export const getIsRequestError = (state: RootState): boolean => {
  return state.consolePage.isRequestError
}
export const getIsResponseError = (state: RootState): boolean => {
  return state.consolePage.isResponseError
}
