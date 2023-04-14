import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthAPI, SecurityAPI } from '../api/api'
import { ErrorAsString } from '../utils/ErrorAsString/ErrorAsString'

export type AuthType = {
   id: number | null
   email: string | null
   login: string | null
   isAuth: boolean
   error: null | string
   captchaURL: null | string
}
export type LoginData = {
   email: string
   password: string
   rememberMe: boolean
   captcha: string
}

const initialState: AuthType = {
   id: null,
   email: null,
   login: null,
   isAuth: false,
   error: null,
   captchaURL: null,
}

const slice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setAuthUserData(state, action: PayloadAction<AuthType>) {
         state.email = action.payload.email
         state.id = action.payload.id
         state.isAuth = action.payload.isAuth
         state.login = action.payload.login
         state.error = action.payload.error
         state.captchaURL = action.payload.captchaURL
      },
      setError(state, action: PayloadAction<string | null>) {
         state.error = action.payload
      },
   },
   extraReducers: builder => {
      builder.addCase(getCaptcha.fulfilled, (state, action) => {
         state.captchaURL = action.payload
      })
   },
})

export const AuthReducer = slice.reducer
export const { setAuthUserData, setError } = slice.actions

export const getAuthUserData = createAsyncThunk<unknown, undefined>(
   'auth/getUserData',
   async (_, { dispatch }) => {
      try {
         const response = await AuthAPI.me()
         if (response.data.resultCode === 0) {
            const { id, email, login, captchaURL } = response.data.data
            dispatch(
               setAuthUserData({
                  id,
                  email,
                  login,
                  isAuth: true,
                  error: null,
                  captchaURL,
               })
            )
         } else {
            dispatch(
               setAuthUserData({
                  id: null,
                  email: null,
                  captchaURL: null,
                  error: null,
                  isAuth: false,
                  login: null,
               })
            )
         }
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const login = createAsyncThunk<unknown, LoginData>(
   'auth/login',
   async (loginData, { dispatch }) => {
      try {
         const response = await AuthAPI.login(loginData)
         if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
            dispatch(setError(null))
         } else {
            if (response.data.resultCode === 10) {
               dispatch(getCaptcha())
            }
            dispatch(setError(response.data.messages.toString()))
         }
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const getCaptcha = createAsyncThunk<string, undefined>(
   'auth/getCaptcha',
   async (_, { dispatch }) => {
      try {
         const response = await SecurityAPI.getCaptcha()
         return response.data.url
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
   await AuthAPI.logout()
   try {
      dispatch(
         setAuthUserData({
            id: null,
            email: null,
            captchaURL: null,
            error: null,
            isAuth: false,
            login: null,
         })
      )
   } catch (err) {
      dispatch(setError(ErrorAsString(err)))
   }
})
