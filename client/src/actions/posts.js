import { FETCH_ALL, FETCH_ONE, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from "../api/index";

export const createPost  = (post) => async (dispatch)=>{
    try{
        const {data} = await api.createPost(post);
        console.log("msg:"+JSON.stringify(data));
        if(!data.success){
            throw new Error(data.error);
        }
        dispatch({type:CREATE, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const fetchOne = (postID) => async (dispatch)=>{
    try{
        const {data} = await api.fetchOne(postID);
        dispatch({type:FETCH_ONE, payload: data.result});
    }catch(error){
        console.log(error);
    }
}