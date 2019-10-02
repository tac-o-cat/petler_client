import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { GET_USER_BY_TOKEN } from "queries/queries";
import { useApolloClient } from "@apollo/react-hooks";

const ChangePassword = ({ history }) => {
  const client = useApolloClient();
  const [changePassword, setChangedPassword] = useState({
    email: "",
    isValidate: false,
    password: "",
    repeatPassword: "",
  });
  const { isValidate, password, repeatPassword } = changePassword;

  const useStyles = makeStyles(() => ({
    changePasswordInput: {
      margin: 0,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: GET_USER_BY_TOKEN,
        variables: { token: localStorage.getItem("token") },
      });
      setChangedPassword({ ...changePassword, email: data.getUserByToken.email });
    };
    fetchData();
  }, []);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  });

  const handleChange = e => {
    setChangedPassword({ ...changePassword, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    // 비밀번호 체크하는 쿼리
  };
  const handleEdit = e => {
    e.preventDefault();
    // input value를 받아 서버에 보내주는 로직 추가 필요.
  };

  return (
    <ValidatorForm ref={() => "form"} onSubmit={handleEdit} debounceTime={1000}>
      <Grid container spacing={2}>
        {!isValidate ? (
          <>
            <Grid item xs={12}>
              <TextValidator
                label="현재 비밀번호"
                name="password"
                validators={["required"]}
                errorMessages={["비밀번호를 입력해 주세요"]}
                autoFocus
                fullWidth
                type="password"
                className={classes.changePasswordInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={password}
              />
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" onClick={handleClick}>
                입력
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <TextValidator
                label="비밀번호"
                name="password"
                validators={["required"]}
                errorMessages={["비밀번호를 입력해 주세요"]}
                autoFocus
                fullWidth
                type="password"
                className={classes.changePasswordInput}
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
                autoFocus
                fullWidth
                type="password"
                className={classes.changePasswordInput}
                variant="outlined"
                margin="dense"
                onChange={handleChange}
                value={repeatPassword}
              />
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                수정
              </Button>
            </Grid>
          </>
        )}
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => history.push("/mypage")}
          >
            뒤로 가기
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default ChangePassword;
