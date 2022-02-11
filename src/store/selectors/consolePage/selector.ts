import { AppStateType } from 'store/store'
import { Request } from 'store/reducers/consoleReducer'

export const getCurrentRequest = (state: AppStateType): Request => {
  return state.consolePage.currentRequest
}
export const getRequestHistory = (state: AppStateType): Array<Request> => {
  return state.consolePage.requestHistory
}
