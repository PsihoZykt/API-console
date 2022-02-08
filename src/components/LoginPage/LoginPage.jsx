import React from 'react'
import './LoginPage.css'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import logo from '../../assets/img/loginPage/logo.svg'
import auth from '../../api/sendsay'

const LoginPage = () => {
  const formValues = useSelector((state) => state.form?.login?.values)
  const submit = async (e) => {
    e.preventDefault()
    const { login } = formValues
    const { sublogin } = formValues
    const { password } = formValues
    const res = await auth(login, sublogin, password)
    await localStorage.setItem('sendsay_id', res.list['about.id'])
  }
  return (
    <div className="login-page">
      <img src={logo} alt="circle, rectangle, circle, parallelogram" />
      <LoginForm handleSubmit={submit} />
      <div className="github-link">
        https://github.com/PsihoZykt/API-console1
      </div>
    </div>
  )
}

let LoginForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="login-form">
    <div className="login-form__header">API-консолька</div>
    <label htmlFor="login">
      Логин
      <Field component="input" type="text" name="login" />
    </label>

    <label className="login-form__sublogin" htmlFor="sublogin">
      Сублогин
      <span className="login-form__sublogin_optional"> Опционально </span>
      <Field component="input" type="text" name="sublogin" />
    </label>

    <label htmlFor="password">
      Пароль
      <Field component="input" type="password" name="password" />
    </label>

    <button type="submit" className="login-form__submit">
      Войти
    </button>
  </form>
)

LoginForm = reduxForm({
  form: 'login',
})(LoginForm)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
export default LoginPage
