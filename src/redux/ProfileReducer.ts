import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileAPI, UsersAPI } from '../api/api'
import { RootState } from './store'
import { setError } from './AuthReducer'
import { ErrorAsString } from '../utils/ErrorAsString/ErrorAsString'
import { v1 as uuidv1 } from 'uuid'

export type ProfileUserType = {
   photos: ProfilePhotoType | null
   lookingForAJob?: boolean
   lookingForAJobDescription?: string
   fullName?: string
   userId?: number
   aboutMe?: string
   contacts: {
      facebook: string
      website: string
      vk: string
      twitter: string
      instagram: string
      youtube: string
      github: string
      mainLink: string
   }
}
export type postDataType = {
   id: string
   message: string
   likeCount: number
}
export type ProfilePageType = {
   postsData: postDataType[]
   profile: null | ProfileUserType
   status: string
   editMode: boolean
}
export type ProfilePhotoType = {
   large: string | null
   small: string | null
}

const initialState: ProfilePageType = {
   postsData: [
      { id: '1', message: 'Hi', likeCount: 5 },
      { id: '2', message: 'I am alive', likeCount: 5 },
      { id: '3', message: 'Who is here?', likeCount: 5 },
   ],
   profile: null,
   status: '',
   editMode: false,
}
const slice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      setStatus(state, action: PayloadAction<string>) {
         state.status = action.payload ? action.payload : 'no status'
      },
      setEditMode(state, action: PayloadAction<boolean>) {
         state.editMode = action.payload
      },
      addPost(state, action: PayloadAction<string>) {
         state.postsData.unshift({ id: uuidv1(), message: action.payload, likeCount: 0 })
      },
      deletePost(state, action: PayloadAction<string>) {
         state.postsData = state.postsData.filter(p => p.id !== action.payload)
      },
   },
   extraReducers: builder => {
      builder.addCase(getUserProfile.fulfilled, (state, action) => {
         state.profile = action.payload
      })
      builder.addCase(setPhoto.fulfilled, (state, action) => {
         state.profile!.photos = action.payload ? action.payload : null
      })
   },
})

export const ProfileReducer = slice.reducer
export const { setStatus, setEditMode, addPost, deletePost } = slice.actions
export const getUserProfile = createAsyncThunk<ProfileUserType, number>(
   'profile/getUserProfile',
   async (userId, { dispatch }) => {
      try {
         const response = await UsersAPI.GetProfile(userId)
         return response.data
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const getStatus = createAsyncThunk<unknown, number>(
   'profile/getStatus',
   async (userId, { dispatch }) => {
      try {
         const response = await ProfileAPI.GetStatus(userId)
         dispatch(setStatus(response.data))
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const updateStatus = createAsyncThunk<unknown, string>(
   'profile/updateStatus',
   async (status, { dispatch }) => {
      try {
         const response = await ProfileAPI.UpdateStatus(status)
         if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
         }
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const setPhoto = createAsyncThunk<ProfilePhotoType, any>(
   'profile/setPhoto',
   async (file, { dispatch }) => {
      try {
         const response = await ProfileAPI.SetPhoto(file)
         if (response.data.resultCode === 0) {
            return response.data.data.photos
         }
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
export const updateProfileData = createAsyncThunk<unknown, any, { state: RootState }>(
   'profile/updateProfile',
   async (data, { dispatch, getState }) => {
      const file = {
         lookingForAJob: data.lookingForAJob,
         lookingForAJobDescription: data.lookingForAJobDescription,
         fullName: data.fullName,
         aboutMe: data.aboutMe,
         contacts: {
            github: data.github,
            vk: data.vk,
            facebook: data.facebook,
            instagram: data.instagram,
            twitter: data.twitter,
            website: data.website,
            youtube: data.youtube,
            mainLink: data.mainLink,
         },
      }
      try {
         const response = await ProfileAPI.UpdateProfileData(file)
         if (response.data.resultCode === 0) {
            const id = getState().auth.id
            if (id) {
               dispatch(getUserProfile(id))
               dispatch(setEditMode(false))
            }
         }
         const errorValid = response.data.messages[0]
         dispatch(setError(errorValid))
      } catch (err) {
         dispatch(setError(ErrorAsString(err)))
      }
   }
)
