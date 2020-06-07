import React from 'react';
import classes from './CourseSmall.module.css';
import playIcon from '../../../assets/images/play-icon.svg';

const Course = (props) => {
    return (
        <div className={classes.Course}>
            <div className={classes.CourseLogo} style={{backgroundImage: "url('" + props.image + "')"}}>
            </div>
            <div className={classes.courseInfos}>
                {props.name.substring(0,15)}<br/>
                <span>{props.nbrLessonsRestantes} Lessons restantes</span>
            </div>
            <button className={classes.coursePlayButton} name={props.name} onClick={props.clickPlay}>
                <img src={playIcon} alt="play" name={props.name} />
            </button>
        </div>
    )
}

export default Course;
