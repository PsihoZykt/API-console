import React, { useEffect } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import LoginPage from './LoginPage'
import { signIn } from '../../store/thunks/login'
import {
  getAuthResult,
  getIsLoading,
} from '../../store/selectors/loginPage/selector'
import { authWithSession } from '../../api/sendsay'
import { createSetAuthResultAction } from '../../store/actionCreators/login'

const LoginPageContainer = ({
  login,
  sublogin,
  password,
  isLoading,
  authResult,
  signIn,
  setAuthResult,
}: any) => {
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

  const submit = (e: any) => {
    e.preventDefault()
    signIn(login, sublogin, password).then((res: any) => {
      if (!res.isError) {
        navigate('/console')
      }
    })
  }

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
  { signIn, setAuthResult: createSetAuthResultAction }
)(LoginPageContainer)
