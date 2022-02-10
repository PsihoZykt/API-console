import React from 'react'
import './LoginPage.css'
import logo from 'assets/img/common/logo.svg'
import LoginForm from 'components/LoginPage/LoginForm/LoginForm'
import GithubLink from '../../common/GithubLink/GithubLink'
import Logo from '../../common/Logo/Logo'

const LoginPage = ({ authResult, submit, isLoading }: any) => (
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

export default LoginPage
