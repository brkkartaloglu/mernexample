import axios from "axios";

//heroku deployment sonrası
const apiURL = "https://employeemern-redux.herokuapp.com/records";

//local backend
//const apiURL = "http://localhost:5001/records";

export const getRecords = () => axios.get(`${apiURL}`);
export const createRecord = (newCreatedperson) =>
  axios.post(`${apiURL}`, newCreatedperson);
export const editRecord = (id, newEditedperson) =>
  axios.patch(`${apiURL}/${id}`, newEditedperson);
export const deleteRecord = (id) => axios.delete(`${apiURL}/${id}`);
