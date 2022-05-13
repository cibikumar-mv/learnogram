import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, START_LOADING, STOP_LOADING } from '../constants/actionTypes';
import * as api from "../api/index";

export const createPost = (post) => async (dispatch) => {
    try {
        const updatedPost = { ...post, tags: post.tags.split(",") };
        console.log("mongo:", updatedPost);
        const { data } = await api.createPost(updatedPost);
        console.log("msg:" + JSON.stringify(data));
        if (!data.success) {
            throw new Error(data.error);
        }
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const fetchAll = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchAll();
        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
}
export const fetchOne = (postID) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchOne(postID);
        dispatch({ type: FETCH_ONE, payload: data.result });

        dispatch({ type: STOP_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (postID) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.likePost(postID);
        dispatch({ type: UPDATE, payload: data })
        
        dispatch({ type: STOP_LOADING });
        console.log("Like Res:", data);

    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = (postID) => async (dispatch) => {
    try {
        const { data } = await api.dislikePost(postID);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}