import React from 'react';
import classes from './CourseBig.module.css';
import playIcon from '../../../assets/images/play-icon.svg';

const CourseBig = (props) => {
    return (
        <div className={classes.Course} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
            <div className={classes.CourseLogo} style={{backgroundImage: "url('" + props.image + "')"}}>
            </div>
            <div className={classes.courseInfos} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                {props.name}<br/>
                <div className={classes.courseInfosBar}>
                    <span style={{backgroundColor:props.courseColor, width: props.percentageFinished + '%'}}></span>
                </div>
            </div>
            <p className={classes.courseDescription}>
                {props.description.substring(0,80)}...
            </p>

            <div className={classes.courseNextChapter}>
                <button className={classes.coursePlayButton} name={props.name} onClick={props.clickPlay} style={localStorage.getItem('theme') === 'dark' ? {border:'2px solid white'} : null}>
                    <img src={playIcon} alt="play" name={props.name} />
                </button>
                <span style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>Prochain chapitre: {props.nextChapter.substring(0, 21)}...</span>
            </div>
        </div>
    )
}

export default CourseBig;
