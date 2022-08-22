import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import { InputMessageReduxForm} from "./InputMessage/InputMessage";

type DialogsType ={
    addMessageHandler:(value:string)=>void
    dialogs:dialogsDataType[]
    messagesList:messageListType[]
    newMessage:string
    isAuth:boolean
}
export type dialogsDataType = {
    id:number
    name:string
    avatar:any
}
export type messageDatatype ={
    messageList:messageListType[]
}

export type messageListType = {
    id: number
    message: string
}

const Dialogs = (props:DialogsType) => {

    let addMessage=(value:any) => {   /////anytype
        props.addMessageHandler(value.inputMessage)
    }


if (!props.isAuth) return <Redirect to='/login'/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_items}>
                {props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)}
            </div>
            <div className={classes.messages}>
                {props.messagesList.map(message =>   <Message message={message.message}/>)}
                <InputMessageReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    )
}
export default Dialogs