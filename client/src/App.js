import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";
import Create from "./components/create";
import Edit from "./components/edit";
import Navi from "./components/navbar";
import RecordList from "./components/recordList";

// We import all the components we need in our app

import useStyles from "./styles";
import { Container, AppBar, Grow, Grid } from "@material-ui/core";

export default function App() {
  const classes = useStyles();
  return (
    <Container>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Navi />
      </AppBar>
      <Grow in>
        <Container>
          <Grid item xs={12} sm={12}>
            <Route exact path="/">
              <RecordList />
            </Route>
            <Route path="/edit/:id" component={Edit} />
            <Route path="/create">
              <Create />
            </Route>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
