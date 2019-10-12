/* eslint-disable no-alert */
import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { CurrentUserContext } from "components/Authentication";
import { makeStyles } from "@material-ui/core/styles";
import { GET_PETS, DELETE_PET } from "queries/queries";
import { Link as RouterLink } from "react-router-dom";

const PetSettings = ({ location }) => {
  const { currentChannel } = useContext(CurrentUserContext);

  const { loading, data } = useQuery(GET_PETS, {
    variables: { id: currentChannel.id, token: localStorage.getItem("token") },
  });
  const [deletePet] = useMutation(DELETE_PET, {
    refetchQueries: [
      {
        query: GET_PETS,
        variables: { id: currentChannel.id, token: localStorage.getItem("token") },
      },
    ],
  });

  const useStyles = makeStyles(() => ({
    root: {
      padding: 12,
    },
    cardContent: {
      padding: "16px 16px 0",
    },
    cardActions: {
      padding: "0 16px",
      justifyContent: "flex-end",
    },
    emptyPets: {
      paddingTop: "7rem",
      textAlign: "center",
      fontSize: "2rem",
      fontWeight: 200,
    },
    emptyImg: {
      maxWidth: 82,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            to={{
              pathname: "/createpetprofile",
              state: {
                isEdit: false,
                prevPath: location.pathname,
              },
            }}
            component={RouterLink}
          >
            반려동물 추가
          </Button>
        </Grid>
        {!loading &&
          data.user.channels[0].pets.map(pet => (
            <Grid item xs={12}>
              <Card key={`${pet.id}card`} style={{ backgroundColor: pet.todo_color }}>
                <CardContent className={classes.cardContent}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar key={`${pet.id}avatar`} src={pet.img} sizes="small" />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" component="h3">
                        {pet.name}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {`${pet.type} / ${pet.type_detail ? `${pet.type_detail} /` : ""} ${
                          pet.gender
                        } / ${pet.age}`}
                        <br />
                        {pet.intro}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <IconButton
                    to={{
                      pathname: "/createpetprofile",
                      state: {
                        isEdit: true,
                        petId: pet.id,
                        prevPath: location.pathname,
                      },
                    }}
                    component={RouterLink}
                    key={pet.id}
                    edge="end"
                    aria-label="create"
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    key={pet.id}
                    edge="end"
                    aria-label="create"
                    onClick={() =>
                      deletePet({
                        variables: { token: localStorage.getItem("token"), id: pet.id },
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      {!loading && !data.user.channels[0].pets.length && (
        <div className={classes.emptyPets}>
          <img
            src="https://practice-aws-adh.s3.ap-northeast-2.amazonaws.com/assets/empty_todos.png"
            alt=""
            className={classes.emptyImg}
          />
          <br />
          등록된
          <br />
          반려동물이 없습니다.
        </div>
      )}
    </div>
  );
};

export default PetSettings;
