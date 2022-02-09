import React from 'react'
import './RenderField.css'

interface IProps {
  input: any;
  label: string;
  type: string;
  meta: { touched: string, error: string };
  optional: boolean;
}

const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error },
  optional,
}: IProps) => {
  console.log(input)
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
