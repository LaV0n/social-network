import {postDataType} from "../components/Profile/MyPosts/MyPosts";
import {messageListType} from "../components/Dialogs/Dialogs";
import {stateType} from "../App";


type StoreType = {
    _state: stateType
    _callSubscriber: (state: stateType) => void
    getState: () => stateType
    subscribe: (observer: (state: stateType) => void) => void
    dispatch: (action: any) => void
}

export type ActionsType =
    AddPostActionType |
    ChangeNewPostActionType |
    AddMessageActionType |
    UpdateMessageActionType

type AddPostActionType = {
    type: 'ADD-POST'
}
type ChangeNewPostActionType = {
    type: 'CHANGE-NEW-POST'
    newPost: string
}
type AddMessageActionType = {
    type: 'ADD-MESSAGE'
}
type UpdateMessageActionType = {
    type: 'UPDATE-MESSAGE'
    newMessage: string
}

let store: StoreType = {
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

    /*  addPost()  {
          let post: postDataType = {
              id: 4,
              message: this._state.profilePage.newPost,
              likeCount: 0
          }
          this._state.profilePage.postsData.unshift(post);
          this._state.profilePage.newPost = "";
          this._callSubscriber(this._state);
      },
      changeNewPost(newPost: string)  {
          this._state.profilePage.newPost = newPost;
          this._callSubscriber(this._state);
      },
      addMessage () {
          let message: messageListType = {
              id: 4,
              message: this._state.messagesPage.messagesData.newMessage
          }
          this._state.messagesPage.messagesData.messageList.push(message);
          this._state.messagesPage.messagesData.newMessage = "";
          this._callSubscriber(this._state);
      },
      updateMessage (newMessage: string)  {
          this._state.messagesPage.messagesData.newMessage = newMessage;
          this._callSubscriber(this._state);
      },*/

    dispatch(action: ActionsType) {
        if (action.type === 'ADD-POST') {
            let post: postDataType = {
                id: 4,
                message: this._state.profilePage.newPost,
                likeCount: 0
            }
            this._state.profilePage.postsData.unshift(post);
            this._state.profilePage.newPost = "";
            this._callSubscriber(this._state);
        } else if (action.type === 'CHANGE-NEW-POST') {
            this._state.profilePage.newPost = action.newPost;
            this._callSubscriber(this._state);
        } else if (action.type === 'ADD-MESSAGE') {
            let message: messageListType = {
                id: 4,
                message: this._state.messagesPage.messagesData.newMessage
            }
            this._state.messagesPage.messagesData.messageList.push(message);
            this._state.messagesPage.messagesData.newMessage = "";
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-MESSAGE') {
            this._state.messagesPage.messagesData.newMessage = action.newMessage;
            this._callSubscriber(this._state);
        }
    }
}

export default store;
