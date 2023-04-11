import React, { ChangeEvent } from 'react'
import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { profileUserType } from '../../redux/ProfileReducer'
import { useAppDispatch, useAppSelector } from '../../hoc/hook'

type ProfileType = {
   profile: profileUserType | null
   status: string
   updateStatus: (status: string) => void
   isOwner: boolean
   setPhoto: (e: ChangeEvent<HTMLInputElement>) => void
}

const Profile = (props: ProfileType) => {
   const dispatch = useAppDispatch()

   return (
      <div className={classes.content}>
         <ProfileInfo profile={profile} />
         <MyPostsContainer />
      </div>
   )
}
export default Profile
