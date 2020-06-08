import React from 'react'
import classes from './Profile.module.css';
import Course from '../Course/Course';

const Profile = (props) => {
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
                <div className={classes.userDataBox}>
                    Type de Compte : <span>Premium</span>
                </div>
                
                <div className={classes.userDataBox}>
                    Cours suivis : <span>{props.progression.length}</span>
                </div>

                {props.progression.map(prog => (
                    <Course
                                key={prog.id}
                                name={prog.name}
                                image={prog.image}
                                nbrMinutes="240"
                                clickPlay={(event) => {}}
                                nbrLessonsRestantes={prog.progression.chapter_id}/>
                    ))}
            </div>
        </div>
    )
}

export default Profile;