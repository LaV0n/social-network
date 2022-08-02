import {ActionsType} from "./redux-store";


export type FollowACType = {
    type: 'FOLLOW'
    userId: number
}
export type UnfollowACType = {
    type: 'UNFOLLOW'
    userId: number
}
export type SetUsersACType = {
    type: 'SET_USERS'
    users: UsersType[]
}
export type SetCurrentPageACType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}
export type SetTotalUserCountACType = {
    type: 'SET_TOTAL_USERS_COUNT'
    totalCount: number
}
export type SetToggleIsFetchingACType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}
export type ToggleFollowingProcessType = {
    type: 'TOGGLE_FOLLOWING_PROGRESS'
    followingInProgress: boolean
    userId: number
}


export type UsersPageType = {
    users: UsersType[]
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
export type UsersType = {
    id: number
    name: string
    photos: { small: string | null, large: string | null }
    status: string
    location: { city: string, country: string }
    followed: boolean
    followingInProgress: Array<number>
}

let initialState = {
    users: [],
    pageSize: 6,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const UsersReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case 'SET_USERS':
            return {...state, users: action.users} // duplicate users from server
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUserCount: action.totalCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}
export const follow = (userId: number): FollowACType => {
    return {
        type: "FOLLOW",
        userId: userId
    } as const
}
export const unfollow = (userId: number): UnfollowACType => {
    return {
        type: "UNFOLLOW",
        userId: userId
    } as const
}
export const setUsers = (users: UsersType[]): SetUsersACType => {
    return {
        type: 'SET_USERS',
        users: users
    } as const
}
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage: currentPage
    } as const
}
export const setTotalUserCount = (totalCount: number): SetTotalUserCountACType => {
    return {
        type: 'SET_TOTAL_USERS_COUNT',
        totalCount: totalCount
    } as const
}
export const setToggleIsFetching = (isFetching: boolean): SetToggleIsFetchingACType => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isFetching: isFetching
    } as const
}
export const toggleFollowingProcess = (isFetching:boolean, userId: number): ToggleFollowingProcessType => {
    return {
        type: 'TOGGLE_FOLLOWING_PROGRESS',
        followingInProgress: isFetching,
        userId: userId
    } as const
}

export default UsersReducer;