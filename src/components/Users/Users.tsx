import React, {ChangeEvent,  useState} from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/userPhoto.png";
import {UsersType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import {Pagination, Typography} from "@mui/material";



export type UserType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    pageSize: number
    totalUserCount: number
    currentPage: number
    changeCurrentPage: (page: number) => void
    followingInProgress: Array<number>
}

export const Users = (props: UserType) => {

    let pageCount = Math.ceil(props.totalUserCount / props.pageSize);
  /*  let pages = [];
    let finalPage = 10;
    let startPage = 1
    for (let i = startPage; i <= pageCount; i++) {
        pages.push(i)
    }*/

    const [editMode,setEditMode]=useState(false)
    const [page,setPage]=useState(props.currentPage)

    const editPage =()=>{
        setEditMode(false)
        props.changeCurrentPage(page)
    }
    const setPageHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setPage(Number(e.currentTarget.value))
    }
    const handleChange = (event:any, value:number) => {
        props.changeCurrentPage(value)
    };
    return (
        <div>
            <div className={styles.pagesBlock}>
                {/* {
                    pages.map(p => {
                        return (
                            <span onClick={() => props.changeCurrentPage(p)}
                                  className={props.currentPage === p ? styles.pageCountSelected : styles.pageCount}>{p}</span>
                        )
                    })
                }*/}

                <Pagination
                    count={pageCount}
                            onChange={handleChange}
                            page={props.currentPage}
                            variant={"text"}
                />
                {editMode
                    ?<input value={page} type={"number"} onBlur={editPage} onChange={setPageHandler}/>
                    : <Typography onDoubleClick={()=>setEditMode(true)}
                    >Page: {props.currentPage}</Typography>
                }



            </div>
            {
                props.users.map(u =>
                    <div key={u.id} className={styles.user}>
                        <div className={styles.face}>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <img className={styles.avatar}
                                         src={u.photos.small !== null ? u.photos.small : userPhoto} alt="0"/>
                                </NavLink>
                            </div>
                            <div>
                                {u.followed
                                    ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                              className={styles.button} onClick={() => {
                                        props.follow(u.id)

                                    }}>unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                              className={styles.button} onClick={() => {
                                        props.unfollow(u.id)

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