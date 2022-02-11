import React from 'react'
import './RenderField.css'

type PropsType = {
  input: Array<HTMLInputElement>,
  label: string,
  type: string,
  meta: { touched: string, error: string },
  optional: boolean,
}

const RenderField: React.FC<PropsType> = ({
  input,
  label,
  type,
  meta: { touched, error },
  optional,
}: PropsType) => {
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
        <input {...input} className={errorClass} type={type} />
      </div>
    </div>
  )
}

export default RenderField
