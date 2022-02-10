import React, { useEffect } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import LoginPage from './LoginPage'
import { signIn } from '../../store/thunks/login'

const LoginPageContainer = ({
  login,
  sublogin,
  password,
  isLoading,
  authResult,
  signIn,
}: any) => {
  const navigate = useNavigate()
  console.log(authResult)
  useEffect(() => {
    if (localStorage.getItem('sendsay_session')) {
      navigate('/console')
    }
  }, [navigate])

  const submit = (e: any) => {
    e.preventDefault()
    signIn(login, sublogin, password)
  }
  useEffect(() => {
    if (authResult.res.session) navigate('/console')
  }, [authResult])

  return (
    <LoginPage submit={submit} authResult={authResult} isLoading={isLoading} />
  )
}

const selector = formValueSelector('login')
export default connect(
  (state: any) => {
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
  },
  { signIn }
)(LoginPageContainer)
