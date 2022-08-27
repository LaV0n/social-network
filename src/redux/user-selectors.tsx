import {stateType} from "../App";
import {createSelector} from "reselect";

const getUsersSelector =(state:stateType) =>{
    return state.usersPage.users
}
export const getUser = createSelector(getUsersSelector,(users)=>{
    return users
})

export const getUserPageSize =(state:stateType) =>{
    return state.usersPage.pageSize
}
export const getTotalUserCount =(state:stateType) =>{
    return state.usersPage.totalUserCount
}
export const getCurrentPage =(state:stateType) =>{
    return state.usersPage.currentPage
}
export const getIsFetching =(state:stateType) =>{
    return state.usersPage.isFetching
}
export const getFollowingInProgress =(state:stateType) =>{
    return state.usersPage.followingInProgress
}