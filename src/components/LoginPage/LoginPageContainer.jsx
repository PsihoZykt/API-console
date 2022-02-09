import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { auth } from '../../api/sendsay'
import LoginPage from './LoginPage'

let LoginPageContainer = ({ login, sublogin, password }) => {
  const [authResult, setAuthResult] = useState({
    isError: false,
    res: { id: '', explain: '', request: {} },
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('sendsay_session')) {
      navigate('/console')
    }
  }, [navigate])

  const submit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    console.log(isLoading)

    const res = await auth(login, sublogin, password)
    setAuthResult(res)
    setIsLoading(false)
    if (!res.isError) navigate('/console')
  }
  return (
    <LoginPage submit={submit} authResult={authResult} isLoading={isLoading} />
  )
}

const selector = formValueSelector('login')
LoginPageContainer = connect((state) => {
  const login = selector(state, 'login')
  const sublogin = selector(state, 'sublogin')
  const password = selector(state, 'password')
  return {
    login,
    sublogin,
    password,
  }
})(LoginPageContainer)

LoginPageContainer.propTypes = {
  login: PropTypes.string,
  sublogin: PropTypes.string,
  password: PropTypes.string,
}
LoginPageContainer.defaultProps = {
  login: '',
  sublogin: '',
  password: '',
}
export default LoginPageContainer
