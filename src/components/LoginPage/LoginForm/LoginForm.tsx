import React, {FormEvent} from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import FormError from 'components/LoginPage/LoginForm/FormError/FormError'
import './LoginForm.css'
import Loader from 'common/Loader/Loader'
import validate from 'validators/loginPage/validate'
import renderField from './RenderField/RenderField'
import {AuthResult} from "store/reducers/loginReducer";

type PropsType = {
    handleSubmit: (form: FormEvent<HTMLFormElement>) => void
    authResult: AuthResult,
    isLoading: boolean,

}
type LoginProps = {
    password: string,
    sublogin: string,
    login: string,
}
type ReduxFormPropsType = InjectedFormProps<LoginProps, PropsType> & PropsType
const LoginForm: React.FC<ReduxFormPropsType> =
    ({
         handleSubmit,
         authResult,
         isLoading,
      valid
     }) => {
  console.log(authResult)
  return(
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
            <div className="login-form__header">API-консолька</div>
            {authResult.isError && <FormError error={authResult.res}/>}
            <Field component={renderField} type="text" name="login" label="Email"/>

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

            <button disabled={!valid} type="submit" className="login-form__submit">
                {isLoading ? <Loader/> : 'Войти'}
            </button>
        </form>
)}
export default reduxForm<LoginProps, PropsType>({
    form: 'login',
    validate,
})(LoginForm)
