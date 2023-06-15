import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { AppReducer } from './AppReducer'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AuthReducer } from './AuthReducer'
import { ProfileReducer } from './ProfileReducer'
import { DialogsReducer } from './DialogsReducer'
import { UsersReducer } from './UsersReducer'

export const reducers = combineReducers({
   messagesPage: DialogsReducer,
   profilePage: ProfileReducer,
   usersPage: UsersReducer,
   auth: AuthReducer,
   form: formReducer,
   app: AppReducer,
})

const store = configureStore({ reducer: reducers })

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
//export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof reducers>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
