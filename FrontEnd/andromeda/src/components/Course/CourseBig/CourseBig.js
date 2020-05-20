import React from 'react';
import classes from './CourseBig.module.css';
import playIcon from '../../../assets/images/play-icon.svg';

const CourseBig = (props) => {
    return (
        <div className={classes.Course}>
            <div className={classes.CourseLogo} style={{backgroundColor:props.courseColor}}>
                {props.name.substring(0,2).toUpperCase()}
            </div>
            <div className={classes.courseInfos}>
                {props.name}<br/>
                <div className={classes.courseInfosBar}>
                    <span style={{backgroundColor:props.courseColor}}></span>
                </div>
            </div>
            <p className={classes.courseDescription}>
                {props.description.substring(0,80)}...
            </p>

            <div className={classes.courseNextChapter}>
                <button className={classes.coursePlayButton}>
                    <img src={playIcon} alt="play" />
                </button>
                <span>Prochain chapitre: Lorem ipsum sit dolor...</span>
            </div>
        </div>
    )
}

export default CourseBig;
