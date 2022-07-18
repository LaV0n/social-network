import { combineReducers, createStore} from "redux";
import ProfileReducer from "./ProfileReducer";
import DialogsReducer from "./DialogsReducer";

let reducers = combineReducers({
    messagesPage:DialogsReducer,
    profilePage:ProfileReducer
})
let store =createStore(reducers);

export type storeType = typeof store;

export default store;