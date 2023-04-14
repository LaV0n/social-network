import React from 'react'
import { connect } from 'react-redux'
import {
   follow,
   getUsers,
   setCurrentPage,
   toggleFollowingProcess,
   unfollow,
   UsersType,
} from '../../redux/UsersReducer'
import { Users } from './Users'
import { Preloader } from '../common/preloader/Preloader'
import { compose } from 'redux'
import {
   getCurrentPage,
   getFollowingInProgress,
   getIsFetching,
   getTotalUserCount,
   getUser,
   getUserPageSize,
} from '../../redux/user-selectors'
import { RootState } from '../../redux/store'

export type UserAPIComponentType = {
   users: UsersType[]
   follow: (userId: number) => void
   unfollow: (userId: number) => void
   pageSize: number
   totalUserCount: number
   currentPage: number
   setCurrentPage: (page: number) => void
   isFetching: boolean
   followingInProgress: Array<number>
   getUsers: (currentPage: number, pageSize: number) => void
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
      this.props.setCurrentPage(page)
   }

   render() {
      return (
         <>
            {this.props.isFetching ? <Preloader /> : null}
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

const mapStateToProps = (state: RootState) => {
   return {
      users: getUser(state),
      pageSize: getUserPageSize(state),
      totalUserCount: getTotalUserCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
   }
}

export default compose<React.ComponentType>(
   connect(mapStateToProps, {
      setCurrentPage,
      toggleFollowingProcess,
      getUsers,
      follow,
      unfollow,
   })
)(UsersAPIComponent)
