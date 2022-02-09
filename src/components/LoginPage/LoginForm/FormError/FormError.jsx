import PropTypes from 'prop-types'
import React from 'react'
import formError from '../../../../assets/img/loginPage/meh.svg'
import './FormError.css'

const FormError = ({ error: { id, explain } }) => (
  <div className="form-error">
    <div className="form-error__img">
      <img src={formError} alt="Sad face" />
    </div>
    <div>
      <div className="form-error__header">Вход не вышел</div>
      <div className="form-error__text">{JSON.stringify({ id, explain })}</div>
    </div>
  </div>
)
FormError.propTypes = {
  error: PropTypes.shape({ id: PropTypes.string, explain: PropTypes.string })
    .isRequired,
}
export default FormError
