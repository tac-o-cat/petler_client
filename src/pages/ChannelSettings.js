/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import { CHECK_CURRENT_PASSWORD, UPDATE_PASSWORD } from "queries/queries";
// import { useApolloClient } from "@apollo/react-hooks";

const ChannelSettings = () => {
  // const client = useApolloClient();
  const [channel, setChannel] = useState({ channelName: "" });
  const { channelName } = channel;

  useEffect(() => {
    // 현재 채널 이름 가져와서(global store에 있음)
    // setChannel을 통해 channel state에 담아야.
  });

  const useStyles = makeStyles(theme => ({
    channelSettingsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "75vh",
    },
    title: {
      marginBottom: theme.spacing(2),
      fontSize: "1.5rem",
      textAlign: "left",
    },
  }));
  const classes = useStyles();

  const handleChange = e => {
    setChannel({ ...channel, [e.target.name]: e.target.value });
  };

  const handleEdit = async e => {
    e.preventDefault();
    try {
      // 채널 정보 update mutation 필요.
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className={classes.channelSettingsContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          채널 설정
        </Typography>
        <ValidatorForm ref={() => "form"} onSubmit={handleEdit}>
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
                onChange={handleChange}
                value={channelName}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary">
                수정
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default ChannelSettings;
