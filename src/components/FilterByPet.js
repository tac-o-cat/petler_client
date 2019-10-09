/* eslint-disable no-alert */
import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { CurrentUserContext } from "components/Authentication";

const FilterByPet = () => {
  const { currentChannel } = useContext(CurrentUserContext);
  const [personName, setPersonName] = useState([]);

  const handleChange = event => {
    setPersonName(event.target.value);
  };

  const GET_PETS = gql`
    query($id: ID!) {
      channel(id: $id) {
        pets {
          name
        }
      }
    }
  `;

  const { loading, data, error } = useQuery(GET_PETS, { variables: { id: currentChannel.id } });

  return (
    <FormControl>
      <InputLabel htmlFor="select-multiple-chip">펫 필터</InputLabel>
      <Select
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {!loading &&
          data.channel.pets.map(pet => (
            <MenuItem key={pet.name} value={pet.name}>
              {pet.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FilterByPet;
