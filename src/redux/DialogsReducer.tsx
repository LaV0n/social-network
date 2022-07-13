import {ActionsType} from "./state";
import { messageDatatype, messageListType} from "../components/Dialogs/Dialogs";

type AddMessageActionType = {
    type: 'ADD-MESSAGE'
}
type UpdateMessageActionType = {
    type: 'UPDATE-MESSAGE'
    newMessage: string
}

const DialogsReducer = (state:messageDatatype,action:ActionsType)=>{
    switch (action.type){
        case 'ADD-MESSAGE':
            let message: messageListType = {
                id: 4,
                message: state.newMessage
            }
           state.messageList.push(message);
            state.newMessage = "";
            return state;
        case 'UPDATE-MESSAGE':
         state.newMessage = action.newMessage;
         return state;
        default:
            return state;
    }
}
export const addMessageActionCreate = (): AddMessageActionType => {
    return {
        type: "ADD-MESSAGE"
    } as const
}
export const updateMessageActionCreate = (text: string): UpdateMessageActionType => {
    return {
        type: "UPDATE-MESSAGE",
        newMessage: text
    } as const
}

export default DialogsReducer;