import React from 'react'
import './LoginPage.css'
import logo from '../../assets/img/loginPage/logo.svg'

function LoginPage() {
  return (
    <div className="login-page">
      <img src={logo} alt="circle, rectangle, circle, parallelogram" />
      <form className="login-form">
        <div className="login-form__header">API-консолька</div>
        <label htmlFor="login">
          Логин
          <input type="text" id="login" />
        </label>

        <label className="login-form__sublogin" htmlFor="sublogin">
          Сублогин
          <span className="login-form__sublogin_optional"> Опционально </span>
          <input type="text" id="sublogin" />
        </label>

        <label htmlFor="password">
          Пароль
          <input type="text" id="password" />
        </label>
        <button type="submit" className="login-form__submit">
          Войти
        </button>
      </form>
      <div className="github-link">
        https://github.com/PsihoZykt/API-console{' '}
      </div>
    </div>
  )
}

export default LoginPage
