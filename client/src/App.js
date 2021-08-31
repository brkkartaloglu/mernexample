import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";
import Create from "./components/create";
import Edit from "./components/edit";
import Navi from "./components/navbar";
import RecordList from "./components/recordList";

// We import all the components we need in our app

export default function App() {
  return (
    <div>
      <Navi />
      <Route exact path="/">
        <RecordList />
      </Route>
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create">
        <Create />
      </Route>
    </div>
  );
}
