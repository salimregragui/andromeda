import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    user: null,
    error: '',
    logged: false,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                token: action.token,
                user: action.user,
                logged: true,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                token: null,
                user: null,
                error: action.error,
                logged: false,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                token: null,
                user: null,
                logged: false,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;