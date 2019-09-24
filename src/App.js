import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, NotFound, SignUp, FindPassword } from "./pages";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/findpassword" exact component={FindPassword} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
