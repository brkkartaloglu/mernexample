import { Divider, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getRecord, getRecordsBySearch } from "../actions/records";
import useStyles from "../styles";
import moment from "moment";

export default function RecordDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { record, records } = useSelector((state) => state.records);
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    console.log("useeffectde");
    dispatch(getRecord(id));
  }, [id]);

  useEffect(() => {
    //recommend posts için, tagler üzerinden bakıyor
    if (record) {
      console.log("2.kez");
      dispatch(
        getRecordsBySearch({
          search: "none",
          positions: record?.person_position,
        })
      );
    }
  }, [record]);

  console.log("r", records);

  if (!record) {
    return <div>Waiting...</div>;
  }
  const openRecord = (_id) => history.push(`/records/${_id}`);
  const recommendedRecords = records.filter(({ _id }) => _id !== record._id);
  console.log(recommendedRecords);
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {record.person_name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {record.person_position}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {record.person_level}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            {record.person_name.split(" ")[0]} joined to the Company{" "}
            {moment(record.createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" component="p">
            {record.person_lastChange === "Nothing." ? (
              " "
            ) : (
              <>
                Last Changes about {record.person_name.split(" ")[0]},{" "}
                {record.person_lastChange} {moment(record.updatedAt).fromNow()}{" "}
                {"."}
              </>
            )}
            {/* {record.person_lastChange} at {moment(record.updatedAt).fromNow()} */}
          </Typography>

          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              record.selectedFile ||
              "https://pngimage.net/wp-content/uploads/2019/05/human-avatar-png-4.png"
            }
            alt={record.person_name}
          />
        </div>
      </div>
      {recommendedRecords.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also interest with:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedRecords.map(
              ({
                person_name,
                person_position,
                person_level,
                selectedFile,
                _id,
              }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openRecord(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {person_name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {person_position}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {person_level}
                  </Typography>
                  {/* <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography> */}
                  <img
                    src={
                      selectedFile ||
                      "https://pngimage.net/wp-content/uploads/2019/05/human-avatar-png-4.png"
                    }
                    width="200px"
                    alt={person_name}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
}
