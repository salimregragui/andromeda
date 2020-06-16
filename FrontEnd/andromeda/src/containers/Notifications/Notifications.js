import React, { Component } from 'react';
import classes from './Notifications.module.css';
import NotificationsIcon from '../../assets/images/notifications-icon.svg';
import NotificationHide from '../../assets/images/notification-hide.svg';
import {connect} from 'react-redux';
import * as notificationActions from '../../store/actions/index';

class Notifications extends Component {
    state = {
        notificationsShowing : false
    }

    toggleNotificationsTabHandler = () => {
        let notificationsShowing = this.state.notificationsShowing;
        this.setState({notificationsShowing: !notificationsShowing});
    }

    setNotificationSeen = (id) => {
        this.props.onSeenNotification(id);
    }

    setAllNotificationsSeen = () => {
        this.props.onSeenNotificationsAll();
    }

    render() {
        let totalNotifications = 0;
        let notifications = null;
        let notificationsTab = null;

        if (this.props.notifications) {
            notifications = this.props.notifications.filter(notification => {
                return !notification.seen;
            });
            totalNotifications = notifications.length;

            notifications = this.props.notifications;
        }

        if (notifications && this.state.notificationsShowing) {
            notificationsTab = <div className={classes.NotificationsTab} style = {localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', border:'1px solid #201d2a'} : null}>
                <button onClick={this.setAllNotificationsSeen} style = {localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}>
                    <img src={NotificationHide} alt="Mark as read" />
                    <span>Marquer tout comme lu</span>
                </button>
                {notifications.map((notification,id) =>{
                    if (!notification.seen) {
                        return <div key={id} className={classes.aNotification}>
                                <button style = {localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null} onClick={() => this.setNotificationSeen(id)}><img src={NotificationHide} alt="Mark as read" /></button>
                                <div className={classes.aNotificationContent}>{notification.content}</div>
                            </div>
                    }
                    else {
                        return null;
                    }
                })}
            </div>
        }

        return (
            <div className={classes.GlobalNotifications}>
                <div className={classes.Notifications} onClick={this.toggleNotificationsTabHandler} style = {localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}>
                    <div className={`${classes.NotificationsAvailable} ${totalNotifications === 0 ? classes.noNotifications : null}`}></div>
                    <img src={NotificationsIcon} alt="notifications" />
                </div>

                {notificationsTab}
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        notifications: state.data.notifications
    }
}

let mapDispatchToProps = dispatch => {
    return {
        onSeenNotification: (id) => dispatch(notificationActions.setAsSeen(id)),
        onSeenNotificationsAll: () => dispatch(notificationActions.setAsSeenAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
