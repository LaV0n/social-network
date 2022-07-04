import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

type DialogsType ={
    dialogs:Array<dialogsDataType>
    message:Array<messsageDatatype>
}
export type dialogsDataType = {
    id:number
    name:string
    avatar:any
}
export type messsageDatatype ={
    id:number
    message:string
}
const Dialogs = (props:DialogsType) => {

    let newPostElement = React.createRef<HTMLTextAreaElement>();
    let addMessage = () =>{
        let text = newPostElement.current?.value;
        alert (text);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_items}>
                {props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)}
            </div>
            <div className={classes.messages}>
                {props.message.map(message =>   <Message message={message.message}/>)}
                <textarea ref={newPostElement}></textarea>
                <button onClick={addMessage}>add message</button>
            </div>
        </div>
    )
}
export default Dialogs