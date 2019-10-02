import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import ChangeUserInfo from "components/ChangeUserInfo";
import ChangePassword from "components/ChangePassword";
import MyPageMenu from "components/MyPageMenu";

const MyPage = () => {
  const useStyles = makeStyles(theme => ({
    title: {
      marginBottom: theme.spacing(4),
      fontSize: "1.5rem",
      textAlign: "center",
    },
    userInfoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.userInfoContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          마이페이지
        </Typography>
        <Switch>
          <Route exact path="/mypage" component={MyPageMenu} />
          <Route path="/mypage/userinfo" component={ChangeUserInfo} />
          <Route path="/mypage/password" component={ChangePassword} />
        </Switch>
      </div>
    </Container>
  );
};

export default MyPage;
