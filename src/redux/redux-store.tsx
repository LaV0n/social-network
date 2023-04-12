import { combineReducers } from 'redux'
import {
   ProfileReducer,
   addPostActionCreate,
   deletePostAC,
   setUserProfile,
   setStatus,
   setNewPhoto,
   setEditMode,
} from './ProfileReducer'
import DialogsReducer, { addMessageActionCreate } from './DialogsReducer'
import UsersReducer, {
   followSuccess,
   setCurrentPage,
   setToggleIsFetching,
   setTotalUserCount,
   setUsers,
   toggleFollowingProcess,
   unfollowSuccess,
} from './UsersReducer'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { AppReducer } from './AppReducer'

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AuthReducer } from './AuthReducer'

export type ActionsType =
   | ReturnType<typeof addPostActionCreate>
   | ReturnType<typeof addMessageActionCreate>
   | ReturnType<typeof followSuccess>
   | ReturnType<typeof unfollowSuccess>
   | ReturnType<typeof setUsers>
   | ReturnType<typeof setCurrentPage>
   | ReturnType<typeof setTotalUserCount>
   | ReturnType<typeof setToggleIsFetching>
   | ReturnType<typeof setUserProfile>
   | ReturnType<typeof toggleFollowingProcess>
   | ReturnType<typeof setStatus>
   | ReturnType<typeof deletePostAC>
   | ReturnType<typeof setNewPhoto>
   | ReturnType<typeof setEditMode>

const reducers = combineReducers({
   messagesPage: DialogsReducer,
   profilePage: ProfileReducer,
   usersPage: UsersReducer,
   auth: AuthReducer,
   form: formReducer,
   app: AppReducer,
})

const store = configureStore({ reducer: reducers })

type ReducersType = typeof reducers
export type storeType = ReturnType<ReducersType>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
export type RootState = ReturnType<typeof reducers>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
// @ts-ignore
window.store = store
