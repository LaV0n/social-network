import React from "react";
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import loginImg from './../../assets/icons/login.png';
import logoutImg from './../../assets/icons/logout.png'

type HeaderType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

const Header = (props: HeaderType) => {
    return (
        <header className={classes.header}>

            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div className={classes.accessBlock}> {props.login}
                        <img src={logoutImg} onClick={props.logout} alt={'0'}/>
                    </div>
                    : <NavLink to={'/login'}><img src={loginImg} alt={'0'}/></NavLink>
                }
            </div>
        </header>
    )
}
export default Header;