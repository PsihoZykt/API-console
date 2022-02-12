import React from 'react';
import Logo from "common/Logo/Logo";
import exit from "assets/img/consolePage/log-out.svg";
import maximize from "assets/img/consolePage/maximize.svg";
import {AuthResult} from "store/reducers/loginReducer";
import './Header.css'

type PropTypes = {
    auth: AuthResult
    onLogout: () => void
    onFullScreen: () => void

}
const Header = ({auth, onLogout, onFullScreen}: PropTypes) => {
    return (
        <div className="header">
            <div className="header__left">
                <Logo/>
                <div> API-консолька</div>
            </div>
            <div className="header__right">
                <div className="header__login">{auth.res.account}</div>
                <div onClick={onLogout} className="header__exit">
                    <div>Выйти</div>
                    <img src={exit} alt="exit symbol"/>
                </div>
                <img
                    onClick={() => onFullScreen()}
                    className="header__exit_maximize"
                    src={maximize}
                    alt="maximize icon"
                />
            </div>
        </div>

    );
};

export default Header;