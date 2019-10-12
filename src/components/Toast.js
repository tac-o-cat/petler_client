import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: "#FFE599",
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

const Toast = props => {
  const classes = useStyles();
  const { open, openToast, message } = props;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    openToast(false);
  };

  return (
    <div>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

export default Toast;
