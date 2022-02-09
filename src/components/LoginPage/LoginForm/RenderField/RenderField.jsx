import React from 'react'
import './RenderField.css'
/* eslint react/prop-types: 0 */
const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error },
  optional,
}) => {
  const errorClass =
    touched && error
      ? 'login-form_input login-form_input_error'
      : 'login-form_input'

  return (
    <div>
      <label>
        {label}
        {optional && (
          <span className="login-form__sublogin_optional"> Опционально </span>
        )}
      </label>
      <div>
        <input className={errorClass} {...input} type={type} />
      </div>
    </div>
  )
}

export default RenderField
