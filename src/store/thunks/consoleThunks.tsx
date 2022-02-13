import { makeRequest } from 'api/sendsay'
import { RequestStatus } from 'store/reducers/consoleReducer'
import { ThunkAction } from 'redux-thunk'
import { RootState } from 'store/store'
import { v4 as randomID } from 'uuid'
import {
  consoleActions,
  ConsoleActionsType,
} from 'store/actions/console/consoleActions'

export const runRequest =
  (body: string): ThunkAction<void, RootState, unknown, ConsoleActionsType> =>
  async (dispatch) => {
    let request
    console.log('das')

    try {
      request = JSON.parse(body)
      console.log(request)
      dispatch(consoleActions.setIsRequestError(false))
    } catch (e) {
      console.log('Parse error')
      dispatch(consoleActions.setIsRequestError(true))
    }
    if (request) {
      const response = await makeRequest(body)
      // Sendsay returns _ehid only with successful request, so we can use it
      const isSuccessful = !!(response._ehid ?? false)
      const status = isSuccessful
        ? RequestStatus.Successful
        : RequestStatus.Unsuccessful

      const id = randomID()
      const requestText = body
      const requestResponse = JSON.stringify(response, null, 4)

      const newRequest = { status, id, requestText, requestResponse }
      dispatch(consoleActions.setIsResponseError(!isSuccessful))
      dispatch(consoleActions.changeCurrentRequest(newRequest))
      dispatch(consoleActions.addRequestToHistory(newRequest))
    }
  }
