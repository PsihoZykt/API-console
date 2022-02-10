import { setAuthResult, setIsLoading } from '../reducers/loginReducer'
import { auth } from '../../api/sendsay'

export const signIn = (login, sublogin, password) => async (dispatch) => {
  dispatch(setIsLoading(true))
  let response = await auth(login, sublogin, password)
  dispatch(setAuthResult(response))
  dispatch(setIsLoading(false))
}
