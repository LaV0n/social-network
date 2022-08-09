import {ActionsType} from "./redux-store";
import {AuthAPI} from "../api/api";


export type SetAuthUserDataACType = {
    type: 'SET_USER_DATA'
    data: {
        id: number | null
        email: string | null
        login: string | null
    }
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
            return {...state, ...action.data,isAuth:true}
        default:
            return state;
    }
}
export const setAuthUserData = (id: number, email: string, login: string): SetAuthUserDataACType => {
    return {
        type: "SET_USER_DATA",
        data: {id, email, login}
    } as const
}
export const getAuthUserData = () =>{
    return (dispatch:(a:ActionsType)=>void) =>{
        AuthAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email,login} = response.data.data;
                    dispatch(setAuthUserData(id,email,login))
                }
            })
    }
}

export default AuthReducer;