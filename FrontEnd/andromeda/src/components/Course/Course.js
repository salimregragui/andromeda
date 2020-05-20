import React from 'react';
import classes from './Course.module.css';
import clockIcon from '../../assets/images/clock-icon.svg';
import playIcon from '../../assets/images/play-icon.svg';

const Course = (props) => {
    return (
        <div className={classes.Course}>
            <div className={classes.CourseLogo}>
                {props.name.substring(0,2).toUpperCase()}
            </div>
            <div className={classes.courseInfos}>
                {props.name}<br/>
                <span>{props.nbrLessons} Lessons</span>
            </div>
            <button className={classes.coursePlayButton}>
                <img src={playIcon} alt="play" />
            </button>
            <div className={classes.courseaddInfos}>
                {props.nbrMinutes} mins <img src={clockIcon} alt="clock" /><br/>
                <span>{props.nbrStudents} Etudiants</span>
            </div>
        </div>
    )
}

export default Course;