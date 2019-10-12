/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { LOGIN_QUERY } from "queries/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import Toast from "components/Toast";

const Login = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [openToast, setOpenToast] = useState(false);
  const { email, password } = user;

  /* 일반 로그인 */
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [login, { error }] = useLazyQuery(LOGIN_QUERY, {
    onCompleted(data) {
      if (data) {
        localStorage.setItem("token", data.login.token);
        if (data.login.channel.length) history.push("/main");
        else history.push("/createChannel");
      }
    },
    onError() {
      setOpenToast(true);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    login({
      variables: { email, password },
    });
  };

  const useStyles = makeStyles(theme => ({
    logo: {
      marginBottom: theme.spacing(4),
      fontSize: "2.5rem",
      textAlign: "center",
    },
    loginInput: {
      margin: 0,
    },
    loginContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.loginContainer} maxWidth="xs">
      <div>
        <Typography className={classes.logo} component="h1" variant="h5">
          <img
            src="https://practice-aws-adh.s3.ap-northeast-2.amazonaws.com/photos/petler_logo.png"
            alt="나는 집사다"
          />
        </Typography>
        <ValidatorForm ref={() => "form"} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                label="이메일"
                name="email"
                validators={["required", "isEmail"]}
                errorMessages={["이메일을 입력해 주세요", "올바른 이메일 주소를 입력해 주세요"]}
                autoComplete="email"
                autoFocus
                fullWidth
                type="email"
                className={classes.loginInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="비밀번호"
                name="password"
                type="password"
                validators={["required"]}
                errorMessages={["비밀번호를 입력해 주세요"]}
                autoComplete="current-password"
                autoFocus
                fullWidth
                className={classes.loginInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                로그인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/signup"
                fullWidth
                variant="contained"
                color="primary"
              >
                회원가입
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      {error && (
        <Toast message="이메일과 비밀번호를 확인하세요" open={openToast} openToast={setOpenToast} />
      )}
    </Container>
  );
};

export default Login;
