import axios from 'axios';
import { url } from './axios.request.link';

export const baseURL = axios.create({
	baseURL: url,
	headers: {
		"Content-Type": "application/json",
	},
});
