/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ImageSelector from "components/ImageSelector";
import UploadProfilePic from "components/UploadProfilePic";
import { SIGN_UP_MUTATION, CHECK_UNIQUE_EMAIL } from "queries/queries";
import { useApolloClient } from "@apollo/react-hooks";

const SignUp = ({ history }) => {
  const client = useApolloClient();

  const [file, setFile] = useState("");

  /* 유저 정보가 담긴 state 설정 */
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
    img: "",
  });
  const { email, name, password, repeatPassword } = user;

  useEffect(() => {
    /* password가 일치하는지 체크하는 custom validator 만듦. */
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== password) {
        return false;
      }
      return true;
    });
    /* email이 중복인지 체크하는 custom validator 만듦. */
    ValidatorForm.addValidationRule("isEmailUnique", async value => {
      const { data } = await client.query({
        query: CHECK_UNIQUE_EMAIL,
        variables: { email: value },
      });
      if (data.checkEmail) {
        return false;
      }
      return true;
    });
  });

  /* input에 onChange 핸들러 적용 - input 값이 바뀔 때마다 state 값 바뀜 */
  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /* submit 버튼 이벤트 핸들러 - 클릭 시 mutation 보냄 */
  const handleSubmit = async e => {
    e.preventDefault();

    const copiedUser = { ...user };
    if (file) {
      copiedUser.img = await UploadProfilePic(file);
    }

    try {
      const { data } = await client.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: { ...copiedUser },
      });
      if (data.signUp.name) {
        alert("회원가입이 완료되었습니다.");
        history.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  /* style 적용 */
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
        <ValidatorForm ref={() => "form"} onSubmit={handleSubmit} debounceTime={1000}>
          <Grid container spacing={2}>
            <Grid item className={classes.profilePicGrid} xs={12}>
              <ImageSelector onImageReady={setFile} />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="이메일"
                name="email"
                validators={["required", "isEmail", "isEmailUnique"]}
                errorMessages={[
                  "이메일을 입력해 주세요",
                  "올바른 이메일을 입력해 주세요",
                  "이미 사용 중인 이메일입니다",
                ]}
                autoComplete="email"
                autoFocus
                fullWidth
                type="email"
                className={classes.signUpInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="유저네임"
                name="name"
                validators={["required"]}
                errorMessages={["유저네임을 입력해 주세요"]}
                autoFocus
                fullWidth
                className={classes.signUpInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={name}
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
                onChange={handleChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                label="비밀번호 확인"
                name="repeatPassword"
                validators={["isPasswordMatch", "required"]}
                errorMessages={["비밀번호가 일치하지 않습니다", "비밀번호를 입력해 주세요"]}
                autoComplete="current-password"
                autoFocus
                fullWidth
                type="password"
                className={classes.signUpInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={repeatPassword}
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
