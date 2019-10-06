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
import { useApolloClient } from "@apollo/react-hooks";

const ChannelSettings = () => {
  const client = useApolloClient();
  const { currentChannel, setCurrentChannel, currentUser, setCurrentUser } = useContext(
    CurrentUserContext,
  );
  const { id, name } = currentChannel;

  const [channel, setChannel] = useState({ channelName: "" });
  const { channelName } = channel;

  useEffect(() => {
    setChannel({ channelName: name });
  }, [name]);

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: GET_USER_BY_TOKEN,
        variables: { token: localStorage.getItem("token") },
      });
      setCurrentUser({ ...currentUser, channels: data.getUserByToken.channels });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

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
      const { data } = await client.mutate({
        mutation: UPDATE_CHANNEL,
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
      });

      if (data.updateChannel) {
        setCurrentChannel({ ...currentChannel, name: channelName });
        fetchData();
      }
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
              <Button type="submit" fullWidth variant="contained" color="primary">
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
