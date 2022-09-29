import React, {ChangeEvent} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {profileUserType} from "../../App";
import {getStatus, getUserProfile, setPhoto, updateStatus} from "../../redux/ProfileReducer";
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
    status: string
    updateStatus: (status: string) => void
    userId: string
    authorizedUserId: string
    setPhoto:(e:ChangeEvent<HTMLInputElement>)=>void
}


class ProfileContainer extends React.Component<ProfileContainerType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (userId === 'userId') {
            userId = this.props.authorizedUserId
            if (userId === ':userId') {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={this.props.match.params.userId === 'userId'}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     setPhoto={this.props.setPhoto}
            />
        )
    }
}

let mapsStateToProps = (state: storeType) => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
)

export default compose<React.ComponentType>(
    WithAuthRedirect,
    withRouter,
    connect(mapsStateToProps, {getUserProfile, getStatus, updateStatus,setPhoto}),
)(ProfileContainer)