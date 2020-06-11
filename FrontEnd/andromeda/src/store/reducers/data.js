import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: null,
    resources: null,
    discussions: null,
    notifications: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASKS_ALL_SUCCESS:
            return {
                ...state,
                tasks: action.tasks
            }
        case actionTypes.RESOURCES_ALL_SUCCESS:
            return {
                ...state,
                resources: action.resources
            }
        case actionTypes.DISCUSSIONS_ALL_SUCCESS:
            return {
                ...state,
                discussions: action.discussions
            }
        case actionTypes.ADD_NOTIFICATION:
            let notifications = [...state.notifications];
            notifications.push(action.notification);
            return {
                ...state,
                notifications: notifications
            }
        case actionTypes.HIDE_NOTIFICATION:
            let newNotifications = [...state.notifications];
            newNotifications[action.notificationId].displayed = true;
            return {
                ...state,
                notifications: newNotifications
            }
        case actionTypes.SEEN_NOTIFICATION:
            let newNotificationsSeen = [...state.notifications];
            newNotificationsSeen[action.notificationId].seen = true;
            return {
                ...state,
                notifications: newNotificationsSeen
            }
        case actionTypes.SEEN_ALL_NOTIFICATION:
            let newNotificationsSeenAll = [...state.notifications];
            newNotificationsSeenAll.forEach(notification => {
                notification.seen = true;
            })
            return {
                ...state,
                notifications: newNotificationsSeenAll
            }
        default:
            return state;
    }
}

export default reducer;