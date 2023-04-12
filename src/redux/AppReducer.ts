import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAuthUserData } from './AuthReducer'

export type AppStateType = {
   initialized: boolean
}

const initialState = {
   initialized: false,
}
const slice = createSlice({
   name: 'app',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(initializedAppTC.fulfilled, state => {
         state.initialized = true
      })
   },
})

export const AppReducer = slice.reducer
export const initializedAppTC = createAsyncThunk<unknown, undefined>(
   'app/init',
   async (_, { dispatch }) => {
      try {
         await dispatch(getAuthUserData())
         return true
      } catch (err) {
         console.warn(err)
      }
   }
)
