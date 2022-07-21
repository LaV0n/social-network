import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {stateType} from "../../App";
import {Dispatch} from "redux";
import {FollowAC, SetUsersAC, UnfollowAC, UsersType} from "../../redux/UsersReducer";


const mapStateToProps =(state:stateType) =>{
   return{
       users: state.usersPage.users
   }
}
const mapDispatchToProps =(dispatch:Dispatch) =>{
    return{
        follow: (userId:number) => {dispatch(FollowAC(userId))},
        unfollow: (userId:number) => {dispatch(UnfollowAC(userId))},
        setUsers: (users:UsersType[])=> {dispatch(SetUsersAC(users))}
    }
}

export  const UsersContainer= connect(mapStateToProps,mapDispatchToProps) (Users)