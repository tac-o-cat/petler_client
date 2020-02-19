import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import ChannelSettingsMenu from "components/ChannelSettingsMenu";
import ChannelSetting from "components/ChannelSetting";
import CreateChannel from "pages/CreateChannel";

const ChannelSettings = () => {
  const useStyles = makeStyles(() => ({
    channelSettingsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.channelSettingsContainer} maxWidth="xs">
      <div>
        <Switch>
          <Route exact path="/channelsettings" component={ChannelSettingsMenu} />
          <Route path="/channelsettings/channelsetting" component={ChannelSetting} />
          <Route path="/channelsettings/createchannel" component={CreateChannel} />
        </Switch>
      </div>
    </Container>
  );
};

export default ChannelSettings;
