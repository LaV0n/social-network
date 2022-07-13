import React from "react";
import classes from './Profile.module.css';
import MyPosts, {profileStateType} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType} from "../../redux/state";

type ProfileType ={
    profileStage:profileStateType
    dispatch:(action:ActionsType)=>void

}
const  Profile = (props:ProfileType) => {
    return (
        <div className={classes.content}>
           <ProfileInfo/>
           <MyPosts profileState={props.profileStage}
                    dispatch ={props.dispatch}
           />
        </div>
    )
}
export default Profile;