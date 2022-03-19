import { AUTH, SAVE } from "../constants/actionTypes";
import * as api from "../api/index";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    let { data } = await api.signIn(formData);
    console.log("IN ACTION SIGIN", formData);
    if (data.success === "true") {
      const result = {
        name: data.result.name,
        email: data.result.email,
        id: data.result._id,
        imageUrl: data.result.imageUrl,
        isGoogle: data.result.isGoogle,
      };
      data = { result, token: data.token };
      dispatch({ type: AUTH, data });
      navigate("/");
    } else if (data.success === "false" && formData.isGoogle) {
      dispatch({ type: SAVE, data: formData });
      navigate("/details");
    }else if(data.success === "false-normalExists" && formData.isGoogle){
      alert(data.error);
    }
     else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const googleSignIn = (formData, navigate) => async (dispatch) => {
//   try {
//     let { data } = await api.signIn(formData);
//     if (data.success === "true") {
//       const result = {
//         name: data.result.name,
//         email: data.result.email,
//         id: data.result._id,
//         imageUrl: data.result.imageUrl,
//         isGoogle: data.result.isGoogle,
//       };
//       data = { result, token: data.token };
//       dispatch({ type: AUTH, data });
//       navigate("/");
//     } else {
//       dispatch({ type: SAVE, data: formData });
//       navigate("/details");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    let { data } = await api.signUp(formData);
    if (data.success === "true") {
      const result = {
        name: data.result.name,
        email: data.result.email,
        id: data.result._id,
        imageUrl: data.result.imageUrl,
        isGoogle: data.result.isGoogle,
      };
      data = { result, token: data.token };
      console.log("Signup result", result);

      dispatch({ type: AUTH, data });
      navigate("/");
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
