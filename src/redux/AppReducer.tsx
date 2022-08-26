import {ActionsType, AppDispatch} from "./redux-store";
import {getAuthUserData} from "./AuthReducer";


const SET_INITIALIZED = 'SET_INITIALIZED'


export type AppStateType = {
    initialized: boolean
}

let initialState = {
    initialized: false

}

export const AppReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, initialized: true}

        default:
            return state;
    }
}
export const setInitializedAC = () => {
    return {
        type: SET_INITIALIZED
    } as const
}

export const initializedAppTC = () => (dispatch: AppDispatch) => {
    let promise= dispatch(getAuthUserData())
    promise.then(()=>
        dispatch(setInitializedAC())
    )



}

