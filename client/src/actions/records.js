import * as api from "../api";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import {
  GET_RECORDS,
  GET_RECORD,
  CREATE_RECORD,
  DELETE_RECORD,
  EDIT_RECORD,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

export const getRecords = (page) => async (dispatch) => {
  try {
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.getRecords(page);
    dispatch({
      type: GET_RECORDS,
      payload: { data, currentPage, numberOfPages },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRecord = (id) => async (dispatch) => {
  try {
    const { data } = await api.getRecord(id);
    console.log({ data });
    dispatch({
      type: GET_RECORD,
      payload: { record: data },
    });
  } catch (error) {
    console.log(error.message);
    alertify.alert("Error", `Could find ${id}`);
  }
};

export const createRandom = () => async (dispatch) => {
  try {
    const record = await api.createRandom();
    const { data } = await api.createRecord(record);
    dispatch({ type: CREATE_RECORD, payload: data });
    alertify.success("new employee created", 2);
  } catch (error) {
    console.log(error.message);
  }
};

export const createRecord = (record) => async (dispatch) => {
  try {
    console.log("actiondan önce ", { record });
    const { data } = await api.createRecord(record);
    dispatch({ type: CREATE_RECORD, payload: data });
    console.log("action", { data });
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

export const getRecordsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchRecordsBySearch(searchQuery);
    console.log("get acitondan gelen", data);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
