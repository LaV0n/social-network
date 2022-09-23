import React, { ChangeEvent } from "react";
import wall from '../../../assets/img/kaen.jpg'
import classes from './ProfileInfo.module.css';
import {profileUserType} from "../../../App";
import {Preloader} from "../../common/preloader/Preloader";
import needJobImg from "../../../assets/img/lookingJob.png"
import dontNeedJobImg from "../../../assets/img/jobChilling.webp"
import facebookIcon from "../../../assets/icons/facebook.png"
import instagramIcon from "../../../assets/icons/instagram.png"
import webIcon from "../../../assets/icons/www.png"
import twitterIcon from "../../../assets/icons/twitter.png"
import youtubeIcon from "../../../assets/icons/youtube.png"
import vkIcon from "../../../assets/icons/poop.png"
import gitIcon from "../../../assets/icons/github.png"
import mailIcon from "../../../assets/icons/email.png"
import defaultUser from "../../../assets/img/userPhoto.png"
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";
import {IconButton} from "@mui/material";
import addPhotoIcon from "../../../assets/icons/add-photo.png"


type ProfileInfoType = {
    profile: profileUserType | null
    status: string
    updateStatus: (status: string) => void
    isOwner:boolean
    setPhoto:(e:ChangeEvent<HTMLInputElement>)=>void
}
type LinkIconType = {
    link: string
    icon: string
}

const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const LinkIcon = (props: LinkIconType) => {
        return (
            <div className={classes.iconBlock}>
                {props.link
                    ? <a href={props.link}> <img src={props.icon} alt="0" className={classes.icon}/></a>
                    :  <img src={props.icon} alt="0" className={classes.iconNull}/>
                }
            </div>
        )
    }
    const setPhotoHandler= (e:ChangeEvent<HTMLInputElement>)=>{//@ts-ignore
        if(e.target.files[0]){//@ts-ignore
            props.setPhoto(e.target.files[0])
        }

    }

    return (
        <div className={classes.main}>
            <div>
                <img src={wall} alt="0" className={classes.mainImg}/>
            </div>
            <div className={classes.description_block}>
                <div className={classes.avatarBlock}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : defaultUser} alt='0'
                         className={classes.avatar}/>
                    <img src={props.profile.lookingForAJob ? needJobImg : dontNeedJobImg} alt="0"
                         className={classes.jobImg}/>
                    {props.isOwner &&
                       <div className={classes.addPhoto}>
                           <IconButton color={'primary'} aria-label="upload picture" component="label">
                               <input type={'file'} hidden onChange={setPhotoHandler}/>
                               <img src={addPhotoIcon} alt={'0'} className={classes.addPhotoIcon}/>
                           </IconButton>
                       </div>
                    }
                </div>
                <div className={classes.nameBlock}>
                    <div>
                        <span className={classes.title}>name </span> {props.profile.fullName}
                    </div>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>
                <div className={classes.aboutJobBlock}>
                    <div>
                        <span className={classes.title}>about me </span> {props.profile.aboutMe}
                    </div>
                    <div>
                        <span
                            className={classes.title}>what job I need </span> {props.profile.lookingForAJobDescription}
                    </div>

                </div>
            </div>
            <div className={classes.contactContainer}>
                <h2>Contacts</h2>
                <span className={classes.contactsBlock}>
              <LinkIcon link={props.profile.contacts.facebook} icon={facebookIcon}/>
              <LinkIcon link={props.profile.contacts.website} icon={webIcon}/>
              <LinkIcon link={props.profile.contacts.vk} icon={vkIcon}/>
              <LinkIcon link={props.profile.contacts.twitter} icon={twitterIcon}/>
              <LinkIcon link={props.profile.contacts.instagram} icon={instagramIcon}/>
              <LinkIcon link={props.profile.contacts.youtube} icon={youtubeIcon}/>
              <LinkIcon link={props.profile.contacts.github} icon={gitIcon}/>
              <LinkIcon link={props.profile.contacts.mainLink} icon={mailIcon}/>
            </span>
            </div>
        </div>
    )
}
export default ProfileInfo;