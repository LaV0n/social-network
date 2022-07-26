import React from "react";
import wall from '../../../assets/img/kaen.jpg'
import classes from './ProfileInfo.module.css';



const  ProfileInfo = () => {
    return (
        <div className={classes.main}>
            <div>
                <img src={wall} alt="0"/>
            </div>
            <div className={classes.description_block}>
                ava
            </div>
        </div>
    )
}
export default ProfileInfo;