import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: null,
    resources: null,
    discussions: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASKS_ALL_SUCCESS:
            return {
                ...state,
                tasks: action.tasks
            }
        case actionTypes.RESOURCES_ALL_SUCCESS:
            return {
                ...state,
                resources: action.resources
            }
        case actionTypes.DISCUSSIONS_ALL_SUCCESS:
            return {
                ...state,
                discussions: action.discussions
            }
        default:
            return state;
    }
}

export default reducer;