import React from 'react';
import classes from './Notification.module.css';

const Notification = (props) => {
    let style = null;

    if (props.type === 'success') {
        style ={
            backgroundColor: '#27ae60',
            color: 'white'
        }
    }

    if (props.type === 'error') {
        style ={
            backgroundColor: '#e74c3c',
            color: 'white'
        }
    }

    if (props.type === 'info') {
        style ={
            backgroundColor: '#2980b9',
            color: 'white'
        }
    }
    return (
        <div className={classes.Notification} style={style}>
            <div className={classes.NotificationContent}>
                {props.content}
            </div>
            <div className={classes.NotificationRemove} onClick={props.notificationHide}>x</div>
        </div>
    )
}

export default Notification;
