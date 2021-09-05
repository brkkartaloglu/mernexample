import React, { useEffect, useState } from "react";
// This will require to npm install axios
import axios from "axios";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

//redux needs
import { useDispatch } from "react-redux";
import { createRecord } from "../actions/records";

export default function Create(props) {
  //state data
  const [newperson, setNewperson] = useState({
    person_name: "",
    person_position: "",
    person_level: "",
  });
  const [recentlyCreated, setRecentlyCreated] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecord(newperson));
    setRecentlyCreated(newperson.person_name);
    setNewperson({
      person_name: "",
      person_position: "",
      person_level: "",
    });
  };

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
            value={newperson.person_name}
            onChange={(e) =>
              setNewperson({ ...newperson, person_name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Person's position: </label>
          <input
            required
            type="text"
            className="form-control"
            value={newperson.person_position}
            onChange={(e) =>
              setNewperson({ ...newperson, person_position: e.target.value })
            }
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
              checked={newperson.person_level === "Intern"}
              onChange={(e) =>
                setNewperson({ ...newperson, person_level: e.target.value })
              }
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
              checked={newperson.person_level === "Junior"}
              onChange={(e) =>
                setNewperson({ ...newperson, person_level: e.target.value })
              }
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
              checked={newperson.person_level === "Senior"}
              onChange={(e) =>
                setNewperson({ ...newperson, person_level: e.target.value })
              }
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
              checked={newperson.person_level === "Chief"}
              onChange={(e) =>
                setNewperson({ ...newperson, person_level: e.target.value })
              }
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
      {recentlyCreated && <h4>Recently created employee: {recentlyCreated}</h4>}
    </div>
  );
}
