import React from 'react'
import './LoginPage.css'
import LoginForm from 'components/LoginPage/LoginForm/LoginForm'
import GithubLink from 'common/GithubLink/GithubLink'
import Logo from 'common/Logo/Logo'
import {AuthResult} from "store/reducers/loginReducer";

type PropsType = {
    authResult: AuthResult
    submit: (form: HTMLFormElement) => void
    isLoading: boolean
}
const LoginPage = ({authResult, submit, isLoading}: PropsType) => (
    <div className="login-page">
        <Logo/>
        <LoginForm
            authResult={authResult}
            handleSubmit={submit}
            isLoading={isLoading}
        />
        <GithubLink/>
    </div>
)

export default LoginPage
