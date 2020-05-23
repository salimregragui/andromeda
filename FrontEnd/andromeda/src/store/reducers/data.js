import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASKS_ALL_SUCCESS:
            return {
                ...state,
                tasks: action.tasks
            }
        default:
            return state;
    }
}

export default reducer;