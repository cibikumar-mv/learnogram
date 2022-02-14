import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log("Server Res signin:"+data);
    dispatch({ type: AUTH, data });
    // navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const {data} = await api.signUp(formData);
    console.log("Server Res signup:"+JSON.stringify(data));
    
    dispatch({ type: AUTH, data });
    // navigate('/');
  } catch (error) {
    console.log(error);
  }
};