import { ProfilePhotoType } from './ProfileReducer'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsersAPI } from '../api/api'
import { setError } from './AuthReducer'
import { ErrorAsString } from '../utils/ErrorAsString/ErrorAsString'

type ResponseUsersData = {
   items: UserDataType[]
   totalCount: number
}

export type UsersType = {
   users: UserDataType[]
   pageSize: number
   totalUserCount: number
   currentPage: number
   isFetching: boolean
   followingInProgress: Array<number>
}
export type UserDataType = {
   id: number
   name: string
   photos: ProfilePhotoType
   status: string
   location: { city: string; country: string }
   followed: boolean
}

const initialState: UsersType = {
   users: [],
   pageSize: 5,
   totalUserCount: 0,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [],
}

const slice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload
      },
      toggleFollowingProcess(
         state,
         action: PayloadAction<{ userId: number; isFetching: boolean }>
      ) {
         if (action.payload.isFetching) {
            state.followingInProgress.push(action.payload.userId)
         } else {
            state.followingInProgress = state.followingInProgress.filter(
               id => id !== action.payload.userId
            )
         }
      },
   },
   extraReducers: builder => {
      builder.addCase(getUsers.pending, state => {
         state.isFetching = true
      })
      builder.addCase(getUsers.fulfilled, (state, action) => {
         state.isFetching = false
         state.users = action.payload.items
         state.totalUserCount = action.payload.totalCount
      })
      builder.addCase(follow.fulfilled, (state, action) => {
         state.users.forEach(u => (u.id === action.payload ? (u.followed = false) : u))
      })
      builder.addCase(unfollow.fulfilled, (state, action) => {
         state.users.forEach(u => (u.id === action.payload ? (u.followed = true) : u))
      })
   },
})

export const getUsers = createAsyncThunk<
   ResponseUsersData,
   { currentPage: number; pageSize: number }
>('users/getUsers', async ({ currentPage, pageSize }, { dispatch }) => {
   try {
      return await UsersAPI.GetUsers(currentPage, pageSize)
   } catch (err) {
      dispatch(setError(ErrorAsString(err)))
   }
})
export const follow = createAsyncThunk<unknown, number>(
   'users/follow',
   async (userId, { dispatch }) => {
      dispatch(toggleFollowingProcess({ isFetching: true, userId }))
      try {
         const response = await UsersAPI.UnfollowUser(userId)
         if (response.data.resultCode === 0) {
            dispatch(toggleFollowingProcess({ isFetching: false, userId }))
            return userId
         }
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const unfollow = createAsyncThunk<unknown, number>(
   'users/unfollow',
   async (userId, { dispatch }) => {
      dispatch(toggleFollowingProcess({ isFetching: true, userId }))
      try {
         const response = await UsersAPI.FollowUser(userId)
         if (response.data.resultCode === 0) {
            dispatch(toggleFollowingProcess({ isFetching: false, userId }))
            return userId
         }
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const UsersReducer = slice.reducer
export const { setCurrentPage, toggleFollowingProcess } = slice.actions
