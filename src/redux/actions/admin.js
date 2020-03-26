import * as t from '../types';
import {baseURL} from '../../api/baseUrl';


const _fetchUser = async () => {
    try {
        const user = localStorage.getItem('evaluation_user');
        const userDetails = JSON.parse(user);
        return userDetails;
    }
    catch(error) {
        return error;
    }
    
}

export const fetchStories = () => dispatch => {
    baseURL
    .get('/api/getStories')
    .then(response => {
        dispatch({
            type: t.FETCH_ADMIN_STORIES_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        dispatch({
            type: t.ADMIN_ERROR,
            payload: error.message
        })
    });
}


export const fetchStory = () => dispatch => {
    _fetchUser()
    .then(user => {
        baseURL
        .get('/api/getStories')
        .then(response => {
            if (response.data) {
                let userStories = [];
                response.data.forEach(element => {
                    if (user.id === element.createdBy) {
                        userStories.push(element)
                    }
                });
                dispatch({
                    type: t.FETCH_STORIES_SUCCESS,
                    payload: userStories
                })
            }
        })
        .catch(error => {
            dispatch({
                type: t.STORY_ERROR,
                payload: error.message
            })
        })
    }).catch(error =>{
        console.log(error);
    })
    
}

