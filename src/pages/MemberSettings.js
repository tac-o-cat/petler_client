/* eslint-disable no-alert */
import React, { Fragment, useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import {
  CHECK_UNIQUE_EMAIL,
  ADD_USER_TO_CHANNEL,
  CHANNEL_MEMBERS,
  DISMISS_MEMBER,
  CHECK_UNIQUE_MEMBER,
} from "queries/queries";
import { useApolloClient, useQuery, useMutation } from "@apollo/react-hooks";
import { CurrentUserContext } from "components/Authentication";

const MemberSettings = () => {
  const client = useApolloClient();
  const { currentChannel, currentUser } = useContext(CurrentUserContext);
  const { id } = currentChannel;
  const [inviteEmail, setInviteEmail] = useState("");

  const { data, error, loading } = useQuery(CHANNEL_MEMBERS, { variables: { id } });
  const [dismissMember] = useMutation(DISMISS_MEMBER);
  const [addUserToChannel] = useMutation(ADD_USER_TO_CHANNEL);

  const handleDelete = userId => {
    dismissMember({
      variables: { token: localStorage.getItem("token"), dismissId: userId, channelId: id },
      refetchQueries: [{ query: CHANNEL_MEMBERS, variables: { id } }],
      awaitRefetchQueries: true,
    });
  };
  const handleChange = e => {
    setInviteEmail(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    addUserToChannel({
      variables: {
        token: localStorage.getItem("token"),
        email: inviteEmail,
        channelId: currentChannel.id,
      },
      refetchQueries: [{ query: CHANNEL_MEMBERS, variables: { id } }],
      awaitRefetchQueries: true,
    });
    if (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isMember", async value => {
      // eslint-disable-next-line no-shadow
      const { data } = await client.query({
        query: CHECK_UNIQUE_EMAIL,
        variables: { email: value },
      });
      if (data.checkEmail) {
        return true;
      }
      return false;
    });
    ValidatorForm.addValidationRule("isChannelMember", async value => {
      // eslint-disable-next-line no-shadow
      const { data } = await client.query({
        query: CHECK_UNIQUE_MEMBER,
        variables: { id, email: value },
      });
      if (data.channel.checkUser) {
        return false;
      }
      return true;
    });
  }, [client, id]);

  const useStyles = makeStyles(theme => ({
    memberSettingsContainer: {
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
    memberSettingsInput: {
      margin: 0,
    },
    avatar: {
      margin: 0,
      width: 30,
      height: 30,
    },
  }));
  const classes = useStyles();

  return (
    <Container className={classes.memberSettingsContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          집사 설정
        </Typography>
        <ValidatorForm ref={() => "form"} onSubmit={handleSubmit} debounceTime={1000}>
          <Grid container spacing={2}>
            {!loading &&
              data.channel.users
                .filter(petler => petler.name !== currentUser)
                .map(petler => (
                  <Fragment key={`${petler.id}container`}>
                    <Grid item xs={3} key={`${petler.id}ImageGrid`}>
                      <Avatar alt={petler.name} src={petler.img} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={5} key={`${petler.id}nameGrid`}>
                      {petler.name}
                    </Grid>
                    <Grid item xs={4} key={`${petler.id}btnGrid`}>
                      <Button
                        key={`${petler.id}btn`}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          handleDelete(petler.id);
                        }}
                      >
                        내보내기
                      </Button>
                    </Grid>
                  </Fragment>
                ))}
            <Grid item xs={8}>
              <TextValidator
                label="집사 초대"
                name="inviteEmail"
                validators={["required", "isEmail", "isMember", "isChannelMember"]}
                errorMessages={[
                  "이메일을 입력해 주세요",
                  "올바른 이메일을 입력해 주세요",
                  "나는 집사다 회원이 아닙니다",
                  "이미 채널에 존재하는 집사입니다",
                ]}
                autoComplete="email"
                autoFocus
                fullWidth
                type="email"
                className={classes.memberSettingsInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={inviteEmail}
              />
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                집사 추가
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default MemberSettings;
