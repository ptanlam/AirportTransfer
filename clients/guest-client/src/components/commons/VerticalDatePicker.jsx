import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function VerticalDatePicker({ label, register, errors, name }) {
  const [date, setDate] = useState(new Date());
  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <Grid container direction='column' spacing={2}>
      {label === '' ? null : (
        <Grid item>
          <Typography variant='subtitle2'>{label}</Typography>
        </Grid>
      )}
      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
          <KeyboardDatePicker
            autoOk
            name={name}
            variant='dialog'
            ampm={false}
            value={date}
            onChange={handleDateChange}
            inputRef={register}
            onError={errors}
            disablePast
            format='MM-dd-yyyy'
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}
