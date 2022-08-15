import {applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer, {addPostActionCreate, changeNewPostActionCreate, SetUserProfileType} from "./ProfileReducer";
import DialogsReducer, {addMessageActionCreate, updateMessageActionCreate} from "./DialogsReducer";
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
    SetAuthUserDataACType |
    ToggleFollowingProcessType


let reducers = combineReducers({
    messagesPage: DialogsReducer,
    profilePage: ProfileReducer,
    usersPage: UsersReducer,
    auth:AuthReducer
})
let store = createStore(reducers,applyMiddleware(thunkMiddleware));

type ReducersType= typeof reducers
export type storeType = ReturnType<ReducersType>;

export default store;