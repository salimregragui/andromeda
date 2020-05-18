import * as actionTypes from './actionTypes';
import axios from 'axios';


export const coursesAllSuccess = (courses) => {
    return {
        type: actionTypes.COURSES_ALL_SUCCESS,
        courses: courses
    }
}
export const coursesAll = () => {
    return dispatch => {
        axios.get('http://localhost:8000/api/auth/course')
        .then(response => {
            console.log(response);
            dispatch(coursesAllSuccess(response));
        })
        .catch(error => {
            console.log(error);
        })
    }
}