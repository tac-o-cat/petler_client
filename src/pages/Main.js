import React, { useState, createContext } from "react";
import TodoList from "components/TodoList";
import Button from "@material-ui/core/Button";

import FilterByPet from "components/FilterByPet";
import TodoDialog from "components/TodoDialog";

export const TodoDialogContext = createContext();

const Main = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState("showAll");

  const value = {
    open,
    setOpen,
    isEdit,
    setIsEdit,
    todoId,
    setTodoId,
    selectedPetId,
    setSelectedPetId,
  };

  const dialogOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };

  return (
    <TodoDialogContext.Provider value={value}>
      <Button variant="outlined" color="primary" onClick={dialogOpen}>
        할일 추가하기
      </Button>
      <FilterByPet />
      <TodoList />
      <TodoDialog />
    </TodoDialogContext.Provider>
  );
};

export default Main;
