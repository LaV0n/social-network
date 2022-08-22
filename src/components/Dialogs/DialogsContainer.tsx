import React from "react";
import {addMessageActionCreate} from "../../redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {stateType} from "../../App";
import {compose, Dispatch} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

let mapStateToProps = (state:stateType) => {
    return{
        dialogs: state.messagesPage.dialogsData,
        messagesList: state.messagesPage.messagesData.messageList,
        isAuth:state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch:Dispatch) => {
    return{
        addMessageHandler: (value:string)=>{dispatch(addMessageActionCreate(value))}
    }
}

export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)