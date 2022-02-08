import React from 'react'

function LoginPage() {
  return (
    <form className="login-form">
      <label htmlFor="login">
        Логин
        <input type="text" id="login" />
      </label>

      <label htmlFor="sublogin">
        Сублогин
        <input type="text" id="sublogin" />
      </label>

      <label htmlFor="password">
        Пароль
        <input type="text" id="password" />
      </label>

      <input type="submit" />
    </form>
  )
}

export default LoginPage
