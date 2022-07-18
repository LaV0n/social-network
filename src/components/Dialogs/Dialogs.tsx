import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

type DialogsType ={
    onChangeMessageHandler:(value:string)=>void
    addMessageHandler:()=>void
    dialogs:dialogsDataType[]
    messagesList:messageListType[]
    newMessage:string
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
        props.onChangeMessageHandler(e.currentTarget.value);
    }

    let addMessageHandler = () =>{
        props.addMessageHandler()
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_items}>
                {props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)}
            </div>
            <div className={classes.messages}>
                {props.messagesList.map(message =>   <Message message={message.message}/>)}
                <textarea value={props.newMessage}
                          onChange={onChangeMessageHandler}
                          placeholder="Enter your message"
                ></textarea>
                <button onClick={addMessageHandler}>add message</button>
            </div>
        </div>
    )
}
export default Dialogs