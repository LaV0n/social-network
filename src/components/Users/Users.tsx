import React from "react";
import {UsersType} from "../../redux/UsersReducer";
import styles from './Users.module.css'

type UserType = {
    users: UsersType[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
}

const Users = (props: UserType) => {

    if (props.users.length === 0) {
        props.setUsers(
            [
                {
                    id: 1,
                    name: 'Triss',
                    avatar: require("./../img/triss.jpg"),
                    status: 'free',
                    location: {city: 'Novigrad', country: 'Novigrad'},
                    followed: true
                },
                {
                    id: 2,
                    name: 'Gaunter',
                    avatar: require("./../img/gaunter.jpeg"),
                    status: 'free',
                    location: {city: 'any', country: 'all word'},
                    followed: false
                },
                {
                    id: 3,
                    name: 'Letho',
                    avatar: require("./../img/letho.jpg"),
                    status: 'free',
                    location: {city: 'Aedirn', country: 'Gulet'},
                    followed: true
                },
                {
                    id: 4,
                    name: 'Yennefer',
                    avatar: require("./../img/yennefer.jpg"),
                    status: 'free',
                    location: {city: 'Aedirn', country: 'Vengerberg'},
                    followed: true
                },
                {
                    id: 5,
                    name: 'Thaler',
                    avatar: require("./../img/thaler.jpg"),
                    status: 'free',
                    location: {city: 'Wyzima', country: 'Temeres'},
                    followed: false
                },
                {
                    id: 6,
                    name: 'Jaskier',
                    avatar: require("./../img/jaskier.jpg"),
                    status: 'free',
                    location: {city: 'capital city', country: 'Tusent'},
                    followed: true
                }
            ]
        )
    }

    return (
        <div>
            {
                props.users.map(u =>
                    <div key={u.id} className={styles.user}>
                        <div className={styles.face}>
                            <div>
                                <img className={styles.avatar} src={u.avatar} alt="0"/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button className={styles.button} onClick={() => {
                                        props.unfollow(u.id)
                                    }}>unfollow</button>
                                    : <button className={styles.button} onClick={() => {
                                        props.follow(u.id)
                                    }}>follow</button>}
                            </div>
                        </div>
                        <div className={styles.description}>
                            <div>
                                <div className={styles.line}><span>Name: </span>{u.name}</div>
                                <div className={styles.line}><span>Status: </span>{u.status}</div>
                            </div>
                            <div>
                                <div className={styles.line}><span>Country: </span>{u.location.country}</div>
                                <div className={styles.line}><span>City: </span>{u.location.city}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default Users