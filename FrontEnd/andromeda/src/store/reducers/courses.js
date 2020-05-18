import * as actionTypes from '../actions/actionTypes';

const initialState = {
    courses: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COURSES_ALL_SUCCESS:
            return {
                ...state,
                courses: action.courses
            }
        default:
            return state;
    }
}

export default reducer;