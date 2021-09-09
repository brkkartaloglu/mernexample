import {
  GET_RECORDS,
  CREATE_RECORD,
  DELETE_RECORD,
  EDIT_RECORD,
} from "../constants/actionTypes";

const reducer = (records = [], action) => {
  switch (action.type) {
    case GET_RECORDS:
      return action.payload;
    case CREATE_RECORD:
      return [...records, action.payload];
    case EDIT_RECORD:
      return records.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
    case DELETE_RECORD:
      return records.filter((record) => record._id !== action.payload);

    default:
      return records;
  }
};
export default reducer;
