import * as t from '../types';
import axios from 'axios';
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


export const createStory = storyDetails => dispatch => {
    dispatch({
        type: t.LOADING
    })
    baseURL
    .post('/api/createStory', storyDetails)
    .then(response => {
        dispatch({
            type: t.CREATE_STORY_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        dispatch({
            type: t.STORY_ERROR,
            payload: error.message
        })
    })
}

export const fetchStories = () => dispatch => {
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
        console.log(error)
    })
    
}

