import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import UploadProfilePic from "components/UploadProfilePic";

const SignUp = ({ history }) => {
  const useStyles = makeStyles(theme => ({
    title: {
      marginBottom: theme.spacing(4),
      fontSize: "1.5rem",
      textAlign: "center",
    },
    signUpInput: {
      margin: 0,
    },
    signUpContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    profilePicGrid: {
      textAlign: "center",
    },
  }));
  const classes = useStyles();

  return (
    <Container className={classes.signUpContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          회원가입
        </Typography>
        <ValidatorForm ref={() => "form"}>
          <Grid container spacing={2}>
            <Grid item className={classes.profilePicGrid} xs={12}>
              <UploadProfilePic />
            </Grid>
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
                className={classes.signUpInput}
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="유저네임"
                name="username"
                validators={["required"]}
                errorMessages={["유저네임을 입력해 주세요"]}
                autoFocus
                fullWidth
                className={classes.signUpInput}
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="비밀번호"
                name="password"
                validators={["required"]}
                errorMessages={["비밀번호를 입력해 주세요"]}
                autoComplete="current-password"
                autoFocus
                fullWidth
                type="password"
                className={classes.signUpInput}
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="비밀번호 확인"
                name="password"
                validators={["required"]}
                errorMessages={["비밀번호를 입력해 주세요"]}
                autoComplete="current-password"
                autoFocus
                fullWidth
                type="password"
                className={classes.signUpInput}
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                회원 가입
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => history.push("/")}
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

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
