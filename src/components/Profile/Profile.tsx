import React, {ChangeEvent} from "react";
import classes from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { profileUserType} from "../../App";

type ProfileType ={
    profile:profileUserType | null
    status:string
    updateStatus:(status: string)=>void
    isOwner:boolean
    setPhoto:(e:ChangeEvent<HTMLInputElement>)=>void
}

const  Profile = (props:ProfileType) => {

    return (
        <div className={classes.content}>
           <ProfileInfo profile={props.profile}
                        status={ props.status}
                        updateStatus = {props.updateStatus}
                        isOwner={props.isOwner}
                        setPhoto={props.setPhoto}
           />
           <MyPostsContainer/>
        </div>
    )
}
export default Profile;