/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/ko";

const WEEK_LIST = ["월", "화", "수", "목", "금", "토", "일"];

function RepeatDatePicker(props) {
  const [time, setTime] = useState(props.todo.end_date);
  const [week, setWeek] = useState(props.todo.repeat_day.split(","));

  const handleDateChange = slectedTime => {
    setTime(slectedTime);
  };

  const handleChangeWeek = pickedDay => () => {
    if (week.includes(pickedDay)) {
      setWeek(week.filter(day => pickedDay !== day));
    } else {
      setWeek([...week, pickedDay]);
    }
  };

  useEffect(() => {
    const { isRepeat } = props;
    if (isRepeat) {
      props.selectedRepeat({ time, week: week.join(",") });
    } else {
      props.selectedRepeat({ time: "", week: "" });
    }
  }, [props.isRepeat, time, week]);

  return (
    <MuiPickersUtilsProvider locale="ko" utils={MomentUtils}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ButtonGroup color="primary" size="small" aria-label="small outlined button group">
            <Button onClick={() => setWeek(["월", "화", "수", "목", "금", "토", "일"])}>
              매일
            </Button>
            <Button onClick={() => setWeek(["월", "화", "수", "목", "금"])}>주중</Button>
            <Button onClick={() => setWeek(["토", "일"])}>주말</Button>
            <Button onClick={() => setWeek([])}>초기화</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            {WEEK_LIST.map((day, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox checked={week.includes(day)} onChange={handleChangeWeek(day)} />}
                label={day}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <TimePicker
            label="마감시간"
            value={time}
            minutesStep={5}
            onChange={date => handleDateChange(date)}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default RepeatDatePicker;
