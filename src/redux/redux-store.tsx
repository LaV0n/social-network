import {combineReducers, createStore} from "redux";
import ProfileReducer, {addPostActionCreate, changeNewPostActionCreate, SetUserProfileType} from "./ProfileReducer";
import DialogsReducer, {addMessageActionCreate, updateMessageActionCreate} from "./DialogsReducer";
import UsersReducer, {
    FollowACType,
    SetCurrentPageACType,
    SetToggleIsFetchingACType,
    SetTotalUserCountACType,
    SetUsersACType,
    UnfollowACType
} from "./UsersReducer";
import AuthReducer, {SetAuthUserDataACType} from "./AuthReducer";

export type ActionsType =
    ReturnType<typeof addPostActionCreate> |
    ReturnType<typeof changeNewPostActionCreate> |
    ReturnType<typeof addMessageActionCreate> |
    ReturnType<typeof updateMessageActionCreate> |
    FollowACType |
    UnfollowACType |
    SetUsersACType |
    SetCurrentPageACType |
    SetTotalUserCountACType |
    SetToggleIsFetchingACType|
    SetUserProfileType|
    SetAuthUserDataACType


let reducers = combineReducers({
    messagesPage: DialogsReducer,
    profilePage: ProfileReducer,
    usersPage: UsersReducer,
    auth:AuthReducer
})
let store = createStore(reducers);

export type storeType = typeof store;

export default store;