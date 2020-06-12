import React from 'react';
import classes from './Notification.module.css';
import {motion} from 'framer-motion';

const Notification = (props) => {
    let style = null;

    let pageVariants = {
        initial: {
            opacity: 0,
            x: "-50%"
        },
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: "50%"
        }
    }

    let pageTransition = {
        type: "tween",
        duration: 0.6
    }

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
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className={classes.Notification} style={style}>
            <div className={classes.NotificationContent}>
                {props.content}
            </div>
            <div className={classes.NotificationRemove} onClick={props.notificationHide}>x</div>
        </motion.div>
    )
}

export default Notification;
