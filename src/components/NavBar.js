import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";

const NavBar = () => {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  return (
    <>
      <IconButton to="/main" component={RouterLink} className={classes.button}>
        <HomeIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.button}>
        <NotificationsIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.button}>
        <PhotoLibraryIcon fontSize="large" />
      </IconButton>
      <IconButton to="/mypage" component={RouterLink} className={classes.button}>
        <PersonIcon fontSize="large" />
      </IconButton>
    </>
  );
};

export default NavBar;
