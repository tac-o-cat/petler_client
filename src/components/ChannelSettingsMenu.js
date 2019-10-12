import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const ChannelSettingsMenu = () => {
  const useStyles = makeStyles(theme => ({
    channelSettingsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    },
    title: {
      marginBottom: theme.spacing(4),
      fontSize: "1.5rem",
      textAlign: "center",
    },
  }));

  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title} component="h1" variant="h5">
          채널설정
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          component={RouterLink}
          to="/channelsettings/channelsetting"
          variant="contained"
          fullWidth
          color="primary"
        >
          채널 정보 수정
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          component={RouterLink}
          to="/channelsettings/createchannel"
          variant="contained"
          fullWidth
          color="primary"
        >
          채널 생성
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChannelSettingsMenu;
