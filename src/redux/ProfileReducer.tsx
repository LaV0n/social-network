import {postDataType} from "../components/Profile/MyPosts/MyPostsContainer";
import {ActionsType} from "./redux-store";
import {profilePageType, profileUserType} from "../App";
import {ProfileAPI, UsersAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE-POST'

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


export const ProfileReducer = (state: profilePageType = initialState, action: ActionsType): profilePageType => {
    switch (action.type) {
        case ADD_POST:
            let post: postDataType = {
                id: 4,
                message: action.value,
                likeCount: 0
            }
            return {...state, postsData: [post, ...state.postsData]};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_POST:
            return {...state, postsData: {...state}.postsData.filter(p => p.id !== action.postId)}
        default:
            return state;
    }
}


export const addPostActionCreate = (value: string) => (
    {
        type: ADD_POST,
        value
    } as const
)
export const deletePostAC = (postId: number) => (
    {
        type: DELETE_POST,
        postId
    } as const
)
export const setUserProfile = (profile: profileUserType) => (
    {
        type: SET_USER_PROFILE,
        profile
    } as const
)
export const setStatus = (status: string) => (
    {
        type: SET_STATUS,
        status
    } as const
)

export const getUserProfile = (userId: number) =>
    async (dispatch: (a: ActionsType) => void) => {
        const response = await UsersAPI.GetProfile(userId)
        dispatch(setUserProfile(response.data))
    }

export const getStatus = (userId: number) =>
    async (dispatch: (a: ActionsType) => void) => {
        const response = await ProfileAPI.GetStatus(userId)
        dispatch(setStatus(response.data))
    }

export const updateStatus = (status: string) =>
    async (dispatch: (a: ActionsType) => void) => {
        const response = await ProfileAPI.UpdateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }

