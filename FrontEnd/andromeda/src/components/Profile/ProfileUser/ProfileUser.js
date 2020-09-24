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
                <div className={classes.userDataBox} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                    Cours suivis : <span>{props.user.progressions.length}</span>
                </div>

                {props.user.progressions.map(prog => (
                    <div key={prog.id} className={classes.courseFollowed} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
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
                    <div className={classes.userImage} style={{backgroundImage:props.user.image ? "url('" + props.user.image + "')" : "url('https://andromeda-learning.netlify.com/profile-placeholder.jpg')"}}></div>
                    <div className={classes.userInfosText} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                        {props.user.name}<br/>
                        <span>Compte crée : {timeago.format(props.user.created_at)}</span>
                        <button onClick={props.discussionStart}>Commencer discussion</button>
                    </div>
                </div>

                <div className={classes.userData}>
                    <div className={classes.userDataBox} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                        Type de Compte : <span>Premium</span>
                    </div>

                    <div className={classes.userDataBox} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
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