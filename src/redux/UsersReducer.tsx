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
type SetCurrentPageACType ={
    type:'SET_CURRENT_PAGE'
    currentPage:number
}
type SetTotalUserCountACType ={
    type:'SET_TOTAL_USERS_COUNT'
    totalCount:number
}

export type UsersPageType = {
    users:UsersType[]
    pageSize:number
    totalUserCount:number
    currentPage:number
}
export type UsersType = {
    id: number
    name: string
    photos:{ small: string | null, large:string | null }
    status: string
    location: { city: string, country: string }
    followed: boolean
}

let initialState = {
    users:[],
    pageSize: 5,
    totalUserCount:0,
    currentPage:1
}

const UsersReducer = (state:UsersPageType = initialState, action: ActionsType):UsersPageType  => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state,users:state.users.map(u=>u.id===action.userId?{...u,followed:true}:u)}
        case 'UNFOLLOW':
            return {...state,users:state.users.map(u=>u.id===action.userId?{...u,followed:false}:u)}
        case 'SET_USERS':
            return {...state,users:action.users} // duplicate users from server
        case 'SET_CURRENT_PAGE':
            return {...state,currentPage:action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state,totalUserCount:action.totalCount}
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
export const SetCurrentPageAC =(currentPage:number): SetCurrentPageACType => {
    return {
        type:'SET_CURRENT_PAGE',
        currentPage:currentPage
    } as const
}
export const SetTotalUserCountAC =(totalCount:number): SetTotalUserCountACType => {
    return {
        type:'SET_TOTAL_USERS_COUNT',
        totalCount:totalCount
    } as const
}

export default UsersReducer;