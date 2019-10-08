/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const FilterTodo2 = () => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = event => {
    setPersonName(event.target.value);
  };

  const names = ["향이", "치즈", "밍키"];

  useEffect(() => {}, []);

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
        {names.map(name => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterTodo2;
