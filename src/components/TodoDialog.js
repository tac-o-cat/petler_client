/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/ko";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import RepeatDatePicker from "components/RepeatDatePicker";
import { CurrentUserContext } from "components/Authentication";
import { TodoDialogContext } from "pages/Main";
import {
  GET_CHANNEL_INFO,
  CREATE_TODO,
  GET_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  GET_CHANNEL_TODOS,
} from "queries/queries";

const INITIAL_STATE = {
  todo: "",
  memo: "",
  push_date: null,
  end_date: null,
  repeat_day: "",
  petId: "",
  assignedId: "",
  pets: [],
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: "0 24px 24px",
  },
}));

function TodoDialog(props) {
  const client = useApolloClient();
  const classes = useStyles();

  const { currentChannel } = useContext(CurrentUserContext);
  const { open, setOpen, isEdit, todoId } = useContext(TodoDialogContext);

  const [newTodo, setNewTodo] = useState(INITIAL_STATE);
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isRepeat, setIsRepeat] = useState(false);

  const { todo, memo, push_date, end_date } = newTodo;

  const handleClose = () => {
    setNewTodo(INITIAL_STATE);
    setIsRepeat(false);
    setOpen(false);
  };

  const handleChange = e => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (date, name) => {
    setNewTodo({ ...newTodo, [name]: moment(date).format() });
  };

  const handleChangeRepeat = e => {
    setIsRepeat(e.target.checked);
  };

  const setRepeatData = data => {
    const { time, week } = data;

    setNewTodo({
      ...newTodo,
      end_date: moment(time).format(),
      repeat_day: week,
    });
  };

  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted() {
      handleClose();
    },
  });

  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted() {
      handleClose();
    },
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    onCompleted() {
      handleClose();
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (isEdit) {
      updateTodo({
        variables: {
          ...newTodo,
          channel_id: currentChannel.id,
          todo_id: todoId,
          token: localStorage.getItem("token"),
        },
        refetchQueries: [
          {
            query: GET_CHANNEL_TODOS,
            variables: { token: localStorage.getItem("token"), id: currentChannel.id },
          },
          {
            query: GET_TODO,
            variables: { id: todoId },
          },
        ],
        awaitRefetchQueries: true,
      });
    } else {
      createTodo({
        variables: {
          ...newTodo,
          channel_id: currentChannel.id,
          token: localStorage.getItem("token"),
        },
        refetchQueries: [
          {
            query: GET_CHANNEL_TODOS,
            variables: { token: localStorage.getItem("token"), id: currentChannel.id },
          },
        ],
        awaitRefetchQueries: true,
      });
    }
  };

  const handleDelete = () => {
    deleteTodo({
      variables: {
        id: todoId,
        token: localStorage.getItem("token"),
      },
      refetchQueries: [
        {
          query: GET_CHANNEL_TODOS,
          variables: { id: currentChannel.id },
        },
      ],
      awaitRefetchQueries: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: GET_CHANNEL_INFO,
        variables: { id: currentChannel.id, token: localStorage.getItem("token") },
      });
      // console.log(data.channel);
      setPets(data.user.channels[0].pets);
      setUsers(data.user.channels[0].users);
    };
    if (currentChannel.id) {
      fetchData();
    }
  }, [currentChannel]);

  useEffect(() => {
    if (isRepeat) {
      setNewTodo({ ...newTodo, push_date: null, end_date: null });
    } else {
      setNewTodo({ ...newTodo, end_date: null, repeat_day: "" });
    }
  }, [isRepeat]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: GET_TODO,
        variables: { todo_id: todoId, id: currentChannel.id, token: localStorage.getItem("token") },
      });
      setNewTodo({ ...data.todo, petId: data.todo.pets.id });

      if (data.todo.repeat_day) {
        setIsRepeat(true);
      }
    };
    if (open && isEdit && todoId) {
      fetchData();
    }
  }, [open, isEdit, todoId]);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        <Grid container spacing={0} direction="row" justify="space-between" alignItems="center">
          <Grid item>할일 {isEdit ? "수정" : "등록"}하기</Grid>
          <Grid item>
            {isEdit && (
              <Button onClick={handleDelete} variant="contained" color="secondary">
                삭제
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogTitle>
      <ValidatorForm
        className={classes.root}
        ref={() => "form"}
        onSubmit={handleSubmit}
        debounceTime={1000}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextValidator
              label="할일제목"
              name="todo"
              validators={["required"]}
              errorMessages={["할일 제목을 입력해 주세요"]}
              autoFocus
              fullWidth
              type="text"
              variant="outlined"
              margin="dense"
              onChange={handleChange}
              value={todo}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectValidator
              label="반려동물"
              name="pet_id"
              validators={["required"]}
              errorMessages={["반려동물을 선택해 주세요"]}
              fullWidth
              select
              variant="outlined"
              margin="dense"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              value={newTodo.petId}
            >
              {pets.map(pet => (
                <MenuItem key={pet.id} value={pet.id}>
                  {pet.name}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>

          <Grid item xs={12}>
            <SelectValidator
              label="담당집사"
              name="assigned_id"
              validators={["required"]}
              errorMessages={["담당집사를 선택해 주세요"]}
              fullWidth
              select
              variant="outlined"
              margin="dense"
              onChange={handleChange}
              value={newTodo.assigned_id}
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.user_channel_id}>
                  {user.name}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>

          {!isRepeat && (
            <>
              <MuiPickersUtilsProvider locale="ko" utils={MomentUtils}>
                <Grid item xs={12}>
                  <DateTimePicker
                    label="미리알림"
                    value={push_date}
                    onChange={date => {
                      handleChangeDate(date, "push_date");
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DateTimePicker
                    label="마감일정"
                    value={end_date}
                    onChange={date => {
                      handleChangeDate(date, "end_date");
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={isRepeat} onChange={handleChangeRepeat} />}
              label="반복일정"
            />
          </Grid>

          {isRepeat && (
            <>
              <Grid item xs={12}>
                <RepeatDatePicker
                  selectedRepeat={setRepeatData}
                  isRepeat={isRepeat}
                  todo={newTodo}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <TextValidator
              label="메모"
              name="memo"
              fullWidth
              type="text"
              variant="outlined"
              margin="dense"
              onChange={handleChange}
              value={memo}
            />
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary" onClick={handleClose}>
              취소하기
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              할일 {isEdit ? "수정" : "등록"}하기
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Dialog>
  );
}

export default TodoDialog;
