import React from 'react'
import Logo from 'common/Logo/Logo'
import exit from 'assets/img/consolePage/log-out.svg'
import maximize from 'assets/img/consolePage/maximize.svg'
import minimize from 'assets/img/consolePage/minimize.svg'
import './Header.css'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'store/store'
import { getCredentials } from 'store/selectors/loginPage/selector'
import { useNavigate } from 'react-router-dom'
import { logout } from 'api/sendsay'
import { FullScreenHandle } from 'react-full-screen'

type OwnProps = {
  fullScreen: FullScreenHandle,
}
type ReduxProps = ConnectedProps<typeof connector>
type PropsType = ReduxProps & OwnProps
const Header = ({ fullScreen, credentials }: PropsType) => {
  const handleFullScreen = () => {
    fullScreen.active ? fullScreen.exit() : fullScreen.enter()
  }
  const navigate = useNavigate()

  const onLogout = () => {
    logout().then(() => {
      navigate('/')
    })
  }

  return (
    <div className="header">
      <div className="header__left">
        <Logo />
        <div> API-консолька</div>
      </div>
      <div className="header__right">
        <div className="header__login">
          {credentials.login}
          {credentials.sublogin && `:${credentials.sublogin}`}
        </div>
        <div onClick={() => onLogout()} className="header__exit">
          <div>Выйти</div>
          <img src={exit} alt="exit symbol" />
        </div>
        <img
          tabIndex={1}
          onClick={handleFullScreen}
          className="header__exit header__exit_maximize"
          src={fullScreen.active ? minimize : maximize}
          alt="maximize icon"
        />
      </div>
    </div>
  )
}
const connector = connect((state: RootState) => {
  return {
    credentials: getCredentials(state),
  }
})
export default connector(Header)
