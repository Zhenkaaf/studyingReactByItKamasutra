import React from "react";
import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from "react-router-dom";
import axios from "axios";

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(page =>
                    <span className={`${props.currentPage === page && styles.selectedPage} ${styles.pointer}`}
                        onClick={(event) => { props.onPageChanged(page) }}>{page}
                    </span>)}
            </div>

            {
                props.users.map((user, index) => <div key={user.id}>

                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                            </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'b8437598-fd8d-4c32-a8c9-93e9c8bb12d4'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode == 0) {
                                                props.unfollow(user.id);
                                            }
                                        });


                                    

                                }}>unFollow</button>
                                : <button onClick={() => {
                                    debugger
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': 'b8437598-fd8d-4c32-a8c9-93e9c8bb12d4'
                                        }
                                    })
                                   
                                        .then(response => {
                                            alert('work');
                                            
                                            if (response.data.resultCode == 0) {
                                                props.follow(user.id);
                                            }
                                        });
                                    

                                }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div><div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;