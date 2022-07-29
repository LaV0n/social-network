import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {stateType} from "../../App";
import {Dispatch} from "redux";
import {
    FollowAC,
    SetCurrentPageAC,
    SetTotalUserCountAC,
    SetUsersAC,
    UnfollowAC,
    UsersType
} from "../../redux/UsersReducer";


const mapStateToProps = (state: stateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage:state.usersPage.currentPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (userId: number) => {
            dispatch(FollowAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(UnfollowAC(userId))
        },
        setUsers: (users: UsersType[]) => {
            dispatch(SetUsersAC(users))
        },
        setCurrentPage: (page:number)=>{
            dispatch(SetCurrentPageAC(page))
        },
        setTotalUserCount:(count:number)=>{
            dispatch(SetTotalUserCountAC(count))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)