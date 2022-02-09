import React from 'react'
import './LoginPage.css'
import PropTypes from 'prop-types'
import logo from '../../assets/img/loginPage/logo.svg'
import LoginForm from './LoginForm/LoginForm'

const LoginPage = ({ authResult, submit, isLoading }) => (
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

LoginPage.propTypes = {
  authResult: PropTypes.shape({
    isError: PropTypes.bool,
    res: PropTypes.shape({
      id: PropTypes.string,
      explain: PropTypes.string,
      request: PropTypes.object,
    }),
  }).isRequired,
  submit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default LoginPage
