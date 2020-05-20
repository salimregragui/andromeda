import React from 'react';
import classes from './CourseSmall.module.css';
import playIcon from '../../../assets/images/play-icon.svg';

const Course = (props) => {
    return (
        <div className={classes.Course}>
            <div className={classes.CourseLogo}>
                UX
            </div>
            <div className={classes.courseInfos}>
                {props.name}<br/>
                <span>{props.nbrLessonsRestantes} Lessons restantes</span>
            </div>
            <button className={classes.coursePlayButton}>
                <img src={playIcon} alt="play" />
            </button>
        </div>
    )
}

export default Course;
