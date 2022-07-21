import {stateType} from "../App";
import ProfileReducer, {addPostActionCreate, changeNewPostActionCreate} from "./ProfileReducer";
import DialogsReducer, {addMessageActionCreate, updateMessageActionCreate} from "./DialogsReducer";


type StoreType = {
    _state: stateType
    _callSubscriber: (state: stateType) => void
    getState: () => stateType
    subscribe: (observer: (state: stateType) => void) => void
    dispatch: (action: any) => void
}



let store: any = {
    _state: {
        messagesPage: {
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
        },
        profilePage: {
            newPost: "",
            postsData: [
                {id: 1, message: 'Hi', likeCount: 5},
                {id: 2, message: 'I am alive', likeCount: 5},
                {id: 3, message: 'Who is here?', likeCount: 5}
            ]
        }
    },
    _callSubscriber(state: stateType) {
        alert("just plug");
    },

    getState() {
        return this._state;
    },
    subscribe(observer: (state: stateType) => void) {
        this._callSubscriber = observer;
    },

    dispatch(action: any) {

        this._state.profilePage= ProfileReducer(this._state.profilePage,action);
        this._state.messagesPage= DialogsReducer( this._state.messagesPage,action);
        this._callSubscriber(this._state);

    }
}


