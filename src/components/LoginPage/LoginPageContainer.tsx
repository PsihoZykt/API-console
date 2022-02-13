import React, { FormEvent, useEffect } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { formValueSelector } from 'redux-form'
import LoginPage from './LoginPage'
import { signIn } from 'store/thunks/loginThunks'
import { getAuthResult, getIsLoading } from 'store/selectors/loginPage/selector'
import { authWithSession } from 'api/sendsay'
import { RootState } from 'store/store'
import { loginActions } from 'store/actions/login/loginActions'

const LoginPageContainer = ({
  login,
  sublogin,
  password,
  isLoading,
  authResult,
  signIn,
  setCredentials,
  setAuthResult,
}: PropsFromRedux) => {
  const navigate = useNavigate()
  console.log(authResult)
  useEffect(() => {
    if (localStorage.getItem('sendsay_session')) {
      authWithSession().then((res) => {
        setAuthResult(res)
        navigate('/console')
      })
    }
  }, [])

  const submit = (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault()
    signIn(login, sublogin, password).then((res: any) => {
      if (!res.isError) {
        setCredentials({ login, sublogin })
        navigate('/console')
      }
    })
  }

  return (
    <LoginPage submit={submit} authResult={authResult} isLoading={isLoading} />
  )
}

const selector = formValueSelector('login')
// Record<string, never> means "empty" object. LoginPageContainer doesn't have own props (passed form App), so we need mock object for connect
const connector = connect(
  (state: RootState) => {
    const login = selector(state, 'login')
    const sublogin = selector(state, 'sublogin')
    const password = selector(state, 'password')
    const isLoading = getIsLoading(state)
    const authResult = getAuthResult(state)

    return {
      login,
      sublogin,
      password,
      isLoading,
      authResult,
    }
  },
  {
    signIn,
    setAuthResult: loginActions.setAuthResultAction,
    setCredentials: loginActions.setCredentials,
  }
)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(LoginPageContainer)
