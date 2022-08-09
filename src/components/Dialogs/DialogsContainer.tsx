import React from "react";
import {addMessageActionCreate, updateMessageActionCreate} from "../../redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {stateType} from "../../App";
import {Dispatch} from "redux";

let mapStateToProps = (state:stateType) => {
    return{
        dialogs: state.messagesPage.dialogsData,
        messagesList: state.messagesPage.messagesData.messageList,
        newMessage:state.messagesPage.messagesData.newMessage,
        isAuth:state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch:Dispatch) => {
    return{
        onChangeMessageHandler: (text:string)=>dispatch(updateMessageActionCreate(text)),
        addMessageHandler: ()=>{dispatch(addMessageActionCreate())}
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer