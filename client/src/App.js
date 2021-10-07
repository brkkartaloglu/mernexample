import React from "react";

// We use Route in order to define the different routes of our application
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Create from "./components/create";
import Edit from "./components/edit";
import Navi from "./components/navbar";
import RecordList from "./components/recordList";

// We import all the components we need in our app

import useStyles from "./styles";
import { Container, AppBar, Grow, Grid } from "@material-ui/core";
import Auth from "./components/Auth/Auth";

import RecordDetails from "./components/RecordDetails";

export default function App() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Container>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Navi />
      </AppBar>
      <Grow in>
        <Container>
          <Grid item xs={12} sm={12}>
            {/* <BrowserRouter> doesnt work with history.push */}
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Redirect to="/records" />}
              />

              <Route path="/records" exact component={RecordList} />
              <Route path="/records/search" exact component={RecordList} />
              <Route path="/edit/:id" exact component={Edit} />
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/records/:id" exact component={RecordDetails} />
              <Route
                path="/auth"
                exact
                component={() =>
                  !user ? <Auth /> : <Redirect to="/records" />
                }
              ></Route>
            </Switch>
            {/* </BrowserRouter> */}
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}
