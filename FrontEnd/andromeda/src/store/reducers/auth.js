import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    user: null,
    error: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                token: action.token,
                user: action.user
            }
        case actionTypes.AUTH_FAIL:
            return {
                token: null,
                user: null,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                token: null,
                user: null
            }
        default:
            return state;
    }
}

export default reducer;