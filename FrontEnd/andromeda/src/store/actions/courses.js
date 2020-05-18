import * as actionTypes from './actionTypes';
import axios from 'axios';

export const coursesAll = () => {
    return dispatch => {
        axios.post('http://localhost:8000/api/auth/login', authData)
        .then(response => {
            console.log(response.data.user);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('justLogged', true);

            dispatch(authSuccess(response.data.access_token, response.data.user));
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    }
}