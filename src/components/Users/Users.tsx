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
    constructor(props:UserType) {
        super(props);
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
            this.props.setUsers(response.data.items)
        });
    }

render() {
    return (
        <div>
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