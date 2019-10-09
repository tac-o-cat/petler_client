import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Login,
  NotFound,
  SignUp,
  FindPassword,
  CreateChannel,
  Main,
  MyPage,
  ChannelSettings,
  MemberSettings,
  CreatePetProfile,
} from "pages";
import LayoutWrapper from "layout/LayoutWrapper";
import { Authentication } from "components/Authentication";

function App() {
  // 문제: notFound로 접근이 안 되고 있음.
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/findpassword" component={FindPassword} />
      <Authentication>
        <Route path="/createChannel" component={CreateChannel} />
        <LayoutWrapper>
          <Route path="/main" component={Main} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/channelsettings" component={ChannelSettings} />
          <Route path="/membersettings" component={MemberSettings} />
          <Route path="/addChannel" component={CreateChannel} />
          <Route path="/createpetprofile" component={CreatePetProfile} />
        </LayoutWrapper>
      </Authentication>
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
