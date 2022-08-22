import {applyMiddleware, combineReducers, createStore} from "redux";
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
import AuthReducer, {SetAuthUserDataACType} from "./AuthReducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'

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
    SetStatusACType


let reducers = combineReducers({
    messagesPage: DialogsReducer,
    profilePage: ProfileReducer,
    usersPage: UsersReducer,
    auth:AuthReducer,
    form:formReducer
})
let store = createStore(reducers,applyMiddleware(thunkMiddleware));

type ReducersType= typeof reducers
export type storeType = ReturnType<ReducersType>;

export default store;
// @ts-ignore
window.store = store;