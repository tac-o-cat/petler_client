import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";

const MyPageMenu = ({ history }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          component={RouterLink}
          to="mypage/userinfo"
          variant="contained"
          fullWidth
          color="primary"
        >
          유저 정보 수정
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          component={RouterLink}
          to="mypage/password"
          variant="contained"
          fullWidth
          color="primary"
        >
          비밀번호 변경
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleLogout} fullWidth variant="contained" color="primary">
          로그아웃
        </Button>
      </Grid>
    </Grid>
  );
};

export default MyPageMenu;
