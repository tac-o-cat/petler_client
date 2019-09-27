/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";
import config from "config";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const Login = () => {
  const responseSuccess = response => {
    // email, username, profilepic, id토큰을 서버로 전송.
    // eslint-disable-next-line no-console
    console.log(response);
  };
  const responseFail = error => {
    // eslint-disable-next-line no-console
    console.error(error);
  };
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(20),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(10),
    },
    submit: {
      margin: theme.spacing(1, 0, 0),
    },
  }));
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          나는 집사다
        </Typography>
        <ValidatorForm className={classes.form} ref={() => "form"}>
          <TextValidator
            label="이메일"
            name="email"
            validators={["required", "isEmail"]}
            errorMessages={["이메일을 입력해 주세요", "올바른 이메일 주소를 입력해 주세요"]}
            autoComplete="email"
            autoFocus
            fullWidth
            type="email"
            variant="outlined"
            margin="dense"
          />
          <TextValidator
            label="비밀번호"
            name="password"
            type="password"
            validators={["required"]}
            errorMessages={["비밀번호를 입력해 주세요"]}
            autoComplete="current-password"
            autoFocus
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>
        </ValidatorForm>
        <GoogleLogin
          render={renderProps => (
            <Button
              fullWidth
              onClick={renderProps.onClick}
              variant="contained"
              color="inherit"
              className={classes.submit}
            >
              Login With Google
            </Button>
          )}
          clientId={config.GOOGLE_LOGIN_CLIENT_ID}
          onSuccess={responseSuccess}
          onFailure={responseFail}
          cookiePolicy="single_host_origin"
        />
        <KakaoLogin
          render={props => (
            <Button
              fullWidth
              onClick={() => {
                // eslint-disable-next-line react/prop-types
                props.onClick();
              }}
              variant="contained"
              color="inherit"
              className={classes.submit}
            >
              Login With Kakao
            </Button>
          )}
          jsKey={config.KAKAO_LOGIN_JS_KEY}
          onSuccess={responseSuccess}
          onFailure={responseFail}
          getProfile
        />
        <Grid container>
          <Grid item xs>
            <Link
              href="/"
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/signup" {...props} />
              ))}
              variant="body2"
            >
              회원가입
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="/"
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/findpassword" {...props} />
              ))}
              variant="body2"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
