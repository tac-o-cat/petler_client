import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Login, NotFound, SignUp, FindPassword, Main } from "pages";
import LayoutWrapper from "layout/LayoutWrapper";

function App() {
  const [isLogin] = useState(false);

  return (
    <Switch>
      {isLogin ? (
        <LayoutWrapper>
          <Route path="/main" component={Main} />
        </LayoutWrapper>
      ) : (
        <>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/findpassword" component={FindPassword} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
