import React from 'react';
import Logo from "common/Logo/Logo";
import exit from "assets/img/consolePage/log-out.svg";
import maximize from "assets/img/consolePage/maximize.svg";
import minimize from 'assets/img/consolePage/minimize.svg'
import {AuthResult, Credentials} from "store/reducers/loginReducer";
import './Header.css'

type PropTypes = {
    auth: AuthResult
    onLogout: () => void
  fullScreen: any
  credentials: Credentials

}
const Header = ({auth, onLogout, fullScreen, credentials}: PropTypes) => {
  const handleFullScreen = () => {
    fullScreen.active ? fullScreen.exit() : fullScreen.enter()
  }
  return (
    <div className="header">
      <div className="header__left">
        <Logo/>
        <div> API-консолька</div>
      </div>
      <div className="header__right">
        <div className="header__login">{credentials.login} {credentials.sublogin && `:${credentials.sublogin}`}</div>
        <div onClick={onLogout} className="header__exit">
          <div>Выйти</div>
          <img src={exit} alt="exit symbol"/>
        </div>
                <img
                    onClick={handleFullScreen}
                    className="header__exit_maximize"
                    src={fullScreen.active ? minimize: maximize}
                    alt="maximize icon"
                />
            </div>
        </div>

    );
};

export default Header;