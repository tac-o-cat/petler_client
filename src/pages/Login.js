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
          나는 집사다
        </Typography>
        <ValidatorForm ref={() => "form"}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                로그인
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/signup"
                linkButton
                fullWidth
                variant="contained"
                color="primary"
              >
                회원가입
              </Button>
            </Grid>
            <Grid item xs={6}>
              <GoogleLogin
                render={renderProps => (
                  <Button
                    fullWidth
                    onClick={renderProps.onClick}
                    variant="contained"
                    color="inherit"
                  >
                    Login With Google
                  </Button>
                )}
                clientId={config.GOOGLE_LOGIN_CLIENT_ID}
                onSuccess={responseSuccess}
                onFailure={responseFail}
                cookiePolicy="single_host_origin"
              />
            </Grid>
            <Grid item xs={6}>
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
                  >
                    Login With Kakao
                  </Button>
                )}
                jsKey={config.KAKAO_LOGIN_JS_KEY}
                onSuccess={responseSuccess}
                onFailure={responseFail}
                getProfile
              />
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
};

export default Login;
