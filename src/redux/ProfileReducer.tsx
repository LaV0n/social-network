import {postDataType} from "../components/Profile/MyPosts/MyPostsContainer";
import {ActionsType} from "./redux-store";
import {profilePageType, profileUserType} from "../App";
import {ProfileAPI, UsersAPI} from "../api/api";

type AddPostActionType = {
    type: 'ADD-POST'
    value:string
}
export type SetUserProfileType = {
    type: 'SET_USER_PROFILE'
    profile: profileUserType
}
export type SetStatusACType ={
    type:'SET_STATUS'
    status:string
}

let initialState = {
    postsData: [
        {id: 1, message: 'Hi', likeCount: 5},
        {id: 2, message: 'I am alive', likeCount: 5},
        {id: 3, message: 'Who is here?', likeCount: 5}
    ],
    profile: null,/* {
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
    status: ""
}


const ProfileReducer = (state: profilePageType = initialState, action: ActionsType): profilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            let post: postDataType = {
                id: 4,
                message: action.value,
                likeCount: 0
            }
            return {...state, postsData: [post, ...state.postsData]};
        case 'SET_USER_PROFILE':
            return {...state, profile: action.profile};
        case 'SET_STATUS':
            return {...state,status:action.status}
        default:
            return state;
    }
}
export default ProfileReducer;

export const addPostActionCreate = (value:string): AddPostActionType => {
    return {
        type: "ADD-POST",
        value
    } as const
}
export const setUserProfile = (profile: profileUserType): SetUserProfileType => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}
export const getUserProfile = (userId: number) => {
    return (dispatch: (a: ActionsType) => void) => {

        UsersAPI.GetProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            });
    }
}
export const setStatus = (status:string):SetStatusACType => {
    return {
        type:'SET_STATUS', status
    }
}
export const getStatus = (userId: number) => (dispatch:(a:ActionsType)=>void) => {
        ProfileAPI.GetStatus(userId)
            .then(response => {
                    dispatch(setStatus(response.data))
            });
}
export const updateStatus = (status: string) => (dispatch:(a:ActionsType)=>void) => {
    ProfileAPI.UpdateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        });
}

