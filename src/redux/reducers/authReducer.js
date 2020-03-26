
import * as t from '../types';

//initial state
const initialState = {
    loading: false,
    user: {},
    isCreated: false,
    isAuthenticated: false,
    message: '',
    logout: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING: 
            return {
                ...state,
                loading: true
            }
        case t.LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        }
        case t.LOGOUT_SUCCESS: 
            return {
                ...state,
                logout: true,
                loading: false
            }
        case t.AUTH_ERROR:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case t.CLEAR_ERRORS:
            return { 
                ...state,
                message: '' ,
                loading: false
            };
        case t.CLEAR_SUCCESS:
            return { 
                ...state,
                isCreated: false,
                message: '',
                logout: false,
                isAuthenticated: false,
                loading: false,
            };

        default:
            return state;
    }
}

export default auth;