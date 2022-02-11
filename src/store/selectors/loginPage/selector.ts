import { AppStateType } from 'store/store'
import { AuthResult } from 'store/reducers/loginReducer'

export const getIsLoading = (state: AppStateType): boolean => {
  return state.loginPage.isLoading
}
export const getAuthResult = (state: AppStateType): AuthResult => {
  return state.loginPage.authResult
}
