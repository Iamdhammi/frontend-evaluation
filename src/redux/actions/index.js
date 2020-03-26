import * as t from '../types';
import { dispatch } from 'rxjs/internal/observable/pairs';

export const clearError = () => dispatch => {
    dispatch({
        type: t.CLEAR_ERRORS
    })
}

export const clearSuccess = () => dispatch => {
    dispatch({
        type: t.CLEAR_SUCCESS
    })
}