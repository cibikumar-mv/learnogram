import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'});

export const signIn = (formData) => API.post('auth/login', formData);
export const signUp = (formData) => API.post('auth/signup', formData);