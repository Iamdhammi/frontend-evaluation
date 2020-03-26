import * as t from '../types';

const initialState = {
    loading: false,
    isCreated: false,
    message: '',
    stories: {},
    isFetched: false
}

const admin = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING:
            return {
                ...state,
                loading: true
            };
        case t.FETCH_ADMIN_STORIES_SUCCESS: 
            return {
                ...state,
                stories: action.payload,
                isFetched: true,
                loading: false,
            }

        case t.ADMIN_ERROR:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case t.CLEAR_ERRORS:
            return { 
                ...state,
                message: '' ,
                loading: false,
                message: '',
            };
        case t.CLEAR_SUCCESS:
            return { 
                ...state,
                loading: false,
                isCreated: false
            };

        default:
            return state;
    }
}

export default admin;