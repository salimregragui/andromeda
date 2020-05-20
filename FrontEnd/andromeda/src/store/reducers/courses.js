import * as actionTypes from '../actions/actionTypes';

const initialState = {
    courses: null,
    progression: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COURSES_ALL_SUCCESS:
            return {
                ...state,
                courses: action.courses
            }
        case actionTypes.COURSES_PROGRESSION_SUCCESS:
            return {
                ...state,
                progression: action.progression
            }
        default:
            return state;
    }
}

export default reducer;