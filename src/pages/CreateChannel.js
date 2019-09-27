import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const CreateChannel = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    title: {
      marginBottom: theme.spacing(2),
      fontSize: "2rem",
      textAlign: "left",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ValidatorForm ref={() => "form"}>
        <Typography className={classes.title} component="h1" variant="h5">
          채널 만들기
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextValidator
              label="채널명"
              name="channelName"
              validators={["required"]}
              errorMessages={["채널명을 입력해 주세요"]}
              autoFocus
              fullWidth
              type="text"
              className={classes.loginInput}
              variant="outlined"
              margin="dense"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              채널 생성하기
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default CreateChannel;
