import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import { profileUserType, stateType} from "../../App";
import { getUserProfile} from "../../redux/ProfileReducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";


type PathParamsType = {
    userId: string
}

type ProfileContainerType = RouteComponentProps<PathParamsType> &{
    profile:profileUserType | null
    getUserProfile:(id:string)=>void
    isAuth:boolean
}


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        this.props.getUserProfile(this.props.match.params.userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to='/login'/>
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

let mapsStateToProps = (state: stateType) => (
    {
        profile: state.profilePage.profile,
        isAuth:state.auth.isAuth
    }
)

let WithUrlDataContainer = withRouter(ProfileContainer)

export default connect(mapsStateToProps, {getUserProfile})(WithUrlDataContainer)