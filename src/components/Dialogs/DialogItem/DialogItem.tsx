import React from "react";
import classes from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string
    id: number
    avatar:any
}
const DialogItem = (props: DialogItemType) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={classes.item + ' ' + classes.active}>
            <img src={props.avatar}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem