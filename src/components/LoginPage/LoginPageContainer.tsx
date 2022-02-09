import React, { useEffect } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import LoginPage from './LoginPage'
import { onAuth } from '../../store/thunks/login'

const LoginPageContainer = ({
  login,
  sublogin,
  password,
  isLoading,
  authResult,
  onAuth,
}: any) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('sendsay_session')) {
      navigate('/console')
    }
  }, [navigate])

  const submit = (e: any) => {
    e.preventDefault()
    onAuth(login, sublogin, password).then(() => {
      if (!authResult.isError) navigate('/console')
    })
  }
  return (
    <LoginPage submit={submit} authResult={authResult} isLoading={isLoading} />
  )
}

const selector = formValueSelector('login')
const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (login: any, sublogin: any, password: any) =>
      dispatch(onAuth(login, sublogin, password)),
  }
}
export default connect((state: any) => {
  const login = selector(state, 'login')
  const sublogin = selector(state, 'sublogin')
  const password = selector(state, 'password')
  const isLoading = state.loginPage.isLoading
  const authResult = state.loginPage.authResult

  return {
    login,
    sublogin,
    password,
    isLoading,
    authResult,
  }
}, mapDispatchToProps)(LoginPageContainer)
