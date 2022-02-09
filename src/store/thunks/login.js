import { setAuthResult, setIsLoading } from '../reducers/loginReducer'
import { auth } from '../../api/sendsay'

export const onAuth = (login, sublogin, password) => {
  return (dispatch) => {
    dispatch(setIsLoading(true))
    return auth(login, sublogin, password).then((res) => {
      dispatch(setAuthResult(res))
      dispatch(setIsLoading(false))
    })
  }
}
