import React, { FormEvent } from 'react'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { getAuthResult, getIsLoading } from 'store/selectors/loginPage/selector'
import Logo from 'common/Logo/Logo'
import LoginForm from 'components/LoginPage/LoginForm/LoginForm'
import GithubLink from 'common/GithubLink/GithubLink'
import { signIn } from 'store/thunks/loginThunks'
import { loginActions } from 'store/actions/login/loginActions'

export const LoginPage = () => {
  const navigate = useNavigate()

  const selector = formValueSelector('login') // <-- same as form name
  const login = useSelector((state) => selector(state, 'login'))
  const password = useSelector((state) => selector(state, 'password'))
  const sublogin = useSelector((state) => selector(state, 'sublogin'))
  console.log(login, password, sublogin)
  const isLoading = useSelector(getIsLoading)
  const authResult = useSelector(getAuthResult)
  const dispatch = useDispatch()
  const submit = (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault()
    dispatch(loginActions.login({ login, sublogin, password }))
    if (!authResult.isError) {
      navigate('/console')
    }
  }

  return (
    <div className="login-page">
      <Logo />
      <LoginForm
        authResult={authResult}
        handleSubmit={submit}
        isLoading={isLoading}
      />
      <GithubLink />
    </div>
  )
}
