import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function DayPicker({ day, setDay, rounds }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setDay(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function getOptions(n) {
    let options = [];
    for (let i = 1; i <= n; i++) {
      const item = (
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
      options.push(item);
    }
    return options;
  }

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Day</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={day}
          onChange={handleChange}
          inputProps={{
            name: "day",
            id: "demo-controlled-open-select"
          }}
        >
          {getOptions(rounds)}
        </Select>
      </FormControl>
    </form>
  );
}
