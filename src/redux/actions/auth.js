import axios from 'axios';
import * as t from '../types';
import setAuthUser from '../../utils/auth/setAuthUser';
import { url } from '../../api/axios.request.link';

export const loginUser = userDetails => dispatch => {
    dispatch({
        type: t.LOADING
    });
    axios
    .post(`${url}/api/login`, userDetails)
    .then(response => {
        const user = response.data;
        setAuthUser(user);
        dispatch({
            type: t.LOGIN_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        if(error.response == null){
            dispatch({
                type: t.AUTH_ERROR,
                payload: "No Internet Connection 🥺"
            })
        }else {
            dispatch({
                type: t.AUTH_ERROR,
                payload: "Try again later"
            })
        }
        
    })

}

export const loginAdmin = userDetails => dispatch => {
    dispatch({
        type: t.LOADING
    });
    axios
    .post(`${url}/api/admin-login`, userDetails)
    .then(response => {
        const user = response.data;
        setAuthUser(user);
        dispatch({
            type: t.LOGIN_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        if(error.response == null){
            dispatch({
                type: t.AUTH_ERROR,
                payload: "No Internet Connection 🥺"
            })
        }else {
            dispatch({
                type: t.AUTH_ERROR,
                payload: "Try again later"
            })
        }
    })
}



export const logoutUser = () => dispatch => {
    dispatch({
        type: t.LOGOUT_SUCCESS
    });

    setAuthUser(false);
};