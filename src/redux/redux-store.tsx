import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ProfileReducer,
    addPostActionCreate, deletePostAC,
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
import AuthReducer, {setAuthUserData, setError} from "./AuthReducer";
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
    ReturnType<typeof setAuthUserData> |
    ToggleFollowingProcessType |
    SetStatusACType |
    ReturnType<typeof setError> |
    ReturnType<typeof setInitializedAC> |
    ReturnType<typeof deletePostAC>


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