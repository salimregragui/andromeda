import * as actionTypes from './actionTypes';
import axios from 'axios';

export const tasksAllSuccess = (tasks) => {
    return {
        type: actionTypes.TASKS_ALL_SUCCESS,
        tasks: tasks
    }
}

export const tasksAll = () => {
    return dispatch => {
        axios.get('http://localhost:8000/api/auth/task')
        .then(response => {
            dispatch(tasksAllSuccess(response.data.tasks));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const taskAdd = (task) => {
    return dispatch => {
        axios.post('http://localhost:8000/api/auth/task', task)
        .then(response => {
            dispatch(addNotification({
                'type':'success',
                'content':'Tache \''+ task.content +'\' ajoutée avec succes !',
                'seen': false,
                'displayed': false
            }));
        })
        .catch(error => {
            dispatch(addNotification({
                'type':'error',
                'content':'La tache \''+ task.content +'\' n\'a pas pu être ajoutée !',
                'seen': false,
                'displayed': false
            }));
        })
    }
}

export const taskEdit = (task) => {
    let id = task.id;
    delete task.id;
    console.log(task);
    return dispatch => {
        axios.put('http://localhost:8000/api/auth/task/'+ id, task)
        .then(response => {
            dispatch(addNotification({
                'type':'success',
                'content':'Tache \''+ task.content +'\' modifiée avec succes !',
                'seen': false,
                'displayed': false
            }));
        })
        .catch(error => {
            dispatch(addNotification({
                'type':'error',
                'content':'La tache \''+ task.content +'\' n\'a pas pu être modifiée !',
                'seen': false,
                'displayed': false
            }));
        })
    }
}

export const taskDelete = (task) => {
    let taskId = task.id;
    return dispatch => {
        axios.delete('http://localhost:8000/api/auth/task/'+ taskId)
        .then(response => {
            dispatch(addNotification({
                'type':'success',
                'content':'Tache \''+ task.content +'\' supprimée avec succès !',
                'seen': false,
                'displayed': false
            }));
        })
        .catch(error => {
            console.log(error);
            dispatch(addNotification({
                'type':'error',
                'content':'La tache \''+ task.content +'\' n\'a pas pu être supprimée !',
                'seen': false,
                'displayed': false
            }));
        })
    }
}

export const resourcesAllSuccess = (resources) => {
    return {
        type: actionTypes.RESOURCES_ALL_SUCCESS,
        resources: resources
    }
}


export const resourcesAll = () => {
    return dispatch => {
        axios.get('http://localhost:8000/api/auth/resource')
        .then(response => {
            dispatch(resourcesAllSuccess(response.data.CoursesResources));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const discussionsAllSuccess = (discussions) => {
    return {
        type: actionTypes.DISCUSSIONS_ALL_SUCCESS,
        discussions: discussions
    }
}


export const discussionsAll = () => {
    return dispatch => {
        axios.get('http://localhost:8000/api/auth/discussion')
        .then(response => {
            dispatch(discussionsAllSuccess(response.data.Discussions));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const addNotification = (notification) => {
    return {
        type: actionTypes.ADD_NOTIFICATION,
        notification: notification
    }
}

export const hideNotification = (id) => {
    return {
        type: actionTypes.HIDE_NOTIFICATION,
        notificationId: id
    }
}

export const setAsSeen = (id) => {
    return {
        type: actionTypes.SEEN_NOTIFICATION,
        notificationId: id
    }
}

export const setAsSeenAll = () => {
    return {
        type: actionTypes.SEEN_ALL_NOTIFICATION
    }
}