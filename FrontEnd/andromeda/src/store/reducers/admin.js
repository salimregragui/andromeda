import * as actionTypes from '../actions/actionTypes';

const initialState = {
    courses: null,
    users: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COURSES_ALL_SUCCESS_ADMIN:
            return {
                ...state,
                courses: action.courses
            }
        case actionTypes.USERS_ALL_SUCCESS_ADMIN:
            return {
                ...state,
                users: action.users
            }
        default:
            return state;
    }
}

export default reducer;