import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const FindPassword = ({ history }) => {
  const useStyles = makeStyles(theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
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
          비밀번호 찾기
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
          <Button
            fullWidth
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            확인
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

FindPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FindPassword;
