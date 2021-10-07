import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/react";

import moment from "moment";
import { Button } from "reactstrap";

import { RiErrorWarningLine } from "react-icons/ri";

import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Paper,
} from "@material-ui/core";
//redux needs
import { useDispatch } from "react-redux";
import {
  getRecords,
  deleteRecord,
  getRecordsBySearch,
} from "../actions/records";
import { useSelector } from "react-redux";
import alertify from "alertifyjs";

import Paginate from "./Pagination";
import ChipInput from "material-ui-chip-input";

import useStyles from "../styles";

//search url için
import { useHistory, useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function RecordList() {
  const classes = useStyles();
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.records);
  //const [records, setRecords] = useState([]); state globalde değişiyor burada state tanımına gerek yok

  //search için
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const searchPositions = query.get("positions");
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [positions, setPositions] = useState([]);
  const [wait, setWait] = useState(false);
  const searchRecord = () => {
    if (search.trim() !== "" || positions.length !== 0) {
      console.log(search.trim(), positions);
      console.log("searchde");
      //dispatch->feth search record
      console.log(wait);
      dispatch(getRecordsBySearch({ search, positions: positions.join(",") }));
      history.push(
        `/records/search?searchQuery=${
          search || "none"
        }&positions=${positions.join(",")}`
      );
      setWait(false);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    if (searchQuery === null) dispatch(getRecords(1));
    else if (search === "" && searchQuery !== null)
      dispatch(
        getRecordsBySearch({ search: searchQuery, positions: searchPositions })
      );
    console.log(wait);
  }, [dispatch, wait]);
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchRecord();
    }
  };
  const handleAddChip = (position) => setPositions([...positions, position]);
  const handleDeleteChip = (chipToDelete) =>
    setPositions(positions.filter((position) => position !== chipToDelete));
  const Record = ({ record }) => (
    <tr>
      <td>{record?.person_name}</td>
      <td>{record?.person_position}</td>
      <td>{record?.person_level}</td>
      <td>{moment(record?.createdAt).fromNow()}</td>
      <td>
        {moment(record?.createdAt).seconds() ===
        moment(record?.updatedAt).seconds()
          ? "Didn't edited yet"
          : moment(record?.updatedAt).fromNow()}
      </td>
      <td>
        {moment(record?.createdAt) !== moment(record?.updatedAt) && (
          <Button
            onClick={() => {
              alertify.alert(
                `Last Changes about ${record?.person_name} :`,
                `${record?.person_lastChange}`
              );
            }}
          >
            LastUpdates
          </Button>
        )}
        <Button color="warning">
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={"/records/" + record?._id}
          >
            Detail
          </Link>
        </Button>
        {user ? (
          <>
            <Button color="info">
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to={"/edit/" + record?._id}
              >
                Edit
              </Link>
            </Button>

            <Button
              color="danger"
              onClick={() => {
                alertify.confirm(
                  "Are you sure to delete?",
                  `${record.person_name} will be deleted`,
                  function () {
                    dispatch(deleteRecord(record._id));
                  },
                  function () {
                    alertify.error("Canceled");
                  }
                );
              }}
            >
              Delete
            </Button>
          </>
        ) : (
          <h6></h6>
        )}
      </td>
    </tr>
  );

  const recordList = () => {
    return records?.map((currentrecord) => {
      return <Record record={currentrecord} key={currentrecord?._id} />;
    });
  };
  const handleMouseOver = () => {
    alertify.alert("Login required", "Login for actions.");
  };

  if (wait) {
    console.log("waitde");
    return <div>bekle</div>;
  }
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid>
          <AppBar
            className={classes.appBarSearch}
            position="static"
            color="inherit"
          >
            <TextField
              onKeyDown={handleKeyPress}
              name="search"
              variant="outlined"
              label="Search by Name"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></TextField>
            <ChipInput
              style={{ margin: "10px 0" }}
              value={positions}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search by Positions (Press enter to prompt more than one position)"
              variant="outlined"
            ></ChipInput>
            <Button
              onClick={() => {
                setWait(true);
                searchRecord();
              }}
              className={classes.searchButton}
              variant="contained"
              color="dark"
            >
              Search
            </Button>
          </AppBar>
        </Grid>
        <Grid>
          {wait ? <div>s</div> : <h3>Record List</h3>}

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
                  <th>Created</th>
                  <th>Edited</th>
                  {user ? (
                    <th>Action</th>
                  ) : (
                    <th className={classes.th}>
                      Action
                      <RiErrorWarningLine
                        title="Login for actions (Details,Delete and Edit)"
                        onMouseOver={handleMouseOver}
                        //
                      />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>{recordList()}</tbody>
            </table>
          ) : (
            <PuffLoader
              color={"#36D7B7"}
              css={override}
              size={150}
            ></PuffLoader>
          )}
        </Grid>
        {!searchQuery && !positions.length && (
          <Grid>
            <Paginate className={classes.pagination} page={page}></Paginate>
          </Grid>
        )}
      </Container>
    </Grow>
  );
}
