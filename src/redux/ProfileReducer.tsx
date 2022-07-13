import {postDataType, profileStateType} from "../components/Profile/MyPosts/MyPosts";
import {ActionsType} from "./state";
type ChangeNewPostActionType = {
    type: 'CHANGE-NEW-POST'
    newPost: string
}
type AddPostActionType = {
    type: 'ADD-POST'
}


const ProfileReducer =(state:profileStateType,action:ActionsType)=>{
    switch (action.type) {
        case 'ADD-POST':
            let post: postDataType = {
                id: 4,
                message:state.newPost,
                likeCount: 0
            }
            state.postsData.unshift(post);
            state.newPost = "";
            return state;
        case 'CHANGE-NEW-POST':
            state.newPost = action.newPost;
            return state;
        default:
            return state;
    }
}
export default ProfileReducer;

export const changeNewPostActionCreate = (newPost: string): ChangeNewPostActionType => {
    return {
        type: "CHANGE-NEW-POST",
        newPost: newPost
    } as const
}
export const addPostActionCreate = (): AddPostActionType => {
    return {
        type: "ADD-POST"
    } as const
}

