import React from "react";
import {UsersType} from "../../redux/UsersReducer";
import styles from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/img/userPhoto.png';

type UserType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    pageSize: number
    totalUserCount: number
    currentPage: number
    setCurrentPage: (page: number) => void
    setTotalUserCount:(count:number)=>void
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


class Users extends React.Component<UserType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUserCount(response.data.totalCount)
            });
    }

    changeCurrentPage = (page: number) => {
        this.props.setCurrentPage(page);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }

    render() {
        let pageCount = Math.ceil(this.props.totalUserCount / this.props.pageSize);
        let pages = [];
        let finalPage=10;                                                                       //for limited page
        let startPage=1
        for ( let i = startPage; i <= finalPage; i++) {
            pages.push(i)
        }
        return (
            <div>
                <div>
                    {
                        pages.map(p => {
                            return (
                                <span onClick={() => this.changeCurrentPage(p)}
                                      className={this.props.currentPage === p ? styles.pageCountSelected : styles.pageCount}>{p}</span>
                            )
                        })
                    }


                </div>
                {
                    this.props.users.map(u =>
                        <div key={u.id} className={styles.user}>
                            <div className={styles.face}>
                                <div>
                                    <img className={styles.avatar}
                                         src={u.photos.small !== null ? u.photos.small : userPhoto} alt="0"/>
                                </div>
                                <div>
                                    {u.followed
                                        ? <button className={styles.button} onClick={() => {
                                            this.props.unfollow(u.id)
                                        }}>unfollow</button>
                                        : <button className={styles.button} onClick={() => {
                                            this.props.follow(u.id)
                                        }}>follow</button>}
                                </div>
                            </div>
                            <div className={styles.description}>
                                <div>
                                    <div className={styles.line}><span>Name: </span>{u.name}</div>
                                    <div className={styles.line}><span>Status: </span>{u.status}</div>
                                </div>
                                <div>
                                    <div className={styles.line}><span>Country: </span>{"u.location.country"}</div>
                                    <div className={styles.line}><span>City: </span>{"u.location.city"}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Users