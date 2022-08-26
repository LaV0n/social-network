import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import ProfileReducer, {
    addPostActionCreate,
    SetStatusACType,
    SetUserProfileType
} from "./ProfileReducer";
import DialogsReducer, {addMessageActionCreate} from "./DialogsReducer";
import UsersReducer, {
    FollowACType,
    SetCurrentPageACType,
    SetToggleIsFetchingACType,
    SetTotalUserCountACType,
    SetUsersACType, ToggleFollowingProcessType,
    UnfollowACType
} from "./UsersReducer";
import AuthReducer, {SetAuthUserDataACType, SetErrorACType} from "./AuthReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import {AppReducer, setInitializedAC} from "./AppReducer";

export type ActionsType =
    ReturnType<typeof addPostActionCreate> |
    ReturnType<typeof addMessageActionCreate> |
    FollowACType |
    UnfollowACType |
    SetUsersACType |
    SetCurrentPageACType |
    SetTotalUserCountACType |
    SetToggleIsFetchingACType|
    SetUserProfileType|
    SetAuthUserDataACType |
    ToggleFollowingProcessType |
    SetStatusACType |
    SetErrorACType |
    ReturnType<typeof setInitializedAC>


let reducers = combineReducers({
    messagesPage: DialogsReducer,
    profilePage: ProfileReducer,
    usersPage: UsersReducer,
    auth:AuthReducer,
    form:formReducer,
    app:AppReducer
})
let store = createStore(reducers,applyMiddleware(thunkMiddleware));

type ReducersType= typeof reducers
export type storeType = ReturnType<ReducersType>;

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType =void> =ThunkAction<ReturnType, RootState, unknown, ActionsType>
export type RootState = ReturnType<typeof store.getState>

export default store;
// @ts-ignore
window.store = store;