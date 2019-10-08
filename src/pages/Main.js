import React, { useState, createContext } from "react";
import TodoList from "components/TodoList";
import Button from "@material-ui/core/Button";

import FilterTodo from "components/FilterTodo";
import FilterTodo2 from "components/FilterTodo2";

import TodoDialog from "components/TodoDialog";

export const TodoDialogContext = createContext();

const Main = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState(null);

  const value = {
    open,
    setOpen,
    isEdit,
    setIsEdit,
    todoId,
    setTodoId,
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
      {/* <FilterTodo />
      <FilterTodo2 /> */}
      <TodoList />
      <TodoDialog />
    </TodoDialogContext.Provider>
  );
};

export default Main;
