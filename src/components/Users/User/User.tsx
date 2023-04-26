import React from 'react'
import styles from './User.module.css'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../../assets/img/userPhoto.png'
import { follow, unfollow, UserDataType } from '../../../redux/UsersReducer'
import { useAppDispatch, useAppSelector } from '../../../redux/store'

export const User = ({ id, name, photos, status, followed }: UserDataType) => {
   const dispatch = useAppDispatch()
   const followingInProgress = useAppSelector(state => state.usersPage.followingInProgress)

   return (
      <div className={styles.user}>
         <div className={styles.face}>
            <div>
               <NavLink to={'/profile/' + id}>
                  <img
                     className={styles.avatar}
                     src={photos.small !== null ? photos.small : userPhoto}
                     alt="0"
                  />
               </NavLink>
            </div>
            <div>
               {followed ? (
                  <button
                     disabled={followingInProgress.some(userId => userId === id)}
                     className={styles.button}
                     onClick={() => {
                        dispatch(follow(id))
                     }}
                  >
                     unfollow
                  </button>
               ) : (
                  <button
                     disabled={followingInProgress.some(userId => userId === id)}
                     className={styles.button}
                     onClick={() => {
                        dispatch(unfollow(id))
                     }}
                  >
                     follow
                  </button>
               )}
            </div>
         </div>
         <div className={styles.description}>
            <div>
               <div className={styles.line}>
                  <span>Name: </span>
                  {name}
               </div>
               <div className={styles.line}>
                  <span>Status: </span>
                  {status}
               </div>
            </div>
            <div>
               <div className={styles.line}>
                  <span>Country: </span>
                  {'World'}
               </div>
               <div className={styles.line}>
                  <span>City: </span>
                  {'Sun city'}
               </div>
            </div>
         </div>
      </div>
   )
}
