import DateFnsUtils from '@date-io/date-fns';
import { Grid, Typography } from '@material-ui/core';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useState } from 'react';

export default function HorizontalLabelTimePicker({
  error,
  label,
  loading,
  register,
  inputName,
  helperText,
}) {
  const [value, setValue] = useState(new Date());

  const handleTimeChange = (data) => {
    setValue(data);
  };

  return (
    <Grid container alignItems='center' spacing={1}>
      <Grid item xs={12} md={3}>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>

      <Grid item xs={12} md={9}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            fullWidth
            ampm={false}
            error={error}
            value={value}
            id={inputName}
            margin='normal'
            name={inputName}
            disabled={loading}
            inputRef={register}
            helperText={helperText}
            onChange={handleTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}
