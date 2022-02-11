import { RootState } from 'store/store'
import { Request } from 'store/reducers/consoleReducer'

export const getCurrentRequest = (state: RootState): Request => {
  return state.consolePage.currentRequest
}
export const getRequestHistory = (state: RootState): Array<Request> => {
  return state.consolePage.requestHistory
}
