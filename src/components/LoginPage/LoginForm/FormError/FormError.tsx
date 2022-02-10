import React from 'react'
import './FormError.css'
import formErrorImg from 'assets/img/loginPage/meh.svg'

interface IProps {
  error: {
    id: string,
    explain: object,
  };
}

const FormError = ({ error: { id, explain } }: IProps) => (
  <div className="form-error">
    <img className="form-error__img" src={formErrorImg} alt="meh face" />
    <div>
      <div className="form-error__header">Вход не вышел</div>
      <div className="form-error__text">{JSON.stringify({ id, explain })}</div>
    </div>
  </div>
)

export default FormError
