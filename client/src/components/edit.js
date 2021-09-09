import React, { useEffect, useState } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

import { useParams, useHistory, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editRecord, getRecords } from "../actions/records";

export default function Edit() {
  const dispatch = useDispatch();
  const { id } = useParams();

  //state data

  const record = useSelector((state) => {
    if (Array.isArray(state.records)) {
      return state.records.find((record) => record._id === id);
    } else {
      return state.records;
    }
  });
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

  let history = useHistory();

  useEffect(() => {
    if (record) {
      setNeweditedperson(record);
    } else {
      dispatch(getRecords());
    }
  }, [dispatch, record]);

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

    dispatch(editRecord(id, newEditedperson));
    let message = Object.values(whatchanged).join(" ");
    alertify.success(message, 2);
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
