import * as api from "../api";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import {
  GET_RECORDS,
  CREATE_RECORD,
  DELETE_RECORD,
  EDIT_RECORD,
} from "../constants/actionTypes";

export const getRecords = () => async (dispatch) => {
  try {
    const { data } = await api.getRecords();
    dispatch({ type: GET_RECORDS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createRecord = (record) => async (dispatch) => {
  try {
    const { data } = await api.createRecord(record);
    dispatch({ type: CREATE_RECORD, payload: data });
    alertify.success("new employee created", 2);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRecord = (id) => async (dispatch) => {
  try {
    await api.deleteRecord(id);
    alertify.success(" employee deleted", 3);
    dispatch({ type: DELETE_RECORD, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const editRecord = (id, record) => async (dispatch) => {
  try {
    const { data } = await api.editRecord(id, record);
    dispatch({ type: EDIT_RECORD, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
