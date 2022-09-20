import {applyMiddleware, combineReducers,  legacy_createStore as createStore} from "redux";
import {
    ProfileReducer,
    addPostActionCreate, deletePostAC,
    setUserProfile, setStatus
} from "./ProfileReducer";
import DialogsReducer, {addMessageActionCreate} from "./DialogsReducer";
import UsersReducer, {
    followSuccess, setCurrentPage,
    setToggleIsFetching,
    setTotalUserCount,
    setUsers,
    toggleFollowingProcess,
    unfollowSuccess
} from "./UsersReducer";
import AuthReducer, {setAuthUserData, setError} from "./AuthReducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import {AppReducer, setInitializedAC} from "./AppReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

export type ActionsType =
    ReturnType<typeof addPostActionCreate> |
    ReturnType<typeof addMessageActionCreate> |
    ReturnType<typeof followSuccess> |
    ReturnType<typeof unfollowSuccess> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUserCount> |
    ReturnType<typeof setToggleIsFetching> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof toggleFollowingProcess> |
    ReturnType<typeof setStatus> |
    ReturnType<typeof setError> |
    ReturnType<typeof setInitializedAC> |
    ReturnType<typeof deletePostAC>


let reducers = combineReducers({
    messagesPage: DialogsReducer,
    profilePage: ProfileReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
    form: formReducer,
    app: AppReducer
})
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));//@ts-ignore

let store= createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)));

type ReducersType = typeof reducers
export type storeType = ReturnType<ReducersType>;

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
export type RootState = ReturnType<typeof store.getState>

export default store;
// @ts-ignore
window.store = store;