import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password
        }

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

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const register = (signUpData) => {
    return dispatch => {
        const user = {
            email: signUpData.email,
            password: signUpData.password,
            username: signUpData.username
        }
        axios.post('http://localhost:8000/api/auth/register', user)
            .then(response => {
                console.log(response);
                dispatch(auth(signUpData.email, signUpData.password));
            })
            .catch(error => {
                dispatch(authFail(error));
            })
    }
}