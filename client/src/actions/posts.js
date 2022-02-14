import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from "../api/index";

export const createPost  = (post) => async (dispatch)=>{
    try{
        const {data} = await api.createPost(post);

        dispatch({type:CREATE, payload: data});
    }catch(error){
        console.log(error);
    }
}