import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Login,
  NotFound,
  SignUp,
  FindPassword,
  Main,
  MyPage,
  ChannelSettings,
  MemberSettings,
  CreatePetProfile,
  CreateChannel,
  PetSettings,
} from "pages";
import LayoutWrapper from "layout/LayoutWrapper";
import { Authentication } from "components/Authentication";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#FFE599",
      },
    },
  });
  return (
    <MuiThemeProvider theme={theme}>
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
            <Route path="/petsettings" component={PetSettings} />
          </LayoutWrapper>
        </Authentication>
        <Route component={NotFound} />
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
