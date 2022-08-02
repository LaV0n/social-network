import React from "react";
import {connect} from "react-redux";
import {stateType} from "../../App";
import {
    follow,
    setCurrentPage, setToggleIsFetching,
    setTotalUserCount,
    setUsers, toggleFollowingProcess,
    unfollow,
    UsersType
} from "../../redux/UsersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/preloader/Preloader";
import { UsersAPI} from "../../api/api";


export type UserAPIComponentType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    pageSize: number
    totalUserCount: number
    currentPage: number
    setCurrentPage: (page: number) => void
    setTotalUserCount: (count: number) => void
    isFetching: boolean
    setToggleIsFetching: (isFetching: boolean) => void
    followingInProgress:Array<number>
    toggleFollowingProcess:(n:boolean,id:number)=>void
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
        this.props.setToggleIsFetching(true);
        UsersAPI.GetUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setToggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalUserCount(data.totalCount)
        });
    }

    changeCurrentPage = (page: number) => {
        this.props.setCurrentPage(page);
        this.props.setToggleIsFetching(true);
        UsersAPI.GetUsers(page, this.props.pageSize).then(data => {
            this.props.setToggleIsFetching(false)
            this.props.setUsers(data.items)
        });
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
                    toggleFollowingProcess={this.props.toggleFollowingProcess}
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

export const UsersContainer = connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUserCount,
    setToggleIsFetching,
    toggleFollowingProcess
})(UsersAPIComponent)