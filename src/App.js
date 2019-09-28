import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Login, NotFound, SignUp, FindPassword, Main } from "pages";
import LayoutWrapper from "layout/LayoutWrapper";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Switch>
      {token ? (
        <LayoutWrapper>
          <Route path="/main" component={Main} />
        </LayoutWrapper>
      ) : (
        <>
          <Route path="/" exact component={() => <Login setToken={setToken} />} />
          <Route path="/signup" component={SignUp} />
          <Route path="/findpassword" component={FindPassword} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
