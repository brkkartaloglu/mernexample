import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

import moment from "moment";
import { Button } from "reactstrap";

//redux needs
import { useDispatch } from "react-redux";
import { getRecords, deleteRecord } from "../actions/records";
import { useSelector } from "react-redux";

export default function RecordList() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const dispatch = useDispatch();
  const records = useSelector((state) => state.records);
  //const [records, setRecords] = useState([]); state globalde değişiyor burada state tanımına gerek yok
  useEffect(() => {
    dispatch(getRecords());
    // eski versiyondaki axios çağrıları kaldırıldı
  }, [dispatch]);

  const Record = ({ record }) => (
    <tr>
      <td>{record.person_name}</td>
      <td>{record.person_position}</td>
      <td>{record.person_level}</td>
      <td>
        <Button color="info">
          <Link to={"/edit/" + record._id}>Edit</Link> |
        </Button>
        <Button
          color="danger"
          onClick={() => {
            dispatch(deleteRecord(record._id));
          }}
        >
          Delete
        </Button>
      </td>
      <td>{moment(record.createdAt).fromNow()}</td>
    </tr>
  );

  const recordList = () => {
    return records.map((currentrecord) => {
      return <Record record={currentrecord} key={currentrecord._id} />;
    });
  };
  return (
    <>
      <div>
        <h3>Record List</h3>

        {records.length !== 0 ? (
          <table
            className="table table-striped table-hover "
            style={{ marginTop: 20 }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Action</th>
                <th>Created/Edited</th>
              </tr>
            </thead>
            <tbody>{recordList()}</tbody>
          </table>
        ) : (
          <PuffLoader color={"#36D7B7"} css={override} size={150}></PuffLoader>
        )}
      </div>
      <Button color="warning">
        <Link to={"/create/"}>Create</Link>
      </Button>
    </>
  );
}
