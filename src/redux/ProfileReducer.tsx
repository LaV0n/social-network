import { postDataType } from '../components/Profile/MyPosts/MyPostsContainer'
import { ActionsType, AppDispatch, RootState } from './redux-store'
import { profilePageType } from '../App'
import { ProfileAPI, UsersAPI } from '../api/api'
import { AxiosError } from 'axios'

export type profileUserType = {
   photos: { large: string; small: string }
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

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE-POST'
const SET_NEW_PHOTO = 'SET_NEW_PHOTO'
const SET_EIT_MODE = 'SET_EDIT_MODE'

const initialState = {
   postsData: [
      { id: 1, message: 'Hi', likeCount: 5 },
      { id: 2, message: 'I am alive', likeCount: 5 },
      { id: 3, message: 'Who is here?', likeCount: 5 },
   ],
   profile: null /* {
        photos: {small: '', large: ''},
        lookingForAJob: true,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 25455,
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: ''
        }
    }*/,
   status: '',
   editMode: false,
}

export const ProfileReducer = (
   state: profilePageType = initialState,
   action: ActionsType
): profilePageType => {
   switch (action.type) {
      case ADD_POST:
         const post: postDataType = {
            id: 4,
            message: action.value,
            likeCount: 0,
         }
         return { ...state, postsData: [post, ...state.postsData] }
      case SET_USER_PROFILE:
         return { ...state, profile: action.profile }
      case SET_STATUS:
         return { ...state, status: action.status ? action.status : 'no status' }
      case DELETE_POST:
         return { ...state, postsData: { ...state }.postsData.filter(p => p.id !== action.postId) }
      case SET_NEW_PHOTO: //@ts-ignore
         return { ...state, profile: { ...state.profile, photos: action.photos } }
      case SET_EIT_MODE:
         return { ...state, editMode: action.editMode }
      default:
         return state
   }
}

export const addPostActionCreate = (value: string) =>
   ({
      type: ADD_POST,
      value,
   } as const)
export const deletePostAC = (postId: number) =>
   ({
      type: DELETE_POST,
      postId,
   } as const)
export const setUserProfile = (profile: profileUserType) =>
   ({
      type: SET_USER_PROFILE,
      profile,
   } as const)
export const setStatus = (status: string | null) =>
   ({
      type: SET_STATUS,
      status,
   } as const)

export const setNewPhoto = (photos: { large: string; small: string }) =>
   ({
      type: SET_NEW_PHOTO,
      photos,
   } as const)

export const setEditMode = (editMode: boolean) =>
   ({
      type: SET_EIT_MODE,
      editMode,
   } as const)

export const getUserProfile = (userId: number) => async (dispatch: (a: ActionsType) => void) => {
   const response = await UsersAPI.GetProfile(userId)
   dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: (a: ActionsType) => void) => {
   const response = await ProfileAPI.GetStatus(userId)
   dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: (a: ActionsType) => void) => {
   const response = await ProfileAPI.UpdateStatus(status)
   if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
   }
}

export const setPhoto = (file: any) => async (dispatch: (a: ActionsType) => void) => {
   try {
      const response = await ProfileAPI.SetPhoto(file)
      if (response.data.resultCode === 0) {
         dispatch(setNewPhoto(response.data.data.photos))
      }
   } catch (err: any) {
      alert('error')
   }
}
export const updateProfileData =
   (data: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
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
         const response = await ProfileAPI.UpdateProfileData(file)
         if (response.data.resultCode === 0) {
            const id = getState().auth.id
            if (id) {
               dispatch(getUserProfile(id))
               dispatch(setEditMode(false))
            }
         }
      } catch (err: any) {
         const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
         alert(error)
      }
   }
