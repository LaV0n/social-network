import {renderEntireTree} from "../render";
import {postDataType} from "../components/Profile/MyPosts/MyPosts";
import {messageListType} from "../components/Dialogs/Dialogs";

let state = {
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
}

export let addPost = () => {
    let post: postDataType = {
        id: 4,
        message: state.profilePage.newPost,
        likeCount: 0
    }
    state.profilePage.postsData.unshift(post);
    state.profilePage.newPost = "";
    renderEntireTree(state);
}

export let changeNewPost = (newPost: string) => {
    state.profilePage.newPost = newPost;
    renderEntireTree(state);
}

export let addMessage = () => {
    let message: messageListType = {
        id: 4,
        message: state.messagesPage.messagesData.newMessage
    }
    state.messagesPage.messagesData.messageList.push(message);
    state.messagesPage.messagesData.newMessage = "";
    renderEntireTree(state);
}

export let updateMessage = (newMessage: string) => {
    state.messagesPage.messagesData.newMessage = newMessage;
    renderEntireTree(state);
}

export default state