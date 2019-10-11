import React, { useState, createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TodoList from "components/TodoList";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
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

  const useStyles = makeStyles(theme => ({
    root: {
      padding: "12px 12px 0",
    },
  }));

  const classes = useStyles();

  return (
    <TodoDialogContext.Provider value={value}>
      <div className={classes.root}>
        <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={dialogOpen}>
              할일 추가하기
            </Button>
          </Grid>
          <Grid item>
            <FilterByPet />
          </Grid>
        </Grid>
      </div>
      <TodoList />
      <TodoDialog />
    </TodoDialogContext.Provider>
  );
};

export default Main;
