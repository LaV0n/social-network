import { combineReducers } from 'redux'
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
import { ThunkDispatch } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { AppReducer } from './AppReducer'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AuthReducer } from './AuthReducer'
import { ProfileReducer } from './ProfileReducer'

export type ActionsType =
   | ReturnType<typeof addMessageActionCreate>
   | ReturnType<typeof followSuccess>
   | ReturnType<typeof unfollowSuccess>
   | ReturnType<typeof setUsers>
   | ReturnType<typeof setCurrentPage>
   | ReturnType<typeof setTotalUserCount>
   | ReturnType<typeof setToggleIsFetching>
   | ReturnType<typeof toggleFollowingProcess>

const reducers = combineReducers({
   messagesPage: DialogsReducer,
   profilePage: ProfileReducer,
   usersPage: UsersReducer,
   auth: AuthReducer,
   form: formReducer,
   app: AppReducer,
})

const store = configureStore({ reducer: reducers })

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type RootState = ReturnType<typeof reducers>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
// @ts-ignore
window.store = store
