import * as actionTypes from './actionTypes';
import axios from 'axios';


export const coursesAllSuccess = (courses) => {
    return {
        type: actionTypes.COURSES_ALL_SUCCESS,
        courses: courses
    }
}

export const coursesProgressionSuccess = (progression) => {
    return {
        type: actionTypes.COURSES_PROGRESSION_SUCCESS,
        progression: progression
    }
}

export const coursesAll = () => {
    return dispatch => {
        axios.get('http://localhost:8000/api/auth/course')
        .then(response => {
            console.log(response);
            dispatch(coursesAllSuccess(response.data.courses));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const coursesProgression = () => {
    return dispatch => {
        axios.get('http://localhost:8000/api/auth/course/progression')
        .then(response => {
            console.log(response);
            dispatch(coursesProgressionSuccess(response.data.Courses));
        })
        .catch(error => {
            console.log(error);
        })
    }
}