import {ActionsType} from "./redux-store";


type FollowACType ={
    type:'FOLLOW'
    userId:number
}
type UnfollowACType ={
    type:'UNFOLLOW'
    userId:number
}
type SetUsersACType ={
    type:'SET_USERS'
    users:UsersType[]
}

export type UsersPageType = {
    users:UsersType[]
}
export type UsersType = {
    id: number
    name: string
    avatar: string
    status: string
    location: { city: string, country: string }
    followed: boolean
}

let initialState = {
    users:[]
}

const UsersReducer = (state:UsersPageType = initialState, action: ActionsType):UsersPageType  => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state,users:state.users.map(u=>u.id===action.userId?{...u,followed:true}:u)}
        case 'UNFOLLOW':
            return {...state,users:state.users.map(u=>u.id===action.userId?{...u,followed:false}:u)}
        case 'SET_USERS':
            return {...state,users:[...state.users, ...action.users]}
        default:
            return state;
    }
}
export const FollowAC = (userId:number): FollowACType => {
    return {
        type: "FOLLOW",
        userId:userId
    } as const
}
export const UnfollowAC = (userId:number): UnfollowACType => {
    return {
        type: "UNFOLLOW",
        userId:userId
    } as const
}
export const SetUsersAC =(users:UsersType[]): SetUsersACType => {
    return {
        type:'SET_USERS',
        users:users
    } as const
}

export default UsersReducer;