import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import UploadProfilePic from "components/UploadProfilePic";

const SignUp = ({ history }) => {
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
          회원가입
        </Typography>
        <ValidatorForm className={classes.form} ref={() => "form"}>
          <UploadProfilePic />
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
            label="유저네임"
            name="username"
            validators={["required"]}
            errorMessages={["유저네임을 입력해 주세요"]}
            autoFocus
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <TextValidator
            label="비밀번호"
            name="password"
            validators={["required"]}
            errorMessages={["비밀번호를 입력해 주세요"]}
            autoComplete="current-password"
            autoFocus
            fullWidth
            type="password"
            variant="outlined"
            margin="dense"
          />
          <TextValidator
            label="비밀번호 확인"
            name="password"
            validators={["required"]}
            errorMessages={["비밀번호를 입력해 주세요"]}
            autoComplete="current-password"
            autoFocus
            fullWidth
            type="password"
            variant="outlined"
            margin="dense"
          />
          <Button
            fullWidth
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            회원 가입
          </Button>
        </ValidatorForm>
        <Button
          fullWidth
          className={classes.submit}
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          뒤로 가기
        </Button>
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
