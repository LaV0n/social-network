import React from "react";
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


type ProfileInfoType = {
    profile: profileUserType | null
    status: string
    updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={classes.main}>
            <div>
                <img src={wall} alt="0" className={classes.mainImg}/>
            </div>
            <div className={classes.description_block}>
                <div>
                    <img src={props.profile.photos.large ? props.profile.photos.large : defaultUser} alt='0'
                         className={classes.avatar}/>
                    <img src={props.profile.lookingForAJob ? needJobImg : dontNeedJobImg} alt="0"
                         className={classes.jobImg}/>
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
            <h2 style={{marginTop: '-10px'}}>Contacts</h2>
            <div className={classes.contactsBlock}>
                <div className={classes.iconBlock}>
                    <img src={facebookIcon} alt="0" className={classes.icon}/>
                    <span className={classes.text}>{props.profile.contacts.facebook} </span>
                </div>
                <div className={classes.iconBlock}>
                    <img src={webIcon} alt="0" className={classes.icon}/>
                    <span className={classes.text}>{props.profile.contacts.website}</span>
                </div>
                <div className={classes.iconBlock}>
                    <img src={vkIcon} alt="0" className={classes.icon}/>
                    <span className={classes.text}>{props.profile.contacts.vk}</span>
                </div>
                <div className={classes.iconBlock}>
                    <img src={twitterIcon} alt="0" className={classes.icon}/>
                    <span className={classes.text}>{props.profile.contacts.twitter}</span>
                </div>
                <div className={classes.iconBlock}>
                    <img src={instagramIcon} alt="0" className={classes.icon}/>
                    <span className={classes.text}>{props.profile.contacts.instagram}</span>
                </div>
                <div className={classes.iconBlock}>
                    <img src={youtubeIcon} alt="0" className={classes.icon}/>
                    <span className={classes.text}>{props.profile.contacts.youtube}</span>
                </div>
                <div className={classes.iconBlock}>
                    <img src={gitIcon} alt="0" className={classes.icon}/>
                    <span className={classes.text}>{props.profile.contacts.github}</span>
                </div>
                <div className={classes.iconBlock}>
                    <img src={mailIcon} alt="0" className={classes.icon}/>
                    <span className={classes.text}>{props.profile.contacts.mainLink}</span>
                </div>
            </div>
        </div>
    )
}
export default ProfileInfo;