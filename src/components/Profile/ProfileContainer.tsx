import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import { profileUserType, stateType} from "../../App";
import { showUserProfile} from "../../redux/ProfileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";


type PathParamsType = {
    userId: string
}

type ProfileContainerType = RouteComponentProps<PathParamsType> &{
    profile:profileUserType | null
    showUserProfile:(id:string)=>void
}


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        this.props.showUserProfile(this.props.match.params.userId)
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

export default connect(mapsStateToProps, {showUserProfile})(WithUrlDataContainer)