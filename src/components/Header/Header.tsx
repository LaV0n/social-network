import React from "react";
import SearchLogo from '../../assets/img/Search_Icon.svg.png'
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderType = {
    login:string|null
    isAuth:boolean
}

const  Header = (props:HeaderType) => {
    return (
        <header className={classes.header}>
            <img src={SearchLogo} alt="0"/>
            <div className={classes.loginBlock}>
                {props.isAuth? props.login : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}
export default Header;