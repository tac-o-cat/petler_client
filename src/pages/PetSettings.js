/* eslint-disable no-alert */
import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import { CurrentUserContext } from "components/Authentication";
import { GET_PETS, DELETE_PET } from "queries/queries";
import { Link as RouterLink } from "react-router-dom";

const PetSettings = ({ location }) => {
  const { currentChannel } = useContext(CurrentUserContext);

  const { loading, data } = useQuery(GET_PETS, { variables: { id: currentChannel.id } });
  const [deletePet] = useMutation(DELETE_PET, {
    refetchQueries: [
      {
        query: GET_PETS,
        variables: { id: currentChannel.id },
      },
    ],
  });
  return (
    <div>
      {!loading &&
        data.channel.pets.map(pet => (
          <Card key={`${pet.id}card`} style={{ backgroundColor: pet.todo_color }}>
            <CardContent>
              <Typography variant="h5" component="h3">
                <Avatar key={`${pet.id}avatar`} src={pet.img} sizes="small" />
                {pet.name}
              </Typography>
              <Typography variant="body2" component="p">
                {`${pet.type} / ${pet.type_detail.length ? `${pet.type_detail} /` : ""} ${
                  pet.gender
                } / ${pet.age}`}
                <br />
                {pet.intro}
              </Typography>
              <CardActions>
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
              </CardActions>
              <CardActions>
                <IconButton
                  key={pet.id}
                  edge="end"
                  aria-label="create"
                  onClick={() =>
                    deletePet({ variables: { token: localStorage.getItem("token"), id: pet.id } })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      <Card style={{ backgroundColor: "#e0e0e0" }}>
        <CardActions>
          <Typography variant="body2" component="p">
            펫 추가
          </Typography>
          <IconButton
            to={{
              pathname: "/createpetprofile",
              state: {
                isEdit: false,
                prevPath: location.pathname,
              },
            }}
            component={RouterLink}
            edge="end"
            aria-label="create"
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default PetSettings;
