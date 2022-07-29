import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import { profileUserType, stateType} from "../../App";
import {setUserProfile} from "../../redux/ProfileReducer";

type ProfileContainerType = {
    setUserProfile: (state: profileUserType) => void
    profile:profileUserType
}


class ProfileContainerAPI extends React.Component<ProfileContainerType> {                                   //plug
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${23028}`)
            .then(response => {
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapsStateToProps = (state: stateType) => (
    {
        profile: state.profilePage.profile
    }
)
export const ProfileContainer = connect(mapsStateToProps, {setUserProfile})(ProfileContainerAPI)