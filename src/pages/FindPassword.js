import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const FindPassword = ({ history }) => {
  const useStyles = makeStyles(theme => ({
    title: {
      marginBottom: theme.spacing(4),
      fontSize: "1.5rem",
      textAlign: "center",
    },
    findPasswordInput: {
      margin: 0,
    },
    findPasswordContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  }));
  const classes = useStyles();
  return (
    <Container className={classes.findPasswordContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          비밀번호 찾기
        </Typography>
        <ValidatorForm className={classes.form} ref={() => "form"}>
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
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
              >
                확인
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                className={classes.submit}
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

FindPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FindPassword;
