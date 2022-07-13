import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionsType} from "../../redux/state";

type DialogsType ={
    dialogs:Array<dialogsDataType>
    message:messageDatatype
    dispatch:(action:ActionsType)=>void
}
export type dialogsDataType = {
    id:number
    name:string
    avatar:any
}
export type messageDatatype ={
    messageList:messageListType[]
    newMessage:string
}

export type messageListType = {
    id: number
    message: string
}

const Dialogs = (props:DialogsType) => {

    let onChangeMessageHandler =(e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch({type: 'UPDATE-MESSAGE', newMessage: e.currentTarget.value});
    }

    let addMessageHandler = () =>{
        props.dispatch({type: 'ADD-MESSAGE'} );
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_items}>
                {props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)}
            </div>
            <div className={classes.messages}>
                {props.message.messageList.map(message =>   <Message message={message.message}/>)}
                <textarea value={props.message.newMessage}
                          onChange={onChangeMessageHandler}></textarea>
                <button onClick={addMessageHandler}>add message</button>
            </div>
        </div>
    )
}
export default Dialogs