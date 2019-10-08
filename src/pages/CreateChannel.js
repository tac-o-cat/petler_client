import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { CREATE_CHANNEL, GET_USER_BY_TOKEN } from "queries/queries";
import { /* useApolloClient */ useMutation } from "@apollo/react-hooks";
import { CurrentUserContext } from "components/Authentication";

const CreateChannel = props => {
  const { setCurrentChannel } = useContext(CurrentUserContext);

  const [channel, setChannel] = useState({ channelName: "" });
  const { channelName } = channel;
  const useStyles = makeStyles(theme => ({
    createChannelContainer: {
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

  const handleChange = e => {
    setChannel({ ...channel, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createChannel({
      variables: { token: localStorage.getItem("token"), name: channelName },
      refetchQueries: [
        {
          query: GET_USER_BY_TOKEN,
          variables: { token: localStorage.getItem("token") },
        },
      ],
      awaitRefetchQueries: true,
    });
  };

  const [createChannel, { loading, error }] = useMutation(CREATE_CHANNEL, {
    onCompleted({ createChannel }) {
      setCurrentChannel({ id: createChannel.id, name: createChannel.name });
      alert("채널이 생성되었습니다!");
      props.history.push("/main");
    },
  });

  return (
    <Container className={classes.createChannelContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          채널 만들기
        </Typography>
        <ValidatorForm ref={() => "form"} onSubmit={handleSubmit}>
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
                채널 생성하기
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default CreateChannel;
