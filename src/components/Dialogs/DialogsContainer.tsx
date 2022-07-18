import React from "react";
import { addMessageActionCreate, updateMessageActionCreate} from "../../redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {storeType} from "../../redux/redux-store";

type DialogsContainerType ={
   store:storeType
}

const DialogsContainer = (props:DialogsContainerType) => {

    let onChangeMessageHandler =(text:string)=>{
        props.store.dispatch(updateMessageActionCreate(text));
    }

    let addMessageHandler = () =>{
        props.store.dispatch(addMessageActionCreate() );
    }

    return (
        <Dialogs onChangeMessageHandler ={onChangeMessageHandler}
                 addMessageHandler = {addMessageHandler}
                 dialogs={props.store.getState().messagesPage.dialogsData}
                 messagesList ={props.store.getState().messagesPage.messagesData.messageList}
                 newMessage={props.store.getState().messagesPage.messagesData.newMessage}
        />
    )
}
export default DialogsContainer