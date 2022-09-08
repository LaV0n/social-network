import {ActionsType, AppDispatch} from "./redux-store";
import {UsersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

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
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: action.users} // duplicate users from server
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUserCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userId: number) => (
    {
        type: FOLLOW,
        userId
    } as const
)
export const unfollowSuccess = (userId: number) => (
    {
        type: UNFOLLOW,
        userId
    } as const
)
export const setUsers = (users: UsersType[]) => (
    {
        type: SET_USERS,
        users
    } as const
)
export const setCurrentPage = (currentPage: number) => (
    {
        type: SET_CURRENT_PAGE,
        currentPage
    } as const
)
export const setTotalUserCount = (totalCount: number) => (
    {
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    } as const
)
export const setToggleIsFetching = (isFetching: boolean) => (
    {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const
)
export const toggleFollowingProcess = (isFetching: boolean, userId: number) => (
    {
        type: TOGGLE_FOLLOWING_PROGRESS,
        followingInProgress: isFetching,
        userId
    } as const
)

export const getUsers = (currentPage: number, pageSize: number) =>
    async (dispatch: (a: ActionsType) => void) => {
        dispatch(setToggleIsFetching(true));
        const data = await UsersAPI.GetUsers(currentPage, pageSize)
        dispatch(setToggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUserCount(data.totalCount))
    }
export const follow = (userId: number) =>
    async (dispatch: AppDispatch) => {
        dispatch(toggleFollowingProcess(true, userId))
        const responsive = await UsersAPI.UnfollowUser(userId)
        if (responsive.data.resultCode === 0) {
            dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleFollowingProcess(false, userId))
    }
export const unfollow = (userId: number) =>
    async (dispatch: (a: ActionsType) => void) => {
        dispatch(toggleFollowingProcess(true, userId))
        const responsive = await UsersAPI.FollowUser(userId)
        if (responsive.data.resultCode === 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleFollowingProcess(false, userId))
    }

export default UsersReducer;