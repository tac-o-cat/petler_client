/* eslint-disable no-alert */
import React, { useState, useEffect, useContext } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { CurrentUserContext } from "components/Authentication";
import { UPDATE_CHANNEL, GET_USER_BY_TOKEN } from "queries/queries";
import { useMutation } from "@apollo/react-hooks";

const ChannelSetting = ({ history }) => {
  const { currentChannel, setCurrentChannel, handleToast } = useContext(CurrentUserContext);
  const { id, name } = currentChannel;

  const [channel, setChannel] = useState({ channelName: "" });
  const { channelName } = channel;

  useEffect(() => {
    setChannel({ channelName: name });
  }, [name]);

  const useStyles = makeStyles(theme => ({
    channelSettingContainer: {
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

  const [updateChannel] = useMutation(UPDATE_CHANNEL, {
    variables: {
      token: localStorage.getItem("token"),
      name: channelName,
      img: null,
      channelId: id,
    },
    refetchQueries: [
      {
        query: GET_USER_BY_TOKEN,
        variables: { token: localStorage.getItem("token") },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted(data) {
      if (data.updateChannel) {
        setCurrentChannel({ ...currentChannel, name: channelName });
        handleToast("채널명이 변경되었습니다, 야옹!");
      }
    },
  });

  const handleEdit = async e => {
    e.preventDefault();
    updateChannel();
  };

  return (
    <Container className={classes.channelSettingContainer} maxWidth="xs">
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
            <Grid item xs={6}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                수정
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => history.push("/channelsettings")}
              >
                뒤로 가기
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default ChannelSetting;
