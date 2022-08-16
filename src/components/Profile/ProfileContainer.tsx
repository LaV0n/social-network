import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import { profileUserType, stateType} from "../../App";
import { getUserProfile} from "../../redux/ProfileReducer";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}

type ProfileContainerType = RouteComponentProps<PathParamsType> &{
    profile:profileUserType | null
    getUserProfile:(id:string)=>void

}


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        this.props.getUserProfile(this.props.match.params.userId)
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

export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapsStateToProps, {getUserProfile}),
    withRouter
)(ProfileContainer)