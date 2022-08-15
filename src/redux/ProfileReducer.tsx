import {postDataType} from "../components/Profile/MyPosts/MyPostsContainer";
import {ActionsType} from "./redux-store";
import {profilePageType, profileUserType} from "../App";
import {UsersAPI} from "../api/api";

type ChangeNewPostActionType = {
    type: 'CHANGE-NEW-POST'
    newPost: string
}
type AddPostActionType = {
    type: 'ADD-POST'
}
export type SetUserProfileType = {
    type: 'SET_USER_PROFILE'
    profile: profileUserType
}

let initialState = {
    newPost: "",
    postsData: [
        {id: 1, message: 'Hi', likeCount: 5},
        {id: 2, message: 'I am alive', likeCount: 5},
        {id: 3, message: 'Who is here?', likeCount: 5}
    ],
    profile:null/* {
        photos: {small: '', large: ''},
        lookingForAJob: true,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 25455,
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: ''
        }
    }*/
}



const ProfileReducer = (state: profilePageType = initialState, action: ActionsType): profilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            let post: postDataType = {
                id: 4,
                message: state.newPost,
                likeCount: 0
            }
            return {...state, postsData: [post, ...state.postsData], newPost: ""};
        case 'CHANGE-NEW-POST':
            return {...state, newPost: action.newPost};
        case 'SET_USER_PROFILE':
            return {...state, profile: action.profile};
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
export const setUserProfile = (profile: profileUserType): SetUserProfileType => {
    return {
        type: 'SET_USER_PROFILE',
        profile: profile
    } as const
}
export const getUserProfile = (userId: string) => {
    return (dispatch: (a: ActionsType) => void) => {
        if (!userId) {
            userId = "25455"
        }
        UsersAPI.GetProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            });
    }
}


