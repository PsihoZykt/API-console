import React from 'react'
import './LoginPage.css'
import logo from 'assets/img/loginPage/logo.svg'
import LoginForm from 'components/LoginPage/LoginForm/LoginForm'

const LoginPage = ({ authResult, submit, isLoading }: any) => (
  <div className="login-page">
    <img src={logo} alt="circle, rectangle, circle, parallelogram" />
    <LoginForm
      authResult={authResult}
      handleSubmit={submit}
      isLoading={isLoading}
    />
    <div className="github-link">https://github.com/PsihoZykt/API-console</div>
  </div>
)

export default LoginPage
