import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {profileUserType} from "../../App";
import {getStatus, getUserProfile, updateStatus} from "../../redux/ProfileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {storeType} from "../../redux/redux-store";


type PathParamsType = {
    userId: string
}

type ProfileContainerType = RouteComponentProps<PathParamsType> & {
    profile: profileUserType | null
    getUserProfile: (id: string) => void
    getStatus: (id: string) => void
    status:string
    updateStatus:(status: string)=>void
}


class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId =this.props.match.params.userId
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status ={this.props.status}
                     updateStatus={this.props.updateStatus}
            />
        )
    }
}

let mapsStateToProps = (state: storeType) => (
    {
        profile: state.profilePage.profile,
        status:state.profilePage.status
    }
)

export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapsStateToProps, {getUserProfile,getStatus,updateStatus}),
    withRouter
)(ProfileContainer)