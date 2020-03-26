import { combineReducers } from "redux";
import auth from "./authReducer";
import story from './storyReducer';
import admin from './adminReducer';

export default combineReducers({ auth, story, admin });
