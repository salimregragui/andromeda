import React from 'react';
import classes from './CourseSmall.module.css';
import playIcon from '../../../assets/images/play-icon.svg';

const Course = (props) => {
    return (
        <div className={classes.Course} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}>
            <div className={classes.CourseLogo} style={{backgroundImage: "url('" + props.image + "')"}}>
            </div>
            <div className={classes.courseInfos} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                {props.name.substring(0,15)}<br/>
                <span>{props.nbrLessonsRestantes} Lessons restantes</span>
            </div>
            <button className={classes.coursePlayButton} name={props.name} onClick={props.clickPlay} style={localStorage.getItem('theme') === 'dark' ? {border:'2px solid white'} : null}>
                <img src={playIcon} alt="play" name={props.name} />
            </button>
        </div>
    )
}

export default Course;
