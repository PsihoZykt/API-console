import { AuthResult, Credentials } from 'store/reducers/loginReducer'
import { RootState } from 'store/store'

export const getIsLoading = (state: RootState): boolean => {
  return state.loginPage.isLoading
}
export const getAuthResult = (state: RootState): AuthResult => {
  return state.loginPage.authResult
}
export const getCredentials = (state: RootState): Credentials => {
  return state.loginPage.credentials
}
