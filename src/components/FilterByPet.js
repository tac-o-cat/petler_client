/* eslint-disable no-alert */
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import { CurrentUserContext } from "components/Authentication";
import { TodoDialogContext } from "pages/Main";
import { GET_PETS } from "queries/queries";

const FilterByPet = () => {
  const { currentChannel } = useContext(CurrentUserContext);
  const { selectedPetId, setSelectedPetId } = useContext(TodoDialogContext);

  const handleChange = event => {
    setSelectedPetId(event.target.value);
  };

  const { loading, data } = useQuery(GET_PETS, {
    variables: { token: localStorage.getItem("token"), id: currentChannel.id },
  });

  const useStyles = makeStyles({
    avatar: {
      marginRight: 6,
      width: 32,
      height: 32,
    },
    select: {
      paddingLeft: 6,
    },
  });

  const classes = useStyles();

  return (
    <FormControl>
      <Select
        value={selectedPetId}
        onChange={handleChange}
        className={classes.select}
        inputProps={{
          name: "pet",
          id: "pet-filter",
        }}
      >
        <MenuItem key="showAll" value="showAll">
          모든 반려동물 보기
        </MenuItem>
        {!loading &&
          data.user.channels[0].pets.map(pet => (
            <MenuItem key={pet.name} value={pet.id}>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={6}>
                  <Avatar alt={pet.name} src={pet.img} className={classes.avatar} />
                </Grid>
                <Grid item xs={6}>
                  {pet.name}
                </Grid>
              </Grid>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FilterByPet;
