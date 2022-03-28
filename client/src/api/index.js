import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const signIn = (formData) => API.post('auth/login', formData);
export const signUp = (formData) => API.post('auth/signup', formData);
export const forgotPass = (formData) => API.post('password/forget', formData);

export const createPost = (postData) => API.post('posts/', postData);
export const fetchOne = (id) => API.get(`posts/postid/${id}`);
export const fetchAll = () => API.get(`posts/`);
export const likePost = (id) => API.patch(`posts/likePost/${id}`);
export const dislikePost = (id) => API.patch(`posts/dislikePost/${id}`);

