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
            console.log(response);
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
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}