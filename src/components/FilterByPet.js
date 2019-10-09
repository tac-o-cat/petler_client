/* eslint-disable no-alert */
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
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

  const { loading, data } = useQuery(GET_PETS, { variables: { id: currentChannel.id } });

  return (
    <FormControl>
      <InputLabel htmlFor="pet-filter">펫 필터</InputLabel>
      <Select
        value={selectedPetId}
        onChange={handleChange}
        inputProps={{
          name: "pet",
          id: "pet-filter",
        }}
      >
        <MenuItem key="showAll" value="showAll">
          전체보기
        </MenuItem>
        {!loading &&
          data.channel.pets.map(pet => (
            <MenuItem key={pet.name} value={pet.id}>
              {pet.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FilterByPet;
