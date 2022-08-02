import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/userPhoto.png";
import {UsersType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import {UsersAPI} from "../../api/api";


export type UserType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUserCount: number
    currentPage: number
    changeCurrentPage: (page: number) => void
}


export const Users =(props:UserType) =>{

    let pageCount = Math.ceil(props.totalUserCount / props.pageSize);
    let pages = [];
    let finalPage=10;                                                                       //for limited page
    let startPage=1
    for ( let i = startPage; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div className={styles.pagesBlock}>
                {
                    pages.map(p => {
                        return (
                            <span onClick={() => props.changeCurrentPage(p)}
                                  className={props.currentPage === p ? styles.pageCountSelected : styles.pageCount}>{p}</span>
                        )
                    })
                }


            </div>
            {
                props.users.map(u =>
                    <div key={u.id} className={styles.user}>
                        <div className={styles.face}>
                            <div>
                                <NavLink to={'/profile/'+u.id}>
                                    <img className={styles.avatar}
                                         src={u.photos.small !== null ? u.photos.small : userPhoto} alt="0"/>
                                </NavLink>
                            </div>
                            <div>
                                {u.followed
                                    ? <button className={styles.button} onClick={() => {
                                            UsersAPI.UnfollowUser(u.id)
                                            .then(responsive =>{
                                                if(responsive.data.resultCode===0){
                                                    props.unfollow(u.id)
                                                }
                                            })
                                    }}>unfollow</button>
                                    : <button className={styles.button} onClick={() => {
                                            UsersAPI.FollowUser(u.id)
                                            .then(responsive =>{
                                                if(responsive.data.resultCode===0){
                                                    props.follow(u.id)
                                                }
                                            })
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