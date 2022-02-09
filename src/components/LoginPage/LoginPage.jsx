import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import logo from '../../assets/img/loginPage/logo.svg'
import { auth } from '../../api/sendsay'
import LoginForm from './LoginForm/LoginForm'
// import { auth } from '../../api/sendsay'

let LoginPage = ({ login, sublogin, password }) => {
  const [submitResult, setSubmitResult] = useState({
    isError: false,
    res: { id: '', explain: '', request: {} },
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('sendsay_session')) {
      navigate('/console')
    }
  }, [navigate])

  const submit = async (e) => {
    e.preventDefault()
    const res = await auth(login, sublogin, password)
    setSubmitResult(res)
  }
  return (
    <div className="login-page">
      <img src={logo} alt="circle, rectangle, circle, parallelogram" />
      <LoginForm submitResult={submitResult} handleSubmit={submit} />
      <div className="github-link">
        https://github.com/PsihoZykt/API-console1
      </div>
    </div>
  )
}

const selector = formValueSelector('login')
LoginPage = connect((state) => {
  const login = selector(state, 'login')
  const sublogin = selector(state, 'sublogin')
  const password = selector(state, 'password')
  return {
    login,
    sublogin,
    password,
  }
})(LoginPage)

LoginPage.propTypes = {
  login: PropTypes.string,
  sublogin: PropTypes.string,
  password: PropTypes.string,
}
LoginPage.defaultProps = {
  login: '',
  sublogin: '',
  password: '',
}
export default LoginPage
