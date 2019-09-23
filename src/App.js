import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, NotFound } from "./pages";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
