import React from 'react'
import {withRouter} from 'react-router-dom';
import classes from './ProfileUser.module.css';
import * as timeago from 'timeago.js';

const ProfileUser = (props) => {
    if (props.match.params.userName && !props.user) {
        props.getUser(props.match.params.userName);
    }

    let userData = null;
    let courses = null;

    if (props.user) {
        if (props.user.progressions) {
            courses = <React.Fragment>
                <div className={classes.userDataBox}>
                    Cours suivis : <span>{props.user.progressions.length}</span>
                </div>

                {props.user.progressions.map(prog => (
                    <div key={prog.id} className={classes.courseFollowed}>
                        <div className={classes.courseFollowedImg} style={{backgroundImage: "url('" + prog.course.image + "')"}}></div>
                        <div className={classes.courseFollowedData}>
                            {prog.course.name}
                        </div>
                    </div>
                ))}
            </React.Fragment>
        }
        userData = <React.Fragment>
            <div className={classes.Profile}>
                <div className={classes.userInfos}>
                    <div className={classes.userImage} style={{backgroundImage:props.user.image ? "url('" + props.user.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                    <div className={classes.userInfosText}>
                        {props.user.name}<br/>
                        <span>Compte crée : {timeago.format(props.user.created_at)}</span>
                        <button onClick={props.discussionStart}>Commencer discussion</button>
                    </div>
                </div>

                <div className={classes.userData}>
                    <div className={classes.userDataBox}>
                        Type de Compte : <span>Premium</span>
                    </div>

                    <div className={classes.userDataBox}>
                        Status : <span> {props.user.role}</span>
                    </div>
                    
                    {courses}
                </div>
            </div>
        </React.Fragment>
    }
    return (
        <React.Fragment>
            {userData}
        </React.Fragment>
    )
}

export default withRouter(ProfileUser);