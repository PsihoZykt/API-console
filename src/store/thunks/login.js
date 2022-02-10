import { setAuthResult, setIsLoading } from '../reducers/loginReducer'
import { auth } from '../../api/sendsay'

export const signIn = (login, sublogin, password) => (dispatch) => {
  dispatch(setIsLoading(true))
  auth(login, sublogin, password).then((res) => {
    dispatch(setAuthResult(res))
    dispatch(setIsLoading(false))
  })
}
