import React from 'react';
import classes from './Course.module.css';
import clockIcon from '../../assets/images/clock-icon.svg';
import playIcon from '../../assets/images/play-icon.svg';

const Course = (props) => {
    return (
        <div className={classes.Course} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
            <div className={classes.CourseLogo} style={{backgroundImage: "url('" + props.image + "')"}}>
            </div>
            <div className={classes.courseInfos} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                {props.name}<br/>
                <span>{props.nbrLessons} Lessons</span>
            </div>
            <button className={classes.coursePlayButton} name={props.name} onClick={props.clickPlay} style={localStorage.getItem('theme') === 'dark' ? {border:'2px solid white'} : null}>
                <img src={playIcon} alt="play" name={props.name} />
            </button>
            <div className={classes.courseaddInfos} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                {props.nbrMinutes} mins <img src={clockIcon} alt="clock" /><br/>
                <span>{props.nbrStudents} Etudiants</span>
            </div>
        </div>
    )
}

export default Course;
