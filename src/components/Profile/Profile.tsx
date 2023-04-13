import React, { useEffect } from 'react'
import classes from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { Redirect, useParams } from 'react-router-dom'
import { getStatus, getUserProfile } from '../../redux/ProfileReducer'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store'

const Profile = () => {
   const authorizedUserId = useAppSelector(state => state.auth.id)
   const dispatch = useAppDispatch()
   const params: { userId: string } = useParams()

   const setUserId = () => {
      let userId = params.userId
      if (userId === 'userId') {
         userId = String(authorizedUserId)
      }
      dispatch(getStatus(+userId))
      dispatch(getUserProfile(+userId))
   }

   useEffect(() => {
      setUserId()
   }, [params])

   if (!authorizedUserId) return <Redirect to="/login" />

   return (
      <div className={classes.content}>
         <ProfileInfo />
         <MyPostsContainer />
      </div>
   )
}
export default Profile
