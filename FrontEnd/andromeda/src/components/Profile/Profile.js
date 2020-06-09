import React from 'react'
import classes from './Profile.module.css';
import {NavLink} from 'react-router-dom';

const Profile = (props) => {
    let courses = null;

    if (props.progression) {
        courses = <React.Fragment>
            <div className={classes.userDataBox}>
                Cours suivis : <span>{props.progression.length}</span>
            </div>

            {props.progression.map(prog => (
                <div key={prog.id} className={classes.courseFollowed}>
                    <div className={classes.courseFollowedImg} style={{backgroundImage: "url('" + prog.image + "')"}}></div>
                    <div className={classes.courseFollowedData}>
                        {prog.name}
                        {prog.user_id === props.user.id ? <NavLink to="/course/add">Edit</NavLink> : null}
                    </div>
                </div>
            ))}
        </React.Fragment>
    }
    return (
        <div className={classes.Profile}>
            <div className={classes.userInfos}>
                <div className={classes.userImage} style={{backgroundImage:props.user.image ? "url('" + props.user.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                <div className={classes.userInfosText}>
                    {props.user.name}<br/>
                    <button>Edit Profile</button>
                </div>
            </div>

            <div className={classes.userData}>
                {props.user.role === 'Professor' ? <NavLink to="/course/add">Ajouter Un cours</NavLink> : null}
                <div className={classes.userDataBox}>
                    Type de Compte : <span>Premium</span>
                </div>

                <div className={classes.userDataBox}>
                    Status : <span> {props.user.role}</span>
                </div>
                
                {courses}
            </div>
        </div>
    )
}

export default Profile;