import * as actionTypes from './actionTypes';
import axios from 'axios';

export const coursesAllSuccessAdmin = (courses) => {
    return {
        type: actionTypes.COURSES_ALL_SUCCESS_ADMIN,
        courses: courses
    }
}

export const coursesAllAdmin = () => {
    return dispatch => {
        let courses = null;
        axios.get('https://limitless-wildwood-57587.herokuapp.com/api/auth/course')
        .then(response => {
            courses = [...response.data.courses];
            axios.get('https://limitless-wildwood-57587.herokuapp.com/api/auth/course/invalide')
            .then(resp => {
                courses.push(...resp.data.courses);
                dispatch(coursesAllSuccessAdmin(courses));
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const usersAllAdminSuccess = (users) => {
    return {
        type: actionTypes.USERS_ALL_SUCCESS_ADMIN,
        users: users
    }
}

export const usersAllAdmin = () => {
    return dispatch => {
        axios.get('https://limitless-wildwood-57587.herokuapp.com/api/auth/user')
        .then(response => {
            dispatch(usersAllAdminSuccess(response.data.Users));
        })
        .catch(error => {
            console.log(error);
        })
    }
}