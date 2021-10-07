import axios from "axios";

//heroku deployment
const apiURL = "https://employeemernv2.herokuapp.com/";

//local backend
//const apiURL = "http://localhost:5001/records";

const API = axios.create({ baseURL: apiURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getRecords = (page) => API.get(`/records?page=${page}`);
export const getRecord = (id) => API.get(`/records/${id}`);
export const createRecord = (newCreatedperson) =>
  API.post(`/records`, newCreatedperson);
export const createRandom = async () => {
  const levels = ["Intern", "Junior", "Senior", "Chief"];
  try {
    const { data } = await axios.get(
      "https://random-data-api.com/api/users/random_user"
    );
    const record = {
      person_name: data.first_name + " " + data.last_name,
      person_position: data.employment.title,
      person_level: levels[Math.floor(Math.random() * levels.length)],
    };
    return record;
  } catch (error) {
    console.log("error: ", error);
  }
};
export const editRecord = (id, newEditedperson) =>
  API.patch(`/records/${id}`, newEditedperson);
export const deleteRecord = (id) => API.delete(`/records/${id}`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);

export const fetchRecordsBySearch = (searchQuery) => {
  console.log("in api ", searchQuery);
  return API.get(
    `/records/search?searchQuery=${searchQuery.search || "none"}&positions=${
      searchQuery.positions
    }`
  );
};
