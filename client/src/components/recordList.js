import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "alertifyjs/build/css/alertify.css";

import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

const Record = ({ record, deleteRecord }) => (
  <tr>
    <td>{record.person_name}</td>
    <td>{record.person_position}</td>
    <td>{record.person_level}</td>
    <td>
      <Link to={"/edit/" + record._id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          deleteRecord(record._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default function RecordList() {
  const apiURL = "https://employeemern.herokuapp.com/";

  //local backend
  //const localURL = "http://localhost:5000/";

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const [records, setRecords] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiURL}records/`) //if you didnt deploy to heroku, use ${localURL}
      .then((response) => {
        setRecords(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  const deleteRecord = (id) => {
    axios
      .delete(`${apiURL}records/` + id)
      .then((response) => {
        console.log(response.message);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const recordList = () => {
    return records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  };
  return (
    <>
      <div>
        <h3>Record List</h3>

        {records.length !== 0 ? (
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        ) : (
          <PuffLoader color={"#36D7B7"} css={override} size={150}></PuffLoader>
        )}
      </div>
      <button>
        <Link to={"/create/"}>Create</Link>
      </button>
    </>
  );
}
