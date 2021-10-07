/* eslint-disable react/jsx-props-no-spreading */
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecords } from "../actions/records";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "../styles";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.records);
  useEffect(() => {
    if (page) {
      dispatch(getRecords(page));
    }
  }, [dispatch, page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      showFirstButton
      showLastButton
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/records?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
