import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import { CHECK_CURRENT_PASSWORD, UPDATE_PASSWORD } from "queries/queries";
// import { useApolloClient } from "@apollo/react-hooks";

const petlerList = [{ name: "김동욱" }, { name: "김민희" }, { name: "안도훈" }, { name: "이은지" }];

const MemberSettings = () => {
  const useStyles = makeStyles(theme => ({
    memberSettingsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "75vh",
    },
    title: {
      marginBottom: theme.spacing(2),
      fontSize: "1.5rem",
      textAlign: "left",
    },
  }));
  const classes = useStyles();

  return (
    <Container className={classes.memberSettingsContainer} maxWidth="xs">
      <div>
        <Typography className={classes.title} component="h1" variant="h5">
          집사 설정
        </Typography>
        <Grid container spacing={2}>
          {petlerList.map(petler => (
            <>
              <Grid item xs={8}>
                {petler.name}
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth variant="contained" color="secondary">
                  내보내기
                </Button>
              </Grid>
            </>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default MemberSettings;
