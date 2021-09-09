import React, { useEffect, useState } from "react";
// This will require to npm install axios
import axios from "axios";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function Create(props) {
  //state data
  const [person_name, setPerson_name] = useState("");
  const [person_position, setPerson_position] = useState("");
  const [person_level, setPerson_level] = useState("");

  //after heroku deployment
  const apiURL = "https://employeemern.herokuapp.com/";

  //local backend
  //const localURL = "http://localhost:5000/";

  const [newperson, setNewperson] = useState({});
  //functions will update the state values.
  const onChangePersonName = (e) => {
    setPerson_name(e.target.value);
  };

  const onChangePersonPosition = (e) => {
    setPerson_position(e.target.value);
  };

  const onChangePersonLevel = (e) => {
    setPerson_level(e.target.value);
  };

  // This function will handle the submission.
  const onSubmit = (e) => {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newperson) to the database.

    setNewperson({ person_name, person_position, person_level });

    // We will empty the state after posting the data to the database
    setPerson_name("");
    setPerson_position("");
    setPerson_level("");
  };

  const senddata = (newp) => {
    if (newp.person_name != null) {
      axios
        .post(`${apiURL}records/`, newp)
        .then((res) => console.log(res.data))
        .catch(function (error) {
          console.log(error.response);
        });
      alertify.success("new employee created", 1);
      //   setNewperson({})
    }
  };

  useEffect(() => {
    senddata(newperson);
  }, [newperson]);

  return (
    // This following section will display the form that takes the input from the user.

    <div style={{ marginTop: 20 }}>
      <h3>Create New Record</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name of the person: </label>
          <input
            required
            type="text"
            className="form-control"
            value={person_name}
            onChange={onChangePersonName}
          />
        </div>
        <div className="form-group">
          <label>Person's position: </label>
          <input
            required
            type="text"
            className="form-control"
            value={person_position}
            onChange={onChangePersonPosition}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Intern"
              checked={person_level === "Intern"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Junior"
              checked={person_level === "Junior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Senior"
              checked={person_level === "Senior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Senior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Chief"
              checked={person_level === "Chief"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Chief</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
          <button type="button" className="btn btn-warning">
            <Link to={"/"}>Return to Person List</Link>
          </button>
        </div>
      </form>
      <h4>previosly added person: {newperson.person_name}</h4>
    </div>
  );
}
