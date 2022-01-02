import DateFnsUtils from '@date-io/date-fns';
import { Grid, Typography } from '@material-ui/core';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useState } from 'react';

export default function VerticalLabelTimePicker({
  error,
  label,
  loading,
  register,
  inputName,
  helperText,
  defaultValue,
}) {
  const [value, setValue] = useState(
    !!defaultValue ? new Date(`01/01/1970 ${defaultValue}`) : new Date(),
  );

  const handleTimeChange = (data) => {
    setValue(data);
  };

  return (
    <Grid container direction='column' style={{ gap: 5 }}>
      <Grid item>
        <Typography variant='body2' style={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
      </Grid>

      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            fullWidth
            ampm={false}
            error={error}
            value={value}
            id={inputName}
            margin='normal'
            name={inputName}
            format='HH:mm:ss'
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
