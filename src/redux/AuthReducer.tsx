import {ActionsType, AppDispatch} from "./redux-store";
import {AuthAPI} from "../api/api";


export type SetAuthUserDataACType = {
    type: 'SET_USER_DATA'
    payload: {
        id: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}

export type SetErrorACType = {
    type: 'SET_ERROR'
    error: null | string
}

export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    error:null | string
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error:null
}

const AuthReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, ...action.payload}
        case 'SET_ERROR':{
            return {...state,error:action.error}
        }
        default:
            return state;
    }
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataACType => {
    return {
        type: "SET_USER_DATA",
        payload: {id, email, login, isAuth}
    } as const
}

export const setError = ( error:string | null): SetErrorACType => {
       return {
        type: 'SET_ERROR',
        error:error
    } as const
}


export const getAuthUserData = () =>
    (dispatch: AppDispatch) => {
       return  AuthAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setAuthUserData(id, email, login, true))
                }
            })
    }


export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: AppDispatch) => {
        AuthAPI.login(email, password, rememberMe)
            .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(getAuthUserData())
                    } else {
                        dispatch(setError(response.data.messages.toString()))

                    }
                }
            )
    }}

    export const logout = () => {
        return (dispatch: AppDispatch) => {
            AuthAPI.logout()
                .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(setAuthUserData(null, null, null, false))
                    }
                })
        }
    }

    export default AuthReducer;