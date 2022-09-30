import {ActionsType, AppDispatch} from "./redux-store";
import {AuthAPI, SecurityAPI} from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA'
const SET_ERROR = 'SET_ERROR'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    error: null | string
    captchaURL: null | string
}

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
    captchaURL:null
}

const AuthReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        case SET_ERROR: {
            return {...state, error: action.error}
        }
        case SET_CAPTCHA_URL: {
            return {...state, captchaURL: action.payload}
        }
        default:
            return state;
    }
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean, captchaURL: string | null) => (
    {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth, captchaURL}
    } as const
)

export const setError = (error: string | null) => (
    {
        type: SET_ERROR,
        error: error
    } as const
)

export const getCaptchaURL = (url: string) => (
    {
        type: SET_CAPTCHA_URL,
        payload: url
    } as const
)

export const getAuthUserData = () =>
    async (dispatch: AppDispatch) => {
        const response = await AuthAPI.me()
        if (response.data.resultCode === 0) {
            let {id, email, login, captchaURL} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true, captchaURL))
        } else {
            dispatch(setAuthUserData(null, null, null, false, null))
        }
    }


export const login = (email: string, password: string, rememberMe: boolean,captcha:string) =>

    async (dispatch: AppDispatch) => {
        const response = await AuthAPI.login(email, password, rememberMe,captcha)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
            dispatch(setError(null))
        } else {
            if (response.data.resultCode === 10){
                dispatch(getCaptcha())
            }
            dispatch(setError(response.data.messages.toString()))
        }
    }


export const logout = () =>
    async (dispatch: AppDispatch) => {
        const response = await AuthAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false,null))
        }
    }

export const getCaptcha = () =>
    async (dispatch: AppDispatch) => {
        const response = await SecurityAPI.getCaptcha()
        dispatch(getCaptchaURL(response.data.url))
    }

export default AuthReducer;