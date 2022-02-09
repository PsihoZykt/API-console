import React from 'react'
import './FormError.css'
import { ReactSVG } from 'react-svg'

interface IProps {
  error: {
    id: string,
    explain: object,
  };
}

const FormError = ({ error: { id, explain } }: IProps) => (
  <div className="form-error">
    <div className="form-error__img">
      <ReactSVG src="assets/img/loginPage/meh.svg" />
    </div>
    <div>
      <div className="form-error__header">Вход не вышел</div>
      <div className="form-error__text">{JSON.stringify({ id, explain })}</div>
    </div>
  </div>
)

export default FormError
