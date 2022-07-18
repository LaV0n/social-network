import {ActionsType} from "./store";
import { messageListType} from "../components/Dialogs/Dialogs";
import {messagesPageType} from "../App";

type AddMessageActionType = {
    type: 'ADD-MESSAGE'
}
type UpdateMessageActionType = {
    type: 'UPDATE-MESSAGE'
    newMessage: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: 'Triss', avatar: require("../components/img/triss.jpg")},
        {id: 2, name: 'Gaunter', avatar: require("../components/img/gaunter.jpeg")},
        {id: 3, name: 'Letho', avatar: require("../components/img/letho.jpg")},
        {id: 4, name: 'Yennefer', avatar: require("../components/img/yennefer.jpg")},
        {id: 5, name: 'Thaler', avatar: require("../components/img/thaler.jpg")},
        {id: 6, name: 'Jaskier', avatar: require("../components/img/jaskier.jpg")}
    ],

    messagesData: {
        newMessage: "",
        messageList: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'sleeppy'},
            {id: 3, message: 'How r u?'},
        ]
    }
}

const DialogsReducer = (state:messagesPageType=initialState,action:ActionsType)=>{
    switch (action.type){
        case 'ADD-MESSAGE':
            let message: messageListType = {
                id: 4,
                message: state.messagesData.newMessage
            }
           state.messagesData.messageList.push(message);
            state.messagesData.newMessage = "";
            return state;
        case 'UPDATE-MESSAGE':
         state.messagesData.newMessage = action.newMessage;
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