import React, { useEffect, useState } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import axios from "axios";
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

import { useParams, useHistory, Link } from "react-router-dom";

export default function Edit() {
  const apiURL = "https://employeemern.herokuapp.com/";

  //local backend
  // const localURL = "http://localhost:5000/";

  //state data
  const [newEditedperson, setNeweditedperson] = useState({
    person_name: " ",
    person_position: " ",
    person_level: " ",
  });
  const [whatchanged, setWhatchanged] = useState({
    first_m: " ",
    second_m: " ",
    third_m: " ",
  });
  // This will get the record based on the id from the database.

  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`${apiURL}records/` + id)
      .then((response) => {
        setNeweditedperson({
          person_name: response.data.person_name,
          person_position: response.data.person_position,
          person_level: response.data.person_level,
        });
      })
      .catch(function (error) {
        console.log(" error message", error.message);
      });
  }, [id]);

  // These functions will update the state values.
  const onChangePersonName = (e) => {
    setNeweditedperson({ ...newEditedperson, person_name: e.target.value });
    setWhatchanged({ ...whatchanged, first_m: "Person name edited." });
  };

  const onChangePersonPosition = (e) => {
    setNeweditedperson({ ...newEditedperson, person_position: e.target.value });
    setWhatchanged({ ...whatchanged, second_m: "Person position edited." });
  };

  const onChangePersonLevel = (e) => {
    setNeweditedperson({ ...newEditedperson, person_level: e.target.value });
    setWhatchanged({ ...whatchanged, third_m: "Person level edited." });
  };

  // This function will handle the submission.
  const onSubmit = async (e) => {
    e.preventDefault();

    // This will send a post request to update the data in the database.
    await axios.patch(`${apiURL}records/` + id, newEditedperson);
    console.log(whatchanged);
    let message = Object.values(whatchanged).join(" ");
    alertify.success(message, 1);
    history.push("/");
  };

  return (
    <div>
      <h3 align="center">Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Person's Name: </label>
          <input
            type="text"
            className="form-control"
            value={newEditedperson.person_name}
            onChange={onChangePersonName}
          />
        </div>
        <div className="form-group">
          <label>Position: </label>
          <input
            type="text"
            className="form-control"
            value={newEditedperson.person_position}
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
              checked={newEditedperson.person_level === "Intern"}
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
              checked={newEditedperson.person_level === "Junior"}
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
              checked={newEditedperson.person_level === "Senior"}
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
              checked={newEditedperson.person_level === "Chief"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Chief</label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
          <button type="button" className="btn btn-warning">
            <Link to={"/"}>Return to Person List</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
