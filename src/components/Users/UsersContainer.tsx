import React from "react";
import {connect} from "react-redux";
import {stateType} from "../../App";
import {
    follow,
    getUsers,
    setCurrentPage, toggleFollowingProcess,
    unfollow,
    UsersType
} from "../../redux/UsersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import { compose } from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";



export type UserAPIComponentType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUserCount: number
    currentPage: number
    setCurrentPage: (page: number) => void
    isFetching: boolean
    followingInProgress:Array<number>
    getUsers:(currentPage:number,pageSize:number) => void
}

/*
{
    id: 1,
        name: 'Triss',
    avatar: require("../../assets/img/triss.jpg"),
    status: 'free',
    location: {city: 'Novigrad', country: 'Novigrad'},
    followed: true
}
*/

class UsersAPIComponent extends React.Component<UserAPIComponentType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    changeCurrentPage = (page: number) => {
        this.props.getUsers(page, this.props.pageSize)
        this.props.setCurrentPage(page);
    }

    render() {
        return (<>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    pageSize={this.props.pageSize}
                    totalUserCount={this.props.totalUserCount}
                    currentPage={this.props.currentPage}
                    changeCurrentPage={this.changeCurrentPage}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

const mapStateToProps = (state: stateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress
    }
}


export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapStateToProps, {
        setCurrentPage,
        toggleFollowingProcess,
        getUsers,
        follow,
        unfollow
    })
)(UsersAPIComponent)