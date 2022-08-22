import {ActionsType, AppDispatch} from "./redux-store";
import {AuthAPI} from "../api/api";


export type SetAuthUserDataACType = {
    type: 'SET_USER_DATA'
    payload: AuthType
}

export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const AuthReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, ...action.payload,}
        default:
            return state;
    }
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null,isAuth:boolean): SetAuthUserDataACType => {
    return {
        type: "SET_USER_DATA",
        payload: {id, email, login, isAuth}
    } as const
}
export const getAuthUserData = () =>{
    return (dispatch:AppDispatch) =>{
        AuthAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email,login} = response.data.data;
                    dispatch(setAuthUserData(id,email,login,true))
                }
            })
    }
}

export const login = (email:string, password:string,rememberMe:boolean) =>{
    return (dispatch:AppDispatch) =>{
        AuthAPI.login(email,password,rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                }
            })
    }
}

export const logout = () =>{
    return (dispatch:AppDispatch) =>{
        AuthAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null,null,null,false))
                }
            })
    }
}

export default AuthReducer;