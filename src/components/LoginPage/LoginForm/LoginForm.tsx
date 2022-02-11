import React from 'react'
import { Field, reduxForm } from 'redux-form'
import FormError from 'components/LoginPage/LoginForm/FormError/FormError'
import './LoginForm.css'
import Loader from 'common/Loader/Loader'
import validate from 'validators/loginPage/validate'
import renderField from './RenderField/RenderField'
import {AuthResult} from "store/reducers/loginReducer";

type PropsType = {
    handleSubmit: () => void
    submitting: boolean,
    authResult: AuthResult,
    isLoading: boolean
}
const LoginForm = ({
  handleSubmit,
  submitting,
  authResult,
  isLoading,
}: PropsType) => (
  <form onSubmit={handleSubmit} className="login-form">
    <div className="login-form__header">API-консолька</div>
    {authResult.isError && <FormError error={authResult.res} />}
    <Field component={renderField} type="text" name="login" label="Email" />

    <Field
      component={renderField}
      label="Sublogin"
      type="text"
      name="sublogin"
      optional
    />

    <Field
      component={renderField}
      label="Password"
      type="password"
      name="password"
    />

    <button disabled={submitting} type="submit" className="login-form__submit">
      {isLoading ? <Loader /> : 'Войти'}
    </button>
  </form>
)

export default reduxForm<unknown, any>({
  form: 'login',
  validate,
})(LoginForm)
