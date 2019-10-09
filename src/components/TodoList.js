/* eslint-disable no-alert */
import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import { CurrentUserContext } from "components/Authentication";
import { TodoDialogContext } from "pages/Main";
import { GET_CHANNEL_TODOS, IS_DONE_TODO } from "queries/queries";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TodoList = props => {
  const classes = useStyles();
  const client = useApolloClient();
  const { currentChannel } = useContext(CurrentUserContext);
  const { open, setOpen, setIsEdit, setTodoId, selectedPetId } = useContext(TodoDialogContext);

  const { loading, data } = useQuery(GET_CHANNEL_TODOS, {
    variables: { id: currentChannel.id },
  });

  const handleChangeIsDone = async id => {
    const { data } = await client.mutate({
      mutation: IS_DONE_TODO,
      variables: {
        id,
        token: localStorage.getItem("token"),
      },
      refetchQueries: [
        {
          query: GET_CHANNEL_TODOS,
          variables: { id: currentChannel.id },
        },
      ],
    });
  };

  const openDialog = id => {
    setOpen(true);
    setIsEdit(true);
    setTodoId(id);
  };

  return (
    <List className={classes.root}>
      {!loading &&
        data.channel.todos
          .filter(todo => {
            if (selectedPetId !== "showAll") {
              return todo.pets.id === selectedPetId;
            }
            return true;
          })
          .map(todo => (
            <ListItem key={todo.id}>
              <ListItemIcon>
                <Checkbox checked={todo.is_done} onChange={() => handleChangeIsDone(todo.id)} />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar src={todo.img} sizes="small" />
              </ListItemAvatar>
              <ListItemText primary={todo.todo} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="create" onClick={() => openDialog(todo.id)}>
                  <CreateIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
    </List>
  );
};

export default TodoList;
