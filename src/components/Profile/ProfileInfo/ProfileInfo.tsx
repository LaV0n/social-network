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


type ProfileInfoType = {
    profile: profileUserType | null
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
                <img src={props.profile.photos.large} alt='0' className={classes.avatar}/>
                <div className={classes.nameBlock}>
                    <div>
                        <span className={classes.title}>name </span> {props.profile.fullName}
                    </div>
                    <div>
                        <span className={classes.title}>about me </span>  {props.profile.aboutMe}
                    </div>
                    <div>
                        <span className={classes.title}>looking for a job </span>
                        <img src={props.profile.lookingForAJob? needJobImg:dontNeedJobImg} alt="0" className={classes.jobImg}/>
                        <div>
                            <span className={classes.title}>what job I need </span>    {props.profile.lookingForAJobDescription}
                        </div>
                    </div>
                </div>
            </div>
            <h2>Contacts</h2>
            <div className={classes.contactsBlock}>
                <div className={classes.iconBlock}>
                    <img  src={facebookIcon} alt="0" className={classes.icon}/>
                    {props.profile.contacts.facebook}
                </div>
                <div className={classes.iconBlock}>
                    <img  src={webIcon} alt="0" className={classes.icon}/>
                    {props.profile.contacts.website}
                </div>
                <div className={classes.iconBlock}>
                    <img  src={vkIcon} alt="0" className={classes.icon}/>
                    {props.profile.contacts.vk}
                </div>
                <div className={classes.iconBlock}>
                    <img  src={twitterIcon} alt="0" className={classes.icon}/>
                    {props.profile.contacts.twitter}
                </div>
                <div className={classes.iconBlock}>
                    <img  src={instagramIcon} alt="0" className={classes.icon}/>
                    {props.profile.contacts.instagram}
                </div>
                <div className={classes.iconBlock}>
                    <img  src={youtubeIcon} alt="0" className={classes.icon}/>
                    {props.profile.contacts.youtube}
                </div>
                <div className={classes.iconBlock}>
                    <img  src={gitIcon} alt="0" className={classes.icon}/>
                    {props.profile.contacts.github}
                </div>
                <div className={classes.iconBlock}>
                    <img  src={mailIcon} alt="0" className={classes.icon}/>
                    {props.profile.contacts.mainLink}
                </div>
            </div>
        </div>
    )
}
export default ProfileInfo;