import React from "react";
import {connect} from "react-redux";
import {stateType} from "../../App";
import {Dispatch} from "redux";
import {
    follow,
    setCurrentPage, setToggleIsFetching,
    setTotalUserCount,
    setUsers,
    unfollow,
    UsersType
} from "../../redux/UsersReducer";
import axios from "axios";
import {Users} from "./Users";
import { Preloader } from "../common/preloader/Preloader";


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
    isFetching:boolean
    setToggleIsFetching:(isFetching:boolean)=>void
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setToggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUserCount(response.data.totalCount)
            });
    }

    changeCurrentPage = (page: number) => {
        this.props.setCurrentPage(page);
        this.props.setToggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setToggleIsFetching(false)
                this.props.setUsers(response.data.items)
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
        currentPage:state.usersPage.currentPage,
        isFetching:state.usersPage.isFetching
    }
}

export const UsersContainer = connect(mapStateToProps, {follow,unfollow,setUsers,setCurrentPage,setTotalUserCount,setToggleIsFetching})(UsersAPIComponent)