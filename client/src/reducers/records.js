import {
  GET_RECORDS,
  GET_RECORD,
  CREATE_RECORD,
  DELETE_RECORD,
  EDIT_RECORD,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

const reducer = (state = { isLoading: true, records: [] }, action) => {
  switch (action.type) {
    case GET_RECORDS:
      return {
        ...state,
        records: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case GET_RECORD:
      return {
        ...state,
        record: action.payload.record,
      };
    case CREATE_RECORD:
      return { ...state, records: [...state.records, action.payload] };
    case EDIT_RECORD:
      return {
        ...state,
        records: state.records.map((record) =>
          record._id === action.payload._id ? action.payload : record
        ),
      };
    case DELETE_RECORD:
      return {
        ...state,
        records: state.records.filter((post) => post._id !== action.payload),
      };

    case FETCH_BY_SEARCH:
      return { ...state, records: action.payload.data };

    default:
      return state;
  }
};
export default reducer;
