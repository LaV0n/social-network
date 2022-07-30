import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import { profileUserType, stateType} from "../../App";
import {setUserProfile} from "../../redux/ProfileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string
}

type ProfileContainerType = RouteComponentProps<PathParamsType> &{
    setUserProfile: (state: profileUserType) => void
    profile:profileUserType | null
}


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
       let userId = this.props.match.params.userId
        if (!userId){ userId="1"}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/`+userId)
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

let WithUrlDataContainer = withRouter(ProfileContainer)

export default connect(mapsStateToProps, {setUserProfile})(WithUrlDataContainer)