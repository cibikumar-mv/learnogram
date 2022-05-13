import { AUTH, SAVE, SAVE_USER_POST } from "../constants/actionTypes";
import * as api from "../api/index";

export const fetchUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id);

        console.log("Fetch user res:", data);
    } catch (error) {
        console.log("Fetch User Error:", error);
    }
};

export const userPost = (id, username) => async (dispatch) => {
    try {

        const { data } = await api.userPost(id);
        const { userData } = await api.fetchUser(username);

        console.log("User Post res:", userData);


        dispatch({ type: SAVE_USER_POST, payload: data.result });

    } catch (error) {
        console.log("User Post Error:", error);
    }
};

