import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import alertify from "alertifyjs";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    alertify.error(error.response.data.message);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    alertify.error(error.response.data.message);
  }
};
