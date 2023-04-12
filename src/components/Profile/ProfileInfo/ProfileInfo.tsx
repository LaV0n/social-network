import React, { ChangeEvent } from 'react'
import wall from '../../../assets/img/kaen.jpg'
import classes from './ProfileInfo.module.css'
import { Preloader } from '../../common/preloader/Preloader'
import needJobImg from '../../../assets/img/lookingJob.png'
import dontNeedJobImg from '../../../assets/img/jobChilling.webp'
import facebookIcon from '../../../assets/icons/facebook.png'
import instagramIcon from '../../../assets/icons/instagram.png'
import webIcon from '../../../assets/icons/www.png'
import twitterIcon from '../../../assets/icons/twitter.png'
import youtubeIcon from '../../../assets/icons/youtube.png'
import vkIcon from '../../../assets/icons/poop.png'
import gitIcon from '../../../assets/icons/github.png'
import mailIcon from '../../../assets/icons/email.png'
import defaultUser from '../../../assets/img/userPhoto.png'
import { ProfileStatusWithHooks } from '../ProfileStatusWithHooks'
import { IconButton } from '@mui/material'
import addPhotoIcon from '../../../assets/icons/add-photo.png'
import { ProfileInfoForm } from '../ProfileInfoForm/ProfileInfoForm'
import { setEditMode, setPhoto } from '../../../redux/ProfileReducer'
import gearIcon from '../../../assets/icons/gear_icon.png'
import { useAppDispatch, useAppSelector } from '../../../redux/redux-store'

type LinkIconType = {
   link: string
   icon: string
}

const ProfileInfo = () => {
   const profile = useAppSelector(state => state.profilePage.profile)
   const editModeStatus = useAppSelector(state => state.profilePage.editMode)
   const authId = useAppSelector(state => state.auth.id)
   const isOwner = authId === profile?.userId
   const dispatch = useAppDispatch()

   if (!profile) {
      return <Preloader />
   }
   const LinkIcon = (props: LinkIconType) => {
      return (
         <div className={classes.iconBlock}>
            {props.link ? (
               <a href={props.link}>
                  {' '}
                  <img src={props.icon} alt="0" className={classes.icon} />
               </a>
            ) : (
               <img src={props.icon} alt="0" className={classes.iconNull} />
            )}
         </div>
      )
   }
   const setPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.value) {
         dispatch(setPhoto(e.currentTarget.value))
      }
   }
   const editModeHandler = () => {
      dispatch(setEditMode(!editModeStatus))
   }

   return (
      <div className={classes.main}>
         <div>
            <img src={wall} alt="0" className={classes.mainImg} />
         </div>
         <div className={classes.description_block}>
            <div className={classes.avatarBlock}>
               <img
                  src={profile.photos.large ? profile.photos.large : defaultUser}
                  alt="0"
                  className={classes.avatar}
               />
               <img
                  src={profile.lookingForAJob ? needJobImg : dontNeedJobImg}
                  alt="0"
                  className={classes.jobImg}
               />
               {isOwner && (
                  <div className={classes.addPhoto}>
                     <IconButton
                        color={'primary'}
                        aria-label="upload picture"
                        component="label"
                        style={{ padding: '0' }}
                     >
                        <input type={'file'} hidden onChange={setPhotoHandler} />
                        <img src={addPhotoIcon} alt={'0'} className={classes.addPhotoIcon} />
                     </IconButton>
                     <IconButton
                        color={'primary'}
                        aria-label="upload picture"
                        component="label"
                        style={{ padding: '0' }}
                     >
                        <img
                           src={gearIcon}
                           alt={'0'}
                           className={classes.addPhotoIcon}
                           onClick={editModeHandler}
                        />
                     </IconButton>
                  </div>
               )}
            </div>
            <div className={classes.nameBlock}>
               <div>
                  <span className={classes.title}>name </span> {profile.fullName}
               </div>
               <ProfileStatusWithHooks />
            </div>
            <div className={classes.aboutJobBlock}>
               <div>
                  <span className={classes.title}>about me </span> {profile.aboutMe}
               </div>
               <div>
                  <span className={classes.title}>what job I need </span>{' '}
                  {profile.lookingForAJobDescription}
               </div>
            </div>
         </div>
         {editModeStatus && <ProfileInfoForm />}
         <div className={classes.contactContainer}>
            <h2>Contacts</h2>
            <span className={classes.contactsBlock}>
               <LinkIcon link={profile.contacts.facebook} icon={facebookIcon} />
               <LinkIcon link={profile.contacts.website} icon={webIcon} />
               <LinkIcon link={profile.contacts.vk} icon={vkIcon} />
               <LinkIcon link={profile.contacts.twitter} icon={twitterIcon} />
               <LinkIcon link={profile.contacts.instagram} icon={instagramIcon} />
               <LinkIcon link={profile.contacts.youtube} icon={youtubeIcon} />
               <LinkIcon link={profile.contacts.github} icon={gitIcon} />
               <LinkIcon link={profile.contacts.mainLink} icon={mailIcon} />
            </span>
         </div>
      </div>
   )
}
export default ProfileInfo
