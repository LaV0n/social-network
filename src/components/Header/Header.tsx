import React from "react";
import SearchLogo from '../../assets/img/Search_Icon.svg.png'
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

type HeaderType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

const Header = (props: HeaderType) => {
    return (
        <header className={classes.header}>
            <img src={SearchLogo} alt="0"/>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div> {props.login} - <Button onClick={props.logout}
                                                    variant="outlined"
                                                     color="inherit"
                    >log out</Button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}
export default Header;