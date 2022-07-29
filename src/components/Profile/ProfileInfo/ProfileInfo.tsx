import React from "react";
import wall from '../../../assets/img/kaen.jpg'
import classes from './ProfileInfo.module.css';
import { profileUserType} from "../../../App";

type ProfileInfoType = {
    profile: profileUserType
}

const ProfileInfo = (props: ProfileInfoType) => {
    return (
        <div className={classes.main}>
            <div>
                <img src={wall} alt="0"/>
            </div>
            <div className={classes.description_block}>
                <img src={props.profile.photos.large} alt='0'/>
                <div>
                    name: {props.profile.fullName}
                </div>
                <div>
                    ABOUT: {props.profile.aboutMe}
                </div>
            </div>
        </div>
    )
}
export default ProfileInfo;