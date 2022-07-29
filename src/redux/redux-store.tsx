import {combineReducers, createStore} from "redux";
import ProfileReducer, {addPostActionCreate, changeNewPostActionCreate} from "./ProfileReducer";
import DialogsReducer, {addMessageActionCreate, updateMessageActionCreate} from "./DialogsReducer";
import UsersReducer, {
    FollowACType,
    SetCurrentPageACType,
    SetToggleIsFetchingACType,
    SetTotalUserCountACType,
    SetUsersACType,
    UnfollowACType
} from "./UsersReducer";

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
    SetToggleIsFetchingACType


let reducers = combineReducers({
    messagesPage: DialogsReducer,
    profilePage: ProfileReducer,
    usersPage: UsersReducer
})
let store = createStore(reducers);

export type storeType = typeof store;

export default store;