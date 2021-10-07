import React, { useEffect, useState } from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

import { useParams, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editRecord, getRecord, getRecords } from "../actions/records";
import { Alert } from "reactstrap";

export default function Edit() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const { id } = useParams();

  //state data

  const record = useSelector((state) => {
    console.log(state.records);
    if (state.records.records.length !== 0) {
      console.log("burada");
      console.log(state.records.records);
      console.log(state.records.records.find((record) => record._id === id));
      return state.records.records.find((record) => record._id === id);
    } else {
      console.log("şurada");
      return state.records.record;
    }
  });
  const [whatchanged, setWhatchanged] = useState({
    first_m: " ",
    second_m: " ",
    third_m: " ",
  });
  const [newEditedperson, setNeweditedperson] = useState({
    person_name: " ",
    person_position: " ",
    person_level: " ",
    person_lastChange: " ",
  });
  // This will get the record based on the id from the database.

  useEffect(() => {
    if (record) {
      setNeweditedperson({
        person_name: record.person_name,
        person_position: record.person_position,
        person_level: record.person_level,
        person_lastChange: "",
      });
    } else {
      dispatch(getRecord(id));
    }
  }, [dispatch, record]);

  // These functions will update the state values.
  const onChangePersonName = (e) => {
    setWhatchanged({ ...whatchanged, first_m: "Employee name edited" });
    setNeweditedperson({
      ...newEditedperson,
      person_name: e.target.value,
      person_lastChange: newEditedperson.person_lastChange.concat(
        "Employee name edited."
      ),
    });
  };

  const onChangePersonPosition = (e) => {
    setWhatchanged({ ...whatchanged, second_m: "Employee position edited" });

    setNeweditedperson({
      ...newEditedperson,
      person_position: e.target.value,
      person_lastChange: newEditedperson.person_lastChange.concat(
        "Employee position edited"
      ),
    });
    console.log(newEditedperson.person_position);
  };

  const onChangePersonLevel = (e) => {
    setWhatchanged({ ...whatchanged, third_m: "Employee level edited" });
    setNeweditedperson({
      ...newEditedperson,
      person_level: e.target.value,
      person_lastChange: newEditedperson.person_lastChange.concat(
        "Employee level edited"
      ),
    });
    console.log(newEditedperson.person_level);
  };

  // This function will handle the submission.
  const onSubmit = (e) => {
    e.preventDefault();

    // This will send a post request to update the data in the database.

    let message = Object.values(whatchanged).join(" ");
    console.log(message.length);
    //setNeweditedperson({ ...newEditedperson, person_lastChange: message });
    console.log(newEditedperson);
    if (message.length !== 5) {
      alertify.success(message, 2);
      console.log(newEditedperson.person_lastChange);
      dispatch(editRecord(id, newEditedperson));
    } else alertify.warning("Nothing edited", 2);
    //history.push("/");
  };

  return (
    <>
      {user ? (
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
      ) : (
        <div>
          <Alert color="danger">
            You have to be logged in to edit an employee.
          </Alert>
          <button type="button" className="btn btn-warning">
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={"/"}
            >
              Return to Employee List
            </Link>
          </button>
        </div>
      )}
    </>
  );
}
