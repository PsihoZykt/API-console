import { auth } from '../../api/sendsay'
import { Dispatch } from 'redux'
import {
  createSetAuthResultAction,
  createSetIsLoadingAction,
} from '../actionCreators/login'

export const signIn =
  (login: string, sublogin: string, password: string) =>
  async (dispatch: Dispatch) => {
    console.log('SignIn')
    dispatch(createSetIsLoadingAction(true))
    const response = await auth(login, sublogin, password)
    dispatch(createSetAuthResultAction(response))
    dispatch(createSetIsLoadingAction(false))
    return response
  }
