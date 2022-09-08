import {ActionsType, AppDispatch} from "./redux-store";
import {AuthAPI} from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA'
const SET_ERROR = 'SET_ERROR'

export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    error: null | string
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: null
}

const AuthReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        case SET_ERROR: {
            return {...state, error: action.error}
        }
        default:
            return state;
    }
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth}
    } as const
)

export const setError = (error: string | null) =>  (
    {
            type: SET_ERROR,
            error: error
        } as const
    )


export const getAuthUserData = () =>
    async (dispatch: AppDispatch) => {
        const response = await AuthAPI.me()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true))
        } else {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }


export const login = (email: string, password: string, rememberMe: boolean) =>
    async (dispatch: AppDispatch) => {
        const response = await AuthAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            dispatch(setError(response.data.messages.toString()))
        }
    }


export const logout = () =>
    async (dispatch: AppDispatch) => {
        const response = await AuthAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }


export default AuthReducer;