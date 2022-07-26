import React from "react";
import SearchLogo from '../../assets/img/Search_Icon.svg.png'
import classes from './Header.module.css';
const  Header = () => {
    return (
        <header className={classes.header}>
            <img src={SearchLogo} alt="0"/>
        </header>
    )
}
export default Header;