import {combineReducers, createStore} from "redux";
import ProfileReducer, {addPostActionCreate, changeNewPostActionCreate} from "./ProfileReducer";
import DialogsReducer, {addMessageActionCreate, updateMessageActionCreate} from "./DialogsReducer";
import UsersReducer, {
    FollowAC,
    SetCurrentPageAC,
    SetToggleIsFetchingAC,
    SetTotalUserCountAC,
    SetUsersAC,
    UnfollowAC
} from "./UsersReducer";

export type ActionsType =
    ReturnType<typeof addPostActionCreate> |
    ReturnType<typeof changeNewPostActionCreate> |
    ReturnType<typeof addMessageActionCreate> |
    ReturnType<typeof updateMessageActionCreate> |
    ReturnType<typeof FollowAC> |
    ReturnType<typeof UnfollowAC> |
    ReturnType<typeof SetUsersAC> |
    ReturnType<typeof SetCurrentPageAC> |
    ReturnType<typeof SetTotalUserCountAC>|
    ReturnType<typeof SetToggleIsFetchingAC>


let reducers = combineReducers({
    messagesPage: DialogsReducer,
    profilePage: ProfileReducer,
    usersPage: UsersReducer
})
let store = createStore(reducers);

export type storeType = typeof store;

export default store;