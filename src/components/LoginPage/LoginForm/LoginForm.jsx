import { Field, reduxForm } from 'redux-form'
import React from 'react'
import PropTypes from 'prop-types'
import FormError from './FormError/FormError'
import './LoginForm.css'
import renderField from './RenderField/RenderField'
import validate from '../../../validators/loginPage/validate'
import Loader from '../../../common/Loader/Loader'

let LoginForm = ({ handleSubmit, submitting, authResult, isLoading }) => (
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

LoginForm = reduxForm({
  form: 'login',
  validate,
})(LoginForm)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  authResult: PropTypes.shape({
    isError: PropTypes.bool,
    res: PropTypes.shape({
      id: PropTypes.string,
      explain: PropTypes.string,
      request: PropTypes.object,
    }),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
}
LoginForm.defaultProps = {
  submitting: false,
}
export default LoginForm
