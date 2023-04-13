import { createSelector } from 'reselect'
import { RootState } from './redux-store'

const getUsersSelector = (state: RootState) => {
   return state.usersPage.users
}
export const getUser = createSelector(getUsersSelector, users => {
   return users
})

export const getUserPageSize = (state: RootState) => {
   return state.usersPage.pageSize
}
export const getTotalUserCount = (state: RootState) => {
   return state.usersPage.totalUserCount
}
export const getCurrentPage = (state: RootState) => {
   return state.usersPage.currentPage
}
export const getIsFetching = (state: RootState) => {
   return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: RootState) => {
   return state.usersPage.followingInProgress
}
