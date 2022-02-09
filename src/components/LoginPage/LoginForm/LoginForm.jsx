import { Field, reduxForm } from 'redux-form'
import React from 'react'
import PropTypes from 'prop-types'
import FormError from './FormError/FormError'
import './LoginForm.css'
import renderField from './RenderField/RenderField'

let LoginForm = ({ handleSubmit, submitting, submitResult }) => (
  <form onSubmit={handleSubmit} className="login-form">
    <div className="login-form__header">API-консолька</div>
    {submitResult.isError && <FormError error={submitResult.res} />}
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
      Войти
    </button>
  </form>
)
const validate = (values) => {
  const errors = {}
  if (!values.login) {
    errors.login = 'Required'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login) &&
    !/^[A-Z0-9._]+$/i.test(values.login)
  ) {
    errors.login = 'Invalid login'
  }

  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.sublogin) &&
    !/^[A-Z0-9._]+$/i.test(values.sublogin)
  ) {
    errors.sublogin = 'Invalid sublogin'
  }
  if (!/^[A-Z0-9 ]+$/i.test(values.password)) {
    errors.password = 'Invalid password'
  }

  return errors
}

LoginForm = reduxForm({
  form: 'login',
  validate,
})(LoginForm)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  submitResult: PropTypes.shape({
    isError: PropTypes.bool,
    res: PropTypes.shape({
      id: PropTypes.string,
      explain: PropTypes.string,
      request: PropTypes.object,
    }),
  }).isRequired,
}
LoginForm.defaultProps = {
  submitting: false,
}
export default LoginForm
