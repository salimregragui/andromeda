import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './NotificationsDisplayer.module.css';
import Notification from '../../../components/Notification/Notification';
import * as NotificationActions from '../../../store/actions/index';

class NotificationsDisplayer extends Component {
    hideNotificationHandler = (id) => {
        this.props.onHideNotification(id);
    }
    render() {
        return (
            <div className={classes.Notifications}>
                {this.props.notifications ? this.props.notifications.map((notification, id) => {
                    if (!notification.displayed) {
                        return <Notification 
                                 key={id}
                                 notificationHide = {() => {this.hideNotificationHandler(id)}}
                                 type={notification.type} 
                                 content={notification.content}/>
                    }
                    else {
                        return null;
                    }
                }): null}
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
        onHideNotification: (id) => dispatch(NotificationActions.hideNotification(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsDisplayer);
